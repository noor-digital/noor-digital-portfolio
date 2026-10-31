// Champ de formulaire : étiquette toujours visible (barre oblique turquoise au focus), champ de 52 px,
// erreur reliée par aria-describedby. `children` : un <input> ou <textarea> déjà configuré via `render`.
export default function Field({ id, label, error, hint, children }) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined;
  return (
    <div className="nh-ct-field" data-invalid={error ? 'true' : undefined}>
      <label htmlFor={id}>{label}</label>
      {children({
        id,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': describedBy,
      })}
      {hint && (
        <p className="nh-ct-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="nh-ct-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
