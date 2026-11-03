// ─────────────────────────────────────────────────────────────
// Identité et valeurs de Mamadou Dia Seck : tout ce qui touche à la dimension musulmane du portfolio
// se règle ici (textes arabes, traductions, valeurs, citation), sans toucher aux composants.
//
// Règles de ce fichier :
//  - Le texte arabe est copié tel quel (avec voyelles brèves) : ne le retapez pas, ne le « nettoyez » pas.
//  - Toute citation (Coran, hadith) doit avoir sa référence vérifiée. N’en ajoutez pas sans source fiable.
//  - Les valeurs sont présentées comme des principes et des objectifs, jamais comme des qualités acquises.
// ─────────────────────────────────────────────────────────────

const NBSP = '\u00a0';

// Formule d’ouverture, affichée une seule fois (page À propos). Texte arabe : « بسم الله الرحمن الرحيم ».
export const basmala = {
  ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  fr: 'Au nom d’Allah, le Tout Miséricordieux, le Très Miséricordieux.',
};

// Le nom NOOR, en arabe : « نور » (lumière). Détail calligraphique décoratif (masqué aux lecteurs d’écran,
// car le sens est déjà donné en français juste à côté).
export const noor = { ar: 'نور', fr: 'lumière' };

// Section « Mes valeurs » de la page À propos.
export const valuesSection = {
  title: 'Mes valeurs',
  lead: 'Quatre principes qui guident ma façon de travailler. Ce sont des repères et des objectifs que je m’efforce de tenir, pas des qualités acquises une fois pour toutes.',
  // Une valeur par carte : nom arabe, transcription, sens en une ligne, puis le lien avec le métier.
  items: [
    {
      key: 'amanah',
      ar: 'الأمانة',
      name: 'Amanah',
      gloss: 'Confiance et responsabilité',
      text: 'Quand on me confie un projet, j’en suis responsable : je cherche à tenir mes engagements, à protéger les accès et les données qu’on me confie, et à prévenir sans attendre quand quelque chose bloque.',
    },
    {
      key: 'ihsan',
      ar: 'الإحسان',
      name: 'Ihsan',
      gloss: 'Recherche de l’excellence',
      text: 'Faire de mon mieux, y compris pour ce qui ne se voit pas : un code lisible, un focus visible, un message d’erreur clair. Je cherche à progresser à chaque projet plutôt qu’à me contenter du minimum.',
    },
    {
      key: 'sidq',
      ar: 'الصدق',
      name: 'Sidq',
      gloss: 'Sincérité et honnêteté',
      text: 'Dire les choses telles qu’elles sont : ce que je maîtrise, ce que j’apprends encore, ce qui est réaliste. Pas de promesse en l’air ni de compétence gonflée ; si une solution ne convient pas à votre besoin, je le dis.',
    },
    {
      key: 'itqan',
      ar: 'الإتقان',
      name: 'Itqan',
      gloss: 'Travail soigné et rigoureux',
      text: 'Prendre le temps de bien faire : structurer, tester, relire, expliquer. Un travail soigné se reconnaît à ce qu’il reste solide et facile à reprendre, longtemps après la livraison.',
    },
  ],

  // Une seule citation sur tout le site, sur la recherche de l’excellence (ihsan) dans le travail.
  // Source vérifiée : Sahih Muslim, n° 1955 (hadith de Shaddad ibn Aws), repris aussi dans les Quarante Hadiths
  // de l’imam an-Nawawi (n° 17). On cite ici la phrase d’ouverture, qui énonce le principe général.
  quote: {
    label: 'L’excellence, en une phrase',
    ar: 'إِنَّ اللَّهَ كَتَبَ الْإِحْسَانَ عَلَى كُلِّ شَيْءٍ',
    fr: 'Allah a prescrit l’excellence en toute chose.',
    source: 'Hadith rapporté par Muslim, n° 1955, d’après Shaddad ibn Aws',
  },
};
