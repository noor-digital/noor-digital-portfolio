import Counter from '../Counter.jsx';
import { servicesPage } from '../../data/site.js';
import { services, process } from '../../data/services.js';
import { skillGroups } from '../../data/skills.js';

// Valeurs calculées depuis les données du site : elles ne peuvent pas devenir fausses toutes seules.
const SOURCES = {
  services: services.length,
  process: process.length,
  tech: skillGroups.reduce((n, group) => n + group.items.length, 0),
};

// Chiffres clés : uniquement des faits réels (voir servicesPage.stats dans data/site.js).
export default function StatsStrip() {
  const { label, items } = servicesPage.stats;

  return (
    <dl className="nh-sv-stats" aria-label={label}>
      {items.map((item) => {
        const number = item.value ?? SOURCES[item.source];
        return (
          <div className="nh-sv-stat" key={item.id}>
            <dt className="nh-sv-stat__label">{item.label}</dt>
            <dd className="nh-sv-stat__value">
              {typeof number === 'number' ? (
                <>
                  <Counter to={number} />
                  {item.suffix}
                </>
              ) : (
                item.text
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
