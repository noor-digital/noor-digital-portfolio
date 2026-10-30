import { Link, useLocation } from 'react-router-dom';
import { routes, site } from '../data/site.js';
import Wordmark from '../components/Wordmark.jsx';
import LiveClock from '../components/LiveClock.jsx';
import Hairline from '../components/Hairline.jsx';
import HomeFooter from '../components/home/HomeFooter.jsx';
import { isMangaPath } from '../lib/mangaRoutes.js';

// Canaux affichés : uniquement ceux renseignés dans src/data/site.js (null = masqué).
function footerChannels() {
  const channels = [{ label: 'E-mail', href: `mailto:${site.email}`, text: site.email }];
  channels.push({ label: 'GitHub', href: site.github, text: 'GitHub', external: true });
  if (site.linkedin) {
    channels.push({ label: 'LinkedIn', href: site.linkedin, text: 'LinkedIn', external: true });
  }
  if (site.whatsapp) {
    channels.push({
      label: 'WhatsApp',
      href: `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`,
      text: 'WhatsApp',
      external: true,
    });
  }
  return channels;
}

export default function Footer() {
  const { pathname } = useLocation();
  // Pages en direction manga : pied de page compact. Les autres gardent le pied de page complet.
  if (isMangaPath(pathname)) return <HomeFooter />;

  const year = new Date().getFullYear();
  const channels = footerChannels();

  return (
    <footer className="footer surface--0">
      <div className="container">
        <Hairline />
        <div className="grid footer__top" style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
          <div className="footer__brand">
            <Wordmark />
            <p className="footer__signature">{site.signature}</p>
            <p className="footer__owner small">
              <strong>{site.owner}</strong>
              <span>{site.jobTitle}</span>
            </p>
          </div>

          <nav className="footer__col footer__col--nav" aria-label="Navigation du pied de page">
            <h2 className="mono">Navigation</h2>
            <ul className="footer__list footer__list--nav">
              {routes.map((route) => (
                <li key={route.path}>
                  <Link to={route.path} className="small">
                    <span className="mono" aria-hidden="true">
                      {route.index}
                    </span>
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col footer__col--contact">
            <h2 className="mono">Contact</h2>
            <ul className="footer__list">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    className="small"
                    {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {channel.text}
                    {channel.external && (
                      <span className="visually-hidden"> (s’ouvre dans un nouvel onglet)</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="mono">
            © {year} {site.name} — {site.owner}
          </p>
          <LiveClock />
        </div>
      </div>
    </footer>
  );
}
