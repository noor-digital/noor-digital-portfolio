// Vrai pendant le tout premier rendu de la page (chargement ou actualisation), puis faux.
// Sert à ne PAS jouer d’animation d’entrée sur ce qui est déjà visible : la page s’affiche
// directement, sans voile noir ni masque. Les animations restent actives au défilement et
// lors des changements de page.
export const firstLoad = { active: true };

export function endFirstLoad() {
  // Après la validation (commit) du premier rendu : les composants rendus ensuite animent normalement.
  window.setTimeout(() => {
    firstLoad.active = false;
  }, 0);
}
