import { servicesPage } from '../../data/site.js';
import { techIcon } from '../home/techIcons.jsx';

// Bande de technologies : défilement infini lent (CSS pur, transform seulement), en pause au survol et
// au focus. La liste est répétée quatre fois pour couvrir les très grands écrans ; seule la première
// est lue par les lecteurs d’écran. Avec « mouvement réduit », la bande reste fixe (voir base.css).
const COPIES = 4;

export default function TechMarquee() {
  const { marquee, marqueeLabel } = servicesPage.hero;

  return (
    <div className="nh-sv-marquee" role="group" aria-label={marqueeLabel}>
      <div className="nh-sv-marquee__track">
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul className="nh-sv-marquee__list" key={copy} aria-hidden={copy > 0 ? 'true' : undefined}>
            {marquee.map(({ label, icon }) => {
              const { node, color } = techIcon(icon);
              return (
                <li className="nh-sv-chip" key={label} style={{ '--brand': color }}>
                  <span className="nh-sv-chip__ico">{node}</span>
                  {label}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
