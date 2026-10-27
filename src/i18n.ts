import { SERIES, SITE } from './consts';

export type Lang = 'zh' | 'en';

/** 某一语言的站点前缀：中文 /blog，英文 /blog/en */
export const basePath = (lang: Lang) => (lang === 'en' ? SITE.base + '/en' : SITE.base);

/** 从 URL 判断当前语言 */
export const langFromPath = (pathname: string): Lang =>
  pathname.startsWith(SITE.base + '/en/') || pathname === SITE.base + '/en' ? 'en' : 'zh';

/** 系列名与分卷名（中英） */
export const SERIES_I18N = {
  zh: {
    title: SERIES.title,
    subtitle: SERIES.subtitle,
    description: SERIES.description,
    parts: {
      序章: '序章',
      导读: '导读',
      时间线: '时间线',
      技术深潜: '技术深潜',
      洞察: '洞察',
      实践: '实践',
      展望: '展望',
    },
  },
  en: {
    title: 'From Conversation to Collaboration',
    subtitle: 'Three years of LLM evolution, 2022—2026',
    description:
      'Fourteen chapters on how large language models moved from conversation to collaboration — the timeline, the architecture, and what it takes to ship in an enterprise.',
    parts: {
      序章: 'Prologue',
      导读: 'Primer',
      时间线: 'Timeline',
      技术深潜: 'Deep dive',
      洞察: 'Insight',
      实践: 'Practice',
      展望: 'Outlook',
    },
  },
} as const;

const zh = {
  htmlLang: 'zh-CN',
  ogLocale: 'zh_CN',
  ogLocaleAlt: 'en_US',
  skipLink: '跳到正文',
  nav: {
    label: '主导航',
    home: '文章集',
    essays: '单篇',
    series: SERIES.title,
    about: '关于',
    personal: '个人主页 ↗',
    cta: '开始阅读',
    switchLabel: 'Switch to English',
    switchText: 'EN',
  },
  footer: {
    tagline: SITE.blogSubtitle + ' · 持续更新',
    home: '文章集',
    series: SERIES.title,
    about: '关于',
    personal: '个人主页 ↗',
    license: '文字以 ' + SERIES.license + ' 授权 · 转载注明出处',
    built: '用 Astro 构建 · GitHub Pages',
  },
  article: {
    crumbsHome: '文章集',
    chapter: (n: string) => '第 ' + n + ' 章',
    essayLabel: 'Essay',
    quickTag: '本章为要点速览',
    essayTag: '单篇长文',
    wroteOn: (d: string) => '写于 ' + d,
    updatedOn: (d: string) => '更新于 ' + d,
    minutes: (n: number) => n + ' 分钟',
    chapterToc: (n: string) => '章节目录 · 当前第 ' + n + ' 章',
    essayToc: '单篇目录',
    continueReading: 'Continue reading',
    prevChapter: (n: string) => '← 上一章 · ' + n,
    nextChapter: (n: string) => '下一章 · ' + n + ' →',
    backToSeries: '← 回到系列',
    finished: '读完了 →',
    backToCollection: '回到文章集',
    prevEssay: '← 上一篇',
    nextEssay: '下一篇 →',
    back: '← 回到',
    more: '更多 →',
    allEssays: '全部单篇',
    bio: '全栈工程师，关注 AI Agent、云安全与开发者体验。把公开信息放回时间线，也把自己踩过的坑写下来。',
    bioLink: '个人主页 ↗',
    license:
      '本文以 ' + SERIES.license + ' 授权，转载请注明作者与出处。文中观点为个人观察，不代表任职机构。',
  },
  side: {
    chapterNavLabel: '章节目录',
    essayNavLabel: '单篇目录',
    back: '← 文章集',
    chapterCount: SERIES.chapterCount + ' 章 · ' + SERIES.start + '—' + SERIES.end,
    essayCount: '篇 · 持续更新',
    essays: '单篇长文',
    seriesLabel: 'Series / 01',
    chapterUnit: (n: number) => n + ' 章',
  },
  tocLabel: '本页目录',
} as const;

const en = {
  htmlLang: 'en',
  ogLocale: 'en_US',
  ogLocaleAlt: 'zh_CN',
  skipLink: 'Skip to content',
  nav: {
    label: 'Main navigation',
    home: 'Writing',
    essays: 'Essays',
    series: 'The Series',
    about: 'About',
    personal: 'Home ↗',
    cta: 'Start reading',
    switchLabel: '切换到中文',
    switchText: '中',
  },
  footer: {
    tagline: 'Writing & Notes · updated regularly',
    home: 'Writing',
    series: SERIES_I18N.en.title,
    about: 'About',
    personal: 'Home ↗',
    license: 'Text licensed under ' + SERIES.license + ' · credit the author on reposts',
    built: 'Built with Astro · GitHub Pages',
  },
  article: {
    crumbsHome: 'Writing',
    chapter: (n: string) => 'Chapter ' + n,
    essayLabel: 'Essay',
    quickTag: 'Quick overview of this chapter',
    essayTag: 'Standalone essay',
    wroteOn: (d: string) => 'Written ' + d,
    updatedOn: (d: string) => 'Updated ' + d,
    minutes: (n: number) => n + ' min read',
    chapterToc: (n: string) => 'Chapters · currently ' + n,
    essayToc: 'All essays',
    continueReading: 'Continue reading',
    prevChapter: (n: string) => '← Previous chapter · ' + n,
    nextChapter: (n: string) => 'Next chapter · ' + n + ' →',
    backToSeries: '← Back to the series',
    finished: 'Finished →',
    backToCollection: 'Back to all writing',
    prevEssay: '← Previous essay',
    nextEssay: 'Next essay →',
    back: '← Back to',
    more: 'More →',
    allEssays: 'All essays',
    bio: 'Full-stack engineer working on AI agents, cloud security and developer experience. I put public information back on a timeline, and write down the potholes I hit myself.',
    bioLink: 'Personal site ↗',
    license:
      'Licensed under ' + SERIES.license + '. Please credit the author and link back when reposting. Views here are personal and do not represent my employer.',
  },
  side: {
    chapterNavLabel: 'Chapter list',
    essayNavLabel: 'Essay list',
    back: '← Writing',
    chapterCount: SERIES.chapterCount + ' chapters · ' + SERIES.start + '—' + SERIES.end,
    essayCount: ' essays · ongoing',
    essays: 'Standalone essays',
    seriesLabel: 'Series / 01',
    chapterUnit: (n: number) => n + ' chapters',
  },
  tocLabel: 'On this page',
} as const;

export const BLOG_UI = { zh, en } as const;

export type BlogDict = typeof zh;
