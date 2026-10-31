import { contactPage, contactCopy, site } from '../data/site.js';
import { services } from '../data/services.js';

// Logique pure du formulaire de contact : libellés, texte du message, validation, lien mailto.
// Aucune valeur n’est inventée : le message ne contient que ce que le visiteur a saisi.

const t = contactPage.form;

export const MIN_MESSAGE = 10;
export const MAX_MESSAGE = 1500;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const EMPTY = {
  needs: [], // identifiants de services, ou 'other'
  message: '',
  deadline: '',
  date: '',
  name: '',
  email: '',
  phone: '',
  channel: 'email',
  _gotcha: '', // piège à robots : un humain ne le voit pas et ne le remplit jamais
};

export const needLabel = (id) => (id === 'other' ? t.other : (services.find((s) => s.id === id)?.title ?? id));

function formatDate(iso) {
  const [y, m, d] = iso.split('-');
  return y && m && d ? `${d}/${m}/${y}` : iso;
}

export function deadlineLabel(values) {
  if (!values.deadline) return '';
  if (values.deadline === 'date') return values.date ? `le ${formatDate(values.date)}` : 'Date précise';
  return t.deadlines.find((item) => item.id === values.deadline)?.label ?? '';
}

export function buildMessage(values) {
  const lines = ['Bonjour,', '', 'Je vous contacte au sujet d’un projet web.', ''];
  if (values.name.trim()) lines.push(`Nom : ${values.name.trim()}`);
  if (values.email.trim()) lines.push(`E-mail : ${values.email.trim()}`);
  if (values.phone.trim()) lines.push(`Téléphone / WhatsApp : ${values.phone.trim()}`);
  lines.push(`Canal préféré : ${t.channels.find((c) => c.id === values.channel)?.label ?? 'E-mail'}`);
  if (values.needs.length) lines.push(`Besoin : ${values.needs.map(needLabel).join(' ; ')}`);
  const deadline = deadlineLabel(values);
  if (deadline) lines.push(`Échéance : ${deadline}`);
  lines.push('', 'Mon projet :', values.message.trim() || '…', '', 'Cordialement,', values.name.trim());
  return lines.join('\n');
}

export function buildSubject(values) {
  const first = values.needs[0];
  return first ? `${contactCopy.mailSubject} — ${needLabel(first)}` : contactCopy.mailSubject;
}

export function mailtoHref(values) {
  return `mailto:${site.email}?subject=${encodeURIComponent(buildSubject(values))}&body=${encodeURIComponent(buildMessage(values))}`;
}

// Champs envoyés au service de formulaires.
export function buildPayload(values) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    preferred_channel: values.channel,
    needs: values.needs.map(needLabel).join(' ; '),
    deadline: deadlineLabel(values),
    message: values.message.trim(),
    subject: buildSubject(values),
    _replyto: values.email.trim(),
    _gotcha: values._gotcha,
  };
}

// Erreurs de l’étape demandée (0, 1 ou 2). Un objet vide = étape valide.
export function validateStep(step, values) {
  const errors = {};
  if (step === 1 && values.message.trim().length < MIN_MESSAGE) errors.message = t.errors.message;
  if (step === 2) {
    if (!values.name.trim()) errors.name = t.errors.name;
    if (!EMAIL_RE.test(values.email.trim())) errors.email = t.errors.email;
    if (values.channel === 'whatsapp' && values.phone.replace(/\D/g, '').length < 6) errors.phone = t.errors.phone;
  }
  return errors;
}
