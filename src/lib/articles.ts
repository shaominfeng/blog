import { getCollection, type CollectionEntry } from 'astro:content';
import { basePath, type Lang } from '../i18n';

export type ArticleEntry = CollectionEntry<'articles'>;
export type SeriesEntry = CollectionEntry<'series'>;

/* ——————————————————————————————————————————————
   路径即索引：articles/<lang>/<series>/<slug>.md
   下面三个函数是唯一的读取入口，别处不要再解析 id。
   —————————————————————————————————————————————— */

const segments = (entry: ArticleEntry) => entry.id.split('/');

/** 语言来自目录第一段 */
export const langOf = (entry: ArticleEntry): Lang => (segments(entry)[0] === 'en' ? 'en' : 'zh');

/** 系列来自目录第二段 */
export const seriesKeyOf = (entry: ArticleEntry): string => segments(entry)[1];

/** slug 是目录最后一段，也就是 URL 的最后一段 */
export const slugOf = (entry: ArticleEntry): string => segments(entry).at(-1) as string;

/** /blog/ai-evolution/mcp/ 或 /blog/en/essays/foo/ */
export const articleUrl = (entry: ArticleEntry): string =>
  `${basePath(langOf(entry))}/${seriesKeyOf(entry)}/${slugOf(entry)}/`;

export const seriesUrl = (key: string, lang: Lang): string => `${basePath(lang)}/${key}/`;

/* ——————————————————————————————————————————————
   查询与排序
   —————————————————————————————————————————————— */

export const inSeries = (entries: ArticleEntry[], key: string, lang: Lang): ArticleEntry[] =>
  entries.filter((entry) => langOf(entry) === lang && seriesKeyOf(entry) === key);

/** 章节按 order 升序 */
export const byOrder = (entries: ArticleEntry[]): ArticleEntry[] =>
  [...entries].sort((a, b) => a.data.order - b.data.order);

/** 单篇按日期倒序 */
export const byDateDesc = (entries: ArticleEntry[]): ArticleEntry[] =>
  [...entries].sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? ''));

/** 章节按分卷切段（依赖已排好序的输入） */
export const groupByPart = (entries: ArticleEntry[]): { part: string; items: ArticleEntry[] }[] => {
  const groups: { part: string; items: ArticleEntry[] }[] = [];
  for (const entry of entries) {
    const key = entry.data.part ?? '';
    const last = groups.at(-1);
    if (!last || last.part !== key) groups.push({ part: key, items: [entry] });
    else last.items.push(entry);
  }
  return groups;
};

/** 分卷 key → 该语言的显示名 */
export const partLabel = (series: SeriesEntry, key: string, lang: Lang): string =>
  series.data.parts.find((part) => part.key === key)?.[lang] ?? key;

/* ——————————————————————————————————————————————
   系列
   —————————————————————————————————————————————— */

export const allSeries = async (): Promise<SeriesEntry[]> =>
  (await getCollection('series')).sort((a, b) => a.data.order - b.data.order);

export const findSeries = async (key: string): Promise<SeriesEntry | undefined> =>
  (await allSeries()).find((entry) => entry.id === key);

/** 站点的主系列：第一个章节型系列，用于页头导航与首页 */
export const primarySeries = async (): Promise<SeriesEntry | undefined> =>
  (await allSeries()).find((entry) => entry.data.kind === 'chapters');

/** 单篇集合 */
export const essaySeries = async (): Promise<SeriesEntry | undefined> =>
  (await allSeries()).find((entry) => entry.data.kind === 'essays');

/* ——————————————————————————————————————————————
   篇幅统计：中文按汉字记，英文按词记
   —————————————————————————————————————————————— */

const bodyOf = (entry: ArticleEntry): string =>
  typeof (entry as { body?: string }).body === 'string' ? (entry as { body: string }).body : '';

const countChars = (text: string): number => (text.match(/[\u3400-\u9fff]/g) ?? []).length;

const countWords = (text: string): number => (text.match(/[A-Za-z][A-Za-z'’-]*/g) ?? []).length;

/** 中文字数：只数汉字，万字保留一位小数，如 "1.8" */
export const wanWords = (entries: ArticleEntry[]): string => {
  const total = entries.reduce((sum, entry) => sum + countChars(bodyOf(entry)), 0);
  return (Math.round(total / 1000) / 10).toFixed(1);
};

/** 英文词数：千分位，如 "18,400" */
export const wordTotal = (entries: ArticleEntry[]): string =>
  entries.reduce((sum, entry) => sum + countWords(bodyOf(entry)), 0).toLocaleString('en-US');

export const totalMinutes = (entries: ArticleEntry[]): number =>
  entries.reduce((sum, entry) => sum + entry.data.readingTime, 0);

/* ——————————————————————————————————————————————
   文案占位符：{chapters} {words} {minutes} {sources} {written}
   —————————————————————————————————————————————— */

export const fill = (template: string, vars: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''));
