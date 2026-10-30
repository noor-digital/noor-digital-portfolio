import { getRoute } from '../data/site.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import Hero from '../components/home/Hero.jsx';
import Approach from '../components/home/Approach.jsx';
import HomeServices from '../components/home/HomeServices.jsx';
import HomeProjects from '../components/home/HomeProjects.jsx';
import Method from '../components/home/Method.jsx';
import ContactScene from '../components/home/ContactScene.jsx';
import ScrollRail from '../components/home/ScrollRail.jsx';

// Accueil (V4, manga cinématique) : un récit en six temps.
//   Hero (cinématique) → Présentation (cases) → Services (calme) → Projets (bande horizontale)
//   → Méthode et technologies (le rayon descend) → Contact (l’aube).
// L’en-tête et le pied de page propres à l’accueil sont gérés par Header.jsx et Footer.jsx.
export default function Home() {
  useDocumentTitle(getRoute('/'));

  return (
    <div className="home nh">
      <ScrollRail />
      <Hero />
      <Approach />
      <HomeServices />
      <HomeProjects />
      <Method />
      <ContactScene />
    </div>
  );
}
