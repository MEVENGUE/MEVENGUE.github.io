# Portfolio d’ingénierie — Franck Mevengue

Portfolio académique bilingue consacré à mes travaux en cloud, systèmes, réseaux, DevOps, cybersécurité, données, IoT et électronique embarquée.

Le site transforme mon parcours ECAM EPMI et SUPINFO Paris en une archive technique consultable : études de cas, architectures, articles, documentation et livrables originaux sont réunis dans une expérience éditoriale interactive.

[Visiter le portfolio](https://mevengue.github.io/mevenguefranck.github.io/)

## Expérience

- Interface disponible en français et en anglais
- Ville-planète 3D représentant 21 projets dans sept quartiers techniques
- Catalogue organisé par établissement et domaine d’ingénierie
- Études de cas détaillant contexte, architecture, mise en œuvre et résultats
- Visualisation intégrée des rapports, présentations et autres livrables
- Journal technique, base documentaire, catégories, tags, RSS et sitemap
- Navigation accessible au clavier et alternative complète sans WebGL
- Adaptation mobile, mouvement réduit et chargement différé de Three.js

## Univers de la planète

La scène Three.js est générée de manière procédurale, sans modèle 3D externe. Elle présente :

- Cloud et datacenters
- Systèmes et réseaux
- Data et intelligence artificielle
- IoT aquatique
- Électronique et systèmes embarqués
- Cybersécurité
- Gouvernance et gestion de projet

Chaque point d’intérêt est généré depuis les collections de contenu Astro et mène vers la fiche du projet correspondant.

## Technologies

- Astro
- TypeScript
- Three.js
- CSS personnalisé
- Markdown et MDX
- Collections de contenu Astro
- Génération statique
- RSS et sitemap

Le site privilégie une architecture statique. Le moteur 3D est importé dynamiquement uniquement lorsque le navigateur prend en charge WebGL et que les préférences de mouvement l’autorisent.

## Organisation du projet

```text
src/
├── components/          Composants Astro et interfaces
├── config/              Identité et coordonnées centralisées
├── content/
│   ├── projects/        21 projets en français et en anglais
│   ├── articles/        Articles techniques
│   └── docs/            Documentation pratique
├── layouts/             Layout principal et lecteur
├── lib/                 Utilitaires de contenu et manifeste 3D
├── pages/               Routes statiques FR/EN
├── planet/              Moteur Three.js de la ville-planète
└── styles/              Design system et styles modulaires

public/
├── assets/              Images et visuels optimisés
├── documents/           Rapports, présentations et guides
├── favicon.svg
└── og.svg
```

## Installation locale

Prérequis : Node.js récent et npm.

```bash
npm install
npm run dev
```

Le site est ensuite disponible sur `http://localhost:4321/mevenguefranck.github.io/`.

## Commandes

```bash
npm run dev       # serveur de développement
npm run check     # validation Astro, TypeScript et contenus
npm run build     # génération du site statique dans dist/
npm run preview   # prévisualisation du build
```

## Déploiement sur GitHub Pages

Le site est configuré comme project site du dépôt
[`MEVENGUE/mevenguefranck.github.io`](https://github.com/MEVENGUE/mevenguefranck.github.io).
Son URL publique est :

<https://mevengue.github.io/mevenguefranck.github.io/>

Le workflow `.github/workflows/deploy.yml` construit puis publie automatiquement
le site sur GitHub Pages à chaque push sur `main`. Il peut aussi être déclenché
manuellement depuis l’onglet Actions avec `workflow_dispatch`.

Dans les paramètres du dépôt GitHub, **Settings → Pages → Build and deployment**,
la source doit être réglée sur **GitHub Actions**.

## Gestion du contenu

Les projets, articles et documents sont écrits en Markdown ou MDX. Les versions françaises et anglaises sont rangées dans les sous-dossiers `fr/` et `en/`.

Une fiche projet contient notamment :

```yaml
---
title: "Titre du projet"
description: "Résumé vérifiable du projet"
locale: "fr"
translationKey: "project.identifiant"
year: 2026
category: "Cloud"
school: "SUPINFO Paris"
tags: ["Cloud", "Réseaux"]
stack: ["Astro", "Docker"]
featured: true
documents:
  - title: "Rapport technique"
    type: "report"
    url: "/documents/projet/rapport.pdf"
---
```

Les livrables doivent être placés dans `public/documents/`. Leur chemin public peut ensuite être référencé dans le frontmatter afin de les afficher dans le lecteur intégré.

## Validation

La version actuelle comprend :

- 21 projets localisés
- 34 fiches FR/EN enrichies à partir des sources et livrables
- 35 documents de projet vérifiés
- 282 routes statiques générées
- aucune erreur Astro ou TypeScript lors du dernier contrôle

## Accessibilité et performances

Le site intègre des repères sémantiques, des états de focus visibles, une navigation clavier, des textes alternatifs et une liste HTML des projets de la planète.

La scène 3D dispose d’un fallback SVG, respecte `prefers-reduced-motion`, adapte sa qualité aux appareils mobiles, limite le DPR et suspend son animation hors écran.

## Contact

Franck Mevengue — Paris, France

- [Email](mailto:mevengueengofranck@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/franck-mevengue-839028207/)
- [GitHub](https://github.com/MEVENGUE)
