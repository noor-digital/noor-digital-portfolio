import { aboutPage, profile } from '../../data/site.js';
import Reveal from '../Reveal.jsx';
import ProfileCard from './ProfileCard.jsx';

// Découpe la phrase d’accroche pour mettre les mots clés en couleur (la source reste profile.paragraphs[0]).
function Headline({ text, highlights }) {
  const pattern = new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return text.split(pattern).map((part, i) =>
    highlights.includes(part) ? (
      <span className="nh-ab-hl" key={i}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

// « Qui je suis » : deux colonnes sans chevauchement. À gauche, une grande phrase d’accroche puis les paragraphes
// lisibles (62 caractères au plus) ; à droite, la fiche collante. Texte : profile.paragraphs (data/site.js).
export default function IdentityIntro() {
  const t = aboutPage.who;
  const [first, ...rest] = profile.paragraphs;
  const cut = first.indexOf('. ') + 1;
  const headline = cut > 0 ? first.slice(0, cut) : first;
  const remainder = cut > 0 ? first.slice(cut).trim() : '';
  const paragraphs = [remainder, ...rest].filter(Boolean);

  return (
    <section id="ab-who" className="nh-ab-sec nh-ab-sec--night" aria-labelledby="ab-who-title">
      <div className="container nh-ab-who">
        <div className="nh-ab-who__text">
          <Reveal as="h2" className="nh-ab-kick" id="ab-who-title">
            {t.title}
          </Reveal>
          <Reveal as="p" delay={0.05} className="nh-ab-headline">
            <Headline text={headline} highlights={t.highlights} />
          </Reveal>
          {paragraphs.map((paragraph, i) => (
            <Reveal as="p" key={paragraph} delay={0.08 * (i + 1)} className="nh-ab-para">
              {paragraph}
            </Reveal>
          ))}
        </div>
        <div className="nh-ab-who__card">
          <Reveal delay={0.1}>
            <ProfileCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
