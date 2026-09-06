import { withBase, withoutBase } from '@/lib/url';

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

const copy = {
  fr: {
    nav: { work: 'Projets', journal: 'Articles', docs: 'Documentation', about: 'Profil', contact: 'Contact' },
    heroEyebrow: 'Cloud · Systèmes · Réseaux · Données · Électronique',
    heroTitle: 'Architectures cloud, systèmes et réseaux.',
    heroText: 'Je conçois et documente des infrastructures, des logiciels, des systèmes embarqués et des projets de données.',
    explore: 'Explorer les projets',
    contact: 'Démarrer une conversation',
    featured: 'Sélection',
    latest: 'Dernières réflexions',
    all: 'Tout',
    read: 'Lire',
    view: 'Voir le projet',
    search: 'Rechercher dans les notes…',
    noResults: 'Aucun résultat.',
    contents: 'Sommaire',
    back: 'Retour',
    soundOn: 'Activer le son',
    soundOff: 'Couper le son',
    planet: {
      ariaLabel: 'Planète interactive des 21 projets. Faites glisser pour tourner, utilisez la molette ou pincez pour zoomer, puis sélectionnez un point d’intérêt.',
      instruction: 'GLISSER · ZOOMER · ESPACE : VISITE',
      projectsLabel: 'Zones et projets de la planète',
      guidedTour: 'Lancer la visite guidée',
      guidedStarted: 'Visite guidée lancée',
      guidedStopped: 'Visite guidée arrêtée',
      openProject: 'Ouvrir le projet',
      webglUnavailable: 'Affichage 3D indisponible. La carte accessible reste disponible.',
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
    nav: { work: 'Projects', journal: 'Articles', docs: 'Documentation', about: 'Profile', contact: 'Contact' },
    heroEyebrow: 'Cloud · Systems · Networks · Data · Electronics',
    heroTitle: 'Cloud, systems and network architectures.',
    heroText: 'I design and document infrastructure, software, embedded systems and data projects.',
    explore: 'Explore selected work',
    contact: 'Start a conversation',
    featured: 'Selected work',
    latest: 'Latest thinking',
    all: 'All',
    read: 'Read',
    view: 'View project',
    search: 'Search the notes…',
    noResults: 'No results.',
    contents: 'Contents',
    back: 'Back',
    soundOn: 'Enable sound',
    soundOff: 'Mute sound',
    planet: {
      ariaLabel: 'Interactive planet of 21 projects. Drag to rotate, use the wheel or pinch to zoom, then select a point of interest.',
      instruction: 'DRAG · ZOOM · SPACE: TOUR',
      projectsLabel: 'Planet zones and projects',
      guidedTour: 'Start guided tour',
      guidedStarted: 'Guided tour started',
      guidedStopped: 'Guided tour stopped',
      openProject: 'Open project',
      webglUnavailable: '3D view unavailable. The accessible map remains available.',
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
