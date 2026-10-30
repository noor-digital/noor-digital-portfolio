import { useRef } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { contactCopy, home, site } from '../../data/site.js';
import TitleReveal from './TitleReveal.jsx';
import Cta from './Cta.jsx';
import Character from './art/Character.jsx';
import { SKY_FAR, SKY_MID } from './art/world.js';
import { GithubIcon, LinkedinIcon, MailIcon, WhatsappIcon } from './HomeIcons.jsx';

// Réseaux affichés : uniquement ceux renseignés dans src/data/site.js (null = masqué).
export function socialLinks() {
  const links = [{ key: 'github', label: 'GitHub', href: site.github, Icon: GithubIcon, external: true }];
  if (site.linkedin) {
    links.push({ key: 'linkedin', label: 'LinkedIn', href: site.linkedin, Icon: LinkedinIcon, external: true });
  }
  if (site.whatsapp) {
    links.push({
      key: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`,
      Icon: WhatsappIcon,
      external: true,
    });
  }
  links.push({ key: 'mail', label: 'E-mail', href: `mailto:${site.email}`, Icon: MailIcon, external: false });
  return links;
}

// Bande de scène en bas de section (le texte reste dans le ciel, au-dessus, sans rien derrière lui).
// Paysage : on voit toute la bande. Portrait : on cadre sur le soleil et le personnage.
const FRAMES = {
  wide: { viewBox: '0 0 1600 560', par: 'xMidYMax slice' },
  tall: { viewBox: '800 0 800 560', par: 'xMidYMax slice' },
};

// Dernière case : l’aube. La lumière du début a fait son travail, le soleil se lève derrière la ville
// pendant que la section entre à l’écran ; le personnage regarde dans sa direction.
export default function ContactScene() {
  const reduce = useReducedMotion();
  const portrait = useMediaQuery('(max-aspect-ratio: 1/1)');
  const frame = FRAMES[portrait ? 'tall' : 'wide'];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const sunY = useTransform(scrollYProgress, [0, 0.8], [140, 0]);
  const dawn = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const { title, text, primary, secondary, socialLabel } = home.contact;
  const mail = `mailto:${site.email}?subject=${encodeURIComponent(contactCopy.mailSubject)}&body=${encodeURIComponent(contactCopy.mailBody)}`;

  return (
    <section id="contact" className="nh-contact" ref={ref} aria-labelledby="contact-title">
      <div className="nh-contact__scene" aria-hidden="true">
        <motion.div className="nh-contact__dawn" style={reduce ? { opacity: 1 } : { opacity: dawn }} />
        <motion.div className="nh-contact__layer" style={reduce ? undefined : { y: sunY }}>
          <svg viewBox={frame.viewBox} preserveAspectRatio={frame.par} focusable="false">
            <defs>
              <pattern id="ct-dots" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
                <circle cx="4.5" cy="4.5" r="2" fill="#16B8B0" />
              </pattern>
              <linearGradient id="ct-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#fff" stopOpacity="0.9" />
              </linearGradient>
              <mask id="ct-mask">
                <rect x="0" y="220" width="1600" height="340" fill="url(#ct-fade)" />
              </mask>
            </defs>
            <circle cx="1070" cy="400" r="240" fill="none" stroke="#D7E0EA" strokeOpacity="0.28" strokeWidth="1.5" />
            <circle cx="1070" cy="400" r="180" fill="#D7E0EA" />
            <rect x="0" y="220" width="1600" height="340" fill="url(#ct-dots)" mask="url(#ct-mask)" />
          </svg>
        </motion.div>
        <div className="nh-contact__layer">
          <svg viewBox={frame.viewBox} preserveAspectRatio={frame.par} focusable="false">
            <g transform="translate(0 -340)">
              <path d={SKY_FAR.d} fill="#12294D" stroke="#12294D" strokeWidth="2" />
              <path d={SKY_MID.d} fill="#0B1B36" stroke="#0B1B36" strokeWidth="2" />
            </g>
            <path d="M1130 560V490H1700V560Z" fill="#050B16" />
            <path d="M1130 490H1700" stroke="#D7E0EA" strokeOpacity="0.4" strokeWidth="2" />
            <g transform="translate(1230 140) scale(0.5)">
              <Character x="0" y="0" width="600" height="720" viewBox="0 0 600 720" overflow="visible" />
            </g>
          </svg>
        </div>
      </div>

      <div className="container nh-contact__copy">
        <TitleReveal lines={['Parlons de', 'votre projet.']} id="contact-title" className="nh-contact__title" />
        <p className="nh-contact__text">{text}</p>
        <div className="nh-contact__actions">
          <Cta href={mail}>{primary}</Cta>
          <Cta to="/contact" variant="ghost">
            {secondary}
          </Cta>
        </div>

        <div className="nh-contact__social">
          <p>{socialLabel}</p>
          <ul>
            {socialLinks().map(({ key, label, href, Icon, external }) => (
              <li key={key}>
                <a
                  href={href}
                  className="nh-contact__icon"
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon size={24} />
                  <span className="visually-hidden">
                    {label}
                    {external ? ' (s’ouvre dans un nouvel onglet)' : ''}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
