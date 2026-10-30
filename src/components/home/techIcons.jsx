import {
  siHtml5, siCss, siJavascript, siReact, siTailwindcss, siBootstrap, siPhp, siLaravel, siMysql,
  siGit, siGithub, siComposer, siLaragon, siXampp, siPostman, siFigma, siNodedotjs, siNpm, siVite,
} from 'simple-icons';
import vscodeUrl from '../../assets/icons/vscode.svg';
import canvaUrl from '../../assets/icons/canva.svg';

// Logos de marque : Simple Icons (CC0) pour la plupart ; VS Code et Canva viennent de Devicon (MIT),
// car Simple Icons ne les propose plus. Les logos sombres (GitHub…) passent en ivoire pour rester lisibles.
const SIMPLE = {
  html5: siHtml5, css: siCss, javascript: siJavascript, react: siReact, tailwind: siTailwindcss,
  bootstrap: siBootstrap, php: siPhp, laravel: siLaravel, mysql: siMysql, git: siGit, github: siGithub,
  composer: siComposer, laragon: siLaragon, xampp: siXampp, postman: siPostman, figma: siFigma,
  node: siNodedotjs, npm: siNpm, vite: siVite, ghpages: siGithub,
};
const IMAGES = { vscode: { url: vscodeUrl, color: '#2f9bf0' }, canva: { url: canvaUrl, color: '#00c4cc' } };

// Luminance relative (WCAG) d’une couleur « RRGGBB ».
function luminance(hex) {
  const n = parseInt(hex, 16);
  const lin = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
}

// Sur le fond sombre du site : logos presque noirs → ivoire ; logos trop ternes (Composer, MySQL) → éclaircis de 45 %.
function onDark(hex) {
  const lum = luminance(hex);
  if (lum < 0.06) return '#f1f5f9';
  if (lum >= 0.19) return `#${hex}`;
  const n = parseInt(hex, 16);
  const mix = (c) => Math.round(c + (255 - c) * 0.45).toString(16).padStart(2, '0');
  return `#${mix((n >> 16) & 255)}${mix((n >> 8) & 255)}${mix(n & 255)}`;
}

// Retourne { node, color } : l’icône à afficher et la couleur de marque (halo au survol).
export function techIcon(key) {
  if (IMAGES[key]) {
    const { url, color } = IMAGES[key];
    return { color, node: <img src={url} alt="" width="40" height="40" loading="lazy" decoding="async" /> };
  }
  const icon = SIMPLE[key];
  if (!icon) return { color: '#16b8b0', node: null };
  const fill = onDark(icon.hex);
  return {
    color: fill,
    node: (
      <svg viewBox="0 0 24 24" width="40" height="40" role="img" aria-hidden="true" focusable="false">
        <path d={icon.path} fill={fill} />
      </svg>
    ),
  };
}
