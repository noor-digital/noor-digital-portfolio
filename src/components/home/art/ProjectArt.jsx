import { rng } from '../../../lib/prng.js';

// Illustrations des projets. Chaque projet reçoit un motif qui évoque ce qu’il fait (page vitrine,
// liste de tâches, file d’attente vocale, dépenses, météo, boutique). Ce sont des illustrations
// originales, jamais des captures d’écran : elles sont remplacées par la vraie capture dès que
// le champ `image` d’un projet est renseigné.
//
// Chaque motif a deux plans (`back` et `front`) : au survol, ils se décalent en sens inverse.

const INK = '#F1F5F9';
const TURQ = '#16B8B0';
const BLUE = '#2563EB';

const f = (n) => Math.round(n * 10) / 10;

function Speed({ seed, cx, cy }) {
  const rand = rng(seed);
  return (
    <g fill={INK}>
      {Array.from({ length: 22 }, (_, i) => {
        const a = (i / 22) * Math.PI * 2 + (rand() - 0.5) * 0.14;
        const r0 = 150 + rand() * 90;
        const r1 = 520;
        const h = 0.006 + rand() * 0.012;
        const p = (r, d) => `${f(cx + Math.cos(a + d) * r)},${f(cy + Math.sin(a + d) * r)}`;
        return <polygon key={i} points={`${p(r0, 0)} ${p(r1, -h)} ${p(r1, h)}`} opacity={0.06 + rand() * 0.1} />;
      })}
    </g>
  );
}

