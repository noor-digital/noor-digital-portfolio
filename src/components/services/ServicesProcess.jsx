import { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { servicesPage } from '../../data/site.js';
import { process } from '../../data/services.js';
import TitleReveal from '../home/TitleReveal.jsx';
import { Step } from '../home/Method.jsx';

// Méthode : même rayon qui descend que sur l’accueil (mêmes étapes, même composant), ici sur la page
// qui détaille ce que je propose. Les numéros ont un sens : c’est une vraie séquence.
export default function ServicesProcess() {
  const reduce = useReducedMotion();
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 55%'] });
  const { processTitle, processText } = servicesPage;

  return (
    <section className="nh-method nh-sv-process" aria-labelledby="sv-process-title">
      <div className="container">
        <header className="nh-method__head">
          <TitleReveal lines={[processTitle]} id="sv-process-title" />
          <p>{processText}</p>
        </header>

        <ol className="nh-steps" ref={listRef}>
          <span className="nh-steps__rail" aria-hidden="true" />
          <motion.span
            className="nh-steps__beam"
            aria-hidden="true"
            style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }}
          />
          {process.map((step, i) => (
            <Step key={step.title} step={step} index={i} total={process.length} progress={scrollYProgress} />
          ))}
        </ol>
      </div>
    </section>
  );
}
