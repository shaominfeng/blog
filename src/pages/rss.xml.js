import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

export async function GET(context) {
  const chapters = (await getCollection('chapters')).sort((a, b) => a.data.order - b.data.order);

  return rss({
    title: SITE.title + ' · ' + SITE.subtitle,
    description: SITE.description,
    site: context.site,
    trailingSlash: true,
    items: chapters.map((chapter) => ({
      title: chapter.data.title,
      description: chapter.data.description,
      pubDate: new Date(chapter.data.updated ?? chapter.data.date ?? '2026-02-24'),
      link: SITE.base + '/read/' + chapter.id + '/',
      categories: [chapter.data.part, ...chapter.data.tags],
    })),
    customData: '<language>zh-cn</language>',
  });
}
