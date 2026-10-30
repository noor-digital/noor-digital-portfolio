import { motion } from 'motion/react';
import { EASE } from '../lib/motion.js';

// Le tracé : un filet de 1 px qui se dessine quand il entre dans l’écran.
// tone="amber" (par défaut) pour les séparations majeures, tone="soft" pour les listes.
export default function Hairline({ tone = 'amber', delay = 0, className = '' }) {
  const classes = ['hairline', tone === 'soft' ? 'hairline--soft' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.span
      className={classes}
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    />
  );
}
