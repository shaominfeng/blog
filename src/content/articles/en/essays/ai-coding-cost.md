---
title: "AI coding cost optimisation: don't watch the unit price, watch cost per task"
subtitle: "A real $1,412.92 bill, opened up over three months"
description: "Opening the Q3 2026 coding agent ledger: daily spend fell from $47.56 to $2.21, and 89% of that drop came from model mix. Caching and usage are not the protagonists. Includes a reusable cost formula and a checklist you can copy."
readingTime: 17
tags: ["AI cost", "Claude Code", "model routing", "engineering practice"]
date: "2026-09-18"
updated: "2026-10-26"
cover: "/og-ai-coding-cost.png"
metrics:
  - value: "95.4%"
    label: "Drop in daily spend"
  - value: "9.3×"
    label: "Rate gap"
  - value: "3.33B"
    label: "Tokens sampled"
panel:
  time: "47→2"
  label: "AI CODING<br />COST AUDIT"
  meta: "3 MONTHS / 4 HARNESSES"
---

> The classic mistake in cost cutting is optimising the price sheet instead of the bill.

Three numbers first:

- Daily spend fell from **$47.56 to $2.21**, down 95.4%
- Over the same period, daily tokens fell only to **39%** of the earlier level
- Cache hit rate sat around **90%** for three straight months, barely moving

Put the three lines together and the conclusion turns counter-intuitive: **the money wasn't saved by doing less work, and it wasn't saved by tuning the cache. It was saved by switching to cheaper models.** This post unpacks that claim: the bill first, external benchmarks second, a checklist you can copy last.

The data is my own coding agent usage from 2026-07-01 to 09-15 (4 clients, 55 models, 3.33B tokens), aggregated with `ccusage` by agent and by model. Caveats are in the last section.

## 1. The bill: three months, $47.56/day → $2.21/day

| Month | Cost | Token | Effective rate ($/M) | Cache hit rate |
| --- | --- | --- | --- | --- |
| 2026-07 | $1,093.92 | 1.60B | $0.682 | 90.7% |
| 2026-08 | $296.87 | 1.42B | $0.209 | 88.6% |
| 2026-09 (1–15) | $22.13 | 302.69M | $0.073 | 91.1% |
| **Total** | **$1,412.92** | **3.33B** | **$0.424** | **89.9%** |

![Three months of cost, token volume, and effective rate](/blog/images/cost-bill.webp)

*Figure: monthly cost, monthly token volume and effective rate for July / August / September. Cost fell 96%, tokens fell only 81% — the two curves don't move together*

July had 23 days with usage; September had 10 days up to the 15th. Per **active day**: $47.56/day → $2.21/day. July and August account for 98.4% of total spend.

The number worth watching isn't the total. It's the **effective rate**: what you actually paid per million tokens. It fell from $0.682 to $0.073, down 89.3%. The rate is the transferable knowledge. Change team, change month, the bill changes; the structure behind the rate doesn't.

## 2. Attribution: 89% of the drop came from "switching models"

Split the drop into two factors:

1. Bill July's **usage** at September's **rate**: $47.56/day → $5.09/day. That cut is the **price / model effect**, −$42.47, 89.3% of the drop.
2. Then drop usage to September's level: $5.09/day → $2.21/day. That cut is the **usage effect**, −$2.88, a further 56.6%.

![Waterfall attribution of the cost decline](/blog/images/cost-attribution.webp)

*Figure: July actual spend → price effect → usage effect → September actual spend. Blue marks the actual endpoints, orange the contribution of the two factors*

In plain terms: **the same amount of work cost 9× more at July's rate.** I didn't get more industrious. I didn't suddenly use less AI. The structure changed, so the bill changed.

Which also explains why "optimise the cache" looks right and delivers little — it moves the **discount** on the rate, never the **base**. The base is set by which model you point at which job.

## 3. No harness is inherently expensive; the model it carries decides

July and August were a Claude Code solo run (99.8% and 99.1% of spend). In September the client mix turned over completely:

| harness | Cost | Share of cost | Share of tokens | Effective rate |
| --- | --- | --- | --- | --- |
| pi (pi-agent) | $16.89 | 76.3% | 47.1% | $0.118 |
| Claude Code | $3.37 | 15.2% | 17.7% | $0.063 |
| opencode | $1.16 | 5.2% | 27.1% | $0.014 |
| codex | $0.71 | 3.2% | 8.0% | $0.029 |

