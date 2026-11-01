import { projectsPage } from '../../data/site.js';
import { withBase } from '../../lib/projectsUtil.js';
import ProjectArt from '../home/art/ProjectArt.jsx';

const hostOf = (url) => {
  try {
    return new URL(url).host;
  } catch {
    return '';
  }
};

// Visuel d’un projet, dans un ratio réservé (16:10, aucun saut de mise en page).
//  • vraie capture (`image`) → cadre de navigateur (3 points + barre d’adresse), lazy-loading, width/height ;
//  • sinon → illustration vectorielle de la marque, étiquetée « Aperçu illustratif » : jamais de faux écran.
// Le cadre de navigateur n’affiche une adresse que si une démo est renseignée.
export default function ProjectMedia({ project, index = 0, label = true, className = '' }) {
  const { image, demo } = project;

  if (image) {
    return (
      <div className={`nh-pj-media nh-pj-media--shot ${className}`}>
        <div className="nh-pj-browser" aria-hidden={false}>
          <div className="nh-pj-browser__bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{demo ? hostOf(demo) : ''}</span>
          </div>
          <img
            src={withBase(image.src)}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`nh-pj-media nh-pj-media--art ${className}`}>
      <ProjectArt slug={project.slug} name={project.name} index={index} />
      {label && <span className="nh-pj-media__badge">{projectsPage.illustrative}</span>}
    </div>
  );
}
