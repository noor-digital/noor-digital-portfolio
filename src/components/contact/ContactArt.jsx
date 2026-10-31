import { motion, useTransform } from 'motion/react';
import { rng } from '../../lib/prng.js';

// Décor nocturne de Dakar, en bas du hero : deux plans de silhouettes d’immeubles aux fenêtres allumées,
// une lune en croissant, des étoiles et le phare des Mamelles dont le faisceau balaie doucement la scène
// (« la lumière qui structure »). La scène est générée avec une graine fixe : identique à chaque chargement.
// Décoratif (aria-hidden). Les plans se décalent avec le curseur (parallaxe) ; seuls transform et opacity bougent.

const W = 1440;
const H = 360;

function skyline(seed, { minW, maxW, minH, maxH, base }) {
  const rand = rng(seed);
  const items = [];
  let x = -20;
  while (x < W + 20) {
    const w = Math.round(minW + rand() * (maxW - minW));
    const h = Math.round(minH + rand() * (maxH - minH));
    items.push({ x, w, h, y: base - h });
    x += w + Math.round(rand() * 8);
  }
  return items;
}

const FAR = skyline(7, { minW: 36, maxW: 84, minH: 50, maxH: 150, base: H });
const NEAR = skyline(21, { minW: 48, maxW: 110, minH: 80, maxH: 190, base: H });

// Fenêtres : une petite grille par immeuble du plan proche ; quelques-unes scintillent.
const windows = (() => {
  const rand = rng(55);
  const list = [];
  NEAR.forEach((b, bi) => {
    for (let row = 0; row < Math.floor((b.h - 18) / 22); row += 1) {
      for (let col = 0; col < Math.floor((b.w - 12) / 18); col += 1) {
        if (rand() < 0.2) {
          list.push({
            key: `${bi}-${row}-${col}`,
            x: b.x + 10 + col * 18,
            y: b.y + 12 + row * 22,
            blink: rand() < 0.1,
            delay: (rand() * 6).toFixed(2),
            warm: rand() < 0.25,
          });
        }
      }
    }
  });
  return list;
})();

const STARS = (() => {
  const rand = rng(99);
  return Array.from({ length: 36 }, (_, i) => ({
    key: i,
    x: Math.round(rand() * W),
    y: Math.round(rand() * 150),
    r: rand() < 0.2 ? 1.6 : 1,
    delay: (rand() * 5).toFixed(2),
  }));
})();

export default function ContactArt({ mx, parallax }) {
  const farX = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const nearX = useTransform(mx, [-0.5, 0.5], [-22, 22]);
  return (
    <div className="nh-ct-art" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" focusable="false">
        <defs>
          <linearGradient id="ct-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b1628" stopOpacity="0" />
            <stop offset="1" stopColor="#0e2040" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="ct-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#F1F5F9" stopOpacity="0.5" />
            <stop offset="1" stopColor="#16B8B0" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="ct-moon" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#D7E0EA" stopOpacity="0.35" />
            <stop offset="1" stopColor="#D7E0EA" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width={W} height={H} fill="url(#ct-sky)" />

        {STARS.map((s) => (
          <circle key={s.key} className="nh-ct-star" cx={s.x} cy={s.y} r={s.r} fill="#D7E0EA" style={{ animationDelay: `${s.delay}s` }} />
        ))}

        {/* Lune en croissant */}
        <circle cx="1180" cy="86" r="70" fill="url(#ct-moon)" />
        <circle cx="1180" cy="86" r="22" fill="#D7E0EA" />
        <circle cx="1190" cy="80" r="20" fill="#0b1628" />

        {/* Plan lointain */}
        <motion.g style={parallax ? { x: farX } : undefined}>
          {FAR.map((b) => (
            <rect key={b.x} x={b.x} y={b.y} width={b.w} height={b.h + 2} fill="#10223f" />
          ))}
        </motion.g>

        {/* Phare des Mamelles : faisceau qui balaie lentement */}
        <g className="nh-ct-lighthouse">
          <polygon className="nh-ct-beamray" points="340,150 1100,70 1100,240" fill="url(#ct-beam)" />
          <polygon points="334,150 346,150 350,300 330,300" fill="#17325b" />
          <rect x="328" y="138" width="24" height="14" fill="#1d3d6e" />
          <rect x="334" y="144" width="12" height="6" fill="#F1F5F9" />
        </g>

        {/* Plan proche + fenêtres */}
        <motion.g style={parallax ? { x: nearX } : undefined}>
          {NEAR.map((b) => (
            <rect key={b.x} x={b.x} y={b.y} width={b.w} height={b.h + 2} fill="#0a1830" />
          ))}
          {windows.map((w) => (
            <rect
              key={w.key}
              className={w.blink ? 'nh-ct-win nh-ct-win--blink' : 'nh-ct-win'}
              x={w.x}
              y={w.y}
              width="8"
              height="11"
              fill={w.warm ? '#F1C27B' : '#16B8B0'}
              style={w.blink ? { animationDelay: `${w.delay}s` } : undefined}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}
