import ContactWizard from './ContactWizard.jsx';
import ReassurancePanel from './ReassurancePanel.jsx';

// Section formulaire : deux colonnes sur ordinateur (réassurance à gauche, formulaire épinglé à droite) ;
// sur mobile, le formulaire passe d’abord (voir contact.css).
export default function FormSection() {
  return (
    <section id="ct-form-section" className="nh-ct-sec nh-ct-sec--night nh-ct-sec--tight" aria-labelledby="ct-reassure-title">
      <div className="container nh-ct-formgrid">
        <div className="nh-ct-formgrid__side">
          <ReassurancePanel />
        </div>
        <div className="nh-ct-formgrid__main">
          <div className="nh-ct-formcard">
            <ContactWizard />
          </div>
        </div>
      </div>
    </section>
  );
}
