import { useEffect, useId, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { contactPage } from '../../data/site.js';
import { services } from '../../data/services.js';
import { hasEndpoint, sendForm } from '../../lib/sendForm.js';
import { EMPTY, buildPayload, validateStep } from '../../lib/contactMessage.js';
import Cta from '../home/Cta.jsx';
import StepService from './StepService.jsx';
import StepProject from './StepProject.jsx';
import StepDetails from './StepDetails.jsx';
import SuccessState from './SuccessState.jsx';
import FallbackState from './FallbackState.jsx';

const LAST = 2;

// Formulaire guidé en trois étapes, une idée par écran. Focus déplacé sur le titre de chaque étape,
// annonces aria-live, validation bienveillante, bouton Retour. L’envoi passe par un service de formulaires
// statique (lib/sendForm.js) ; sans lui, ou en cas d’échec, on propose la messagerie et la copie du message :
// jamais de « message envoyé » si rien n’est parti.
export default function ContactWizard() {
  const t = contactPage.form;
  const reduce = useReducedMotion();
  const uid = useId();

  // /contact?service=<id> (boutons de la page Services) : le besoin est déjà coché.
  const [searchParams] = useSearchParams();
  const presetId = services.find((service) => service.id === searchParams.get('service'))?.id;

  const [values, setValues] = useState(() => ({ ...EMPTY, needs: presetId ? [presetId] : [] }));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | noEndpoint | failed
  const direction = useRef(1);
  const headingRef = useRef(null);
  const messageRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!presetId) return;
    setValues((current) => (current.needs.includes(presetId) ? current : { ...current, needs: [...current.needs, presetId] }));
  }, [presetId]);

  const fallback = status === 'noEndpoint' || status === 'failed';

  // À chaque changement d’étape (ou retour depuis l’écran de repli), le focus va sur le titre de l’étape,
  // sauf au chargement de la page.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step, fallback]);

  const onChange = (key) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };
  const toggleNeed = (id) =>
    setValues((current) => ({
      ...current,
      needs: current.needs.includes(id) ? current.needs.filter((n) => n !== id) : [...current.needs, id],
    }));
  const addStarter = (text) =>
    setValues((current) => {
      const base = current.message.trim();
      return { ...current, message: base ? `${base}\n${text} ` : `${text} ` };
    });
  const setDeadline = (id) => setValues((current) => ({ ...current, deadline: id }));

  function focusFirstError(found) {
    const order = [
      ['message', messageRef],
      ['name', nameRef],
      ['email', emailRef],
      ['phone', phoneRef],
    ];
    const hit = order.find(([key]) => found[key]);
    hit?.[1].current?.focus();
  }

  function goTo(next) {
    direction.current = next > step ? 1 : -1;
    setStep(next);
  }

  async function submitFinal() {
    const found = validateStep(LAST, values);
    setErrors(found);
    if (Object.keys(found).length) return focusFirstError(found);

    // Piège à robots rempli : on s’arrête sans rien envoyer (un humain ne voit jamais ce champ).
    if (values._gotcha) return setStatus('success');
    if (!hasEndpoint) return setStatus('noEndpoint');

    setStatus('sending');
    const ok = await sendForm(buildPayload(values));
    setStatus(ok ? 'success' : 'failed');
  }

  function onSubmit(event) {
    event.preventDefault();
    if (status === 'sending') return;
    if (step < LAST) {
      const found = validateStep(step, values);
      setErrors(found);
      if (Object.keys(found).length) return focusFirstError(found);
      return goTo(step + 1);
    }
    submitFinal();
  }

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, x: direction.current * 28 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction.current * -28 },
        transition: { duration: 0.3, ease: EASE },
      };

  if (status === 'success') {
    return (
      <div className="nh-ct-wizard" id={t.id}>
        <SuccessState />
      </div>
    );
  }

  const titleId = `${uid}-title`;

  return (
    <form className="nh-ct-wizard" id={t.id} onSubmit={onSubmit} noValidate aria-busy={status === 'sending'}>
      <p className="nh-ct-wizard__kicker">{t.title}</p>

      {/* Progression : trois segments, le courant se remplit. */}
      <ol className="nh-ct-progress" aria-hidden="true">
        {t.steps.map((item, i) => (
          <li key={item.title} data-state={i < step ? 'done' : i === step ? 'current' : 'todo'}>
            <motion.span
              initial={false}
              animate={{ scaleX: i <= step ? 1 : 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
            />
          </li>
        ))}
      </ol>
      <p className="nh-ct-wizard__count" aria-hidden="true">
        {t.stepWord} {step + 1} {t.of} {LAST + 1}
      </p>
      <p className="visually-hidden" role="status" aria-live="polite">
        {`${t.stepWord} ${step + 1} ${t.of} ${LAST + 1} : ${t.steps[step].title}`}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={fallback ? 'fallback' : step} className="nh-ct-step" {...motionProps}>
          {fallback ? (
            <FallbackState
              kind={status}
              values={values}
              onRetry={submitFinal}
              onEdit={() => setStatus('idle')}
            />
          ) : (
            <>
              <h3 className="nh-ct-step__title" id={titleId} tabIndex={-1} ref={headingRef}>
                {t.steps[step].title}
              </h3>
              <p className="nh-ct-step__hint">{t.steps[step].hint}</p>

              {step === 0 && <StepService values={values} onToggle={toggleNeed} labelledBy={titleId} />}
              {step === 1 && (
                <StepProject
                  values={values}
                  errors={errors}
                  onChange={onChange}
                  onStarter={addStarter}
                  onDeadline={setDeadline}
                  uid={uid}
                  messageRef={messageRef}
                />
              )}
              {step === 2 && (
                <StepDetails
                  values={values}
                  errors={errors}
                  onChange={onChange}
                  uid={uid}
                  nameRef={nameRef}
                  emailRef={emailRef}
                  phoneRef={phoneRef}
                />
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {!fallback && (
        <div className="nh-ct-wizard__nav">
          {step > 0 ? (
            <button type="button" className="nh-ct-link" onClick={() => goTo(step - 1)}>
              ← {t.back}
            </button>
          ) : (
            <span />
          )}
          {step < LAST ? (
            <Cta type="submit">{t.next}</Cta>
          ) : (
            <Cta type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? t.sending : t.send}
            </Cta>
          )}
        </div>
      )}
    </form>
  );
}