const MOTIFS = {
  'sabaly-consulting': () => (
    <>
      <g className="art-back">
        <Speed seed={1} cx={300} cy={190} />
        <rect x="90" y="60" width="420" height="270" fill="#0B1628" stroke={INK} strokeWidth="3" />
        <path d="M90 100H510" stroke={INK} strokeWidth="2" />
        <path d="M110 80H150M420 80H440M456 80H476M492 80H500" stroke={TURQ} strokeWidth="4" />
      </g>
      <g className="art-front">
        <rect x="116" y="124" width="190" height="96" fill={BLUE} fillOpacity="0.45" />
        <path d="M116 220L306 124" stroke={INK} strokeWidth="2" />
        <path d="M330 134H480M330 158H450M330 182H470" stroke={INK} strokeWidth="6" />
        <rect x="330" y="204" width="84" height="18" fill={TURQ} />
        <rect x="116" y="244" width="116" height="60" fill={INK} fillOpacity="0.12" />
        <rect x="244" y="244" width="116" height="60" fill={INK} fillOpacity="0.12" />
        <rect x="372" y="244" width="116" height="60" fill={INK} fillOpacity="0.12" />
        <path d="M430 290l20-16 20 16M430 290h40v22h-40Z" stroke={INK} strokeWidth="2.5" fill="#0B1628" />
      </g>
    </>
  ),
  'todo-list': () => (
    <>
      <g className="art-back">
        <Speed seed={2} cx={150} cy={200} />
        <rect x="140" y="50" width="320" height="300" fill="#0B1628" stroke={INK} strokeWidth="3" />
      </g>
      <g className="art-front">
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="170" y={84 + i * 62} width="34" height="34" fill={i < 2 ? TURQ : 'none'} stroke={i < 2 ? TURQ : INK} strokeWidth="3" />
            {i < 2 && <path d={`M178 ${102 + i * 62}l8 9 14-18`} stroke="#050B16" strokeWidth="4.5" fill="none" />}
            <path d={`M226 ${101 + i * 62}H${430 - i * 36}`} stroke={INK} strokeWidth="6" opacity={i < 2 ? 0.45 : 1} />
            {i < 2 && <path d={`M218 ${101 + i * 62}H${440 - i * 36}`} stroke={TURQ} strokeWidth="3" />}
          </g>
        ))}
      </g>
    </>
  ),
  'vocal-queue-system': () => (
    <>
      <g className="art-back">
        <Speed seed={3} cx={300} cy={200} />
        {[70, 110, 150, 190].map((r, i) => (
          <path key={r} d={`M${300 + r * 0.5} ${200 - r * 0.86}A${r} ${r} 0 0 1 ${300 + r * 0.5} ${200 + r * 0.86}`} stroke={TURQ} strokeWidth={4 - i * 0.6} fill="none" opacity={1 - i * 0.18} />
        ))}
      </g>
      <g className="art-front">
        <text x="270" y="290" textAnchor="middle" fontFamily="var(--nh-display)" fontWeight="900" fontStyle="italic" fontSize="290" fill="none" stroke={INK} strokeWidth="4" style={{ fontStretch: '62%' }}>
          7
        </text>
        <path d="M70 330H330" stroke={BLUE} strokeWidth="10" />
        <path d="M90 90h110v50h-80l-20 20Z" fill={INK} />
        <path d="M110 108H180M110 124H160" stroke="#0B1628" strokeWidth="5" />
      </g>
    </>
  ),
  'expense-tracker': () => (
    <>
      <g className="art-back">
        <Speed seed={4} cx={470} cy={120} />
        <path d="M70 330H530M70 60V330" stroke={INK} strokeWidth="3" />
        {[110, 170, 230, 290].map((y) => (
          <path key={y} d={`M70 ${y}H530`} stroke={INK} strokeWidth="1" opacity="0.18" />
        ))}
      </g>
      <g className="art-front">
        {[
          [110, 120],
          [180, 180],
          [250, 100],
          [320, 220],
          [390, 160],
        ].map(([x, h], i) => (
          <rect key={x} x={x} y={330 - h} width="46" height={h} fill={i === 2 ? TURQ : BLUE} fillOpacity={i === 2 ? 1 : 0.7} />
        ))}
        <path d="M100 250L200 190L270 120L340 170L420 90" stroke={INK} strokeWidth="4" fill="none" />
        <circle cx="470" cy="110" r="42" fill="#0B1628" stroke={INK} strokeWidth="4" />
        <path d="M470 90v40M458 100h20a8 8 0 0 1 0 14h-18" stroke={TURQ} strokeWidth="4" fill="none" />
      </g>
    </>
  ),
  'aeris-meteo': () => (
    <>
      <g className="art-back">
        <Speed seed={5} cx={380} cy={130} />
        <circle cx="380" cy="130" r="86" fill="#D7E0EA" />
        <circle cx="380" cy="130" r="118" fill="none" stroke={INK} strokeWidth="2" opacity="0.4" />
        <circle cx="380" cy="130" r="150" fill="none" stroke={BLUE} strokeWidth="2" strokeDasharray="2 10" />
      </g>
      <g className="art-front">
        <path d="M120 270a46 46 0 0 1 20-84a64 64 0 0 1 120-10a54 54 0 0 1 24 94Z" fill="#0B1628" stroke={INK} strokeWidth="4" />
        <path d="M150 232H290M170 252H270" stroke={TURQ} strokeWidth="4" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${100 + i * 70} 330v-16M${100 + i * 70} 330h0`} stroke={INK} strokeWidth="3" />
        ))}
        <path d="M80 330H520" stroke={INK} strokeWidth="2" opacity="0.5" />
      </g>
    </>
  ),
  'nova-shop': () => (
    <>
      <g className="art-back">
        <Speed seed={6} cx={300} cy={220} />
        <rect x="80" y="60" width="440" height="280" fill="#0B1628" stroke={INK} strokeWidth="3" />
        {[0, 1, 2].map((c) => (
          <g key={c}>
            <rect x={104 + c * 140} y="84" width="120" height="86" fill={c === 1 ? TURQ : BLUE} fillOpacity={c === 1 ? 0.9 : 0.4} />
            <path d={`M${104 + c * 140} 190H${224 + c * 140 - 30}M${104 + c * 140} 210H${224 + c * 140 - 60}`} stroke={INK} strokeWidth="5" />
          </g>
        ))}
      </g>
      <g className="art-front">
        <path d="M410 214h92l-8 110H418Z" fill={INK} />
        <path d="M434 238v-18a22 22 0 0 1 44 0v18" stroke="#0B1628" strokeWidth="6" fill="none" />
        <path d="M428 300h60" stroke="#0B1628" strokeWidth="5" />
        <path d="M104 250h130l20 22-20 22H104Z" fill={TURQ} />
        <circle cx="122" cy="272" r="5" fill="#050B16" />
      </g>
    </>
  ),
};

function Fallback({ name }) {
  return (
    <>
      <g className="art-back">
        <Speed seed={9} cx={300} cy={200} />
      </g>
      <g className="art-front">
        <text x="300" y="290" textAnchor="middle" fontFamily="var(--nh-display)" fontWeight="900" fontStyle="italic" fontSize="280" fill="none" stroke={INK} strokeWidth="4" style={{ fontStretch: '62%' }}>
          {name.charAt(0)}
        </text>
      </g>
    </>
  );
}

const BACKGROUNDS = ['#132B4F', '#0F2140', '#17335E'];

export default function ProjectArt({ slug, name, index = 0 }) {
  const Motif = MOTIFS[slug];
  return (
    <svg className="nh-art" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="600" height="400" fill={BACKGROUNDS[index % BACKGROUNDS.length]} />
      {Motif ? <Motif /> : <Fallback name={name} />}
    </svg>
  );
}
