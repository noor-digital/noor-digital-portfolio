import { useRef } from 'react';
import { servicesPage } from '../../data/site.js';
import useSpotlight from '../../hooks/useSpotlight.js';
import Reveal from '../Reveal.jsx';
import TitleReveal from '../home/TitleReveal.jsx';
import ServicesIcon from './ServicesIcons.jsx';

function WhyCard({ item, index }) {
  const ref = useRef(null);
  useSpotlight(ref);
  return (
    <Reveal as="li" delay={index * 0.07} className="nh-sv-why__item">
      <div className="nh-sv-why__card" ref={ref}>
        <span className="nh-sv-why__glow" aria-hidden="true" />
        <span className="nh-sv-why__line" aria-hidden="true" />
        <div className="nh-sv-why__hd">
          <span className="nh-sv-why__icon">
            <ServicesIcon name={item.icon} size={22} />
          </span>
          <h3>{item.title}</h3>
        </div>
        <p>{item.text}</p>
      </div>
    </Reveal>
  );
}

// Pourquoi travailler avec moi : une bande compacte (titre + phrase sur une ligne, quatre points en rangée).
// Chaque point : icône tracée qui se redessine, ligne lumineuse et spotlight au survol.
export default function WhyMe() {
  const { why } = servicesPage;
  return (
    <section
      className="nh-sv-sec nh-sv-sec--ink nh-sv-sec--cut nh-sv-sec--tight"
      aria-labelledby="sv-why-title"
    >
      <div className="container">
        <div className="nh-sv-why__top">
          <TitleReveal lines={[why.title]} id="sv-why-title" className="nh-sv-h2 nh-sv-h2--sm" />
          <Reveal as="p" delay={0.1} className="nh-sv-lead">
            {why.text}
          </Reveal>
        </div>
        <ul className="nh-sv-why">
          {why.items.map((item, i) => (
            <WhyCard key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
