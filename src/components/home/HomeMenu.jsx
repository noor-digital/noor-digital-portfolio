import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { routes, site } from '../../data/site.js';
import { EASE } from '../../lib/motion.js';
import useBodyLock from '../../hooks/useBodyLock.js';
import HomeBrand from './HomeMark.jsx';
import Cta from './Cta.jsx';

// Menu plein écran de l’accueil (< 900 px) : il entre par un balayage en diagonale, comme une case
// qui se révèle. Même comportement d’accessibilité que le menu des autres pages :
// Échap ferme, le focus reste dans le menu, le défilement est bloqué, le focus revient sur « Menu ».
export default function HomeMenu({ currentPath, onClose }) {
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

  // Clic sur la page courante : pas de navigation, donc le focus revient sur « Menu ».
  const handleNavigate = (path) => onClose(path === currentPath);

  return (
    <motion.div
      id="mobile-menu"
      ref={panelRef}
      className="nh nh-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
      animate={{ clipPath: 'polygon(-20% 0, 100% 0, 100% 100%, -40% 100%)' }}
      exit={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {/* Traits de concentration : la même grammaire que le Hero, en fond. */}
      <svg className="nh-menu__lines" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <g fill="#F1F5F9">
          {Array.from({ length: 22 }, (_, i) => {
            const a = (i / 22) * Math.PI * 2;
            const p = (r, d) => `${Math.round(330 + Math.cos(a + d) * r)},${Math.round(120 + Math.sin(a + d) * r)}`;
            return <polygon key={i} points={`${p(70, 0)} ${p(900, -0.012)} ${p(900, 0.012)}`} opacity={0.05 + (i % 4) * 0.025} />;
          })}
        </g>
      </svg>

      <div className="container nh-menu__top">
        <HomeBrand onClick={() => handleNavigate('/')} />
        <button ref={closeButtonRef} type="button" className="nh-menu__close" onClick={() => onClose(true)}>
          Fermer
        </button>
      </div>

      <nav className="container nh-menu__list" aria-label="Navigation principale">
        <ul>
          {routes.map((route, i) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                end={route.path === '/'}
                className="nh-menu__link"
                onClick={() => handleNavigate(route.path)}
              >
                <span className="nh-menu__mask">
                  <motion.span
                    initial={{ y: '110%', skewX: -12 }}
                    animate={{ y: '0%', skewX: 0 }}
                    transition={{ duration: 0.6, delay: 0.18 + i * 0.07, ease: EASE }}
                  >
                    {route.label}
                  </motion.span>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container nh-menu__foot">
        <a className="nh-menu__mail" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <Cta to="/contact" onClick={() => handleNavigate('/contact')}>
          Me contacter
        </Cta>
      </div>
    </motion.div>
  );
}