![Structure of cost share by harness](/blog/images/cost-harness.webp)

*Figure: stacked by share of cost. In September pi carried 47.1% of tokens but 76.3% of spend*

Two contrasts:

- **pi burned 76.3% of the money on 47.1% of the tokens.** It's carrying frontier-tier models ($0.118/M).
- **opencode spent 5.2% of the money on 27.1% of the tokens.** Rate $0.014/M, 8× cheaper than pi.

So don't rush to rank clients. **The same client, pointed at a different model, spreads more than 8×.** The external benchmarks in the next section stretch that to 17×.

## 4. External benchmarks: cheap per token ≠ cheap per task

That's one person's bill. To rule out "one person's bill is just a special case", here are three public datasets.

### 4.1 Sonnet is 1.7× cheaper than Opus, and costs more per task

Databricks built an internal benchmark from PRs actually merged into their own repos (across Python / Go / TypeScript / Scala, tasks and tests human-reviewed):

| Metric | Sonnet 5 | Opus 4.8 |
| --- | --- | --- |
| Price per token | ~1.7× cheaper | — |
| **Cost per task** | **$2.09** | **$1.94** |
| Task completion rate | 81% | 87% |
| Token consumption | **1.9×** | 1× |

The reason is mundane: to get the task finished, Sonnet 5 **reads more and runs longer** — 1.9× Opus's token consumption. The cheaper unit price gets eaten by the extra tokens.

Same benchmark, one datapoint that matters for Chinese models: **GLM 5.2 statistically ties Opus 4.8 on quality, at $1.28 vs $1.94 per task.** In other words, the "cheap tier" is no longer the "cheap but can't finish the job" role you remember.

### 4.2 The startup tax: Aider 700 tokens, OpenClaw 26,000 tokens

The New Stack rounded up three independent benchmarks. The conclusion is more extreme than the above:

- **Same model, different harness: tokens per solved task range from about 3,500 (Aider architect mode) to 292,000 (OpenClaw). That's over 70×.**
- **The "startup tax" is the main cause.** Before doing any work, a harness has to send its own system prompt, tool descriptions and environment notes. Aider architect: about **700 tokens**. OpenClaw: about **26,000 tokens**. Run 15 turns on a 26K noise floor and ≈ 390K input tokens go into scaffolding.
- **Predicting token consumption with "startup tax × turns" gives R² = 0.99** — a better explanation of cost than "which model you picked".

This one changed my behaviour most: **turns are the multiplier, the noise floor is the coefficient.** Stating the requirement and the constraints once beats ten rounds of small probes. Cutting MCP tools you don't use beats agonising over a cheaper model tier.

### 4.3 Fixed model, harness varied: 17 points of pass rate, 17× of cost

Third dataset: FrontierHarness v1.0 from Runta — a cleaner controlled experiment. Model fixed to Kimi K3 (all through the same gateway), 9 harnesses / 12 configurations, 30 tasks (21 Terminal-Bench + 9 DeepSWE), 360 evaluations, every run from the same cold-start snapshot. **Model, tasks and runtime all fixed; only the harness changes.**

| Harness | Pass rate | Cost per pass | Cache hit (median) |
| --- | --- | --- | --- |
| **Codex** | **66.7%** | $3.47 | 88.0% |
| DSH Creator | 63.3% | $3.28 | 84.3% |
| **Claude Code** | **63.3%** | **$18.34** | 67.8% |
| Pi | 60.0% | $2.43 | 79.4% |
| Exo Harness | 53.3% | **$1.05** | 70.3% |

Three points you can quote directly:

1. **Finishing the task and finishing it cheaply are two independent capabilities.** Claude Code and DSH Creator have identical pass rates (63.3%), at **$18.34 vs $3.28 per pass — 5.6× more expensive**.
2. **Cache hit rate ≠ cost.** Claude Code's token-weighted hit rate is only 25.0%, median 67.8% — because three of the most expensive tasks account for 88% of its tokens. **The median shows you a typical run; the weighting shows you where the money went.**
3. **Vendor lineage buys nothing.** Kimi Code, from the same lab, placed seventh.

The hardest task stretched the gap to 26×: Pi and Claude Code **both passed**, but Pi used 90 turns, 98.2% cache, $2.50; Claude Code used 381 turns, 15.7% cache, **$64.36**.

## 5. The cost formula: three layers of leverage

### 5.1 The formula

