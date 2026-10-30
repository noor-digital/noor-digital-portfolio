import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';

// Une enveloppe dessinée au trait, qui réagit à la fiche : plus le visiteur la remplit, plus la lettre
// sort de l’enveloppe, se couvre de lignes, et plus les rayons de lumière se dessinent. Quand l’e-mail est
// prêt, un tampon se pose. L’illustration montre l’avancement réel de la fiche, elle ne décore pas.
// Le pointeur déplace les plans en sens inverse (parallaxe) ; tout est décoratif (aria-hidden).

const INK = '#F1F5F9';
const TURQ = '#16B8B0';
const BLUE = '#2563EB';
const PAPER = '#0D1C36';

const clamp = (v) => Math.min(1, Math.max(0, v));

// Sept rayons qui partent de l’ouverture de l’enveloppe.
const RAYS = [-62, -40, -20, 0, 20, 40, 62].map((deg) => {
  const r = (deg * Math.PI) / 180;
  const from = 74;
  const to = 176 - Math.abs(deg) * 0.7;
  const x = (d) => (320 + Math.sin(r) * d).toFixed(1);
  const y = (d) => (196 - Math.cos(r) * d).toFixed(1);
  return `M${x(from)} ${y(from)}L${x(to)} ${y(to)}`;
});

function Draw({ d, delay = 0, color = INK, w = 2.6, fill = 'none' }) {
  const reduce = useReducedMotion();
  return (
    <motion.path
      d={d}
      fill={fill}
      stroke={color}
      strokeWidth={w}
      strokeLinecap="square"
      strokeLinejoin="miter"
      initial={reduce ? false : { pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    />
  );
}

export default function ContactArt({ progress = 0, prepared = false }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  function onMove(event) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (((event.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (((event.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  }
  function onLeave() {
    ref.current?.style.setProperty('--px', '0');
    ref.current?.style.setProperty('--py', '0');
  }

  const spring = reduce ? { duration: 0 } : { type: 'spring', stiffness: 90, damping: 18 };

  return (
    <div className="nh-ct-art" ref={ref} aria-hidden="true" onPointerMove={onMove} onPointerLeave={onLeave}>
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid meet" focusable="false">
        {/* Plan arrière : les rayons, qui se dessinent avec l’avancement. */}
        <g className="nh-ct-art__rays">
          {RAYS.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke={i === 3 ? TURQ : INK}
              strokeWidth={i === 3 ? 4 : 2.4}
              strokeLinecap="square"
              initial={false}
              animate={{ pathLength: progress, opacity: progress > 0.02 ? 1 : 0 }}
              transition={{ ...spring, delay: reduce ? 0 : i * 0.03 }}
            />
          ))}
        </g>

        {/* Rabat arrière, ouvert */}
        <Draw d="M120 215L320 85L520 215" delay={0.1} fill={BLUE} />

        {/* La lettre : elle monte avec l’avancement, ses lignes se tracent l’une après l’autre. */}
        <motion.g initial={false} animate={{ y: -clamp(progress) * 125 }} transition={spring}>
          <rect x="220" y="215" width="200" height="150" fill={INK} fillOpacity="0.12" stroke={INK} strokeWidth="2.6" />
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.path
              key={i}
              d={`M242 ${246 + i * 22}H${i === 4 ? 320 : 396}`}
              fill="none"
              stroke={i === 0 ? TURQ : INK}
              strokeWidth={i === 0 ? 5 : 3}
              strokeLinecap="square"
              initial={false}
              animate={{ pathLength: clamp(progress * 6 - i) }}
              transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
            />
          ))}
        </motion.g>

        {/* Face avant de l’enveloppe : opaque, elle cache la lettre qui n’est pas encore sortie. */}
        <rect x="120" y="215" width="400" height="160" fill={PAPER} />
        <Draw d="M120 215H520V375H120Z" />
        <Draw d="M120 215L320 330L520 215" delay={0.3} />
        <Draw d="M120 375L250 290M520 375L390 290" delay={0.5} w={2} />

        {/* Plan avant : de petits repères qui flottent (CSS, coupés avec « mouvement réduit »). */}
        <g className="nh-ct-art__dots">
          <rect className="nh-ct-float" x="70" y="120" width="12" height="12" fill={TURQ} style={{ animationDelay: '0s' }} />
          <rect className="nh-ct-float" x="560" y="250" width="10" height="10" fill={INK} fillOpacity="0.7" style={{ animationDelay: '-1.4s' }} />
          <rect className="nh-ct-float" x="96" y="320" width="8" height="8" fill={BLUE} style={{ animationDelay: '-2.6s' }} />
        </g>

        {/* Tampon : posé quand l’e-mail est prêt. */}
        <motion.circle
          cx="520"
          cy="110"
          r="32"
          fill={TURQ}
          initial={false}
          animate={{ scale: prepared ? 1 : 0, opacity: prepared ? 1 : 0 }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 14 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
        <motion.path
          d="M504 110l11 12l22-26"
          fill="none"
          stroke={PAPER}
          strokeWidth="6"
          strokeLinecap="square"
          initial={false}
          animate={{ pathLength: prepared ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.4, delay: prepared && !reduce ? 0.2 : 0, ease: EASE }}
        />
      </svg>
    </div>
  );
}
