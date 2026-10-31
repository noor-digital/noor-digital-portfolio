import { servicesPage } from '../../data/site.js';
import { testimonials } from '../../data/testimonials.js';
import Reveal from '../Reveal.jsx';
import SectionHead from './SectionHead.jsx';

// Preuves sociales : prêt à recevoir de vrais retours (data/testimonials.js).
// Tant que la liste est vide, la section n’existe pas dans la page : aucun faux avis, aucune case vide.
export default function Testimonials() {
  if (!testimonials.length) return null;
  const { testimonials: t } = servicesPage;
  return (
    <section className="nh-sv-sec nh-sv-sec--ink nh-sv-sec--cut" aria-labelledby="sv-proof-title">
      <div className="container">
        <SectionHead id="sv-proof-title" title={t.title} text={t.text} />
        <ul className="nh-sv-proof">
          {testimonials.map((item, i) => (
            <Reveal as="li" key={`${item.author}-${i}`} delay={i * 0.08} className="nh-sv-proof__item">
              <figure>
                <blockquote>
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption>
                  <strong>{item.author}</strong>
                  {item.role && <span>{item.role}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
