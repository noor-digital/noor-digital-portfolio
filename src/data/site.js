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
  whatsapp: 'https://wa.me/221770600379',

  // Page À propos : laissez `null`, rien ne s’affiche tant que ce n’est pas renseigné.
  //  cv    : lien du CV à télécharger, ex. 'assets/cv-mamadou-dia-seck.pdf' (fichier dans public/assets/)
  //  photo : portrait { src: 'assets/portrait.jpg', alt: 'Portrait de …', width: 800, height: 1000 }
  cv: 'assets/cv-mamadou-dia-seck.pdf',
  photo: {
  src: 'assets/portrait.jpg',
  alt: 'Portrait de Mamadou Dia Seck',
  width: 800,
  height: 1000,
},

  // Engagements affichés sur la page Contact. Laissez `null` : rien ne s’affiche tant que ce n’est pas vrai.
  //  availability : texte de la pastille de statut, ex. 'Disponible pour de nouveaux projets'
  //  responseTime : délai de réponse tenable, ex. 'sous 48 h'
  availability: null,
  responseTime: null,
  // Langues d’échange (le site est en français).
  languages: ['Français'],
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
      'Réalisations web en JavaScript : site vitrine, outils du quotidien, application météo, boutique de démonstration et plateforme de lecture de mangas.',
  },
  {
    path: '/services',
    index: '04',
    label: 'Services',
    title: 'Services — NOOR DIGITAL',
    description:
      'Développement de sites web, intégration d’interfaces responsive et fonctionnalités dynamiques (PHP, Laravel, MySQL). Une méthode simple en quatre étapes, de la première discussion à la mise en ligne.',
  },
  {
    path: '/contact',
    index: '05',
    label: 'Contact',
    title: 'Contact — NOOR DIGITAL',
    description:
      'Parlons de votre projet de site ou d’application web : formulaire guidé, e-mail ou WhatsApp. NOOR DIGITAL, basé à Dakar, Sénégal.',
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
  {
    label: 'Études',
    title: 'UVS — Licence 2 en informatique',
    status: 'Étudiant',
    period: null,
    description: 'Études en informatique à l’Université Virtuelle du Sénégal.',
    skills: ['Informatique', 'Développement web'],
  },
  {
    label: 'Formation',
    title: 'Full Stack Web Development',
    status: 'Terminée',
    period: null,
    description: 'Formation terminée en développement web Full Stack.',
    skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'MySQL'],
  },
];

