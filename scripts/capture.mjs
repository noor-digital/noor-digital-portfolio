#!/usr/bin/env node
// Captures réelles des démos de projets pour le portfolio NOOR DIGITAL.
// Usage : node scripts/capture.mjs --go [--slug <slug>] [--force]

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const go = args.includes('--go');
const force = args.includes('--force');
const only = args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null;
const dataPath = join(root, 'src', 'data', 'projects.js');

const { projects } = await import(pathToFileURL(dataPath).href);
const targets = projects.filter((p) => p.demo && (force || !p.image) && (!only || p.slug === only));

if (!go) {
  console.log('Mode simulation. Projets qui seraient capturés :');
  targets.forEach((p) => console.log(`  - ${p.slug} ← ${p.demo}`));
  process.exit(0);
}
if (!targets.length) {
  console.log('Aucune capture nécessaire.');
  process.exit(0);
}

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright n’est pas installé.');
  process.exit(1);
}

const WIDTH = 1600;
const HEIGHT = 1000;
const outDir = join(root, 'public', 'assets');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
});
const captured = [];

for (const project of targets) {
  try {
    await page.goto(project.demo, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(1800);
    const file = join(outDir, `${project.slug}.png`);
    await page.screenshot({ path: file, fullPage: false, animations: 'disabled' });
    captured.push(project);
    console.log(`✓ ${project.slug} → public/assets/${project.slug}.png`);
  } catch (error) {
    console.error(`✗ ${project.slug} : ${error.message}`);
  }
}
await browser.close();

if (captured.length) {
  let source = await readFile(dataPath, 'utf8');
  for (const project of captured) {
    const marker = `slug: '${project.slug}'`;
    const start = source.indexOf(marker);
    if (start < 0) continue;
    const end = source.indexOf('\n  },', start);
    if (end < 0) continue;
    const section = source.slice(start, end);
    const replacement = `image: { src: 'assets/${project.slug}.png', alt: 'Capture d’écran de ${project.name}', width: ${WIDTH}, height: ${HEIGHT} },`;
    const updated = section.replace(/image:\\s*null,/, replacement);
    source = source.slice(0, start) + updated + source.slice(end);
  }
  await writeFile(dataPath, source, 'utf8');
  console.log(`\\n${captured.length} capture(s) ajoutée(s) dans src/data/projects.js.`);
}
