import { useRef } from 'react';
import { valuesSection } from '../../data/values.js';
import useSpotlight from '../../hooks/useSpotlight.js';
import Reveal from '../Reveal.jsx';
import { OrnamentRule } from '../islamic/Geometry.jsx';

function ValueCard({ item, index }) {
  const ref = useRef(null);
  useSpotlight(ref);
  return (
    <Reveal as="li" delay={index * 0.08} className="isl-values__item">
      <article className="nh-ab-card isl-value" ref={ref}>
        <span className="nh-ab-card__glow" aria-hidden="true" />
        <span className="isl-value__pattern" aria-hidden="true" />
        <p className="isl-ar isl-ar--kufi isl-value__ar" lang="ar" dir="rtl">
          {item.ar}
        </p>
        <h3>{item.name}</h3>
        <p className="isl-value__gloss">{item.gloss}</p>
        <p className="isl-value__text">{item.text}</p>
      </article>
    </Reveal>
  );
}

// Mes valeurs : quatre principes (Amanah, Ihsan, Sidq, Itqan) puis une citation unique sur l’excellence.
// Même langage de cartes que « Ma manière de travailler » ; le mot arabe est l’élément graphique principal,
// le motif géométrique reste un filigrane. Tout le texte vient de data/values.js.
export default function Values() {
  const t = valuesSection;
  return (
    <section className="nh-ab-sec nh-ab-sec--navy nh-ab-sec--cut isl-values" aria-labelledby="ab-values-title">
      <div className="container">
        <Reveal as="h2" className="nh-ab-h2" id="ab-values-title">
          {t.title}
        </Reveal>
        <Reveal as="p" delay={0.06} className="nh-ab-lead">
          {t.lead}
        </Reveal>

        <ul className="isl-values__grid">
          {t.items.map((item, i) => (
            <ValueCard key={item.key} item={item} index={i} />
          ))}
        </ul>

        <Reveal as="figure" className="isl-quote">
          <OrnamentRule />
          <p className="isl-quote__label">{t.quote.label}</p>
          <blockquote className="isl-quote__body">
            <p className="isl-ar isl-quote__ar" lang="ar" dir="rtl">
              {t.quote.ar}
            </p>
            <p className="isl-quote__fr">{t.quote.fr}</p>
          </blockquote>
          <figcaption className="isl-quote__source">{t.quote.source}</figcaption>
        </Reveal>
      </div>
    </section>
  );
}
