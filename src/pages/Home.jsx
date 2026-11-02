import { getRoute } from '../data/site.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import Hero from '../components/home/Hero.jsx';
import Approach from '../components/home/Approach.jsx';
import HomeServices from '../components/home/HomeServices.jsx';
import HomeProjects from '../components/home/HomeProjects.jsx';
import ContactScene from '../components/home/ContactScene.jsx';
import ScrollRail from '../components/home/ScrollRail.jsx';

// Accueil : une présentation visuelle courte qui conduit vers les contenus détaillés.
// Le parcours et les compétences sont développés sur À propos ; la méthode complète
// est réservée à Services ; les réalisations détaillées restent sur Projets.
export default function Home() {
  useDocumentTitle(getRoute('/'));

  return (
    <div className="home nh">
      <ScrollRail />
      <Hero />
      <Approach />
      <HomeServices />
      <HomeProjects />
      <ContactScene />
    </div>
  );
}
