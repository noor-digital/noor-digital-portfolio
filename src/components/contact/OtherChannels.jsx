import { contactPage, site } from '../../data/site.js';
import useCopy from '../../hooks/useCopy.js';
import Reveal from '../Reveal.jsx';
import { ArrowUpRight } from '../Icons.jsx';
import { GithubIcon, LinkedinIcon, MailIcon, WhatsappIcon } from '../home/HomeIcons.jsx';

// Autres moyens : une liste élégante, une ligne par canal (jamais de cartes géantes). Seuls les canaux
// renseignés dans data/site.js apparaissent. L’e-mail se copie en un clic.
export default function OtherChannels() {
  const t = contactPage.channels;
  const [copyState, copy] = useCopy();

  const rows = [
    { key: 'email', label: t.email, value: site.email, href: `mailto:${site.email}`, Icon: MailIcon },
    { key: 'github', label: t.github, value: site.github.replace(/^https?:\/\//, ''), href: site.github, Icon: GithubIcon, external: true },
    site.linkedin && {
      key: 'linkedin',
      label: t.linkedin,
      value: site.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: site.linkedin,
      Icon: LinkedinIcon,
      external: true,
    },
    site.whatsapp && {
      key: 'whatsapp',
      label: t.whatsapp,
      value: site.whatsapp,
      href: `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`,
      Icon: WhatsappIcon,
      external: true,
    },
  ].filter(Boolean);

  return (
    <section className="nh-ct-sec nh-ct-sec--night nh-ct-sec--cut" aria-labelledby="ct-channels-title">
      <div className="container nh-ct-split">
        <div className="nh-ct-split__head">
          <Reveal as="h2" className="nh-ct-h2" id="ct-channels-title">
            {t.title}
          </Reveal>
        </div>
        <div>
          <ul className="nh-ct-list">
            {rows.map(({ key, label, value, href, Icon, external }, i) => (
              <Reveal as="li" key={key} delay={i * 0.06}>
                <a
                  className="nh-ct-list__row"
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon size={24} className="nh-ct-list__icon" />
                  <span className="nh-ct-list__label">{label}</span>
                  <span className="nh-ct-list__value">{value}</span>
                  {external && <span className="visually-hidden"> {contactPage.quick.newTab}</span>}
                  <ArrowUpRight className="nh-ct-list__arrow" />
                </a>
                {key === 'email' && (
                  <button type="button" className="nh-ct-link nh-ct-list__copy" onClick={() => copy(site.email)}>
                    {copyState === 'copied' ? t.copied : t.copy}
                  </button>
                )}
              </Reveal>
            ))}
          </ul>
          <p className="nh-ct-copystate" role="status" aria-live="polite" data-kind={copyState}>
            {copyState === 'error' ? t.copyError : copyState === 'copied' ? t.copied : ''}
          </p>
        </div>
      </div>
    </section>
  );
}
