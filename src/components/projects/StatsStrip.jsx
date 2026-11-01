import { projects } from '../../data/projects.js';
import { projectsPage } from '../../data/site.js';
import { allFamilies } from '../../lib/projectsUtil.js';
import Counter from '../Counter.jsx';

// Trois chiffres, tous calculés depuis data/projects.js : projets, technologies distinctes, dépôts GitHub liés.
export default function StatsStrip() {
  const t = projectsPage.stats;
  const items = [
    { id: 'projects', value: projects.length, label: t.projects },
    { id: 'tech', value: allFamilies(projects).length, label: t.tech },
    { id: 'repos', value: projects.filter((p) => p.github).length, label: t.repos },
  ];
  return (
    <dl className="nh-pj-stats" aria-label={t.label}>
      {items.map((item) => (
        <div className="nh-pj-stat" key={item.id}>
          <dt className="nh-pj-stat__label">{item.label}</dt>
          <dd className="nh-pj-stat__value">
            <Counter to={item.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
