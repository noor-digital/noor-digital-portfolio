import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { home } from '../../data/site.js';
import { process } from '../../data/services.js';
import TechShowcase from './TechShowcase.jsx';
import TitleReveal from './TitleReveal.jsx';

// Méthode : la lumière descend le long des quatre étapes. Le rayon se dessine avec le défilement,
// chaque étape s’allume quand il l’atteint. C’est une vraie séquence : les numéros ont donc un sens.

export function Step({ step, index, total, progress }) {
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(reduce);
  const threshold = (index + 0.4) / total;
  useMotionValueEvent(progress, 'change', (v) => {
    if (!reduce) setLit(v >= threshold);
  });

  return (
    <li className={`nh-step${lit ? ' is-lit' : ''}`} data-side={index % 2 === 0 ? 'left' : 'right'}>
      <span className="nh-step__node" aria-hidden="true" />
      <span className="nh-step__num" aria-hidden="true">
        {index + 1}
      </span>
      <div className="nh-step__body">
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </div>
    </li>
  );
}

export default function Method() {
  const reduce = useReducedMotion();
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 55%'] });
  const { title, text } = home.method;
  const tech = home.tech;

  return (
    <>
      <section id="methode" className="nh-method" aria-labelledby="method-title">
        <div className="container">
          <header className="nh-method__head">
            <TitleReveal lines={[title]} id="method-title" />
            <p>{text}</p>
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

      <section id="technologies" className="nh-tech" aria-labelledby="tech-title">
        <div className="container">
          <header className="nh-tech__head">
            <TitleReveal lines={[tech.title]} id="tech-title" />
            <p>{tech.text}</p>
          </header>
          <TechShowcase />
        </div>
      </section>
    </>
  );
}
