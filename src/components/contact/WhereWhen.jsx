import { useRef } from 'react';
import { contactPage, site } from '../../data/site.js';
import useSpotlight from '../../hooks/useSpotlight.js';
import Reveal from '../Reveal.jsx';
import { ClockIcon, PinIcon } from '../home/HomeIcons.jsx';
import ServicesIcon from '../services/ServicesIcons.jsx';
import DakarSky from './DakarSky.jsx';

// Où et quand me joindre : un grand ciel vivant (heure de Dakar en direct) à gauche, trois lignes à droite
// (Où / Quand / Comment) au lieu de cartes. Disponibilité, délai et langues n’apparaissent que s’ils sont
// renseignés dans data/site.js.
export default function WhereWhen() {
  const t = contactPage.where;
  const panelRef = useRef(null);
  useSpotlight(panelRef);

  const rows = [
    {
      key: 'where',
      icon: <PinIcon size={26} />,
      label: t.rows.place.label,
      value: site.location,
      text: t.rows.place.text,
    },
    {
      key: 'when',
      icon: <ClockIcon size={26} />,
      label: t.rows.time.label,
      value: site.availability ?? t.rows.time.value,
      text: t.rows.time.text,
      fact: site.responseTime ? `${contactPage.reassure.responseLabel} : ${site.responseTime}` : null,
    },
    {
      key: 'how',
      icon: <ServicesIcon name="devices" size={26} />,
      label: t.rows.how.label,
      value: t.rows.how.value,
      text: site.whatsapp ? t.rows.how.text : t.rows.how.textNoWhatsapp,
      fact: site.languages?.length ? `${t.rows.how.languages} : ${site.languages.join(', ')}` : null,
    },
  ];

  return (
    <section className="nh-ct-sec nh-ct-sec--ink nh-ct-sec--cut nh-ct-sec--tight" aria-labelledby="ct-where-title">
      <div className="container">
        <Reveal as="h2" className="nh-ct-h2" id="ct-where-title">
          {t.title}
        </Reveal>

        <Reveal className="nh-ct-where" delay={0.05}>
          <div className="nh-ct-where__panel" ref={panelRef}>
            <span className="nh-ct-where__glow" aria-hidden="true" />
            <div className="nh-ct-where__sky">
              <DakarSky />
            </div>
            <ul className="nh-ct-where__rows">
              {rows.map((row, i) => (
                <Reveal as="li" key={row.key} delay={0.1 + i * 0.09} className="nh-ct-row3">
                  <span className="nh-ct-row3__icon" aria-hidden="true">
                    {row.icon}
                  </span>
                  <div className="nh-ct-row3__body">
                    <p className="nh-ct-row3__label">{row.label}</p>
                    <p className="nh-ct-row3__value">{row.value}</p>
                    <p className="nh-ct-row3__text">{row.text}</p>
                    {row.fact && <p className="nh-ct-row3__fact">{row.fact}</p>}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
