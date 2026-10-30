// ─────────────────────────────────────────────────────────────
// Contenu éditable du site. Modifiez les textes ici : aucun
// besoin de toucher aux composants React.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'NOOR DIGITAL',
  signature: 'La lumière qui structure',
  // La personne derrière NOOR DIGITAL : c’est elle que le visiteur doit identifier en premier.
  owner: 'Mamadou Dia Seck',
  jobTitle: 'Full Stack Web Developer',
  stackLine: 'PHP · Laravel · JavaScript',
  role: 'Full Stack Web Developer | PHP • Laravel • JavaScript',
  location: 'Dakar, Sénégal',
  timezone: 'Africa/Dakar',
  email: 'papeseck.dev@gmail.com',
  github: 'https://github.com/noor-digital',
  // Adresse publique du site (utilisée pour les balises canoniques et le sitemap).
  siteUrl: 'https://noor-digital.github.io/noor-digital-portfolio/',

  // Canaux non confirmés : laissez `null`, ils restent masqués.
  // Exemple : linkedin: 'https://www.linkedin.com/in/votre-profil'
  linkedin: null,
  whatsapp: null,
};

// Les cinq pages. `title` et `description` alimentent <title> et <meta description>
// (aussi bien dans l'application que dans les fichiers HTML générés au build).
export const routes = [
  {
    path: '/',
    index: '01',
    label: 'Accueil',
    title: 'NOOR DIGITAL — Développeur web full stack à Dakar',
    description:
      'Portfolio de NOOR DIGITAL : développeur web full stack (PHP, Laravel, JavaScript) basé à Dakar. La lumière qui structure.',
  },
  {
    path: '/a-propos',
    index: '02',
    label: 'À propos',
    title: 'À propos — NOOR DIGITAL',
    description:
      'Développeur web et étudiant en informatique à l’UVS, formé au Full Stack Web Development. Parcours, méthode et principes de travail.',
  },
  {
    path: '/projets',
    index: '03',
    label: 'Projets',
    title: 'Projets — NOOR DIGITAL',
    description:
      'Six projets web en HTML, CSS et JavaScript : site vitrine, outils du quotidien, application météo et boutique de démonstration. Code source sur GitHub.',
  },
  {
    path: '/services',
    index: '04',
    label: 'Services',
    title: 'Services — NOOR DIGITAL',
    description:
      'Développement de sites web, intégration d’interfaces responsive et fonctionnalités dynamiques pour les entreprises. Une méthode de travail simple en quatre étapes.',
  },
  {
    path: '/contact',
    index: '05',
    label: 'Contact',
    title: 'Contact — NOOR DIGITAL',
    description:
      'Contactez NOOR DIGITAL par e-mail pour un projet de site ou d’application web. Basé à Dakar, Sénégal.',
  },
];

export const getRoute = (path) => routes.find((route) => route.path === path);

export const notFoundMeta = {
  title: 'Page introuvable — NOOR DIGITAL',
  description: 'Cette page n’existe pas. Retournez à l’accueil du portfolio NOOR DIGITAL.',
};

export const hero = {
  intro:
    'Je conçois et développe des expériences web modernes, structurées et adaptées aux besoins réels des projets.',
};

// Présentation de NOOR DIGITAL : une identité personnelle, pas une agence.
// Les faits ci-dessous viennent uniquement des informations déjà confirmées
// (voir `site`, `journey`). Ajoutez-en d’autres seulement s’ils sont vérifiés.
export const studio = {
  statement: 'NOOR DIGITAL est le nom sous lequel je présente mon travail.',
  text: [
    'Noor signifie « lumière ». Le nom résume ma façon de travailler : mettre en évidence l’essentiel, structurer le reste, et éviter l’effet inutile.',
    'Derrière ce nom, il n’y a pas une agence : il y a un seul développeur, qui construit et signe son travail.',
  ],
  facts: [
    { label: 'Métier', value: 'Full Stack Web Developer' },
    { label: 'Technologies', value: 'PHP · Laravel · JavaScript · MySQL' },
    { label: 'Études', value: 'UVS — Licence 2 en informatique' },
    { label: 'Basé à', value: 'Dakar, Sénégal' },
  ],
};

