import { contactPage } from '../../data/site.js';
import { testimonials } from '../../data/testimonials.js';
import Reveal from '../Reveal.jsx';

// Preuves : prêt à recevoir de vrais retours (data/testimonials.js). Tant que la liste est vide, la section
// n’existe pas dans la page : aucun faux avis, aucune case vide.
export default function ContactTestimonials() {
  if (!testimonials.length) return null;
  const t = contactPage.testimonials;
  return (
    <section className="nh-ct-sec nh-ct-sec--ink nh-ct-sec--cut" aria-labelledby="ct-proof-title">
      <div className="container">
        <Reveal as="h2" className="nh-ct-h2" id="ct-proof-title">
          {t.title}
        </Reveal>
        <ul className="nh-ct-proof">
          {testimonials.map((item, i) => (
            <Reveal as="li" key={`${item.author}-${i}`} delay={i * 0.08}>
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
