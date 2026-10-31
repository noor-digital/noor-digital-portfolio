import TitleReveal from '../home/TitleReveal.jsx';
import Reveal from '../Reveal.jsx';

// En-tête commun des sections de la page Services : surtitre facultatif, titre masqué-incliné, texte.
// Les titres de section sont des h2 sobres (le seul h1 est celui du hero).
export default function SectionHead({ id, kicker, title, text, align = 'left' }) {
  return (
    <header className={`nh-sv-head nh-sv-head--${align}`}>
      {kicker && (
        <p className="nh-sv-kicker">
          <span className="nh-ab-slash" aria-hidden="true" />
          {kicker}
        </p>
      )}
      <TitleReveal lines={[title]} id={id} className="nh-sv-h2" />
      {text && (
        <Reveal as="p" delay={0.1} className="nh-sv-lead">
          {text}
        </Reveal>
      )}
    </header>
  );
}
