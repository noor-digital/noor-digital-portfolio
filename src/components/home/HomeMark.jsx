import { Link } from 'react-router-dom';

// Monogramme « N » de la version manga : deux montants blancs et une diagonale de lumière.
export function HomeMark({ className = 'nh-mark' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <path d="M6 28V4M26 28V4" stroke="#F1F5F9" strokeWidth="4" strokeLinecap="butt" />
      <path d="M6 4L26 28" stroke="#16B8B0" strokeWidth="4" strokeLinecap="butt" />
    </svg>
  );
}

export default function HomeBrand({ onClick }) {
  return (
    <Link to="/" className="nh-brand" aria-label="NOOR DIGITAL — Accueil" onClick={onClick}>
      <HomeMark />
      <span className="nh-brand__text" aria-hidden="true">
        NOOR DIGITAL
      </span>
    </Link>
  );
}
