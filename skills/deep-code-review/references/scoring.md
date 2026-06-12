# Scoring Rubric & Output Format

## Score Weights

| Agent | Max | Weight |
|-------|-----|--------|
| 🐛 Bug Hunter | 25 | Highest — bugs are the most critical |
| 📋 CLAUDE.md Rules | 25 | High — project rules exist for safety/consistency |
| 📜 History | 20 | Medium — regression risk matters |
| 💬 PR Comments | 15 | Medium — deferred issues compound |
| 📝 Comment↔Code | 15 | Medium — lying comments cause future bugs |
| **Total** | **100** | |

## Score Interpretation

| Score | Grade | Meaning |
|-------|-------|---------|
| 90–100 | ✅ Excellent | Ship it |
| 75–89 | 🟡 Good | Minor fixes recommended before merge |
| 60–74 | 🟠 Fair | Several issues — fix before shipping |
| 40–59 | 🔴 Poor | Real problems — needs work |
| < 40 | ⛔ Critical | Do not ship — significant defects |

## Priority Fix Classification

After aggregating scores, identify the **top 2–3 most important fixes**:
- **P0** — bugs that will crash or corrupt data
- **P1** — rule violations or regressions that will cause problems soon
- **P2** — comment inaccuracies or deferred items that should be cleaned up

Only list P0s and P1s in the Priority Fixes line. P2s are visible in agent sections.

---

## Output Format Template

Use this exact format. No intro sentence. No closing remarks. Start with the header.

```
🔍 Code Review — [filename or scope] · [date]

🐛 Bug Hunter (X/25)
  • [finding]
  • [finding]

📜 History (X/20)
  • [finding]

💬 PR Comments (X/15)
  • [finding]

📝 Comment↔Code (X/15)
  • [finding]

📋 CLAUDE.md Rules (X/25)
  • [finding]

━━━━━━━━━━━━━━━━━━━━
🏆 Score: XX/100 · [Grade label]
⚠️  Priority fixes: [P0/P1 items only, comma separated]
```

## When an Agent is Skipped

Replace that agent's block with one line:
```
📜 History — skipped (no git repo)
```

## When an Agent Finds Nothing

Replace findings with one line:
```
🐛 Bug Hunter (25/25) — ✅ nothing found
```

## Minimum Output Example

If all agents find nothing and all are enabled:
```
🔍 Code Review — chatbot_server.py · March 20, 2026

🐛 Bug Hunter (25/25) — ✅ nothing found
📜 History (20/20) — ✅ clean
💬 PR Comments (15/15) — ✅ nothing deferred
📝 Comment↔Code (15/15) — ✅ all accurate
📋 CLAUDE.md Rules (25/25) — ✅ fully compliant

━━━━━━━━━━━━━━━━━━━━
🏆 Score: 100/100 · ✅ Excellent
```
