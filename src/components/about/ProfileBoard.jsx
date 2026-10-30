import { aboutPage, profile } from '../../data/site.js';
import Panel from '../home/Panel.jsx';
import { HomeMark } from '../home/HomeMark.jsx';

// Présentation : une planche de trois cases. Le texte vient de `profile` (site.js).
// Pas de faux portrait : le monogramme tient lieu d’identité visuelle.
export default function ProfileBoard() {
  const [lead, ...rest] = profile.paragraphs;
  const { sheetTitle, facts } = aboutPage;

  return (
    <section className="nh-ab-profile" aria-label="Présentation">
      <div className="container">
        <div className="nh-ab-board">
          <Panel className="nh-ab-board__lead" poly="polygon(0 0, 100% 0, 97% 100%, 0 100%)">
            <div className="nh-ab-lead">
              <span className="nh-narration__bar" aria-hidden="true" />
              <p>{lead}</p>
            </div>
          </Panel>

          <Panel className="nh-ab-board__text" poly="polygon(0 0, 100% 0, 100% 100%, 4% 100%)" delay={0.12}>
            <div className="nh-ab-text">
              {rest.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Panel>

          <Panel className="nh-ab-board__sheet" poly="polygon(6% 0, 100% 0, 100% 100%, 0 100%)" delay={0.22}>
            <aside className="nh-ab-sheet" aria-label="Identité">
              <h2>{sheetTitle}</h2>
              <dl>
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <HomeMark className="nh-ab-sheet__mark" />
            </aside>
          </Panel>
        </div>
      </div>
    </section>
  );
}
