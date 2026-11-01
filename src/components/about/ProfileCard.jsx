import { useRef } from 'react';
import { aboutPage, journey, site, studio } from '../../data/site.js';
import { withBase } from '../../lib/projectsUtil.js';
import useCopy from '../../hooks/useCopy.js';
import useSpotlight from '../../hooks/useSpotlight.js';
import Cta from '../home/Cta.jsx';
import { HomeMark } from '../home/HomeMark.jsx';
import { GithubIcon, LinkedinIcon, MailIcon, WhatsappIcon } from '../home/HomeIcons.jsx';

// Fiche d’identité : les valeurs viennent de `site`, `studio` et `journey` (rien n’est écrit ici). Liens GitHub / e-mail
// (copie en un clic) toujours présents ; LinkedIn, WhatsApp et CV seulement s’ils sont renseignés dans site.js.
export default function ProfileCard() {
  const t = aboutPage.who;
  const [copyState, copy] = useCopy();
  const ref = useRef(null);
  useSpotlight(ref);

  const studyStep = journey.find((step) => step.label === 'Études');
  const trainingStep = journey.find((step) => step.label === 'Formation');
  const techFact = studio.facts.find((fact) => fact.label === 'Technologies');

  const facts = [
    { label: t.labels.place, value: site.location },
    { label: t.labels.focus, value: site.jobTitle },
    studyStep && { label: t.labels.study, value: studyStep.title },
    techFact && { label: t.labels.tech, value: techFact.value },
    trainingStep && { label: t.labels.training, value: `${trainingStep.title} — ${trainingStep.status.toLowerCase()}` },
  ].filter(Boolean);

  const links = [
    { key: 'github', label: t.links.github, value: site.github.replace(/^https?:\/\//, ''), href: site.github, Icon: GithubIcon, external: true },
    site.linkedin && { key: 'linkedin', label: t.links.linkedin, value: site.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: site.linkedin, Icon: LinkedinIcon, external: true },
    site.whatsapp && { key: 'whatsapp', label: t.links.whatsapp, value: site.whatsapp, href: `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`, Icon: WhatsappIcon, external: true },
  ].filter(Boolean);

  return (
    <aside className="nh-ab-card nh-ab-profile" ref={ref} aria-labelledby="ab-card-title">
      <span className="nh-ab-card__glow" aria-hidden="true" />
      <header className="nh-ab-profile__head">
        <HomeMark className="nh-ab-profile__mark" />
        <div>
          <h3 id="ab-card-title">{site.owner}</h3>
          <p>{t.sheetTitle} · {site.name}</p>
        </div>
      </header>

      <dl className="nh-ab-profile__facts">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="nh-ab-profile__links">
        <li>
          <a href={`mailto:${site.email}`} onClick={() => copy(site.email)}>
            <MailIcon size={20} />
            <span className="nh-ab-profile__lab">{t.links.email}</span>
            <span className="nh-ab-profile__val">{site.email}</span>
          </a>
          <button type="button" className="nh-ab-profile__copy" onClick={() => copy(site.email)}>
            {copyState === 'copied' ? t.links.copied : t.links.copy}
          </button>
        </li>
        {links.map(({ key, label, value, href, Icon, external }) => (
          <li key={key}>
            <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <Icon size={20} />
              <span className="nh-ab-profile__lab">{label}</span>
              <span className="nh-ab-profile__val">{value}</span>
              <span className="visually-hidden"> (s’ouvre dans un nouvel onglet)</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="visually-hidden" role="status" aria-live="polite">
        {copyState === 'copied' ? t.links.copied : copyState === 'error' ? t.links.copyError : ''}
      </p>

      {site.cv && (
        <Cta href={withBase(site.cv)} variant="ghost" download>
          {t.cv}
        </Cta>
      )}
    </aside>
  );
}
