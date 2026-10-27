---
lang: "en"
series: "ai-evolution"
title: "Agent Skills: The Innovation That Matters More Than MCP"
subtitle: "Turning domain knowledge into an installable asset"
description: "Skills don't fix model capability. They fix architecture: team best practices captured as reusable, versionable knowledge packs. Less token spend, cleaner boundaries."
part: "Deep dive"
partOrder: 3
order: 10
num: 11
readingTime: 4
featured: true
kind: "essay"
date: "2026-01-29"
tags: ["Deep dive"]
---

> What this chapter covers: why Skills appeared, the core problems, the open standard, the ecosystem explosion, Skills vs MCP head to head

> **Restaurant analogy**: if MCP is the procurement system — it gets you ingredients — then Skills is the cookbook: it tells you how to cook.
> Ingredients with no technique is waste. Technique with no ingredients means you cook nothing tonight. But the numbers say 80% of tasks need only the cookbook (Skills). 20% need procurement (MCP).
> See [the full restaurant analogy](/blog/en/ai-evolution/restaurant-analogy/#mcp-vs-skills-head-to-head)

---

## Skills Arrives: An Architecture Problem, Not an Intelligence Problem

**October 16, 2025.** Anthropic ships [Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).

### The core insight

> **From the Anthropic engineering blog**:
> “As agents get more capable, we need more composable, extensible, and portable ways to equip them with domain expertise. **This is mostly not a model intelligence problem. It is an architecture problem** — agents lack a structured way to store, retrieve, and reuse procedural knowledge.”

---

## The Three Core Problems Skills Solves

### Problem 1: The AI has tools but can't use them

**The MCP-era dead end (2024)**:

```typescript
const agent = new Agent({
  tools: [github, database, slack] // ✓ it has the capability
});

User: "do a code review for me"

Where the AI gets stuck:
✗ What do I read first? The PR description or the code?
✗ What order do I review in?
✗ What are this company's review standards?
✗ How do I write the review comments?
✗ When do I approve?

→ Result: the AI has a knife and still can't chop
```

**The Skills fix**:

```markdown
# code-review.skill.md

## Metadata
name: code-review
description: Perform professional code reviews
triggers: ["review", "PR", "pull request"]

## Instructions
1. Read the PR description first; understand the intent behind the change
2. Check test coverage
3. Review the code logic
4. Check for security holes
5. Give constructive feedback

## Company Standards
- Every function needs a unit test
- console.log is not allowed
- APIs need error handling

→ Result: the AI has a knife and now it can chop ✓
```

---

### Problem 2: Token inefficiency

**What MCP costs in tokens**:

```
Scenario: 50 MCP tools loaded into context

Each tool definition:
- tool name
- parameter schema (JSON Schema)
- description
- examples
Average per tool: ~11K tokens

50 tools = 550K tokens
→ Eats more than half of a 1M context
→ $1.65 per conversation, every conversation
```

**What Skills cost in tokens**:

```
Scenario: 50 Skills (same functionality)

All that loads into context:
- Skill metadata (name, trigger words, short description)
- Average per Skill: ~200 tokens

50 Skills = 10K tokens
→ 1% of context
→ $0.03 per conversation

Token efficiency gain: 98% ✓
```

---

### Problem 3: No reuse, no versioning

**The MCP dead end**:

```markdown
The problem:
- Prompts scattered everywhere, impossible to manage
- Rewritten from scratch for every project
- No version control
- Teams can't share best practices

The result:
- Everyone rebuilds the same wheel
- Knowledge doesn't accumulate
- New hires take forever to get productive
```

**The Skills ecosystem**:

```bash
# Install Skills like npm packages
claude skill install code-review
claude skill install deployment
claude skill install security-scan

# Versioned
code-review@1.2.3
deployment@2.0.1

# Shared across the team
company-internal/api-design@1.0.0
company-internal/incident-response@1.5.2

→ Knowledge you can reuse, version, and accumulate ✓
```

---

## 2025.12.18: The Open Standard Moment

### A historic decision

Anthropic turns the Agent Skills spec into an **open standard**:

1. **Public spec** — anyone can implement it
2. **MIT license** — commercially friendly
3. **Cross-platform** — not tied to Claude

### Fast industry adoption

```
2025.12.18 - Anthropic publishes the standard
2025.12.20 - OpenAI quietly adopts it (Codex CLI)
2025.12.22 - ChatGPT integrates the Skills format
2025.12.25 - Google announces Gemini support
2026.01.05 - Microsoft integrates it into Copilot

→ Under a month, the industry converges
```

### Why did OpenAI move so fast?

1. **Token efficiency** — OpenAI wants lower costs too
2. **User demand** — developers were loud about it
3. **Competitive pressure** — Claude Code is just that good
4. **Technical merit** — it beats their own approach

---

## The Skills Ecosystem Explodes

### The Skills marketplace (early 2026)

```
Official Skills (maintained by Anthropic):
- code-review
- deployment
- security-scan
- api-design
- documentation

Community Skills (open source):
- web-scraping
- data-analysis
- image-processing
- audio-transcription

Enterprise Skills (private):
- company-workflow
- compliance-check
- custom-integration
```

### An npm-shaped ecosystem

```bash
# Search Skills
claude skill search "react"

# Install
claude skill install react-best-practices

# Publish your own Skill
claude skill publish my-workflow

# Share with the team
claude skill share company-internal/api-design
```

---

## Skills vs MCP: Head to Head

### Not competition. Complements.

| Dimension | MCP | Agent Skills | Relationship |
|------|-----|-------------|------|
| **What it is** | Connection capability | Execution intelligence | Complementary |
| **Metaphor** | Hands the AI a knife | Teaches the AI to chop | You need both |
| **Token cost** | 550K (50 tools) | 10K (50 skills) | Skills wins |
| **Security** | Carries risk | Comparatively safe | Skills wins |
| **Real-time data** | ✓ Good at it | ✗ Not its job | MCP wins |
| **Process knowledge** | ✗ Not its job | ✓ Good at it | Skills wins |
| **Cross-platform** | ✓ By design | ✓ Open standard | Both |
| **Learning curve** | Steep | Shallow | Skills wins |

### The hybrid architecture, done right (2026)

```typescript
// The combination that works
const agent = new Agent({
  // MCP: connections to external services
  mcp: [
    'mcp-github', // call the GitHub API
    'mcp-slack', // send Slack messages
    'mcp-database' // query the database
  ],

  // Skills: domain knowledge and process
  skills: [
    'code-review', // how to review code
    'deployment', // how to deploy
    'incident-response' // how to handle an incident
  ]
});

// Working together
User: "Review PR #123 and deploy it to staging"
AI:
1. Uses the code-review Skill → knows how to review
2. Calls mcp-github → pulls the PR
3. Runs the review process
4. Uses the deployment Skill → knows how to deploy
5. Calls mcp-deployment → performs the deploy
6. Uses mcp-slack → notifies the team

→ MCP supplies capability. Skills supply judgment. ✓
```

---

## What Actually Matters

### 1. Architecture problem > intelligence problem

The model is smart enough. What's missing is a structured way to manage knowledge.

### 2. Token efficiency is not a detail

That 98% saving is architecture, not just a line item.

### 3. Open standards win markets

OpenAI adopting this fast is the proof: a good standard gets adopted.

### 4. MCP and Skills complement each other

The question isn't “which is better.” It's “which is better at what.”

---

## What Comes Next

### Near term (2026-2027)

- ✓ A mature Skills marketplace (npm-shaped)
- ✓ Enterprise Skills platforms
- ✓ Tools that generate Skills automatically

### Mid term (2027-2028)

- AI writes Skills on its own
- Skills optimize themselves
- Sharing across model vendors

### Long term (2028+)

- Skills become the AI's “genes”
- Personalized Skill stacks
- Self-evolving Skills

---
