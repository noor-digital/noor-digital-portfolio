// Géométrie inspirée de l’art islamique, dessinée au trait comme le reste du site.
// Tout part d’une même construction : l’étoile à huit branches (deux carrés, dont l’un tourné de 45°).
// Les tracés sont calculés ici une fois pour toutes : aucune image, aucune requête, quelques centaines d’octets.

const round = (n) => Math.round(n * 100) / 100;

// Étoile {8/k} centrée en (0, 0) : `radius` = rayon des pointes, `step` = 2 (carrés superposés, branches larges)
// ou 3 (branches plus fines, comme des rayons). `turn` = rotation en degrés.
function starPath(radius, step = 2, turn = 0, points = 8) {
  const inner = (radius * Math.cos((Math.PI * step) / points)) / Math.cos((Math.PI * (step - 1)) / points);
  const at = (r, deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return `${round(r * Math.cos(a))} ${round(r * Math.sin(a))}`;
  };
  const steps = [];
  for (let i = 0; i < points; i += 1) {
    steps.push(at(radius, turn + (i * 360) / points));
    steps.push(at(inner, turn + (i * 360) / points + 180 / points));
  }
  return `M${steps.join('L')}Z`;
}

const MARK = starPath(10);

// Petite étoile pleine : le motif unique du site, utilisé uniquement comme point d’orgue d’un séparateur.
export function StarMark({ size = 14, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="-10 -10 20 20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={MARK} />
    </svg>
  );
}

// Séparateur : un filet qui s’efface vers l’extérieur, l’étoile au centre. Décoratif.
export function OrnamentRule({ className = '' }) {
  return (
    <div className={`isl-rule ${className}`.trim()} aria-hidden="true">
      <span className="isl-rule__line isl-rule__line--l" />
      <StarMark size={13} className="isl-rule__star" />
      <span className="isl-rule__line isl-rule__line--r" />
    </div>
  );
}

// Rosace de lumière : des étoiles à huit branches emboîtées, chacune tournée de 22,5° et réduite de façon que ses pointes
// touchent les creux de la précédente (rapport cos(2π/8) / cos(π/8) ≈ 0,765). Elles convergent vers le centre,
// comme le faisceau de « Pourquoi NOOR » qui structure la page. Les traits ne grossissent pas avec l’affichage.
const RATIO = Math.cos((Math.PI * 2) / 8) / Math.cos(Math.PI / 8);
const LEVELS = Array.from({ length: 6 }, (_, k) => ({
  d: starPath(290 * RATIO ** k, 2, 22.5 * k),
  opacity: round(1 - k * 0.1),
}));

export function LightRosette({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="-300 -300 600 600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
    >
      <circle r="296" vectorEffect="non-scaling-stroke" strokeOpacity="0.4" />
      {LEVELS.map(({ d, opacity }) => (
        <path key={d} d={d} vectorEffect="non-scaling-stroke" strokeOpacity={opacity} />
      ))}
      <path d={starPath(290 * RATIO ** 5 * 0.7)} fill="currentColor" fillOpacity="0.16" stroke="none" />
    </svg>
  );
}
