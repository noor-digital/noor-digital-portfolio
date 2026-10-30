import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import Panel from '../home/Panel.jsx';
import Cta from '../home/Cta.jsx';
import ProjectArt from '../home/art/ProjectArt.jsx';

const pad = (n) => String(n).padStart(2, '0');

// Statut déduit des données : on n’affirme que ce qui est vérifié (dépôt GitHub, démo renseignée).
function statusOf(project) {
  return project.demo ? 'Démo en ligne et code source' : 'Code source sur GitHub';
}

const POLY_ART = [
  'polygon(0 0, 100% 0, 96% 100%, 0 100%)',
  'polygon(4% 0, 100% 0, 100% 100%, 0 100%)',
];
const POLY_INFO = [
  'polygon(5% 0, 100% 0, 100% 100%, 0 100%)',
  'polygon(0 0, 95% 0, 100% 100%, 0 100%)',
];

// Une double-page par projet : l’illustration (ou la capture) dans une case, la fiche dans une
// seconde case qui la chevauche, et un grand numéro en filigrane qui dérive à contre-sens au défilement.
// L’ordre se décline en alternance (gauche / droite) ; l’ancre #slug est conservée.
export default function ProjectSpread({ project, index, total, ref }) {
  const reduce = useReducedMotion();
  const side = index % 2; // 0 : illustration à gauche
  const number = pad(index + 1);
  const nameId = `${project.slug}-name`;

  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: itemRef, offset: ['start end', 'end start'] });
  const artY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const numY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Au survol, les deux plans de l’illustration glissent en sens inverse (mêmes variables que l’accueil).
  const plateRef = useRef(null);
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
    <motion.article
      ref={ref}
      id={project.slug}
      className="nh-pj-item"
      data-side={side}
      aria-labelledby={nameId}
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="nh-pj-item__frame" ref={itemRef}>
        <motion.span className="nh-pj-num" aria-hidden="true" style={reduce ? undefined : { y: numY }}>
          {number}
        </motion.span>

        <div className="nh-pj-art" ref={plateRef} onPointerMove={onMove} onPointerLeave={onLeave}>
          <Panel poly={POLY_ART[side]}>
            <div className="nh-pj-art__img">
              <motion.div className="nh-pj-art__move" style={reduce ? undefined : { y: artY }}>
                {project.image ? (
                  <img
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
              </motion.div>
              <span className="nh-pcard__cat">{project.category}</span>
            </div>
          </Panel>
        </div>

        <div className="nh-pj-info">
          <Panel poly={POLY_INFO[side]} delay={0.15} className={index % 3 === 1 ? 'is-bright' : ''}>
            <div className="nh-pj-info__body">
              <p className="nh-pj-info__meta">
                <span>
                  {number} sur {pad(total)}
                </span>
                <span>
                  {project.category}
                  {project.year ? `, ${project.year}` : ''}
                </span>
              </p>
              <h2 className="nh-pj-info__name" id={nameId}>
                {project.name}
              </h2>
              <p className="nh-pj-info__desc">{project.description}</p>

              <dl className="nh-pj-facts">
                <div>
                  <dt>Stack</dt>
                  <dd>
                    <ul className="nh-pj-stack" aria-label="Technologies utilisées">
                      {project.tech.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>Statut</dt>
                  <dd>{statusOf(project)}</dd>
                </div>
              </dl>

              <div className="nh-pj-links">
                {project.demo && (
                  <Cta href={project.demo} external>
                    Voir la démo
                    <span className="visually-hidden"> : {project.name}</span>
                  </Cta>
                )}
                {project.demo ? (
                  <a className="nh-pcard__code" href={project.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                    <span className="visually-hidden"> : code source de {project.name} (s’ouvre dans un nouvel onglet)</span>
                  </a>
                ) : (
                  <Cta href={project.github} external>
                    Voir sur GitHub
                    <span className="visually-hidden"> : {project.name}</span>
                  </Cta>
                )}
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </motion.article>
  );
}
