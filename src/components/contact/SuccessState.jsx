import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { contactPage, servicesPage, site } from '../../data/site.js';
import Cta from '../home/Cta.jsx';

// Écran de succès : affiché UNIQUEMENT quand le service d’envoi a confirmé la réception.
export default function SuccessState() {
  const t = contactPage.form.success;
  const reduce = useReducedMotion();
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="nh-ct-success">
      <svg className="nh-ct-success__mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        <motion.path
          d="M19 33l9 9 17-19"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
        />
      </svg>
      <h3 className="nh-ct-success__title" tabIndex={-1} ref={headingRef} role="status">
        {t.title}
      </h3>
      <p className="nh-ct-success__text">{t.text}</p>

      <ol className="nh-ct-success__steps">
        {servicesPage.after.items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </li>
        ))}
      </ol>
      {site.responseTime && (
        <p className="nh-ct-success__time">
          {contactPage.reassure.responseLabel} : {site.responseTime}
        </p>
      )}

      <div className="nh-ct-success__actions">
        <Cta to="/projets">{t.projects}</Cta>
        <Cta to="/" variant="ghost">
          {t.home}
        </Cta>
      </div>
    </div>
  );
}
