import { aboutPage } from '../../data/site.js';
import Reveal from '../Reveal.jsx';
import Cta from '../home/Cta.jsx';
import ServicesIcon from '../services/ServicesIcons.jsx';

// Travaillons ensemble : ce que vous pouvez attendre (engagements déjà affichés ailleurs sur le site, sans chiffre ni
// délai) et comment on commence (même fil que la page Services), puis trois liens vers la suite.
export default function WorkTogether() {
  const t = aboutPage.together;
  return (
    <section className="nh-ab-sec nh-ab-sec--navy nh-ab-sec--cut" aria-labelledby="ab-together-title">
      <div className="container">
        <Reveal as="h2" className="nh-ab-h2" id="ab-together-title">
          {t.title}
        </Reveal>

        <div className="nh-ab-together">
          <div>
            <Reveal as="h3" className="nh-ab-h3">
              {t.expectTitle}
            </Reveal>
            <ul className="nh-ab-expect">
              {t.expect.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 0.07}>
                  <span className="nh-ab-expect__icon" aria-hidden="true">
                    <ServicesIcon name={item.icon} size={22} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal as="h3" className="nh-ab-h3">
              {t.startTitle}
            </Reveal>
            <ol className="nh-ab-start">
              {t.start.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 0.08}>
                  <span className="nh-ab-start__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <Reveal className="nh-ab-links" delay={0.1}>
          <Cta to="/contact">{t.links.contact}</Cta>
          <Cta to="/services" variant="ghost">
            {t.links.services}
          </Cta>
          <Cta to="/projets" variant="ghost">
            {t.links.projects}
          </Cta>
        </Reveal>
      </div>
    </section>
  );
}
