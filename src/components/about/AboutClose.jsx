import { aboutPage } from '../../data/site.js';
import TitleReveal from '../home/TitleReveal.jsx';
import Cta from '../home/Cta.jsx';
import { PanoramaArt } from '../home/art/PanelArt.jsx';

// Clôture : une invitation et deux actions réelles (page contact, projets), puis le plan d’ensemble
// de la ville, texte et illustration séparés pour que rien ne gêne la lecture.
export default function AboutClose() {
  const { titleLines, primary, secondary } = aboutPage.closing;
  return (
    <section className="nh-ab-close" aria-labelledby="about-close-title">
      <div className="container">
        <TitleReveal lines={titleLines} id="about-close-title" className="nh-ab-close__title" />
        <div className="nh-ab-close__actions">
          <Cta to="/contact">{primary}</Cta>
          <Cta to="/projets" variant="ghost">
            {secondary}
          </Cta>
        </div>
      </div>
      <div className="nh-ab-close__art" aria-hidden="true">
        <PanoramaArt />
      </div>
    </section>
  );
}
