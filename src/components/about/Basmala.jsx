import { basmala } from '../../data/values.js';
import Reveal from '../Reveal.jsx';
import { OrnamentRule } from '../islamic/Geometry.jsx';

// Seuil de la présentation personnelle : la formule d’ouverture, sa traduction, puis un filet orné.
// Affichée une seule fois sur tout le site. Texte arabe : lang="ar" + dir="rtl" (sens de lecture et césure corrects) ;
// la traduction française est visible, donc aucun libellé caché n’est nécessaire.
export default function Basmala() {
  return (
    <Reveal as="figure" className="isl-basmala">
      <p className="isl-ar isl-basmala__ar" lang="ar" dir="rtl">
        {basmala.ar}
      </p>
      <figcaption className="isl-basmala__fr">{basmala.fr}</figcaption>
      <OrnamentRule />
    </Reveal>
  );
}
