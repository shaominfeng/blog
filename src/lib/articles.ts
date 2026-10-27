import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type ArticleEntry = CollectionEntry<'articles'>;

/** 文章 slug（id 的最后一段，中英文一致） */
export const slugOf = (entry: ArticleEntry) => entry.id.split('/').pop() as string;

/** 按语言筛选：中文只取 lang=zh，英文只取 lang=en */
export const byLang = (entries: ArticleEntry[], lang: Lang) =>
  entries.filter((entry) => (entry.data.lang === 'en') === (lang === 'en'));

/** 某一系列的章节，按 order 排序 */
export const seriesOf = (entries: ArticleEntry[], series: string, lang: Lang) =>
  byLang(entries, lang)
    .filter((entry) => entry.data.series === series)
    .sort((a, b) => a.data.order - b.data.order);

/** 单篇，按日期倒序 */
export const essaysOf = (entries: ArticleEntry[], lang: Lang) =>
  byLang(entries, lang)
    .filter((entry) => entry.data.series === 'essays')
    .sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? ''));
