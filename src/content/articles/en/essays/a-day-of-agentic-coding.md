---
title: "One engineer's day of Agentic Coding"
subtitle: "When AI stops being a tool you open and becomes a colleague that keeps running"
description: "From the 09:00 automatic morning brief to the last patrol at 18:00: how one engineer folds AI into tickets, debugging, development, retrospectives and tool improvement, so time stops queuing and starts overlapping."
readingTime: 19
tags: ["Agentic Coding", "AI workflow", "engineering practice"]
date: "2026-06-26"
metrics:
  - value: "09:00 → 18:00"
    label: ""
  - value: "5"
    label: "layers of collaboration"
  - value: "1"
    label: "real workday"
panel:
  time: "09—18"
  label: "A DAY OF<br />AGENTIC CODING"
  meta: "ALLEN SHAO / 2026"
---

> AI used to be a tool I opened to use. Now it's a colleague that keeps running inside my workflow.

The `/daily-brief`, `/case-brief`, `/debug` and friends in this post are shortcut commands I built myself. The names don't matter. What matters is who executes and who judges at each step.

## 09:00 · The morning brief finishes while I fetch a glass of water

09:00, I come back to my desk with a cup. The brief on screen has already run.

It started before I sat down: scan email, scan team messages, scan the ticket system, walk through everything that happened in the past dozen or so hours. What I see isn't a pile of unread items. It's a table that's already been sorted:

| Category | Count | Verdict |
| --- | --- | --- |
| Emails needing a reply | 0 | No fire to put out, straight into build mode |
| Needs attention | 1 | An app registration auto-disables on July 8 |
| Tickets | 1 | Customer left a comment on #107487, waiting on my answer |
| Security | 1 | Static scan flagged one Critical: hardcoded credential |
| Noise | 9 | DMARC alerts, automated field changes, collapsed |

The most valuable thing about this table isn't that it lists the messages. It's that it does the first round of triage for me: what needs handling now, what I only need to know, what I don't need to look at at all.

There's nothing mysterious behind it. I just pinned down a task that fires once a day at 9. The machine boots, `/daily-brief` runs itself. Which sources it reads, what rules it sorts by, what counts as noise — all of that lives in a config file. The first 20 minutes after boot used to go into paging through every system. Now those 20 minutes collapse into one read, and it starts from judgement, not from raw information.

**The value of automation isn't that I know more. It's that I decide what to do first, faster.**

The first version was bad, of course. It treated automated notifications as customer messages, and flagged a routine announcement as needing a reply. I tuned the triage rules one at a time: which senders go on the allowlist, which keywords get collapsed, which ticket state changes are worth waking me. There's no set-and-forget here, only continuous tuning.

But the direction is right: **turn information into judgement first, then put the human into the work.**

## 09:25 · Two cases launched at once

Two items in the brief can't be resolved without digging in.

One is customer ticket #107487, a config check. The other is #104828, a deeper problem that probably needs code reading. My old approach was serial: finish the first — query the database, read the logs, write the reply — then start the second. Just switching context burned a lot of time.

This time I dispatched both at once.

Each `/case-brief` runs the same set of actions: pull the ticket history, identify the customer and product line, go query the database, the logs and the code on its own, stitch the scattered pieces into one analysis doc in Chinese, and end with a few candidate directions. It isn't "summarise the ticket". It prepares the context for me first.

Both tasks run in parallel. I don't babysit either one.

That's the biggest difference between Agentic Coding and "chatting with AI".

Chat is one message out, one message back: I ask what an error means, it answers; I ask again, it answers again. The initiative stays with me the whole time. The AI is just a faster search engine. Agentic is something else: I hand over a complete piece of work, define the goal, the boundaries and the acceptance criteria, then walk away. It decides what to check first and what next, fills the gaps on its own when information is missing, and hands back a result I can review.

To use an analogy: the first is asking a colleague who knows the domain. The second is handing an intern a complete task brief. The second demands that I express myself more clearly, and that I review more seriously. What it buys me is the ability to do something else while it runs.

## 09:50 · Waiting isn't dead time

<figure>
  <img src="/blog/images/agentic-concurrency.svg" alt="Concurrency swimlane chart from 09:00 to 11:00: I'm talking, triaging and reviewing while two ticket analyses and one debug run in the background" loading="lazy" />
  <figcaption>From 09:25 to 09:50 all three lanes are full at once: I'm talking to people while two case analyses run in the background. The amber area is several things running at the same moment.</figcaption>
</figure>

In this chart, blue is AI working, green is me working, grey is me reading or waiting.

