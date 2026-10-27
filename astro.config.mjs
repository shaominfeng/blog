import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';

// 站点域名可切换：默认 GitHub Pages，国内部署时用 SITE_URL 覆盖
const SITE_URL = (process.env.SITE_URL || 'https://shaominfeng.github.io').replace(/\/+$/, '');

export default defineConfig({
  site: SITE_URL,
  base: '/blog',
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
          properties: { className: ['heading-anchor'], 'aria-label': 'Permalink' },
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
