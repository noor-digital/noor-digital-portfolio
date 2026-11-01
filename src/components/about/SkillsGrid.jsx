import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { aboutPage } from '../../data/site.js';
import { skillGroups } from '../../data/skills.js';
import Reveal from '../Reveal.jsx';
import { techIcon } from '../home/techIcons.jsx';
import ServicesIcon from '../services/ServicesIcons.jsx';

// Compétences : les groupes de data/skills.js (Frontend, Backend, Base de données, Outils, Design) avec leurs icônes.
// Aucun pourcentage, aucune barre de niveau. Apparition en cascade, léger effet au survol, lien vers les projets.
export default function SkillsGrid() {
  const t = aboutPage.skills;
  let order = 0;
  return (
    <section className="nh-ab-sec nh-ab-sec--night nh-ab-sec--cut" aria-labelledby="ab-skills-title">
      <div className="container">
        <div className="nh-ab-skills__top">
          <div>
            <Reveal as="h2" className="nh-ab-h2" id="ab-skills-title">
              {t.title}
            </Reveal>
            <Reveal as="p" delay={0.06} className="nh-ab-lead">
              {t.text}
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link className="nh-ab-textlink" to="/projets">
              {t.cta}
              <ServicesIcon name="arrow" size={18} className="nh-sv-arr" />
            </Link>
          </Reveal>
        </div>

        <div className="nh-ab-skills">
          {skillGroups.map((group) => (
            <section className="nh-ab-skills__group nh-ab-card" key={group.id} aria-labelledby={`ab-sk-${group.id}`}>
              <h3 id={`ab-sk-${group.id}`}>{group.label}</h3>
              <ul>
                {group.items.map((item) => {
                  const { node, color } = techIcon(item.icon);
                  const i = order++;
                  return (
                    <motion.li
                      key={item.name}
                      className="nh-ab-skill"
                      style={{ '--brand': color }}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
                      transition={{ duration: 0.5, delay: Math.min(i, 10) * 0.04, ease: EASE }}
                    >
                      <span className="nh-ab-skill__ico">{node}</span>
                      {item.name}
                    </motion.li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
