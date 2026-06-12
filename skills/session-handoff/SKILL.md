---
name: session-handoff
description: Manages session continuity for throttle085@gmail.com. Use when: (1) the conversation is getting long and a session transition warning is needed, (2) at the END of any session to auto-write the session summary, (3) at the START of a session when user says "load session" or similar. Triggers on: session wrap-up, long conversations, "start fresh", "new session", "load session", or proactively when context is filling up.
---

# Session Handoff

## At Session Start

If user says "load session" or starts a new session, follow the MEMORY.md bootstrap order:
1. Run `python3 ~/automation/fantasy5.py` — output ONLY the numbers line first, no greeting before it
2. Read `/Users/throttle/Documents/Obsidian Vault/Claude/session_summary.md` and `roadmap.md`
3. Read `~/.openclaw/workspace/CLAUDE_NOTES.md` — reply to Joy's handoffs if needed
4. Read last 10 lines of `~/automation/agent_chat.jsonl` — skip silently if empty
5. Summarize in 3-5 bullet points: what was done, decisions made, next step

## Warning: Context Getting Full

When the conversation is getting very long, proactively say:
> "Hey — this session is getting long. Before we continue, let me save our progress and we can start fresh. Give me a moment."

Then immediately write the session summary (see below) before the session ends.

## At Session End

Auto-write `/Users/throttle/Documents/Obsidian Vault/Claude/session_summary.md` with this exact format:

```
# Session Summary

*Auto-written by Claude. Read this at the start of the next session.*

---

## Last Session: [Date]

### What We Did
[3-7 bullet points of what was actually accomplished]

### Decisions Made
[Bullet list of decisions — not actions, but choices that were locked in]

### What's Next (in order)
[Numbered list — specific, actionable next steps]

### Open Questions
[Anything unresolved that needs to be answered]

---
*Next session: say "load session" and Claude will read this file.*
```

The summary goes to Obsidian ONLY — the memory folder is bootstrap-only and nothing new grows there.

## Git Commit — Only If Memory Files Changed

session_summary.md lives in Obsidian, not the memory repo — writing it does NOT require a commit. Only if files inside `~/.claude/projects/-Users-throttle/memory/` actually changed this session (check `git status`), run:

```bash
cd ~/.claude/projects/-Users-throttle/memory && git add . && git commit -m "Session: [Date] — [one line summary of what was done]" && git push
```

This keeps the private repo (`josef-memory`) in sync with version history.

## Key Rules

- User never summarizes anything — Claude does it automatically
- Always overwrite session_summary.md (don't append — keep only the latest)
- Be specific in "What's Next" — vague next steps are useless to a beginner
- If session is cut short, write a partial summary — something is better than nothing
