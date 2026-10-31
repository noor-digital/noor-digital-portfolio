import { Link } from 'react-router-dom';

// Bouton de l’accueil : forme à pans coupés (comme une case de manga), remplissage en diagonale
// au survol et au focus. Toujours une vraie action : lien interne, lien externe/mailto ou bouton.
// La forme est portée par un calque (`nh-cta__shape`) : le contour de focus, lui, reste rectangulaire.
function Inner({ children }) {
  return (
    <>
      <span className="nh-cta__shape" aria-hidden="true">
        <span className="nh-cta__fill" />
      </span>
      <span className="nh-cta__label">{children}</span>
    </>
  );
}

export default function Cta({ to, href, external = false, onClick, variant = 'primary', children, ...rest }) {
  const className = `nh-cta nh-cta--${variant}`;

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick} {...rest}>
        <Inner>{children}</Inner>
      </Link>
    );
  }
  if (href) {
    const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={className} onClick={onClick} {...extra} {...rest}>
        <Inner>{children}</Inner>
        {external && <span className="visually-hidden"> (s’ouvre dans un nouvel onglet)</span>}
      </a>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick} {...rest}>
      <Inner>{children}</Inner>
    </button>
  );
}
