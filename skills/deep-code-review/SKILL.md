---
name: deep-code-review
description: Multi-agent code review system that dispatches 5 specialized subagents in parallel to analyze code from different angles and returns a scored report. Use when: reviewing any file, folder, or codebase for bugs, regressions, comment accuracy, CLAUDE.md compliance, and PR history. Triggers on "deep code review", "score this PR", "multi-agent review", "check this against CLAUDE.md", or /deep-code-review. (For quick diff reviews, the built-in /code-review skill is separate — this one is the 5-agent scored deep dive.) Returns a 0–100 score with per-agent breakdowns and priority fixes.
---

# Code Review Skill

## Step 1 — Clarify Scope

If the user hasn't specified what to review, ask:
- **What to review:** file path, folder, or describe the change
- **Is there a git repo?** (enables History + PR Comment agents)
- **Is there a CLAUDE.md?** (enables Rules agent)

If scope is clear from context, skip asking and proceed.

---

## Step 2 — Dispatch All 5 Agents in Parallel

Launch all applicable agents at once using the Agent tool (`subagent_type: general-purpose`).
Load exact role prompts from [agents.md](references/agents.md).

| Agent | Enabled when |
|-------|-------------|
| 🐛 Bug Hunter | Always |
| 📜 History Checker | Git repo exists |
| 💬 PR Comment Checker | Git repo with commits/PR history exists |
| 📝 Comment↔Code Matcher | Always |
| 📋 CLAUDE.md Rules Checker | CLAUDE.md file exists in project |

Skip any agent whose condition isn't met — note it as "skipped (no git repo)" etc.

---

## Step 3 — Aggregate & Score

Collect all agent results. Calculate total score using rubric in [scoring.md](references/scoring.md).

---

## Step 4 — Output

Use the exact format from [scoring.md](references/scoring.md). No intro. No closing remarks. Start directly with the review header.

---

## Edge Cases

- **No git repo:** Skip History + PR Comment agents. Note skipped in output.
- **No CLAUDE.md:** Skip Rules agent. Note skipped.
- **Single file review:** History agent only checks commits touching that file.
- **Large codebase:** Ask user to narrow scope to a specific folder or changed files only.
