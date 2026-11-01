// Utilitaires de la page Projets : familles de technologies, icônes, recherche. Tout est calculé depuis
// data/projects.js : aucune technologie ni aucun nombre n’est écrit en dur.

// « JavaScript (ES modules) » → « JavaScript » ; « Bootstrap 5 » → « Bootstrap » : une famille par techno.
export function techFamily(name) {
  return name.replace(/\s*\(.*?\)\s*/g, '').replace(/\s+\d+(\.\d+)*$/, '').trim();
}

// Icône de marque (clé de techIcons.jsx) quand elle existe ; `null` sinon (le badge n’a alors que du texte).
const ICON_KEYS = { html5: 'html5', css3: 'css', javascript: 'javascript', bootstrap: 'bootstrap', react: 'react', vite: 'vite', php: 'php', laravel: 'laravel', mysql: 'mysql' };
export const techIconKey = (name) => ICON_KEYS[techFamily(name).toLowerCase()] ?? null;

export function allFamilies(projects) {
  const counts = new Map();
  projects.forEach((project) => {
    new Set(project.tech.map(techFamily)).forEach((family) => counts.set(family, (counts.get(family) ?? 0) + 1));
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'fr')).map(([name, count]) => ({ name, count }));
}

const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function matches(project, { category, techs, query }) {
  if (category && category !== 'all' && project.category !== category) return false;
  if (techs.length) {
    const own = new Set(project.tech.map(techFamily));
    if (!techs.every((tech) => own.has(tech))) return false;
  }
  const q = normalize(query.trim());
  if (q) {
    const haystack = normalize([project.name, project.description, project.category, ...project.tech].join(' '));
    if (!q.split(/\s+/).every((word) => haystack.includes(word))) return false;
  }
  return true;
}

export const withBase = (path) => `${import.meta.env.BASE_URL}${path}`;
