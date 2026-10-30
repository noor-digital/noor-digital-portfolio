// Technologies et outils utilisés, regroupés par catégorie. Aucun niveau ni pourcentage.
// `icon` renvoie à une entrée de components/home/techIcons.jsx. Supprimez une entrée pour la retirer.

export const skillGroups = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Bootstrap', icon: 'bootstrap' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'PHP', icon: 'php' },
      { name: 'Laravel', icon: 'laravel' },
    ],
  },
  {
    id: 'database',
    label: 'Base de données',
    items: [{ name: 'MySQL', icon: 'mysql' }],
  },
  {
    id: 'tools',
    label: 'Outils de développement',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Visual Studio Code', icon: 'vscode' },
      { name: 'Composer', icon: 'composer' },
      { name: 'Laragon', icon: 'laragon' },
      { name: 'XAMPP', icon: 'xampp' },
      { name: 'Postman', icon: 'postman' },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    items: [
      { name: 'Figma', icon: 'figma' },
      { name: 'Canva', icon: 'canva' },
    ],
  },
  {
    id: 'ecosystem',
    label: 'Écosystème React/Vite',
    items: [
      { name: 'Node.js', icon: 'node' },
      { name: 'npm', icon: 'npm' },
      { name: 'Vite', icon: 'vite' },
      { name: 'GitHub Pages', icon: 'ghpages' },
    ],
  },
];
