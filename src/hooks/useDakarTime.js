import { useEffect, useState } from 'react';
import { site } from '../data/site.js';

const format = new Intl.DateTimeFormat('en-GB', {
  timeZone: site.timezone,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

function read() {
  const [hh, mm] = format.format(new Date()).split(':');
  return { hh, mm, hour: Number(hh) + Number(mm) / 60 };
}

// Heure de Dakar (fuseau lu dans site.js). Mise à jour à la minute : l’état ne change que si l’heure affichée change.
export default function useDakarTime() {
  const [time, setTime] = useState(read);
  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = read();
      setTime((current) => (current.hh === next.hh && current.mm === next.mm ? current : next));
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}
