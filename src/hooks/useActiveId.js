import { useEffect, useState } from 'react';

// Retourne l’identifiant de l’élément qui occupe la ligne centrale de l’écran (ou null).
// `ids` : éléments surveillés ; `scopeId` : conteneur global — hors de lui, il n’y a plus d’actif.
// Un seul observateur passif par groupe : aucun écouteur de scroll, aucun rendu inutile.
export default function useActiveId(ids, scopeId) {
  const [active, setActive] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    const targets = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') return undefined;

    const middle = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    targets.forEach((el) => middle.observe(el));

    let scope = null;
    const scopeEl = scopeId ? document.getElementById(scopeId) : null;
    if (scopeEl) {
      scope = new IntersectionObserver(([entry]) => {
        if (entry && !entry.isIntersecting) setActive(null);
      });
      scope.observe(scopeEl);
    }

    return () => {
      middle.disconnect();
      scope?.disconnect();
    };
  }, [key, scopeId]);

  return active;
}
