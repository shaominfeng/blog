---
lang: "en"
series: "ai-evolution"
title: "The Rise and Fall of Prompt Engineering"
subtitle: "It didn't die. It sank."
description: "From $200,000 salaries to a 70% drop in postings, prompt engineering sank from the user side into the system: system prompts, tool descriptions, and Skills became the new carriers."
part: "Deep dive"
partOrder: 3
order: 8
num: 9
readingTime: 4
featured: false
kind: "essay"
date: "2026-01-29"
tags: []
---

In April 2023, a batch of $200,000 jobs showed up on Indeed. The job description was one line: can talk to large models. Two years later, postings for those same roles are down 70%.

It looks like the birth and death of a profession. Read it that way and you miss what actually happened — **prompt engineering didn't disappear. It sank from the product surface into the system.**

## Why It Used to Be Worth Money

Models in 2023 had a clumsy kind of honesty: if you didn't spell it out, they genuinely would not guess.

Same request. “Summarize this” versus “Summarize the key terms of this contract in three sentences, highlight the amount, the term, and the penalty clauses.” The output quality differs by an order of magnitude. Model capability was fixed. **The prompt was the only variable an engineer could touch.**

The craft had real technical depth. Structured constraints, few-shot examples, chain-of-thought scaffolding, output format control — done well, the improvement was visible. It was worth money because it was a real lever.

## Three Decline Curves

The turning point was 2024. Three curves bent at once.

**One: models started to guess.**

Better instruction following dropped the bar for “spelling it out.” Format constraints that once needed careful design now take one plain sentence. The model itself absorbed the user-side demand.

**Two: structured solutions replaced handwork.**

MCP answers “what can it connect to.” Skills answer “how is it done.” Both used to be hardcoded into the conversation as a long string of prompts. Now they are extracted into standalone, reusable, versionable assets. Craft became product.

**Three: the cost structure changed.**

With longer contexts, piling tricks into a prompt is no longer free. A carefully built few-shot block can eat thousands of tokens, and the model no longer needs it. The return on investment inverted.

The 70% drop in postings is those three curves stacked. The practitioners didn't get worse. The job got taken apart and redistributed.

## Where It Sank To

“Sank” is the precise word here. Nothing disappeared. It changed position — from the user's input box to the system design layer.

| Where it lives | Form | Who builds it |
| --- | --- | --- |
| System prompt | The agent's persona, boundaries, rules of conduct | App developers |
| Tool descriptions | Whether the model picks the right tool depends on this text | Protocol and platform developers |
| Skill bodies | Executable manuals for the team's best practices | Domain experts + engineers |
| Eval sets and constraints | What “done right” means, written into the system | Product and quality teams |

One concrete example: **a badly written tool description decides whether the model picks the wrong tool.** That isn't the job of a “prompt writer,” but it's the same job — using natural language to constrain a nondeterministic system precisely.

The form changed too: from a one-off chat input to a versioned, rollback-capable, testable engineering asset.

## What It Means If You're New to This

If you want a job because you can write prompts, that path is essentially closed.

But if you're doing any of the following, the craft is still a core skill. It just isn't called prompt engineering:

- Design an agent's behavioral boundaries and failure handling
- Turn a domain expert's judgment into a reusable Skill
- Define what “done right” means and write it into an eval set
- Find the balance point between cost and quality

The difference: **before, you got the model to understand one sentence. Now you make the system reliably do a class of things right.**

The first is a one-off trick. The second is long-term engineering. That also explains why it looks dead — the trick layer died, the engineering layer settled.

> For how Skills turn domain knowledge into installable assets, see [Chapter 11: Agent Skills](/blog/en/ai-evolution/agent-skills/).
