import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { contactPage, site } from '../../data/site.js';
import TitleReveal from '../home/TitleReveal.jsx';
import Panel from '../home/Panel.jsx';
import LiveClock from '../LiveClock.jsx';
import { ArrowUpRight } from '../Icons.jsx';
import { GithubIcon, LinkedinIcon, MailIcon, WhatsappIcon } from '../home/HomeIcons.jsx';

const POLYS = [
  'polygon(0 0, 100% 0, 98% 100%, 0 100%)',
  'polygon(2% 0, 100% 0, 100% 100%, 0 100%)',
  'polygon(0 0, 100% 0, 100% 100%, 2% 100%)',
  'polygon(0 0, 98% 0, 100% 100%, 0 100%)',
];


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

// Un petit arc de lumière : le soleil suit l’heure de Dakar (repère indicatif, de 7 h à 19 h).
// La nuit, le soleil reste sous la ligne d’horizon. Le libellé (matin, après-midi…) dit la même chose en texte.
function DakarSun() {
  const { channels: t } = contactPage;
  const [hour, setHour] = useState(dakarHour);

  useEffect(() => {
    const timer = window.setInterval(() => setHour(dakarHour()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const day = hour >= 7 && hour <= 19;
  const angle = (Math.min(19, Math.max(7, hour)) - 7) / 12; // 0 à 1 le long de l’arc
  const x = 100 - Math.cos(angle * Math.PI) * 80;
  const y = 64 - Math.sin(angle * Math.PI) * 52;
  const part = hour < 7 || hour >= 22 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';

  return (
    <div className="nh-ct-sun">
      <svg viewBox="0 0 200 76" aria-hidden="true" focusable="false">
        <path d="M20 64A80 52 0 0 1 180 64" fill="none" stroke="#D7E0EA" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="3 7" />
        <path d="M8 64H192" stroke="#D7E0EA" strokeOpacity="0.6" strokeWidth="2" />
        {day ? (
          <rect x={x - 7} y={y - 7} width="14" height="14" fill="#16B8B0" transform={`rotate(45 ${x} ${y})`} />
        ) : (
          <rect x="93" y="70" width="14" height="14" fill="#D7E0EA" fillOpacity="0.55" transform="rotate(45 100 77)" />
        )}
      </svg>
      <p>
        {t.dakarNow} : {t.dayparts[part].toLowerCase()}
      </p>
    </div>
  );
}

// Uniquement les canaux confirmés de src/data/site.js : un canal à `null` (LinkedIn, WhatsApp) reste masqué.
function buildChannels() {
  const { channels: t } = contactPage;
  const list = [
    { key: 'email', label: t.email, value: site.email, href: `mailto:${site.email}`, Icon: MailIcon, copyable: true },
    {
      key: 'github',
      label: 'GitHub',
      value: site.github.replace(/^https?:\/\//, ''),
      href: site.github,
      Icon: GithubIcon,
      external: true,
    },
  ];
  if (site.linkedin) {
    list.push({
      key: 'linkedin',
      label: 'LinkedIn',
      value: site.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: site.linkedin,
      Icon: LinkedinIcon,
      external: true,
    });
  }
  if (site.whatsapp) {
    list.push({
      key: 'whatsapp',
      label: 'WhatsApp',
      value: site.whatsapp,
      href: `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`,
      Icon: WhatsappIcon,
      external: true,
    });
  }
  return list;
}

// Chaque canal est une case : intitulé, valeur en grand, flèche. Toute la case est cliquable (le lien
// s’étend sur elle) ; « Copier l’adresse » reste un contrôle distinct, au-dessus du lien.
export default function ContactCards() {
  const { channelsTitle, channels: t } = contactPage;
  const channels = buildChannels();
  const reduce = useReducedMotion();
  const [status, setStatus] = useState({ kind: 'idle', text: '' });
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const copiedTimer = useRef(null);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      window.clearTimeout(copiedTimer.current);
    },
    [],
  );

  // Inclinaison des cases (pointeur fin uniquement, voir le CSS) : quelques degrés, jamais de glow.
  function tilt(event) {
    if (reduce || event.pointerType !== 'mouse') return;
    const el = event.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--tx', (((event.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--ty', (((event.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  }
  function untilt(event) {
    event.currentTarget.style.setProperty('--tx', '0');
    event.currentTarget.style.setProperty('--ty', '0');
  }

  function announce(kind, text) {
    setStatus({ kind, text });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus({ kind: 'idle', text: '' }), 4500);
  }

  async function copyEmail() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(site.email);
      announce('success', t.copied);
      setCopied(true);
      window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      announce('error', t.copyError);
    }
  }

  return (
    <section className="nh-ct-channels" aria-labelledby="ct-channels-title">
      <div className="container">
        <TitleReveal lines={[channelsTitle]} id="ct-channels-title" />

        <ul className="nh-ct-grid">
          {channels.map(({ key, label, value, href, Icon, external, copyable }, i) => (
            <li
              key={key}
              className={key === 'email' ? 'is-wide' : undefined}
              onPointerMove={tilt}
              onPointerLeave={untilt}
            >
              <Panel className="nh-ct-card" poly={POLYS[i % POLYS.length]} delay={(i % 2) * 0.12}>
                <div className={`nh-ct-card__in${key === 'email' ? ' is-bright' : ''}`}>
                  <Icon size={40} className="nh-ct-card__icon" />
                  <span className="nh-ct-card__label">{label}</span>
                  <a
                    className="nh-ct-card__value"
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span>{value}</span>
                    {external && <span className="visually-hidden"> (s’ouvre dans un nouvel onglet)</span>}
                    <ArrowUpRight className="nh-ct-card__arrow" />
                  </a>
                  {copyable && (
                    <button
                      type="button"
                      className="nh-ct-link nh-ct-card__copy"
                      data-copied={copied}
                      onClick={copyEmail}
                    >
                      {copied ? t.copyDone : t.copy}
                    </button>
                  )}
                </div>
              </Panel>
            </li>
          ))}

          <li onPointerMove={tilt} onPointerLeave={untilt}>
            <Panel className="nh-ct-card" poly={POLYS[channels.length % POLYS.length]} delay={0.12}>
              <div className="nh-ct-card__in">
                <span className="nh-ct-card__label">{t.location}</span>
                <p className="nh-ct-card__value nh-ct-card__value--static">{site.location}</p>
                <div className="nh-ct-card__clock">
                  <LiveClock />
                </div>
                <DakarSun />
              </div>
            </Panel>
          </li>
        </ul>

        <p className="nh-ct-copystate" role="status" aria-live="polite" data-kind={status.kind}>
          {status.text}
        </p>
      </div>
    </section>
  );
}
