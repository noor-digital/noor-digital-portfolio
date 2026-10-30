import { NavLink } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { home, routes, site } from '../../data/site.js';
import HomeBrand from './HomeMark.jsx';
import LiveClock from '../LiveClock.jsx';

// Pied de page de l’accueil : identité, navigation, heure de Dakar, retour en haut.
// Les autres pages gardent le pied de page complet (voir Footer.jsx).
export default function HomeFooter() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();
  const credits = home.credits ?? [];

  function backToTop() {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <footer className="nh nh-footer">
      <div className="container">
        <div className="nh-footer__row">
          <div className="nh-footer__brand">
            <HomeBrand />
            <p>{site.signature}</p>
          </div>

          <nav className="nh-footer__nav" aria-label="Navigation du pied de page">
            <ul>
              {routes.map((route) => (
                <li key={route.path}>
                  <NavLink to={route.path} end={route.path === '/'}>
                    {route.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nh-footer__clock">
            <LiveClock />
          </div>
        </div>

        <div className="nh-footer__bottom">
          <p>
            © {year} NOOR DIGITAL. Tous droits réservés.
          </p>
          <p>
            {site.owner}, développeur web full stack. {site.stackLine.replace(/ · /g, ', ')}.
          </p>
          <button type="button" className="nh-footer__top" onClick={backToTop}>
            Haut de page
          </button>
        </div>

        {credits.length > 0 && (
          <p className="nh-footer__credits">
            Photographies :{' '}
            {credits.map((credit, i) => (
              <span key={credit.url ?? credit.label}>
                {i > 0 && ' ; '}
                {credit.label}, {credit.author},{' '}
                <a href={credit.url} target="_blank" rel="noopener noreferrer">
                  {credit.source}
                  <span className="visually-hidden"> (s’ouvre dans un nouvel onglet)</span>
                </a>{' '}
                ({credit.license})
              </span>
            ))}
          </p>
        )}
      </div>
    </footer>
  );
}
