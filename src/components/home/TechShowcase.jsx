import { useState } from 'react';
import { motion } from 'motion/react';
import { skillGroups } from '../../data/skills.js';
import { EASE } from '../../lib/motion.js';
import { techIcon } from './techIcons.jsx';

const ALL = 'all';
const total = skillGroups.reduce((n, g) => n + g.items.length, 0);

// Technologies : filtres par catégorie (défilables au doigt sur mobile) + grille de tuiles.
// Rien ne défile tout seul : « Tout » affiche l’ensemble, une catégorie réduit la grille.
// Chaque tuile garde son nom visible en permanence (pas d’information cachée au survol, donc utilisable au toucher).
export default function TechShowcase() {
  const [active, setActive] = useState(ALL);
  const groups = active === ALL ? skillGroups : skillGroups.filter((g) => g.id === active);

  return (
    <div className="nh-tg">
      <div className="nh-tg__filters" role="group" aria-label="Filtrer les technologies par catégorie">
        {[{ id: ALL, label: 'Tout', count: total }, ...skillGroups.map((g) => ({ id: g.id, label: g.label, count: g.items.length }))].map(
          (f) => (
            <button
              key={f.id}
              type="button"
              className="nh-tg__chip"
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
            >
              {f.label}
              <span aria-hidden="true">{f.count}</span>
            </button>
          ),
        )}
      </div>

      <div className="nh-tg__groups" aria-live="polite">
        {groups.map((group) => (
          <section className="nh-tg__group" key={group.id} aria-label={group.label}>
            <h3>{group.label}</h3>
            <ul className="nh-tg__grid">
              {group.items.map((item, i) => {
                const { node, color } = techIcon(item.icon);
                return (
                  <motion.li
                    className="nh-tg__tile"
                    key={item.name}
                    style={{ '--brand': color }}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -6% 0px' }}
                    transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.05, ease: EASE }}
                  >
                    <span className="nh-tg__icon">{node}</span>
                    <span className="nh-tg__name">{item.name}</span>
                  </motion.li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