export const profile = {
  paragraphs: [
    'Je suis Mamadou Dia Seck, étudiant en informatique à l’UVS, spécialisé dans le développement web et d’applications mobiles. J’ai terminé une formation Full Stack Web Development.',
    'Je conçois des interfaces et des applications dynamiques avec HTML, CSS, JavaScript, React, PHP, Laravel et MySQL, en cherchant un code clair et facile à maintenir.',
    'Je m’intéresse à la création de solutions numériques utiles, maintenables et adaptées aux besoins des entreprises.',
  ],
};

// Uniquement des informations confirmées. N’ajoutez pas de dates ou de diplômes
// tant qu’ils ne sont pas vérifiés.
export const journey = [
  { label: 'Études', title: 'UVS — Licence 2 en informatique', status: 'Étudiant' },
  { label: 'Formation', title: 'Full Stack Web Development', status: 'Terminée' },
];

export const principles = [
  {
    title: 'Clarté',
    text: 'Une interface doit se comprendre au premier regard. Je cherche le texte, la hiérarchie et les gestes les plus simples.',
  },
  {
    title: 'Structure',
    text: 'Un bon site repose sur une architecture lisible : contenu séparé de la présentation, composants réutilisables, code facile à reprendre.',
  },
  {
    title: 'Précision',
    text: 'Les détails comptent : espacements, états de focus, comportement sur mobile, textes d’erreur. Je vérifie avant de livrer.',
  },
  {
    title: 'Lumière',
    text: 'Comme le nom l’indique, noor : mettre en évidence l’essentiel et laisser le reste en retrait, sans effet inutile.',
  },
];

// Phrase de clôture de l’accueil : « Parlons de votre projet. » (le dernier mot est en ambre).
export const closing = {
  before: 'Parlons de votre',
  accent: 'projet.',
};

export const contactCopy = {
  // Une entrée par ligne du titre (voir PageTitle).
  titleLines: ['Parlons de', 'votre projet.'],
  intro:
    'Un site à créer, une interface à améliorer ou une idée à structurer : décrivez votre projet en quelques lignes par e-mail.',
  mailSubject: 'Projet web',
  mailBody:
    'Bonjour,\n\nJe vous contacte au sujet d’un projet web.\n\nContexte :\nObjectif :\nÉchéance souhaitée :\n\nCordialement,',
};

// ─────────────────────────────────────────────────────────────
// Page d’accueil (V4 — manga cinématique). Tout ce qui s’affiche sur « / » se règle ici.
// Les faits (métier, technologies, formation, lieu) viennent des données confirmées ci-dessus.
// Les services, projets, méthode et technologies sont lus directement dans
// services.js, projects.js et skills.js : un seul endroit à modifier.
// ─────────────────────────────────────────────────────────────

const studioFact = (label) => studio.facts.find((fact) => fact.label === label)?.value ?? '';