```
cost per task ≈ Σ_each round ( fresh_input  × P_in
                     + cache_read   × P_cache_read
                     + cache_write  × P_cache_write
                     + output       × P_out )
```

Three variables, three layers of leverage: **unit price (P), token count (volume), cache discount (cache)**. Cutting unit price alone is the smallest win — though without the previous three sections, that sentence is hard to believe.

### 5.2 Three tiers and the real multipliers

By list price, models fall into three tiers (per 1M tokens):

| Tier | Typical models | Input | Output | Use for |
| --- | --- | --- | --- | --- |
| A · Cheap | `glm-5.3-flash` / `deepseek-v4-flash` | $0.19 | $0.51 | Flipping flags, changing config, reading logs, running tests |
| B · Workhorse | `glm-5.3` / `kimi-k3` / Sonnet tier | $0.19–3.00 | $0.51–15.00 | Day-to-day features, bug fixes, code review |
| C · High difficulty | Opus tier / `gpt-5.6-terra` | $3.00+ | $15.00+ | Architecture design, cross-module refactors, hard debugging |

Tier A vs the Sonnet tier differs **on list price** by 15.8× (input) to 29.4× (output). Mix in real agent traffic (input far outweighs output) to price a "task unit" of "1M output + k × 1M input":

| Input : Output | List-price multiple | Multiple with caching (Sonnet at 90% hit, cheap tier at full price) |
| --- | --- | --- |
| 1 : 1 | 25.7× | 22.2× |
| 10 : 1 | 18.7× | 8.6× |
| 24 : 1 (typical agent) | 17.2× | 5.7× |
| 80 : 1 (long-context heavy) | 16.2× | 3.9× |

Three sentences to read that table:

1. **List price differs 16–29×; the bill differs 4–9×.** Agent traffic is input-heavy, and caching eats a big chunk of the cheap tier's advantage.
2. **The measured rate gap in this audit is 9.3×** ($0.682 / $0.073), right at the top of that range — theory and bill agree.
3. So "switch to a cheaper model" is not a 20× myth, it's a **4–9×** reality. 4–9× is still worth doing; just don't stake your reputation on 20×.

Two traps that need spelling out:

- **A cache discount changes the unit price, not the token count.** Cheap models may burn more tokens — see the Sonnet 5 lesson in 4.1. Verify with **cost per task**, never unit price alone.
- **Prices move.** Upstream runs promotions, gateway quotes don't always follow. Any comparison must state its **price date**.

## 6. Caching: half of my earlier conclusion was wrong

This is the biggest correction I made while writing this.

### 6.1 First, fix the denominator: that 17% was a denominator error

I once used a report aggregated by **session** to conclude "Claude Code hits only 17%–36% cache rates against third-party models", and on that basis wrote "get caching working first, then talk about switching models".

Switch to **token-weighted**, with the denominator fixed as "all prompt tokens the model processed":

![Cache hit rate, native vs third-party models](/blog/images/cost-cache.webp)

*Figure: cache hit rates for Anthropic native models vs third-party models across 2026-07 / 08 / 09. 94.3% vs 85.2% overall*

| Group | prompt token | Missed token | Hit rate |
| --- | --- | --- | --- |
| Anthropic native models | 1.49B | 84.41M | **94.3%** |
| Third-party / gateway models | 1.53B | 227.15M | **85.2%** |

9.2 percentage points apart. Converted to "full-price input", the miss ratio is 5.7% vs 14.8%, **a 2.62× gap**.

But compared with my old conclusion, 85.2% and 17% are different worlds. The only difference is one thing: **the unit of aggregation**.

- Averaged per session: long sessions and cold-start sessions drag the mean down, and sessions differ in volume by orders of magnitude — the mean is meaningless.
- Weighted by token: you pay per token, so you can only read per token.

This is the same lesson as "median 67.8%, weighted 25.0%" in 4.3, seen from the other side. **In cost analysis, asking "what denominator is this percentage on" matters more than the number itself.**

One cross-vendor accounting difference while we're here: Anthropic models report three segments (`input` misses / `cacheCreation` cache writes / `cacheRead` cache reads), while third-party models report `cacheCreation` as **always 0** — their caching is implicit and automatic, and "writes" get folded into `input`. So the only cross-vendor comparable denominator is `cacheRead / (input + cacheCreation + cacheRead)`. Use `cacheRead / (input + cacheRead)` instead and Anthropic inflates to 99.7% — an inconsistent denominator.

### 6.2 Caching isn't a source of savings; it's a guardrail

