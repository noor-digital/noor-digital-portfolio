import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /noor-digital-portfolio/.
// In development (npm run dev) the site is served from the root.
// `npm run preview` serves the built files, so it must use the same base as the build.
// If you rename the repository, change REPO_BASE below (and `siteUrl` in src/data/site.js).
const REPO_BASE = '/noor-digital-portfolio/';

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? REPO_BASE : '/',
  plugins: [react()],
  build: {
    target: 'es2022',
    rolldownOptions: {
      output: {
        // Dépendances (React, router, Motion) dans un fichier à part : il change rarement,
        // donc le navigateur le garde en cache d’un déploiement à l’autre.
        codeSplitting: {
          groups: [{ name: 'vendor', test: /node_modules/ }],
        },
      },
    },
  },
}));
