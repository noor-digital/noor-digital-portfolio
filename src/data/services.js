// Services proposés. Restez factuel : n’ajoutez que ce que vous pouvez réellement assurer.

export const services = [
  {
    id: 'sites-web',
    title: 'Développement de sites web',
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
    title: 'Intégration d’interfaces responsive',
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
    title: 'Fonctionnalités web dynamiques',
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
    title: 'Création et amélioration de sites pour les entreprises',
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
export const process = [
  {
    title: 'Comprendre le besoin',
    text: 'Un échange sur vos objectifs, votre public et vos contraintes pour cadrer ce qui doit être construit.',
  },
  {
    title: 'Définir la structure et l’interface',
    text: 'Plan des pages, hiérarchie du contenu et choix visuels, avant d’écrire le code.',
  },
  {
    title: 'Développer et tester',
    text: 'Développement par étapes, vérification sur différents écrans et corrections au fil de l’eau.',
  },
  {
    title: 'Livrer et améliorer',
    text: 'Mise en ligne, explications pour la prise en main, puis ajustements selon vos retours.',
  },
];
