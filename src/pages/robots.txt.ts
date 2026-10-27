import type { APIRoute } from 'astro';

// blog 子站的 robots（根域 robots 由主站提供，这里保持一致）
export const GET: APIRoute = ({ site }) => {
  const base = (site?.href || 'https://shaominfeng.github.io/').replace(/\/+$/, '');

  const body = `User-agent: *
Allow: /

Sitemap: ${base}/blog/sitemap-index.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
