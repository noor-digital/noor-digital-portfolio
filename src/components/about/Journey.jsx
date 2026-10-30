import { aboutPage, journey } from '../../data/site.js';
import TitleReveal from '../home/TitleReveal.jsx';
import Panel from '../home/Panel.jsx';

// Parcours : uniquement des informations confirmées (voir `journey` dans site.js).
// Deux cases décalées ; le statut est un tampon, pas une date inventée.
export default function Journey() {
  return (
    <section className="nh-ab-journey" aria-labelledby="journey-title">
      <div className="container">
        <TitleReveal lines={[aboutPage.journeyTitle]} id="journey-title" />
        <ol className="nh-ab-frames">
          {journey.map((row, i) => (
            <li key={row.title}>
              <Panel
                poly={i % 2 === 0 ? 'polygon(0 0, 100% 0, 94% 100%, 0 100%)' : 'polygon(6% 0, 100% 0, 100% 100%, 0 100%)'}
                delay={i * 0.14}
              >
                <div className="nh-ab-frame">
                  <p className="nh-ab-frame__label">{row.label}</p>
                  <p className="nh-ab-frame__title">{row.title}</p>
                  <span className="nh-ab-frame__stamp">{row.status}</span>
                </div>
              </Panel>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
