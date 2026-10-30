import { useEffect, useState } from 'react';

// Réagit à une media query CSS (ex. orientation portrait). Valeur initiale lue tout de suite
// pour éviter un premier rendu avec la mauvaise composition.
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);
    setMatches(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
