import { useRef } from 'react';
import { contactPage, site } from '../../data/site.js';
import useCopy from '../../hooks/useCopy.js';
import useSpotlight from '../../hooks/useSpotlight.js';
import { ArrowUpRight } from '../Icons.jsx';
import { GithubIcon, LinkedinIcon, MailIcon, WhatsappIcon } from '../home/HomeIcons.jsx';
import ServicesIcon from '../services/ServicesIcons.jsx';

// Carte d’action : toute la carte est l’action (lien ou bouton). Survol : élévation, spotlight qui suit le
// curseur, icône qui s’anime. `state` pilote le retour visuel (« Adresse copiée ✓ »).
function QuickCard({ as: Tag = 'a', icon, title, hint, value, state = 'idle', ...props }) {
  const ref = useRef(null);
  useSpotlight(ref);
  return (
    <li className="nh-ct-quick__item" ref={ref}>
      <Tag className="nh-ct-qcard" data-state={state} {...props}>
        <span className="nh-ct-qcard__glow" aria-hidden="true" />
        <span className="nh-ct-qcard__icon" aria-hidden="true">
          {icon}
        </span>
        <span className="nh-ct-qcard__txt">
          <strong>{title}</strong>
          {value && <span className="nh-ct-qcard__value">{value}</span>}
          <span className="nh-ct-qcard__hint">{hint}</span>
        </span>
        <span className="nh-ct-qcard__go" aria-hidden="true">
          <ArrowUpRight className="nh-ct-qcard__arrow" />
        </span>
      </Tag>
    </li>
  );
}

// Trois actions rapides, très visibles : e-mail (copie + ouverture de la messagerie), WhatsApp (si le numéro
// est renseigné dans site.js) et « Écrire un message » (défilement vers le formulaire). GitHub et LinkedIn
// restent en liens secondaires, sous les cartes.
export default function QuickActions({ onWrite }) {
  const t = contactPage.quick;
  const [copyState, copy] = useCopy();

  const waHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(t.whatsapp.message)}`
    : null;
  const count = waHref ? 3 : 2;

  const secondary = [
    { key: 'github', label: contactPage.channels.github, href: site.github, Icon: GithubIcon },
    site.linkedin && { key: 'linkedin', label: contactPage.channels.linkedin, href: site.linkedin, Icon: LinkedinIcon },
  ].filter(Boolean);

  const emailHint =
    copyState === 'copied' ? t.email.copied : copyState === 'error' ? t.email.copyError : t.email.hint;

  return (
    <div className="nh-ct-quick-wrap">
      <ul className="nh-ct-quick" data-count={count} aria-label={t.label}>
        <QuickCard
          href={`mailto:${site.email}`}
          onClick={() => copy(site.email)}
          icon={<MailIcon size={28} />}
          title={t.email.title}
          value={site.email}
          hint={emailHint}
          state={copyState}
        />
        {waHref && (
          <QuickCard
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            icon={<WhatsappIcon size={28} />}
            title={t.whatsapp.title}
            hint={`${t.whatsapp.hint} ${t.newTab}`}
          />
        )}
        <QuickCard
          as="button"
          type="button"
          onClick={onWrite}
          icon={<ServicesIcon name="chat" size={26} className="nh-sv-ico" />}
          title={t.form.title}
          hint={t.form.hint}
        />
      </ul>

      {/* Retour d’accessibilité de la copie (le texte visible est dans la carte). */}
      <p className="visually-hidden" role="status" aria-live="polite">
        {copyState === 'copied' ? t.email.copied : copyState === 'error' ? t.email.copyError : ''}
      </p>

      <p className="nh-ct-more">
        <span>{t.moreLabel}</span>
        {secondary.map(({ key, label, href, Icon }) => (
          <a key={key} className="nh-ct-pill" href={href} target="_blank" rel="noopener noreferrer">
            <Icon size={16} />
            {label}
            <span className="visually-hidden"> {t.newTab}</span>
          </a>
        ))}
      </p>
    </div>
  );
}
