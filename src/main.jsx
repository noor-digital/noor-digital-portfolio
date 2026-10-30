import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Polices auto-hébergées (Fontsource) : aucune requête vers Google Fonts.
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/hanken-grotesk/latin-400.css';
import '@fontsource/hanken-grotesk/latin-500.css';
import '@fontsource/hanken-grotesk/latin-600.css';
// Accueil (manga cinématique) : Archivo (axes graisse + largeur, pour les titres condensés)
// et Zen Kaku Gothic New (texte courant, gothique net d’inspiration japonaise).
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/archivo/wdth-italic.css';
import '@fontsource/zen-kaku-gothic-new/latin-400.css';
import '@fontsource/zen-kaku-gothic-new/latin-500.css';
import '@fontsource/zen-kaku-gothic-new/latin-700.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';

import './styles/tokens.css';
import './styles/reset.css';
import './styles/base.css';
import './styles/typography.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/home.css';
import './styles/about.css';
import './styles/projects.css';
import './styles/services.css';
import './styles/contact.css';
import './styles/heroes.css';
import './styles/tech.css';
import './styles/compact.css';

import App from './App.jsx';

// BASE_URL vaut « / » en développement et « /noor-digital-portfolio/ » après le build
// (défini dans vite.config.js). Le routeur en a besoin pour GitHub Pages.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
