export const SITE = {
  name: 'Allen Shao',
  en: 'Allen Shao',
  blogTitle: '文章集',
  blogSubtitle: 'Writing & Notes',
  description:
    'Allen Shao 的技术写作：AI 大模型、Agent 架构、云安全与企业实践。连载《从对话到协作》14 章，另有单篇《工程师 Agentic Coding 的一天》。',
  author: 'Allen Shao',
  authorEn: '邵敏峰',
  email: 'shaominfeng8@gmail.com',
  github: 'https://github.com/shaominfeng',
  personalSite: 'https://shaominfeng.github.io/',
  repo: 'https://github.com/shaominfeng/blog',
  siteUrl: 'https://shaominfeng.github.io',
  base: '/blog',
  updated: '2026.10',
};

export const SERIES = {
  slug: 'ai-evolution',
  title: '从对话到协作',
  subtitle: 'AI 大模型三年演进全记录',
  description:
    '2022.11—2026.01，AI 大模型三年演进全记录。14 章、约 1.8 万字，从时间线、技术架构与企业实践三个视角，理解 AI 如何从对话走向协作。',
  start: '2022.11',
  end: '2026.01',
  written: '2026.01.27 — 2026.02.24',
  updated: '2026.02.24',
  license: 'CC BY-NC-SA 4.0',
  chapterCount: 14,
  words: '1.8 万',
  sources: 17,
  cover: '/images/evolution-ai-capability.webp',
} as const;

export const SERIES_LIST = [SERIES];

export const PARTS = [
  { name: '序章', order: 0, note: '先读这一章' },
  { name: '导读', order: 1, note: '建立心智模型' },
  { name: '时间线', order: 2, note: '2022—2026' },
  { name: '技术深潜', order: 3, note: '四条主线' },
  { name: '洞察', order: 4, note: '推理层' },
  { name: '实践', order: 5, note: '企业落地' },
  { name: '展望', order: 6, note: '未来三年' },
];