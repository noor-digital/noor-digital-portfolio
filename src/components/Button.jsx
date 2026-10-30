import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from './Icons.jsx';

// Bouton réel : lien interne (`to`), lien externe ou mailto (`href`), ou <button>.
// variant : "primary" (ambre plein) ou "ghost" (contour).
export default function Button({ to, href, external = false, variant = 'primary', children, ...rest }) {
  const className = `btn btn--${variant}`;

  if (to) {
    return (
      <Link to={to} className={className} {...rest}>
        {children}
        <ArrowRight />
      </Link>
    );
  }

  if (href) {
    const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={className} {...extra} {...rest}>
        {children}
        {external && <span className="visually-hidden"> (s’ouvre dans un nouvel onglet)</span>}
        {external ? <ArrowUpRight /> : <ArrowRight />}
      </a>
    );
  }

  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  );
}
