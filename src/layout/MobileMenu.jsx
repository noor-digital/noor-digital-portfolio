import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { routes, site } from '../data/site.js';
import { EASE } from '../lib/motion.js';
import useBodyLock from '../hooks/useBodyLock.js';
import Wordmark from '../components/Wordmark.jsx';
import Button from '../components/Button.jsx';
import TextLink from '../components/TextLink.jsx';
import LiveClock from '../components/LiveClock.jsx';

// Menu plein écran (< 900 px).
// - se ferme avec Échap, avec le bouton « Fermer » ou au clic sur un lien ;
// - le focus clavier reste prisonnier du menu tant qu’il est ouvert ;
// - le défilement de la page est bloqué ;
// - à la fermeture volontaire, le focus revient sur le bouton « Menu » (géré par Header).
export default function MobileMenu({ currentPath, onClose }) {
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  useBodyLock(true);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose(true);
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!panelRef.current.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // Clic sur un lien : on ferme. Si c’est la page courante, aucune navigation n’aura lieu,
  // donc on rend le focus au bouton « Menu ». Sinon, la nouvelle page place le focus sur son titre.
  const handleNavigate = (path) => onClose(path === currentPath);

  return (
    <motion.div
      id="mobile-menu"
      ref={panelRef}
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="container mobile-menu__top">
        <Wordmark onClick={() => handleNavigate('/')} />
        <button
          ref={closeButtonRef}
          type="button"
          className="mobile-menu__close"
          onClick={() => onClose(true)}
        >
          Fermer
        </button>
      </div>

      <nav className="container mobile-menu__list" aria-label="Navigation principale">
        <ul>
          {routes.map((route, i) => (
            <li className="mobile-menu__item" key={route.path}>
              <NavLink
                to={route.path}
                end={route.path === '/'}
                className="mobile-menu__link"
                onClick={() => handleNavigate(route.path)}
              >
                <span className="mono" aria-hidden="true">
                  {route.index}
                </span>
                <span className="mask">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: EASE }}
                  >
                    {route.label}
                  </motion.span>
                </span>
              </NavLink>
              <motion.span
                className="mobile-menu__line"
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: EASE }}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="container mobile-menu__foot">
        <div className="mobile-menu__foot-row">
          <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
        </div>
        <div className="mobile-menu__foot-row">
          <Button to="/contact" onClick={() => handleNavigate('/contact')}>
            Me contacter
          </Button>
          <LiveClock />
        </div>
      </div>
    </motion.div>
  );
}
