import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { contactCopy, contactPage, site } from '../../data/site.js';
import { services } from '../../data/services.js';
import Cta from '../home/Cta.jsx';

const EMPTY = { name: '', type: '', deadline: '', message: '' };
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 1500;

// Texte du message : uniquement ce que le visiteur a saisi, sans rien ajouter qui ne soit vrai.
function buildMessage({ name, type, deadline, message }) {
  const lines = ['Bonjour,', '', 'Je vous contacte au sujet d’un projet web.', ''];
  lines.push(`Nom : ${name.trim()}`);
  if (type) lines.push(`Type de projet : ${type}`);
  if (deadline.trim()) lines.push(`Échéance souhaitée : ${deadline.trim()}`);
  lines.push('', 'Contexte et objectif :', message.trim(), '', 'Cordialement,', name.trim());
  return lines.join('\n');
}

// Avancement de la fiche (0 à 1) : il pilote l’illustration. Le texte compte plus que le reste,
// et progresse au fil de la frappe plutôt que d’un coup.
function progressOf(values) {
  const name = values.name.trim() ? 0.2 : 0;
  const message = Math.min(1, values.message.trim().length / 80) * 0.5;
  const type = values.type ? 0.15 : 0;
  const deadline = values.deadline.trim() ? 0.15 : 0;
  return name + message + type + deadline;
}

