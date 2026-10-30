import Hairline from './Hairline.jsx';
import Reveal from './Reveal.jsx';

// Titre de section : un filet discret qui se dessine, puis le titre.
// `aside` (facultatif) place un lien ou une information à droite du titre sur grand écran.
// Pas de compteur « 01 — 03 » : l’index est réservé à la navigation, aux projets et aux services.
export default function SectionHeading({ id, title, aside }) {
  return (
    <header className="section-heading">
      <Hairline tone="soft" />
      <div className="section-heading__row">
        <Reveal as="h2" id={id} className="h2">
          {title}
        </Reveal>
        {aside && <Reveal className="section-heading__aside" delay={0.1}>{aside}</Reveal>}
      </div>
    </header>
  );
}
