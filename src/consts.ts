const SITE_URL = (import.meta.env.SITE || 'https://shaominfeng.github.io').replace(/\/+$/, '');

export const SITE = {
  name: 'Allen Shao',
  en: 'Allen Shao',
  blogTitle: '写作',
  blogSubtitle: 'Writing & Notes',
  description:
    'Allen Shao 的技术写作：AI 大模型、Agent 架构、云安全与企业实践。连载系列《从对话到协作》14 章，另有《工程师 Agentic Coding 的一天》《AI 编码成本优化》《RD 的运维副业》等单篇。',
  author: 'Allen Shao',
  authorEn: '邵敏峰',
  email: 'shaominfeng8@gmail.com',
  github: 'https://github.com/shaominfeng',
  personalSite: SITE_URL + '/',
  repo: 'https://github.com/shaominfeng/blog',
  siteUrl: SITE_URL,
  base: '/blog',
  updated: '2026.10',
};

/** 授权协议，站点级默认值；系列可在 src/content/series/*.md 里覆盖 */
export const LICENSE = 'CC BY-NC-SA 4.0';
