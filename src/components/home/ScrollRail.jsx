import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

// Indicateur d’avancement : un rayon vertical, fixé au bord droit, qui se remplit avec la page.
// Il dit où l’on en est dans « l’histoire » ; masqué sur mobile et avec « mouvement réduit ».
export default function ScrollRail() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  if (reduce) return null;
  return (
    <div className="nh-rail" aria-hidden="true">
      <motion.span style={{ scaleY: fill }} />
    </div>
  );
}
