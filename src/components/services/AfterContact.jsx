import { servicesPage } from '../../data/site.js';
import Reveal from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';

// Trois mini-étapes après le premier message. Uniquement des engagements réels (data/site.js → after).
export default function AfterContact() {
  const { after } = servicesPage;
  return (
    <section className="nh-sv-sec nh-sv-sec--navy nh-sv-sec--cut" aria-labelledby="sv-after-title">
      <div className="container">
        <SectionHead id="sv-after-title" title={after.title} text={after.text} />
        <ol className="nh-sv-after">
          {after.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.1} className="nh-sv-after__item">
              <span className="nh-sv-after__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.delay && <p className="nh-sv-after__delay">{item.delay}</p>}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
