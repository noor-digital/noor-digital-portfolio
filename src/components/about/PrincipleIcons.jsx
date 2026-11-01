// Quatre icônes qui illustrent vraiment chaque principe et s’animent au survol de la carte (CSS, transform et
// opacity seulement, voir about.css) :
//  clarté → le rayon se précise ; structure → la grille s’assemble ; précision → le réticule se cale ; lumière → l’étoile s’allume.
const common = { viewBox: '0 0 48 48', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' };

function Clarity() {
  return (
    <svg {...common} className="nh-ab-pico nh-ab-pico--clarity">
      <circle className="p-halo p-halo--b" cx="24" cy="24" r="20" />
      <circle className="p-halo" cx="24" cy="24" r="14" />
      <circle cx="24" cy="24" r="6" />
      <path className="p-ray" d="M24 2v6M24 40v6M2 24h6M40 24h6" />
    </svg>
  );
}
function Structure() {
  const cells = [
    [6, 6],
    [20, 6],
    [34, 6],
    [6, 20],
    [20, 20],
    [34, 20],
    [6, 34],
    [20, 34],
    [34, 34],
  ];
  return (
    <svg {...common} className="nh-ab-pico nh-ab-pico--structure">
      {cells.map(([x, y], i) => (
        <rect key={i} className="p-cell" style={{ '--i': i }} x={x} y={y} width="8" height="8" />
      ))}
    </svg>
  );
}
function Precision() {
  return (
    <svg {...common} className="nh-ab-pico nh-ab-pico--precision">
      <circle className="p-ring" cx="24" cy="24" r="14" />
      <path className="p-cross p-cross--h" d="M4 24h14M30 24h14" />
      <path className="p-cross p-cross--v" d="M24 4v14M24 30v14" />
      <circle cx="24" cy="24" r="2" />
    </svg>
  );
}
function Light() {
  return (
    <svg {...common} className="nh-ab-pico nh-ab-pico--light">
      <path className="p-rays" d="M24 4v7M24 37v7M4 24h7M37 24h7M10 10l5 5M33 33l5 5M38 10l-5 5M15 33l-5 5" />
      <path className="p-star" d="M24 14l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
    </svg>
  );
}

const ICONS = { clarity: Clarity, structure: Structure, precision: Precision, light: Light };

export default function PrincipleIcon({ name }) {
  const Icon = ICONS[name] ?? Light;
  return <Icon />;
}
