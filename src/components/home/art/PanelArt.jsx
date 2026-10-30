import { rng } from '../../../lib/prng.js';
import useMediaQuery from '../../../hooks/useMediaQuery.js';
import Character from './Character.jsx';
import { skyline } from './world.js';

// Illustrations des cases de la présentation. Le même personnage est recadré : gros plan
// (main et lumière) puis plan d’ensemble (le toit, la ville) — le changement de cadrage fait partie du récit.

const f = (n) => Math.round(n * 10) / 10;

function rays(seed, cx, cy, count, r0, r1) {
  const rand = rng(seed);
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.12;
    const rr0 = r0 + rand() * r0;
    const rr1 = r1 * (0.6 + rand() * 0.6);
    const half = 0.006 + rand() * 0.014;
    const p = (r, d) => `${f(cx + Math.cos(a + d) * r)},${f(cy + Math.sin(a + d) * r)}`;
    return { pts: `${p(rr0, 0)} ${p(rr1, -half)} ${p(rr1, half)}`, o: f(0.1 + rand() * 0.2) };
  });
}

const CLOSE_RAYS = rays(21, 110, 98, 34, 70, 560);

// Gros plan : la main ouverte, la lumière, le visage de profil perdu dans le contre-jour.
export function CloseUpArt() {
  return (
    <svg className="nh-art" viewBox="0 0 520 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="cu-dots" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <circle cx="4" cy="4" r="1.7" fill="#7C93B6" />
        </pattern>
        <clipPath id="cu-moon">
          <circle cx="392" cy="190" r="200" />
        </clipPath>
        <mask id="cu-shade">
          <rect width="520" height="400" fill="#fff" />
          <circle cx="350" cy="158" r="200" fill="#000" />
        </mask>
      </defs>
      <rect width="520" height="400" fill="#0B1628" />
      <circle cx="392" cy="190" r="200" fill="#D7E0EA" />
      <g clipPath="url(#cu-moon)">
        <rect width="520" height="400" fill="url(#cu-dots)" mask="url(#cu-shade)" />
      </g>
      <g fill="#F1F5F9">
        {CLOSE_RAYS.map((r, i) => (
          <polygon key={i} points={r.pts} opacity={r.o} />
        ))}
      </g>
      <g transform="translate(91 27)">
        <Character x="0" y="0" width="600" height="720" viewBox="0 0 600 720" overflow="visible" />
      </g>
    </svg>
  );
}

const PANO = skyline(41, { x0: -40, x1: 1260, base: 270, minH: 40, maxH: 150, minW: 30, maxW: 80 });

// Plan d’ensemble : la ville la nuit, un seul point de lumière sur un toit.
export function PanoramaArt() {
  // Case étroite (mobile) : on recadre sur le personnage et sa lumière plutôt que sur la lune.
  const narrow = useMediaQuery('(max-width: 860px)');
  return (
    <svg
      className="nh-art"
      viewBox={narrow ? '790 0 420 270' : '0 0 1200 270'}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="pano-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1628" />
          <stop offset="1" stopColor="#1B3E73" />
        </linearGradient>
        <pattern id="pano-dots" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <circle cx="4" cy="4" r="1.8" fill="#16B8B0" />
        </pattern>
        <linearGradient id="pano-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.42" />
        </linearGradient>
        <mask id="pano-mask">
          <rect width="1200" height="270" fill="url(#pano-fade)" />
        </mask>
      </defs>
      <rect width="1200" height="270" fill="url(#pano-sky)" />
      <circle cx="600" cy="112" r="82" fill="#D7E0EA" />
      <circle cx="600" cy="112" r="116" fill="none" stroke="#D7E0EA" strokeOpacity="0.3" strokeWidth="1.5" />
      <rect y="120" width="1200" height="150" fill="url(#pano-dots)" mask="url(#pano-mask)" />
      <path d={PANO.d} fill="#0B1B36" stroke="#0B1B36" strokeWidth="2" />
      {PANO.windows.map((w) => (
        <rect key={`${w.x}-${w.y}`} x={w.x} y={w.y} width="4" height="6" fill={w.warm ? '#D7E0EA' : '#16B8B0'} opacity="0.7" />
      ))}
      <path d="M760 270V238H1010V270Z" fill="#050B16" />
      <path d="M760 238H1010" stroke="#D7E0EA" strokeOpacity="0.4" strokeWidth="1.5" />
      <g transform="translate(850 34) scale(0.34)">
        <Character x="0" y="0" width="600" height="720" viewBox="0 0 600 720" overflow="visible" />
      </g>
    </svg>
  );
}
