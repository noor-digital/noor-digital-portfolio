import { useId, useState } from 'react';
import { contactPage, site } from '../../data/site.js';
import Reveal from '../Reveal.jsx';
import ServicesIcon from '../services/ServicesIcons.jsx';

// FAQ en accordéon accessible : vrais boutons (aria-expanded / aria-controls), panneau relié à sa question,
// contenu fermé retiré de la tabulation (inert), hauteur animée par grid-template-rows. Aucune question sur
// les questions financières. Le délai de réponse n’apparaît que s’il est renseigné dans data/site.js.
export default function ContactFaq() {
  const t = contactPage.faq;
  const uid = useId();
  const [open, setOpen] = useState(null);

  return (
    <section className="nh-ct-sec nh-ct-sec--navy nh-ct-sec--cut" aria-labelledby="ct-faq-title">
      <div className="container nh-ct-split">
        <div className="nh-ct-split__head">
          <Reveal as="h2" className="nh-ct-h2" id="ct-faq-title">
            {t.title}
          </Reveal>
          <Reveal as="p" delay={0.08} className="nh-ct-lead">
            {t.text}
          </Reveal>
        </div>
        <div className="nh-ct-faq">
          {t.items.map((item, i) => {
            const isOpen = open === i;
            const base = `${uid}-${i}`;
            const answer =
              item.withResponseTime && site.responseTime ? `${item.a} Délai habituel : ${site.responseTime}.` : item.a;
            return (
              <div className={`nh-ct-faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
                <h3 className="nh-ct-faq__q">
                  <button
                    type="button"
                    id={`${base}-btn`}
                    aria-expanded={isOpen}
                    aria-controls={`${base}-panel`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <ServicesIcon name="chevron" className="nh-ct-faq__chev" size={22} />
                  </button>
                </h3>
                <div
                  className="nh-ct-faq__panel"
                  id={`${base}-panel`}
                  role="region"
                  aria-labelledby={`${base}-btn`}
                  inert={!isOpen}
                >
                  <div className="nh-ct-faq__clip">
                    <p>{answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
