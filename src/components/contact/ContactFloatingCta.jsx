import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { contactPage } from '../../data/site.js';
import ServicesIcon from '../services/ServicesIcons.jsx';

// Barre « Écrire » discrète, mobile seulement (voir contact.css) : visible une fois le hero dépassé,
// masquée quand le formulaire est à l’écran. Deux observateurs passifs, aucun écouteur de scroll.
export default function ContactFloatingCta({ onWrite }) {
  const reduce = useReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [onForm, setOnForm] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const hero = document.getElementById('ct-hero');
    const form = document.getElementById('ct-form-section');
    const heroObserver = new IntersectionObserver(([entry]) =>
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom < 0),
    );
    const formObserver = new IntersectionObserver(([entry]) => setOnForm(entry.isIntersecting), {
      rootMargin: '-10% 0px -10% 0px',
    });
    if (hero) heroObserver.observe(hero);
    if (form) formObserver.observe(form);
    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {pastHero && !onForm && (
        <motion.div
          className="nh-ct-fab"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <button type="button" className="nh-ct-fab__btn" onClick={onWrite}>
            <ServicesIcon name="chat" size={18} className="nh-sv-ico" />
            {contactPage.floating.label}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
