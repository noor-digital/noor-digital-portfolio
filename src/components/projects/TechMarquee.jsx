import { projects } from '../../data/projects.js';
import { projectsPage } from '../../data/site.js';
import { techIcon } from '../home/techIcons.jsx';
import { allFamilies, techIconKey } from '../../lib/projectsUtil.js';

// Bande lente des technologies RÉELLEMENT utilisées dans les projets (calculées depuis data/projects.js),
// en pause au survol. Répétée quatre fois ; seule la première liste est lue par les lecteurs d’écran.
const COPIES = 4;
const families = allFamilies(projects);

export default function TechMarquee() {
  return (
    <div className="nh-pj-marquee" role="group" aria-label={projectsPage.marqueeLabel}>
      <div className="nh-pj-marquee__track">
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul className="nh-pj-marquee__list" key={copy} aria-hidden={copy > 0 ? 'true' : undefined}>
            {families.map(({ name }) => {
              const key = techIconKey(name);
              const icon = key ? techIcon(key) : null;
              return (
                <li className="nh-pj-chip" key={name} style={icon ? { '--brand': icon.color } : undefined}>
                  {icon?.node && <span className="nh-pj-chip__ico">{icon.node}</span>}
                  {name}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
