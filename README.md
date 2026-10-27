# Allen Shao · 文章集

技术长文与系列连载：<https://shaominfeng.github.io/blog/>

- 系列 [《从对话到协作》](https://shaominfeng.github.io/blog/ai-evolution/)：AI 大模型三年演进全记录（2022.11—2026.01），14 章、约 1.8 万字
- 单篇 [《工程师 Agentic Coding 的一天》](https://shaominfeng.github.io/blog/essays/a-day-of-agentic-coding/)：从 09:00 晨报到 18:00 巡检的一天真实工作流
- 单篇 [《AI 编码成本优化》](https://shaominfeng.github.io/blog/essays/ai-coding-cost/)：三个月真实账单拆解，日均花费 $47.56 → $2.21，别只盯单价，盯单任务成本

## 结构

这是一个**文章集**，不是一个报告仓库：

```
src/
├── content/articles/
│   ├── ai-evolution/       # 系列 01 的 14 章
│   │   ├── overview.md
│   │   ├── context-revolution.md
│   │   └── ...
│   ├── essays/             # 不进入连载的单篇
│   │   ├── a-day-of-agentic-coding.md
│   │   └── ai-coding-cost.md
│   └── en/                 # 英文译文，目录结构与上面一一对应
│       ├── ai-evolution/*.md
│       └── essays/*.md
├── pages/
│   ├── index.astro          # /blog/ 文章集首页
│   ├── ai-evolution/
│   │   ├── index.astro      # /blog/ai-evolution/ 系列首页
│   │   └── [...slug].astro  # /blog/ai-evolution/<chapter>/ 章节
│   ├── essays/
│   │   ├── index.astro      # /blog/essays/ 单篇列表
│   │   └── [...slug].astro  # /blog/essays/<slug>/ 单篇
│   ├── en/                  # 英文版：结构与上面完全镜像
│   │   ├── index.astro      # /blog/en/
│   │   ├── ai-evolution/…
│   │   ├── essays/…
│   │   └── about.astro
│   └── about.astro          # /blog/about/
├── components/              # 页头、章节导航、TOC
├── layouts/                 # 基础布局 / 文章布局
├── i18n.ts                  # 界面文案（中/英）+ 语言与路径工具
├── lib/articles.ts          # 按语言筛选文章
└── styles/                  # 编辑设计系统
```

新增内容时：

- **同系列章节**：在 `src/content/articles/ai-evolution/` 添加 Markdown，补齐 frontmatter（`series`、`order`、`part`、`readingTime` 等），路由自动生成。
- **单篇**：在 `src/content/articles/essays/` 添加 Markdown，设置 `series: "essays"`、`date`、`readingTime`，`/blog/essays/<slug>/` 自动生成。首页卡片底部那行指标与右侧装饰面板，分别由可选字段 `metrics`、`panel` 驱动；`cover` 用于该篇的 OG 分享图。
- **新系列**：新建内容目录、系列首页和路由，并在 `src/consts.ts` 的 `SERIES_LIST` 中登记。
- **英文版**：把同名的 Markdown 放进 `src/content/articles/en/<系列>/`，frontmatter 加 `lang: "en"`，`part` 用英文档位（`Prologue` / `Primer` / `Timeline` / `Deep dive` / `Insight` / `Practice` / `Outlook` / `Standalone`），`/blog/en/<系列>/<slug>/` 自动生成。
  - 中文页面会自动排除 `lang: "en"` 的文章，两个语言互不串台（列表、RSS、路由都按语言过滤）。
  - 页头 `中 / EN` 切换器按当前路径换算等价路径；`<head>` 输出 `hreflang` 与 `og:locale`。
  - 文内跨章链接要指向同语言的页面，例如 `/blog/en/ai-evolution/restaurant-analogy/#mcp-vs-skills-head-to-head`。
  - 英文内容的正文里不要留下中文（包括代码块里作为说明的注释）。

## 技术栈

- [Astro](https://astro.build/) 静态站点，Markdown 内容
- 自托管字体（Instrument Serif / Inter / JetBrains Mono + 系统中文衬线）
- 图片统一转为 WebP（21MB → 约 1.4MB）
- GitHub Pages 托管，GitHub Actions 自动构建，无后端、无追踪脚本

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

推送到 `main` 即自动发布。`.github/workflows/deploy.yml` 会执行 `npm ci` → `npm run build`，把 `dist/` 上传到 GitHub Pages。

仓库设置 → Pages → Source 选择 **GitHub Actions**。

本地检查构建：

```bash
npm ci
npm run build      # 产物在 dist/
npm run preview    # 预览构建产物
```

## 授权

文字与图片采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh) 授权。
转载请注明作者与原文链接，禁止商业使用。

文中观点为个人观察，不代表任职机构。