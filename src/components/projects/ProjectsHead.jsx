import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { projectsPage } from '../../data/site.js';
import { projects } from '../../data/projects.js';
import TitleReveal from '../home/TitleReveal.jsx';
import ProjectArt from '../home/art/ProjectArt.jsx';

const pad = (n) => String(n).padStart(2, '0');

// Tête de page : le titre, et une « planche-contact » des projets. Chaque vignette est un vrai lien
// d’accès rapide : elle fait défiler jusqu’au projet (en réinitialisant le filtre si besoin).
export default function ProjectsHead({ onPick }) {
  const reduce = useReducedMotion();
  const { title, kicker, subAfterCount, indexLabel } = projectsPage;

  return (
    <section className="nh-pj-head" aria-label="Introduction">
      <div className="container nh-pj-head__grid">
        <div className="nh-pj-head__copy">
          <p className="nh-pj-head__kicker">
            <span className="nh-ab-slash" aria-hidden="true" />
            {kicker}
          </p>
          <TitleReveal as="h1" lines={[title]} className="nh-pj-title" />
          <p className="nh-pj-head__sub">
            {projects.length} {subAfterCount}
          </p>
        </div>

        <nav className="nh-pj-sheet" aria-label={indexLabel}>
          <ul>
            {projects.map((project, i) => (
              <motion.li
                key={project.slug}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 + i * 0.07, ease: EASE }}
              >
                <a
                  className="nh-pj-thumb"
                  href={`#${project.slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onPick(project.slug);
                  }}
                >
                  {project.image ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${project.image.src}`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <ProjectArt slug={project.slug} name={project.name} index={i} />
                  )}
                  <span className="nh-pj-thumb__num" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <span className="visually-hidden">Aller au projet {project.name}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