Slice vertically through the 25 minutes from 09:25 to 09:50 and all three lanes are filled: two case analyses running, me talking to the customer and the team. That's where "one person doing the work of N" actually comes from — not because I literally split into three people, but because I overlapped time that used to be spent waiting on itself.

So what was I actually doing in those 25 minutes?

The things only a human can do: confirming what the customer actually wants solved, judging which item is more urgent, aligning priorities with the team, deciding what can go undone today. They share one property — there's no standard answer. You have to read the room, read the org, read what the other side isn't saying. AI can hand me material. It can't make the call for me.

So concurrency isn't free. It moves the bottleneck from "I can only do one thing at a time" to "I can only review one thing at a time". Once AI produces faster than I can judge, my attention becomes the scarce resource. That's why I care more and more about task boundaries: the clearer the boundary, the faster I review, and the more concurrency actually pays.

## 10:15 · Before AI fixes a bug, make it reproduce the bug

A little after 10, someone @s me in the team channel: DLP template loading on one site is failing, three endpoints all returning 404.

I throw the symptom, the endpoint paths and the recent changes at `/debug`, then switch away to something else.

Note that I didn't sit there waiting for it to "think". What I gave it was a specific task: reproduce, then locate, then fix, then prove the fix. `/debug` has a hardcoded internal constraint — **write a test that reproduces the bug before touching the code.** No failing test, no right to propose a fix.

That constraint looks small. In practice it decides the quality of AI debugging.

Undisciplined AI debugging turns into a random patch machine: it reads the code once, finds something that looks suspicious, changes it, and tells you it should be fixed now. Sometimes the patch lands. You don't know why it works, and you don't know what else it broke. With "reproduce first" as a gate, it has to prove it actually understood the problem: which input triggers it, which layer the error happens in, whether the same test goes green after the fix.

**Trust doesn't come from sounding right. It comes from being able to prove it.**

When I got back to my desk, what I had wasn't a pile of guesses but a diagnosis with evidence attached: reproduction path, root cause location, the change, test results. My job is still review — checking whether it worked around the real boundary condition, whether it edited the test to make it pass — but at least I'm not starting from zero.

## 11:50 · I go to lunch, it keeps writing

Close to lunch I had a development task on my hands. After sizing it up, I judged it clearly bounded and low risk, fit to hand off.

Before leaving I spent five minutes writing the brief:

- **Goal**: what behaviour changes once it's done;
- **Scope**: which files, which layer, and what not to touch;
- **Acceptance**: which tests must pass, how edge cases are handled;
- **Constraints**: don't change public interfaces, don't add dependencies, stop and ask me when something is unclear.

Then I got up and went to lunch.

For those 40 minutes the AI reads code, edits the implementation and runs tests in the background. By the time I'm back the diff is sitting there with test results attached. The first thing I do is review, not write from scratch.

With the earlier concurrency I was still at my desk. This time it's different — **I left, and output didn't stop with me.**

For an individual that means lunch, commute, meetings — the hours away from the desk — no longer equal zero output by default. For a team it means one person's output starts to decouple from their online hours. That's a big shift, and it has a precondition: the task has to be defined clearly.

I've run the counter-example. Once I tossed off a single line — "optimise this module" — and it rewrote a large swath of it, in a direction I didn't want. That wasn't an AI problem. It was mine: I never said whether "optimise" meant performance, readability, or less duplication. **A vague task doesn't get clearer because you hand it to an AI. It just defers the rework to the moment you notice.**

## 14:00 · I'm out, the process keeps running

Two in the afternoon, I go into a meeting.

Meanwhile `case-watch` fires on schedule. I don't invoke it by hand. It's a timed loop that runs every two hours on workdays. During the meeting the 15:00 round runs as usual, with no involvement from me.

It does three things:

1. Scan for tickets waiting on a response with no owner yet, grouped by team;
2. Write tickets stalled more than 3 days and tickets whose status changed onto the alert board;
3. Push the result into the team channel — if I'm eating or in a meeting, my phone buzzes anyway.

This is the highest form of AI embedded in a process. The morning brief, the case analysis, the debug — all of those still need me to start them. `case-watch` doesn't even need that. It runs on time and comes to find me.

But a scheduled job isn't "set a cron and you're done". For it to survive inside a real team you have to handle at least a few things:

- **Idempotency and dedup**: the same item can't ping every two hours, or people learn to ignore it fast;
- **Least privilege**: patrol is read-only by default; any write needs an allowlist and an audit trail;
- **Noise budget**: past a few items per push, nobody reads it. Better to under-report than to false-alarm;
- **Versioned rules**: the rule file lives in git, so what changed and why can always be rolled back.

