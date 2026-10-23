import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, SERIES } from '../consts';

export async function GET(context) {
  const articles = (await getCollection('articles'))
    .filter((article) => article.data.series === SERIES.slug)
    .sort((a, b) => a.data.order - b.data.order);

  const essays = (await getCollection('articles'))
    .filter((article) => article.data.series === 'essays')
    .sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? ''));

  return rss({
    title: SITE.name + ' · ' + SITE.blogTitle,
    description: SITE.description,
    site: context.site,
    trailingSlash: true,
    items: [
      ...articles.map((article) => ({
        title: article.data.title,
        description: article.data.description,
        pubDate: new Date(article.data.updated ?? article.data.date ?? '2026-02-24'),
        link: SITE.base + '/ai-evolution/' + article.id.split('/').pop() + '/',
        categories: [SERIES.title, article.data.part, ...article.data.tags],
      })),
      ...essays.map((essay) => ({
        title: essay.data.title,
        description: essay.data.description,
        pubDate: new Date(essay.data.date ?? '2026-06-26'),
        link: SITE.base + '/essays/' + essay.id.split('/').pop() + '/',
        categories: ['单篇', ...essay.data.tags],
      })),
    ],
    customData: '<language>zh-cn</language>',
  });
}
