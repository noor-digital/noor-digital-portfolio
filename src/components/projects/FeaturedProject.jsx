import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { projectsPage } from '../../data/site.js';
import useSpotlight from '../../hooks/useSpotlight.js';
import Reveal from '../Reveal.jsx';
import Cta from '../home/Cta.jsx';
import { GithubIcon } from '../home/HomeIcons.jsx';
import ServicesIcon from '../services/ServicesIcons.jsx';
import ProjectMedia from './ProjectMedia.jsx';
import TechBadges from './TechBadges.jsx';

// Projet « à la une » : grande carte pleine largeur, en tête de liste (champ `featured`, sinon le premier).
export default function FeaturedProject({ project, index, onOpen }) {
  const t = projectsPage;
  const location = useLocation();
  const ref = useRef(null);
  useSpotlight(ref, { normalized: true });
  const to = { pathname: location.pathname, search: location.search, hash: `#${project.slug}` };

  return (
    <Reveal className="nh-pj-featured-wrap">
      <article className="nh-pj-featured" ref={ref} id={`pj-${project.slug}`} aria-labelledby={`pj-${project.slug}-name`}>
        <span className="nh-pj-card__glow" aria-hidden="true" />
        <Link className="nh-pj-featured__visual" to={to} state={{ drawer: true }} tabIndex={-1} aria-hidden="true" onClick={(event) => onOpen(event.currentTarget)}>
          <ProjectMedia project={project} index={index} className="nh-pj-featured__media" />
        </Link>

        <div className="nh-pj-featured__body">
          <p className="nh-pj-featured__label">
            <span className="nh-ab-slash" aria-hidden="true" />
            {t.featuredLabel} · {project.category}
          </p>
          <h2 className="nh-pj-featured__name" id={`pj-${project.slug}-name`}>
            {project.name}
          </h2>
          <p className="nh-pj-featured__desc">{project.longDescription ?? project.description}</p>

          {project.features.length > 0 && (
            <ul className="nh-pj-featured__list">
              {project.features.slice(0, 4).map((feature) => (
                <li key={feature}>
                  <ServicesIcon name="check" size={16} className="nh-pj-tick" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          <TechBadges tech={project.tech} max={5} />

          <div className="nh-pj-featured__actions">
            <Cta to={to} state={{ drawer: true }} onClick={(event) => onOpen(event.currentTarget)}>
              {t.card.view}
              <ServicesIcon name="arrow" className="nh-sv-arr" size={18} />
              <span className="visually-hidden"> : {project.name}</span>
            </Cta>
            {project.github && (
              <Cta href={project.github} external variant="ghost">
                <GithubIcon size={18} />
                GitHub
              </Cta>
            )}
            {project.demo && (
              <Cta href={project.demo} external variant="ghost">
                {t.card.demo}
              </Cta>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
