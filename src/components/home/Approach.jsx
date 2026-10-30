import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { home } from '../../data/site.js';
import TitleReveal from './TitleReveal.jsx';
import { CloseUpArt, PanoramaArt } from './art/PanelArt.jsx';

// Une case : forme à pans coupés, liseré clair, et un rideau d’encre qui se retire en diagonale
// quand la case entre à l’écran (une seule fois).
function Panel({ className = '', poly, delay = 0, children, innerRef, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <div className={`nh-panel ${className}`} style={{ '--poly': poly }} {...rest}>
      <div className="nh-panel__in" ref={innerRef}>
        {children}
        {!reduce && (
          <motion.span
            className="nh-panel__wipe"
            aria-hidden="true"
            initial={{ x: '0%' }}
            whileInView={{ x: '112%' }}
            viewport={{ once: true, margin: '0px 0px -14% 0px' }}
            transition={{ duration: 0.95, delay, ease: EASE }}
          />
        )}
      </div>
    </div>
  );
}

export default function Approach() {
  const reduce = useReducedMotion();
  const { title, lead, meaning, solo, promise, sheetTitle, facts } = home.approach;

  // Changement de cadrage : le gros plan recule doucement pendant que la case traverse l’écran.
  const closeRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: closeRef, offset: ['start end', 'end start'] });
  const zoom = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const drift = useTransform(scrollYProgress, [0, 1], ['-6%', '5%']);

  return (
    <section id="approche" className="nh-approach" aria-labelledby="approach-title">
      <div className="container">
        <header className="nh-approach__head">
          <TitleReveal lines={title} id="approach-title" />
          <div className="nh-approach__lead">
            <p>{lead}</p>
            <p>{promise}</p>
          </div>
        </header>

        <div className="nh-board">
          <Panel
            className="nh-board__a"
            poly="polygon(0 0, 100% 0, 95% 100%, 0 100%)"
            innerRef={closeRef}
          >
            <motion.div className="nh-panel__art" style={reduce ? undefined : { scale: zoom, y: drift }}>
              <CloseUpArt />
            </motion.div>
          </Panel>

          <Panel className="nh-board__b" poly="polygon(5% 0, 100% 0, 100% 100%, 0 100%)" delay={0.12}>
            <div className="nh-narration">
              <span className="nh-narration__bar" aria-hidden="true" />
              <h3>{meaning.title}</h3>
              <p>{meaning.text}</p>
            </div>
          </Panel>

          <Panel className="nh-board__c" poly="polygon(0 0, 100% 0, 100% 100%, 6% 100%)" delay={0.22}>
            <div className="nh-sheet">
              <h3>{sheetTitle}</h3>
              <dl>
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Panel>

          <Panel className="nh-board__d" poly="polygon(0 7%, 100% 0, 100% 100%, 0 100%)" delay={0.1}>
            <div className="nh-panel__art nh-panel__art--pano">
              <PanoramaArt />
            </div>
            <div className="nh-solo">
              <h3>{solo.title}</h3>
              <p>{solo.text}</p>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
