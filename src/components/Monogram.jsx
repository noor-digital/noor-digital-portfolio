import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '../lib/motion.js';

// Petit monogramme « N » : deux montants ivoire, une diagonale ambre (le tracé).
// variant="solid" (accueil) : le N entier en ambre, au trait plus marqué.
export function Monogram({ className = 'wordmark__mark', variant = 'default' }) {
  if (variant === 'solid') {
    return (
      <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
        <path
          d="M6.5 26V6M25.5 26V6M6.5 6L25.5 26"
          stroke="var(--amber)"
          strokeWidth="3.8"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <path d="M7 26V6M25 26V6" stroke="var(--ivory)" strokeWidth="1.6" strokeLinecap="square" />
      <path d="M7 6L25 26" stroke="var(--amber)" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

// Grand monogramme de la page À propos : le « N » se dessine au scroll,
// avec deux lignes de repère typographiques (hauteur de capitale et ligne de base).
function Stroke({ d, color, delay, reduce, weight = 1.4 }) {
  if (reduce) {
    return <path d={d} stroke={color} strokeWidth={weight} strokeLinecap="square" />;
  }
  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth={weight}
      strokeLinecap="square"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}

export function MonogramLarge({ className }) {
  const reduce = useReducedMotion();
  return (
    <svg
      className={className}
      viewBox="0 0 240 300"
      fill="none"
      role="img"
      aria-label="Monogramme N de NOOR DIGITAL"
    >
      <Stroke d="M0 40H240" color="var(--hair-strong)" delay={0} reduce={reduce} weight={1} />
      <Stroke d="M0 260H240" color="var(--hair-strong)" delay={0.1} reduce={reduce} weight={1} />
      <Stroke d="M52 260V40" color="var(--ivory)" delay={0.2} reduce={reduce} />
      <Stroke d="M188 260V40" color="var(--ivory)" delay={0.35} reduce={reduce} />
      <Stroke d="M52 40L188 260" color="var(--amber)" delay={0.5} reduce={reduce} />
    </svg>
  );
}
