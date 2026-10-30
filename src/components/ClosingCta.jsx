import { Link } from 'react-router-dom';
import Hairline from './Hairline.jsx';
import Reveal from './Reveal.jsx';
import { ArrowRight } from './Icons.jsx';

// Composition de clôture : un filet qui se dessine, un grand titre, un lien vers Contact.
export default function ClosingCta({ id, before, accent, linkLabel = 'Me contacter' }) {
  return (
    <section className="section surface--2" aria-labelledby={id}>
      <div className="container">
        <Hairline />
        <div className="grid closing" style={{ paddingTop: 'clamp(40px, 6vw, 80px)' }}>
          <Reveal as="h2" id={id} className="page-title closing__title">
            {before} <span className="accent-italic">{accent}</span>
          </Reveal>
          <Reveal className="closing__link" delay={0.15}>
            <Link to="/contact" className="closing__big-link">
              {linkLabel}
              <ArrowRight className="" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
