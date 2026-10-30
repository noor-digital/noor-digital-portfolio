import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { EASE, EASE_IN } from '../lib/motion.js';
import { useScrollManager } from './ScrollManager.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Projects from '../pages/Projects.jsx';
import Services from '../pages/Services.jsx';
import Contact from '../pages/Contact.jsx';
import NotFound from '../pages/NotFound.jsx';

// Transition signature (≈ 650 ms) :
//  1. l’ancien contenu monte légèrement et s’efface (200 ms) ;
// Au premier chargement (ou à l’actualisation), la page s’affiche tout de suite : aucune animation d’entrée.
//  2. le nouveau contenu entre (450 ms) ;
//  3. le titre se révèle ligne par ligne (voir PageTitle), puis le reste au scroll.
const pageVariants = {
  initial: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2, ease: EASE_IN } },
};

// Mouvement réduit : simple fondu rapide, sans déplacement.
const fadeVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export default function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const { apply } = useScrollManager();

  // Le chemin sert de clé : un changement d’ancre (#slug) ne relance pas la transition.
  const pageKey = location.pathname.replace(/\/+$/, '') || '/';

  // On compte les navigations pour ne pas déplacer le focus ni animer l’entrée
  // au premier chargement de la page.
  const [navigations, setNavigations] = useState(0);
  const previousKey = useRef(pageKey);
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (previousKey.current !== pageKey) {
      previousKey.current = pageKey;
      hasNavigated.current = true;
      setNavigations((count) => count + 1);
    }
  }, [pageKey]);

  // Après l’entrée de la nouvelle page, le focus va sur son titre principal.
  function focusTitle(definition) {
    if (definition !== 'enter' || !hasNavigated.current) return;
    document.querySelector('main h1')?.focus({ preventScroll: true });
  }

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={apply}>
        <motion.div
          key={pageKey}
          variants={reduceMotion ? fadeVariants : pageVariants}
          initial={navigations === 0 && !hasNavigated.current ? false : 'initial'}
          animate="enter"
          exit="exit"
          onAnimationComplete={focusTitle}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
