import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { servicesPage } from '../../data/site.js';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import Cta from '../home/Cta.jsx';
import Magnetic from './Magnetic.jsx';
import QuickNav from './QuickNav.jsx';
import HeroScene from './HeroScene.jsx';
import TechMarquee from './TechMarquee.jsx';
import StatsStrip from './StatsStrip.jsx';
import ServicesIcon from './ServicesIcons.jsx';

// Particules : positions fixes (aucun hasard au rendu), dérive lente en CSS (transform + opacity).
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
  size: 2 + (i % 3),
  dur: 16 + (i % 5) * 4,
  delay: -(i * 2.3),
}));

const HIDDEN = { y: '108%', skewX: -9 };
const SHOWN = { y: '0%', skewX: 0 };

// Mot qui alterne : même geste que TitleReveal (masque + inclinaison). Les mots sont tous rendus,
// invisibles, dans la même cellule de grille : la largeur est celle du plus long, donc aucun décalage.
function RotatingWord({ words, reduce }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const timer = setInterval(() => setIndex((n) => (n + 1) % words.length), 2800);
    return () => clearInterval(timer);
  }, [reduce, words.length]);

  return (
    <span className="nh-sv-rot nh-title__mask">
      {words.map((word) => (
        <span className="nh-sv-rot__size" key={word}>
          {word}
        </span>
      ))}
      {reduce ? (
        <span className="nh-sv-rot__word">{words[0]}</span>
      ) : (
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            className="nh-sv-rot__word"
            initial={HIDDEN}
            animate={{ ...SHOWN, transition: { duration: 0.5, delay: index === 0 ? 0.25 : 0, ease: EASE } }}
            exit={{ y: '-108%', skewX: 9, transition: { duration: 0.4, ease: EASE } }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
}

// Hero plein écran : accroche orientée bénéfice, fond vivant, scène en trois profondeurs, technologies,
// chiffres réels. Au défilement, l’ensemble se dézoome et se fond dans la section suivante.
export default function ServicesHero({ active, onGo }) {
  const { hero } = servicesPage;
  const reduce = useReducedMotion();
  const pointerFine = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 900px)');
  const parallax = pointerFine && !reduce;
  // Sortie en fondu : grands écrans seulement (sur mobile, le hero dépasse l’écran et doit rester lisible en défilant).
  const wide = useMediaQuery('(min-width: 960px)');
  const exits = wide && !reduce;

  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.7 });
  const smy = useSpring(my, { stiffness: 50, damping: 20, mass: 0.7 });
  const glowX = useTransform(smx, [-0.5, 0.5], [-160, 160]);
  const glowY = useTransform(smy, [-0.5, 0.5], [-110, 110]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -48]);

  function onPointerMove(event) {
    if (!parallax) return;
    const box = ref.current.getBoundingClientRect();
    mx.set((event.clientX - box.left) / box.width - 0.5);
    my.set((event.clientY - box.top) / box.height - 0.5);
  }

  const goServices = (event) => {
    event.preventDefault();
    onGo('services');
  };

  return (
    <section id="sv-hero" className="nh-sv-hero" ref={ref} aria-label="Introduction" onPointerMove={onPointerMove}>
      <div className="nh-sv-hero__bg" aria-hidden="true">
        <motion.div className="nh-sv-hero__glow" style={parallax ? { x: glowX, y: glowY } : undefined} />
        <div className="nh-sv-hero__grid" />
        <div className="nh-sv-hero__beams">
          <i />
          <i />
          <i />
        </div>
        {PARTICLES.map((p, i) => (
          <span
            className="nh-sv-hero__dot"
            key={i}
            style={{ left: `${p.left}%`, top: `${p.top}%`, '--s': `${p.size}px`, '--dur': `${p.dur}s`, '--del': `${p.delay}s` }}
          />
        ))}
        <div className="nh-sv-hero__grain" />
        <div className="nh-sv-hero__fade" />
      </div>

      <motion.div
        className="nh-sv-hero__inner"
        style={exits ? { scale, opacity: fade, y: lift } : undefined}
      >
        <div className="container nh-sv-hero__grid2">
          <div className="nh-sv-hero__copy">
            <motion.p
              className="nh-sv-hero__kicker"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="nh-ab-slash" aria-hidden="true" />
              {hero.kicker}
            </motion.p>

            <h1 className="nh-title nh-sv-h1">
              <span className="visually-hidden">
                {hero.lead} {hero.words.join(', ')}
              </span>
              <span aria-hidden="true" className="nh-sv-h1__vis">
                <span className="nh-title__mask">
                  <motion.span
                    className="nh-title__line"
                    initial={reduce ? false : HIDDEN}
                    animate={{ ...SHOWN, transition: { duration: 0.85, delay: 0.1, ease: EASE } }}
                  >
                    {hero.lead}
                  </motion.span>
                </span>
                <span className="nh-sv-h1__word">
                  <RotatingWord words={hero.words} reduce={reduce} />
                </span>
              </span>
            </h1>

            <motion.p
              className="nh-sv-hero__sub"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            >
              {hero.sub}
            </motion.p>

            <motion.div
              className="nh-sv-hero__actions"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            >
              <Magnetic>
                <Cta to="/contact">
                  {hero.primary}
                  <ServicesIcon name="arrow" className="nh-sv-arr" size={18} />
                </Cta>
              </Magnetic>
              <Cta href="#services" variant="ghost" onClick={goServices}>
                {hero.secondary}
              </Cta>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <QuickNav active={active} onGo={onGo} label={hero.quickNavLabel} />
            </motion.div>
          </div>

          <motion.div
            className="nh-sv-hero__art"
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
          >
            <HeroScene mx={smx} my={smy} parallax={parallax} />
          </motion.div>
        </div>

        <a className="nh-sv-cue" href="#services" onClick={goServices}>
          <span className="visually-hidden">{hero.scrollLabel}</span>
          <span className="nh-sv-cue__mouse" aria-hidden="true">
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
