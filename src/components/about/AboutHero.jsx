import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { aboutPage, site } from '../../data/site.js';
import { withBase } from '../../lib/projectsUtil.js';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import Cta from '../home/Cta.jsx';
import LiveClock from '../LiveClock.jsx';
import Magnetic from '../services/Magnetic.jsx';
import ServicesIcon from '../services/ServicesIcons.jsx';
import HeroStage from './HeroStage.jsx';

// Particules : positions fixes (aucun hasard au rendu), dérive lente en CSS (transform + opacity).
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 39 + 5) % 100,
  top: (i * 53 + 9) % 100,
  size: 2 + (i % 3),
  dur: 17 + (i % 5) * 4,
  delay: -(i * 2.4),
}));

const HIDDEN = { y: '108%', skewX: -9 };
const SHOWN = { y: '0%', skewX: 0 };

function Line({ children, delay = 0, reduce, className = '' }) {
  return (
    <span className="nh-title__mask">
      <motion.span
        className={`nh-title__line ${className}`}
        initial={reduce ? false : HIDDEN}
        animate={{ ...SHOWN, transition: { duration: 0.85, delay, ease: EASE } }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Second segment de la ligne de rôle : alterne parmi des technologies réelles. La largeur est celle du plus long mot
// (tous rendus dans la même cellule de grille) : aucun décalage de mise en page.
function RoleWord({ words, reduce }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduce) return undefined;
    const timer = window.setInterval(() => setIndex((n) => (n + 1) % words.length), 2400);
    return () => window.clearInterval(timer);
  }, [reduce, words.length]);

  if (reduce) return <span className="nh-ab-role__word">{words.join(' · ')}</span>;
  return (
    <span className="nh-ab-role__word nh-ab-role__word--rot" aria-hidden="true">
      {words.map((word) => (
        <span className="nh-ab-role__size" key={word}>
          {word}
        </span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Hero plein écran : nom géant, rôle animé, repères factuels lisibles (dont l’heure de Dakar en direct), actions
// claires (CV seulement si `site.cv`), scène personnage + lune en parallaxe. Au défilement, l’ensemble se fond dans la suite.
export default function AboutHero({ onScrollDown }) {
  const t = aboutPage;
  const reduce = useReducedMotion();
  const pointerFine = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 900px)');
  const wide = useMediaQuery('(min-width: 960px)');
  const parallax = pointerFine && !reduce;
  const exits = wide && !reduce;

  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.7 });
  const smy = useSpring(my, { stiffness: 50, damping: 20, mass: 0.7 });
  const glowX = useTransform(smx, [-0.5, 0.5], [-160, 160]);
  const glowY = useTransform(smy, [-0.5, 0.5], [-110, 110]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -48]);

  function onPointerMove(event) {
    if (!parallax) return;
    const box = ref.current.getBoundingClientRect();
    mx.set((event.clientX - box.left) / box.width - 0.5);
    my.set((event.clientY - box.top) / box.height - 0.5);
  }

  const appear = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section id="ab-hero" className="nh-ab-hero" ref={ref} aria-label="Présentation" onPointerMove={onPointerMove}>
      <div className="nh-ab-hero__bg" aria-hidden="true">
        <motion.div className="nh-ab-hero__glow" style={parallax ? { x: glowX, y: glowY } : undefined} />
        <div className="nh-ab-hero__grid" />
        <div className="nh-ab-hero__beams">
          <i />
          <i />
        </div>
        {PARTICLES.map((p, i) => (
          <span
            className="nh-ab-hero__dot"
            key={i}
            style={{ left: `${p.left}%`, top: `${p.top}%`, '--s': `${p.size}px`, '--dur': `${p.dur}s`, '--del': `${p.delay}s` }}
          />
        ))}
        <div className="nh-ab-hero__grain" />
        <div className="nh-ab-hero__fade" />
      </div>

      <motion.div className="nh-ab-hero__inner" style={exits ? { scale, opacity: fade, y: lift } : undefined}>
        <div className="container nh-ab-hero__grid2">
          <div className="nh-ab-hero__copy">
            <motion.p className="nh-ab-hero__kicker" {...appear(0)}>
              <span className="nh-ab-slash" aria-hidden="true" />
              {t.kicker}
            </motion.p>

            <h1 className="nh-title nh-ab-h1">
              <Line reduce={reduce}>{t.titleLines[0]}</Line>
              <Line reduce={reduce} delay={0.11} className="nh-ab-h1__out">
                {t.titleLines[1]}
              </Line>
            </h1>

            <motion.p className="nh-ab-role" {...appear(0.35)}>
              <span>{t.role.lead}</span>
              <span className="nh-ab-role__sep" aria-hidden="true">
                /
              </span>
              <RoleWord words={t.role.words} reduce={reduce} />
            </motion.p>
            <motion.p className="nh-ab-hero__sub" {...appear(0.45)}>
              {t.sub}
            </motion.p>

            <motion.ul className="nh-ab-badges" {...appear(0.55)}>
              {t.badges.map((badge) => (
                <li key={badge}>{badge}</li>
              ))}
              <li className="nh-ab-badges__live">
                <LiveClock seconds={false} />
              </li>
            </motion.ul>

            <motion.div className="nh-ab-hero__actions" {...appear(0.65)}>
              <Magnetic>
                <Cta to="/contact">
                  {t.ctas.contact}
                  <ServicesIcon name="arrow" className="nh-sv-arr" size={18} />
                </Cta>
              </Magnetic>
              <Cta to="/projets" variant="ghost">
                {t.ctas.projects}
              </Cta>
              {site.cv && (
                <Cta href={withBase(site.cv)} variant="ghost" download>
                  {t.ctas.cv}
                </Cta>
              )}
            </motion.div>
          </div>

          <motion.div
            className="nh-ab-hero__art"
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
          >
            <HeroStage mx={smx} my={smy} parallax={parallax} />
          </motion.div>
        </div>

        <a
          className="nh-ab-cue"
          href="#ab-who"
          onClick={(event) => {
            event.preventDefault();
            onScrollDown();
          }}
        >
          <span className="visually-hidden">{t.scrollLabel}</span>
          <span className="nh-ab-cue__mouse" aria-hidden="true">
            <i />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
