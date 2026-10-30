// Icônes de l’accueil : tracé fin (1,5 px) pour les pictogrammes, pleines pour les marques.
// Toutes sont décoratives (aria-hidden) : le texte voisin porte le sens.

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Svg({ children, size = 28, className, viewBox = '0 0 24 24', ...rest }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const CodeIcon = (props) => (
  <Svg {...props}>
    <path d="M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5M13.5 5l-3 14" {...line} />
  </Svg>
);

export const DatabaseIcon = (props) => (
  <Svg {...props}>
    <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" {...line} />
    <path d="M4.5 5.5v13c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-13M4.5 12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" {...line} />
  </Svg>
);

export const CapIcon = (props) => (
  <Svg {...props}>
    <path d="m2.5 9.5 9.5-5 9.5 5-9.5 5-9.5-5ZM6.5 12v4.6c0 1.2 2.5 2.4 5.5 2.4s5.5-1.2 5.5-2.4V12M21.5 9.5v6" {...line} />
  </Svg>
);

export const PinIcon = (props) => (
  <Svg {...props}>
    <path d="M12 21.5s6.5-5.9 6.5-11.2a6.5 6.5 0 1 0-13 0c0 5.3 6.5 11.2 6.5 11.2Z" {...line} />
    <circle cx="12" cy="10.2" r="2.4" {...line} />
  </Svg>
);

export const ClockIcon = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" {...line} />
    <path d="M12 7v5.2l3.3 2" {...line} />
  </Svg>
);

export const MailIcon = (props) => (
  <Svg {...props}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" {...line} />
    <path d="m3.8 7 8.2 6.3L20.2 7" {...line} />
  </Svg>
);

export const MouseIcon = (props) => (
  <Svg viewBox="0 0 24 36" {...props}>
    <rect x="2" y="2" width="20" height="32" rx="10" {...line} />
    <path className="mouse-wheel" d="M12 9v6" {...line} />
  </Svg>
);

// Marques : tracés pleins (GitHub et LinkedIn : Simple Icons, domaine public CC0).
export const GithubIcon = (props) => (
  <Svg {...props}>
    <path
      fill="currentColor"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </Svg>
);

export const LinkedinIcon = (props) => (
  <Svg {...props}>
    <path
      fill="currentColor"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    />
  </Svg>
);

// WhatsApp : bulle et combiné dessinés au trait, pour rester cohérents avec les autres pictogrammes.
export const WhatsappIcon = (props) => (
  <Svg {...props}>
    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" {...line} />
    <path d="M9 8.5c-.4 1.6.9 3.7 2.4 4.8 1.4 1 3.1 1.5 3.9.7.4-.4.4-.9-.1-1.2l-1.3-.7c-.3-.2-.6 0-.9.3-1.2-.4-2.2-1.4-2.6-2.6.3-.3.5-.6.3-.9l-.7-1.3c-.3-.5-.8-.5-1-.1Z" {...line} />
  </Svg>
);
