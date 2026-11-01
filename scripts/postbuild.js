// Exécuté automatiquement après `vite build` (voir « build » dans package.json).
//
// Pourquoi ? GitHub Pages ne redirige pas toutes les URL vers index.html.
// Sans ce script, ouvrir directement /projets ou actualiser la page donnerait une erreur 404.
//
// Ce que fait le script :
//   1. crée un fichier HTML par route (dist/projets/index.html, dist/contact/index.html, …)
//      avec le bon <title>, la bonne description et la bonne URL canonique ;
//   2. crée dist/404.html (page introuvable) : GitHub Pages l’affiche pour toute URL inconnue ;
//   3. génère sitemap.xml et robots.txt ;
//   4. vérifie le résultat et fait échouer le build si quelque chose manque.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

// Source unique de vérité : les mêmes données que celles de l’application.
const { routes, notFoundMeta, site, servicesPage } = await import(
  pathToFileURL(join(root, 'src', 'data', 'site.js')).href
);
const { services } = await import(pathToFileURL(join(root, 'src', 'data', 'services.js')).href);
const { projects } = await import(pathToFileURL(join(root, 'src', 'data', 'projects.js')).href);
const { servicesJsonLd, contactJsonLd, projectsJsonLd, aboutJsonLd } = await import(pathToFileURL(join(root, 'src', 'data', 'seo.js')).href);

const baseHtml = await readFile(join(dist, 'index.html'), 'utf8');
const siteUrl = site.siteUrl.endsWith('/') ? site.siteUrl : `${site.siteUrl}/`;

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function withMeta(html, { title, description, url }) {
  const replacements = [
    [/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(title)}</title>`],
    [
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeAttr(description)}" />`,
    ],
    [
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${escapeAttr(title)}" />`,
    ],
    [
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${escapeAttr(description)}" />`,
    ],
    [
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${url}" />`,
    ],
    [/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`],
  ];

  let result = html;
  for (const [pattern, replacement] of replacements) {
    if (!pattern.test(result)) {
      throw new Error(`postbuild: balise introuvable dans index.html (${pattern})`);
    }
    result = result.replace(pattern, replacement);
  }
  return result;
}

const generated = [];

for (const route of routes) {
  const url = route.path === '/' ? siteUrl : `${siteUrl}${route.path.slice(1)}/`;
  let html = withMeta(baseHtml, { title: route.title, description: route.description, url });

  // Données structurées des pages Services, Contact, Projets et À propos, sans aucun champ financier.
  const jsonLdBuilders = {
    '/services': () => servicesJsonLd({ site, services, faq: servicesPage.faq.items, url }),
    '/contact': () => contactJsonLd({ site, url }),
    '/projets': () => projectsJsonLd({ site, projects, url }),
    '/a-propos': () => aboutJsonLd({ site, url }),
  };
  if (jsonLdBuilders[route.path]) {
    const data = jsonLdBuilders[route.path]();
    // « < » échappé : le JSON ne peut pas refermer la balise <script>.
    const json = JSON.stringify(data).replace(/</g, '\\u003c');
    html = html.replace('</head>', `    <script type="application/ld+json">${json}</script>\n  </head>`);
  }

  if (route.path === '/') {
    await writeFile(join(dist, 'index.html'), html);
    generated.push('index.html');
  } else {
    const folder = join(dist, route.path.slice(1));
    await mkdir(folder, { recursive: true });
    await writeFile(join(folder, 'index.html'), html);
    generated.push(`${route.path.slice(1)}/index.html`);
  }
}

// 404.html : même application, métadonnées « page introuvable ».
await writeFile(
  join(dist, '404.html'),
  withMeta(baseHtml, { ...notFoundMeta, url: siteUrl }).replace(
    '</head>',
    '    <meta name="robots" content="noindex" />\n  </head>',
  ),
);
generated.push('404.html');

// sitemap.xml + robots.txt
const urls = routes
  .map((route) => (route.path === '/' ? siteUrl : `${siteUrl}${route.path.slice(1)}/`))
  .map((loc) => `  <url><loc>${loc}</loc></url>`)
  .join('\n');
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`);
generated.push('sitemap.xml', 'robots.txt');

// ── Vérifications ───────────────────────────────────────────
const problems = [];
for (const route of routes) {
  const file =
    route.path === '/' ? join(dist, 'index.html') : join(dist, route.path.slice(1), 'index.html');
  if (!existsSync(file)) {
    problems.push(`fichier manquant : ${file}`);
    continue;
  }
  const html = await readFile(file, 'utf8');
  if (!html.includes(`<title>${escapeAttr(route.title)}</title>`)) {
    problems.push(`titre incorrect dans ${file}`);
  }
  if (!html.includes(escapeAttr(route.description))) {
    problems.push(`description incorrecte dans ${file}`);
  }
}
if (!existsSync(join(dist, '404.html'))) problems.push('404.html manquant');

if (problems.length > 0) {
  console.error('postbuild : échec\n - ' + problems.join('\n - '));
  process.exit(1);
}

console.log(`postbuild : ${generated.length} fichiers générés`);
for (const name of generated) console.log(`  dist/${name}`);
