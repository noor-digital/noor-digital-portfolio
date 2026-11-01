// ─────────────────────────────────────────────────────────────
// Projets. Descriptions rédigées à partir du README de chaque dépôt.
//
// Champs :
//   slug        identifiant utilisé dans l’URL (/projets#slug)
//   name        nom affiché
//   description description courte et factuelle
//   category    doit correspondre à une valeur de `projectCategories`
//   tech        liste des technologies réellement utilisées
//   year        année du projet — `null` tant qu’elle n’est pas confirmée
//   github      URL du dépôt (vérifiée) — `null` tant qu’elle n’est pas confirmée : le lien est alors masqué
//   demo        URL de démonstration — `null` tant qu’elle n’est pas vérifiée
//   image       capture réelle { src, alt, width, height } — `null` sinon
//
// Champs OPTIONNELS (un champ vide ou `null` est simplement masqué sur la page) :
//   featured         `true` pour le projet « à la une » (à défaut : le premier de la liste)
//   longDescription  description détaillée, affichée dans la fiche du projet
//   features         liste des fonctionnalités clés
//   learnings        ce que le projet démontre (compétences réellement présentes dans le code)
//   role             votre rôle sur le projet
//   gallery          autres captures [{ src, alt, width, height }]
// `features` et `learnings` sont pré-remplis UNIQUEMENT à partir des descriptions ci-dessous et des
// technologies listées. Complétez-les avec le README de chaque dépôt (je n'y ai pas accès).
//
// Pour ajouter une démo : remplacez `demo: null` par l’URL (ex. GitHub Pages).
// Pour ajouter une capture : placez le fichier dans public/assets/ puis
// renseignez `image: { src: 'assets/mon-projet.png', alt: '…', width: 1600, height: 1000 }`.
// ─────────────────────────────────────────────────────────────

export const projectCategories = ['Site vitrine', 'Outils web', 'E-commerce', 'Plateforme web'];

