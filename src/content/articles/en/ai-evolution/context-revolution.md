---
lang: "en"
series: "ai-evolution"
title: "The Context Revolution: From 4K to 2M"
subtitle: "After 500x growth, cost is the next battleground"
description: "500x in three years. Long context solved forgetting, and pushed cost, latency, and information noise to a new order of magnitude — which is what produced three optimization paths: cache, compression, retrieval."
part: "Deep dive"
partOrder: 3
order: 7
num: 8
readingTime: 3
featured: true
kind: "essay"
date: "2026-01-29"
tags: ["Deep dive"]
---

> This chapter: exponential context growth, what it fixed, what still hurts, the current fixes, where it goes next.

> **Restaurant analogy, short version**: the context window is the size of the table and the memory of the head chef.
> From 4K — a small table that holds 4 plates — to 2M, a banquet hall that holds 2,000.
> Then the bill arrives: bigger table, higher rent (cost); longer walk for the waiters (latency); harder for the customer to find the dish they want (information noise).
> Full version: [the restaurant analogy](/blog/en/ai-evolution/restaurant-analogy/#the-performance-techniques-mapped)

---

## Exponential growth in context length

### The full timeline

| Date | Model | Context length | Growth | Milestone | Cost impact |
|------|------|-----------|---------|-----------|---------|
| 2022.11 | GPT-3.5 | 4K | baseline | The ChatGPT era opens | $0.012 |
| 2023.03 | GPT-4 | 8K → 32K | 2-8x | Multimodal breakthrough | $0.06-0.24 |
| 2023.07 | Claude 2 | 100K | 25x | **The year of long documents** | $3.00 |
| 2024.03 | Claude 3 | 200K | 50x | Twice the context | $6.00 |
| 2024.06 | Gemini 1.5 | 1M | 250x | First million-token context | $7.50 |
| 2025.10 | Claude Sonnet 4.5 | 1M | 250x | A million tokens goes mainstream | $3.00 |
| 2025.11 | Gemini 3 | 2M | 500x | **Current record** | $15.00 |

**The rate**: three years, 4K to 2M — a **500x** increase.

---

## What did long context actually fix?

### 1. Forgetting across turns (solved)

```
Short-context era (4K):
User: "Analyze this code for me"
AI: [analyzes]
User: "Can that function be optimized?"
AI: "Which function?" ✗ - the earlier turns are already gone

Long-context era (1M):
The model holds the whole session history, the conversation just flows ✓
```

### 2. Long-document understanding (solved)

- **4K era** - 2-3 pages of a document, that is the ceiling
- **100K era** - a 300-page book
- **1M era** - an entire codebase (100,000 lines)
- **2M era** - several related projects at once

### 3. Tracking complex tasks (solved)

- **Short context** - you keep having to remind the model what it is working on
- **Long context** - it holds the whole development process and keeps state on its own

---

## But context engineering still hurts

### Pain point 1: cost grows linearly

```
Claude Sonnet 4.5 pricing:
- Input: $3 / 1M tokens
- Output: $15 / 1M tokens

At full load (1M context):
- Input cost per request: $3
- Generate 5K output: $0.075
- Total: $3.075

vs short context (10K):
- Input cost: $0.03
- A 100x difference
```

### Pain point 2: latency

```
Context length → time to first response
- 10K tokens → 1-2 s
- 100K tokens → 3-5 s
- 1M tokens → 8-15 s
- 2M tokens → 20-30 s
```

20-30 seconds to first token is not acceptable in an interactive product.

### Pain point 3: information noise and attention dilution

```
Context layout:
[system prompt 3K] → necessary
[history 800K] → mostly irrelevant
[current task 5K] → the part that matters
[tool definitions 50K] → partly needed

The model has to find the relevant bit inside 800K of history → hard
```

---

## What people do about it (2025-2026)

### 1. Auto-Compact

```typescript
// How Claude Code does it
if (contextTokens > 900K) {
  // Keep:
  - system prompt (required)
  - last 20 turns (critical)
  - current task context (core)
  - important tool definitions (curated)

  // Compress:
  - old turns → summary (50K down to 2K)
  - old code → key parts
  - tool output → important results
}

// Result:
- keeps context relevant
- 50-70% fewer tokens
- some information loss (acceptable)
```

### 2. Prompt Caching

```
Mechanism:
- cache the static parts: system prompt, tool definitions
- later requests only carry what changed

Cost:
- cache hit: $0.30 / 1M tokens (10x cheaper)
- latency: ~90% of processing time saved

Limits:
- cache lives 5 minutes
- static content only
```

### 3. RAG (retrieval-augmented generation)

```
The old way:
stuff the entire codebase into context → 1M tokens

RAG:
1. user question → vector search over the code
2. load only the 5-10 relevant files → 50K tokens
3. generate the answer

Saves 95% of tokens ✓
More precise: better-targeted context ✓
```

### 4. Loading Skills on demand

```
Old way: load every MCP tool → 550K tokens
Skills: load metadata only → 10K tokens

On demand:
- user mentions code review → load the code-review skill
- deployment never comes up → the deployment skill never loads

Saves 98% of tokens ✓
```

---

## Where this goes: the next generation of context management

### Short term (2026-2027)

- ✓ Smart compression algorithms go mainstream
- ✓ Tiered context storage
- ✓ Real-time relevance scoring

### Medium term (2027-2028)

- Unlimited context (retrieval in real time)
- Context quality > context length
- Automatic context optimization

### Long term (2028+)

- Nobody competes on length anymore
- Intelligent memory management becomes table stakes
- Context cost approaches zero

---
