import { motion, useTransform } from 'motion/react';
import { projects } from '../../data/projects.js';
import ProjectMedia from './ProjectMedia.jsx';

function Layer({ depth, mx, my, parallax, className, style, children }) {
  const x = useTransform(mx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(my, [-0.5, 0.5], [-depth, depth]);
  return (
    <motion.div className={`nh-pj-reel__layer ${className}`} style={{ ...style, ...(parallax ? { x, y } : {}) }}>
      {children}
    </motion.div>
  );
}

// « Showreel » du hero : quatre aperçus de projets empilés en profondeur, le projet à la une au premier plan.
// Parallaxe à plusieurs niveaux et légère rotation 3D qui suivent la souris (grands écrans à pointeur précis) ;
// léger « float » continu en CSS (transform seulement). Décoratif : la liste des projets est plus bas.
export default function ShowReel({ mx, my, parallax }) {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const picks = [featured, ...projects.filter((p) => p !== featured)].slice(0, 4);

  const rotX = useTransform(my, [-0.5, 0.5], [6, -6]);
  const rotY = useTransform(mx, [-0.5, 0.5], [-9, 9]);

  // Positions (en % de la scène), profondeur de parallaxe et rotation de chaque aperçu : du fond au premier plan.
  const slots = [
    { l: '26%', t: '34%', w: '70%', z: 4, depth: 34, r: '2deg', dur: '7s', del: '-1s' },
    { l: '0%', t: '2%', w: '54%', z: 1, depth: 8, r: '-5deg', dur: '9s', del: '-4s' },
    { l: '46%', t: '0%', w: '52%', z: 2, depth: 16, r: '4deg', dur: '8s', del: '-2s' },
    { l: '0%', t: '46%', w: '46%', z: 3, depth: 24, r: '-3deg', dur: '8.5s', del: '-5s' },
  ];

  return (
    <div className="nh-pj-reel" aria-hidden="true">
      <motion.div className="nh-pj-reel__stage" style={parallax ? { rotateX: rotX, rotateY: rotY } : undefined}>
        {picks.map((project, i) => {
          const slot = slots[i];
          return (
            <Layer
              key={project.slug}
              depth={slot.depth}
              mx={mx}
              my={my}
              parallax={parallax}
              className="nh-pj-reel__slot"
              style={{ left: slot.l, top: slot.t, width: slot.w, zIndex: slot.z }}
            >
              <div className="nh-pj-float" style={{ '--dur': slot.dur, '--del': slot.del, '--r': slot.r }}>
                <div className="nh-pj-reel__card" data-front={i === 0}>
                  <ProjectMedia project={project} index={i} label={false} />
                  <span className="nh-pj-reel__name">{project.name}</span>
                </div>
              </div>
            </Layer>
          );
        })}
      </motion.div>
    </div>
  );
}