With the denominator fixed, the conclusion gets clearer, not murkier:

- Cache hit rate was 89.9% across three months, varying by less than 3 points. **It never moved, so it can't be the reason costs fell.**
- But it is a **guardrail**: lose 10 points of hit rate and your input cost roughly doubles. It won't save you money, but it will make you expensive overnight.

So the right framing is "**don't let it get worse**". Concretely:

- **Cache has a TTL, 5 minutes by default.** The 1-hour tier must be enabled explicitly, and writes bill at 2× input (the 5-minute tier is 1.25×). Zone out too long = cache expires = full recompute next turn.
- **Don't switch models or backends mid-session.** A model switch changes the cache namespace and voids everything cached so far. **If you need to switch, switch in a new session.**
- **Close out long tasks when they're done.** `/compact`, or just `/clear` and start fresh — don't drag irrelevant history around.
- **Hand off across sessions with a handoff summary.** Write a trimmed handoff doc and load it on demand in the new session, instead of resuming the whole history.
- **Batch related work into a single time window.** Touch the same file ten times in a day and the cache is cold nearly every time.
- **Don't edit `CLAUDE.md` / `settings.json` / MCP config mid-session.** Change the system prompt and the cache dies immediately.

## 7. The startup tax: fixed overhead you pay every turn

If switching models is "cutting the unit price", this section is "cutting volume" — and specifically the most pointless volume.

