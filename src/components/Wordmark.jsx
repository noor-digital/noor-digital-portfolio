import { Link } from 'react-router-dom';
import { Monogram } from './Monogram.jsx';

// Wordmark typographique NOOR DIGITAL + monogramme « N » géométrique (dessiné par nous).
// Sur l’accueil : variant="solid" (N plein ambre) et accent (« DIGITAL » en ambre).
export default function Wordmark({ onClick, variant = 'default', accent = false }) {
  return (
    <Link to="/" className="wordmark" aria-label="NOOR DIGITAL — Accueil" onClick={onClick}>
      <Monogram variant={variant} />
      <span className="wordmark__text" aria-hidden="true">
        {accent ? (
          <>
            NOOR <span className="wordmark__accent">DIGITAL</span>
          </>
        ) : (
          'NOOR DIGITAL'
        )}
      </span>
    </Link>
  );
}
