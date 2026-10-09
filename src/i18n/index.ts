import { withBase, withoutBase } from '@/lib/url';

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

const copy = {
  fr: {
    nav: {
      about: 'Profil',
      work: 'Projets',
      books: 'Livre',
      journal: 'Articles',
      docs: 'Docs',
      contact: 'Contact',
    },
    heroEyebrow: 'Cloud · Systèmes · Réseaux · Données · Électronique',
    heroTitle: 'Architectures cloud, systèmes et réseaux.',
    heroText: 'Je conçois et documente des infrastructures, des logiciels, des systèmes embarqués et des projets de données.',
    explore: 'Voir les projets',
    contact: 'Contact',
    featured: 'Sélection',
    latest: 'Dernières notes',
    all: 'Tout',
    read: 'Lire',
    view: 'Voir le projet',
    search: 'Rechercher…',
    noResults: 'Aucun résultat.',
    contents: 'Sommaire',
    back: 'Retour',
    soundOn: 'Activer le son',
    soundOff: 'Couper le son',
    news: 'News',
    education: 'Formation',
    selectedProjects: 'Projets sélectionnés',
    writing: 'Articles',
    documentation: 'Documentation',
    projectMap: 'Carte des projets',
    projectMapLead: 'Vue discrète des 21 travaux, organisés par domaine. La liste ci-dessous reste le moyen le plus fiable d’ouvrir un projet.',
    bookSection: 'Livre',
    readPdf: 'Lire le PDF',
    planet: {
      ariaLabel: 'Carte interactive des 21 projets. Faites glisser pour tourner, utilisez la molette ou pincez pour zoomer.',
      instruction: 'GLISSER · ZOOMER · ESPACE',
      projectsLabel: 'Projets par zone',
      guidedTour: 'Visite',
      guidedStarted: 'Visite lancée',
      guidedStopped: 'Visite arrêtée',
      openProject: 'Ouvrir le projet',
      webglUnavailable: 'Affichage 3D indisponible. La liste accessible reste disponible.',
      zones: {
        cloud: 'Cloud & Datacenters',
        systems: 'Systèmes & Réseaux',
        data: 'Data & IA',
        iot: 'IoT aquatique',
        embedded: 'Électronique & Embarqué',
        security: 'Cybersécurité',
        governance: 'Gouvernance',
      },
    },
    skip: 'Aller au contenu',
    footer: 'Conçu et développé par Franck Mevengue.',
  },
  en: {
    nav: {
      about: 'About',
      work: 'Projects',
      books: 'Book',
      journal: 'Writing',
      docs: 'Docs',
      contact: 'Contact',
    },
    heroEyebrow: 'Cloud · Systems · Networks · Data · Electronics',
    heroTitle: 'Cloud, systems and network architectures.',
    heroText: 'I design and document infrastructure, software, embedded systems and data projects.',
    explore: 'View projects',
    contact: 'Contact',
    featured: 'Selected',
    latest: 'Latest notes',
    all: 'All',
    read: 'Read',
    view: 'View project',
    search: 'Search…',
    noResults: 'No results.',
    contents: 'Contents',
    back: 'Back',
    soundOn: 'Enable sound',
    soundOff: 'Mute sound',
    news: 'News',
    education: 'Education',
    selectedProjects: 'Selected projects',
    writing: 'Writing',
    documentation: 'Documentation',
    projectMap: 'Project map',
    projectMapLead: 'A discreet view of the 21 works, organized by domain. The list below remains the most reliable way to open a project.',
    bookSection: 'Book',
    readPdf: 'Read PDF',
    planet: {
      ariaLabel: 'Interactive map of 21 projects. Drag to rotate, use the wheel or pinch to zoom.',
      instruction: 'DRAG · ZOOM · SPACE',
      projectsLabel: 'Projects by zone',
      guidedTour: 'Tour',
      guidedStarted: 'Tour started',
      guidedStopped: 'Tour stopped',
      openProject: 'Open project',
      webglUnavailable: '3D view unavailable. The accessible list remains available.',
      zones: {
        cloud: 'Cloud & Datacenters',
        systems: 'Systems & Networks',
        data: 'Data & AI',
        iot: 'Aquatic IoT',
        embedded: 'Electronics & Embedded',
        security: 'Cybersecurity',
        governance: 'Governance',
      },
    },
    skip: 'Skip to content',
    footer: 'Designed and built by Franck Mevengue.',
  },
} as const;

export function t(locale: Locale) {
  return copy[locale];
}

export function localeFromId(id: string): Locale {
  return id.split('/')[0] === 'en' ? 'en' : 'fr';
}

export function slugFromId(id: string) {
  return id.replace(/^(fr|en)\//, '').replace(/\.(md|mdx)$/, '');
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const unbasedPath = withoutBase(pathname);
  const parts = unbasedPath.split('/').filter(Boolean);
  if (parts[0] === '404') return withBase(`/${locale}/`);
  if (locales.includes(parts[0] as Locale)) parts[0] = locale;
  else parts.unshift(locale);
  return withBase(`/${parts.join('/')}${unbasedPath.endsWith('/') ? '/' : ''}`);
}
