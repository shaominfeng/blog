# Allen Shao · 文章集

技术长文与系列连载：<https://shaominfeng.github.io/blog/>

- 系列 [《从对话到协作》](https://shaominfeng.github.io/blog/ai-evolution/)：AI 大模型三年演进全记录（2022.11—2026.01），14 章
- 单篇 [《工程师 Agentic Coding 的一天》](https://shaominfeng.github.io/blog/essays/a-day-of-agentic-coding/)：从 09:00 晨报到 18:00 巡检的一天真实工作流
- 单篇 [《AI 编码成本优化》](https://shaominfeng.github.io/blog/essays/ai-coding-cost/)：三个月真实账单拆解，日均花费 $47.56 → $2.21，别只盯单价，盯单任务成本
- 单篇 [《RD 的运维副业：从 Redis 到全线监控》](https://shaominfeng.github.io/blog/essays/sp-ops-agent-ops/)：用 Agent 把 5 个站点的 39 个 dashboard 做成巡检工具，14 天从一条告警追到根因修复

英文版在同一套路由下镜像：`/blog/en/…`。

## 结构

这是一个**文章集**，不是一个报告仓库。核心约定只有一条：**路径即索引**——语言、系列、slug 全部从目录推导，frontmatter 只放内容本身。

```
src/
├── content/
│   ├── articles/
│   │   ├── zh/                    # 语言（zh | en）
│   │   │   ├── ai-evolution/      # 系列 id，对应 content/series/ai-evolution.md
│   │   │   │   ├── overview.md
│   │   │   │   └── mcp.md
│   │   │   └── essays/            # 单篇也是一个"系列"，kind: essays
│   │   │       └── sp-ops-agent-ops.md
│   │   └── en/                    # 与 zh/ 一一对应，文件名相同
│   │       ├── ai-evolution/…
│   │       └── essays/…
│   └── series/                    # 系列元数据（标题、分卷、首页文案、阅读路径）
│       ├── ai-evolution.md        # kind: chapters
│       └── essays.md              # kind: essays
├── pages/
│   ├── index.astro                # /blog/ 文章集首页
│   ├── [series]/
│   │   ├── index.astro            # /blog/<series>/ 系列首页（按 kind 选版式）
│   │   └── [...slug].astro        # /blog/<series>/<slug>/ 章节 / 单篇
│   ├── en/                        # 英文版：结构与上面完全镜像
│   │   ├── index.astro
│   │   └── [series]/…
│   └── about.astro
├── components/                    # 页头页脚、章节导航、系列首页、TOC
├── layouts/                       # BaseLayout / ArticleLayout（章节）/ EssayLayout（单篇）
├── lib/articles.ts                # 路径解析、查询排序、篇幅统计——唯一的读取入口
├── content.config.ts              # 内容 schema
├── i18n.ts                        # 界面文案与语言工具
└── styles/                        # 编辑设计系统
```

### 三条推导规则

| 事实 | 来源 | 说明 |
|---|---|---|
| 语言 | `articles/<lang>/` 第一段 | `zh` / `en`，不再写 `lang:` 字段 |
| 系列 | `articles/<lang>/<series>/` 第二段 | 对应 `content/series/<series>.md` |
| slug | 文件名 | 也就是 URL 最后一段 |

页面上所有 URL 都走 `lib/articles.ts` 的 `articleUrl()`，不要在页面里手拼路径。

### 新增一篇

1. 在 `src/content/articles/zh/<series>/` 放 Markdown，frontmatter 只需内容字段：

   ```yaml
   ---
   title: "标题"
   subtitle: "副标题"            # 可选
   description: "一句话摘要，用于列表与 meta"
   part: "deep-dive"            # 章节型必填：分卷 key，见系列文件的 parts
   order: 9                     # 章节型按它排序；单篇不用
   readingTime: 4
   tags: ["MCP", "协议"]
   date: "2026-01-29"
   updated: "2026-02-24"        # 可选
   cover: "/og-xxx.png"         # 可选：该篇的 OG 分享图
   metrics:                     # 可选：首页单篇卡片底部的三条指标
     - value: "39"
       label: "个 dashboard"
   panel:                       # 可选：首页单篇卡片右侧的深色面板
     time: "39"
     label: "SP-OPS<br />OPS TOOLING"
     meta: "5 SITES / 1 COMMAND"
   ---
   ```

2. 在 `en/` 下放同名文件，正文不要留中文（构建前的检查会拦）。
3. 跑 `npm run verify`（内容检查 + 构建）。

章节序号、单篇序号、"14 章""约 1.8 万字"这类数字都由内容算出，不用手改。

### 新增一个系列

1. 建目录 `src/content/articles/zh/<series>/` 与 `en/<series>/`，放文章。
2. 建 `src/content/series/<series>.md`，最少写这些：

   ```yaml
   ---
   kind: chapters          # chapters = 章节型；essays = 按日期倒序的单篇集合
   order: 3
   parts:                  # 章节型分卷；文章的 part 引用这里的 key
     - key: prologue
       zh: 序章
       en: Prologue
   zh:
     label: 系列 03
     title: 系列标题
     description: 一句话描述
   en:
     label: Series 03
     title: Series title
     description: One-line description
   ---
   ```

3. 系列首页的编辑版式（`heroTitle` / `tldr` / `paths` / `stats` / `about`）都是可选字段，不写就自动降级成简洁列表。

不需要改任何页面代码：路由、导航、首页卡片、RSS 与 sitemap 都按 `content/series/` 自动展开。

### 文案里的占位符

系列首页允许在 `note`、`stats` 里用 `{chapters}` `{words}` `{minutes}` `{sources}` `{written}`，构建时替换成实际数字。

## 校验

```bash
npm run check:content   # 中英配对、英文残留中文、系列缺失、slug 冲突、part 失效
npm run build           # 构建
npm run verify          # 上面两个一起跑
```

缺英文译文只会提示，不阻断；`part` 指向不存在的分卷、slug 重复会直接失败。

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

## 部署

推送到 `main` 即自动发布。`.github/workflows/deploy.yml` 会执行 `npm ci` → `npm run build`，把 `dist/` 上传到 GitHub Pages。

仓库设置 → Pages → Source 选择 **GitHub Actions**。

## 授权

文字与图片采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh) 授权。
转载请注明作者与原文链接，禁止商业使用。

文中观点为个人观察，不代表任职机构。
