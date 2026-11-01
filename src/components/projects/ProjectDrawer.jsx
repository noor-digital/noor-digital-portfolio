import { useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { projectsPage } from '../../data/site.js';
import useCopy from '../../hooks/useCopy.js';
import Cta from '../home/Cta.jsx';
import { GithubIcon } from '../home/HomeIcons.jsx';
import ServicesIcon from '../services/ServicesIcons.jsx';
import { withBase } from '../../lib/projectsUtil.js';
import ProjectMedia from './ProjectMedia.jsx';
import TechBadges from './TechBadges.jsx';

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Fiche détaillée d’un projet (volet latéral sur ordinateur, plein écran sur mobile).
// Accessibilité : role="dialog" + aria-modal, focus placé sur le titre à l’ouverture puis piégé dans la fiche,
// fermeture par Échap, par la croix ou par un clic sur le fond, défilement de la page verrouillé.
// Le retour du focus sur la carte d’origine est fait par la page (voir Projects.jsx).
// Tout champ vide (longDescription, features, learnings, role, year, demo, gallery) est simplement masqué.
export default function ProjectDrawer({ project, position, total, previous, next, onClose, onGo }) {
  const t = projectsPage.drawer;
  const reduce = useReducedMotion();
  const uid = useId();
  const panelRef = useRef(null);
  const titleRef = useRef(null);
  const [copyState, copy] = useCopy();

  // Verrouille le défilement de la page (sans décalage de mise en page : on compense la barre de défilement).
  useEffect(() => {
    const html = document.documentElement;
    const before = { overflow: html.style.overflow, padding: html.style.paddingRight };
    const bar = window.innerWidth - html.clientWidth;
    html.style.overflow = 'hidden';
    if (bar > 0) html.style.paddingRight = `${bar}px`;
    return () => {
      html.style.overflow = before.overflow;
      html.style.paddingRight = before.padding;
    };
  }, []);

  // Échap pour fermer ; Tab reste dans la fiche.
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !panelRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !panelRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // Focus sur le titre à l’ouverture et à chaque changement de projet.
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
    panelRef.current?.scrollTo({ top: 0 });
  }, [project.slug]);

  const titleId = `${uid}-title`;
  const shareUrl = () => {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = project.slug;
    return url.toString();
  };

  return (
    <motion.div
      className="nh-pj-drawer"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="nh-pj-drawer__backdrop" onPointerDown={onClose} aria-hidden="true" />
      <motion.div
        className="nh-pj-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
        initial={reduce ? false : { x: '100%' }}
        animate={{ x: 0 }}
        exit={reduce ? undefined : { x: '100%' }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="nh-pj-drawer__top">
          <p className="nh-pj-drawer__count" aria-hidden="true">
            {String(position + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          <div className="nh-pj-drawer__tools">
            <button type="button" className="nh-pj-iconbtn" onClick={() => copy(shareUrl())}>
              <ServicesIcon name="link" size={18} />
              <span>{copyState === 'copied' ? t.copied : t.share}</span>
            </button>
            <button type="button" className="nh-pj-iconbtn nh-pj-iconbtn--close" onClick={onClose} aria-label={t.close}>
              <ServicesIcon name="close" size={20} />
            </button>
          </div>
        </div>
        <p className="visually-hidden" role="status" aria-live="polite">
          {copyState === 'copied' ? t.copied : copyState === 'error' ? t.copyError : ''}
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.slug}
            className="nh-pj-drawer__content"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <ProjectMedia project={project} index={position} className="nh-pj-drawer__media" />

            <p className="nh-pj-drawer__cat">{project.category}</p>
            <h2 className="nh-pj-drawer__title" id={titleId} tabIndex={-1} ref={titleRef}>
              {project.name}
            </h2>
            <p className="nh-pj-drawer__desc">{project.longDescription ?? project.description}</p>

            {(project.role || project.year) && (
              <dl className="nh-pj-drawer__meta">
                {project.role && (
                  <div>
                    <dt>{t.role}</dt>
                    <dd>{project.role}</dd>
                  </div>
                )}
                {project.year && (
                  <div>
                    <dt>{t.year}</dt>
                    <dd>{project.year}</dd>
                  </div>
                )}
              </dl>
            )}

            {project.features.length > 0 && (
              <section aria-labelledby={`${uid}-features`}>
                <h3 id={`${uid}-features`} className="nh-pj-drawer__h">
                  {t.features}
                </h3>
                <ul className="nh-pj-drawer__list">
                  {project.features.map((item) => (
                    <li key={item}>
                      <ServicesIcon name="check" size={16} className="nh-pj-tick" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby={`${uid}-stack`}>
              <h3 id={`${uid}-stack`} className="nh-pj-drawer__h">
                {t.stack}
              </h3>
              <TechBadges tech={project.tech} max={0} full />
            </section>

            {project.learnings.length > 0 && (
              <section aria-labelledby={`${uid}-learn`}>
                <h3 id={`${uid}-learn`} className="nh-pj-drawer__h">
                  {t.learnings}
                </h3>
                <ul className="nh-pj-drawer__list">
                  {project.learnings.map((item) => (
                    <li key={item}>
                      <ServicesIcon name="check" size={16} className="nh-pj-tick" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.gallery.length > 0 && (
              <section aria-labelledby={`${uid}-gallery`}>
                <h3 id={`${uid}-gallery`} className="nh-pj-drawer__h">
                  {t.gallery}
                </h3>
                <ul className="nh-pj-drawer__gallery">
                  {project.gallery.map((shot) => (
                    <li key={shot.src}>
                      <img src={withBase(shot.src)} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" decoding="async" />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="nh-pj-drawer__actions" hidden={!project.github && !project.demo}>
              {project.github && (
                <Cta href={project.github} external>
                  <GithubIcon size={18} />
                  {t.code}
                </Cta>
              )}
              {project.demo && (
                <Cta href={project.demo} external variant="ghost">
                  {t.demo}
                </Cta>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <nav className="nh-pj-drawer__nav" aria-label={t.nav}>
          <button type="button" className="nh-pj-navbtn" onClick={() => onGo(previous.slug)}>
            <ServicesIcon name="left" size={18} />
            <span>
              <small>{t.prev}</small>
              {previous.name}
            </span>
          </button>
          <button type="button" className="nh-pj-navbtn nh-pj-navbtn--next" onClick={() => onGo(next.slug)}>
            <span>
              <small>{t.next}</small>
              {next.name}
            </span>
            <ServicesIcon name="right" size={18} />
          </button>
        </nav>
      </motion.div>
    </motion.div>
  );
}
