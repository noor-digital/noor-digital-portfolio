import { useState } from 'react';
import { contactPage } from '../../data/site.js';
import TitleReveal from '../home/TitleReveal.jsx';
import Panel from '../home/Panel.jsx';
import ContactForm from './ContactForm.jsx';
import ContactArt from './ContactArt.jsx';

// Tête de page : la phrase, le déroulé en trois temps (une vraie séquence) et la fiche à remplir à droite,
// action principale de la page. La petite enveloppe traduit l’avancement de la fiche (lettre, rayons, tampon).
export default function ContactHead() {
  const { kicker, titleLines, intro, stepsLabel, steps } = contactPage;
  const [art, setArt] = useState({ progress: 0, prepared: false });

  return (
    <section className="nh-ct-hero" aria-label="Contact">
      <div className="container nh-ct-hero__grid">
        <div className="nh-ct-hero__copy">
          <p className="nh-ab-hero__kicker">
            <span className="nh-ab-slash" aria-hidden="true" />
            {kicker}
          </p>
          <TitleReveal as="h1" lines={titleLines} className="nh-hero-title" />
          <p className="nh-ct-hero__sub">{intro}</p>

          <div className="nh-ct-flow">
            <div>
              <p className="nh-ct-flow__label">{stepsLabel}</p>
              <ol className="nh-ct-steps">
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="nh-ct-flow__art">
              <ContactArt progress={art.progress} prepared={art.prepared} />
            </div>
          </div>
        </div>

        <Panel className="nh-ct-panel" poly="polygon(4% 0, 100% 0, 100% 100%, 0 100%)" onMount delay={0.3}>
          <div className="nh-ct-panel__body">
            <ContactForm onState={setArt} />
          </div>
        </Panel>
      </div>
    </section>
  );
}
