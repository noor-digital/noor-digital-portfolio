// Envoi réel du formulaire de contact, sans backend : un service de formulaires statique reçoit le message
// et le transmet par e-mail. Compatible Formspree (https://formspree.io/f/xxxx) et Web3Forms
// (https://api.web3forms.com/submit + clé publique). Aucune clé secrète n’est jamais nécessaire :
// l’adresse du service et la clé publique sont lues au BUILD depuis l’environnement :
//   VITE_FORM_ENDPOINT    (obligatoire pour activer l’envoi, en https)
//   VITE_FORM_ACCESS_KEY  (Web3Forms uniquement : clé publique)
// Sans endpoint, `hasEndpoint` vaut false et le formulaire propose directement la messagerie.

const ENDPOINT = String(import.meta.env.VITE_FORM_ENDPOINT ?? '').trim();
const ACCESS_KEY = String(import.meta.env.VITE_FORM_ACCESS_KEY ?? '').trim();

export const hasEndpoint = ENDPOINT.startsWith('https://');

// Retourne true UNIQUEMENT si le service a confirmé la réception. Toute autre issue (réseau, délai dépassé,
// refus, réponse inattendue) retourne false : l’interface ne dit alors jamais « envoyé ».
export async function sendForm(fields) {
  if (!hasEndpoint) return false;

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 15000);
  try {
    const body = { ...fields };
    if (ACCESS_KEY) body.access_key = ACCESS_KEY;

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!response.ok) return false;

    const data = await response.json().catch(() => ({}));
    return data.ok !== false && data.success !== false;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timer);
  }
}
