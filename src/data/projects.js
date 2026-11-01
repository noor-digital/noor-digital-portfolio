// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Projets. Descriptions rÃ©digÃ©es Ã  partir du README de chaque dÃ©pÃ´t.
//
// Champs :
//   slug        identifiant utilisÃ© dans lâ€™URL (/projets#slug)
//   name        nom affichÃ©
//   description description courte et factuelle
//   category    doit correspondre Ã  une valeur de `projectCategories`
//   tech        liste des technologies rÃ©ellement utilisÃ©es
//   year        annÃ©e du projet â€” `null` tant quâ€™elle nâ€™est pas confirmÃ©e
//   github      URL du dÃ©pÃ´t (vÃ©rifiÃ©e) â€” `null` tant quâ€™elle nâ€™est pas confirmÃ©e : le lien est alors masquÃ©
//   demo        URL de dÃ©monstration â€” `null` tant quâ€™elle nâ€™est pas vÃ©rifiÃ©e
//   image       capture rÃ©elle { src, alt, width, height } â€” `null` sinon
//
// Champs OPTIONNELS (un champ vide ou `null` est simplement masquÃ© sur la page) :
//   featured         `true` pour le projet Â« Ã  la une Â» (Ã  dÃ©faut : le premier de la liste)
//   longDescription  description dÃ©taillÃ©e, affichÃ©e dans la fiche du projet
//   features         liste des fonctionnalitÃ©s clÃ©s
//   learnings        ce que le projet dÃ©montre (compÃ©tences rÃ©ellement prÃ©sentes dans le code)
//   role             votre rÃ´le sur le projet
//   gallery          autres captures [{ src, alt, width, height }]
// `features` et `learnings` sont prÃ©-remplis UNIQUEMENT Ã  partir des descriptions ci-dessous et des
// technologies listÃ©es. ComplÃ©tez-les avec le README de chaque dÃ©pÃ´t (je n'y ai pas accÃ¨s).
//
// Pour ajouter une dÃ©mo : remplacez `demo: null` par lâ€™URL (ex. GitHub Pages).
// Pour ajouter une capture : placez le fichier dans public/assets/ puis
// renseignez `image: { src: 'assets/mon-projet.png', alt: 'â€¦', width: 1600, height: 1000 }`.
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const projectCategories = ['Site vitrine', 'Outils web', 'E-commerce', 'Plateforme web'];

