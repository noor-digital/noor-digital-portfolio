import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { aboutPage, journey } from '../../data/site.js';
import Reveal from '../Reveal.jsx';
import ServicesIcon from '../services/ServicesIcons.jsx';

function Step({ item, index, total, progress, children, last }) {
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(Boolean(reduce));
  const threshold = (index + 0.4) / total;
  useMotionValueEvent(progress, 'change', (value) => {
    if (!reduce) setLit(value >= threshold);
  });
  return (
    <li className={`nh-ab-tl__step${lit ? ' is-lit' : ''}${last ? ' is-last' : ''}`}>
      <span className="nh-ab-tl__node" aria-hidden="true" />
      <Reveal className="nh-ab-tl__cardwrap">{children}</Reveal>
    </li>
  );
}

// Parcours : frise verticale (centrée avec alternance sur ordinateur, à gauche sur mobile). Le rayon turquoise se
// remplit avec le défilement et les nœuds s’allument. Étapes : `journey` uniquement ; `period`, `description` et
// `skills` n’apparaissent que s’ils sont renseignés (jamais de date inventée). La dernière étape est une invitation.
export default function Timeline() {
  const t = aboutPage;
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] });
  const total = journey.length + 1;

  return (
    <section className="nh-ab-sec nh-ab-sec--navy nh-ab-sec--cut" aria-labelledby="ab-journey-title">
      <div className="container">
        <Reveal as="h2" className="nh-ab-h2" id="ab-journey-title">
          {t.journeyTitle}
        </Reveal>
        <Reveal as="p" delay={0.06} className="nh-ab-lead">
          {t.journeyText}
        </Reveal>

        <div className="nh-ab-tl" ref={ref}>
          <span className="nh-ab-tl__rail" aria-hidden="true" />
          <motion.span className="nh-ab-tl__beam" aria-hidden="true" style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }} />
          <ol>
            {journey.map((item, i) => (
              <Step key={item.title} item={item} index={i} total={total} progress={scrollYProgress}>
                <article className="nh-ab-card nh-ab-tl__card">
                  <p className="nh-ab-tl__label">
                    {item.label}
                    {item.period && <span> · {item.period}</span>}
                  </p>
                  <h3>{item.title}</h3>
                  <p className="nh-ab-tl__status">{item.status}</p>
                  {item.description && <p className="nh-ab-tl__desc">{item.description}</p>}
                  {item.skills?.length > 0 && (
                    <ul className="nh-ab-tl__skills">
                      {item.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  )}
                </article>
              </Step>
            ))}
            <Step item={t.journeyNext} index={journey.length} total={total} progress={scrollYProgress} last>
              <article className="nh-ab-card nh-ab-tl__card nh-ab-tl__card--next">
                <p className="nh-ab-tl__label">{t.journeyNext.label}</p>
                <h3>{t.journeyNext.title}</h3>
                <p className="nh-ab-tl__desc">{t.journeyNext.text}</p>
                <Link className="nh-ab-textlink" to="/contact">
                  {t.journeyNext.cta}
                  <ServicesIcon name="arrow" size={18} className="nh-sv-arr" />
                </Link>
              </article>
            </Step>
          </ol>
        </div>
      </div>
    </section>
  );
}
