export const PLANET_ZONE_IDS = [
  'cloud',
  'systems',
  'data',
  'iot',
  'embedded',
  'security',
  'governance',
] as const;

export type PlanetZoneId = (typeof PLANET_ZONE_IDS)[number];

export interface PlanetProject {
  id: string;
  title: string;
  href: string;
  zone: PlanetZoneId;
  featured: boolean;
  tags: string[];
  latitude: number;
  longitude: number;
}

export interface PlanetZone {
  id: PlanetZoneId;
  title: string;
  latitude: number;
  longitude: number;
  featured: boolean;
  projects: PlanetProject[];
}

export interface PlanetManifest {
  locale: 'fr' | 'en';
  zones: PlanetZone[];
  projects: PlanetProject[];
}

export interface PlanetUiCopy {
  openProject: string;
  guidedStarted: string;
  guidedStopped: string;
  webglUnavailable: string;
}
