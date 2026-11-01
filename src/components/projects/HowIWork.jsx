import { projectsPage } from '../../data/site.js';
import Reveal from '../Reveal.jsx';
import ServicesIcon from '../services/ServicesIcons.jsx';

// « Comment je travaille sur un projet » : quatre points d’une ligne, sans chiffre inventé.
export default function HowIWork() {
  const { how } = projectsPage;
  return (
    <section className="nh-pj-sec nh-pj-sec--ink nh-pj-sec--cut" aria-labelledby="pj-how-title">
      <div className="container">
        <Reveal as="h2" className="nh-pj-h2" id="pj-how-title">
          {how.title}
        </Reveal>
        <ul className="nh-pj-how">
          {how.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.07} className="nh-pj-how__item">
              <span className="nh-pj-how__icon" aria-hidden="true">
                <ServicesIcon name={item.icon} size={22} />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
