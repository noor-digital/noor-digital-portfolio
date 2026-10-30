import Header from './Header.jsx';
import Footer from './Footer.jsx';
import AnimatedRoutes from './AnimatedRoutes.jsx';

export default function SiteLayout() {
  // Le lien « Aller au contenu » déplace le focus sans modifier l’URL
  // (une ancre classique ajouterait « #main » à l’adresse et perturberait le routeur).
  function skipToContent(event) {
    event.preventDefault();
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });
    main?.scrollIntoView();
  }

  return (
    <>
      <a href="#main" className="skip-link" onClick={skipToContent}>
        Aller au contenu
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <AnimatedRoutes />
      </main>
      <Footer />
    </>
  );
}
