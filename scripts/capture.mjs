#!/usr/bin/env node
// Captures d'écran des projets pour la page Projets (cadre de navigateur, vraies images, aucun faux écran).
//
//   node scripts/capture.mjs                    → SIMULATION : liste ce qui serait capturé, ne contacte aucun site
//   node scripts/capture.mjs --go               → ouvre les URL de démo et enregistre les captures
//   node scripts/capture.mjs --go --slug todo-list   → un seul projet
//   node scripts/capture.mjs --go --force       → refait aussi les projets qui ont déjà une image
//
// Seuls les projets dont `demo` est renseigné dans src/data/projects.js sont concernés.
// Prérequis (une seule fois) : npm i -D playwright && npx playwright install chromium
// (la commande `npm i -D` met à jour package.json ET package-lock.json ensemble : indispensable pour que
//  `npm ci` reste valide dans GitHub Actions). Rien n'est téléchargé tant que vous ne lancez pas ces commandes.
// Sortie : public/assets/<slug>.png (1600 × 1000) + les lignes `image: {…}` à coller dans projects.js.

import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const go = args.includes('--go');
const force = args.includes('--force');
const only = args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null;

const { projects } = await import(pathToFileURL(join(root, 'src', 'data', 'projects.js')).href);
const targets = projects.filter((p) => p.demo && (force || !p.image) && (!only || p.slug === only));

if (targets.length === 0) {
  console.log('Aucun projet à capturer : renseignez `demo` dans src/data/projects.js (et laissez `image: null`).');
  process.exit(0);
}

console.log(go ? 'Captures en cours…' : 'SIMULATION (aucun accès réseau). Ajoutez --go pour capturer :');
targets.forEach((p) => console.log(`  - ${p.slug} ← ${p.demo}`));
if (!go) process.exit(0);

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('\nPlaywright n’est pas installé. Lancez : npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

const WIDTH = 1600;
const HEIGHT = 1000;
const outDir = join(root, 'public', 'assets');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
const lines = [];

for (const project of targets) {
  try {
    await page.goto(project.demo, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);
    const file = join(outDir, `${project.slug}.png`);
    await page.screenshot({ path: file });
    console.log(`✓ ${project.slug} → public/assets/${project.slug}.png`);
    lines.push(
      `// ${project.slug}\nimage: { src: 'assets/${project.slug}.png', alt: 'Capture d’écran de ${project.name}', width: ${WIDTH}, height: ${HEIGHT} },`,
    );
  } catch (error) {
    console.error(`✗ ${project.slug} : ${error.message}`);
  }
}
await browser.close();

if (lines.length) {
  console.log('\nÀ coller dans src/data/projects.js (remplace `image: null` du projet concerné) :\n');
  console.log(lines.join('\n\n'));
}
