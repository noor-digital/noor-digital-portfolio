// Pages qui utilisent la direction artistique « manga cinématique » (en-tête, menu et pied de page
// compris). Les autres pages gardent la direction d’origine (ambre et anthracite) jusqu’à leur tour :
// pour adapter une nouvelle page, ajoutez simplement son chemin ici.
export const MANGA_PATHS = ['/', '/a-propos', '/projets', '/services', '/contact'];

export function isMangaPath(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return MANGA_PATHS.includes(clean);
}
