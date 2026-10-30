import { motion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { projectsPage } from '../../data/site.js';

const pad = (n) => String(n).padStart(2, '0');

// Filtres par catégorie. Vrais <button> (clavier + toucher), `aria-pressed` pour la catégorie active ;
// le remplissage turquoise glisse d’un bouton à l’autre.
export default function ProjectFilterBar({ options, active, onChange }) {
  return (
    <div className="nh-pj-filter" role="group" aria-label={projectsPage.filterLabel}>
      {options.map((option) => {
        const isActive = option.value === active;
        return (
          <button
            key={option.value}
            type="button"
            className="nh-pj-filter__btn"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
          >
            {isActive && (
              <motion.span
                layoutId="nh-pj-filter-fill"
                className="nh-pj-filter__fill"
                transition={{ duration: 0.45, ease: EASE }}
              />
            )}
            <span className="nh-pj-filter__label">{option.label}</span>
            <span className="nh-pj-filter__count" aria-hidden="true">
              {pad(option.count)}
            </span>
            <span className="visually-hidden"> ({option.count})</span>
          </button>
        );
      })}
    </div>
  );
}
