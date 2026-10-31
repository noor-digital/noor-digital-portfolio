import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';

// Utilisé uniquement au build (scripts/postbuild.js) : produit le HTML de chaque page
// pour qu’elle s’affiche immédiatement, avant même le chargement du JavaScript.
export function render(path) {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
  return renderToString(
    <StaticRouter location={`${basename === '/' ? '' : basename}${path}`} basename={basename}>
      <App />
    </StaticRouter>,
  );
}
