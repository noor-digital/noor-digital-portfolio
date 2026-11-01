import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { projectsPage } from '../../data/site.js';
import ServicesIcon from '../services/ServicesIcons.jsx';

// Barre « Un projet ? Parlons-en », mobile seulement (voir projects.css) : visible après le hero, masquée près de la
// clôture. Deux observateurs passifs, aucun écouteur de scroll.
export default function ProjectsFloatingCta({ heroId = 'pj-hero', endId = 'projects-close' }) {
  const reduce = useReducedMotion();
  const { floating } = projectsPage;
  const [pastHero, setPastHero] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const hero = document.getElementById(heroId);
    const end = document.getElementById(endId);
    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom < 0));
    const endObserver = new IntersectionObserver(([entry]) => setAtEnd(entry.isIntersecting));
    if (hero) heroObserver.observe(hero);
    if (end) endObserver.observe(end);
    return () => {
      heroObserver.disconnect();
      endObserver.disconnect();
    };
  }, [heroId, endId]);

  return (
    <AnimatePresence>
      {pastHero && !atEnd && (
        <motion.div
          className="nh-pj-fcta"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <Link to="/contact" className="nh-pj-fcta__link">
            <span>{floating.text}</span>
            <span className="nh-pj-fcta__go">
              {floating.cta}
              <ServicesIcon name="arrow" size={16} className="nh-sv-arr" />
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
