---
title: "Overview: From Conversation to Collaboration"
subtitle: "Three years, five stages, one throughline"
description: "A single timeline for the models, protocols and products from 2022.11 to 2026.01 — what each capability jump solved, and what new problem it left behind."
part: "prologue"
order: 0
readingTime: 5
tags: []
cover: "/images/evolution-ai-capability.webp"
date: "2026-01-27"
updated: "2026-02-24"
---

## Why I wrote this

When ChatGPT launched in November 2022, most people saw “an AI that chats”. Three years later, AI writes code, runs processes, does research, and has started entering workflows as a “digital colleague”.

It moved too fast, and the discussion slides to two extremes: benchmark scores and parameter counts, or picking a vendor to cheer for. This series takes a different angle — put each technology back at the moment it appeared, and ask three questions:

- What specific problem did it solve at the time?
- Why this approach and not another?
- What new problem did it leave behind?

Once those questions line up, the trend stops being a headline and becomes a causal chain you can follow.

## Scope and limits

This series uses the **Claude / Anthropic ecosystem as its main window**. The reason is practical: my team uses Claude Code more heavily than anything else in day-to-day development, so our feel for Agent coding is the most complete.

It also covers key progress from OpenAI (GPT-5, Codex), Google (Gemini 3) and DeepSeek (R1), but not at the same depth as the Claude material — coverage is uneven across chapters, so read it against your own stack.

The enterprise section comes from real platform work. Company names, product names and figures are removed; only the transferable methods and milestones remain.

## Five stages, one throughline

Three years is not a continuous slope. It's five jumps. Each jump was forced by the previous stage's bottleneck, and each pushed a new bottleneck to the front.

| Stage | Period | What it gained | New bottleneck | Representative events |
| --- | --- | --- | --- | --- |
| Conversational AI | 2022.11—2023.03 | Understands intent, generates answers | context too short to remember | RLHF, ChatGPT, GPT-4 |
| Long-context AI | 2023.04—2023.12 | Can read a whole document | remembers more, but can't reason | Claude 2 (100K), GPT-4 Turbo (128K) |
| Reasoning AI | 2024 | Breaks problems down, calls tools | expensive, doesn't fit into existing systems | o1, MCP, Prompt Caching, DeepSeek-V3 |
| Agent AI | 2025 | Plans on its own, executes multi-step work | lacks domain knowledge, boundaries unclear | Sonnet / Opus 4.5, Agent Skills, R1 |
| Collaborative AI | 2026 | Multi-Agent coordination, human-AI collaboration | governance, trust, accountability | Cowork, Clawdbot (OpenClaw) |

One line: **capability jumps, and the bottleneck moves with it**. context, reasoning, tools, collaboration — each became the main battlefield in turn, and every breakthrough exposed the constraint in the next layer.

## Four threads running through three years

Pull the five stages apart and four threads turn out to have been running in parallel the whole time:

| Dimension | Start (2022) | End (2026) | Key change |
| --- | --- | --- | --- |
| context | 4K | 2M (enterprise) | 500x growth; cost becomes the next battlefield |
| Interaction | Hand-tuned prompts | State the goal directly | The bar drops from “can write” to “can ask” |
| Tools | Function Call | MCP / Skills, two tracks | From “what can it connect to” to “it knows how to do it” |
| Reasoning | None | CoT → o1-style thinking | From “answers fast” to “thinks it through” |

These four threads didn't advance in step. The real shifts happened where they crossed: 2024 was reasoning capability meeting tool protocols; 2025 was million-token context meeting Skills.

## One technology, four viewpoints

A few claims recur through the series: “Prompt engineering is fading”, “MCP has security problems”, “Skills is the biggest innovation”. Do they hold for everyone?

No. The same technology matters completely differently depending on where you stand.

| | Ordinary user | App developer | Product manager | Model / Agent developer |
| --- | --- | --- | --- | --- |
| **Prompt engineering** | Barely needed | System Prompt is still the skeleton | Shifts to defining Skills and flows | Reasoning-chain design and alignment, still core |
| **MCP** | Mostly invisible | The standard for integrating third-party services | Decides what the product “can connect to” | Ecosystem size is the capability boundary |
| **Skills** | Direct benefit | Efficiency multiplied | A moat for differentiation | Fills the domain-knowledge gap |
| **Agent autonomy** | Liberation, contingent on trust | Permissions and rollback become the main cost | A chance to jump the experience | Alignment and controllability |

Which yields a reading rule: **whenever you see “X is dead / X is the future”, ask first: who is this claim addressed to?** When the user side says “not needed anymore”, the developer side usually means “it's already done for you”.

## How to read this series

- **Only 30 minutes**: this chapter plus the restaurant analogy in chapter 2. You get the whole picture and a mental model.
- **Want the chronological pass**: chapters 3 through 7, one year per chapter, putting models, protocols and products back at the moment they appeared.
- **The engineer's view**: chapters 8 through 11, the four technical threads — context, Prompt, MCP, Skills — plus chapters 12 through 14 on the inference layer, enterprise adoption and what's next.
- **The full read**: 14 chapters, about 18,000 characters, a bit over an hour.

## Conclusion in one line

Foundation models are turning into a commoditized substrate. The real gap isn't in parameters, it's in the inference layer — same model, different scheduling, constraints and domain knowledge, and the output can differ by an order of magnitude.

Which is why every chapter that follows returns to the same question: **whose way of working did this change?**
