import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { servicesPage } from '../../data/site.js';
import { process } from '../../data/services.js';
import SectionHead from './SectionHead.jsx';
import ServicesIcon from './ServicesIcons.jsx';

const pad = (n) => String(n).padStart(2, '0');

function FlowStep({ step, index, total, progress }) {
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(Boolean(reduce));
  const threshold = (index + 0.3) / total;
  useMotionValueEvent(progress, 'change', (value) => {
    if (!reduce) setLit(value >= threshold);
  });

  return (
    <li className={`nh-sv-flow__step${lit ? ' is-lit' : ''}`}>
      <span className="nh-sv-flow__node" aria-hidden="true">
        <ServicesIcon name={step.icon} size={22} />
      </span>
      <div className="nh-sv-flow__card">
        <p className="nh-sv-flow__num" aria-hidden="true">
          {servicesPage.processLabel} {pad(index + 1)}
        </p>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
        {step.duration && <p className="nh-sv-flow__time">{step.duration}</p>}
      </div>
    </li>
  );
}

// Méthode en quatre étapes. Toutes alignées du même côté du rayon (plus d’alternance) : l’étape atteinte
// s’allume (bordure, numéro, icône) et le rayon se remplit avec le défilement. Les étapes à venir restent lisibles.
export default function ServicesProcess() {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start 70%', 'end 60%'] });

  return (
    <section className="nh-sv-sec nh-sv-sec--navy nh-sv-sec--cut" aria-labelledby="sv-process-title">
      <div className="container">
        <div className="nh-sv-split">
          <div className="nh-sv-split__head">
            <SectionHead id="sv-process-title" title={servicesPage.processTitle} text={servicesPage.processText} />
          </div>

          <div className="nh-sv-flow" ref={wrapRef}>
            <span className="nh-sv-flow__rail" aria-hidden="true" />
            <motion.span
              className="nh-sv-flow__beam"
              aria-hidden="true"
              style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }}
            />
            <ol>
              {process.map((step, i) => (
                <FlowStep key={step.title} step={step} index={i} total={process.length} progress={scrollYProgress} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
