import { notFoundMeta } from '../data/site.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import Button from '../components/Button.jsx';
import Hairline from '../components/Hairline.jsx';

export default function NotFound() {
  useDocumentTitle(notFoundMeta);

  return (
    <div className="notfound surface--0">
      <div className="container notfound__inner">
        <p className="mono">
          <span className="mono--accent">404</span> — Erreur
        </p>
        <Hairline />
        <h1 className="page-title" tabIndex={-1}>
          Page
          <br />
          introuvable.
        </h1>
        <p className="lead">L’adresse demandée n’existe pas ou a été déplacée.</p>
        <div>
          <Button to="/">Retour à l’accueil</Button>
        </div>
      </div>
    </div>
  );
}
