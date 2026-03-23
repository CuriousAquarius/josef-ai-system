# Josef's AI Memory System — Architecture Overview

A 3-layer AI memory architecture running on Mac Mini M4 with two active agents: **Claude Code** and **Joy** (OpenClaw).

Built by a beginner photographer/videographer learning AI development from scratch.

---

## The 3-Layer System

### Layer 1 — Bootstrap (loads every session)
~25 files that Claude reads automatically at the start of every conversation.
Contains: standing rules, feedback from past sessions, active project notes, system config.

### Layer 2 — Obsidian Vault (loads on-demand)
~21 files stored in Obsidian for deep context.
Contains: full project roadmap, Serra documentation, design research, session summaries.

### Layer 3 — Joy's Workspace (shared agent memory)
~26 files shared with Joy, the OpenClaw agent.
Contains: Joy's identity, tools, active handoffs to Claude, Serra guide.

---

## Two Active Agents

| Agent | Platform | Role |
|-------|----------|------|
| **Claude** | Claude Code (Anthropic) | Main builder — writes code, plans features, manages memory |
| **Joy** | OpenClaw | Autonomous agent — monitors, researches, drafts, reports |

---

## Key Files in This Repo

| File | What it shows |
|------|--------------|
| `subagents.md` | Prompt templates for spawning specialized subagents |
| `feedback_scoring_formula.md` | Product scoring system: 5 factors × 1–5, 500+ = build |
| `feedback_design_colors.md` | Industry-specific color matching rules |
| `memory-diagram.pdf` | Full visual architecture diagram |

---

## What We're Building

**Serra AI** — a white-label AI chatbot for small businesses.
Live at: serrachat.com

Goal: $30/mo passive income through AI-powered products and automation.

---

*This is the public showcase repo. Follow along at github.com/CuriousAquarius*
