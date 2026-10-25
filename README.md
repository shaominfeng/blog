# Allen Shao · 文章集

技术长文与系列连载，部署在 <https://shaominfeng.github.io/blog/>。

当前系列：**《从对话到协作》** — AI 大模型三年演进全记录（2022.11—2026.01），14 章、约 1.8 万字。

当前单篇：**《工程师 Agentic Coding 的一天》** — 从 09:00 晨报到 18:00 巡检的一天真实工作流。

在线阅读：<https://shaominfeng.github.io/blog/ai-evolution/> · <https://shaominfeng.github.io/blog/essays/a-day-of-agentic-coding/>

## 结构

这是一个**文章集**，不是一个报告仓库：

```
src/
├── content/articles/
│   ├── ai-evolution/       # 系列 01 的 14 章
│   │   ├── overview.md
│   │   ├── context-revolution.md
│   │   └── ...
│   └── essays/             # 不进入连载的单篇
│       └── a-day-of-agentic-coding.md
├── pages/
│   ├── index.astro          # /blog/ 文章集首页
│   ├── ai-evolution/
│   │   ├── index.astro      # /blog/ai-evolution/ 系列首页
│   │   └── [...slug].astro  # /blog/ai-evolution/<chapter>/ 章节
│   ├── essays/
│   │   ├── index.astro      # /blog/essays/ 单篇列表
│   │   └── [...slug].astro  # /blog/essays/<slug>/ 单篇
│   └── about.astro          # /blog/about/
├── components/              # 页头、章节导航、TOC
├── layouts/                 # 基础布局 / 文章布局
└── styles/                  # 编辑设计系统
```

新增同系列文章：在 `src/content/articles/ai-evolution/` 添加 Markdown，补齐 frontmatter（`series`、`order`、`part`、`readingTime` 等），路由会自动生成。
新增单篇：在 `src/content/articles/essays/` 添加 Markdown，设置 `series: "essays"`、`date`、`readingTime`，`/blog/essays/<slug>/` 会自动生成。
新增一个系列：新建内容目录、系列首页和路由，并在 `src/consts.ts` 的 `SERIES_LIST` 中登记。

## 技术栈

- [Astro](https://astro.build/) 静态站点，Markdown 内容
- 自托管字体（Instrument Serif / Inter / JetBrains Mono + 系统中文衬线）
- 图片统一转为 WebP（21MB → 约 1.4MB）
- GitHub Pages 托管，无后端、无追踪脚本

## 本地开发

```bash
npm install
npm run dev       # http://localhost:4321/blog/
npm run build     # 输出到 dist/
npm run preview
```

> 站点配置了 `base: '/blog'`，本地预览也请带上该前缀。

## 内容导入

章节 Markdown 由 `scripts/import-content.mjs` 从原始文档转换而来：

```bash
SOURCE_DIR=/path/to/原始文档目录 node scripts/import-content.mjs
```

脚本会拆分章节、补充 frontmatter、计算阅读时长、重写站内链接与图片路径、脱敏企业信息，并把图片压缩为 WebP。

## 部署

GitHub Pages 的 `gh-pages` 分支发布：

```bash
npm run build
cd dist
touch .nojekyll
git init -b gh-pages
git add -A && git commit -m "Deploy"
git push -f <your-remote> gh-pages
```

仓库设置 → Pages → Source 选择 `gh-pages` 分支。

## 授权

文字与图片采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh) 授权。
转载请注明作者与原文链接，禁止商业使用。

文中观点为个人观察，不代表任职机构。