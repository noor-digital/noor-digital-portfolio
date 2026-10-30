import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import { ArrowRight } from './Icons.jsx';

// Ligne éditoriale d’un projet sur l’accueil : index, nom + stack, description, flèche.
// Au survol, au focus et au toucher : le filet ambre se dessine, la surface se soulève
// d’un cran et le nom se décale.
export default function ProjectRow({ project, index, delay = 0 }) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <Reveal as="li" className="row" delay={delay} y={12}>
      <Link
        className="row__link"
        to={{ pathname: '/projets', hash: `#${project.slug}` }}
        aria-label={`Voir le projet ${project.name}`}
      >
        <span className="mono row__index">{number}</span>
        <span className="row__name">{project.name}</span>
        <span className="mono row__tech">{project.tech.join(' · ')}</span>
        <span className="row__desc">{project.description}</span>
        <span className="row__arrow" aria-hidden="true">
          <ArrowRight className="row__icon" />
        </span>
      </Link>
    </Reveal>
  );
}
