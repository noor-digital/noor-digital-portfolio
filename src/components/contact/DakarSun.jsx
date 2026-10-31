import { useEffect, useState } from 'react';
import { contactPage, site } from '../../data/site.js';

// Heure de Dakar, en heures décimales (le fuseau vient de site.js).
const hourFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: site.timezone,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});
function dakarHour() {
  const [h, m] = hourFormat.format(new Date()).split(':').map(Number);
  return h + m / 60;
}

// Arc de lumière : le soleil suit l’heure de Dakar (repère indicatif, de 7 h à 19 h) ; la nuit, un croissant
// reste sous l’horizon. Le libellé (matin, après-midi…) dit la même chose en texte.
export default function DakarSun() {
  const t = contactPage.where;
  const [hour, setHour] = useState(dakarHour);

  useEffect(() => {
    const timer = window.setInterval(() => setHour(dakarHour()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const day = hour >= 7 && hour <= 19;
  const angle = (Math.min(19, Math.max(7, hour)) - 7) / 12;
  const x = 100 - Math.cos(angle * Math.PI) * 80;
  const y = 64 - Math.sin(angle * Math.PI) * 52;
  const part = hour < 7 || hour >= 22 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';

  return (
    <div className="nh-ct-sun">
      <svg viewBox="0 0 200 76" aria-hidden="true" focusable="false">
        <path d="M20 64A80 52 0 0 1 180 64" fill="none" stroke="#D7E0EA" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="3 7" />
        <path d="M8 64H192" stroke="#D7E0EA" strokeOpacity="0.5" strokeWidth="2" />
        {day ? (
          <>
            <circle cx={x} cy={y} r="13" fill="#16B8B0" fillOpacity="0.18" />
            <circle cx={x} cy={y} r="7" fill="#16B8B0" />
          </>
        ) : (
          <circle cx="100" cy="72" r="7" fill="#D7E0EA" fillOpacity="0.5" />
        )}
      </svg>
      <p>
        {t.dakarNow} : {t.dayparts[part].toLowerCase()}
      </p>
    </div>
  );
}
