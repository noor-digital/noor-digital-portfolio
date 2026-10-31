import { useId, useState } from 'react';
import { servicesPage } from '../../data/site.js';
import SectionHead from './SectionHead.jsx';
import ServicesIcon from './ServicesIcons.jsx';

// FAQ en accordéon accessible : vrais boutons (aria-expanded / aria-controls), panneau relié à sa question,
// contenu fermé retiré de l’ordre de tabulation (inert). La hauteur s’anime par grid-template-rows (CSS).
export default function Faq() {
  const { faq } = servicesPage;
  const uid = useId();
  const [open, setOpen] = useState(null);

  return (
    <section className="nh-sv-sec nh-sv-sec--night nh-sv-sec--cut" aria-labelledby="sv-faq-title">
      <div className="container nh-sv-split">
        <div className="nh-sv-split__head">
          <SectionHead id="sv-faq-title" title={faq.title} text={faq.text} />
        </div>
        <div className="nh-sv-faq">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            const base = `${uid}-${i}`;
            return (
              <div className={`nh-sv-faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
                <h3 className="nh-sv-faq__q">
                  <button
                    type="button"
                    id={`${base}-btn`}
                    aria-expanded={isOpen}
                    aria-controls={`${base}-panel`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <ServicesIcon name="chevron" className="nh-sv-faq__chev" size={22} />
                  </button>
                </h3>
                <div
                  className="nh-sv-faq__panel"
                  id={`${base}-panel`}
                  role="region"
                  aria-labelledby={`${base}-btn`}
                  inert={!isOpen}
                >
                  <div className="nh-sv-faq__clip">
                    <p>{item.a}</p>
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
