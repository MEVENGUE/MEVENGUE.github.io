import type { CollectionEntry } from 'astro:content';
import { entrySlug } from '@/lib/content';
import {
  PLANET_ZONE_IDS,
  type PlanetManifest,
  type PlanetZoneId,
} from '@/planet/types';
import type { Locale } from '@/i18n';
import { withBase } from '@/lib/url';

const anchors: Record<PlanetZoneId, [number, number]> = {
  cloud: [25, -20],
  systems: [9, 38],
  data: [43, 68],
  iot: [-28, 96],
  embedded: [-36, 8],
  security: [14, -88],
  governance: [55, 152],
};

function searchable(entry: CollectionEntry<'projects'>) {
  return [
    entry.data.title,
    entry.data.category,
    entry.data.description,
    ...entry.data.tags,
    ...entry.data.stack,
  ].join(' ').toLocaleLowerCase();
}

function projectZone(entry: CollectionEntry<'projects'>): PlanetZoneId {
  const text = searchable(entry);
  if (/(cyber|sécur|security|hardening|nmap|scapy|vulnér)/.test(text)) return 'security';
  if (/(iot|aquati|esp32|arduino|capteur|sensor)/.test(text)) return 'iot';
  if (/(électron|electronic|embarqué|embedded|microcontr|rauch|signal)/.test(text)) return 'embedded';
  if (/(data|machine learning| ia | ai |qlik|power bi|physique|boltzmann)/.test(` ${text} `)) return 'data';
  if (/(gestion|management|itil|éthique|ethic|rse|change|gantt|raci|innovation)/.test(text)) return 'governance';
  if (/(cloud|aws|azure|openstack|docker|kubernetes|datacenter|galera|gluster)/.test(text)) return 'cloud';
  return 'systems';
}

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

export function createPlanetManifest(
  entries: CollectionEntry<'projects'>[],
  locale: Locale,
  zoneTitles: Record<PlanetZoneId, string>,
): PlanetManifest {
  const projects = entries.map((entry) => {
    const zone = projectZone(entry);
    const [baseLatitude, baseLongitude] = anchors[zone];
    const seed = hash(entry.id);
    return {
      id: entry.id,
      title: entry.data.title,
      href: withBase(`/${locale}/work/${entrySlug(entry)}/`),
      zone,
      featured: entry.data.featured,
      tags: entry.data.tags,
      latitude: baseLatitude + ((seed % 1300) / 100 - 6.5),
      longitude: baseLongitude + (((seed >>> 8) % 1800) / 100 - 9),
    };
  });

  const zones = PLANET_ZONE_IDS.map((id) => {
    const [latitude, longitude] = anchors[id];
    const zoneProjects = projects.filter((project) => project.zone === id);
    return {
      id,
      title: zoneTitles[id],
      latitude,
      longitude,
      featured: zoneProjects.some((project) => project.featured),
      projects: zoneProjects,
    };
  });

  return { locale, zones, projects };
}
