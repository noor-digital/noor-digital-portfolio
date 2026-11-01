import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { projectsPage } from '../../data/site.js';
import useSpotlight from '../../hooks/useSpotlight.js';
import { ArrowUpRight } from '../Icons.jsx';
import { GithubIcon } from '../home/HomeIcons.jsx';
import ProjectMedia from './ProjectMedia.jsx';
import TechBadges from './TechBadges.jsx';

// Carte de projet : visuel 16:10, badge de catégorie, nom, description (3 lignes), 3-4 technologies, deux actions
// (« Voir le projet » → fiche détaillée, et icône GitHub ; « Démo en ligne » seulement si une démo est renseignée).
// Un seul lien principal par carte : le lien « Voir le projet » s’étend sur toute la carte (pseudo-élément),
// les actions secondaires restent cliquables au-dessus. Survol : spotlight, élévation, tilt 4° max, zoom du visuel,
// aperçu des fonctionnalités clés. Aucun effet ne dépend du survol au toucher.
export default function ProjectCard({ project, index, onOpen }) {
  const t = projectsPage.card;
  const reduce = useReducedMotion();
  const location = useLocation();
  const ref = useRef(null);
  useSpotlight(ref, { tilt: 4, enabled: !reduce, normalized: true });

  return (
    <motion.li
      className="nh-pj-cell"
      layout={reduce ? false : 'position'}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.18 } }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.07, ease: EASE }}
    >
      <article className="nh-pj-card" ref={ref} id={`pj-${project.slug}`} aria-labelledby={`pj-${project.slug}-name`}>
        <span className="nh-pj-card__glow" aria-hidden="true" />

        <div className="nh-pj-card__visual">
          <ProjectMedia project={project} index={index} className="nh-pj-card__media" />
          <span className="nh-pj-card__cat">{project.category}</span>
          {project.features.length > 0 && (
            <div className="nh-pj-card__peek" aria-hidden="true">
              <p>{t.keyFeatures}</p>
              <ul>
                {project.features.slice(0, 3).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="nh-pj-card__body">
          <h3 className="nh-pj-card__name" id={`pj-${project.slug}-name`}>
            {project.name}
          </h3>
          <p className="nh-pj-card__desc">{project.description}</p>
          <TechBadges tech={project.tech} max={4} />

          <div className="nh-pj-card__foot">
            <Link
              className="nh-pj-card__view"
              to={{ pathname: location.pathname, search: location.search, hash: `#${project.slug}` }}
              state={{ drawer: true }}
              onClick={(event) => onOpen(event.currentTarget)}
            >
              {t.view}
              <ArrowUpRight className="nh-pj-card__arrow" />
              <span className="visually-hidden"> : {project.name}</span>
            </Link>
            <span className="nh-pj-card__links">
              {project.demo && (
                <a className="nh-pj-card__demo" href={project.demo} target="_blank" rel="noopener noreferrer">
                  {t.demo}
                  <span className="visually-hidden"> : {project.name} (s’ouvre dans un nouvel onglet)</span>
                </a>
              )}
              {project.github && (
                <a
                  className="nh-pj-card__gh"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.github} : ${project.name} (s’ouvre dans un nouvel onglet)`}
                  title={t.github}
                >
                  <GithubIcon size={20} />
                </a>
              )}
            </span>
          </div>
        </div>
      </article>
    </motion.li>
  );
}
