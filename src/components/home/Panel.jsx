import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';

// Une case de manga réutilisable : liseré clair, pans coupés (variable CSS --poly) et rideau d’encre
// qui se retire en diagonale à l’entrée dans l’écran (une seule fois, absent avec « mouvement réduit »).
// Même comportement que les cases de l’accueil (qui garde sa propre copie, validée telle quelle).
export default function Panel({ className = '', poly, delay = 0, onMount = false, children, innerRef, ...rest }) {
  const reduce = useReducedMotion();
  const trigger = onMount
    ? { animate: { x: '112%' } }
    : { whileInView: { x: '112%' }, viewport: { once: true, margin: '0px 0px -14% 0px' } };

  return (
    <div className={`nh-panel ${className}`} style={poly ? { '--poly': poly } : undefined} {...rest}>
      <div className="nh-panel__in" ref={innerRef}>
        {children}
        {!reduce && (
          <motion.span
            className="nh-panel__wipe"
            aria-hidden="true"
            initial={{ x: '0%' }}
            {...trigger}
            transition={{ duration: 0.95, delay, ease: EASE }}
          />
        )}
      </div>
    </div>
  );
}
