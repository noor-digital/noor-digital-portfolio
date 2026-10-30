import { motion } from 'motion/react';
import { EASE } from '../lib/motion.js';
import Hairline from './Hairline.jsx';

// En-tête des pages secondaires : index de la page (le même que dans le menu), filet ambre,
// grand titre révélé ligne par ligne. `label` précise le contenu de la page à droite de l’index.
// `lines` est un tableau : une entrée par ligne (texte ou JSX).
// Le titre reçoit le focus après chaque changement de page (voir AnimatedRoutes).
export default function PageTitle({ index, total = '05', label, lines, children }) {
  return (
    <header className="page-head">
      <p className="page-head__meta mono">
        <span className="mono--accent" aria-hidden="true">
          {index}
        </span>
        <span className="visually-hidden">
          Page {Number(index)} sur {Number(total)} :{' '}
        </span>
        <span>{label}</span>
      </p>
      <Hairline />
      <h1 className="page-title" tabIndex={-1}>
        {lines.map((line, i) => (
          <span className="mask" key={i}>
            <motion.span
              initial={{ y: '108%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: EASE }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      {children}
    </header>
  );
}
