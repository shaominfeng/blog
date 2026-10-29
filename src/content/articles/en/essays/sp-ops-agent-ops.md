---
title: "An RD's side quest into ops: from Redis to fleet-wide monitoring"
subtitle: "Inside one real task: how the question was framed, how the plan changed, and who made the calls"
description: "It began with one misread Grafana data source. With an agent, 39 dashboards across 5 sites turned into an inspection tool — how the docs were made to match the real environment, how severity was redefined, and how a single throttling alert was traced upstream."
readingTime: 18
tags: ["Agent collaboration", "operations", "observability", "engineering practice"]
date: "2026-10-29"
cover: "/og-sp-ops.png"
metrics:
  - value: "39"
    label: "dashboards archived"
  - value: "5"
    label: "sites inspected"
  - value: "14"
    label: "days from alert to fix"
panel:
  time: "39"
  label: "SP-OPS<br />OPS TOOLING"
  meta: "5 SITES / 1 COMMAND"
---

## Before we start

In the AI era, what matters most is often not which problem you solved, but how you framed it — and how you used AI to push the solution forward, round after round. Specific answers go stale fast; the way you ask, and the standards you judge by, are what stay. This piece is a record of how that played out inside one real task: how the question got framed, how the agent went off to check, where I made the call, and where it corrected me.

## 1. Finding the problem: the docs didn't match the real environment

### 1.1 Where it started

It began with a team change. I had just moved from one team to another, and everything around me was unfamiliar: unfamiliar code, unfamiliar environment, and most of the tools I was used to no longer applied. So I had the AI walk me through the product code, and through how this environment actually runs.

Then my manager handed me a task to optimise Redis usage. It wasn't urgent, which made it a good excuse to learn the whole landscape. I didn't spread out on day one; I started from that single Redis problem and, leaning on the AI's sensitivity to anomalies, worked my way down. Along the way I stumbled into a tool that could monitor the entire product line.

First I wanted to see where Redis stood, so I opened Grafana Portal and looked at the metrics. After a while it got tiring. There are many sites (US, EU, SG, AU, IN and so on), and every switch meant hunting for the panel again, plus you have to keep watching for changes. Human attention runs out fast. A thought came up: could the AI watch it instead?

For the AI to watch, it first has to know where to look, how to look, and what it can get. I poked around Grafana and found it can issue API keys, so a program can pull data directly. Let the AI feel out that API surface, and maybe it can get more than the UI shows. That was the origin of the first `grafana-ops` skill.

The first version of the doc listed 5 dashboards and a few data sources. It looked usable, but coverage was poor. On 10-21 I asked the agent to verify what the doc claimed, in plain words: "Explore what grafana can do, add the dashboards in, and see if anything is missing."

### 1.2 First round of exploration

The agent read the panel definitions of all 39 dashboards and checked them item by item against the skill doc. The gap:

| Item | What the doc said | What was actually there |
|---|---|---|
| Dashboard coverage | 5 | 39 |
| Sites | Sites not distinguished | 5 sites, each a separate Grafana instance |
| Data source | Labelled "prod EKS" | In fact only covered the US node, not everything |
| Capability claims | Written as fixed conclusions (e.g. "no permission") | Changes with environment and key; must be tried first every time |

One mistake I remember clearly. The agent initially treated a data source as "prod EKS", on the sole basis that some metrics carried a cluster label. I asked: "Which site are you looking at? Shouldn't this distinguish environments?" After checking, it admitted the earlier judgement had no basis — it had only been querying the US node.

### 1.3 Resolution and the CPU definition

Two more subtle problems.

The first was resolution. I asked the agent to plot an hourly curve, and it found the CloudWatch data source ignores the `period` you pass in and picks one from the time range instead: 5 minutes for 2 days, 15 minutes for 7 days, and only 1 hour at 30 days. The 7-day figures previously counted "per hour" were actually at 15-minute resolution, so the hour count was inflated fourfold. The agent caught this itself while checking the curve — I hadn't noticed.