The genuinely hard part of automation was never hiding the button. It's **writing the judgement rules down and maintaining them.**

## 15:00 · From doing the work to running it

Back from the meeting, I don't need to reopen the ticket system and page through it. The alert board is the battle map, already drawn.

One glance: no new fires, but 6 items stuck for more than 3 days, 1 status change, 0 unassigned. Chase what needs chasing, reassign what needs reassigning.

So I switch from doing the work myself to running it.

The two modes need completely different attention. Doing: I'm on the details of one problem. Running: I'm on the flow of the whole board — which item is waiting on the customer, which is waiting on us, which is effectively dead but nobody closed it. Once AI automates the team-level inventory too, my first minute back goes into allocation decisions off an accurate list, instead of half an hour rebuilding context.

What the person watching team progress fears most is a case stuck in a corner that nobody noticed. Scheduled patrol makes that kind of sinking very hard to happen.

## 15:30 · A security email becomes a PR

<figure>
  <img src="/blog/images/agentic-security-fix.svg" alt="Closed loop from a security alert in the morning brief to a PR: the brief surfaces the Critical, debug analyses the root cause, I review, dev-init opens a dev ticket, AI fixes, dev-complete raises the PR" loading="lazy" />
  <figcaption>Only one cell in the whole chain is green: my review. Everything else is pushed forward by the brief, debug and the dev flow.</figcaption>
</figure>

The Critical the morning brief pulled out was a hardcoded credential.

At 15:30 I pick it up: `/debug` analyses the root cause, confirms the credential is written into the code; I review the conclusion and confirm the direction of the fix; `/dev-init` opens a dev ticket and a branch; the AI moves the credential into secret management; `/dev-complete` runs the tests and opens the PR.

From a security alert that was nearly missed to a PR with a ticket, a branch and a review in progress — I did no hauling in between.

But a few things I didn't hand to AI, and shouldn't:

- **Whether this fix can ship** is my call;
- **Whether the credential needs rotating, whether git history needs scrubbing** follows the security process;
- **Whether the scan rule needs tightening** goes back to the team's standards for discussion.

Moving the credential into secrets is step one. A real security fix also handles the time window in which it was already exposed, plaintext that may still be sitting in logs, and a lateral sweep for the same pattern elsewhere. AI can speed those actions up. It can't take on the responsibility of confirming it's actually safe.

That's where I stay wary of the "AI colleague" metaphor: it can execute, it can analyse, it can propose. It doesn't carry consequences. **Responsibility stays with the human, so the key checkpoints still need a human.**

## 16:30 · Cases launched in the morning close in the afternoon

The two cases I ran concurrently in the morning start closing in the afternoon.

#104828's root cause is a code bug. The morning's analysis doc had already located it to a specific module. In the afternoon I opened a separate dev ticket, #4304 — distinct from the morning's security ticket #4303 — then went fix, PR, merge, and finally back to the customer ticket to close it.

Throughout, I only judged at the close step: is the customer's problem actually solved? Does the reply say it clearly? Is there a temporary workaround left behind?

The morning's analysis doc became the afternoon's dev brief directly. I didn't reread the ticket, didn't restate the background. **Context that doesn't get dropped at the handoff is the most underrated payoff of an agentic workflow.**

Nor does "closed loop" end at merge. For me a customer ticket's loop has at least four parts: the customer got a reply, the code got fixed, the ticket got closed, the lesson got kept. Miss one and it comes back in another form next time.

## 17:00 · Retrospective: the AI is also learning how to work with me

Evening is retrospective time. Three commands I use:

- `/session-report`: today's bill — which command burned the most tokens, which subagent got called and produced nothing;
- `/weekly-summary`: the weekly report, auto-aggregated across tickets, dev tickets and projects. It pulls the data; I only add the reflection;
- `/learn` → `/remember`: pull the lessons worth keeping out of today's sessions and write them into long-term memory.

You can't tell whether it's working by feel. `/session-report`'s real value is that it lays out the gap between "I thought this was useful" and "this actually produced something": some commands I use every day are just idling; some subagents I assumed were parallel were only burning a second copy of tokens.

Between `/learn` and `/remember` I deliberately keep a manual filter. The AI can propose that today's lesson is worth recording. Whether it lands on disk is my call. The reason is simple: **memory pollution is worse than forgetting.** Once a wrong preference gets written into long-term memory, every future session runs with it.

This collaboration compounds, but compounding needs all four moves: record, filter, retrieve, retire. Record without retiring and memory becomes a dump. Retrieve without updating and the experience goes stale.

