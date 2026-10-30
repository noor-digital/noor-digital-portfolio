import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { routes } from '../data/site.js';
import { EASE } from '../lib/motion.js';
import Wordmark from '../components/Wordmark.jsx';
import HomeBrand from '../components/home/HomeMark.jsx';
import HomeMenu from '../components/home/HomeMenu.jsx';
import MobileMenu from './MobileMenu.jsx';
import { isMangaPath } from '../lib/mangaRoutes.js';

// Réglages du masquage au scroll. Les deux seuils différents (72 px vers le bas,
// 24 px vers le haut) évitent que le header ne clignote au moindre mouvement.
const TOP_ZONE = 96;
const HIDE_AFTER = 72;
const SHOW_AFTER = 24;

export default function Header() {
  const { pathname } = useLocation();
  // L’accueil a sa propre variante d’en-tête (version manga cinématique) ; les autres pages gardent la V2.
  // « isHome » désigne ici toute page en direction manga (voir lib/mangaRoutes.js), pas seulement l’accueil.
  const isHome = isMangaPath(pathname);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const lastY = useRef(0);
  const travel = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const delta = y - lastY.current;
    lastY.current = y;

    // Fond plein dès que la page a quitté le haut (le header est transparent sur le Hero).
    setScrolled(y > 8);

    if (y < TOP_ZONE) {
      travel.current = 0;
      setHidden(false);
      return;
    }
    if (delta === 0) return;

    // On repart de zéro quand la direction change.
    if (Math.sign(delta) !== Math.sign(travel.current)) travel.current = 0;
    travel.current += delta;

    if (travel.current > HIDE_AFTER) {
      // Jamais de masquage tant que le focus clavier est dans le header.
      const focusInside = headerRef.current?.contains(document.activeElement);
      if (!focusInside) setHidden(true);
      travel.current = 0;
    } else if (travel.current < -SHOW_AFTER) {
      setHidden(false);
      travel.current = 0;
    }
  });

  // Nouvelle page : le menu se ferme et le header réapparaît.
  useEffect(() => {
    setMenuOpen(false);
    setHidden(false);
  }, [pathname]);

  // Si la fenêtre devient assez large pour la navigation desktop, on ferme le menu.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px)');
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  return (
    <>
      <header
        className={`header${isHome ? ' header--home nh' : ''}`}
        ref={headerRef}
        data-hidden={hidden}
        data-scrolled={scrolled}
      >
        <div className="container header__inner">
          {isHome ? <HomeBrand /> : <Wordmark />}

          <div className="header__right">
            <nav className="nav" aria-label="Navigation principale">
              <ul className="nav__list">
                {routes.map((route) => (
                  <li key={route.path}>
                    <NavLink to={route.path} end={route.path === '/'} className="nav__link">
                      {({ isActive }) =>
                        isHome ? (
                          <>
                            <span>{route.label}</span>
                            {isActive && (
                              <motion.span
                                layoutId="nh-nav-indicator"
                                className="nh-nav__ind"
                                transition={{ duration: 0.45, ease: EASE }}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            <span className="mono" aria-hidden="true">
                              {route.index}
                            </span>
                            <span>{route.label}</span>
                            {isActive && (
                              <motion.span
                                layoutId="nav-indicator"
                                className="nav__indicator"
                                transition={{ duration: 0.45, ease: EASE }}
                              />
                            )}
                          </>
                        )
                      }
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              ref={menuButtonRef}
              type="button"
              className="menu-button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
              onClick={() => setMenuOpen(true)}
            >
              <span>Menu</span>
              <span className="menu-button__bars" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Le menu est un frère du header (et non son enfant) : le flou du header
          casserait sinon le positionnement plein écran. */}
      <AnimatePresence>
        {menuOpen &&
          (isHome ? (
            <HomeMenu currentPath={pathname} onClose={closeMenu} />
          ) : (
            <MobileMenu currentPath={pathname} onClose={closeMenu} />
          ))}
      </AnimatePresence>
    </>
  );
}
