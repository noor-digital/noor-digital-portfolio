import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';

// Titre de section : chaque ligne monte depuis un masque, légèrement penchée (même geste que le Hero).
// C’est la seule entrée animée des titres : le texte courant, lui, ne bouge pas.
//
// Le déclencheur (whileInView) est posé sur le masque, qui ne bouge pas : si on l’observait sur la ligne
// elle-même, celle-ci serait rognée par le masque et ne serait jamais considérée comme « visible ».
export default function TitleReveal({ as: Tag = 'h2', lines, className = '', id }) {
  const reduce = useReducedMotion();
  return (
    <Tag className={`nh-title ${className}`} id={id}>
      {lines.map((line, i) => (
        <motion.span
          className="nh-title__mask"
          key={line}
          initial={reduce ? 'shown' : 'hidden'}
          whileInView="shown"
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ delayChildren: i * 0.11 }}
        >
          <motion.span
            className="nh-title__line"
            variants={{
              hidden: { y: '108%', skewX: -9 },
              shown: { y: '0%', skewX: 0, transition: { duration: 0.85, delay: i * 0.11, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
