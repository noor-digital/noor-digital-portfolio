# NOOR DIGITAL — Portfolio

> **La lumière qui structure.**

Portfolio professionnel de **Mamadou Dia Seck**, développeur web Full Stack et étudiant en informatique à Dakar, Sénégal.

- **Site en ligne :** https://noor-digital.github.io/noor-digital-portfolio/
- **GitHub :** https://github.com/noor-digital
- **Contact :** papeseck.dev@gmail.com

## Présentation

NOOR DIGITAL est l’identité professionnelle sous laquelle je présente mes projets, mes services et ma manière de travailler. *Noor* signifie « lumière » : l’idée est de rendre l’essentiel visible et de construire des expériences numériques claires, utiles et structurées.

Le portfolio conserve une direction artistique inspirée du manga, associée à une identité islamique discrète sur la page À propos : texte arabe correctement balisé, traduction française, motifs géométriques et principes de travail. Ces éléments complètent l’identité professionnelle sans remplacer le contenu technique.

## Pages

| Page | Contenu |
|---|---|
| Accueil | Présentation, aperçu des services et sélection de projets |
| À propos | Profil, parcours, compétences, valeurs et principes |
| Projets | Réalisations, technologies, liens vers le code et les démos |
| Services | Prestations, livrables, méthode et questions fréquentes |
| Contact | Coordonnées et formulaire qui prépare un e-mail |

## Projets présentés

Les liens ci-dessous sont ceux renseignés dans les données du portfolio. Les captures ne sont utilisées que lorsqu’un fichier image réel est disponible ; les projets sans capture utilisent un aperçu illustratif.

| Projet | Description courte | Démo |
|---|---|---|
| Sabaly Consulting | Site vitrine multipage | [Ouvrir](https://sabaly-consulting-green.vercel.app/) |
| To-Do List | Liste de tâches en JavaScript avec sauvegarde locale | [Ouvrir](https://to-do-list-sigma-woad-32.vercel.app/) |
| Vocal Queue System | Gestion simple d’une file avec synthèse vocale | [Ouvrir](https://vocal-queue-system.vercel.app/) |
| Expense Tracker | Suivi de dépenses, filtres, statistiques et CSV | [Ouvrir](https://noor-digital.github.io/expense-tracker/) |
| Aeris Météo | Météo avec prévisions et ambiance dynamique | [Ouvrir](https://noor-digital.github.io/aeris-meteo/) |
| NOVA SHOP | Boutique de démonstration avec panier et favoris | [Ouvrir](https://noor-digital.github.io/nova-shop/) |
| MANGORA | Plateforme de découverte et lecture de mangas | [Ouvrir](https://noor-digital.github.io/mangora/) |

Les dépôts correspondants sont accessibles depuis les fiches projets du site. Les dates et rôles détaillés ne sont pas affichés lorsqu’ils ne sont pas confirmés.

## Services

- Création de sites web adaptés à une activité.
- Intégration d’interfaces responsive à partir d’une maquette ou d’un besoin défini.
- Développement de fonctionnalités web avec JavaScript, PHP, Laravel et MySQL.
- Amélioration et maintenance de sites existants.

Les prestations, livrables et étapes de travail sont décrits dans le portfolio. Le périmètre et le calendrier sont définis avec le client avant le développement.

## Technologies et outils

- **Frontend :** HTML5, CSS3, JavaScript, React, Tailwind CSS, Bootstrap.
- **Backend :** PHP, Laravel.
- **Données :** MySQL.
- **Outils :** Git, GitHub, VS Code, Composer, Laragon, XAMPP, Postman.
- **Design :** Figma, Canva.
- **Écosystème :** Node.js, npm, Vite, GitHub Pages.

## Stack du portfolio

- React 19 et React Router 7.
- Vite 8.
- Motion for React.
- CSS personnalisé et composants réutilisables.
- Polices auto-hébergées via Fontsource.
- Génération des pages statiques, métadonnées, sitemap et fichier robots après compilation.
- Déploiement automatisé sur GitHub Pages avec GitHub Actions.

## Formulaire de contact

Le site est hébergé comme un site statique. Le formulaire prépare un message et ouvre le logiciel de messagerie du visiteur avec un lien `mailto:`. **Il n’envoie pas le message depuis le site et n’affiche pas de faux succès.** Si aucune messagerie ne s’ouvre, le contenu préparé reste affiché et peut être copié.

Les coordonnées saisies sont destinées à permettre une réponse à la demande. Le visiteur choisit lui-même d’ouvrir et d’envoyer le message depuis sa messagerie.

## Installation locale

**Prérequis :** Node.js 20.19 ou plus récent et npm.

```bash
npm install
npm run dev
```

Pour vérifier la version de production :

```bash
npm run build
npm run preview
```

Le build exécute également `scripts/postbuild.js`, qui génère les fichiers HTML des routes, la page 404, le sitemap et le fichier robots.

## Organisation du projet

```text
src/
├── components/       # Composants des pages et éléments réutilisables
├── data/             # Contenus : profil, projets, services, compétences et valeurs
├── hooks/            # Hooks React partagés
├── layout/           # Navigation, pied de page et gestion des routes
├── lib/              # Fonctions utilitaires
├── pages/            # Accueil, À propos, Projets, Services, Contact et 404
└── styles/           # Styles globaux et styles des pages
scripts/
└── postbuild.js      # HTML par route, métadonnées, sitemap et robots.txt
.github/
└── workflows/
    └── deploy.yml    # Compilation et publication GitHub Pages
```

Les contenus modifiables se trouvent principalement dans `src/data/` :

| Modification | Fichier |
|---|---|
| Identité, textes, coordonnées et métadonnées | `src/data/site.js` |
| Projets, descriptions, captures et liens | `src/data/projects.js` |
| Prestations et méthode | `src/data/services.js` |
| Technologies et outils | `src/data/skills.js` |
| Basmala, valeurs et citation | `src/data/values.js` |

## Déploiement

La branche de production est `main`. Chaque push sur cette branche déclenche le workflow [Deploy to GitHub Pages](.github/workflows/deploy.yml), qui installe les dépendances, exécute `npm run build` et publie le dossier `dist/`.

Site publié : https://noor-digital.github.io/noor-digital-portfolio/

## Accessibilité et limites connues

Le projet prévoit une navigation clavier, des états de focus visibles, des libellés de formulaire, des messages d’erreur textuels et la prise en compte de `prefers-reduced-motion`. Ces dispositions ne remplacent pas un audit complet avec des outils spécialisés et des essais sur appareils réels.

Aucun résultat Lighthouse ni couverture de tests automatisés n’est revendiqué dans ce dépôt. Les performances, l’accessibilité et le comportement mobile doivent être mesurés avant d’annoncer des scores.

---

© NOOR DIGITAL — Mamadou Dia Seck
