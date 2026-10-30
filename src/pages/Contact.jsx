import { contactPage, getRoute } from '../data/site.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import ContactHead from '../components/contact/ContactHead.jsx';
import ContactCards from '../components/contact/ContactCards.jsx';
import PageClose from '../components/home/PageClose.jsx';
import ScrollRail from '../components/home/ScrollRail.jsx';

// Contact (direction manga) : tête avec la fiche à remplir → autres canaux → clôture.
// Le portfolio est statique, sans backend : le contact passe par un vrai lien e-mail, jamais par un faux envoi.
// Textes dans site.js (contactPage, contactCopy) ; canaux lus dans `site` (un canal à null reste masqué).
export default function Contact() {
  useDocumentTitle(getRoute('/contact'));
  const { closing } = contactPage;

  return (
    <div className="home nh nh-ct">
      <ScrollRail />
      <ContactHead />
      <ContactCards />
      <PageClose
        id="contact-close"
        titleLines={closing.titleLines}
        actions={[
          { label: closing.primary, to: '/projets' },
          { label: closing.secondary, to: '/services', variant: 'ghost' },
        ]}
      />
    </div>
  );
}
