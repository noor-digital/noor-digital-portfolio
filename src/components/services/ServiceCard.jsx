import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { servicesPage } from '../../data/site.js';
import Cta from '../home/Cta.jsx';
import ServiceArt from '../home/art/ServiceArt.jsx';
import ServicesIcon from './ServicesIcons.jsx';
import useSpotlight from '../../hooks/useSpotlight.js';

const pad = (n) => String(n).padStart(2, '0');

// Coche qui se trace à l’entrée (en cascade) : le tracé est animé, pas la mise en page.
function Tick({ delay }) {
  const reduce = useReducedMotion();
  return (
    <svg className="nh-sv-tick" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <motion.path
        d="M5 12.5l4.5 4.5L19 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 0.5, delay, ease: EASE }}
      />
    </svg>
  );
}

// Carte de service : numéro, titre, description, « Idéal pour », livrables, technologies, action.
// Survol : élévation, bordure lumineuse qui suit le curseur (spotlight) et inclinaison 3D de 4° au plus.
// Sur mobile (`showArt`), l’illustration ouvre la carte ; sur ordinateur, elle est dans la scène épinglée.
export default function ServiceCard({ service, index, total, showArt, isActive }) {
  const reduce = useReducedMotion();
  const { stack } = servicesPage;
  const number = pad(index + 1);
  const nameId = `${service.id}-name`;

  const cardRef = useRef(null);
  useSpotlight(cardRef, { tilt: 4, enabled: !reduce });

  const artRef = useRef(null);
  const seen = useInView(artRef, { once: true, margin: '0px 0px -14% 0px' });

  return (
    <article
      id={service.id}
      className="nh-sv-card"
      data-active={isActive ? 'true' : 'false'}
      aria-labelledby={nameId}
      ref={cardRef}
    >
      <span className="nh-sv-card__glow" aria-hidden="true" />

      {showArt && (
        <div className="nh-sv-card__art" ref={artRef} aria-hidden="true">
          {(seen || reduce) && <ServiceArt id={service.id} />}
        </div>
      )}

      <div className="nh-sv-card__body">
        <p className="nh-sv-card__meta">
          <span className="nh-sv-card__num" aria-hidden="true">
            {number}
          </span>
          <span>
            {stack.progressLabel} {number} {stack.of} {pad(total)}
          </span>
        </p>

        <h3 className="nh-sv-card__title" id={nameId}>
          {service.title}
        </h3>
        <p className="nh-sv-card__desc">{service.description}</p>

        <p className="nh-sv-card__ideal">
          <strong>{stack.idealLabel}</strong> {service.ideal}
        </p>

        <h4 className="nh-sv-card__label">{stack.deliverablesLabel}</h4>
        <ul className="nh-sv-card__gives">
          {service.deliverables.map((item, i) => (
            <li key={item}>
              <Tick delay={0.15 + i * 0.14} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h4 className="visually-hidden">{stack.techLabel}</h4>
        <ul className="nh-sv-card__tech">
          {service.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="nh-sv-card__cta">
          <Cta to={`/contact?service=${service.id}`}>
            {stack.cta}
            <ServicesIcon name="arrow" className="nh-sv-arr" size={18} />
            <span className="visually-hidden"> : {service.title}</span>
          </Cta>
        </div>
      </div>
    </article>
  );
}
