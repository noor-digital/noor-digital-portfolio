import { motion } from 'motion/react';
import { EASE } from '../lib/motion.js';

// Apparition douce au scroll : légère montée + fondu, une seule fois.
// `as` choisit la balise (div, li, h2, p…). `delay` sert à décaler les éléments d’un groupe.
export default function Reveal({ as = 'div', delay = 0, y = 18, className, children, ...rest }) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
