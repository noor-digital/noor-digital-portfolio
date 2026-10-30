import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../../lib/motion.js';

// Une scène dessinée au trait par service. Les traits se dessinent à l’arrivée (une seule fois par
// sélection) : l’animation montre ce que le service construit, elle ne décore pas.

const INK = '#F1F5F9';
const TURQ = '#16B8B0';
const BLUE = '#2563EB';

function Draw({ d, delay = 0, color = INK, w = 2.4, fill = 'none', dash }) {
  const reduce = useReducedMotion();
  return (
    <motion.path
      d={d}
      fill={fill}
      stroke={color}
      strokeWidth={w}
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeDasharray={dash}
      initial={reduce ? false : { pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    />
  );
}

function Pop({ delay = 0, children }) {
  const reduce = useReducedMotion();
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.g>
  );
}

const Label = ({ x, y, children, anchor = 'middle' }) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily="var(--nh-text)" fontWeight="700" fontSize="17" fill={INK}>
    {children}
  </text>
);

function SitesWeb() {
  return (
    <>
      <Pop delay={0.2}>
        <rect x="408" y="100" width="148" height="120" fill={BLUE} fillOpacity="0.3" />
        <rect x="104" y="184" width="76" height="22" fill={TURQ} />
        <rect x="84" y="244" width="140" height="106" fill={INK} fillOpacity="0.07" />
        <rect x="244" y="244" width="140" height="106" fill={INK} fillOpacity="0.07" />
        <rect x="404" y="244" width="152" height="106" fill={INK} fillOpacity="0.07" />
      </Pop>
      <Draw d="M60 40H580V380H60Z" />
      <Draw d="M60 76H580" delay={0.15} />
      <Draw d="M400 58H440M460 58H500M520 58H556" delay={0.3} color={TURQ} />
      <Draw d="M84 100H384V220H84Z" delay={0.3} />
      <Draw d="M104 132H300M104 156H250" delay={0.5} w={5} />
      <Draw d="M408 100H556V220H408ZM408 220L556 100" delay={0.5} />
      <Draw d="M84 244H224V350H84ZM244 244H384V350H244ZM404 244H556V350H404Z" delay={0.7} />
      <Draw d="M104 276H200M104 300H170M264 276H360M264 300H330M424 276H536M424 300H500" delay={0.9} w={2} />
      <Pop delay={1.1}>
        <path d="M470 292l0 40 11-10 8 18 8-4-8-18 15 0Z" fill={INK} stroke="#0B1628" strokeWidth="2" />
        {[84, 102, 120].map((x) => (
          <circle key={x} cx={x} cy="58" r="4.5" fill={INK} />
        ))}
      </Pop>
    </>
  );
}

function Integration() {
  return (
    <>
      <Pop delay={0.1}>
        <path d="M40 360H600" stroke={INK} strokeOpacity="0.35" strokeWidth="2" />
      </Pop>
      <Draw d="M70 360V222Q70 210 82 210H148Q160 210 160 222V360" />
      <Draw d="M70 336H160" delay={0.2} w={1.6} />
      <Draw d="M96 236H134M96 262H134M96 288H134" delay={0.5} w={4} color={TURQ} />
      <Draw d="M210 360V160Q210 150 220 150H360Q370 150 370 160V360" delay={0.2} />
      <Draw d="M228 180H352M228 210H284M298 210H352M228 240H284M298 240H352" delay={0.6} w={3} />
      <Draw d="M400 360V130Q400 120 410 120H590Q600 120 600 130V360" delay={0.4} />
      <Draw d="M420 148H580M420 180H480M495 180H555M570 180H580M420 220H478M492 220H530M544 220H580" delay={0.8} w={3} />
      <Pop delay={1}>
        <rect x="420" y="250" width="160" height="70" fill={BLUE} fillOpacity="0.3" />
        <rect x="228" y="270" width="124" height="50" fill={BLUE} fillOpacity="0.3" />
        <rect x="96" y="312" width="38" height="12" fill={TURQ} />
        <Label x="115" y="392">Mobile</Label>
        <Label x="290" y="392">Tablette</Label>
        <Label x="500" y="392">Ordinateur</Label>
      </Pop>
    </>
  );
}

