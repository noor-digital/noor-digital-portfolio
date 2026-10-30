// Générateur pseudo-aléatoire déterministe (mulberry32).
// Les décors (skyline, lignes de fuite, poussière) sont générés avec une graine fixe :
// la scène est identique à chaque chargement et ne dépend d’aucune ressource externe.
export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
