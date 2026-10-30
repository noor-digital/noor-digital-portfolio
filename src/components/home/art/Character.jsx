import { useId } from 'react';

// Le personnage de NOOR DIGITAL : une silhouette originale, dessinée en vectoriel pour ce projet.
// Un développeur de dos, en trois-quarts, qui lève la lumière qui va structurer la scène.
//
// Construction :
//  - chaque pièce (pan de manteau, écharpe, mèches) est un groupe indépendant : les classes
//    `ch-*` (voir home.css) les font osciller avec des phases différentes, comme sous un vent régulier ;
//  - le liseré turquoise n’est pas dessiné à la main : chaque pièce est copiée, décalée, puis
//    soustraite d’elle-même par un masque. Il reste un croissant sur le bord tourné vers la lumière ;
//  - la variable CSS `--rim` (0 à 1) règle l’intensité du liseré : la scène la relie au pointeur.
//
// Repère local : 600 × 720, sol à y = 700. La lumière est dessinée en (52, 60) dans le groupe
// incliné de -3° autour des pieds ; une fois la rotation appliquée, elle se trouve en (18.8, 71.2)
// (c’est cette position, et non l’ancienne, qui sert à caler toute la scène).

const INK = '#070E1C';
const LIGHT = '#16B8B0';
const SCARF = '#1A3F9C';

export const CHARACTER_BOX = { width: 600, height: 720, orb: { x: 18.8, y: 71.2 }, ground: 700 };

const COAT =
  'M214 128 L196 146 C186 156 182 172 184 196 C186 260 192 340 182 420 C178 470 168 510 150 548 L186 534 L212 566 L246 536 L280 570 L314 536 L346 562 L356 520 C350 450 346 380 342 300 C340 240 336 190 330 168 C326 150 318 138 308 128 Z';

function Part({ d, fill = INK, className, transformOrigin }) {
  const id = `r${useId().replace(/:/g, '')}`;
  return (
    <g className={className} style={transformOrigin ? { transformOrigin } : undefined}>
      <mask id={id} maskUnits="userSpaceOnUse" x="-60" y="-60" width="760" height="860">
        <path d={d} fill="#fff" />
        <path d={d} fill="#000" transform="translate(9 6)" />
      </mask>
      <path d={d} fill={fill} />
      <path d={d} fill={LIGHT} mask={`url(#${id})`} className="ch-rim" />
    </g>
  );
}

export default function Character({ className, orb = true, title, ...rest }) {
  const clip = `c${useId().replace(/:/g, '')}`;
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };

  return (
    <svg
      className={className}
      viewBox={`0 0 ${CHARACTER_BOX.width} ${CHARACTER_BOX.height}`}
      focusable="false"
      {...a11y}
      {...rest}
    >
      <g transform="rotate(-3 250 700)">
        <g className="ch-breath">
          {/* Bras droit, derrière le manteau */}
          <Part d="M326 168 C348 192 360 244 360 300 L346 308 C344 256 332 214 318 190 Z" />
          <Part d="M342 304 L362 300 L368 326 L352 338 L340 324 Z" />

          {/* Jambes et bottes */}
          <Part d="M276 520 L330 520 L326 600 L334 650 L360 692 L320 704 L296 692 L298 650 L286 600 Z" />
          <Part d="M190 520 L268 522 C266 570 254 604 244 630 L232 664 L240 684 L116 706 L112 686 L186 668 L180 628 C182 590 188 556 190 520 Z" />

          {/* Pans du manteau : trois pièces, trois phases */}
          <Part
            className="ch-tail ch-tail--a"
            d="M338 216 C384 212 448 190 548 168 C494 200 460 226 420 246 C462 242 500 246 556 256 C480 276 428 298 348 322 Z"
          />
          <Part
            className="ch-tail ch-tail--b"
            d="M346 330 C404 338 480 332 560 350 C500 366 460 384 420 408 C462 408 500 418 552 440 C470 440 416 448 352 474 Z"
          />
          <Part
            className="ch-tail ch-tail--c"
            d="M352 478 C400 482 450 490 522 520 C470 520 436 530 404 548 C380 560 366 566 350 566 Z"
          />

          {/* Manteau + plans de volume (côté lumière plus clair, côté ombre plus dense) */}
          <Part d={COAT} />
          <clipPath id={clip}>
            <path d={COAT} />
          </clipPath>
          <g clipPath={`url(#${clip})`}>
            <path d="M184 130 L262 130 L236 580 L140 580 Z" fill="#0F2346" />
            <path d="M300 130 L370 130 L370 580 L330 580 Z" fill="#040A14" />
            <path d="M184 300 L342 292 L342 306 L182 314 Z" fill="#12305C" />
            <g stroke="#F1F5F9" strokeOpacity=".3" strokeWidth="1.4" fill="none">
              <path d="M232 316 L206 540" />
              <path d="M264 312 L262 560" />
              <path d="M298 308 L322 540" />
              <path d="M200 180 L216 290" />
            </g>
          </g>

          {/* Bras levé, poignet, main ouverte */}
          <Part d="M202 147 L141 160 L95 109 L77 124 L118 182 L206 177 Z" />
          <Part d="M84 126 L100 112 L112 124 L96 140 Z" />
          <Part d="M96 112 L78 84 L70 66 L80 64 L90 84 L92 58 L102 58 L102 86 L112 66 L120 72 L110 94 L108 112 Z" />

          {/* Cou, tête */}
          <Part d="M246 108 L280 108 L282 132 L244 132 Z" />
          <Part d="M232 80 C232 54 246 48 264 48 C284 48 296 62 294 84 C292 106 280 118 262 118 C244 118 232 106 232 80 Z" />

          {/* Écharpe : bande + pan qui flotte */}
          <Part fill={SCARF} d="M214 124 C240 112 288 112 312 124 L314 146 C288 136 240 136 212 148 Z" />
          <Part
            className="ch-scarf"
            fill={SCARF}
            d="M306 128 C350 110 410 82 480 94 C440 108 416 122 392 144 C430 132 462 138 508 162 C450 164 410 174 350 196 C340 170 322 150 306 146 Z"
          />

          {/* Cheveux : mèches arrière et mèches de face, vent de gauche à droite */}
          <Part
            className="ch-hair"
            d="M230 76 C224 44 246 22 274 22 C300 24 314 44 312 68 L352 50 L326 82 L372 84 L322 100 L356 126 L306 108 L296 124 C288 98 268 92 244 98 C236 94 230 86 230 76 Z"
          />
          <Part
            className="ch-hair ch-hair--front"
            d="M236 44 L214 22 L246 28 L234 4 L264 24 L272 2 L288 28 C268 22 248 30 236 44 Z"
          />
        </g>

        {/* La lumière tenue dans la main : étoile à quatre branches, bords nets (pas de halo). */}
        {orb && (
          <g transform={`translate(${CHARACTER_BOX.orb.x} ${CHARACTER_BOX.orb.y})`}>
            <g className="ch-orb">
              <path d="M0 -38 L6 -7 L38 0 L6 7 L0 38 L-6 7 L-38 0 L-6 -7 Z" fill="#F1F5F9" />
              <circle r="8" fill="#fff" />
            </g>
          </g>
        )}
      </g>
    </svg>
  );
}
