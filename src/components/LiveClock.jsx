import { useSyncExternalStore } from 'react';
import { site } from '../data/site.js';

// Horloge de Dakar.
// Un seul minuteur est partagé par toutes les horloges affichées (header, menu, footer) :
// il démarre avec la première et s’arrête avec la dernière. Seules ces petites
// horloges se redessinent — jamais la page entière.

const formatter = new Intl.DateTimeFormat('fr-FR', {
  timeZone: site.timezone,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

const listeners = new Set();
let timerId = null;
let current = formatter.format(new Date());

function tick() {
  const next = formatter.format(new Date());
  if (next !== current) {
    current = next;
    listeners.forEach((listener) => listener());
  }
}

function subscribe(listener) {
  listeners.add(listener);
  if (listeners.size === 1) {
    current = formatter.format(new Date());
    timerId = window.setInterval(tick, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  };
}

// Sans abonné, on lit l’heure directement (les chaînes se comparent par valeur).
const getSnapshot = () => (timerId === null ? formatter.format(new Date()) : current);

export default function LiveClock({ seconds = true, label = 'Dakar' }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const shown = seconds ? time : time.slice(0, 5);

  return (
    <span className="clock" role="group" aria-label={`Heure locale à ${label}`}>
      <span className="mono">{label}</span>
      <span className="mono clock__sep" aria-hidden="true">
        —
      </span>
      <span className="mono clock__time">{shown}</span>
    </span>
  );
}