export const projects = [
  {
    slug: 'sabaly-consulting',
    name: 'Sabaly Consulting',
    description:
      'Site vitrine statique en français : accueil, à propos, services, programmes et références, avec un formulaire de contact qui prépare un e-mail.',
    category: 'Site vitrine',
    tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript'],
    year: null,
    github: 'https://github.com/noor-digital/sabaly-consulting',
    demo: 'https://sabaly-consulting-green.vercel.app/',
    image: null,
    featured: false,
    longDescription: null,
    role: null,
    features: [
      'Pages en français : accueil, à propos, services, programmes et références',
      'Formulaire de contact qui prépare un e-mail',
    ],
    learnings: [
      'Structure d’un site vitrine de plusieurs pages en HTML et CSS',
      'Mise en page avec Bootstrap 5',
    ],
    gallery: [],
  },
  {
    slug: 'todo-list',
    name: 'To-Do List',
    description:
      'Liste de tâches en JavaScript natif : ajout, validation, suppression, et sauvegarde dans le navigateur grâce au localStorage.',
    category: 'Outils web',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'localStorage'],
    year: null,
    github: 'https://github.com/noor-digital/todo-list',
    demo: 'https://to-do-list-sigma-woad-32.vercel.app/',
    image: null,
    featured: false,
    longDescription: null,
    role: null,
    features: [
      'Ajout de tâches',
      'Validation de la saisie',
      'Suppression de tâches',
      'Sauvegarde dans le navigateur (localStorage)',
    ],
    learnings: [
      'JavaScript natif, sans framework',
      'Persistance des données avec localStorage',
    ],
    gallery: [],
  },
  {
    slug: 'vocal-queue-system',
    name: 'Vocal Queue System',
    description:
      'Compteur de file d’attente de 0 à 10 avec annonce vocale en français, grâce à la synthèse vocale du navigateur.',
    category: 'Outils web',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'Web Speech API'],
    year: null,
    github: 'https://github.com/noor-digital/vocal-queue-system',
    demo: 'https://vocal-queue-system.vercel.app/',
    image: null,
    featured: false,
    longDescription: null,
    role: null,
    features: [
      'Compteur de file d’attente de 0 à 10',
      'Annonce vocale en français',
    ],
    learnings: [
      'Synthèse vocale du navigateur (Web Speech API)',
      'Interface construite avec Bootstrap 5',
    ],
    gallery: [],
  },
  {
    slug: 'expense-tracker',
    name: 'Expense Tracker',
    description:
      'Suivi de dépenses personnelles : budget mensuel, recherche et filtres, statistiques, import et export CSV, le tout dans le navigateur.',
    category: 'Outils web',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES modules)', 'localStorage'],
    year: null,
    github: 'https://github.com/noor-digital/expense-tracker',
    demo: null,
    image: null,
    featured: false,
    longDescription: null,
    role: null,
    features: [
      'Budget mensuel',
      'Recherche et filtres',
      'Statistiques',
      'Import et export CSV',
      'Données conservées dans le navigateur',
    ],
    learnings: [
      'Code organisé en modules ES',
      'Persistance des données avec localStorage',
      'Import et export de fichiers CSV',
    ],
    gallery: [],
  },
  {
    slug: 'aeris-meteo',
    name: 'Aeris Météo',
    description:
      'Application météo dont l’ambiance suit le ciel de la ville : prévisions horaires et sur 7 jours, recherche de villes, thèmes clair et sombre.',
    category: 'Outils web',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES modules)', 'Canvas 2D', 'Open-Meteo'],
    year: null,
    github: 'https://github.com/noor-digital/aeris-meteo',
    demo: 'https://noor-digital.github.io/aeris-meteo/',
    image: null,
    featured: true,
    longDescription: null,
    role: null,
    features: [
      'Prévisions horaires et sur 7 jours',
      'Recherche de villes',
      'Thèmes clair et sombre',
      'Ambiance visuelle qui suit le ciel de la ville',
    ],
    learnings: [
      'Consommation d’une API externe (Open-Meteo)',
      'Rendu graphique avec Canvas 2D',
      'Code organisé en modules ES',
    ],
    gallery: [],
  },
  {
    slug: 'nova-shop',
    name: 'NOVA SHOP',
    description:
      'Boutique de démonstration sans backend : 16 produits, recherche, filtres, panier, favoris et thème clair ou sombre.',
    category: 'E-commerce',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES modules)', 'localStorage'],
    year: null,
    github: 'https://github.com/noor-digital/nova-shop',
    demo: 'https://noor-digital.github.io/nova-shop/',
    image: null,
    featured: false,
    longDescription: null,
    role: null,
    features: [
      '16 produits de démonstration',
      'Recherche et filtres',
      'Panier et favoris',
      'Thème clair ou sombre',
    ],
    learnings: [
      'Panier et favoris gérés dans le navigateur (localStorage)',
      'Code organisé en modules ES',
    ],
    gallery: [],
  },
  {
    slug: 'mangora',
    name: 'MANGORA',
    description: 'Plateforme immersive de découverte et de lecture de mangas.',
    category: 'Plateforme web',
    tech: ['React 18', 'Vite 5', 'React Router', 'JavaScript', 'CSS'],
    year: null,
    // Dépôt et démo : à renseigner dès que les adresses sont confirmées (champ masqué tant qu'il vaut null).
    github: 'https://github.com/noor-digital/mangora',
    demo: 'https://noor-digital.github.io/mangora/',
    image: {
      src: 'images/projects/mangora-serie-fiche-desktop.png',
      alt: 'Capture d’écran de MANGORA : fiche d’une série avec son titre, son synopsis, les boutons de lecture et la liste des chapitres.',
      width: 2880,
      height: 1800,
    },
    featured: false,
    longDescription: null,
    role: null,
    features: [
      'Exploration avec filtres et recherche instantanée',
      'Fiche de série avec chapitres et progression',
      'Lecteur en défilement vertical',
      'Classements, genres, bibliothèque et réglages',
    ],
    learnings: [
      'Navigation entre plusieurs pages avec React Router',
      'Interface construite avec React 18 et Vite 5',
    ],
    gallery: [],
  },
];
