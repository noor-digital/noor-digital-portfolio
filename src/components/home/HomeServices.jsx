import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { home } from '../../data/site.js';
import { services } from '../../data/services.js';
import TitleReveal from './TitleReveal.jsx';
import ServiceArt from './art/ServiceArt.jsx';

// Services : un sélecteur à onglets (clavier : flèches, Début, Fin) et une scène dessinée par service.
// Zone volontairement calme : le mouvement ne répond qu’à l’action du visiteur.
export default function HomeServices() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);
  const { title, text, deliverablesLabel } = home.services;
  const current = services[active];

  function select(index, focus = false) {
    const next = (index + services.length) % services.length;
    setActive(next);
    if (focus) tabsRef.current[next]?.focus();
  }

  function onKeyDown(event, index) {
    const keys = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: services.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key], true);
  }

  return (
    <section id="services" className="nh-services" aria-labelledby="services-title">
      <div className="container nh-services__grid">
        <div className="nh-services__side">
          <TitleReveal lines={[title]} id="services-title" />
          <p className="nh-services__text">{text}</p>

          <div className="nh-tabs" role="tablist" aria-label="Services" aria-orientation="vertical">
            {services.map((service, i) => (
              <button
                key={service.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`svc-tab-${service.id}`}
                aria-selected={i === active}
                aria-controls="svc-panel"
                tabIndex={i === active ? 0 : -1}
                className="nh-tab"
                onClick={() => select(i)}
                onKeyDown={(event) => onKeyDown(event, i)}
              >
                <span className="nh-tab__bar" aria-hidden="true" />
                <span className="nh-tab__title">{service.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="nh-stage" role="tabpanel" id="svc-panel" aria-labelledby={`svc-tab-${current.id}`}>
          <div className="nh-stage__art">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                className="nh-stage__scene"
                initial={reduce ? false : { clipPath: 'polygon(0 0, 0 0, -12% 100%, -12% 100%)' }}
                animate={{ clipPath: 'polygon(0 0, 112% 0, 100% 100%, -12% 100%)' }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <ServiceArt id={current.id} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="nh-stage__copy">
            <p className="nh-stage__desc">{current.description}</p>
            <h3 className="nh-stage__label">{deliverablesLabel}</h3>
            <ul className="nh-stage__list">
              {current.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
