import { NavLink } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { contactPage, home, routes, site } from '../../data/site.js';
import HomeBrand from './HomeMark.jsx';
import LiveClock from '../LiveClock.jsx';
import Reveal from '../Reveal.jsx';
import { ArrowRight, ArrowUpRight } from '../Icons.jsx';
import { GithubIcon, LinkedinIcon, MailIcon, WhatsappIcon } from './HomeIcons.jsx';

const isUrl = (value) => typeof value === 'string' && /^https?:\/\//i.test(value);
const shortUrl = (value) => value.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');

// Canaux affichés : uniquement ceux renseignés dans src/data/site.js.
// Un canal à `null` (ou une adresse qui n’est pas un lien valide) reste masqué.
function footerChannels() {
  const channels = [];

  if (site.email) {
    channels.push({
      key: 'mail',
      label: 'E-mail',
      value: site.email,
      href: `mailto:${site.email}`,
      Icon: MailIcon,
    });
  }
  if (site.whatsapp) {
    // `site.whatsapp` est déjà un lien wa.me ; à défaut, on reconstruit le lien depuis le numéro.
    const href = isUrl(site.whatsapp)
      ? site.whatsapp
      : `https://wa.me/${String(site.whatsapp).replace(/\D/g, '')}`;
    channels.push({
      key: 'whatsapp',
      label: 'WhatsApp',
      value: contactPage.quick.whatsapp.hint,
      href,
      Icon: WhatsappIcon,
      external: true,
    });
  }
  if (isUrl(site.github)) {
    channels.push({
      key: 'github',
      label: 'GitHub',
      value: shortUrl(site.github),
      href: site.github,
      Icon: GithubIcon,
      external: true,
    });
  }
  if (isUrl(site.linkedin)) {
    channels.push({
      key: 'linkedin',
      label: 'LinkedIn',
      value: shortUrl(site.linkedin),
      href: site.linkedin,
      Icon: LinkedinIcon,
      external: true,
    });
  }
  return channels;
}

// Pied de page des pages en direction manga (accueil, à propos, projets, services, contact).
// Trois zones : identité, navigation, contact et réseaux — puis une dernière ligne
// (droits, heure de Dakar, retour en haut). Le pied de page historique (Footer.jsx)
// n’est plus utilisé que par la page « introuvable ».
export default function HomeFooter() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();
  const credits = home.credits ?? [];
  const channels = footerChannels();
  // Même découpage que le titre de l’accueil : « La lumière / qui structure. »
  const [lineOne, lineTwo] = home.hero.titleLines ?? [site.signature, ''];

  function backToTop(event) {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    // Au clavier (detail === 0), le focus suit : sinon il resterait en bas de page.
    if (event.detail === 0) document.getElementById('main')?.focus({ preventScroll: true });
  }

  return (
    <footer className="nh nh-footer">
      <div className="container">
        <span className="nh-footer__rule" aria-hidden="true" />

        <div className="nh-footer__grid">
          {/* A — Identité */}
          <Reveal className="nh-footer__identity">
            <HomeBrand />
            <p className="nh-footer__signature">
              <span>{lineOne}</span>
              {lineTwo && <span className="nh-footer__signature-line">{lineTwo}</span>}
            </p>
            <p className="nh-footer__owner">
              <strong>{site.owner}</strong>
              <span>
                Développeur web full stack · {site.location}
              </span>
              <span className="nh-footer__stack">{site.stackLine}</span>
            </p>
          </Reveal>

          {/* B — Navigation */}
          <Reveal as="nav" className="nh-footer__nav" aria-label="Navigation du pied de page" delay={0.08}>
            <h2 className="nh-footer__label">Navigation</h2>
            <ul>
              {routes.map((route) => (
                <li key={route.path}>
                  <NavLink to={route.path} end={route.path === '/'} className="nh-footer__link">
                    <span className="nh-footer__idx" aria-hidden="true">
                      {route.index}
                    </span>
                    <span className="nh-footer__txt">{route.label}</span>
                    <ArrowRight className="nh-footer__arrow" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* C — Contact et réseaux */}
          <Reveal className="nh-footer__contact" delay={0.16}>
            <h2 className="nh-footer__label">Contact</h2>
            <ul>
              {channels.map(({ key, label, value, href, Icon, external }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="nh-footer__channel"
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="nh-footer__ico" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <span className="nh-footer__ch-text">
                      <span className="nh-footer__ch-label">{label}</span>
                      <span className="nh-footer__ch-value">{value}</span>
                    </span>
                    {external && (
                      <>
                        <ArrowUpRight className="nh-footer__out" />
                        <span className="visually-hidden"> (s’ouvre dans un nouvel onglet)</span>
                      </>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Signature graphique : le nom, dessiné au trait, comme sur le titre de l’accueil. */}
        <p className="nh-footer__mark" aria-hidden="true">
          {site.name}
        </p>

        <div className="nh-footer__bottom">
          <p className="nh-footer__copy">© {year} {site.name}. Tous droits réservés.</p>
          <div className="nh-footer__clock">
            <LiveClock />
          </div>
          <button type="button" className="nh-footer__top" onClick={backToTop}>
            <span>Haut de page</span>
            <svg className="nh-footer__top-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
              <path d="M8 14V2M3 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
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