export const projects = [
  {
    slug: 'sabaly-consulting',
    name: 'Sabaly Consulting',
    description:
      'Site vitrine statique en franÃ§ais : accueil, Ã  propos, services, programmes et rÃ©fÃ©rences, avec un formulaire de contact qui prÃ©pare un e-mail.',
    category: 'Site vitrine',
    tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript'],
    year: null,
    github: 'https://github.com/noor-digital/sabaly-consulting',
    demo: 'https://sabaly-consulting-green.vercel.app/',
    image: { src: 'assets/sabaly-consulting.png', alt: 'Capture dâ€™Ã©cran de Sabaly Consulting', width: 1600, height: 1000 },
    featured: false,
    longDescription: null,
    role: null,
    features: [
      'Pages en franÃ§ais : accueil, Ã  propos, services, programmes et rÃ©fÃ©rences',
      'Formulaire de contact qui prÃ©pare un e-mail',
    ],
    learnings: [
      'Structure dâ€™un site vitrine de plusieurs pages en HTML et CSS',
      'Mise en page avec Bootstrap 5',
    ],
    gallery: [],
  },
  {
    slug: 'todo-list',
    name: 'To-Do List',
    description:
      'Liste de tÃ¢ches en JavaScript natif : ajout, validation, suppression, et sauvegarde dans le navigateur grÃ¢ce au localStorage.',
    category: 'Outils web',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'localStorage'],
    year: null,
    github: 'https://github.com/noor-digital/todo-list',
    demo: 'https://to-do-list-sigma-woad-32.vercel.app/',
    image: { src: 'assets/todo-list.png', alt: 'Capture dâ€™Ã©cran de To-Do List', width: 1600, height: 1000 },
    featured: false,
    longDescription: null,
    role: null,
    features: [
      'Ajout de tÃ¢ches',
      'Validation de la saisie',
      'Suppression de tÃ¢ches',
      'Sauvegarde dans le navigateur (localStorage)',
    ],
    learnings: [
      'JavaScript natif, sans framework',
      'Persistance des donnÃ©es avec localStorage',
    ],
    gallery: [],
  },
  {
    slug: 'vocal-queue-system',
    name: 'Vocal Queue System',
    description:
      'Compteur de file dâ€™attente de 0 Ã  10 avec annonce vocale en franÃ§ais, grÃ¢ce Ã  la synthÃ¨se vocale du navigateur.',
    category: 'Outils web',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'Web Speech API'],
    year: null,
    github: 'https://github.com/noor-digital/vocal-queue-system',
    demo: 'https://vocal-queue-system.vercel.app/',
    image: { src: 'assets/vocal-queue-system.png', alt: 'Capture dâ€™Ã©cran de Vocal Queue System', width: 1600, height: 1000 },
    featured: false,
    longDescription: null,
    role: null,
    features: [
      'Compteur de file dâ€™attente de 0 Ã  10',
      'Annonce vocale en franÃ§ais',
    ],
    learnings: [
      'SynthÃ¨se vocale du navigateur (Web Speech API)',
      'Interface construite avec Bootstrap 5',
    ],
    gallery: [],
  },
  {
    slug: 'expense-tracker',
    name: 'Expense Tracker',
    description:
      'Suivi de dÃ©penses personnelles : budget mensuel, recherche et filtres, statistiques, import et export CSV, le tout dans le navigateur.',
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
      'DonnÃ©es conservÃ©es dans le navigateur',
    ],
    learnings: [
      'Code organisÃ© en modules ES',
      'Persistance des donnÃ©es avec localStorage',
      'Import et export de fichiers CSV',
    ],
    gallery: [],
  },
  {
    slug: 'aeris-meteo',
    name: 'Aeris MÃ©tÃ©o',
    description:
      'Application mÃ©tÃ©o dont lâ€™ambiance suit le ciel de la ville : prÃ©visions horaires et sur 7 jours, recherche de villes, thÃ¨mes clair et sombre.',
    category: 'Outils web',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES modules)', 'Canvas 2D', 'Open-Meteo'],
    year: null,
    github: 'https://github.com/noor-digital/aeris-meteo',
    demo: 'https://noor-digital.github.io/aeris-meteo/',
    image: { src: 'assets/aeris-meteo.png', alt: 'Capture dâ€™Ã©cran de Aeris MÃ©tÃ©o', width: 1600, height: 1000 },
    featured: true,
    longDescription: null,
    role: null,
    features: [
      'PrÃ©visions horaires et sur 7 jours',
      'Recherche de villes',
      'ThÃ¨mes clair et sombre',
      'Ambiance visuelle qui suit le ciel de la ville',
    ],
    learnings: [
      'Consommation dâ€™une API externe (Open-Meteo)',
      'Rendu graphique avec Canvas 2D',
      'Code organisÃ© en modules ES',
    ],
    gallery: [],
  },
  {
    slug: 'nova-shop',
    name: 'NOVA SHOP',
    description:
      'Boutique de dÃ©monstration sans backend : 16 produits, recherche, filtres, panier, favoris et thÃ¨me clair ou sombre.',
    category: 'E-commerce',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES modules)', 'localStorage'],
    year: null,
    github: 'https://github.com/noor-digital/nova-shop',
    demo: 'https://noor-digital.github.io/nova-shop/',
    image: { src: 'assets/nova-shop.png', alt: 'Capture dâ€™Ã©cran de NOVA SHOP', width: 1600, height: 1000 },
    featured: false,
    longDescription: null,
    role: null,
    features: [
      '16 produits de dÃ©monstration',
      'Recherche et filtres',
      'Panier et favoris',
      'ThÃ¨me clair ou sombre',
    ],
    learnings: [
      'Panier et favoris gÃ©rÃ©s dans le navigateur (localStorage)',
      'Code organisÃ© en modules ES',
    ],
    gallery: [],
  },
  {
    slug: 'mangora',
    name: 'MANGORA',
    description: 'Plateforme immersive de dÃ©couverte et de lecture de mangas.',
    category: 'Plateforme web',
    tech: ['React 18', 'Vite 5', 'React Router', 'JavaScript', 'CSS'],
    year: null,
    // DÃ©pÃ´t et dÃ©mo : Ã  renseigner dÃ¨s que les adresses sont confirmÃ©es (champ masquÃ© tant qu'il vaut null).
    github: null,
    demo: null,
    image: {
      src: 'images/projects/mangora-serie-fiche-desktop.png',
      alt: 'Capture dâ€™Ã©cran de MANGORA : fiche dâ€™une sÃ©rie avec son titre, son synopsis, les boutons de lecture et la liste des chapitres.',
      width: 2880,
      height: 1800,
    },
    featured: false,
    longDescription: null,
    role: null,
    features: [
      'Exploration avec filtres et recherche instantanÃ©e',
      'Fiche de sÃ©rie avec chapitres et progression',
      'Lecteur en dÃ©filement vertical',
      'Classements, genres, bibliothÃ¨que et rÃ©glages',
    ],
    learnings: [
      'Navigation entre plusieurs pages avec React Router',
      'Interface construite avec React 18 et Vite 5',
    ],
    gallery: [],
  },
];
