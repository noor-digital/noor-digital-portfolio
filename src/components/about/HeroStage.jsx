import { motion, useTransform } from 'motion/react';
import { site } from '../../data/site.js';
import { withBase } from '../../lib/projectsUtil.js';
import Character from '../home/art/Character.jsx';

function Layer({ depth, mx, my, parallax, className, children }) {
  const x = useTransform(mx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(my, [-0.5, 0.5], [-depth, depth]);
  return (
    <motion.div className={`nh-ab-layer ${className}`} style={parallax ? { x, y } : undefined}>
      {children}
    </motion.div>
  );
}

// Scène du hero : une grande lune, des rayons de lumière qui tournent très lentement, le personnage de NOOR DIGITAL
// qui lève la lumière, et quelques points de poussière lumineuse, sur quatre profondeurs de parallaxe (souris, grands
// écrans à pointeur précis). Si `site.photo` est renseigné, un portrait (ratio fixe, lazy-loading) prend la place du
// personnage ; sinon l’illustration seule suffit : aucune fausse photo n’est jamais simulée.
export default function HeroStage({ mx, my, parallax }) {
  const photo = site.photo;
  return (
    <div className="nh-ab-stage" aria-hidden={photo ? undefined : 'true'}>
      <Layer depth={6} mx={mx} my={my} parallax={parallax} className="nh-ab-layer--rays">
        <div className="nh-ab-rays" aria-hidden="true" />
      </Layer>

      <Layer depth={14} mx={mx} my={my} parallax={parallax} className="nh-ab-layer--moon">
        <div className="nh-ab-moon" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </Layer>

      <Layer depth={30} mx={mx} my={my} parallax={parallax} className="nh-ab-layer--hero">
        <div className="nh-ab-float">
          {photo ? (
            <figure className="nh-ab-portrait">
              <img src={withBase(photo.src)} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
            </figure>
          ) : (
            <Character className="nh-ab-character" />
          )}
        </div>
      </Layer>

      <Layer depth={46} mx={mx} my={my} parallax={parallax} className="nh-ab-layer--dust">
        <div className="nh-ab-dust" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} style={{ left: `${8 + i * 10}%`, top: `${12 + ((i * 37) % 62)}%`, '--i': i }} />
          ))}
        </div>
      </Layer>
      <div className="nh-ab-ground" aria-hidden="true" />
    </div>
  );
}
