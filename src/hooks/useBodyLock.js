import { useEffect } from 'react';

// Bloque le défilement de la page tant que `locked` est vrai (menu mobile ouvert).
export default function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    // Compense la disparition de la barre de défilement pour éviter un saut de mise en page.
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
