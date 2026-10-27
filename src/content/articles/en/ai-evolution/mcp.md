---
lang: "en"
series: "ai-evolution"
title: "MCP: From Hype to Reality"
subtitle: "After eight million downloads"
description: "MCP solved “what AI can connect to.” Token efficiency, security boundaries, and enterprise governance are still open problems. It is a capability layer, not an intelligence layer."
part: "Deep dive"
partOrder: 3
order: 9
num: 10
readingTime: 4
featured: false
kind: "essay"
date: "2026-01-29"
tags: []
---

In November 2024, Anthropic released MCP (Model Context Protocol). People called it “the USB-C port for AI tools.” The metaphor traveled so well that plenty of people assumed you plug it in and it works.

The real question was never whether you can plug it in. It was who pays once you do.

## What it actually solves

Before MCP, every model vendor and every Agent framework defined “how to call an external tool” its own way. Five models against ten systems meant, in theory, fifty adapters to write.

```
Without MCP: models × systems = N × M adapters
With MCP:    models + systems = N + M adapters
```

The protocol itself is not complicated. It runs on JSON-RPC 2.0. The server exposes three primitives — tools (actions it can execute), resources (data it can read), prompts (predefined templates). The client offers reverse capabilities: sampling, roots, and the like. One handshake, discovery in both directions.

The engineering payoff is direct: **integration goes from a one-off build to a one-time config**. That is why major vendors adopted it within six months — not only Anthropic; OpenAI and Google announced support too.

## After eight million downloads, the problems are just starting

At peak, download counts across the MCP Server ecosystem ran in the millions. But the people who actually put MCP into production hit three walls, fast.

**Wall one: the token bill.**

Tools are not free. Every tool definition a MCP Server exposes — name, description, parameter schema — goes into the context. Ten Servers can mean several hundred tools. Just telling the model which tools it has eats a serious chunk of budget and crowds out the space that should go to reasoning.

Which produces a counterintuitive engineering conclusion: **more connections is not more capability**. As the tool count rises, the model's tool-selection accuracy can actually fall. It did not get smarter; it got buried in options.

**Wall two: the security boundary.**

MCP's design assumes the server is trustworthy. In practice that assumption often fails.

- Tool descriptions can say whatever the server wants, which means **prompt injection has a new carrier** — one malicious tool description is enough to change the model's behavior.
- Permission granularity is coarse. Grant file read and you usually grant the whole directory.
- Supply-chain problems get amplified. A poisoned third-party Server may reach far more context than you would expect.

**Wall three: enterprise governance.**

For one person, MCP is “install a plugin.” For an enterprise, it is “who may install it, what may it connect to, who owns the incident.” Audit logs, allowlists, least privilege, data residency — none of that exists in a demo. All of it is a precondition in production.

## MCP and Skills are not the same thing

This is the most confused point, and the one I corrected most often while pushing adoption inside enterprises.

| | MCP | Skills |
| --- | --- | --- |
| Question it answers | What AI **can connect to** | What AI **knows how to do** |
| Essence | A connection protocol | Packaged knowledge |
| Failure mode | Will not connect, will not call | Connects fine, does the wrong thing |
| Analogy | Procurement system | Recipe |

The two are **orthogonal**, not competing. MCP without Skills is “a knife in hand and no idea how to chop.” Skills without MCP is “you know the technique but cannot get the ingredients.”

The most common mistake in enterprises is to compare them as substitute line items in the same budget. The result is either a pile of specs that will not connect, or a pile of manuals nobody uses.

## It is a capability layer, not an intelligence layer

Three years in, MCP's position is clear. It standardized the question “can AI reach the outside world.” It does not solve — and does not intend to solve — “once it reaches, what is the right thing to do.”

My test for whether an MCP investment is worth it has three parts:

1. **Does it replace integration code you would otherwise hardcode?** If yes, the payoff lands immediately.
2. **Is the tool count under control?** Past thirty, consider splitting it or loading on demand.
3. **Does it have a clear permission boundary and an audit exit?** If not, keep it out of production.

The protocol will keep evolving, and the tool count will keep growing. But the line does not move: **connection solves for possibility, judgment solves for correctness**. The first comes from the protocol. The second only comes from domain knowledge and engineering constraints.

> For the full breakdown of the restaurant analogy, see [Chapter 2: Understanding AI Systems Through a Restaurant](/blog/en/ai-evolution/restaurant-analogy/#mcp-vs-skills-head-to-head).
