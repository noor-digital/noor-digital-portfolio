import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { servicesPage } from '../../data/site.js';
import Panel from '../home/Panel.jsx';
import Cta from '../home/Cta.jsx';
import ServiceArt from '../home/art/ServiceArt.jsx';

const pad = (n) => String(n).padStart(2, '0');

const POLY_ART = [
  'polygon(0 0, 100% 0, 96% 100%, 0 100%)',
  'polygon(4% 0, 100% 0, 100% 100%, 0 100%)',
];
const POLY_INFO = [
  'polygon(5% 0, 100% 0, 100% 100%, 0 100%)',
  'polygon(0 0, 95% 0, 100% 100%, 0 100%)',
];

// Une double-page par service : la scène dessinée dans une case, la fiche (description, livrables,
// action) dans une seconde case qui la chevauche, et un grand numéro en filigrane qui dérive au défilement.
// L’ordre alterne (gauche / droite). Rien n’est replié : tout ce que le service apporte est lisible d’emblée.
export default function ServiceSpread({ service, index, total }) {
  const reduce = useReducedMotion();
  const side = index % 2; // 0 : scène à gauche
  const number = pad(index + 1);
  const nameId = `${service.id}-name`;
  const { deliverablesLabel, cta } = servicesPage;

  const frameRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const numY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // La scène se dessine à son arrivée à l’écran (une seule fois), pas au chargement de la page :
  // sinon elle serait déjà terminée quand le visiteur l’atteint.
  const artRef = useRef(null);
  const seen = useInView(artRef, { once: true, margin: '0px 0px -14% 0px' });

  return (
    <article id={service.id} className="nh-sv-item" data-side={side} aria-labelledby={nameId}>
      <div className="nh-sv-item__frame" ref={frameRef}>
        <motion.span className="nh-sv-num" aria-hidden="true" style={reduce ? undefined : { y: numY }}>
          {number}
        </motion.span>

        <div className="nh-sv-art">
          <Panel poly={POLY_ART[side]}>
            <div className="nh-sv-art__img" ref={artRef}>
              <div className="nh-sv-art__stage">{(seen || reduce) && <ServiceArt id={service.id} />}</div>
            </div>
          </Panel>
        </div>

        <div className="nh-sv-info">
          <Panel poly={POLY_INFO[side]} delay={0.15} className={index % 3 === 1 ? 'is-bright' : ''}>
            <div className="nh-sv-info__body">
              <p className="nh-sv-info__meta">
                <span>
                  {number} sur {pad(total)}
                </span>
                <span>Service</span>
              </p>
              <h2 className="nh-sv-info__name" id={nameId}>
                {service.title}
              </h2>
              <p className="nh-sv-info__desc">{service.description}</p>

              <h3 className="nh-sv-info__label">{deliverablesLabel}</h3>
              <ul className="nh-sv-gives">
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="nh-sv-links">
                <Cta to="/contact">
                  {cta}
                  <span className="visually-hidden"> : {service.title}</span>
                </Cta>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </article>
  );
}
