import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { aboutPage, studio } from '../../data/site.js';

// « Pourquoi NOOR » : le mot en filigrane, un faisceau turquoise qui s’allume avec le défilement et révèle le texte,
// et la SEULE carte claire de la page (la citation). Texte : studio.text (data/site.js). Seuls transform et opacity bougent.
export default function WhyNoor() {
  const t = aboutPage.why;
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'center 45%'] });
  const beam = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lead = useTransform(scrollYProgress, [0.05, 0.55], [0.25, 1]);
  const quote = useTransform(scrollYProgress, [0.35, 0.95], [0.25, 1]);
  const glow = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [first, second] = studio.text;

  return (
    <section className="nh-ab-sec nh-ab-sec--ink nh-ab-sec--cut nh-ab-why" ref={ref} aria-labelledby="ab-why-title">
      <span className="nh-ab-why__mark" aria-hidden="true">
        {t.watermark}
      </span>
      <motion.span className="nh-ab-why__glow" aria-hidden="true" style={reduce ? { opacity: 1 } : { opacity: glow }} />
      <div className="container nh-ab-why__grid">
        <div className="nh-ab-why__beamwrap" aria-hidden="true">
          <motion.span className="nh-ab-why__beam" style={reduce ? { scaleY: 1 } : { scaleY: beam }} />
        </div>
        <div className="nh-ab-why__body">
          <p className="nh-ab-kick" id="ab-why-title">
            <span className="nh-ab-slash" aria-hidden="true" />
            {t.kicker}
          </p>
          <motion.p className="nh-ab-why__lead" style={reduce ? undefined : { opacity: lead }}>
            {first}
          </motion.p>
          <motion.blockquote className="nh-ab-why__quote" style={reduce ? undefined : { opacity: quote }}>
            <p>{second}</p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
