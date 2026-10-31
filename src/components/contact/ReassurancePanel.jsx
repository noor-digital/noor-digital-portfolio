import { contactPage, servicesPage, site } from '../../data/site.js';
import Reveal from '../Reveal.jsx';
import ServicesIcon from '../services/ServicesIcons.jsx';

// Colonne de gauche du formulaire, volontairement courte : trois points d’une ligne, puis « Ensuite » en trois
// étapes très brèves. Un délai éventuel est repris de servicesPage.after (data/site.js), jamais inventé.
export default function ReassurancePanel() {
  const t = contactPage.reassure;
  return (
    <div className="nh-ct-reassure">
      <Reveal as="h2" className="nh-ct-h2 nh-ct-h2--sm" id="ct-reassure-title">
        {t.title}
      </Reveal>
      <ul className="nh-ct-reassure__list">
        {t.items.map((item, i) => (
          <Reveal as="li" key={item} delay={0.06 * i}>
            <ServicesIcon name="check" className="nh-ct-reassure__tick" size={18} />
            <span>{item}</span>
          </Reveal>
        ))}
      </ul>

      <Reveal as="h3" className="nh-ct-h3" delay={0.1}>
        {t.afterTitle}
      </Reveal>
      <ol className="nh-ct-after">
        {t.after.map((item, i) => {
          const delay = servicesPage.after.items[i]?.delay;
          return (
            <Reveal as="li" key={item.title} delay={0.08 * i}>
              <span className="nh-ct-after__num" aria-hidden="true">
                {i + 1}
              </span>
              <p>
                <strong>{item.title}</strong> {item.text}
                {delay && <span className="nh-ct-after__delay"> ({delay})</span>}
              </p>
            </Reveal>
          );
        })}
      </ol>
      {site.responseTime && (
        <p className="nh-ct-reassure__time">
          {t.responseLabel} : <strong>{site.responseTime}</strong>
        </p>
      )}
    </div>
  );
}