export const home = {
  hero: {
    brand: 'NOOR DIGITAL',
    byline: `${site.owner}, étudiant en informatique et développeur web à Dakar`,
    // Une entrée par ligne du titre. La seconde est dessinée « au trait » : la structure.
    titleLines: ['La lumière', 'qui structure.'],
    intro:
      'Je conçois et développe des expériences digitales et des applications web modernes, rapides et accessibles, en alliant code propre, design soigné et interface fluide.',
    primary: 'Voir les projets',
    secondary: 'Me contacter',
    scrollLabel: 'Découvrir',
  },

  // Présentation : le nom, la façon de travailler, et la fiche (faits confirmés uniquement).
  approach: {
    title: ['Mettre en lumière l’essentiel.', 'Structurer le reste.'],
    lead: 'NOOR DIGITAL est l’identité d’un développeur passionné par la création de solutions web modernes et utiles.',
    meaning: {
      title: 'Noor signifie « lumière ».',
      text: 'Le nom résume ma façon de travailler : mettre en évidence l’essentiel, structurer le reste, et éviter l’effet inutile.',
    },
    solo: {
      title: 'Derrière ce nom, un seul développeur.',
      text: 'Pas une agence : une personne qui construit et signe son travail, de la structure des pages jusqu’à la mise en ligne.',
    },
    promise: 'Je construis des expériences digitales qui allient performance, accessibilité et design.',
    sheetTitle: 'Fiche',
    facts: [
      { label: 'Métier', value: 'Développeur Web Full Stack' },
      { label: 'Technologies', value: 'PHP, Laravel, JavaScript, MySQL' },
      { label: 'Formation', value: studioFact('Études') },
      { label: 'Basé à', value: site.location },
    ],
  },

  services: {
    title: 'Ce que je construis pour vous',
    text: 'Quatre services, un même point de départ : une structure claire, pensée avant d’écrire la première ligne de code.',
    deliverablesLabel: 'Ce que vous recevez',
  },

  projects: {
    title: 'Projets',
    text: 'Une sélection de projets web que j’ai réalisés pour développer mes compétences et explorer différentes technologies.',
    link: 'Voir tous les projets',
    code: 'Code source',
    details: 'Voir le projet',
    // Illustrations originales tant qu’aucune capture n’est renseignée (champ `image` de projects.js :
    // dès qu’il existe, la capture remplace l’illustration et cette note peut être supprimée).
    note: 'Illustrations originales de NOOR DIGITAL : ce ne sont pas des captures d’écran.',
  },

  method: {
    title: 'Une méthode en quatre temps',
    text: 'Chaque projet suit le même fil, de la première discussion à la mise en ligne.',
  },

  tech: {
    title: 'Technologies',
    text: 'Les outils que j’utilise aujourd’hui, sans niveaux ni pourcentages.',
  },

  contact: {
    title: closing.before + ' ' + closing.accent,
    text: contactCopy.intro,
    primary: 'Écrire un e-mail',
    secondary: 'Page contact',
    socialLabel: 'Aussi sur',
  },

  // Crédits (affichés dans le pied de page si la liste n’est pas vide). Aucune photographie
  // n’est utilisée sur cette version de l’accueil : toutes les images sont des illustrations originales.
  credits: [],
};

// ─────────────────────────────────────────────────────────────
// Page À propos (direction manga). Les faits viennent de `profile`, `journey` et `principles`
// ci-dessus (informations confirmées) ; ici seulement les titres et la mise en scène.
// ─────────────────────────────────────────────────────────────

export const aboutPage = {
  kicker: 'À propos',
  titleLines: ['Mamadou Dia', 'Seck.'],
  sub: studio.statement,
  // Trois repères, uniquement des faits confirmés (voir `journey`).
  credentials: [
    { label: 'Études', value: 'Étudiant en informatique, UVS' },
    { label: 'Spécialité', value: 'Web et applications mobiles' },
    { label: 'Formation', value: 'Full Stack Web Development, terminée' },
  ],
  sheetTitle: 'Fiche',
  facts: [
    { label: 'Basé à', value: site.location },
    { label: 'Orientation', value: site.jobTitle },
  ],
  journeyTitle: 'Parcours',
  principlesTitle: 'Ma manière de travailler',
  closing: {
    titleLines: ['Parlons de', 'votre projet.'],
    primary: 'Me contacter',
    secondary: 'Voir les projets',
  },
};

// ─────────────────────────────────────────────────────────────
// Page Projets (direction manga). La liste des projets vient de projects.js ; ici seulement les textes de la page.
// ─────────────────────────────────────────────────────────────

export const projectsPage = {
  title: 'Projets',
  kicker: 'Réalisations',
  // Phrase d’introduction : le nombre de projets est ajouté devant (voir ProjectsHead).
  subAfterCount: 'réalisations en HTML, CSS et JavaScript. Chaque projet renvoie vers son code source sur GitHub.',
  indexLabel: 'Accès rapide aux projets',
  filterLabel: 'Filtrer les projets par catégorie',
  closing: {
    titleLines: ['Un projet', 'à structurer ?'],
    primary: 'Me contacter',
    secondary: 'Voir GitHub',
  },
};

