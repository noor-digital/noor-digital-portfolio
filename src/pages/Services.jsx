import { useReducedMotion } from 'motion/react';
import { getRoute, servicesPage } from '../data/site.js';
import { services } from '../data/services.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import ServicesHead from '../components/services/ServicesHead.jsx';
import ServiceSpread from '../components/services/ServiceSpread.jsx';
import ServicesProcess from '../components/services/ServicesProcess.jsx';
import PageClose from '../components/home/PageClose.jsx';
import ScrollRail from '../components/home/ScrollRail.jsx';

// Services (direction manga) : tête avec planche-contact → une double-page par service → méthode → clôture.
// La liste des services et la méthode viennent de services.js ; les textes de la page, de site.js (servicesPage).
export default function Services() {
  useDocumentTitle(getRoute('/services'));
  const reduce = useReducedMotion();
  const { closing, listLabel } = servicesPage;

  // Accès rapide depuis la planche-contact : on défile jusqu’au service.
  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <div className="home nh nh-sv">
      <ScrollRail />
      <ServicesHead onPick={goTo} />

      <section className="nh-sv-main" aria-label={listLabel}>
        <div className="container">
          <div className="nh-sv-items">
            {services.map((service, i) => (
              <ServiceSpread key={service.id} service={service} index={i} total={services.length} />
            ))}
          </div>
        </div>
      </section>

      <ServicesProcess />

      <PageClose
        id="services-close"
        titleLines={closing.titleLines}
        actions={[
          { label: closing.primary, to: '/contact' },
          { label: closing.secondary, to: '/projets', variant: 'ghost' },
        ]}
      />
    </div>
  );
}
