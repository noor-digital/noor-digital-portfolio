import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../lib/motion.js';
import { contactPage } from '../../data/site.js';
import { MAX_MESSAGE } from '../../lib/contactMessage.js';
import Field from './Field.jsx';

// Étape 2 : le message (compteur animé, amorces cliquables) et l’échéance en puces rapides.
export default function StepProject({ values, errors, onChange, onStarter, onDeadline, uid, messageRef }) {
  const t = contactPage.form;
  const reduce = useReducedMotion();
  const ratio = Math.min(1, values.message.length / MAX_MESSAGE);

  return (
    <>
      <Field id={`${uid}-message`} label={t.messageLabel} error={errors.message}>
        {(aria) => (
          <textarea
            {...aria}
            ref={messageRef}
            name="message"
            rows={6}
            maxLength={MAX_MESSAGE}
            placeholder={t.messagePlaceholder}
            value={values.message}
            onChange={onChange('message')}
            aria-required="true"
          />
        )}
      </Field>

      <div className="nh-ct-counter" aria-hidden="true">
        <span className="nh-ct-counter__track">
          <motion.span
            className="nh-ct-counter__bar"
            initial={false}
            animate={{ scaleX: ratio }}
            transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
          />
        </span>
        <span className="nh-ct-counter__n" data-near={values.message.length > MAX_MESSAGE - 150}>
          {values.message.length} / {MAX_MESSAGE}
        </span>
      </div>

      <div className="nh-ct-starters">
        <span className="nh-ct-starters__label">{t.startersLabel}</span>
        {t.starters.map((starter) => (
          <button type="button" className="nh-ct-chip" key={starter} onClick={() => onStarter(starter)}>
            {starter}
          </button>
        ))}
      </div>

      <fieldset className="nh-ct-fieldset">
        <legend>{t.deadlineLabel}</legend>
        <div className="nh-ct-chips">
          {t.deadlines.map((item) => (
            <label className="nh-ct-chip nh-ct-chip--radio" key={item.id}>
              <input
                type="radio"
                name="deadline"
                value={item.id}
                checked={values.deadline === item.id}
                onChange={() => onDeadline(item.id)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
        {values.deadline === 'date' && (
          <Field id={`${uid}-date`} label={t.dateLabel}>
            {(aria) => <input {...aria} type="date" name="date" value={values.date} onChange={onChange('date')} />}
          </Field>
        )}
      </fieldset>
    </>
  );
}