// ─────────────────────────────────────────────────────────────
// Page Services (direction manga). La liste des services et la méthode viennent de services.js ;
// ici seulement les textes de la page.
// ─────────────────────────────────────────────────────────────

export const servicesPage = {
  kicker: 'Ce que je propose',
  title: 'Services',
  sub: 'Du site vitrine aux fonctionnalités dynamiques : ce que je peux construire avec vous, et ce que vous recevez à la fin.',
  indexLabel: 'Accès rapide aux services',
  listLabel: 'Liste des services',
  deliverablesLabel: 'Ce que vous recevez',
  cta: 'Parler de ce service',
  processTitle: 'Une méthode simple, en quatre étapes',
  processText: 'Chaque projet suit le même fil, de la première discussion à la mise en ligne.',
  closing: {
    titleLines: ['Un besoin', 'précis ?'],
    primary: 'Me contacter',
    secondary: 'Voir les projets',
  },
};

// ─────────────────────────────────────────────────────────────
// Page Contact (direction manga). Le site est statique : le « formulaire » prépare un e-mail
// (lien mailto), il n’envoie rien lui-même et ne le prétend jamais. Les canaux viennent de `site`.
// ─────────────────────────────────────────────────────────────

export const contactPage = {
  kicker: 'Contact',
  titleLines: contactCopy.titleLines,
  // Le déroulé réel du formulaire : une vraie séquence, donc numérotée.
  stepsLabel: 'Comment ça se passe',
  steps: ['Vous décrivez votre projet', 'Votre messagerie s’ouvre, message prérempli', 'Vous relisez, puis vous envoyez'],
  place: site.location,
  intro: contactCopy.intro,
  form: {
    title: 'Décrivez votre projet',
    note: 'Ce formulaire prépare un e-mail dans votre messagerie. Rien n’est envoyé tant que vous ne l’envoyez pas vous-même.',
    name: 'Votre nom',
    type: 'Type de projet',
    typePlaceholder: 'À préciser (facultatif)',
    typeOther: 'Autre besoin',
    message: 'Votre projet',
    messageHint: 'Contexte, objectif, public visé : quelques lignes suffisent.',
    deadline: 'Échéance souhaitée',
    deadlineHint: 'Facultatif : une date, ou « dès que possible ».',
    submit: 'Préparer mon e-mail',
    meterLabel: 'champs obligatoires remplis',
    meterOf: 'sur',
    meterReady: 'Votre fiche est prête : vous pouvez préparer l’e-mail.',
    errors: {
      name: 'Indiquez votre nom.',
      message: 'Décrivez votre projet en quelques mots (10 caractères minimum).',
    },
    readyTitle: 'Votre messagerie devrait s’ouvrir avec le message prérempli.',
    readyText: 'Si rien ne s’ouvre, copiez le message ci-dessous et envoyez-le à l’adresse indiquée.',
    reopen: 'Ouvrir à nouveau',
    copy: 'Copier le message',
    copied: 'Message copié.',
    copyError: 'Copie impossible : sélectionnez le texte et copiez-le manuellement.',
    to: 'À',
    subject: 'Objet',
  },
  channelsTitle: 'Autres moyens de me joindre',
  channels: {
    email: 'E-mail',
    copy: 'Copier l’adresse',
    copied: 'Adresse copiée.',
    copyError: 'Copie impossible : sélectionnez l’adresse et copiez-la manuellement.',
    location: 'Localisation',
    copyDone: 'Copiée',
    dayparts: { morning: 'Matin', afternoon: 'Après-midi', evening: 'Soirée', night: 'Nuit' },
    dakarNow: 'À Dakar',
  },
  closing: {
    titleLines: ['Voir ce que', 'j’ai construit.'],
    primary: 'Voir les projets',
    secondary: 'Voir les services',
  },
};
