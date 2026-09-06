import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/i18n';
import { withBase } from '@/lib/url';

export type ContentName = 'projects' | 'articles' | 'docs';

export async function localizedCollection<T extends ContentName>(name: T, locale: Locale) {
  const items = await getCollection(name);
  return items
    .filter((item) => item.id.startsWith(`${locale}/`) && !item.data.draft)
    .sort((a, b) => {
      const aData = a.data as typeof a.data & { published?: Date };
      const bData = b.data as typeof b.data & { published?: Date };
      const aDate = (aData.date ?? aData.published)?.valueOf() ?? 0;
      const bDate = (bData.date ?? bData.published)?.valueOf() ?? 0;
      return bDate - aDate;
    });
}

export function entrySlug(entry: CollectionEntry<ContentName>) {
  return entry.id.replace(/^(fr|en)\//, '').replace(/\.(md|mdx)$/, '');
}

export function entryImage(data: Record<string, unknown>) {
  return withBase((data.cover || data.image || '/og.svg') as string);
}

export function formatDate(value: Date | undefined, locale: Locale) {
  if (!value) return '';
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(value);
}

export function contentDate(data: { date?: Date; published?: Date; updated?: Date }) {
  return data.updated ?? data.date ?? data.published;
}
