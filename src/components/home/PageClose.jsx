import TitleReveal from './TitleReveal.jsx';
import Cta from './Cta.jsx';
import { PanoramaArt } from './art/PanelArt.jsx';

// Clôture générique des pages manga : un titre, des actions réelles, puis le plan d’ensemble de la ville.
// Elle réutilise les styles `nh-ab-close` (about.css), identiques à la clôture de la page À propos.
//  actions : [{ label, to | href, external?, variant? }]
export default function PageClose({ id, titleLines, actions }) {
  return (
    <section className="nh-ab-close" aria-labelledby={id}>
      <div className="container">
        <TitleReveal lines={titleLines} id={id} className="nh-ab-close__title" />
        <div className="nh-ab-close__actions">
          {actions.map(({ label, ...props }) => (
            <Cta key={label} {...props}>
              {label}
            </Cta>
          ))}
        </div>
      </div>
      <div className="nh-ab-close__art" aria-hidden="true">
        <PanoramaArt />
      </div>
    </section>
  );
}
