// Services proposés. Restez factuel : n’ajoutez que ce que vous pouvez réellement assurer.

export const services = [
  {
    id: 'sites-web',
    short: 'Sites web',
    title: 'Développement de sites web',
    ideal:
      'Une activité, une association ou un indépendant qui veut une présence en ligne claire et soignée.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'React'],
    description:
      'Conception et développement de sites adaptés à votre activité : structure des pages, interface, contenu et préparation à la mise en ligne.',
    deliverables: [
      'Site multi-pages responsive',
      'Pages structurées et navigation claire',
      'Code source livré avec les instructions de mise en ligne',
    ],
  },
  {
    id: 'integration',
    short: 'Intégration',
    title: 'Intégration d’interfaces responsive',
    ideal:
      'Une équipe ou un designer qui a une maquette à transformer en interface fidèle et adaptable.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    description:
      'Transformation d’une maquette ou d’une idée en interface HTML, CSS et JavaScript qui s’adapte du mobile au grand écran.',
    deliverables: [
      'Intégration HTML, CSS et JavaScript',
      'Adaptation mobile, tablette et ordinateur',
      'Prise en compte des bases de l’accessibilité (clavier, contrastes, focus)',
    ],
  },
  {
    id: 'fonctionnalites',
    short: 'Fonctionnalités',
    title: 'Fonctionnalités web dynamiques',
    ideal:
      'Un site qui doit collecter, traiter ou afficher des données : formulaires, comptes, listes, contenus gérés.',
    tech: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
    description:
      'Ajout de fonctionnalités interactives ou de traitement de données avec JavaScript, PHP, Laravel et MySQL, selon le périmètre du projet.',
    deliverables: [
      'Formulaires, validations et interactions',
      'Fonctionnalités côté serveur avec PHP ou Laravel',
      'Stockage et lecture de données avec MySQL',
    ],
  },
  {
    id: 'entreprises',
    short: 'Entreprises',
    title: 'Création et amélioration de sites pour les entreprises',
    ideal:
      'Un site existant devenu difficile à lire sur mobile, à maintenir ou à faire évoluer.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Git'],
    description:
      'Création d’une présence web claire, ou amélioration d’un site existant : lisibilité, structure, adaptation mobile et facilité de maintenance.',
    deliverables: [
      'Analyse simple de l’existant',
      'Liste d’améliorations classées par priorité',
      'Mises à jour du code et vérification après modification',
    ],
  },
];

// Méthode de travail proposée (pas un historique de prestations).
// `icon` : voir components/services/ServicesIcons.jsx. `duration` : laissez `null` tant que vous ne pouvez pas
// vous engager sur une durée réaliste (exemple : '1 à 2 jours'). Jamais de montant ici.
export const process = [
  {
    title: 'Comprendre le besoin',
    icon: 'chat',
    duration: null,
    text: 'Un échange sur vos objectifs, votre public et vos contraintes pour cadrer ce qui doit être construit.',
  },
  {
    title: 'Définir la structure et l’interface',
    icon: 'layout',
    duration: null,
    text: 'Plan des pages, hiérarchie du contenu et choix visuels, avant d’écrire le code.',
  },
  {
    title: 'Développer et tester',
    icon: 'code',
    duration: null,
    text: 'Développement par étapes, vérification sur différents écrans et corrections au fil de l’eau.',
  },
  {
    title: 'Livrer et améliorer',
    icon: 'rocket',
    duration: null,
    text: 'Mise en ligne, explications pour la prise en main, puis ajustements selon vos retours.',
  },
];
