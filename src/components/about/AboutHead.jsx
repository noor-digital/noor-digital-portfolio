import { aboutPage } from '../../data/site.js';
import TitleReveal from '../home/TitleReveal.jsx';
import Panel from '../home/Panel.jsx';
import { CloseUpArt } from '../home/art/PanelArt.jsx';

// Tête de la page : le nom est le titre ; trois repères factuels disent qui je suis en un coup d’œil.
// L’illustration (le gros plan de l’accueil) reste dans une case sobre, à droite : elle accompagne, elle n’envahit pas.
export default function AboutHead() {
  const { kicker, titleLines, sub, credentials } = aboutPage;

  return (
    <section className="nh-ab-hero" aria-label="Profil">
      <div className="container nh-ab-hero__grid">
        <div className="nh-ab-hero__copy">
          <p className="nh-ab-hero__kicker">
            <span className="nh-ab-slash" aria-hidden="true" />
            {kicker}
          </p>
          <TitleReveal as="h1" lines={titleLines} className="nh-hero-title" />
          <p className="nh-ab-hero__sub">{sub}</p>
          <dl className="nh-ab-creds">
            {credentials.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Panel className="nh-ab-hero__art" poly="polygon(12% 0, 100% 0, 100% 100%, 0 100%)" onMount delay={0.25}>
          <div className="nh-panel__art">
            <CloseUpArt />
          </div>
        </Panel>
      </div>
    </section>
  );
}
