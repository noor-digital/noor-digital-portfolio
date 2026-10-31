import { useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { servicesPage } from '../../data/site.js';
import { services } from '../../data/services.js';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import ServiceArt from '../home/art/ServiceArt.jsx';
import SectionHead from './SectionHead.jsx';
import ServiceCard from './ServiceCard.jsx';

const pad = (n) => String(n).padStart(2, '0');

// Section « sticky storytelling » (ordinateur) : la scène du service courant reste épinglée à gauche
// et se fond d’un service à l’autre pendant que les quatre cartes défilent à droite. Une barre
// verticale se remplit avec le défilement et le numéro actif (01 / 04) suit. Sur mobile : pile classique.
export default function ServicesStack({ active }) {
  const { stack } = servicesPage;
  const reduce = useReducedMotion();
  const desktop = useMediaQuery('(min-width: 960px)');

  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 60%'] });

  const found = services.findIndex((service) => service.id === active);
  const index = found < 0 ? 0 : found;
  const current = services[index];

  return (
    <section id="services" className="nh-sv-sec nh-sv-sec--night nh-sv-stack" aria-labelledby="sv-stack-title">
      <div className="container">
        <SectionHead id="sv-stack-title" kicker={stack.kicker} title={stack.title} text={stack.text} />

        <div className="nh-sv-stack__grid">
          {desktop && (
            <aside className="nh-sv-stage" aria-hidden="true">
              <div className="nh-sv-stage__top">
                <div className="nh-sv-stage__count">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={current.id}
                      className="nh-sv-stage__now"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      {pad(index + 1)}
                    </motion.span>
                  </AnimatePresence>
                  <span className="nh-sv-stage__total">/ {pad(services.length)}</span>
                </div>
                <span className="nh-sv-stage__name">{current.short}</span>
              </div>

              <div className="nh-sv-stage__frame">
                <span className="nh-sv-stage__bar">
                  <motion.i style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }} />
                </span>
                <div className="nh-sv-stage__art">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current.id}
                      className="nh-sv-stage__scene"
                      initial={reduce ? false : { opacity: 0, scale: 0.96, y: 14 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <ServiceArt id={current.id} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </aside>
          )}

          <ol className="nh-sv-cards" ref={listRef} aria-label={stack.listLabel}>
            {services.map((service, i) => (
              <li key={service.id}>
                <ServiceCard
                  service={service}
                  index={i}
                  total={services.length}
                  showArt={!desktop}
                  isActive={active === service.id}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
