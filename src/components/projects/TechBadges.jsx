import { techIcon } from '../home/techIcons.jsx';
import { techFamily, techIconKey } from '../../lib/projectsUtil.js';

// Badges de technologies : icône de marque quand elle existe, sinon texte seul. « +N » au-delà de `max`.
// `full` : nom complet (« JavaScript (ES modules) ») au lieu de la famille (« JavaScript »).
export default function TechBadges({ tech, max = 4, full = false, className = '' }) {
  const shown = max ? tech.slice(0, max) : tech;
  const rest = tech.length - shown.length;
  return (
    <ul className={`nh-pj-badges ${className}`} aria-label="Technologies">
      {shown.map((name) => {
        const key = techIconKey(name);
        const icon = key ? techIcon(key) : null;
        return (
          <li key={name} className="nh-pj-badge" style={icon ? { '--brand': icon.color } : undefined}>
            {icon?.node && <span className="nh-pj-badge__ico">{icon.node}</span>}
            {full ? name : techFamily(name)}
          </li>
        );
      })}
      {rest > 0 && (
        <li className="nh-pj-badge nh-pj-badge--more" title={tech.slice(shown.length).join(', ')}>
          +{rest}
        </li>
      )}
    </ul>
  );
}