function Fonctionnalites() {
  return (
    <>
      <Pop delay={0.1}>
        <rect x="50" y="150" width="150" height="110" fill={INK} fillOpacity="0.07" />
        <rect x="250" y="150" width="150" height="110" fill={BLUE} fillOpacity="0.3" />
        <ellipse cx="520" cy="178" rx="70" ry="22" fill={TURQ} fillOpacity="0.25" />
      </Pop>
      <Draw d="M50 150H200V260H50Z" />
      <Draw d="M70 190H180M70 220H150" delay={0.3} w={4} color={TURQ} />
      <Draw d="M250 150H400V260H250Z" delay={0.2} />
      <Draw d="M450 178V262C450 276 481 286 520 286C559 286 590 276 590 262V178M450 178C450 164 481 156 520 156C559 156 590 164 590 178C590 192 559 200 520 200C481 200 450 192 450 178ZM450 220C450 234 481 242 520 242C559 242 590 234 590 220" delay={0.4} />
      <Draw d="M204 205H246M236 195L248 205L236 215" delay={0.8} color={TURQ} w={3} />
      <Draw d="M404 205H446M436 195L448 205L436 215" delay={1} color={TURQ} w={3} />
      <Pop delay={1.1}>
        <Label x="125" y="292">Formulaire</Label>
        <Label x="325" y="292">PHP et Laravel</Label>
        <Label x="520" y="320">MySQL</Label>
        <rect x="300" y="190" width="50" height="14" fill={INK} />
        <rect x="300" y="214" width="50" height="14" fill={INK} fillOpacity="0.5" />
      </Pop>
      <Draw d="M60 110H580" delay={0.1} w={1.4} dash="4 10" color={INK} />
    </>
  );
}

function Entreprises() {
  const windows = [];
  for (let r = 0; r < 4; r += 1)
    for (let c = 0; c < 3; c += 1) windows.push([84 + c * 58, 120 + r * 52, (r * 3 + c) % 4 === 1]);
  return (
    <>
      <Pop delay={0.1}>
        {windows.map(([x, y, lit]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="38" height="32" fill={lit ? TURQ : INK} fillOpacity={lit ? 0.85 : 0.08} />
        ))}
        <rect x="104" y="318" width="60" height="42" fill={INK} fillOpacity="0.14" />
      </Pop>
      <Draw d="M60 360V90H240V360ZM40 360H260M60 90L150 54L240 90" />
      <Draw d="M76 296H224" delay={0.4} w={1.6} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Draw d={`M330 ${120 + i * 80}a20 20 0 1 0 40 0a20 20 0 1 0-40 0`} delay={0.4 + i * 0.25} color={i === 0 ? TURQ : INK} />
          <Draw d={`M400 ${128 + i * 80}H${560 - i * 40}M400 ${152 + i * 80}H${500 - i * 50}`} delay={0.6 + i * 0.25} w={4} />
        </g>
      ))}
      <Pop delay={1.2}>
        {[0, 1, 2].map((i) => (
          <text key={i} x="350" y={147 + i * 80} textAnchor="middle" fontFamily="var(--nh-display)" fontWeight="800" fontSize="22" fill={i === 0 ? TURQ : INK}>
            {i + 1}
          </text>
        ))}
      </Pop>
    </>
  );
}

const SCENES = {
  'sites-web': SitesWeb,
  integration: Integration,
  fonctionnalites: Fonctionnalites,
  entreprises: Entreprises,
};

export default function ServiceArt({ id }) {
  const Scene = SCENES[id] ?? SitesWeb;
  return (
    <svg className="nh-art" viewBox="0 0 640 420" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <Scene />
    </svg>
  );
}
