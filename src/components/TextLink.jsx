import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from './Icons.jsx';

// Lien texte : un filet ambre se dessine dessous au survol et au focus.
export default function TextLink({ to, href, external = false, muted = false, children, ...rest }) {
  const className = `text-link${muted ? ' text-link--muted' : ''}`;

  if (to) {
    return (
      <Link to={to} className={className} {...rest}>
        {children}
        <ArrowRight />
      </Link>
    );
  }

  const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a href={href} className={className} {...extra} {...rest}>
      {children}
      {external && <span className="visually-hidden"> (s’ouvre dans un nouvel onglet)</span>}
      {external ? <ArrowUpRight /> : <ArrowRight />}
    </a>
  );
}