export const principles = [
  {
    title: 'Clarté',
    icon: 'clarity',
    text: 'Une interface doit se comprendre au premier regard. Je cherche le texte, la hiérarchie et les gestes les plus simples.',
  },
  {
    title: 'Structure',
    icon: 'structure',
    text: 'Un bon site repose sur une architecture lisible : contenu séparé de la présentation, composants réutilisables, code facile à reprendre.',
  },
  {
    title: 'Précision',
    icon: 'precision',
    text: 'Les détails comptent : espacements, états de focus, comportement sur mobile, textes d’erreur. Je vérifie avant de livrer.',
  },
  {
    title: 'Lumière',
    icon: 'light',
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
  // Ligne de rôle : le second segment alterne parmi des faits réels (technologies de `site` / `skills`).
  role: {
    lead: 'Développeur web full stack',
    words: ['PHP', 'Laravel', 'JavaScript', 'MySQL', 'React'],
  },
  sub: studio.statement,
  // Pastilles-repères : uniquement des faits confirmés (voir `journey`). La pastille « Dakar » (heure en direct) est ajoutée par le hero.
  badges: ['Étudiant en informatique · UVS', 'Web et applications mobiles', 'Formation Full Stack terminée'],
  ctas: { contact: 'Me contacter', projects: 'Voir les projets', cv: 'Télécharger mon CV' },
  scrollLabel: 'Défiler vers la présentation',
  portraitAlt: 'Portrait de Mamadou Dia Seck',

  // ── Qui je suis ──────────────────────────────────────────
  who: {
    title: 'Qui je suis',
    // Mots mis en couleur dans la phrase d’accroche (la première phrase de profile.paragraphs[0]).
    highlights: ['étudiant en informatique', 'développement web'],
    sheetTitle: 'Fiche',
    // Libellés de la fiche ; les valeurs viennent de `site`, `studio` et `journey` (aucune valeur écrite ici).
    labels: { place: 'Basé à', focus: 'Orientation', study: 'Études', tech: 'Technologies', training: 'Formation' },
    links: { github: 'GitHub', email: 'E-mail', linkedin: 'LinkedIn', whatsapp: 'WhatsApp', copy: 'Copier', copied: 'Adresse copiée ✓', copyError: 'Copie impossible : sélectionnez l’adresse.' },
    cv: 'Télécharger mon CV',
  },

  // ── Pourquoi NOOR ────────────────────────────────────────
  why: { kicker: 'Pourquoi NOOR', watermark: 'NOOR' },

  // ── Parcours ─────────────────────────────────────────────
  journeyTitle: 'Parcours',
  journeyText: 'Ce qui a construit mon profil, étape par étape.',
  journeyNext: { label: 'La suite', title: 'Votre projet', text: 'Parlons-en : c’est la prochaine étape.', cta: 'Me contacter' },

  // ── Compétences ──────────────────────────────────────────
  skills: {
    title: 'Compétences',
    text: 'Les technologies et outils que j’utilise réellement.',
    cta: 'Voir les projets',
  },

  // ── Principes ────────────────────────────────────────────
  principlesTitle: 'Ma manière de travailler',

  // ── Travaillons ensemble ─────────────────────────────────
  together: {
    title: 'Travaillons ensemble',
    expectTitle: 'Ce que vous pouvez attendre de moi',
    expect: [
      { icon: 'brackets', title: 'Code clair et maintenable', text: 'Lisible, organisé et facile à reprendre.' },
      { icon: 'devices', title: 'Responsive', text: 'Pensé pour le mobile, adapté à tous les écrans.' },
      { icon: 'access', title: 'Accessibilité de base', text: 'Clavier, contrastes et focus visibles dès le départ.' },
      { icon: 'message', title: 'Livraison expliquée', text: 'Le code est livré avec les explications de mise en ligne.' },
    ],
    startTitle: 'Comment on commence',
    start: [
      { title: 'Vous m’écrivez', text: 'Un message suffit : décrivez simplement votre idée.' },
      { title: 'On cadre le besoin', text: 'Un premier échange pour préciser objectifs et contraintes.' },
      { title: 'Je propose la marche à suivre', text: 'La façon la plus adaptée d’avancer, étape par étape.' },
    ],
    links: { services: 'Voir les services', projects: 'Voir les projets', contact: 'Me contacter' },
  },

  floating: { text: 'Un projet ?', cta: 'Parlons-en' },

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
  // H1 : « Ce que j’ai / construit. » — le dernier mot est mis en couleur.
  titleLead: 'Ce que j’ai',
  titleAccent: 'construit.',
  // Phrase d’introduction : le nombre de projets est ajouté devant (calculé depuis data/projects.js).
  subAfterCount: 'réalisations web en JavaScript, du site vitrine à la plateforme de lecture. Le code source est lié sur GitHub quand il est publié.',
  // Chiffres du hero : tous calculés depuis data/projects.js (jamais écrits à la main).
  stats: {
    label: 'Chiffres clés',
    projects: 'projets',
    tech: 'technologies distinctes',
    repos: 'dépôts GitHub liés',
  },
  marqueeLabel: 'Technologies utilisées dans les projets',
  scrollLabel: 'Défiler vers les projets',
  illustrative: 'Aperçu illustratif',

  toolbar: {
    label: 'Filtres et outils de la liste des projets',
    all: 'Tous',
    categoryLabel: 'Catégories',
    searchLabel: 'Rechercher un projet',
    searchPlaceholder: 'Nom, description ou technologie',
    techLabel: 'Technologies',
    viewLabel: 'Affichage',
    grid: 'Grille',
    list: 'Liste',
    sortLabel: 'Trier',
    sortDefault: 'Par défaut',
    sortRecent: 'Plus récents',
    reset: 'Réinitialiser les filtres',
    clearSearch: 'Effacer la recherche',
  },
  empty: {
    title: 'Aucun projet ne correspond',
    text: 'Essayez un autre mot-clé ou retirez un filtre.',
  },
  featuredLabel: 'À la une',
  card: {
    view: 'Voir le projet',
    github: 'Code source sur GitHub',
    demo: 'Démo en ligne',
    keyFeatures: 'Points clés',
  },
  drawer: {
    close: 'Fermer la fiche du projet',
    share: 'Copier le lien',
    copied: 'Lien copié ✓',
    copyError: 'Copie impossible : copiez l’adresse du navigateur.',
    features: 'Fonctionnalités clés',
    stack: 'Stack',
    learnings: 'Ce que ce projet démontre',
    gallery: 'Galerie',
    role: 'Rôle',
    year: 'Année',
    code: 'Code source sur GitHub',
    demo: 'Démo en ligne',
    nav: 'Autres projets',
    prev: 'Projet précédent',
    next: 'Projet suivant',
  },
  how: {
    title: 'Comment je travaille sur un projet',
    items: [
      { icon: 'brackets', title: 'Code propre', text: 'Lisible, organisé et versionné avec Git.' },
      { icon: 'devices', title: 'Responsive', text: 'Pensé pour le mobile, adapté à tous les écrans.' },
      { icon: 'access', title: 'Accessibilité', text: 'Clavier, contrastes et focus visibles dès le départ.' },
      { icon: 'message', title: 'Livraison expliquée', text: 'Le code est livré avec les explications de mise en ligne.' },
    ],
  },
  floating: { text: 'Un projet ?', cta: 'Parlons-en' },
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
  // ── Hero ───────────────────────────────────────────────────
  hero: {
    kicker: 'Ce que je propose',
    lead: 'Des sites qui',
    // Le dernier mot alterne. Gardez des mots courts : ils doivent tenir sur une ligne en mobile.
    words: ['convainquent', 's’adaptent', 'durent'],
    sub: 'Sites vitrines, interfaces responsive et fonctionnalités sur mesure : je conçois et je développe des sites clairs, adaptés à tous les écrans et faciles à faire évoluer.',
    primary: 'Démarrer un projet',
    secondary: 'Voir les services',
    quickNavLabel: 'Accès rapide aux services',
    marqueeLabel: 'Technologies utilisées',
    marquee: [
      { label: 'HTML', icon: 'html5' },
      { label: 'CSS', icon: 'css' },
      { label: 'JavaScript', icon: 'javascript' },
      { label: 'PHP', icon: 'php' },
      { label: 'Laravel', icon: 'laravel' },
      { label: 'MySQL', icon: 'mysql' },
      { label: 'React', icon: 'react' },
    ],
    scrollLabel: 'Défiler pour découvrir les services',
  },

  // ── Chiffres clés ──────────────────────────────────────────
  // Uniquement des faits vérifiables. `source` calcule la valeur depuis les données du site
  // (services, étapes de méthode, technologies) ; `value` fixe un nombre à la main ; `text` affiche un mot.
  // Pour afficher un délai de réponse, ajoutez-le seulement s'il est tenable :
  //   { id: 'reponse', value: 48, suffix: ' h', label: 'pour une première réponse' }
  stats: {
    label: 'Chiffres clés',
    items: [
      { id: 'services', source: 'services', label: 'services proposés' },
      { id: 'tech', source: 'tech', label: 'technologies et outils utilisés' },
      { id: 'steps', source: 'process', label: 'étapes de méthode' },
      { id: 'place', text: 'Dakar', label: 'basé au Sénégal, travail à distance' },
    ],
  },

  // ── Services (sticky storytelling) ─────────────────────────
  stack: {
    kicker: 'Les services',
    title: 'Quatre façons de faire avancer votre projet',
    text: 'Chaque service décrit ce que vous recevez, pour qui il est pensé et les technologies employées.',
    listLabel: 'Liste des services',
    deliverablesLabel: 'Ce que vous recevez',
    idealLabel: 'Idéal pour',
    techLabel: 'Technologies',
    cta: 'Discuter de ce service',
    progressLabel: 'Service',
    of: 'sur',
  },

  // ── Pourquoi travailler avec moi (bande compacte : une phrase par point) ──
  why: {
    title: 'Pourquoi travailler avec moi',
    text: 'Des fondations solides pour un site agréable à utiliser et simple à faire évoluer.',
    items: [
      { icon: 'brackets', title: 'Code propre', text: 'Lisible, organisé en composants et suivi avec Git.' },
      { icon: 'devices', title: 'Responsive natif', text: 'Pensé mobile d’abord, adapté à tous les écrans.' },
      { icon: 'access', title: 'Accessibilité de base', text: 'Clavier, contrastes et focus visibles dès la conception.' },
      { icon: 'message', title: 'Communication claire', text: 'Des échanges simples et un projet toujours suivi.' },
    ],
  },

  // ── Méthode ────────────────────────────────────────────────
  processTitle: 'Une méthode simple, en quatre étapes',
  processText: 'Chaque projet suit le même fil, de la première discussion à la mise en ligne.',
  processLabel: 'Étape',

  // ── Types de projets (sans mention financière) ──────────────────────────
  // `service` : identifiant d'un service de services.js, utilisé pour pré-remplir /contact?service=<id>.
  workTypes: {
    title: 'Comment on travaille ensemble',
    text: 'Trois façons courantes de démarrer. Votre projet est peut-être entre les deux : parlons-en.',
    includedLabel: 'Ce qui est inclus',
    flowLabel: 'Déroulé',
    cta: 'Parler de mon projet',
    items: [
      {
        id: 'vitrine',
        service: 'sites-web',
        title: 'Site vitrine',
        forWho: 'Activités, associations et indépendants qui veulent se présenter en ligne.',
        included: [
          'Pages structurées (accueil, présentation, contact)',
          'Adaptation mobile, tablette, ordinateur',
          'Mise en ligne avec instructions',
        ],
        flow: ['Échange', 'Structure', 'Développement', 'Mise en ligne'],
      },
      {
        id: 'sur-mesure',
        service: 'fonctionnalites',
        title: 'Site sur mesure avec fonctionnalités',
        forWho: 'Projets qui doivent collecter, traiter ou afficher des données.',
        included: [
          'Formulaires, validations, interactions',
          'Côté serveur avec PHP ou Laravel',
          'Données stockées avec MySQL',
        ],
        flow: ['Cadrage', 'Maquette', 'Développement', 'Tests et livraison'],
      },
      {
        id: 'amelioration',
        service: 'entreprises',
        title: 'Amélioration d’un site existant',
        forWho: 'Sites en ligne à rendre plus lisibles, mieux structurés ou plus simples à maintenir.',
        included: [
          'Analyse simple de l’existant',
          'Améliorations classées par priorité',
          'Mises à jour et vérification du code',
        ],
        flow: ['Analyse', 'Priorités', 'Corrections', 'Vérification'],
      },
    ],
  },

  // ── Après votre message ────────────────────────────────────
  // Uniquement des engagements que vous pouvez tenir. `delay` est facultatif (exemple : 'sous 48 h').
  after: {
    title: 'Ce qui se passe après votre message',
    text: 'Pas de formalités : voici simplement la suite.',
    items: [
      { title: 'Je vous réponds', text: 'Votre message est lu attentivement et vous recevez une réponse personnelle.', delay: null },
      { title: 'Un premier échange', text: 'On cadre ensemble votre besoin : objectifs, public, contraintes et contenu disponible.', delay: null },
      { title: 'Une marche à suivre', text: 'Je vous propose la façon la plus adaptée d’avancer, étape par étape.', delay: null },
    ],
  },

  // ── FAQ (aucune question financière) ───────────────────
  faq: {
    title: 'Questions fréquentes',
    text: 'Une question qui n’est pas ici ? Écrivez-moi, la réponse viendra avec la discussion.',
    items: [
      {
        q: 'Combien de temps prend un projet ?',
        a: 'Cela dépend de la taille du site, du contenu déjà disponible et de la rapidité des retours. Après le premier échange, je vous indique un calendrier réaliste pour votre cas.',
      },
      {
        q: 'Qui s’occupe de l’hébergement et de la mise en ligne ?',
        a: 'Le code est livré avec les instructions de mise en ligne, et je vous explique les options d’hébergement adaptées à votre projet. On voit ensemble ce qui vous convient.',
      },
      {
        q: 'Et la maintenance, une fois le site en ligne ?',
        a: 'Des ajustements selon vos retours font partie de la dernière étape. Pour des mises à jour régulières, on en discute selon votre besoin.',
      },
      {
        q: 'Puis-je demander des modifications après la livraison ?',
        a: 'Oui. Pour un petit ajustement comme pour une évolution plus importante, il suffit de me contacter : on cadre ce qu’il faut faire.',
      },
      {
        q: 'Travaillez-vous à distance ?',
        a: 'Oui. Je suis basé à Dakar et je travaille à distance : les échanges passent par e-mail, et par un autre canal si nous en convenons.',
      },
      {
        q: 'Comment se déroule un premier échange ?',
        a: 'On parle de vos objectifs, de votre public, de vos contraintes et de ce que vous avez déjà (contenu, logo, site existant). Je vous propose ensuite la marche à suivre.',
      },
      {
        q: 'Je ne sais pas encore précisément ce dont j’ai besoin. Est-ce un problème ?',
        a: 'Pas du tout. Décrivez simplement votre idée ou votre difficulté : le premier échange sert justement à clarifier le besoin.',
      },
    ],
  },

  // ── Témoignages : masqués tant que data/testimonials.js est vide ──
  testimonials: {
    title: 'Ils en parlent',
    text: 'Des retours réels de personnes avec qui j’ai travaillé.',
  },

  // ── Barre CTA flottante ────────────────────────────────────
  floating: { text: 'Un projet ?', cta: 'Parlons-en' },

  // ── Clôture ────────────────────────────────────────────────
  // Les liens e-mail et WhatsApp viennent de `site` : un canal à null reste masqué.
  closing: {
    titleLines: ['Parlons de', 'votre projet'],
    primary: 'Parlons de votre projet',
    email: 'Écrire par e-mail',
    whatsapp: 'WhatsApp',
  },
};

// ─────────────────────────────────────────────────────────────
// Page Contact. Le site est statique (GitHub Pages, sans backend) : le formulaire envoie via un service
// de formulaires statique si VITE_FORM_ENDPOINT est défini (voir src/lib/sendForm.js et le README) ;
// sinon, ou si l’envoi échoue, il propose la messagerie (mailto) et la copie du message, et le dit
// clairement. Rien n’est jamais présenté comme envoyé s’il ne l’est pas.
// Les canaux et engagements viennent de `site` : une valeur à null reste masquée.
// ─────────────────────────────────────────────────────────────

export const contactPage = {
  kicker: 'Contact',
  // H1 : « Parlons de / votre PROJET. » — le dernier mot est mis en couleur.
  titleLead: 'Parlons de',
  titleMid: 'votre',
  titleAccent: 'projet.',
  intro:
    'Un site à créer, une interface à améliorer ou une idée à structurer : dites-moi où vous en êtes, on avance ensemble.',
  gmt: 'Dakar = GMT',
  scrollLabel: 'Défiler vers le formulaire',

  // Trois actions rapides sous le titre.
  quick: {
    label: 'Me contacter rapidement',
    email: {
      title: 'E-mail',
      hint: 'Copie l’adresse et ouvre votre messagerie',
      copied: 'Adresse copiée ✓',
      copyError: 'Copie impossible : l’adresse est affichée sur la carte.',
    },
    whatsapp: {
      title: 'WhatsApp',
      hint: 'Discuter directement',
      message: 'Bonjour, je vous contacte depuis votre portfolio au sujet d’un projet.',
    },
    form: { title: 'Écrire un message', hint: 'Un formulaire guidé en 3 étapes' },
    moreLabel: 'Aussi sur',
    newTab: '(s’ouvre dans un nouvel onglet)',
  },

  // Colonne de gauche du formulaire : volontairement courte (une ligne par point).
  reassure: {
    title: 'Un échange simple et direct',
    items: [
      'Vous écrivez directement à la personne qui construit votre site.',
      'Inutile de tout savoir : décrivez simplement votre idée.',
      'Vos coordonnées servent uniquement à vous répondre.',
    ],
    afterTitle: 'Ensuite',
    // Versions courtes des étapes de servicesPage.after (même ordre ; un `delay` éventuel est repris de là).
    after: [
      { title: 'Je vous réponds', text: 'Réponse personnelle à votre message.' },
      { title: 'Un premier échange', text: 'On cadre votre besoin ensemble.' },
      { title: 'Une marche à suivre', text: 'Je vous propose comment avancer.' },
    ],
    responseLabel: 'Délai de réponse habituel',
  },

  form: {
    id: 'ct-form',
    title: 'Décrivez votre projet',
    stepWord: 'Étape',
    of: 'sur',
    steps: [
      { title: 'De quoi avez-vous besoin ?', hint: 'Plusieurs choix possibles. Pas sûr ? Passez à l’étape suivante.' },
      { title: 'Parlez-moi de votre projet', hint: 'Quelques lignes suffisent : contexte, objectif, public visé.' },
      { title: 'Comment vous joindre ?', hint: 'Je vous réponds sur le canal de votre choix.' },
    ],
    other: 'Autre besoin',
    messageLabel: 'Votre projet',
    messagePlaceholder: 'Ex. : je voudrais présenter mon activité en ligne avec un site clair et facile à mettre à jour…',
    startersLabel: 'Pour démarrer',
    starters: ['Je veux refaire mon site…', 'J’ai besoin d’une fonctionnalité…', 'Je pars de zéro et je cherche…'],
    deadlineLabel: 'Échéance souhaitée',
    deadlines: [
      { id: 'asap', label: 'Dès que possible' },
      { id: 'month', label: 'Ce mois-ci' },
      { id: 'quarter', label: 'Dans 2-3 mois' },
      { id: 'flex', label: 'Flexible' },
      { id: 'date', label: 'Date précise' },
    ],
    dateLabel: 'Date souhaitée',
    nameLabel: 'Votre nom',
    emailLabel: 'Votre e-mail',
    phoneLabel: 'Téléphone ou WhatsApp (facultatif)',
    channelLabel: 'Canal préféré pour la réponse',
    channels: [
      { id: 'email', label: 'E-mail' },
      { id: 'whatsapp', label: 'WhatsApp' },
    ],
    errors: {
      message: 'Quelques mots de plus, s’il vous plaît (10 caractères minimum).',
      name: 'Indiquez votre nom, pour que je sache à qui répondre.',
      email: 'Indiquez une adresse e-mail valide (par exemple nom@exemple.com).',
      phone: 'Pour une réponse sur WhatsApp, indiquez votre numéro.',
    },
    next: 'Continuer',
    back: 'Retour',
    send: 'Envoyer mon message',
    sending: 'Envoi en cours…',
    recapTitle: 'Votre message',
    recapEmpty: 'Votre message apparaîtra ici.',
    honeypot: 'Ne pas remplir ce champ',
    // Quand rien n’est parti : explications claires + solutions de repli.
    noEndpointTitle: 'L’envoi direct n’est pas activé sur ce site.',
    noEndpointText: 'Votre message n’est pas encore parti. Ouvrez votre messagerie : tout est prérempli, il n’y a plus qu’à envoyer.',
    failTitle: 'L’envoi n’a pas abouti.',
    failText: 'Votre message n’est pas parti. Vous pouvez réessayer, ou utiliser votre messagerie : tout est prérempli.',
    retry: 'Réessayer l’envoi',
    openMail: 'Ouvrir ma messagerie',
    copy: 'Copier le message',
    copied: 'Message copié ✓',
    copyError: 'Copie impossible : sélectionnez le texte ci-dessous et copiez-le.',
    editAgain: 'Modifier mon message',
    to: 'À',
    subject: 'Objet',
    success: {
      title: 'Message envoyé',
      text: 'Merci, votre message est bien parti. Voici la suite.',
      projects: 'Voir mes projets',
      home: 'Retour à l’accueil',
    },
  },

  // Où et quand me joindre : un ciel qui suit l’heure de Dakar + trois lignes (pas de cartes).
  where: {
    title: 'Où et quand me joindre',
    skyLabel: 'Heure actuelle à Dakar',
    now: 'À Dakar',
    gmt: 'GMT · UTC+0',
    rows: {
      place: { label: 'Où', text: 'Dakar est à l’heure GMT (UTC+0), sans changement d’heure.' },
      time: { label: 'Quand', value: 'Heure de Dakar', text: 'Le ciel ci-contre suit l’heure locale, en direct.' },
      how: {
        label: 'Comment',
        value: 'À distance',
        text: 'Je travaille à distance : les échanges passent par e-mail, et par WhatsApp si vous le préférez.',
        textNoWhatsapp: 'Je travaille à distance : les échanges passent par e-mail.',
        languages: 'Langues',
      },
    },
    dayparts: { dawn: 'Aube', morning: 'Matin', afternoon: 'Après-midi', evening: 'Soirée', night: 'Nuit' },
  },

  faq: {
    title: 'Questions fréquentes',
    text: 'Un doute avant d’écrire ? Voici les réponses aux questions les plus courantes.',
    items: [
      {
        q: 'Comment se passe un premier échange ?',
        a: 'On parle de vos objectifs, de votre public, de vos contraintes et de ce que vous avez déjà (contenu, logo, site existant). Je vous propose ensuite la marche à suivre.',
      },
      {
        q: 'Sous quel délai aurai-je une réponse ?',
        a: 'Chaque message est lu et reçoit une réponse personnelle.',
        withResponseTime: true,
      },
      {
        q: 'Combien de temps prend un projet ?',
        a: 'Cela dépend de la taille du site, du contenu disponible et de la rapidité des retours. Après le premier échange, je vous indique un calendrier réaliste pour votre cas.',
      },
      {
        q: 'Travaillez-vous à distance ?',
        a: 'Oui. Je suis basé à Dakar et je travaille à distance, avec des échanges clairs à chaque étape.',
      },
      {
        q: 'Et l’hébergement, la maintenance et les modifications après la livraison ?',
        a: 'Le code est livré avec les instructions de mise en ligne, et je vous explique les options d’hébergement adaptées. Des ajustements selon vos retours font partie de la dernière étape ; pour des évolutions plus importantes, on cadre ensemble ce qu’il faut faire.',
      },
      {
        q: 'Quelles informations préparer avant de vous écrire ?',
        a: 'Votre objectif, le public visé, ce qui existe déjà (site, logo, textes, images) et, si vous en avez, des exemples de sites que vous aimez. Mais rien n’est obligatoire : on peut aussi partir d’une simple idée.',
      },
    ],
  },

  testimonials: {
    title: 'Ils en parlent',
    text: 'Des retours réels de personnes avec qui j’ai travaillé.',
  },

  channels: {
    title: 'Autres moyens de me joindre',
    email: 'E-mail',
    copy: 'Copier',
    copied: 'Copiée ✓',
    copyError: 'Copie impossible : sélectionnez l’adresse et copiez-la.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    whatsapp: 'WhatsApp',
  },

  floating: { label: 'Écrire' },

  closing: {
    titleLines: ['Voir ce que', 'j’ai construit.'],
    primary: 'Voir les projets',
    secondary: 'Voir les services',
  },
};
