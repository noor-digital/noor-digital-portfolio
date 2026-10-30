import { getRoute } from '../data/site.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import AboutHead from '../components/about/AboutHead.jsx';
import ProfileBoard from '../components/about/ProfileBoard.jsx';
import Journey from '../components/about/Journey.jsx';
import Principles from '../components/about/Principles.jsx';
import AboutClose from '../components/about/AboutClose.jsx';
import ScrollRail from '../components/home/ScrollRail.jsx';

// À propos (direction manga) : tête → présentation en cases → parcours → principes → clôture.
// Le contenu vient de site.js (profile, journey, principles, aboutPage) : rien n’est écrit ici.
export default function About() {
  useDocumentTitle(getRoute('/a-propos'));

  return (
    <div className="home nh nh-ab">
      <ScrollRail />
      <AboutHead />
      <ProfileBoard />
      <Journey />
      <Principles />
      <AboutClose />
    </div>
  );
}
