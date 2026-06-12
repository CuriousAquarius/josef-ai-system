---
name: subagent-driven-development
description: Executes complex implementation plans by dispatching fresh subagents for each task with code review checkpoints between them. Use for multi-step features where parallel or sequential work is needed. Fresh context per task = higher quality output.
---

# Subagent-Driven Development

**Core principle:** Fresh subagent per task + review between tasks = high quality, fast iteration.

Use this skill when implementing a plan that has multiple distinct tasks — especially when some can run in parallel or when you want independent code reviews between steps.

## Two Execution Modes

### Sequential Execution
Use when tasks are interdependent and must happen in order.

**Process:**
1. Load the plan and create a numbered task list
2. Dispatch a fresh implementation subagent for Task 1
3. Review subagent's work with a code-reviewer subagent
4. Apply feedback, mark Task 1 complete
5. Repeat for each task in order
6. Final architectural review across all completed work

**Best for:** Database migrations, API integrations, features that build on each other

### Parallel Execution
Use for 3+ independent tasks across different subsystems that don't share state.

**Process:**
1. Load and critically review the plan
2. Execute tasks in batches (default: 3 at a time)
3. Report results and await feedback
4. Continue with next batch
5. Final review once all batches complete

**Best for:** Adding features to multiple unrelated files, UI + backend + tests for isolated components

## Critical Rules

- **Never skip code review between tasks**
- **Never proceed with unfixed Critical issues**
- **Never dispatch multiple implementation subagents simultaneously**
- If a subagent fails: dispatch a focused fix subagent with specific instructions — don't try to fix manually (avoids context pollution)

## When to Stop and Ask

Halt execution immediately if:
- Missing dependencies are discovered
- Tests fail in unexpected ways
- Instructions are unclear or contradictory
- Verification fails after a fix attempt

Ask for clarification rather than proceeding blindly.

## How to Trigger

```
Use subagent-driven development to implement [plan/feature].
```

```
Run this plan using parallel subagents: [list of 3+ independent tasks]
```

```
Sequential subagent execution for: [ordered task list]
```

## Example

**User**: "Implement these 4 features in Serra: (1) daily cap progress bar, (2) mute button for alerts, (3) session cleanup thread, (4) draggable job cards"

**Execution**: Tasks 1-3 touch different files → run in parallel batch. Task 4 is frontend only → separate batch. Code review after each batch. Final review at end.
