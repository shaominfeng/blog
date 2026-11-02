const SITE_URL = (import.meta.env.SITE || 'https://shaominfeng.github.io').replace(/\/+$/, '');

export const SITE = {
  name: 'Allen Shao',
  en: 'Allen Shao',
  blogTitle: '写作',
  description:
    'Allen Shao 的技术写作：AI 大模型、Agent 架构、云安全与企业实践。包括连载系列与单篇长文。',
  author: 'Allen Shao',
  authorEn: '邵敏峰',
  email: 'shaominfeng8@gmail.com',
  github: 'https://github.com/shaominfeng',
  personalSite: SITE_URL + '/',
  repo: 'https://github.com/shaominfeng/blog',
  siteUrl: SITE_URL,
  base: '/blog',
};

/** 授权协议，站点级默认值；系列可在 src/content/series/*.md 里覆盖 */
export const LICENSE = 'CC BY-NC-SA 4.0';

/** 正文标签里带特殊样式的两个值：速览卡片与深度标记 */
export const TAG = { quick: '速览', deep: '深度' } as const;