// « Formulaire » honnête : le site est statique, il ne peut rien envoyer. On prépare donc un e-mail
// (lien mailto) à partir des champs, puis on dit clairement que l’envoi se fait depuis la messagerie.
// Si aucune messagerie ne s’ouvre, le message reste affiché et copiable.
export default function ContactForm({ onState }) {
  const { form: t } = contactPage;
  const reduce = useReducedMotion();
  const uid = useId();
  // /contact?service=<id> (boutons de la page Services) : le type de projet est déjà choisi.
  // Un identifiant inconnu est ignoré ; le visiteur peut toujours modifier la sélection.
  const [searchParams] = useSearchParams();
  const presetService = services.find((service) => service.id === searchParams.get('service'));
  const [values, setValues] = useState(() => ({ ...EMPTY, type: presetService ? presetService.title : '' }));
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(null); // { href, subject, body }
  const [copyState, setCopyState] = useState({ kind: 'idle', text: '' });

  const nameRef = useRef(null);
  const messageRef = useRef(null);

  // Si l’adresse change sans quitter la page (autre bouton « service »), la sélection suit.
  useEffect(() => {
    if (presetService) setValues((current) => ({ ...current, type: presetService.title }));
  }, [presetService]);

  const id = (key) => `${uid}-${key}`;
  const options = [...services.map((service) => service.title), t.typeOther];

  const progress = useMemo(() => progressOf(values), [values]);
  const nameOk = values.name.trim().length > 0;
  const messageOk = values.message.trim().length >= MIN_MESSAGE;
  const requiredDone = Number(nameOk) + Number(messageOk);

  // L’illustration de la page lit l’avancement et l’état « e-mail prêt ».
  useEffect(() => {
    onState?.({ progress, prepared: Boolean(prepared) });
  }, [progress, prepared, onState]);

  function update(key) {
    return (event) => {
      const { value } = event.target;
      setValues((current) => ({ ...current, [key]: value }));
      if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
      // Toute modification invalide l’aperçu précédent : on ne présente jamais un message périmé.
      if (prepared) setPrepared(null);
    };
  }

  function onSubmit(event) {
    event.preventDefault();
    const next = {};
    if (!nameOk) next.name = t.errors.name;
    if (!messageOk) next.message = t.errors.message;
    setErrors(next);

    if (next.name) return nameRef.current?.focus();
    if (next.message) return messageRef.current?.focus();

    const subject = values.type ? `${contactCopy.mailSubject} — ${values.type}` : contactCopy.mailSubject;
    const body = buildMessage(values);
    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared({ href, subject, body });
    setCopyState({ kind: 'idle', text: '' });
    window.location.href = href;
  }

  async function copyMessage() {
    if (!prepared) return;
    const text = `${t.to} : ${site.email}\n${t.subject} : ${prepared.subject}\n\n${prepared.body}`;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      setCopyState({ kind: 'success', text: t.copied });
    } catch {
      setCopyState({ kind: 'error', text: t.copyError });
    }
  }

  return (
    <form className="nh-ct-form" onSubmit={onSubmit} noValidate>
      <h2 className="nh-ct-form__title">{t.title}</h2>
      <p className="nh-ct-form__note">{t.note}</p>

      {/* Avancement : la barre se remplit avec la fiche ; le texte dit ce qu’il reste d’obligatoire. */}
      <div className="nh-ct-meter">
        <span className="nh-ct-meter__track" aria-hidden="true">
          <motion.span
            className="nh-ct-meter__bar"
            initial={false}
            animate={{ scaleX: Math.min(1, progress) }}
            transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
          />
        </span>
        <p className="nh-ct-meter__text" data-ready={requiredDone === 2}>
          {requiredDone === 2 ? t.meterReady : `${requiredDone} ${t.meterOf} 2 ${t.meterLabel}`}
        </p>
      </div>

      <div className="nh-ct-field">
        <label htmlFor={id('name')}>{t.name}</label>
        <input
          ref={nameRef}
          id={id('name')}
          type="text"
          name="name"
          autoComplete="name"
          maxLength={80}
          value={values.name}
          onChange={update('name')}
          aria-required="true"
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? id('name-error') : undefined}
        />
        {errors.name && (
          <p className="nh-ct-error" id={id('name-error')}>
            {errors.name}
          </p>
        )}
      </div>

      <div className="nh-ct-field">
        <label htmlFor={id('type')}>{t.type}</label>
        <select id={id('type')} name="type" value={values.type} onChange={update('type')}>
          <option value="">{t.typePlaceholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="nh-ct-field">
        <label htmlFor={id('message')}>{t.message}</label>
        <textarea
          ref={messageRef}
          id={id('message')}
          name="message"
          rows={5}
          maxLength={MAX_MESSAGE}
          value={values.message}
          onChange={update('message')}
          aria-required="true"
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={`${id('message-hint')}${errors.message ? ` ${id('message-error')}` : ''}`}
        />
        <p className="nh-ct-hint nh-ct-hint--row" id={id('message-hint')}>
          <span>{t.messageHint}</span>
          <span className="nh-ct-count" aria-hidden="true" data-near={values.message.length > MAX_MESSAGE - 150}>
            {values.message.length} / {MAX_MESSAGE}
          </span>
        </p>
        {errors.message && (
          <p className="nh-ct-error" id={id('message-error')}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="nh-ct-field">
        <label htmlFor={id('deadline')}>{t.deadline}</label>
        <input
          id={id('deadline')}
          type="text"
          name="deadline"
          maxLength={80}
          value={values.deadline}
          onChange={update('deadline')}
          aria-describedby={id('deadline-hint')}
        />
        <p className="nh-ct-hint" id={id('deadline-hint')}>
          {t.deadlineHint}
        </p>
      </div>

      <div className="nh-ct-form__actions">
        <Cta type="submit">{t.submit}</Cta>
      </div>

      <p className="visually-hidden" role="status" aria-live="polite">
        {prepared ? t.readyTitle : ''}
      </p>

      <AnimatePresence initial={false}>
        {prepared && (
          <motion.div
            key="ready"
            className="nh-ct-ready"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="nh-ct-ready__in">
              <p className="nh-ct-ready__title">{t.readyTitle}</p>
              <p className="nh-ct-ready__text">{t.readyText}</p>
              <dl className="nh-ct-ready__meta">
                <div>
                  <dt>{t.to}</dt>
                  <dd>{site.email}</dd>
                </div>
                <div>
                  <dt>{t.subject}</dt>
                  <dd>{prepared.subject}</dd>
                </div>
              </dl>
              <pre className="nh-ct-ready__body" tabIndex={0}>
                {prepared.body}
              </pre>
              <div className="nh-ct-ready__actions">
                <a className="nh-ct-link" href={prepared.href}>
                  {t.reopen}
                </a>
                <button type="button" className="nh-ct-link" onClick={copyMessage}>
                  {t.copy}
                </button>
              </div>
              <p className="nh-ct-copystate" data-kind={copyState.kind} role="status" aria-live="polite">
                {copyState.text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
