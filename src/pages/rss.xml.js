import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import { allSeries, articleUrl, byDateDesc, byOrder, inSeries } from '../lib/articles';

export async function GET(context) {
  const [seriesList, all] = await Promise.all([allSeries(), getCollection('articles')]);

  const items = seriesList.flatMap((series) => {
    const meta = series.data.zh;
    const entries =
      series.data.kind === 'essays'
        ? byDateDesc(inSeries(all, series.id, 'zh'))
        : byOrder(inSeries(all, series.id, 'zh'));

    return entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: new Date(
        entry.data.updated ?? entry.data.date ?? series.data.modified ?? series.data.published ?? '2026-02-24'
      ),
      link: articleUrl(entry),
      categories: [
        meta.title,
        entry.data.part ? (series.data.parts.find((part) => part.key === entry.data.part)?.zh ?? '') : meta.label,
        ...entry.data.tags,
      ].filter(Boolean),
    }));
  });

  return rss({
    title: SITE.name + ' · ' + SITE.blogTitle,
    description: SITE.description,
    site: context.site,
    trailingSlash: true,
    items,
    customData: '<language>zh-cn</language>',
  });
}
