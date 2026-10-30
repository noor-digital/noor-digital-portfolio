import { aboutPage, principles } from '../../data/site.js';
import TitleReveal from '../home/TitleReveal.jsx';
import Panel from '../home/Panel.jsx';

// Un glyphe par principe, dessiné au trait : une idée, une forme.
//  Clarté : un seul point focal · Structure : une grille alignée · Précision : un réticule · Lumière : l’étoile.
const INK = '#F1F5F9';
const TURQ = '#16B8B0';

function Glyph({ kind, dark }) {
  const line = dark ? '#0B1628' : INK;
  return (
    <svg className="nh-ab-glyph" viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false">
      {kind === 'Clarté' && (
        <>
          <circle cx="60" cy="52" r="26" fill={TURQ} />
          <path d="M14 98H106" stroke={line} strokeWidth="3" />
        </>
      )}
      {kind === 'Structure' && (
        <>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}${c}`}
                x={18 + c * 32}
                y={18 + r * 32}
                width="24"
                height="24"
                fill={r === 1 && c === 1 ? TURQ : 'none'}
                stroke={r === 1 && c === 1 ? TURQ : line}
                strokeWidth="3"
              />
            )),
          )}
        </>
      )}
      {kind === 'Précision' && (
        <>
          <circle cx="60" cy="60" r="32" stroke={line} strokeWidth="3" />
          <path d="M60 10V32M60 88V110M10 60H32M88 60H110" stroke={TURQ} strokeWidth="3.5" />
          <rect x="55" y="55" width="10" height="10" fill={TURQ} />
        </>
      )}
      {kind === 'Lumière' && (
        <>
          <path d="M60 14L68 52L106 60L68 68L60 106L52 68L14 60L52 52Z" fill={dark ? '#0B1628' : INK} />
          <circle cx="60" cy="60" r="8" fill={TURQ} />
        </>
      )}
    </svg>
  );
}

// Quatre cases : la dernière (Lumière) est la case claire, comme la case de narration de l’accueil.
const POLYS = [
  'polygon(0 0, 100% 0, 95% 100%, 0 100%)',
  'polygon(5% 0, 100% 0, 100% 100%, 0 100%)',
  'polygon(0 0, 100% 0, 100% 100%, 5% 100%)',
  'polygon(0 0, 95% 0, 100% 100%, 0 100%)',
];

export default function Principles() {
  return (
    <section className="nh-ab-principles" aria-labelledby="principles-title">
      <div className="container">
        <TitleReveal lines={[aboutPage.principlesTitle]} id="principles-title" />
        <ul className="nh-ab-grid">
          {principles.map((principle, i) => {
            const bright = principle.title === 'Lumière';
            return (
              <li key={principle.title} className={i % 2 === 1 ? 'is-low' : undefined}>
                <Panel className="nh-ab-principle" poly={POLYS[i % POLYS.length]} delay={(i % 2) * 0.14}>
                  <div className={`nh-ab-principle__in${bright ? ' is-bright' : ''}`}>
                    <Glyph kind={principle.title} dark={bright} />
                    <h3>{principle.title}</h3>
                    <p>{principle.text}</p>
                  </div>
                </Panel>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
