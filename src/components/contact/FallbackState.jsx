import { contactPage, site } from '../../data/site.js';
import { buildMessage, buildSubject, mailtoHref } from '../../lib/contactMessage.js';
import useCopy from '../../hooks/useCopy.js';
import Cta from '../home/Cta.jsx';

// Quand rien n’est parti (envoi non activé ou échoué) : on le dit clairement et on propose la messagerie
// (mailto prérempli) et la copie du message. `kind` : 'noEndpoint' | 'failed'.
export default function FallbackState({ kind, values, onRetry, onEdit }) {
  const t = contactPage.form;
  const [copyState, copy] = useCopy();
  const failed = kind === 'failed';
  const body = buildMessage(values);
  const subject = buildSubject(values);

  return (
    <div className="nh-ct-fallback">
      <p className="nh-ct-fallback__title" role="alert">
        {failed ? t.failTitle : t.noEndpointTitle}
      </p>
      <p className="nh-ct-fallback__text">{failed ? t.failText : t.noEndpointText}</p>

      <dl className="nh-ct-fallback__meta">
        <div>
          <dt>{t.to}</dt>
          <dd>{site.email}</dd>
        </div>
        <div>
          <dt>{t.subject}</dt>
          <dd>{subject}</dd>
        </div>
      </dl>
      <pre className="nh-ct-recap__body" tabIndex={0}>
        {body}
      </pre>

      <div className="nh-ct-fallback__actions">
        <Cta href={mailtoHref(values)}>{t.openMail}</Cta>
        <Cta
          variant="ghost"
          onClick={() => copy(`${t.to} : ${site.email}\n${t.subject} : ${subject}\n\n${body}`)}
        >
          {t.copy}
        </Cta>
      </div>
      <p className="nh-ct-copystate" data-kind={copyState} role="status" aria-live="polite">
        {copyState === 'copied' ? t.copied : copyState === 'error' ? t.copyError : ''}
      </p>

      <div className="nh-ct-fallback__links">
        {failed && (
          <button type="button" className="nh-ct-link" onClick={onRetry}>
            {t.retry}
          </button>
        )}
        <button type="button" className="nh-ct-link" onClick={onEdit}>
          {t.editAgain}
        </button>
      </div>
    </div>
  );
}
