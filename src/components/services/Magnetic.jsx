import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

// Effet magnétique léger : le bouton suit un peu le curseur (au plus `pull` × la distance, 10 px max).
// Souris uniquement ; au toucher, au clavier ou avec « mouvement réduit », le bouton reste immobile.
export default function Magnetic({ pull = 0.22, className = 'nh-sv-magnet', children }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduce) return <span className={className}>{children}</span>;

  const clamp = (v) => Math.max(-10, Math.min(10, v));
  const onMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const box = ref.current.getBoundingClientRect();
    x.set(clamp((event.clientX - (box.left + box.width / 2)) * pull));
    y.set(clamp((event.clientY - (box.top + box.height / 2)) * pull));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
