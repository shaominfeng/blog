---
title: "Agent Skills：比 MCP 更重要的创新"
subtitle: "把领域知识变成可安装的资产"
description: "Skills 补的不是模型能力，而是架构：把团队最佳实践沉淀为可复用、可版本化的知识包，Token 更省，边界更清晰。"
part: "deep-dive"
order: 10
readingTime: 4
date: "2026-01-29"
tags: ["深度"]
---

> 本章内容：Skills 诞生背景、核心问题、开放标准、生态爆发、Skills vs MCP 终极对比

> **餐厅类比提示**：如果说 MCP 是「采购系统」（能拿到食材），那 Skills 就是「菜谱宝典」（知道怎么做菜）。
> 有食材但不会做 = 浪费；会做菜但没食材 = 暂时做不了。但统计显示，80% 的任务只需菜谱（Skills），20% 才需要采购（MCP）。
> 详见 [餐厅类比完整版](/blog/ai-evolution/restaurant-analogy/#mcp-vs-skills-深度对比)

---

## Skills 诞生：架构问题而非智能问题

**2025 年 10 月 16 日**，Anthropic 发布 [Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)。

### 核心洞察

> **Anthropic 工程博客原文**：
> 「随着 agents 变得更强大，我们需要更可组合、可扩展、可移植的方式为它们装备领域专业知识。**这不主要是模型智能问题，而是架构问题** - agents 缺乏结构化的方式来存储、检索和重用过程知识。」

---

## Skills 解决的三大核心问题

### 问题 1：AI 有工具但不会用

**MCP 时代的困境（2024 年）**：

```typescript
const agent = new Agent({
  tools: [github, database, slack] // ✓ 有能力
});

用户: "帮我做code review"

AI的困惑：
✗ 应该先看什么？PR描述还是代码？
✗ 审查顺序是什么？
✗ 公司的审查标准是什么？
✗ 如何写review comments？
✗ 何时approve？

→ 结果：AI有刀但不会切菜
```

**Skills 的解决方案**：

```markdown
# code-review.skill.md

## Metadata
name: code-review
description: Perform professional code reviews
triggers: ["review", "PR", "pull request"]

## Instructions
1. 先读 PR 描述，理解改动目的
2. 检查测试覆盖率
3. 审查代码逻辑
4. 检查安全漏洞
5. 给出建设性反馈

## Company Standards
- 每个函数必须有单元测试
- 不允许 console.log
- API 需要错误处理

→ 结果：AI 有刀也会切菜了 ✓
```

---

### 问题 2：Token 低效

**MCP 的 Token 消耗**：

```
场景：50 个 MCP 工具加载到上下文

每个工具定义：
- 工具名
- 参数 schema (JSON Schema)
- 描述
- 示例
平均每个工具：~11K tokens

50 个工具 = 550K tokens
→ 占用超过一半的 1M 上下文！
→ 每次对话都要付费 $1.65
```

**Skills 的 Token 效率**：

```
场景：50 个 Skills（同样功能）

加载到上下文的只是：
- Skill 元数据（名称、触发词、简短描述）
- 平均每个 Skill：~200 tokens

50 个 Skills = 10K tokens
→ 仅占 1% 的上下文
→ 每次对话仅$0.03

Token 效率提升：98% ✓
```

---

### 问题 3：无法复用和版本化

**MCP 困境**：

```markdown
问题：
- Prompt 散落在各处，难以管理
- 每个项目重新写
- 没有版本控制
- 团队无法共享最佳实践

结果：
- 重复造轮子
- 知识无法积累
- 新人上手困难
```

**Skills 生态**：

```bash
# 像npm一样安装Skills
claude skill install code-review
claude skill install deployment
claude skill install security-scan

# 版本化管理
code-review@1.2.3
deployment@2.0.1

# 团队共享
company-internal/api-design@1.0.0
company-internal/incident-response@1.5.2

→ 知识可复用、可版本化、可积累 ✓
```

---

## 2025.12.18：开放标准时刻

### 历史性决策

Anthropic 宣布将 Agent Skills 规范变成**开放标准**：

1. **公开规范** - 任何人都能实现
2. **MIT 许可** - 商业友好
3. **跨平台兼容** - 不绑定 Claude

### 行业快速采用

```
2025.12.18 - Anthropic 发布标准
2025.12.20 - OpenAI 悄悄采用（Codex CLI）
2025.12.22 - ChatGPT 集成 Skills 格式
2025.12.25 - Google 宣布 Gemini 支持
2026.01.05 - Microsoft 集成到 Copilot

→ 不到 1 个月，行业统一
```

### 为什么 OpenAI 这么快就采用？

1. **Token 效率** - OpenAI 也想降低成本
2. **用户需求** - 开发者呼声很高
3. **竞争压力** - Claude Code 太好用了
4. **技术优势** - 确实比自己的方案好

---

## Skills 生态爆发

### Skills 市场（2026 年初）

```
官方 Skills（Anthropic 维护）：
- code-review
- deployment
- security-scan
- api-design
- documentation

社区 Skills（开源）：
- web-scraping
- data-analysis
- image-processing
- audio-transcription

企业 Skills（私有）：
- company-workflow
- compliance-check
- custom-integration
```

### 类似 npm 的生态

```bash
# 搜索Skills
claude skill search "react"

# 安装
claude skill install react-best-practices

# 发布自己的Skill
claude skill publish my-workflow

# 团队共享
claude skill share company-internal/api-design
```

---

## Skills vs MCP：终极对比

### 不是竞争，而是互补

| 维度 | MCP | Agent Skills | 关系 |
|------|-----|-------------|------|
| **本质** | 连接能力 | 执行智慧 | 互补 |
| **比喻** | 给 AI 一把刀 | 教 AI 如何切菜 | 都需要 |
| **Token 消耗** | 550K（50 工具） | 10K（50 技能） | Skills 优 |
| **安全性** | 有风险 | 相对安全 | Skills 优 |
| **实时数据** | ✓ 擅长 | ✗ 不擅长 | MCP 优 |
| **流程知识** | ✗ 不擅长 | ✓ 擅长 | Skills 优 |
| **跨平台** | ✓ 设计目标 | ✓ 开放标准 | 都支持 |
| **学习曲线** | 陡峭 | 平缓 | Skills 优 |

### 混合架构最佳实践（2026）

```typescript
// 最佳组合
const agent = new Agent({
  // MCP：外部服务连接
  mcp: [
    'mcp-github', // 调用GitHub API
    'mcp-slack', // 发送Slack消息
    'mcp-database' // 数据库查询
  ],

  // Skills：领域知识与流程
  skills: [
    'code-review', // 如何审查代码
    'deployment', // 如何部署
    'incident-response' // 如何响应事故
  ]
});

// 协同工作
用户: "审查PR #123并部署到staging"
AI:
1. 使用code-review Skill → 知道如何审查
2. 调用mcp-github → 获取PR内容
3. 执行审查流程
4. 使用deployment Skill → 知道如何部署
5. 调用mcp-deployment → 执行部署
6. 使用mcp-slack → 通知团队

→ MCP提供能力，Skills提供智慧 ✓
```

---

## 核心启示

### 1. 架构问题 > 智能问题

模型已经足够聪明，缺的是结构化的知识管理系统。

### 2. Token 效率至关重要

98% 的 Token 节省不仅是成本，更是架构优势。

### 3. 开放标准赢得市场

OpenAI 快速采用证明：好的标准会被行业认可。

### 4. MCP 和 Skills 互补

不是「谁更好」，而是「各自擅长什么」。

---

## 未来展望

### 短期（2026-2027）

- ✓ Skills 市场成熟（类似 npm）
- ✓ 企业级 Skills 平台
- ✓ 自动生成 Skills 工具

### 中期（2027-2028）

- AI 自动编写 Skills
- Skills 自动优化
- 跨 AI 模型共享

### 长期（2028+）

- Skills 成为 AI 的「基因」
- 个性化 Skills 组合
- Skills 自进化

---
