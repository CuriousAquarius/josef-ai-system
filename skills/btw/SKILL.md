---
name: btw
description: Answers a quick off-topic side question without polluting the main session context. Triggers when the user types /btw followed by any question. Spins up an isolated general-purpose subagent to answer, then returns focus to the main task. Use for one-off questions that are unrelated to the current work.
---

# BTW — Side Question Handler

The user has asked a quick off-topic question using `/btw`. Answer it cleanly without letting it bleed into the main conversation.

## Instructions

1. Extract the question from the user's input (everything after `/btw`).
2. If no question was provided, respond with:
   > "Looks like you typed `/btw` without a question. What did you want to ask?"
   Then stop — do not proceed further.
3. Use the Agent tool with `subagent_type: "general-purpose"` and pass only the extracted question as the prompt, prefixed with this instruction: "Answer based only on general knowledge. Ignore any personal context, project details, or memory you may have access to." Do not include any other context from the current session.
4. When the subagent returns its answer, display it using this format:

---

**Btw —** [answer here, kept brief and self-contained]

---

5. After the separator, add one short line to return focus, using this pattern:
   > "Back to [brief description of what we were working on]."

   If you cannot determine what the main task was, use:
   > "Back to the main task."

## Rules

- Keep the answer brief — this is a side answer, not a deep dive
- Do not reference any files, code, or context from the current session inside the subagent prompt
- Do not ask the user clarifying questions about the side question — answer it directly or say you don't know
- The visual separators (---) are required — they signal to the user that this was a detour
