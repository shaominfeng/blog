import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://shaominfeng.github.io',
  base: '/ai-evolution',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark-default', wrap: true },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['heading-anchor'], 'aria-label': '本节链接' },
          content: {
            type: 'element',
            tagName: 'span',
            properties: { className: ['anchor-mark'] },
            children: [{ type: 'text', value: '#' }],
          },
        },
      ],
      [
        rehypeExternalLinks,
        { target: '_blank', rel: ['noopener', 'noreferrer'], protocols: ['http', 'https'] },
      ],
    ],
  },
});
