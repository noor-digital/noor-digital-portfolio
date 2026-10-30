import { motion } from 'motion/react';
import { EASE } from '../../../lib/motion.js';
import Character from './Character.jsx';
import {
  CHARACTER_AT,
  FRAMES,
  GROUND,
  MOON,
  ORB,
  SCALE,
  SKY_FAR,
  SKY_MID,
  dust,
  focusLines,
  vanishingLines,
} from './world.js';

// Calques de la scène du Hero. Tous partagent le même cadre (viewBox + preserveAspectRatio) :
// ils restent donc parfaitement alignés, et chacun peut bouger à sa propre profondeur.

const VANISH = vanishingLines(3);
const FOCUS = focusLines(11);
const DUST = dust(5);

function Layer({ frame, children, className = '', ...rest }) {
  const { viewBox, par } = FRAMES[frame];
  return (
    <svg
      className={`sc-layer ${className}`}
      viewBox={viewBox}
      preserveAspectRatio={par}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

// Ciel : étoiles discrètes + trame de points (screentone) qui matérialise la lueur de l’horizon.
// Trois bandes, trois tailles de points : la trame grossit vers le bas, comme à l’encre.
export function SkyLayer({ frame }) {
  const stars = [
    [120, 90], [310, 40], [520, 150], [760, 60], [900, 120], [1180, 34], [1500, 110], [210, 230],
    [640, 260], [1420, 220], [40, 380], [1560, 360], [980, 20], [430, 330],
  ];
  return (
    <Layer frame={frame}>
      <defs>
        {[
          ['tone-a', 1.1, 9],
          ['tone-b', 1.7, 9],
          ['tone-c', 2.5, 9],
        ].map(([id, r, size]) => (
          <pattern key={id} id={id} width={size} height={size} patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <circle cx={size / 2} cy={size / 2} r={r} fill="#16B8B0" />
          </pattern>
        ))}
        <linearGradient id="tone-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.55" />
        </linearGradient>
        <mask id="tone-mask">
          <rect x="-600" y="480" width="2800" height="420" fill="url(#tone-fade)" />
        </mask>
      </defs>
      {stars.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="2.5" height="2.5" fill="#D7E0EA" opacity="0.55" transform={`rotate(45 ${x} ${y})`} />
      ))}
      <g mask="url(#tone-mask)">
        <rect x="-600" y="520" width="2800" height="110" fill="url(#tone-a)" />
        <rect x="-600" y="630" width="2800" height="110" fill="url(#tone-b)" />
        <rect x="-600" y="740" width="2800" height="160" fill="url(#tone-c)" />
      </g>
    </Layer>
  );
}

// La lune : disque net, trame de points sur le croissant d’ombre, deux anneaux fins.
export function MoonLayer({ frame }) {
  const { x, y, r } = MOON;
  return (
    <Layer frame={frame}>
      <defs>
        <pattern id="moon-dots" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <circle cx="4.5" cy="4.5" r="2" fill="#7C93B6" />
        </pattern>
        <mask id="moon-shade">
          <rect x={x - r} y={y - r} width={r * 2} height={r * 2} fill="#fff" />
          <circle cx={x - 62} cy={y - 54} r={r} fill="#000" />
        </mask>
        <clipPath id="moon-clip">
          <circle cx={x} cy={y} r={r} />
        </clipPath>
      </defs>
      <circle cx={x} cy={y} r={r + 44} fill="none" stroke="#D7E0EA" strokeOpacity="0.28" strokeWidth="1.5" />
      <circle cx={x} cy={y} r={r + 110} fill="none" stroke="#2563EB" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="2 10" />
      <circle cx={x} cy={y} r={r} fill="#D7E0EA" />
      <g clipPath="url(#moon-clip)">
        <rect x={x - r} y={y - r} width={r * 2} height={r * 2} fill="url(#moon-dots)" mask="url(#moon-shade)" />
      </g>
    </Layer>
  );
}

function Windows({ list, scale = 1 }) {
  return list.map((w, i) => (
    <rect
      key={`${w.x}-${w.y}`}
      className={i % 5 === 0 ? 'sc-window sc-window--blink' : 'sc-window'}
      x={w.x}
      y={w.y}
      width={5 * scale}
      height={7 * scale}
      fill={w.warm ? '#D7E0EA' : '#16B8B0'}
      opacity={w.warm ? 0.5 : 0.7}
      style={i % 5 === 0 ? { animationDelay: `${(i % 7) * -1.3}s` } : undefined}
    />
  ));
}

