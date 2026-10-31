import { services } from '../../data/services.js';

const pad = (n) => String(n).padStart(2, '0');

// Barre d’accès rapide : une pastille par service. Le service qui occupe l’écran est mis en évidence
// (`aria-current`). Ce sont de vrais liens : sans JavaScript, l’ancre fonctionne aussi.
export default function QuickNav({ active, onGo, label, className = '' }) {
  return (
    <nav className={`nh-sv-pills ${className}`} aria-label={label}>
      <ol>
        {services.map((service, i) => (
          <li key={service.id}>
            <a
              className="nh-sv-pill"
              href={`#${service.id}`}
              aria-current={active === service.id ? 'true' : undefined}
              onClick={(event) => {
                event.preventDefault();
                onGo(service.id);
              }}
            >
              <span className="nh-sv-pill__num" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <span className="nh-sv-pill__txt">{service.short}</span>
              <span className="visually-hidden"> : {service.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
