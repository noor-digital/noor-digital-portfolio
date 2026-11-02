import { useReducedMotion } from 'motion/react';
import { contactPage, getRoute } from '../data/site.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import ContactHero from '../components/contact/ContactHero.jsx';
import FormSection from '../components/contact/FormSection.jsx';
import WhereWhen from '../components/contact/WhereWhen.jsx';
import ContactFaq from '../components/contact/ContactFaq.jsx';
import OtherChannels from '../components/contact/OtherChannels.jsx';
import ContactFloatingCta from '../components/contact/ContactFloatingCta.jsx';
import PageClose from '../components/home/PageClose.jsx';
import ScrollRail from '../components/home/ScrollRail.jsx';

// Contact : hero (actions rapides) → formulaire guidé en 3 étapes + réassurance → où et quand me joindre →
// FAQ → témoignages (si renseignés) → autres moyens → clôture. Aucune mention financière sur la page.
// Le site est statique : l’envoi passe par un service de formulaires (VITE_FORM_ENDPOINT), avec repli honnête
// sur la messagerie. Textes dans data/site.js (contactPage) ; canaux et engagements lus dans `site`.
export default function Contact() {
  useDocumentTitle(getRoute('/contact'));
  const reduce = useReducedMotion();
  const { closing } = contactPage;

  // Défilement fluide vers le formulaire, puis focus sur sa première question.
  function goToForm() {
    const section = document.getElementById('ct-form-section');
    section?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(
      () => document.querySelector('#ct-form .nh-ct-step__title')?.focus({ preventScroll: true }),
      reduce ? 0 : 600,
    );
  }

  return (
    <div className="home nh nh-ct">
      <ScrollRail />
      <ContactHero onWrite={goToForm} />
      <FormSection />
      <WhereWhen />
      <ContactFaq />
      <OtherChannels />
      <PageClose
        id="contact-close"
        titleLines={closing.titleLines}
        actions={[
          { label: closing.primary, to: '/projets' },
          { label: closing.secondary, to: '/services', variant: 'ghost' },
        ]}
      />
      <ContactFloatingCta onWrite={goToForm} />
    </div>
  );
}
