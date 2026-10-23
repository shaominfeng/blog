# 从对话到协作：AI 大模型三年演进全记录

> 2022.11 — 2026.01 · 14 章 · 约 2.1 万字

在线阅读：**https://shaominfeng.github.io/ai-evolution/**

作者：邵敏峰（Allen Shao）

## 这是什么

一份写给工程师的 AI 演进笔记。以时间线为骨架，把模型、协议与产品放回它们出现的时刻，回答三个问题：

1. 为什么出现这项技术？
2. 它解决了什么问题？
3. 它又留下了什么新问题？

全书拆成 14 章：总览、餐厅类比导读、5 个年份、4 个技术深潜、1 个企业实践案例、1 个未来展望。企业案例已做脱敏处理。

## 技术栈

- [Astro](https://astro.build/) 静态站点，Markdown 内容
- 自托管字体（Instrument Serif / Inter / JetBrains Mono + 系统中文衬线）
- 图片统一转为 WebP（21MB → 约 1.4MB）
- GitHub Pages 托管，无后端、无追踪脚本

## 本地开发

```bash
npm install
npm run dev       # http://localhost:4321/ai-evolution/
npm run build     # 输出到 dist/
npm run preview
```

> 站点配置了 `base: '/ai-evolution'`，本地预览也请带上该前缀。

## 内容更新

章节 Markdown 位于 `src/content/chapters/`，由 `scripts/import-content.mjs` 从原始文档转换而来：

```bash
SOURCE_DIR=/path/to/原始文档目录 node scripts/import-content.mjs
```

脚本会做这些事：拆分章节、补充 frontmatter、计算阅读时长、重写站内链接与图片路径、脱敏企业信息、把图片压缩为 WebP。

## 目录

```
src/
├── components/       # 页头、章节导航、TOC
├── content/chapters/ # 14 章内容
├── layouts/          # 基础布局 / 文章布局
├── pages/            # 首页、阅读页、关于、RSS、404
└── styles/global.css # 编辑设计系统
```

## 部署

站点使用 GitHub Pages 的 `gh-pages` 分支发布：

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
