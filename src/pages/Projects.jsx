import { useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useReducedMotion } from 'motion/react';
import { getRoute, site, projectsPage } from '../data/site.js';
import { projectCategories, projects } from '../data/projects.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import ProjectsHead from '../components/projects/ProjectsHead.jsx';
import ProjectFilterBar from '../components/projects/ProjectFilterBar.jsx';
import ProjectSpread from '../components/projects/ProjectSpread.jsx';
import PageClose from '../components/home/PageClose.jsx';
import ScrollRail from '../components/home/ScrollRail.jsx';

const ALL = 'all';

// Projets (direction manga) : tête avec planche-contact → filtres → une double-page par projet → clôture.
// Les données viennent de projects.js ; les textes de la page, de site.js (projectsPage).
export default function Projects() {
  useDocumentTitle(getRoute('/projets'));
  const reduce = useReducedMotion();
  const [category, setCategory] = useState(ALL);

  // Les filtres sont construits à partir des catégories réellement présentes dans les données.
  const options = useMemo(
    () => [
      { value: ALL, label: 'Tous', count: projects.length },
      ...projectCategories.map((name) => ({
        value: name,
        label: name,
        count: projects.filter((project) => project.category === name).length,
      })),
    ],
    [],
  );

  const visible = category === ALL ? projects : projects.filter((p) => p.category === category);
  const activeLabel = options.find((option) => option.value === category)?.label;
  const statusText =
    category === ALL
      ? `${visible.length} projets affichés`
      : `${visible.length} ${visible.length > 1 ? 'projets affichés' : 'projet affiché'} — ${activeLabel}`;

  // Accès rapide depuis la planche-contact : on réaffiche tout, puis on défile jusqu’au projet.
  function goTo(slug) {
    setCategory(ALL);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(slug)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      });
    });
  }

  const { closing } = projectsPage;

  return (
    <div className="home nh nh-pj">
      <ScrollRail />
      <ProjectsHead onPick={goTo} />

      <section className="nh-pj-list" aria-label="Liste des projets">
        <div className="container">
          <div className="nh-pj-bar">
            <ProjectFilterBar options={options} active={category} onChange={setCategory} />
            <p className="nh-pj-status" role="status" aria-live="polite">
              {statusText}
            </p>
          </div>

          <div className="nh-pj-items">
            {/* Chaque projet garde son numéro et son côté d’origine (index dans la liste complète) :
                filtrer ne fait donc jamais « sauter » la composition. */}
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <ProjectSpread
                  key={project.slug}
                  project={project}
                  index={projects.indexOf(project)}
                  total={projects.length}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <PageClose
        id="projects-close"
        titleLines={closing.titleLines}
        actions={[
          { label: closing.primary, to: '/contact' },
          { label: closing.secondary, href: site.github, external: true, variant: 'ghost' },
        ]}
      />
    </div>
  );
}
