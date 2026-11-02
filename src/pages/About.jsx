import { aboutPage, getRoute } from '../data/site.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useMediaQuery from '../hooks/useMediaQuery.js';
import AboutHero from '../components/about/AboutHero.jsx';
import IdentityIntro from '../components/about/IdentityIntro.jsx';
import WhyNoor from '../components/about/WhyNoor.jsx';
import Timeline from '../components/about/Timeline.jsx';
import SkillsGrid from '../components/about/SkillsGrid.jsx';
import Principles from '../components/about/Principles.jsx';
import AboutFloatingCta from '../components/about/AboutFloatingCta.jsx';
import PageClose from '../components/home/PageClose.jsx';
import ScrollRail from '../components/home/ScrollRail.jsx';

// À propos : hero → qui je suis (+ fiche) → pourquoi NOOR → parcours → compétences → ma manière de travailler →
// travaillons ensemble → clôture. Tout vient de data/site.js (aboutPage, profile, studio, journey, principles, site) et
// de data/skills.js : rien n’est écrit ici, rien n’est inventé. Champs vides (photo, CV, dates, LinkedIn, WhatsApp) masqués.
export default function About() {
  useDocumentTitle(getRoute('/a-propos'));
  const { closing } = aboutPage;
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  function scrollToIntro() {
    document.getElementById('ab-who')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  return (
    <div className="home nh nh-ab">
      <ScrollRail />
      <AboutHero onScrollDown={scrollToIntro} />
      <IdentityIntro />
      <WhyNoor />
      <Timeline />
      <SkillsGrid />
      <Principles />
      <PageClose
        id="about-close"
        titleLines={closing.titleLines}
        actions={[
          { label: closing.primary, to: '/contact' },
          { label: closing.secondary, to: '/projets', variant: 'ghost' },
        ]}
      />
      <AboutFloatingCta />
    </div>
  );
}
