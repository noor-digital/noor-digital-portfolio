import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { EASE } from '../lib/motion.js';

// Compteur animé : monte de 0 à `to` à la première entrée à l’écran ; valeur finale immédiate avec « mouvement réduit ».
export default function Counter({ to }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  const value = useMotionValue(reduce ? to : 0);
  const rounded = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    if (!seen || reduce) return undefined;
    const controls = animate(value, to, { duration: 1.4, ease: EASE });
    return () => controls.stop();
  }, [seen, reduce, to, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
