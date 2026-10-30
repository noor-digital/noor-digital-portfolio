import { rng } from '../../../lib/prng.js';
import { CHARACTER_BOX } from './Character.jsx';

// Le monde de la scène : un repère de 1600 × 900 unités.
// Tout est calé sur la lumière tenue par le personnage : c’est le point de fuite de la composition.

export const WORLD = { width: 1600, height: 900 };
export const SCALE = 0.95; // échelle du personnage dans le monde
export const ORB = { x: 1000, y: 262 }; // position de la lumière
export const MOON = { x: 1300, y: 330, r: 235 };

// Placement du personnage : son repère local est posé pour que la lumière tombe sur ORB.
export const CHARACTER_AT = {
  x: ORB.x - CHARACTER_BOX.orb.x * SCALE,
  y: ORB.y - CHARACTER_BOX.orb.y * SCALE,
};
// Ligne du toit : sous les bottes du personnage.
export const GROUND = Math.round(CHARACTER_AT.y + CHARACTER_BOX.ground * SCALE) + 3;

// Deux compositions : paysage (grand écran) et portrait (mobile, tablette verticale).
// En portrait on cadre plus haut et plus serré sur le personnage ; le ciel déborde au-dessus
// du monde, c’est pourquoi la couleur du ciel est aussi posée en CSS derrière les calques.
export const FRAMES = {
  wide: { viewBox: `0 0 ${WORLD.width} ${WORLD.height}`, par: 'xMidYMax slice' },
  tall: { viewBox: '815 -400 800 1300', par: 'xMidYMax slice' },
};

const f = (n) => Math.round(n * 10) / 10;

// Skyline : une suite d’immeubles de hauteurs variées, quelques crénelages et antennes.
// Renvoie le tracé et la liste des fenêtres allumables.
export function skyline(seed, { x0 = -200, x1 = 1800, base = 900, minH = 60, maxH = 260, minW = 34, maxW = 96 }) {
  const rand = rng(seed);
  const windows = [];
  let x = x0;
  let d = `M${x0} ${base}`;
  while (x < x1) {
    const w = minW + rand() * (maxW - minW);
    const h = minH + rand() * (maxH - minH);
    const top = base - h;
    const stepped = rand() > 0.62;
    d += ` V${f(top)} H${f(x + w)}`;
    if (stepped) {
      const sw = w * 0.38;
      d += ` V${f(top - 24 - rand() * 30)} H${f(x + w - sw)} V${f(top)}`;
    }
    if (rand() > 0.78) {
      const ax = x + w * 0.5;
      d += ` M${f(ax)} ${f(top)} V${f(top - 40 - rand() * 50)} M${f(x + w)} ${f(top)}`;
    }
    // Fenêtres : grille régulière, très peu d’allumées.
    for (let wy = top + 14; wy < base - 8; wy += 18) {
      for (let wx = x + 8; wx < x + w - 8; wx += 14) {
        if (rand() > 0.965) windows.push({ x: f(wx), y: f(wy), warm: rand() > 0.5 });
      }
    }
    x += w;
    d += ` V${base}`;
  }
  d += ` H${x0} Z`;
  return { d, windows };
}

// Lignes de fuite fines : elles partent de la lumière et fixent la perspective de la scène.
export function vanishingLines(seed, count = 46) {
  const rand = rng(seed);
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.09;
    const r0 = 120 + rand() * 120;
    out.push({
      x1: f(ORB.x + Math.cos(a) * r0),
      y1: f(ORB.y + Math.sin(a) * r0),
      x2: f(ORB.x + Math.cos(a) * 3400),
      y2: f(ORB.y + Math.sin(a) * 3400),
      o: f(0.1 + rand() * 0.2),
    });
  }
  return out;
}

// Traits de concentration (focus lines) : fuseaux effilés, épais côté extérieur, pointe vers la lumière.
export function focusLines(seed, count = 36) {
  const rand = rng(seed);
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.12;
    const r0 = 150 + rand() * 170;
    const r1 = 520 + rand() * 900;
    const half = 0.004 + rand() * 0.011; // demi-ouverture angulaire
    const p = (r, da) => `${f(ORB.x + Math.cos(a + da) * r)},${f(ORB.y + Math.sin(a + da) * r)}`;
    out.push({
      points: `${p(r0, 0)} ${p(r1, -half)} ${p(r1, half)}`,
      o: f(0.07 + rand() * 0.16),
    });
  }
  return out;
}

// Poussière lumineuse : petits éclats qui montent lentement autour de la lumière.
export function dust(seed, count = 26) {
  const rand = rng(seed);
  return Array.from({ length: count }, () => ({
    x: f(560 + rand() * 1000),
    y: f(120 + rand() * 720),
    s: f(2 + rand() * 3.2),
    dur: f(7 + rand() * 9),
    delay: f(-rand() * 12),
    rise: Math.round(36 + rand() * 90),
    tone: rand() > 0.55 ? 'turq' : 'pale',
  }));
}

export const SKY_FAR = skyline(7, { base: 900, minH: 150, maxH: 340, minW: 40, maxW: 110 });
export const SKY_MID = skyline(19, { base: 900, minH: 70, maxH: 230, minW: 36, maxW: 92 });
