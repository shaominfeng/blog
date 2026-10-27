import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    /**
     * 文章语言。英文译文放在 src/content/articles/en/ 下，id 形如
     * `en/essays/foo`；中文原文保持默认 zh。
     */
    lang: z.enum(['zh', 'en']).default('zh'),
    series: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    part: z.string(),
    partOrder: z.number(),
    order: z.number(),
    num: z.number(),
    readingTime: z.number(),
    featured: z.boolean().default(false),
    kind: z.string().default('chapter'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    date: z.string().optional(),
    updated: z.string().optional(),
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

export const collections = { articles };
