import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
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
  }),
});

export const collections = { articles };
