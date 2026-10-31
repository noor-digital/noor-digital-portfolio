import { useReducedMotion } from 'motion/react';
import { getRoute, servicesPage, site } from '../data/site.js';
import { services } from '../data/services.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useActiveId from '../hooks/useActiveId.js';
import ServicesHero from '../components/services/ServicesHero.jsx';
import ServicesStack from '../components/services/ServicesStack.jsx';
import WhyMe from '../components/services/WhyMe.jsx';
import ServicesProcess from '../components/services/ServicesProcess.jsx';
import WorkTypes from '../components/services/WorkTypes.jsx';
import AfterContact from '../components/services/AfterContact.jsx';
import Faq from '../components/services/Faq.jsx';
import Testimonials from '../components/services/Testimonials.jsx';
import FloatingCta from '../components/services/FloatingCta.jsx';
import PageClose from '../components/home/PageClose.jsx';
import ScrollRail from '../components/home/ScrollRail.jsx';

const SERVICE_IDS = services.map((service) => service.id);

// Services : hero plein écran → services en « sticky storytelling » → pourquoi moi →
// méthode → types de projet → après votre message → FAQ → témoignages (si renseignés) → clôture.
// Aucune mention financière sur cette page : la conversion passe uniquement par le contact.
// Textes dans data/site.js (servicesPage), services et méthode dans data/services.js.
export default function Services() {
  useDocumentTitle(getRoute('/services'));
  const reduce = useReducedMotion();
  const { closing } = servicesPage;
  const active = useActiveId(SERVICE_IDS, 'services');

  // Défilement fluide vers un service (ou vers la section) ; instantané avec « mouvement réduit ».
  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: id === 'services' ? 'start' : 'center' });
  }

  // Les canaux non confirmés (à null dans site.js) restent masqués.
  const actions = [
    { label: closing.primary, to: '/contact' },
    { label: closing.email, href: `mailto:${site.email}`, variant: 'ghost' },
  ];
  if (site.whatsapp) {
    actions.push({
      label: closing.whatsapp,
      href: `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`,
      external: true,
      variant: 'ghost',
    });
  }

  return (
    <div className="home nh nh-sv">
      <ScrollRail />
      <ServicesHero active={active} onGo={goTo} />
      <ServicesStack active={active} />
      <WhyMe />
      <ServicesProcess />
      <WorkTypes />
      <AfterContact />
      <Faq />
      <Testimonials />
      <PageClose id="services-close" titleLines={closing.titleLines} actions={actions} />
      <FloatingCta />
    </div>
  );
}
