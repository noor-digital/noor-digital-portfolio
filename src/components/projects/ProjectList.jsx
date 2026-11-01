import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { projectsPage } from '../../data/site.js';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import { ArrowUpRight } from '../Icons.jsx';
import { techFamily } from '../../lib/projectsUtil.js';
import ProjectMedia from './ProjectMedia.jsx';

const pad = (n) => String(n).padStart(2, '0');

// Mode « Liste » : lignes compactes façon index (numéro, nom, catégorie, technologies, flèche). Sur ordinateur à
// pointeur précis, l’aperçu du visuel suit la souris ; il apparaît aussi au focus clavier (aligné sur la ligne).
// Chaque ligne est un vrai lien vers la fiche : tabulation et Entrée fonctionnent comme partout ailleurs.
export default function ProjectList({ projects, allProjects, onOpen }) {
  const reduce = useReducedMotion();
  const location = useLocation();
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 900px)');
  const [preview, setPreview] = useState(null); // { project, x, y }
  const listRef = useRef(null);

  function show(project, event) {
    if (!finePointer) return;
    setPreview({ project, x: event.clientX, y: event.clientY });
  }
  function showFocus(project, event) {
    if (!finePointer) return;
    const box = event.currentTarget.getBoundingClientRect();
    setPreview({ project, x: box.right - 220, y: box.top + box.height / 2 });
  }

  return (
    <div className="nh-pj-index" ref={listRef} onPointerLeave={() => setPreview(null)}>
      <ol className="nh-pj-rows">
        {projects.map((project) => (
          <motion.li
            key={project.slug}
            className="nh-pj-row"
            layout={reduce ? false : 'position'}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Link
              className="nh-pj-row__link"
              to={{ pathname: location.pathname, search: location.search, hash: `#${project.slug}` }}
              state={{ drawer: true }}
              onClick={(event) => onOpen(event.currentTarget)}
              onPointerMove={(event) => show(project, event)}
              onFocus={(event) => showFocus(project, event)}
              onBlur={() => setPreview(null)}
            >
              <span className="nh-pj-row__num" aria-hidden="true">
                {pad(allProjects.indexOf(project) + 1)}
              </span>
              <span className="nh-pj-row__name">{project.name}</span>
              <span className="nh-pj-row__cat">{project.category}</span>
              <span className="nh-pj-row__tech">{[...new Set(project.tech.map(techFamily))].slice(0, 4).join(' · ')}</span>
              <ArrowUpRight className="nh-pj-row__arrow" />
              <span className="visually-hidden"> : {projectsPage.card.view}</span>
            </Link>
          </motion.li>
        ))}
      </ol>

      <AnimatePresence>
        {preview && (
          <motion.div
            className="nh-pj-peek"
            aria-hidden="true"
            style={{ left: preview.x, top: preview.y }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
          >
            <ProjectMedia project={preview.project} index={allProjects.indexOf(preview.project)} label={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
