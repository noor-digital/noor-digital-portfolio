import { useRef } from 'react';
import { aboutPage, principles } from '../../data/site.js';
import useSpotlight from '../../hooks/useSpotlight.js';
import Reveal from '../Reveal.jsx';
import PrincipleIcon from './PrincipleIcons.jsx';

const pad = (n) => String(n).padStart(2, '0');

function PrincipleCard({ item, index }) {
  const ref = useRef(null);
  useSpotlight(ref);
  return (
    <Reveal as="li" delay={index * 0.08} className="nh-ab-principles__item">
      <article className="nh-ab-card nh-ab-principle" ref={ref}>
        <span className="nh-ab-card__glow" aria-hidden="true" />
        <span className="nh-ab-principle__num" aria-hidden="true">
          {pad(index + 1)}
        </span>
        <span className="nh-ab-principle__icon">
          <PrincipleIcon name={item.icon} />
        </span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </article>
    </Reveal>
  );
}

// Ma manière de travailler : les quatre principes de data/site.js, en grille 2 × 2 régulière, une seule carte pour
// les quatre. Au survol : la carte s’élève, une bordure lumineuse suit le curseur, l’icône s’anime. Une colonne sur mobile.
export default function Principles() {
  return (
    <section className="nh-ab-sec nh-ab-sec--ink nh-ab-sec--cut" aria-labelledby="ab-principles-title">
      <div className="container">
        <Reveal as="h2" className="nh-ab-h2" id="ab-principles-title">
          {aboutPage.principlesTitle}
        </Reveal>
        <ul className="nh-ab-principles">
          {principles.map((item, i) => (
            <PrincipleCard key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