## 17:40 · Fixing a blind spot the same night

During the retrospective I noticed `case-watch` has a blind spot.

It only alerts on stalled more than 3 days and status changed, but tickets assigned to me personally, with a new customer comment, waiting on my response, never get pulled out separately. This morning's customer comment was caught by the daily brief first, not by the patrol — which means the patrol policy misses one of the most important signals.

So I edited its rule file on the spot:

```text
edit loops/case-watch/rule.md
→ git push
```

`rule.md` is the single source of truth for this loop. Change it, push, and the next scheduled patrol picks it up automatically. Nothing to restart.

This is the last link in the day's loop, and the one I think matters most: **an engineer isn't just a user of tools, but an improver of them.**

A pain point hit today gets hardened into a smarter automation tonight. That's worth far more than a few more lines of code, because what it changes is how I work tomorrow, the day after, and next month.

## 17:55 · Handing what's unfinished to tomorrow

The last `/daily-brief` of the day, the EOD version, is for gap-checking.

It surfaces one message I never got to in the morning: I need to confirm with the test owner whether the E2E test account has changed. But they're out today, so I can't close it now.

Under the old setup, this kind of "can't do it today, wait for tomorrow" item is exactly what you forget by morning. Now I drop it straight into tomorrow's TODO, and the 9am brief pushes it back in front of me.

The brief and the EOD bookend the day into a loop: in the morning AI tells me what today should be; at night it hands the unfinished work safely to tomorrow.

**Things that span days don't live in my head anymore. The system backstops them.**

There's a downside, of course: a TODO list that only takes in becomes another form of debt. So once a week I go through the entries that never close — split them, delete them, or admit they don't matter.

## 18:00 · I leave, it stays

18:00, I shut down and walk out. `case-watch` runs one last time on its own.

I'm gone, and it's still watching for me.

But I don't want to describe this as an AI working 7×24 without pause. In a real system, scheduled jobs need quiet hours, alerts need an escalation path, and an anomaly at midnight still has to wake a person in the end. Automation isn't about keeping a human always online. It's about keeping a human online only when they're actually needed.

## Where AI helped me across five layers

| Layer | What it actually does | My role |
| --- | --- | --- |
| Organising information · secretary | The brief gathers email, messages and tickets, tells me what to look at; the EOD hands unclosed items to tomorrow | Set priority |
| Taking over repetitive work · assistant engineer | Pull tickets, check multi-region config, open tickets, run standard flows, write docs back | Define the standard |
| Working hard problems with me · pair engineer | Reproduce, locate, verify, with discipline; on complex cases I point at leads and it digs | Point the direction, accept the result |
| Running the flow for me · executor that takes over | debug → dev-init opens ticket and branch → fix → dev-complete raises the PR | Review |
| Watching when I'm not there · on-duty operator | Scheduled patrol, alerts on stalls and status changes, no initiation from me | Set the rules, handle exceptions |

These five layers aren't parallel. They form a progression: from "help me sort", to "do it for me", to "do it without being told". The further along, the more execution I hand over — and the sharper the judgement I keep has to be.

## The measure: how much unnecessary work it took off my hands

Across a whole day, I never once "stopped what I was doing to go use AI".

AI is embedded in the flow: it runs while I work, keeps running while I'm in a meeting, keeps running while I eat. I'm not finishing A before starting B. I'm making A and B overlap in time.

So the measure for this workflow isn't how many lines of code it wrote for me. It's this:

> How much of the work that never needed a human did it remove — and how much human attention did that give back to the steps that actually require judgement.

By that measure, the most valuable thing in this day wasn't the PR, and wasn't the analysis doc. It was a few very small things: not paging through five systems at boot; not watching a progress bar while waiting; not rebuilding context after a meeting; not holding "who do I chase tomorrow" in my head at night.

Each one is small on its own. Together they add up to a whole day.

## Appendix: five rules I still hold

If you want to spend a day like this too, these five are what I still keep after walking into the potholes:

1. **Process first, agent second.** If you haven't thought the steps through yourself, handing the job to AI only scales the mess.
2. **Write the task boundary down.** Goal, scope, acceptance, constraints. All four, every time.
3. **Make the test fail first.** A fix without a reproduction doesn't earn trust.
4. **Every output must be reviewable.** Not how much it wrote, but whether the evidence is complete.
5. **Change a rule every week.** If the tools don't evolve, the workflow goes stale fast.

On this day, AI didn't live my day for me. It just took a lot of unnecessary work off my hands and put the attention I saved back where I'm actually needed.
