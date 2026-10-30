import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import { home } from '../../data/site.js';
import { projects } from '../../data/projects.js';
import TitleReveal from './TitleReveal.jsx';
import Cta from './Cta.jsx';
import ProjectArt from './art/ProjectArt.jsx';

// Projets en « bande » : sur grand écran, la section reste en place et le défilement vertical
// fait avancer la bande horizontalement (un défilement natif, jamais détourné : la molette,
// le clavier et le scroll tactile gardent leur comportement). Sur mobile ou avec « mouvement
// réduit », la bande devient un rail horizontal à glisser, avec accroche.

const POLY_A = 'polygon(0 0, 100% 0, 100% 100%, 7% 100%)';
const POLY_B = 'polygon(7% 0, 100% 0, 100% 100%, 0 100%)';

function ProjectPanel({ project, index }) {
  const { code, details } = home.projects;
  const plateRef = useRef(null);

  // Au survol, les deux plans de l’illustration glissent en sens inverse et le cadrage se resserre.
  function onMove(event) {
    const el = plateRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (((event.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (((event.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  }
  function onLeave() {
    plateRef.current?.style.setProperty('--px', '0');
    plateRef.current?.style.setProperty('--py', '0');
  }

  return (
    <article className="nh-pcard" data-offset={index % 2}>
      <div
        className="nh-panel nh-pcard__plate"
        ref={plateRef}
        style={{ '--poly': index % 2 === 0 ? POLY_A : POLY_B }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="nh-panel__in">
          <div className="nh-pcard__art">
            {project.image ? (
              <img
                className="nh-pcard__img"
                src={`${import.meta.env.BASE_URL}${project.image.src}`}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <ProjectArt slug={project.slug} name={project.name} index={index} />
            )}
            <span className="nh-pcard__cat">{project.category}</span>
          </div>

          <div className="nh-pcard__reveal">
            <p>{project.description}</p>
            <ul className="nh-pcard__tech">
              {project.tech.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="nh-pcard__links">
              <span className="nh-pcard__more">{details}</span>
              <a className="nh-pcard__code" href={project.github} target="_blank" rel="noopener noreferrer">
                {code} <span className="visually-hidden">de {project.name} (s’ouvre dans un nouvel onglet)</span>
              </a>
              {project.demo && (
                <a className="nh-pcard__code" href={project.demo} target="_blank" rel="noopener noreferrer">
                  Démo <span className="visually-hidden">de {project.name} (s’ouvre dans un nouvel onglet)</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <h3 className="nh-pcard__name">
        <Link className="nh-pcard__link" to={{ pathname: '/projets', hash: `#${project.slug}` }}>
          {project.name}
        </Link>
      </h3>
    </article>
  );
}

export default function HomeProjects() {
  const reduce = useReducedMotion();
  const wide = useMediaQuery('(min-width: 960px) and (min-height: 540px)');
  const pinned = wide && !reduce;

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [dist, setDist] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (v) => -v * dist);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Distance à parcourir = largeur de la bande moins la largeur de l’écran. Elle fixe la hauteur de la section.
  useLayoutEffect(() => {
    if (!pinned) return undefined;
    const measure = () => {
      const track = trackRef.current;
      if (track) setDist(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned]);

  // Focus clavier sur une carte hors champ : on fait défiler la page jusqu’au bon endroit,
  // la bande suit (sans ça le navigateur décalerait la bande à la main et casserait l’alignement).
  function onFocusCapture(event) {
    if (!pinned || dist <= 0) return;
    const card = event.target.closest?.('.nh-pcard, .nh-proj__end');
    const section = sectionRef.current;
    if (!card || !section) return;
    const left = card.offsetLeft;
    const visible = left + x.get(); // position actuelle de la carte à l’écran
    const margin = window.innerWidth * 0.08;
    if (visible >= margin && visible + card.offsetWidth <= window.innerWidth - margin) return;
    const target = Math.min(Math.max(left - margin, 0), dist);
    const top = section.getBoundingClientRect().top + window.scrollY + target;
    window.scrollTo({ top, behavior: 'auto' });
  }

  const { title, text, link, note } = home.projects;

  return (
    <section
      id="projets"
      ref={sectionRef}
      className={`nh-proj${pinned ? ' nh-proj--pinned' : ''}`}
      style={pinned ? { height: `calc(100svh + ${dist}px)` } : undefined}
      aria-labelledby="projects-title"
    >
      <div className="nh-proj__stick">
        <motion.div
          className="nh-proj__track"
          ref={trackRef}
          style={pinned ? { x } : undefined}
          onFocusCapture={onFocusCapture}
        >
          <div className="nh-proj__lead">
            <TitleReveal lines={[title]} id="projects-title" className="nh-proj__title" />
            <p className="nh-proj__text">{text}</p>
            <p className="nh-proj__note">{note}</p>
          </div>

          {projects.map((project, i) => (
            <ProjectPanel key={project.slug} project={project} index={i} />
          ))}

          <div className="nh-proj__end">
            <p>{projects.length} projets, tous avec leur code source sur GitHub.</p>
            <Cta to="/projets">{link}</Cta>
          </div>
        </motion.div>

        {pinned && (
          <div className="nh-proj__progress" aria-hidden="true">
            <motion.span style={{ scaleX: bar }} />
          </div>
        )}
      </div>
    </section>
  );
}