The second was Redis CPU. We started with the host-level `CPUUtilization`, and `sp-redis-us-001` came out on top. Switch to `EngineCPUUtilization` (the real load on Redis's single-threaded engine) and it sits around 20%, while `sp-redis-us-002` and `sp-redis-sg-001` regularly pin their engine threads at 100%. The conclusion flipped completely.

## 2. Sorting the mistakes into categories

After about a week of back-and-forth, I grouped the problems into four categories. That grouping later became the checklist the agent uses when it validates and reviews.

- Definition problems: sites and environments not distinguished, the wrong metric chosen (host CPU vs engine CPU), resolution quietly rewritten by the data source.
- Fact problems: conclusions in the doc never actually tested, such as "cross-region queries work", node counts, data source IDs.
- Rule problems: severity judged only on the historical window, so an alert stays up after the issue is already resolved.
- Engineering problems: script errors treated as normal results, inconsistent exit codes, no retry on rate limiting.

The third category did the most damage; section 4 covers it.

## 3. The design: explore first, monitor second

### 3.1 Split it into two layers

The original requirement was one resource-monitoring skill: list the resources, say how to query them and how to analyse them, then produce a report with sound analysis of anything abnormal.

Later I split "exploration" from "monitoring", because I wanted `grafana-ops` to be reusable by other people. Its role is close to an MCP server: it only supplies data — query metrics by site and environment, list dashboards, return daily or hourly series — and makes no judgements.

Judgement goes to other skills. `resource-inspection` is one of them, and it answers "is there risk, how bad, and will it get worse". Any future analysis skill can reuse the same data layer instead of writing its own queries.

That boundary was first raised by the validation subagent on 10-22: the first monitoring skill had handed single-value lookups to `grafana-ops` too. On 10-28, when adding the Pod exploration plan, I stressed it again: the data layer only supplies data, all judgement lives in the analysis layer, and the two hand off through a documented contract.

### 3.2 Thresholds need a provenance

I asked the agent to set thresholds by referring to public standards. It checked AWS's official guidance and found that AWS publishes no uniform number, and third-party sources disagree wildly.

So every threshold is labelled with its source and its nature. The 25% over 5 minutes for Pod CPU throttling, for instance, comes from the kubernetes-mixin rules. Thresholds live together in `thresholds.json`, and their sources are written up in `thresholds.md`.

### 3.3 Run it as a skill, on real data

The first version sat directly under `~/.claude/skills/` and ran against real data. After every change I re-ran it over the last 30 days of US, EU and SG data and compared with the conclusions I'd reached by hand. Plenty of problems surfaced exactly this way.

## 4. Round after round of correction

### 4.1 Confirm the site before querying

The first rule: before every query, confirm site and environment; don't default to US and don't carry over the previous one. `SKILL.md` gained a Site table listing each site's CloudWatch region, example Redis node and data source.

After that, a vague request like "check Redis" gets a follow-up question about resource type and site instead of a script run.

### 4.2 Severity

This is the part that mattered most, and it was rewritten twice.

The first pass was on 10-22, about "will it get worse". The first version only looked backwards. I pointed out that the engine CPU spike on `sp-redis-us-002` was "just one day" and had already been dealt with, so it shouldn't count as severe. The agent reworked it: severe means "at the current trend it exhausts within 14 days, or it has already reached a severe level recently"; warning means "still abnormal recently, but flat or falling"; notice means "only appears in the historical window, not recurring in the last 3 days".

The "rising" test also needs a ratio threshold. The agent first set 1.5; looking at the results I found a node I didn't consider severe had been marked severe, so we changed it to 2.0.

The second pass was on 10-29, about static thresholds. I saw a report: a Redis node had peaked near 100% memory on 10-26 and then fallen below 1%, yet the report still marked it severe. I asked: "This was fixed the day before yesterday and it came down yesterday — why is it still alerting? Is the skill's calculation wrong?"

The agent checked and admitted the fault was in the rule: `level_check` only looked at the 3-day window before the report was generated, never at the current value. It then pulled daily data with read-only queries and confirmed the node really had come down.

The fix followed the same pattern — I set the standard, it implemented and verified:

- Static thresholds switched to the latest data points: only when the last 3 points are all over the line does it count as currently severe.
- I then said "every severe line should look at the recent situation". The agent inventoried five kinds of decision logic (static threshold, mean, spike, exhaustion extrapolation, evictions) and added a "still over the line recently" condition to each.
- Exhaustion extrapolation switched to the recent slope for its day count, so if the slope has flattened over the last few days it is no longer severe.

What I took away: a threshold looks like a technical parameter, but it is really an operational judgement. The AI can compute the number; "what counts as severe" has to come from a person.

### 4.3 Independent validation

This step used `skill-design-standards`, a set of skill-authoring standards I've built up myself, covering how new skills are created and reworked. It treats a skill as an asset written for a machine to read: fixed directory layout, a description precise enough to decide both triggering and exclusion, `SKILL.md` under 500 lines, deterministic logic pushed down into scripts, and a full validation pass at the end.

Validation has four passes: description and routing, logic, boundaries and failure modes, and structural compliance. A new skill runs all four; each pass is executed by an independent subagent that receives only the task boundary and the verbatim validation prompt, never our implementation thinking. Every result goes into `validation-log.md`. The companion `lint_skill.py` covers what a machine can check, such as name format, description length and line counts.

It was used in two places. resource-monitor (later renamed resource-inspection) was created from scratch and went through all four passes on the new-skill path; when grafana-ops was slimmed down, it ran passes 1, 2 and 4 on the rework path.

The results, roughly:

- The first pass 3 listed 42 failure modes; most were already fixed in the new scripts, but a real set of gaps remained.
- Pass 2 (logic) for resource-monitor was re-run many times and was still NOT CLEAN at handover on 10-22, with new blockers surfacing every round.
- The independent code review found problems we hadn't: a 30-minute query step meant "restart count" missed most events, for instance, and a single-point series would divide by zero.

At the end of one round the agent wrote: "This skill cannot currently be called 'verified'." That line stayed in `validation-log.md` verbatim. Each round is recorded as it happened; a pass that wasn't re-run is not written down as passed.

The final handling was plain: fix the contradictions, mark the rest as "known limitations", and let me decide. That is more honest than insisting it's "verified".

### 4.4 One small bug

The report gave 10-03 as the peak time for `sp-redis-us-002`. I said: "That was just one day, back on 10.3, right?" The agent checked and found the script took the first occurrence of the peak, not the most recent one. Anyone reading the report would think the event only happened that day.

That settled it for me: every number in a report has to be traceable back to the raw data.

## 5. Testing it against real problems

### 5.1 uic-web-server: scale out or not

The first real problem came from work. I wanted to know what `uic-web-server` in US was, whether it had enough memory, and whether it needed to scale.

The agent first confirmed it is the frontend service for the XDR Portal, with nginx serving static assets and reverse-proxying to the API gateway. Then it found: all 10 Pods healthy, HPA range 5 to 20, not at the ceiling, no restarts or OOMs in the last 24 hours.

But the per-Pod memory request is 256Mi while actual usage runs between 245 and 285Mi, and the memory HPA hovers between 95% and 110%. In other words, the replica count was being pushed up by memory, not driven by traffic.

The conclusion: no need to add replicas; what needs adjusting is the memory request and limit. The agent also located the ops deployment repo holding the parameter definitions and checked a related tuning PR — the direction matched our recommendation. I had it look at the other sites too; similar picture, with the US limit the tightest.

I sent the conclusion and the evidence to ops. They checked and confirmed it, and a PR went out shortly after rather than dragging on. That was the first time the Pod exploration capability earned its keep.

### 5.2 horus-connector: from one throttling alert to the upstream

The second problem was far more involved, and it shows the method's value better.

It started as one line in an inspection report: `horus-connector` CPU throttling, widespread across sites, severe in US and EU, warning in SG, IN and AU. Looking at the Pods: every Pod in US and EU has a 1-core limit, HPA is already at its ceiling of 10, the Pods are permanently throttled, and memory use is under 10%.

I sent that line to ops. Their read: this is a code problem, tuning resources won't fix it. I didn't stop there — I wanted to see what in the code was causing it, so I had the agent keep digging. I supplied direction only: look at the trend first, then dependencies, then logs. Which tool to use and what to check next was mostly its call.

The path it took went roughly like this.

Code first. Some retry loops have no backoff, and the scheduled sync fires every minute. Those two explain why CPU in US, EU and SG is flat all day with no day/night pattern. But the caller that triggers the per-minute sync isn't in these repos — it must be a scheduler outside the cluster.

Then the deployment repo. It first trusted the Helm chart in the code repo, then found it didn't match the running Pods, and located the prod values in the deployment repo — confirming that is the source of the running values, and correcting its earlier statement on its own. That config hadn't changed since April 2024, so the saturation wasn't caused by a config change.

Then 30 days of trend. Around 2026-10-20 19:00 UTC, throttling and CPU stepped up simultaneously across EU, SG, AU and IN, and stayed high afterwards, with no change to images or values. Inspection defaults to a 7-day window, so this step had been in place for over a week without anyone noticing.

Then dependencies and upstream. At the same moment, portal-backend CPU, DocDB read operations and Redis network ingress all stepped up as well, while Redis and DocDB CPU and connection counts stayed flat. The dependencies weren't saturated; the call volume had changed.

The hardest part was the logs. Querying with slog-query returned all zeros at first. The agent switched index names itself, then found that fields like uri and source IP aren't indexed, so they can't be filtered on directly. It switched to random sampling within time windows and matched source IPs against Pod lifetimes to identify callers. The result was two growth curves stacked together:

- From 10-20 19:00, the source of requests to a certain aggregation endpoint moved from inside the cluster to a few outside network ranges, and total horus volume in EU rose from about 1.12M/hour to 1.34M.
- From 23:00, a client outside the cluster appeared that only calls the foundationInfo endpoint, one request per different customer, arriving in bursts with 5 to 15 hours between them and a different source IP each time. It looks like a batch job walking through customers one by one. During those hours that endpoint accounted for about 60% of portal-backend call volume; normally it is close to zero.

Back to the code, finally. The agent looked in the local workspace for callers of those two endpoints and found the route definitions and some callers, but not the code that launches the walk. Which means the initiator isn't in these repos.

The logs gave two supporting signals. During the walk, p50 latency for other callers rose from about 2ms to 8–26ms and recovered afterwards, so horus is queueing under load and dragging others down. Separately, horus's cache hit rate is only 4% to 13%, so most requests land on Redis.

So the ops team's initial read was half right. There is code worth changing — retry backoff and cache hit rate. But the step change in CPU after 10-20 looks more like upstream call volume changing. Adding resources alone, or fixing only horus's own code, doesn't reach the root. Who those outside network ranges belong to needs gateway or VPC data to confirm. There's no conclusion yet, and the sampled percentages carry a few points of error — they show magnitude only.

Looking back, every tool along this chain sees only one corner. Monitoring knows "CPU is maxed out"; only logs show who is calling; only code tells you whether the caller is yours to fix. The more tools you connect, the further the chain reaches.

### 5.3 fed-svc-prod-001: from alert to fix to the alert going away

The third problem had the longest arc. From the first inspection report on 10-22 to the alert being downgraded on 10-29, the whole line is recorded in the reports.

Again it started with inspection. `fed-svc-prod-001` and `-002` in US (two Redis nodes of the same service) were marked severe on the very first run: memory around 78%, rising about 9 points a day for 7 days, which would exhaust it within days at that rate. I first suspected a false positive, so on 10-23 I had the agent pull 14 days of daily memory to confirm the shape of the growth. The curve is smooth, climbing all the way to 86.9% — not noise, genuinely rising. At the same time I had it assemble a checklist for the service owner, with the commands to verify and the release records to confirm. By 10-24 memory was above 99% and 002 had started evicting keys.

Then into the code. On 10-27 I had the agent study how Bull (the Redis job queue) is used in that service's repo, and whether failed jobs get cleaned up. Its conclusion after reading: there is no dedicated cleanup logic.

- Most jobs don't set `removeOnComplete` or `removeOnFail`, and Bull keeps them forever by default.
- Nothing deletes a job after the last link in the job chain finishes, so completed jobs stay in Redis.
- Failed jobs are only deleted on the final retry; those that can't be deleted just sit there.
- The repo has no time-based cleanup mechanism at all.

In other words, jobs only go in and never come out, and Redis memory fills up bit by bit.

The fix also went to the agent. It added a queue-status endpoint and a manual cleanup endpoint, plus scheduled cleanup keeping completed and failed jobs for only one day. The change went out as a PR, merged and deployed.

After deployment, around 10-27 18:21 UTC (10-28 02:21 Beijing time), the key count on both nodes fell from about 307,000 to about 600 within minutes, memory dropped from above 99% to below 1%, and evictions stopped.

Monitoring had a tail to it as well. In the two reports from the small hours of 10-28 and 10-29, both nodes were still marked severe, because the rule at the time only looked at the historical window and not the current value — the issue described in 4.2. After the rule changed and the report was re-run, the severe count for US went from 4 to 0 and both nodes became "notice: recently at severe level, currently recovered".

Every report is archived, so comparing them gives a complete record:

| Report date | Level | Data at the time |
|---|---|---|
| 10-22 | Severe | Memory about 78%, 7-day slope about +9 points/day, extrapolation leads to exhaustion |
| 10-23 | Severe | Peak 86.9%, still growing steadily |
| 10-26 | Severe | Peak 99.8% |
| 10-28 | Severe (false positive) | Cleanup already effective, memory below 1%, rule only looked at the historical window |
| 10-29 (after the rule fix) | Notice | Currently 0.5%–0.7%, recently at severe level, now recovered |

From monitoring finding it, to reading code for the root cause, to shipping the fix, to monitoring confirming recovery — every step has a record. Whether the fix worked doesn't depend on anyone's word; the next report tells you.

## 6. Feedback and improvement

Looking back, every meaningful improvement to the tool came from a sentence of mine. Mostly these:

| Date | My feedback | What changed in the tool |
|---|---|---|
| 10-21 | "Which site are you looking at? Shouldn't this distinguish environments?" | Confirm site and environment before every query; add a Site table |
| 10-22 | "Severity should be about whether it gets worse" | Introduce the forward-looking 14-day exhaustion extrapolation |
| 10-22 | How to handle pass 2 repeatedly coming back NOT CLEAN | Fix the contradictions, mark the rest as known limitations, stop insisting it "passed" |
| 10-28 | "The data layer only supplies data; analysis goes to other skills" | Position `grafana-ops` as the data layer, move all judgement into the monitoring skill, and write the split down |
| 10-29 | "This was fixed the day before yesterday, why is it still alerting" | Static thresholds look at the latest data points |
| 10-29 | "Every severe line should look at the recent situation" | All five decision paths gain a recency condition, so history stops dragging them down |

One small thing worth noting.

After the rule change on 10-29, the warning count in the report went from 8 to 11. I had the agent check which 3 were new. It confirmed they all came through rules that hadn't been touched, and were caused by the data changing over time, unrelated to this change. When you change a rule, check where the change in output came from — that habit has stuck.

## 7. What I'd carry to the next project

Looking back, a few things I think would transfer.

1. Send the AI to check, not to explain. Every conclusion must trace back to a query result, a script output or a config file. The agent did its best work the times I challenged it and it actually went and looked.
2. Follow an alert outward; don't stop at the first explanation. horus-connector was first put down to a code problem, and only by following monitoring, the deployment repo, the logs and the code did we find that the upstream call source had changed after 10-20. The more tools you connect, the further the chain reaches.
3. Agree on definitions first. Both are called CPU, but the host definition and the engine definition give opposite conclusions, and the data source quietly rewrites resolution. Monitoring looks at the present; historical windows are good for reconstructing events, not for setting severity.
4. Make validation genuinely independent. The subagent gets only the task boundary and the verbatim prompt, none of our judgement, and that's how it finds bugs we can't see. Unresolved items get written down too; the log records every pass, and a pass that wasn't re-run isn't recorded as passed.
5. Before syncing to a public repo, check visibility and history. Before syncing the skill to the marketplace, the agent found files containing internal information already on remote main. It didn't commit or push on its own; it listed the situation and had me confirm item by item. The lesson: check before you sync, don't wait for the incident.
6. Credentials never go into the conversation or the docs. Keys are always read from environment variables; only the length is checked, never the content. When extracting deployment config, filter out lines containing passwords first.
7. People make the judgements; the AI executes and verifies. The definition of severity, whether the ratio is 2.0 or 1.5, which items can only be marked as known limitations — those were my calls.

## 8. What's left at the end

### 8.1 What got solved

| Problem | Before | Now |
|---|---|---|
| Manual watching | Open the portal, go site by site and panel by panel, and keep staring | One command runs the Redis / RDS / Pod inspection for a site; about 20-odd seconds per site over a 7-day window, about 2 minutes for 5 sites. Site addresses and keys come from environment variables, run site by site |
| Incomplete docs | 5 dashboards, capability described by guesswork | All 39 dashboards archived; data sources and instance lists for 5 sites are queryable |
| Wrong definitions | Host CPU used to judge Redis; resolution silently rewritten by the data source | Engine CPU is the reference; resolution behaviour written into the skill |
| False severity | Only looked at historical highs; still severe after the issue was resolved | Level set from recent state and future trend; historical events downgraded to notice |
| Untraceable conclusions | A single number | Every conclusion carries evidence, peak time (UTC and Beijing) and how to verify |
| Scaling decisions | Add replicas by feel | Separate traffic-driven from memory-driven, and state the basis for adding replicas vs tuning request/limit |
| Silent failures | A failed query could still show "normal" | Failures count into the exit code; missing data shows "needs review" |

### 8.2 What was produced

| Artefact | Role | Size |
|---|---|---|
| grafana-query (formerly grafana-ops) | Data layer: read-only queries against CloudWatch, Prometheus and the production database, MCP-like, no judgement | `SKILL.md` about 150 lines; site, data source and Pod resource details split into references |
| resource-inspection (formerly resource-monitor) | Analysis layer: Redis / RDS / Pod risk inspection, Markdown reports | `monitor.py` about 1,600 lines; thresholds, checklists and output contract in separate files |
| sp-mysql-readonly, slog-query | Read-only database and log queries, used by inspection and investigation | Two skills |
| Tests | Offline verification of rules and boundaries | 33 test functions for Redis and memory rules, 20 for Pod rules |
| validation-log.md | Pass results and unresolved items per round | Saved with the skill, for traceability |

### 8.3 What a report looks like

Each inspection produces a Markdown report with a fixed structure in six parts:

1. Title and metadata: site, resource type, query window, data sources, query and failure counts, plus coverage.
2. Summary: how many severe, warning and notice items, with the ones to handle first listed by priority.
3. Data coverage and quality: data point counts, resolution and gaps per node, e.g. "a Pod has no limit set, so the memory percentage rule can't decide".
4. Resource detail: key metrics per node, by site.
5. Anomalies and leads: each finding carries level, object, metric, rule, evidence, possible cause and how to verify.
6. Severity definitions and method thresholds: the decision criteria written out so others can review them.

Here is one finding, as an illustration (redacted):

```markdown
### [Severe] US / a Redis node: memory usage recently at severe level

- Rule: `redis.memory_peak`
- Evidence: 99.84% max over the last 3 days; most recent at 10-27 09:34 UTC (17:34 Beijing)
- Possible causes (to be verified) and how to check:
  - Memory close to maxmemory; confirm maxmemory-policy. Check: CONFIG GET maxmemory-policy
  - Node size too small. Check: compare against the memory ceiling for the node type
```

The "possible causes" in a report are only hypotheses awaiting verification, each with a way to check it, never a stated conclusion. That only got settled after all the rewrites above.

### 8.4 How to verify it

- Offline tests cover rule boundaries: single-point series, stalled nodes, throttling retries, all-zero data, misconfiguration.
- Real-data regression: after each rule change, re-run against real US, EU and SG data, compare how the conclusions moved, and check where the movement came from. That's how the jump from 8 warnings to 11 got explained.
- Independent validation and review: the four passes of skill-design-standards plus an independent code review; unresolved items stay in the validation log rather than being dressed up as passes.

## Appendix: timeline

| Date | Phase | Key events |
|---|---|---|
| 10-21 | Finding the problem | Validated the grafana-ops docs; found dashboard coverage incomplete and sites mixed with environments |
| 10-22 | Synthesis and design | Found CloudWatch resolution being silently rewritten; decided to split exploration from monitoring; generated the monitoring skill |
| 10-22 | Validation and correction | Four passes over several rounds; code review found real bugs; severity switched to a forward-looking definition |
| 10-22 | Expansion | Completed data sources and instances for five sites, and confirmed resource isolation per site |
| 10-22 to 10-27 | Real-world testing | fed-svc Redis memory alert; reading code located Bull jobs never cleaned up; memory fell after the PR shipped |
| 10-28 | Real-world testing | Pod exploration used to judge uic-web-server memory config and handed to ops; traced horus-connector throttling through monitoring, logs and code; added Pod alert rules; clarified ownership |
| 10-29 | Inspection and tuning | Five-site inspection; found the "historical severe" false positive; switched to recent-state severity (fed-svc dropped from severe to notice); several rounds of review |
| 10-29 | Wrap-up | Committed the renamed docs fix (09:50) and the trend calculation fix (10:23) |
