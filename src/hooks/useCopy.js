import { useCallback, useEffect, useRef, useState } from 'react';

// Copie dans le presse-papiers avec un retour d’état : 'idle' | 'copied' | 'error' (revient à 'idle' après `delay`).
// Retourne [state, copy]. `copy(text)` résout à true si la copie a réussi.
export default function useCopy(delay = 2400) {
  const [state, setState] = useState('idle');
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text) => {
      let ok = true;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(text);
      } catch {
        ok = false;
      }
      setState(ok ? 'copied' : 'error');
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setState('idle'), delay);
      return ok;
    },
    [delay],
  );

  return [state, copy];
}
