import { servicesPage } from '../../data/site.js';
import Reveal from '../Reveal.jsx';
import Cta from '../home/Cta.jsx';
import SectionHead from './SectionHead.jsx';
import ServicesIcon from './ServicesIcons.jsx';

// Trois types de projet en cartes compactes : titre, pour qui (une ligne), trois points inclus, déroulé en
// puces, action. Aucune mention financière : l’action mène au contact, avec le service déjà choisi.
export default function WorkTypes() {
  const { workTypes: w } = servicesPage;
  return (
    <section className="nh-sv-sec nh-sv-sec--ink nh-sv-sec--cut" aria-labelledby="sv-work-title">
      <div className="container">
        <SectionHead id="sv-work-title" title={w.title} text={w.text} />
        <ul className="nh-sv-work">
          {w.items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.09} className="nh-sv-work__item">
              <article className="nh-sv-work__card" aria-labelledby={`work-${item.id}`}>
                <h3 id={`work-${item.id}`}>{item.title}</h3>
                <p className="nh-sv-work__for">{item.forWho}</p>

                <h4 className="visually-hidden">{w.includedLabel}</h4>
                <ul className="nh-sv-work__list">
                  {item.included.map((line) => (
                    <li key={line}>
                      <ServicesIcon name="check" className="nh-sv-work__tick" size={16} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="visually-hidden">{w.flowLabel}</h4>
                <ol className="nh-sv-work__flow">
                  {item.flow.map((stepName) => (
                    <li key={stepName}>{stepName}</li>
                  ))}
                </ol>

                <div className="nh-sv-work__cta">
                  <Cta to={`/contact?service=${item.service}`}>
                    {w.cta}
                    <ServicesIcon name="arrow" className="nh-sv-arr" size={18} />
                    <span className="visually-hidden"> : {item.title}</span>
                  </Cta>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
