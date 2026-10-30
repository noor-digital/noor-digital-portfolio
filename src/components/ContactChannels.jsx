import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site.js';
import Reveal from './Reveal.jsx';
import LiveClock from './LiveClock.jsx';
import { ArrowUpRight } from './Icons.jsx';

// Affiche uniquement les canaux confirmés dans src/data/site.js.
// Un canal à `null` (LinkedIn, WhatsApp…) est simplement masqué.
function buildChannels() {
  const channels = [
    {
      key: 'email',
      label: 'E-mail',
      value: site.email,
      href: `mailto:${site.email}`,
      copyable: true,
    },
    {
      key: 'github',
      label: 'GitHub',
      value: site.github.replace(/^https?:\/\//, ''),
      href: site.github,
      external: true,
    },
  ];

  if (site.linkedin) {
    channels.push({
      key: 'linkedin',
      label: 'LinkedIn',
      value: site.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: site.linkedin,
      external: true,
    });
  }

  if (site.whatsapp) {
    channels.push({
      key: 'whatsapp',
      label: 'WhatsApp',
      value: site.whatsapp,
      href: `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`,
      external: true,
    });
  }

  return channels;
}

// Chaque canal est une ligne pleine largeur : l’intitulé, la valeur en grand, une flèche.
// Toute la ligne est cliquable ; le bouton « Copier » reste un contrôle distinct.
export default function ContactChannels() {
  const channels = buildChannels();
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function announce(state, message) {
    setStatus({ state, message });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus({ state: 'idle', message: '' }), 4500);
  }

  async function copyEmail() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(site.email);
      announce('success', 'Adresse copiée.');
    } catch {
      announce('error', 'Copie impossible : sélectionnez l’adresse et copiez-la manuellement.');
    }
  }

  return (
    <div>
      <ul className="channels">
        {channels.map((channel, i) => (
          <Reveal as="li" className="channel" key={channel.key} delay={i * 0.06} y={10}>
            <span className="mono channel__label">{channel.label}</span>
            <a
              className="channel__value"
              href={channel.href}
              {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span>{channel.value}</span>
              {channel.external && (
                <span className="visually-hidden"> (s’ouvre dans un nouvel onglet)</span>
              )}
              <ArrowUpRight className="channel__arrow" aria-hidden="true" />
            </a>
            {channel.copyable && (
              <button type="button" className="copy-btn" onClick={copyEmail}>
                Copier l’adresse
              </button>
            )}
          </Reveal>
        ))}
        <Reveal as="li" className="channel channel--static" delay={channels.length * 0.06} y={10}>
          <span className="mono channel__label">Localisation</span>
          <p className="channel__value channel__value--static">
            <span>{site.location}</span>
          </p>
          <LiveClock />
        </Reveal>
      </ul>

      <p className="form-status" role="status" aria-live="polite" data-state={status.state}>
        {status.message}
      </p>
    </div>
  );
}
