import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { servicesPage } from '../../data/site.js';
import { services, process } from '../../data/services.js';
import { skillGroups } from '../../data/skills.js';

// Valeurs calculées depuis les données du site : elles ne peuvent pas devenir fausses toutes seules.
const SOURCES = {
  services: services.length,
  process: process.length,
  tech: skillGroups.reduce((n, group) => n + group.items.length, 0),
};

function Counter({ to }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  const value = useMotionValue(reduce ? to : 0);
  const rounded = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    if (!seen || reduce) return undefined;
    const controls = animate(value, to, { duration: 1.4, ease: EASE });
    return () => controls.stop();
  }, [seen, reduce, to, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

// Chiffres clés : uniquement des faits réels (voir servicesPage.stats dans data/site.js).
export default function StatsStrip() {
  const { label, items } = servicesPage.stats;

  return (
    <dl className="nh-sv-stats" aria-label={label}>
      {items.map((item) => {
        const number = item.value ?? SOURCES[item.source];
        return (
          <div className="nh-sv-stat" key={item.id}>
            <dt className="nh-sv-stat__label">{item.label}</dt>
            <dd className="nh-sv-stat__value">
              {typeof number === 'number' ? (
                <>
                  <Counter to={number} />
                  {item.suffix}
                </>
              ) : (
                item.text
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
