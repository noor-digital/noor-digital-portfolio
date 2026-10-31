// Icônes de la page Services : tracé au trait, 24 × 24. Chaque tracé se redessine au survol de sa carte
// (classe `nh-sv-ico`, voir services.css). Décoratives : toujours masquées aux lecteurs d’écran.
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

const P = (props) => <path pathLength="1" className="nh-sv-ico__p" {...props} />;

const ICONS = {
  // Méthode
  chat: (
    <>
      <P d="M4 5h16v11H9l-5 4z" />
      <P d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  layout: (
    <>
      <P d="M4 4h16v16H4z" />
      <P d="M4 9h16M10 9v11" />
    </>
  ),
  code: (
    <>
      <P d="M8 7l-5 5 5 5" />
      <P d="M16 7l5 5-5 5" />
      <P d="M13.5 5l-3 14" />
    </>
  ),
  rocket: (
    <>
      <P d="M12 3c3.5 2 5 5.5 5 9l-2.2 3.2H9.2L7 12c0-3.5 1.5-7 5-9z" />
      <P d="M9.2 15.2L7.5 19M14.8 15.2L16.5 19" />
      <P d="M12 9.2a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
    </>
  ),
  // Pourquoi travailler avec moi
  brackets: (
    <>
      <P d="M9 4H6.5A1.5 1.5 0 005 5.5v4A2 2 0 013 12a2 2 0 012 2.5v4A1.5 1.5 0 006.5 20H9" />
      <P d="M15 4h2.5A1.5 1.5 0 0119 5.5v4a2 2 0 002 2.5 2 2 0 00-2 2.5v4a1.5 1.5 0 01-1.5 1.5H15" />
    </>
  ),
  devices: (
    <>
      <P d="M3 5h14v10H3z" />
      <P d="M1.5 18.5h17" />
      <P d="M17 9h4v10h-4" />
    </>
  ),
  access: (
    <>
      <P d="M12 3.2a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2z" />
      <P d="M5 8.5l7 1.3 7-1.3M12 9.8V14M12 14l-3 6.5M12 14l3 6.5" />
    </>
  ),
  message: (
    <>
      <P d="M3 6h18v12H3z" />
      <P d="M3.5 7l8.5 6.5L20.5 7" />
    </>
  ),
  // Interface
  check: <P d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <P d="M4 12h15M13 6l6 6-6 6" />,
  chevron: <P d="M6 9l6 6 6-6" />,
};

export default function ServicesIcon({ name, className = 'nh-sv-ico', size = 24 }) {
  return (
    <svg {...base} className={className} width={size} height={size}>
      {ICONS[name]}
    </svg>
  );
}
