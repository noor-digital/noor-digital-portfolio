import { projectsPage } from '../../data/site.js';
import Cta from '../home/Cta.jsx';

// État vide soigné : on dit pourquoi, et on propose la sortie (réinitialiser les filtres).
export default function EmptyState({ onReset }) {
  const t = projectsPage;
  return (
    <div className="nh-pj-empty">
      <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false">
        <circle cx="28" cy="28" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M40 40l14 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M22 28h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <p className="nh-pj-empty__title">{t.empty.title}</p>
      <p className="nh-pj-empty__text">{t.empty.text}</p>
      <Cta onClick={onReset}>{t.toolbar.reset}</Cta>
    </div>
  );
}
