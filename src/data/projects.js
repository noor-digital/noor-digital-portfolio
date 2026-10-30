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
//   github      URL du dépôt (vérifiée)
//   demo        URL de démonstration — `null` tant qu’elle n’est pas vérifiée
//   image       capture réelle { src, alt, width, height } — `null` sinon
//
// Pour ajouter une démo : remplacez `demo: null` par l’URL (ex. GitHub Pages).
// Pour ajouter une capture : placez le fichier dans public/assets/ puis
// renseignez `image: { src: 'assets/mon-projet.png', alt: '…', width: 1600, height: 1000 }`.
// ─────────────────────────────────────────────────────────────

export const projectCategories = ['Site vitrine', 'Outils web', 'E-commerce'];

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
    demo: null,
    image: null,
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
    demo: null,
    image: null,
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
    demo: null,
    image: null,
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
    demo: null,
    image: null,
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
    demo: null,
    image: null,
  },
];
