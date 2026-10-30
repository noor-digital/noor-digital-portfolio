import { useEffect, useLayoutEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { FRAMES, ORB } from './art/world.js';
import {
  DustLayer,
  FocusLayer,
  MoonLayer,
  NearLayer,
  SkyLayer,
  SkylineFarLayer,
  SkylineMidLayer,
  StageLayer,
} from './art/SceneLayers.jsx';

// Profondeur de chaque calque : 0 = ciel immobile, 1 = plan du personnage, > 1 = premier plan.
// Le déplacement maximal (à 1) est de 18 px en x et 10 px en y.
const DEPTH = { sky: 0.15, moon: 0.3, far: 0.45, mid: 0.75, focus: 1, stage: 1, dust: 1.35, near: 1.9 };
const SHIFT_X = 18;
const SHIFT_Y = 10;

// Un calque = une profondeur (parallaxe pointeur) + une entrée (cinéma de chargement).
// Deux éléments imbriqués pour que l’entrée (y, scale, clip) ne se mélange pas avec la parallaxe.
function DepthLayer({ depth, sx, sy, intro, from, delay = 0, duration = 1.2, style, introClass = '', children }) {
  const x = useTransform(sx, (v) => v * SHIFT_X * depth);
  const y = useTransform(sy, (v) => v * SHIFT_Y * depth);
  const target = { opacity: 1, y: 0, scale: 1 };
  if (from?.clipPath) target.clipPath = 'inset(0% 0% 0% 0%)';
  return (
    <motion.div className="sc-depth" style={{ x, y }}>
      <motion.div
        className={`sc-intro ${introClass}`}
        style={style}
        initial={intro ? from : false}
        animate={target}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Scène du Hero. Elle reçoit :
//  - frame    : 'wide' | 'tall' (cadrage selon l’orientation de l’écran) ;
//  - intro    : joue l’entrée cinématique (faux avec « mouvement réduit ») ;
//  - parallax : active la réaction au pointeur ;
//  - progress : valeur de défilement du Hero (0 → 1), pour le changement de cadrage à la sortie.
export default function HeroScene({ frame, intro, parallax, progress, hostRef }) {
  const sceneRef = useRef(null);

  // Pointeur normalisé (-1 → 1) puis adouci par un ressort.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 20, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 70, damping: 20, mass: 0.7 });

  // Intensité du liseré turquoise : plus le pointeur est proche de la lumière, plus il s’allume.
  const near = useMotionValue(0);
  const rimSpring = useSpring(near, { stiffness: 90, damping: 24 });
  const rim = useTransform(rimSpring, (v) => 0.55 + v * 0.45);

  // Position de la lumière à l’écran, recalculée au redimensionnement : sert d’origine au zoom
  // de sortie et à la mesure de proximité du pointeur.
  const orbPx = useRef({ x: 0, y: 0, w: 1 });
  useLayoutEffect(() => {
    const el = sceneRef.current;
    if (!el) return undefined;
    const measure = () => {
      const { width: W, height: H } = el.getBoundingClientRect();
      const [vx, vy, vw, vh] = FRAMES[frame].viewBox.split(' ').map(Number);
      const k = Math.max(W / vw, H / vh);
      const px = (W - vw * k) / 2 + (ORB.x - vx) * k;
      const py = H - vh * k + (ORB.y - vy) * k; // alignement bas (YMax)
      orbPx.current = { x: px, y: py, w: W };
      el.style.setProperty('--orb-x', `${px}px`);
      el.style.setProperty('--orb-y', `${py}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [frame]);

  useEffect(() => {
    const host = hostRef?.current;
    if (!host || !parallax) return undefined;
    const onMove = (event) => {
      const r = host.getBoundingClientRect();
      const nx = ((event.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((event.clientY - r.top) / r.height) * 2 - 1;
      mx.set(Math.max(-1, Math.min(1, nx)));
      my.set(Math.max(-1, Math.min(1, ny)));
      const o = orbPx.current;
      const d = Math.hypot(event.clientX - r.left - o.x, event.clientY - r.top - o.y);
      near.set(Math.max(0, 1 - d / (o.w * 0.4)));
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
      near.set(0);
    };
    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [hostRef, parallax, mx, my, near]);

  // Sortie au défilement : léger zoom vers la lumière, le toit descend un peu plus vite.
  const zoom = useTransform(progress, [0, 1], [1, 1.28]);
  const drop = useTransform(progress, [0, 1], ['0%', '5%']);
  const veil = useTransform(progress, [0.35, 1], [0, 0.92]);

  const layer = { sx, sy, intro };

  return (
    <div className="scene" ref={sceneRef} aria-hidden="true">
      <motion.div className="scene__zoom" style={{ scale: zoom, y: drop }}>
        <DepthLayer {...layer} depth={DEPTH.sky} from={{ opacity: 0 }} duration={1.4}>
          <SkyLayer frame={frame} />
        </DepthLayer>
        <DepthLayer {...layer} depth={DEPTH.moon} from={{ opacity: 0, scale: 0.9 }} delay={0.25} duration={1.6}>
          <MoonLayer frame={frame} />
        </DepthLayer>
        <DepthLayer {...layer} depth={DEPTH.far} from={{ opacity: 0, y: 70 }} delay={0.4} duration={1.4}>
          <SkylineFarLayer frame={frame} />
        </DepthLayer>
        <DepthLayer {...layer} depth={DEPTH.mid} from={{ opacity: 0, y: 90 }} delay={0.5} duration={1.4}>
          <SkylineMidLayer frame={frame} />
        </DepthLayer>
        <DepthLayer {...layer} depth={DEPTH.focus} from={{ opacity: 0 }} delay={0.9} duration={0.8}>
          <FocusLayer frame={frame} intro={intro} />
        </DepthLayer>
        <DepthLayer
          {...layer}
          depth={DEPTH.stage}
          from={{ opacity: 0, y: 60, scale: 1.04, clipPath: 'inset(100% 0% 0% 0%)' }}
          delay={0.65}
          duration={1.5}
          introClass="sc-intro--stage"
          style={{ '--rim': rim }}
        >
          <StageLayer frame={frame} />
        </DepthLayer>
        <DepthLayer {...layer} depth={DEPTH.dust} from={{ opacity: 0 }} delay={1.6} duration={1.2}>
          <DustLayer frame={frame} />
        </DepthLayer>
        <DepthLayer {...layer} depth={DEPTH.near} from={{ opacity: 0, y: 40 }} delay={0.8} duration={1.2}>
          <NearLayer frame={frame} />
        </DepthLayer>
      </motion.div>

      {/* Voile : la scène s’enfonce dans le bleu nuit quand on quitte le Hero. */}
      <motion.div className="scene__veil" style={{ opacity: veil }} />
    </div>
  );
}
