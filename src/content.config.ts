import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 内容模型：路径即索引。
 *
 *   src/content/articles/<lang>/<series>/<slug>.md
 *                         │       │         └── slug（URL 最后一段）
 *                         │       └──────────── 系列 id，对应 src/content/series/<series>.md
 *                         └──────────────────── 语言：zh | en
 *
 * 语言和系列都不再写进 frontmatter —— 目录说一次就够了，推导逻辑在 src/lib/articles.ts。
 */

/** 系列在一个语言下的文案块，中英各一份 */
const localized = z.object({
  label: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  /** 章节型系列首页的编辑版式；缺省时降级为简洁列表 */
  kicker: z.string().optional(),
  heroTitle: z.string().optional(),
  heroAccent: z.string().optional(),
  heroDesc: z.string().optional(),
  cta: z.string().optional(),
  /** 封面图注与角标，纯装饰 */
  figLabel: z.string().optional(),
  figRange: z.string().optional(),
  floatValue: z.string().optional(),
  floatLabel: z.string().optional(),
  stamp: z.string().optional(),
  /** 允许 {chapters} {words} {minutes} {sources} {written} 占位符 */
  note: z.array(z.string()).default([]),
  tldr: z.array(z.object({ label: z.string(), title: z.string(), body: z.string() })).default([]),
  paths: z
    .array(z.object({ title: z.string(), desc: z.string(), items: z.array(z.string()) }))
    .default([]),
  stats: z
    .array(
      z.object({
        value: z.string(),
        unit: z.string().default(''),
        label: z.string().default(''),
      })
    )
    .default([]),
  about: z.array(z.string()).default([]),
  /** 列表页底部的收尾文案 */
  outroTitle: z.string().optional(),
  outro: z.string().optional(),
});

const series = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/series' }),
  schema: z.object({
    kind: z.enum(['chapters', 'essays']).default('chapters'),
    order: z.number().default(99),
    cover: z.string().optional(),
    start: z.string().optional(),
    end: z.string().optional(),
    written: z.string().optional(),
    updated: z.string().optional(),
    sources: z.number().optional(),
    license: z.string().optional(),
    published: z.string().optional(),
    modified: z.string().optional(),
    /** 章节型系列的分卷；key 与文章 frontmatter 的 part 对应 */
    parts: z.array(z.object({ key: z.string(), zh: z.string(), en: z.string() })).default([]),
    zh: localized,
    en: localized,
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    /** 分卷 key，指向 series.parts[].key；单篇留空 */
    part: z.string().optional(),
    /** 系列内阅读顺序 */
    order: z.number().default(0),
    readingTime: z.number(),
    tags: z.array(z.string()).default([]),
    date: z.string().optional(),
    updated: z.string().optional(),
    cover: z.string().optional(),
    metrics: z
      .array(z.object({ value: z.string(), label: z.string().default('') }))
      .default([]),
    panel: z
      .object({
        time: z.string(),
        label: z.string(),
        meta: z.string().default('ALLEN SHAO / 2026'),
      })
      .optional(),
  }),
});

export const collections = { articles, series };
