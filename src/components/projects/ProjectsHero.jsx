import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { projectsPage } from '../../data/site.js';
import { projects } from '../../data/projects.js';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import ShowReel from './ShowReel.jsx';
import StatsStrip from './StatsStrip.jsx';
import TechMarquee from './TechMarquee.jsx';

// Particules : positions fixes (aucun hasard au rendu), dérive lente en CSS (transform + opacity).
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 43 + 7) % 100,
  top: (i * 51 + 11) % 100,
  size: 2 + (i % 3),
  dur: 17 + (i % 5) * 4,
  delay: -(i * 2.5),
}));

const HIDDEN = { y: '108%', skewX: -9 };
const SHOWN = { y: '0%', skewX: 0 };

function Line({ children, delay = 0, reduce }) {
  return (
    <span className="nh-title__mask">
      <motion.span
        className="nh-title__line"
        initial={reduce ? false : HIDDEN}
        animate={{ ...SHOWN, transition: { duration: 0.85, delay, ease: EASE } }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Hero plein écran : H1 géant (« Ce que j’ai / construit. »), phrase honnête dont le nombre vient des données,
// showreel de projets en profondeur, chiffres réels, technologies en défilement lent. Au défilement, l’ensemble se
// dézoome et se fond dans la liste (grands écrans).
export default function ProjectsHero({ onScrollDown }) {
  const t = projectsPage;
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
    <section id="pj-hero" className="nh-pj-hero" ref={ref} aria-label="Projets" onPointerMove={onPointerMove}>
      <div className="nh-pj-hero__bg" aria-hidden="true">
        <motion.div className="nh-pj-hero__glow" style={parallax ? { x: glowX, y: glowY } : undefined} />
        <div className="nh-pj-hero__grid" />
        <div className="nh-pj-hero__beams">
          <i />
          <i />
        </div>
        {PARTICLES.map((p, i) => (
          <span
            className="nh-pj-hero__dot"
            key={i}
            style={{ left: `${p.left}%`, top: `${p.top}%`, '--s': `${p.size}px`, '--dur': `${p.dur}s`, '--del': `${p.delay}s` }}
          />
        ))}
        <div className="nh-pj-hero__grain" />
        <div className="nh-pj-hero__fade" />
      </div>

      <motion.div className="nh-pj-hero__inner" style={exits ? { scale, opacity: fade, y: lift } : undefined}>
        <div className="container nh-pj-hero__grid2">
          <div className="nh-pj-hero__copy">
            <motion.p className="nh-pj-hero__kicker" {...appear(0)}>
              <span className="nh-ab-slash" aria-hidden="true" />
              {t.kicker}
            </motion.p>
            <h1 className="nh-title nh-pj-h1">
              <Line reduce={reduce}>{t.titleLead}</Line>
              <Line reduce={reduce} delay={0.11}>
                <span className="nh-pj-h1__accent">{t.titleAccent}</span>
              </Line>
            </h1>
            <motion.p className="nh-pj-hero__sub" {...appear(0.4)}>
              {projects.length} {t.subAfterCount}
            </motion.p>
          </div>

          <motion.div className="nh-pj-hero__art" initial={reduce ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3, ease: EASE }}>
            <ShowReel mx={smx} my={smy} parallax={parallax} />
          </motion.div>
        </div>

        <a
          className="nh-pj-cue"
          href="#pj-list"
          onClick={(event) => {
            event.preventDefault();
            onScrollDown();
          }}
        >
          <span className="visually-hidden">{t.scrollLabel}</span>
          <span className="nh-pj-cue__mouse" aria-hidden="true">
            <i />
          </span>
        </a>

        <TechMarquee />
        <div className="container">
          <StatsStrip />
        </div>
      </motion.div>
    </section>
  );
}
