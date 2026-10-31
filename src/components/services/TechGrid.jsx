import { motion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { servicesPage } from '../../data/site.js';
import { techContext } from '../../data/services.js';
import { techIcon } from '../home/techIcons.jsx';
import SectionHead from './SectionHead.jsx';

// Technologies : le logo, le nom et surtout à quoi la technologie sert dans un projet.
// Même source d’icônes que la section « Technologies et outils » de l’accueil (techIcons.jsx).
export default function TechGrid() {
  const { tech } = servicesPage;
  return (
    <section className="nh-sv-sec nh-sv-sec--navy nh-sv-sec--cut" aria-labelledby="sv-tech-title">
      <div className="container">
        <SectionHead id="sv-tech-title" title={tech.title} text={tech.text} />
        <ul className="nh-sv-tech">
          {techContext.map((item, i) => {
            const { node, color } = techIcon(item.icon);
            return (
              <motion.li
                className="nh-sv-tech__tile"
                key={item.name}
                style={{ '--brand': color }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -6% 0px' }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.07, ease: EASE }}
              >
                <span className="nh-sv-tech__icon">{node}</span>
                <span className="nh-sv-tech__txt">
                  <strong>{item.name}</strong>
                  <span>{item.usage}</span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
