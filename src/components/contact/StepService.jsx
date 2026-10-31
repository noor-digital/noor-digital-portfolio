import { contactPage } from '../../data/site.js';
import { services } from '../../data/services.js';
import ServicesIcon from '../services/ServicesIcons.jsx';

// Étape 1 : grandes cartes sélectionnables (cases à cocher natives : clavier et lecteurs d’écran pris en charge nativement).
export default function StepService({ values, onToggle, labelledBy }) {
  const t = contactPage.form;
  const options = [...services.map((s) => ({ id: s.id, label: s.title })), { id: 'other', label: t.other }];
  return (
    <div className="nh-ct-choices" role="group" aria-labelledby={labelledBy}>
      {options.map((option) => (
        <label className="nh-ct-choice" key={option.id}>
          <input
            type="checkbox"
            name="needs"
            value={option.id}
            checked={values.needs.includes(option.id)}
            onChange={() => onToggle(option.id)}
          />
          <span className="nh-ct-choice__box">
            <span className="nh-ct-choice__tick" aria-hidden="true">
              <ServicesIcon name="check" size={16} />
            </span>
            <span>{option.label}</span>
          </span>
        </label>
      ))}
    </div>
  );
}
