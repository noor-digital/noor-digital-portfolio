import { contactPage } from '../../data/site.js';
import { buildMessage } from '../../lib/contactMessage.js';
import Field from './Field.jsx';

// Étape 3 : coordonnées, canal préféré, piège à robots (invisible) et récapitulatif en direct du message.
export default function StepDetails({ values, errors, onChange, uid, nameRef, emailRef, phoneRef }) {
  const t = contactPage.form;
  return (
    <>
      <div className="nh-ct-row">
        <Field id={`${uid}-name`} label={t.nameLabel} error={errors.name}>
          {(aria) => (
            <input
              {...aria}
              ref={nameRef}
              type="text"
              name="name"
              autoComplete="name"
              maxLength={80}
              value={values.name}
              onChange={onChange('name')}
              aria-required="true"
            />
          )}
        </Field>
        <Field id={`${uid}-email`} label={t.emailLabel} error={errors.email}>
          {(aria) => (
            <input
              {...aria}
              ref={emailRef}
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              maxLength={120}
              value={values.email}
              onChange={onChange('email')}
              aria-required="true"
            />
          )}
        </Field>
      </div>

      <Field id={`${uid}-phone`} label={t.phoneLabel} error={errors.phone}>
        {(aria) => (
          <input
            {...aria}
            ref={phoneRef}
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            maxLength={30}
            value={values.phone}
            onChange={onChange('phone')}
          />
        )}
      </Field>

      <fieldset className="nh-ct-fieldset">
        <legend>{t.channelLabel}</legend>
        <div className="nh-ct-chips">
          {t.channels.map((item) => (
            <label className="nh-ct-chip nh-ct-chip--radio" key={item.id}>
              <input
                type="radio"
                name="channel"
                value={item.id}
                checked={values.channel === item.id}
                onChange={onChange('channel')}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Piège à robots : hors écran, ignoré des humains, des lecteurs d’écran et du clavier. */}
      <div className="nh-ct-trap" aria-hidden="true">
        <label>
          {t.honeypot}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={values._gotcha} onChange={onChange('_gotcha')} />
        </label>
      </div>

      <aside className="nh-ct-recap" aria-label={t.recapTitle}>
        <p className="nh-ct-recap__title">{t.recapTitle}</p>
        <pre className="nh-ct-recap__body" tabIndex={0}>
          {buildMessage(values)}
        </pre>
      </aside>
    </>
  );
}
