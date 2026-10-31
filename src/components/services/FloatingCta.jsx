import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { servicesPage } from '../../data/site.js';
import ServicesIcon from './ServicesIcons.jsx';

// Barre d’action discrète : visible après le hero, masquée dès que la clôture (avec ses vrais boutons)
// approche. Deux observateurs passifs, aucun écouteur de scroll.
export default function FloatingCta({ heroId = 'sv-hero', endId = 'services-close' }) {
  const reduce = useReducedMotion();
  const { floating } = servicesPage;
  const [pastHero, setPastHero] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const end = document.getElementById(endId);
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const heroObserver = new IntersectionObserver(([entry]) => {
      // « Après » le hero : il n’est plus visible ET il est passé au-dessus de l’écran.
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    });
    const endObserver = new IntersectionObserver(([entry]) => setAtEnd(entry.isIntersecting));

    if (hero) heroObserver.observe(hero);
    if (end) endObserver.observe(end);
    return () => {
      heroObserver.disconnect();
      endObserver.disconnect();
    };
  }, [heroId, endId]);

  const show = pastHero && !atEnd;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="nh-sv-fcta"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Link to="/contact" className="nh-sv-fcta__link">
            <span className="nh-sv-fcta__text">{floating.text}</span>
            <span className="nh-sv-fcta__go">
              {floating.cta}
              <ServicesIcon name="arrow" className="nh-sv-arr" size={16} />
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
