// Deux flèches au tracé fin, cohérentes avec la direction artistique.

export function ArrowRight({ className = 'btn__icon' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowUpRight({ className = 'btn__icon btn__icon--up' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M3 13L13 3M5 3h8v8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}
