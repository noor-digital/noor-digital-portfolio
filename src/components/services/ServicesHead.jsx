import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { servicesPage } from '../../data/site.js';
import { services } from '../../data/services.js';
import TitleReveal from '../home/TitleReveal.jsx';
import ServiceArt from '../home/art/ServiceArt.jsx';

const pad = (n) => String(n).padStart(2, '0');

// Tête de page : le titre, et une « planche-contact » des services. Chaque vignette est un vrai lien
// d’accès rapide : elle fait défiler jusqu’au service correspondant.
export default function ServicesHead({ onPick }) {
  const reduce = useReducedMotion();
  const { kicker, title, sub, indexLabel } = servicesPage;

  return (
    <section className="nh-sv-head" aria-label="Introduction">
      <div className="container nh-sv-head__grid">
        <div className="nh-sv-head__copy">
          <p className="nh-sv-head__kicker">
            <span className="nh-ab-slash" aria-hidden="true" />
            {kicker}
          </p>
          <TitleReveal as="h1" lines={[title]} className="nh-sv-title" />
          <p className="nh-sv-head__sub">{sub}</p>
        </div>

        <nav className="nh-sv-sheet" aria-label={indexLabel}>
          <ul>
            {services.map((service, i) => (
              <motion.li
                key={service.id}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 + i * 0.09, ease: EASE }}
              >
                <a
                  className="nh-sv-thumb"
                  href={`#${service.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onPick(service.id);
                  }}
                >
                  <span className="nh-sv-thumb__art" aria-hidden="true">
                    <ServiceArt id={service.id} />
                    <span className="nh-sv-thumb__num">{pad(i + 1)}</span>
                  </span>
                  <span className="nh-sv-thumb__title">
                    <span className="visually-hidden">Aller au service : </span>
                    {service.title}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
