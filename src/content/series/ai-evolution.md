---
kind: chapters
order: 1
cover: "/images/evolution-ai-capability.webp"
start: "2022.11"
end: "2026.01"
written: "2026.01.27 — 2026.02.24"
updated: "2026.02.24"
sources: 17
license: "CC BY-NC-SA 4.0"
published: "2026-01-27"
modified: "2026-02-24"
parts:
  - key: prologue
    zh: 序章
    en: Prologue
  - key: primer
    zh: 导读
    en: Primer
  - key: timeline
    zh: 时间线
    en: Timeline
  - key: deep-dive
    zh: 技术深潜
    en: Deep dive
  - key: insight
    zh: 洞察
    en: Insight
  - key: practice
    zh: 实践
    en: Practice
  - key: outlook
    zh: 展望
    en: Outlook
zh:
  label: 系列 01
  title: 从对话到协作
  subtitle: AI 大模型三年演进全记录
  description: 2022.11—2026.01，AI 大模型三年演进全记录。14 章、约 1.8 万字，从时间线、技术架构与企业实践三个视角，理解 AI 如何从对话走向协作。
  kicker: Research note · 2022.11 — 2026.01
  heroTitle: 从对话
  heroAccent: 到协作
  heroDesc: 三年，上下文放大 500 倍，交互从「写提示词」变成「说目标」，AI 从工具变成同事。这份报告把模型、协议与产品放回同一条时间线，解释每一次跃迁解决了什么，又留下了什么。
  cta: 开始阅读
  figLabel: Fig. 01 / AI capability
  figRange: 2022 → 2026
  floatValue: 500×
  floatLabel: context growth
  stamp: 三年
  note:
    - "{chapters} 章"
    - "约 {words} 万字"
    - "{sources} 份参考资料"
    - "写于 {written}"
  tldr:
    - label: 01 / 能力
      title: 能力在跃迁，瓶颈也在转移。
      body: 上下文、推理、工具、协作依次成为主战场，每一次突破都会暴露下一层约束。
    - label: 02 / 架构
      title: MCP 与 Skills 不是替代关系。
      body: 一个解决「能连什么」，一个解决「知道怎么做」。真正的 Agent 架构，两者都要。
    - label: 03 / 差距
      title: 真正的差距在推理层。
      body: 同样的模型，不同的调度、约束与领域知识，产出可以差一个量级。
  paths:
    - title: 快速概览
      desc: 只有半小时：先拿到全景和心智模型，知道三年里发生了什么。
      items: [overview, restaurant-analogy]
    - title: 按时间线走
      desc: 一年一章，把模型、产品与协议放回它们出现的时刻。
      items: [overview, year-2022, year-2023, year-2024, year-2025, year-2026, outlook]
    - title: 工程师视角
      desc: 上下文、Prompt、MCP、Skills 四条技术主线，加上推理层与企业落地。
      items: [overview, context-revolution, prompt-engineering, mcp, agent-skills, new-paradigm, enterprise-case, outlook]
  stats:
    - value: "3"
      unit: 年
      label: 2022.11 — 2026.01
    - value: "500"
      unit: ×
      label: 上下文窗口增长
    - value: "{chapters}"
      unit: 章
      label: 约 {words} 万字 · {minutes} 分钟
    - value: "{sources}"
      unit: 份
      label: 官方公告与公开资料
  about:
    - 这是这里的第一个系列，一份写给工程师的 AI 演进笔记。它不追求覆盖每一款模型，而是想回答三个问题：为什么出现这项技术，它解决了什么问题，又留下了什么新问题。
    - 写作以 Claude / Anthropic 生态为主要观察窗口，同时覆盖 OpenAI、Google 与 DeepSeek 的关键进展；企业实践部分来自真实平台建设，已做脱敏处理，只保留可迁移的方法。
    - 文中观点为个人观察，不代表任职机构。欢迎指出事实错误，或补充你的一线经验。
en:
  label: Series 01
  title: From Conversation to Collaboration
  subtitle: Three years of LLM evolution, 2022—2026
  description: Fourteen chapters on how large language models moved from conversation to collaboration — the timeline, the architecture, and what it takes to ship in an enterprise.
  kicker: Research note · 2022.11 — 2026.01
  heroTitle: From conversation
  heroAccent: to collaboration
  heroDesc: Three years. Context windows grew 500×, interaction moved from writing prompts to stating goals, and AI went from tool to colleague. This report puts the models, protocols and products back on one timeline, explaining what each leap solved and what it left behind.
  cta: Start reading
  figLabel: Fig. 01 / AI capability
  figRange: 2022 → 2026
  floatValue: 500×
  floatLabel: context growth
  stamp: 3Y
  note:
    - "{chapters} chapters"
    - "~{words} words"
    - "{sources} sources"
    - "Written {written}"
  tldr:
    - label: 01 / Capability
      title: Capability leaps, and the bottleneck moves with it.
      body: Context, reasoning, tools and collaboration took turns as the main battleground. Every breakthrough exposed the next constraint.
    - label: 02 / Architecture
      title: MCP and Skills do not replace each other.
      body: One answers what you can connect to, the other how the work gets done. A real agent architecture needs both.
    - label: 03 / Gap
      title: The real gap sits in the reasoning layer.
      body: Same model, different orchestration, constraints and domain knowledge — the output can differ by an order of magnitude.
  paths:
    - title: Quick overview
      desc: Half an hour. Get the big picture and the mental model of what actually happened over three years.
      items: [overview, restaurant-analogy]
    - title: Follow the timeline
      desc: One year per chapter, putting models, products and protocols back in the moment they appeared.
      items: [overview, year-2022, year-2023, year-2024, year-2025, year-2026, outlook]
    - title: The engineer's view
      desc: Four technical threads — context, prompting, MCP, Skills — plus the reasoning layer and enterprise adoption.
      items: [overview, context-revolution, prompt-engineering, mcp, agent-skills, new-paradigm, enterprise-case, outlook]
  stats:
    - value: "3"
      unit: yrs
      label: 2022.11 — 2026.01
    - value: "500"
      unit: ×
      label: context window growth
    - value: "{chapters}"
      unit: ch
      label: ~{words} words · {minutes} min
    - value: "{sources}"
      unit: src
      label: official announcements and public sources
  about:
    - "This is the first series in the collection: an AI evolution notebook written for engineers. It does not try to cover every model. It tries to answer three questions — why a technology appeared, what it solved, and what new problem it left behind."
    - The writing uses the Claude / Anthropic ecosystem as its main observation window while covering key progress from OpenAI, Google and DeepSeek. The enterprise section comes from building real platforms, sanitised down to the methods that transfer.
    - Views here are personal and do not represent my employer. Corrections on facts, or notes from your own frontline experience, are welcome.
---

系列元数据。标题、分卷、阅读路径与首页文案都在这里，模板只负责渲染；新增一个系列只需加目录和这个文件。
