import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import { home } from '../../data/site.js';
import HeroScene from './HeroScene.jsx';
import Cta from './Cta.jsx';

// Une ligne du titre : elle monte depuis un masque, légèrement penchée, comme une planche qu’on découvre.
function TitleLine({ children, delay, outline = false, reduce }) {
  return (
    <span className="nh-hero__mask">
      <motion.span
        className={`nh-hero__line${outline ? ' nh-hero__line--outline' : ''}`}
        initial={false}
        animate={{ y: '0%', skewX: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Rise({ delay, children, className }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const portrait = useMediaQuery('(max-aspect-ratio: 1/1)');
  // Écran très court (téléphone en paysage) : pas d’épinglage ni de sortie animée, le contenu
  // dépasse la hauteur de l’écran et doit rester accessible en défilement normal.
  const short = useMediaQuery('(max-height: 600px)');
  const flat = reduce || short;
  const frame = portrait ? 'tall' : 'wide';
  const sectionRef = useRef(null);
  const hostRef = useRef(null);
  const { brand, byline, titleLines, intro, primary, secondary, scrollLabel } = home.hero;

  // Avancement du défilement dans le Hero (0 en haut, 1 quand il est entièrement quitté).
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const still = useMotionValue(0);
  const progress = flat ? still : scrollYProgress;

  // Le texte part vers la gauche et s’efface pendant que la scène se rapproche.
  const copyX = useTransform(progress, [0, 0.55], ['0vw', '-7vw']);
  const copyOpacity = useTransform(progress, [0.05, 0.5], [1, 0]);

  function scrollToProjects() {
    document.getElementById('projets')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <section className={`nh-hero${flat ? ' nh-hero--still' : ''}`} ref={sectionRef} aria-label="Présentation">
      <div className="nh-hero__stick" ref={hostRef}>
        <HeroScene frame={frame} intro={false} parallax={!reduce} progress={progress} hostRef={hostRef} />

        {/* Cadre de case : quatre coins, comme les repères d’une planche. */}
        <span className="nh-hero__corner nh-hero__corner--tl" aria-hidden="true" />
        <span className="nh-hero__corner nh-hero__corner--tr" aria-hidden="true" />
        <span className="nh-hero__corner nh-hero__corner--bl" aria-hidden="true" />
        <span className="nh-hero__corner nh-hero__corner--br" aria-hidden="true" />

        <motion.p
          className="nh-hero__spine"
          aria-hidden="true"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
        >
          {brand}
          <i />
          <span>Applications web et expériences digitales</span>
        </motion.p>

        <motion.div className="nh-hero__copy" style={flat ? undefined : { x: copyX, opacity: copyOpacity }}>
          <div className="nh-hero__col">
            <Rise delay={0.9} className="nh-hero__id">
              <span className="nh-hero__slash" aria-hidden="true" />
              <p className="nh-hero__byline">{byline}</p>
            </Rise>

            <h1 className="nh-hero__title" tabIndex={-1}>
              <span className="visually-hidden">
                {brand} : expériences digitales et applications web modernes. {byline}.{' '}
              </span>
              <span aria-hidden="true">
                <TitleLine delay={1.0} reduce={reduce}>
                  {titleLines[0]}
                </TitleLine>
                <TitleLine delay={1.12} outline reduce={reduce}>
                  {titleLines[1]}
                </TitleLine>
              </span>
            </h1>

            <Rise delay={1.45} className="nh-hero__intro">
              <p>{intro}</p>
            </Rise>

            <Rise delay={1.6} className="nh-hero__actions">
              <Cta onClick={scrollToProjects}>{primary}</Cta>
              <Cta to="/contact" variant="ghost">
                {secondary}
              </Cta>
            </Rise>
          </div>
        </motion.div>

        <motion.button
          type="button"
          className="nh-hero__cue"
          onClick={() => document.getElementById('approche')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.1 }}
        >
          <span className="nh-hero__cue-line" aria-hidden="true" />
          <span>{scrollLabel}</span>
        </motion.button>
      </div>
    </section>
  );
}
