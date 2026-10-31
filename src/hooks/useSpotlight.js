import { useEffect } from 'react';

// Survol « lumineux » d’une carte : un spotlight radial qui suit le curseur (variables CSS --mx / --my)
// et, si `tilt` > 0, une légère inclinaison 3D (en degrés, 4 maximum). Rien n’est stocké dans React :
// on écrit directement les variables CSS (aucun re-rendu). Désactivé au toucher et en mouvement réduit.
export default function useSpotlight(ref, { tilt = 0, enabled = true } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return undefined;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return undefined;

    let frame = 0;
    const onMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect();
        const x = event.clientX - box.left;
        const y = event.clientY - box.top;
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y}px`);
        if (tilt) {
          el.style.setProperty('--ry', `${((x / box.width - 0.5) * 2 * tilt).toFixed(2)}deg`);
          el.style.setProperty('--rx', `${((0.5 - y / box.height) * 2 * tilt).toFixed(2)}deg`);
        }
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.removeProperty('--rx');
      el.style.removeProperty('--ry');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, tilt, enabled]);
}
