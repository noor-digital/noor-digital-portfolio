import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Gestion du défilement entre les pages.
//  - nouvelle navigation  → retour en haut de page ;
//  - bouton Retour/Avancer → position précédente restaurée ;
//  - lien avec ancre (#slug) → défilement jusqu’à l’élément.
//
// Le hook renvoie `apply()` : AnimatedRoutes l’appelle au moment exact où l’ancienne page
// a fini de sortir, pour que le défilement ne « saute » pas pendant l’animation.
//
// Un seul écouteur `scroll` passif, qui ne fait qu’écrire un nombre dans une ref
// (aucun rendu React, aucun coût).
// Défile jusqu’à une ancre, puis la garde alignée pendant 2 secondes : les polices web et les images
// changent la hauteur de la page après coup et feraient glisser la cible sous l’en-tête fixe.
// On ne réaligne que si le visiteur n’a pas bougé ; dès qu’il agit (molette, toucher, clavier), on s’arrête.
function scrollToAnchor(target) {
  target.scrollIntoView();
  let y = window.scrollY;

  const observer = new ResizeObserver(() => {
    if (Math.abs(window.scrollY - y) < 2) {
      target.scrollIntoView();
      y = window.scrollY;
    }
  });
  observer.observe(document.body);

  const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
  const stop = () => {
    observer.disconnect();
    events.forEach((name) => window.removeEventListener(name, stop));
    window.clearTimeout(timer);
  };
  const timer = window.setTimeout(stop, 2000);
  events.forEach((name) => window.addEventListener(name, stop, { passive: true, once: true }));
}

export function useScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();

  const lastY = useRef(0);
  const positions = useRef(new Map());
  const latest = useRef({ location, navigationType });

  useEffect(() => {
    latest.current = { location, navigationType };
  }, [location, navigationType]);

  // On gère nous-mêmes la restauration du défilement.
  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    const onScroll = () => {
      lastY.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.history.scrollRestoration = previous;
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Mémorise la position de la page que l’on quitte.
  useEffect(() => {
    const key = location.key;
    return () => {
      positions.current.set(key, lastY.current);
    };
  }, [location.key]);

  // Arrivée directe sur une URL avec ancre.
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) scrollToAnchor(target);
    });
    return () => window.cancelAnimationFrame(frame);
    // Uniquement au premier affichage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function apply() {
    const { location: current, navigationType: type } = latest.current;

    // Deux frames : on laisse la nouvelle page se monter avant de défiler.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (current.hash) {
          const target = document.getElementById(decodeURIComponent(current.hash.slice(1)));
          if (target) {
            scrollToAnchor(target);
            return;
          }
        }
        if (type === 'POP') {
          window.scrollTo(0, positions.current.get(current.key) ?? 0);
          return;
        }
        window.scrollTo(0, 0);
      });
    });
  }

  return { apply };
}