export function SkylineFarLayer({ frame }) {
  return (
    <Layer frame={frame}>
      <path d={SKY_FAR.d} fill="#12294D" stroke="#12294D" strokeWidth="2" />
    </Layer>
  );
}

export function SkylineMidLayer({ frame }) {
  return (
    <Layer frame={frame}>
      <path d={SKY_MID.d} fill="#0B1B36" stroke="#0B1B36" strokeWidth="2" />
      <Windows list={SKY_MID.windows} />
    </Layer>
  );
}

// Lignes de fuite, traits de concentration et réticule : la « lumière qui structure ».
// La lumière est le point de fuite : toutes les lignes en partent.
export function FocusLayer({ frame, intro }) {
  return (
    <Layer frame={frame}>
      <g stroke="#6EA0FF" strokeWidth="1">
        {VANISH.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} strokeOpacity={l.o} />
        ))}
      </g>

      {/* Traits de concentration : un éclair à l’allumage, puis un souffle discret. */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: `${ORB.x}px ${ORB.y}px` }}
        initial={intro ? { scale: 0.55, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: 1.05, ease: EASE }}
      >
        <g fill="#F1F5F9" className="sc-focus">
          {FOCUS.map((l, i) => (
            <polygon key={i} points={l.points} opacity={l.o} />
          ))}
        </g>
      </motion.g>

      {/* Réticule : il se dessine autour de la lumière une fois qu’elle est allumée. */}
      <g fill="none" stroke="#16B8B0" strokeWidth="1.6">
        <motion.circle
          cx={ORB.x}
          cy={ORB.y}
          r="74"
          strokeOpacity="0.9"
          initial={intro ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: EASE }}
        />
        <motion.path
          d={`M${ORB.x - 110} ${ORB.y} H${ORB.x - 90} M${ORB.x + 90} ${ORB.y} H${ORB.x + 110} M${ORB.x} ${ORB.y - 110} V${ORB.y - 90} M${ORB.x} ${ORB.y + 90} V${ORB.y + 110}`}
          initial={intro ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 1.9, ease: EASE }}
        />
      </g>
    </Layer>
  );
}

// Scène : le toit, la rambarde, le mât, et le personnage posé dessus.
export function StageLayer({ frame }) {
  const { x, y } = CHARACTER_AT;
  return (
    <Layer frame={frame} className="sc-stage">
      {/* Mât radio : seul point qui clignote, en turquoise. */}
      <g>
        <path d={`M1548 ${GROUND} V470`} stroke="#050B16" strokeWidth="6" />
        <path d={`M1522 640 H1574 M1530 560 H1566`} stroke="#050B16" strokeWidth="4" />
        <rect className="sc-beacon" x="1544" y="462" width="8" height="8" fill="#16B8B0" />
      </g>

      {/* Toit : acrotère, tranche éclairée par le haut */}
      <path d={`M840 ${GROUND} H1700 V1000 H840 Z`} fill="#050B16" />
      <path d={`M840 ${GROUND} H1700`} stroke="#D7E0EA" strokeOpacity="0.4" strokeWidth="2" />

      {/* Rambarde : poteaux et lisse haute */}
      <g stroke="#050B16" strokeWidth="5" strokeLinecap="square">
        <path d={`M872 ${GROUND} V772 M938 ${GROUND} V772 M1004 ${GROUND} V772`} />
        <path d="M866 772 H1010 M866 818 H1010" strokeWidth="4" />
      </g>
      <path d="M866 770 H1010" stroke="#16B8B0" strokeOpacity="0.8" strokeWidth="1.5" />

      <g transform={`translate(${x} ${y}) scale(${SCALE})`}>
        <Character orb x="0" y="0" width="600" height="720" viewBox="0 0 600 720" overflow="visible" />
      </g>
    </Layer>
  );
}

// Premier plan : câbles tendus et angle d’immeuble. Ils bougent plus vite que tout le reste.
export function NearLayer({ frame }) {
  return (
    <Layer frame={frame}>
      <path d="M-200 900 V792 H80 L112 770 H300 V900 Z" fill="#040912" />
      <path d="M180 770 V690 M170 724 H190" stroke="#040912" strokeWidth="4" />
    </Layer>
  );
}

// Poussière lumineuse : éclats montants, uniquement transform + opacity (animations CSS).
export function DustLayer({ frame }) {
  return (
    <Layer frame={frame}>
      {DUST.map((p, i) => (
        <rect
          key={i}
          className="sc-dust"
          x={p.x}
          y={p.y}
          width={p.s}
          height={p.s}
          fill={p.tone === 'turq' ? '#16B8B0' : '#F1F5F9'}
          style={{
            '--rise': `${p.rise}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </Layer>
  );
}
