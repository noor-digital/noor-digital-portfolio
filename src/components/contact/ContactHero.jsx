import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { contactPage, site } from '../../data/site.js';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import LiveClock from '../LiveClock.jsx';
import ContactArt from './ContactArt.jsx';
import QuickActions from './QuickActions.jsx';

// Particules : positions fixes (aucun hasard au rendu), dérive lente en CSS (transform + opacity).
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 41 + 9) % 100,
  top: (i * 47 + 13) % 70,
  size: 2 + (i % 3),
  dur: 18 + (i % 5) * 4,
  delay: -(i * 2.7),
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

// Hero plein écran : H1 géant (le dernier mot en turquoise), pastille de statut honnête (masquée si
// site.availability est vide), heure de Dakar en direct, trois cartes d’action rapide, décor nocturne de Dakar.
// Au défilement, l’ensemble se dézoome et se fond dans la section suivante (grands écrans).
export default function ContactHero({ onWrite }) {
  const t = contactPage;
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
    <section id="ct-hero" className="nh-ct-hero" ref={ref} aria-label="Contact" onPointerMove={onPointerMove}>
      <div className="nh-ct-hero__bg" aria-hidden="true">
        <motion.div className="nh-ct-hero__glow" style={parallax ? { x: glowX, y: glowY } : undefined} />
        <div className="nh-ct-hero__grid" />
        <div className="nh-ct-hero__beams">
          <i />
          <i />
        </div>
        {PARTICLES.map((p, i) => (
          <span
            className="nh-ct-hero__dot"
            key={i}
            style={{ left: `${p.left}%`, top: `${p.top}%`, '--s': `${p.size}px`, '--dur': `${p.dur}s`, '--del': `${p.delay}s` }}
          />
        ))}
        <div className="nh-ct-hero__grain" />
        <ContactArt mx={smx} parallax={parallax} />
        <div className="nh-ct-hero__fade" />
      </div>

      <motion.div className="nh-ct-hero__inner" style={exits ? { scale, opacity: fade, y: lift } : undefined}>
        <div className="container">
          <div className="nh-ct-hero__top">
            <div className="nh-ct-hero__copy">
              <motion.p className="nh-ct-hero__kicker" {...appear(0)}>
                <span className="nh-ab-slash" aria-hidden="true" />
                {t.kicker}
              </motion.p>
              <h1 className="nh-title nh-ct-h1">
                <Line reduce={reduce}>{t.titleLead}</Line>
                <Line reduce={reduce} delay={0.11}>
                  {t.titleMid} <span className="nh-ct-h1__accent">{t.titleAccent}</span>
                </Line>
              </h1>
            </div>

            <div className="nh-ct-hero__side">
              <motion.p className="nh-ct-hero__sub" {...appear(0.4)}>
                {t.intro}
              </motion.p>
              <motion.ul className="nh-ct-status" {...appear(0.5)}>
                {site.availability && (
                  <li className="nh-ct-status__pill">
                    <span className="nh-ct-status__dot" aria-hidden="true" />
                    {site.availability}
                  </li>
                )}
                <li className="nh-ct-status__time">
                  <LiveClock seconds={false} />
                  <span className="nh-ct-status__gmt">{t.gmt}</span>
                </li>
              </motion.ul>
            </div>
          </div>

          <motion.div {...appear(0.6)}>
            <QuickActions onWrite={onWrite} />
          </motion.div>

          <a
            className="nh-ct-cue"
            href={`#${t.form.id}`}
            onClick={(event) => {
              event.preventDefault();
              onWrite();
            }}
          >
            <span className="visually-hidden">{t.scrollLabel}</span>
            <span className="nh-ct-cue__mouse" aria-hidden="true">
              <i />
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
