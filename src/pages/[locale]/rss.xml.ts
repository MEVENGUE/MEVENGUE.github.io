import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { contentDate, entrySlug } from '@/lib/content';
import { locales, type Locale } from '@/i18n';
import { withBase } from '@/lib/url';

export function getStaticPaths() {
  return locales.map((locale) => ({ params: { locale } }));
}

export async function GET(context: { params: { locale?: string }; site?: URL }) {
  const locale = (context.params.locale || 'fr') as Locale;
  const articles = (await getCollection('articles'))
    .filter((entry) => entry.id.startsWith(`${locale}/`) && !entry.data.draft);
  return rss({
    title: `Franck Mevengue — ${locale === 'fr' ? 'Journal' : 'Journal'}`,
    description: locale === 'fr' ? 'Notes sur le cloud, les réseaux, la sécurité et les systèmes distribués.' : 'Notes on cloud, networks, security and distributed systems.',
    site: new URL(withBase('/'), context.site!),
    items: articles.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: contentDate(entry.data) ?? new Date(0),
      link: withBase(`/${locale}/journal/${entrySlug(entry)}/`),
      categories: entry.data.tags,
      author: 'Franck Mevengue',
    })),
    customData: `<language>${locale}</language>`,
  });
}