![Claude Code's /context output](/blog/images/cost-context.webp)

*Figure: actual `/context` output. 96.8K / 1M tokens (10%), of which System tools 37K, MCP tools 35.3K, Skills 10K*

The three most expensive numbers on that screen:

- **System tools: 37K** (tool descriptions)
- **MCP tools: 35.3K**
- **Skills: 10K**

Tool descriptions alone (37 + 35.3 = 72.3K) are **three quarters** of used context. They get resent every turn. Per 4.2, that is "startup tax × turns".

Over 30 turns: 72.3K × 30 ≈ **2.2M tokens**, all on tool schemas. Even at a 0.1× cache discount, it's not a small bill.

Cleanup list, ordered by payoff:

- **Trim MCP.** Don't configure globally; enable **per project, on demand**. Use a CLI where a CLI will do (`gh`, `curl` are enough). Run `/mcp` regularly to see which servers are actually live.
- **Trim Skills.** A skill's `description` sits in the system prompt permanently; more skills, heavier floor. "Meta-skills" cascade-load a pile of sub-skills — don't trigger them on light tasks. For skills that don't need auto-matching, add `disable-model-invocation: true`.
- **Trim `CLAUDE.md` and global rules.** Longer global rules cost more every turn. Keep only what's necessary.
- **Watch the fixed overhead in statusline / hooks** — e.g. a safety classifier that fires on every shell command.

## 8. Task tiering: 85% of tasks shouldn't go to the most expensive model

One more useful number in the Databricks benchmark: of an engineer's daily tasks, about **25% are low complexity, 60% medium, 15% high**.

| Complexity | Share | Typical tasks | Suggested tier |
| --- | --- | --- | --- |
| Low | ~25% | Flipping flags, changing config, reading logs, formatting, running tests | A (flash tier) |
| Medium | ~60% | Day-to-day features, bug fixes, code review, batch jobs | B (glm / kimi / Sonnet) |
| High | ~15% | Architecture design, cross-module refactors, hard debugging | C (Opus tier / frontier tier) |

**Defaulting to the most expensive model means 85% of tasks subsidise the 15%.**

For this to actually land, **switching models has to be cheap**. If a switch means editing config, opening a new terminal, changing a profile, you will never switch, and everything ends up on the most expensive tier. My setup is one CLI plus a few shell aliases (`cc glm`, `cc kimi`, `cc fast`). One line to change tier.

One easy trap: **`--model` only governs the main thread, not the side paths.** A `model` hard-coded in a subagent's frontmatter, the `model` argument on the Agent tool, the haiku tier for hooks, session title generation, the auto-mode safety classifier (one call per shell command) — these entry points bypass your chosen model and quietly generate charges. Rather than fixing them one at a time, remap once at the **alias resolution layer** to cover all of them:

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL="$MAIN"    # opus alias
export ANTHROPIC_DEFAULT_SONNET_MODEL="$MAIN"  # sonnet alias
export ANTHROPIC_DEFAULT_HAIKU_MODEL="$FAST"   # hooks / small tasks
```

## 9. The checklist

**Today:**

1. Run `/context` once and see how heavy your startup tax is. Above 30K of tool descriptions, it's time to act.
2. Clear out global MCP servers and skills you don't use; move to per-project, on-demand loading.
3. Remember two rules: **switching models = new session**; **long task finished = `/compact` or `/clear`**.

**This week:**

4. Use `ccusage` (or `/cost`) to record a week of real spend as a **baseline**, and work out your effective rate ($/M tokens).
5. Pick one class of low-complexity task, move it to tier A, and compare **cost per task** and completion rate — not unit price.
6. Merge "many small edits to the same file" into one session.

**Ongoing:**

7. Once a week, look at cache `cache_breaks` (which turns the cache died on). It's a guardrail, not an accelerator.
8. Once a month, look at the trend in rate and token mix, focused on "which price tier the money goes to", not the total.
9. When a new model ships, measure cost per task **on your own tasks**, not list price off a leaderboard.

**There's only one measurement principle** (from Databricks): **look at cost per task / cost per verified outcome, not cost per token.** The latter ignores pass rate and cache tier and will rank models wrongly.

## 10. Data boundaries: how to read these numbers

An honest ledger states its biases. Three of them:

**One, third-party model costs are list-price estimates.** `ccusage` is broadly trustworthy for Anthropic models (July–August spend is mostly them), but for third-party models it uses public price lists, which may not match what actually settles. If you're on a monthly or volume package, read "cost" here as **equivalent compute cost**, not cash paid.

**Two, the price list has gaps; corrected to official prices.** The audit showed a model billing $0.00 on 238M tokens — a missing price-list entry, not free (the same model priced correctly without the `org/` prefix). Recalculated at official prices: July $1,093.92 → $1,132.40 (+4%), August $296.87 → $395.35 (+33%), September $22.13 → $32.46 (+47%). **Even taking the corrected upper bound, daily spend still falls by more than 95%. The conclusion holds.**

**Three, September is half a month.** Data runs to the 15th, with 10 days of actual usage. Extrapolating by calendar day gives $44.27; by active day, $66.40. Against July's $1,093.92 and August's $296.87, the full month most likely lands in $44–$66 — the order of magnitude is unaffected.

One more layer of bias comes from the attribution itself: **the attribution is my decomposition, not an experiment.** I changed models and clients on my own real workflow; there was no strict A/B. The external benchmarks cited in 4.1–4.3 are the controlled experiments; my ledger is only the circumstantial evidence that it reproduces in the wild.

## Appendix: what the model routing suffixes mean

Gateway model names often end with a suffix — `-anthropic`, `-aws`, `-azure`, `-gcp`. **The suffix is the hosting route, not a version number.** The same model can sit on several hosting providers; different suffix = different physical backend = potentially different price, cache behaviour and available capabilities.

| Suffix | Host |
| --- | --- |
| (none) | Auto-routed; the gateway picks a route |
| `-anthropic` | Anthropic direct |
| `-aws` | AWS Bedrock |
| `-gcp` | Google Cloud Vertex AI |
| `-azure` | Microsoft Azure AI Foundry |

**Any cost comparison must pin the same route**, or the multipliers aren't comparable. The same model on different hosts can quote differently and cache differently — which is why every price in this post carries a price date and a routing basis.

---

**References**

1. [Databricks: Benchmarking Coding Agents on a Multi-Million-Line Codebase](https://www.databricks.com/blog/benchmarking-coding-agents-databricks-multi-million-line-codebase) — cost per task, Sonnet 5 vs Opus 4.8, GLM 5.2, capability tiering
2. [The New Stack: Aider, Claude Code, and OpenClaw ran an identical model. Token use varied 70-fold.](https://thenewstack.io/agent-harness-token-costs/) — startup tax and the 70× token spread
3. [Runta: Introducing FrontierHarness Eval](https://runta.com/blog/introducing-frontierharness-eval/) — fixed-model cross-harness eval: 17× spread in cost per pass
4. [Anthropic: Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) — cache billing basis: read 0.1×, write 1.25× (5 minutes) / 2× (1 hour), default TTL 5 minutes
5. [Microsoft Foundry: DeepSeek V4 Flash / V4 Pro](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/introducing-deepseek-v4-flash-and-v4-pro-in-microsoft-foundry/4515174) — tier A pricing basis
6. Local usage audit: `ccusage` aggregated by agent / model, 2026-07-01 → 09-15, 4 clients, 55 models, 3.33B tokens
