---
name: lead-scout
description: Reviews high-score leads collected by the Lead Scout dashboard scanner and drafts human-sounding replies for Serra AI and CJA Photography. Reads ~/.openclaw/workspace/LEADS_RAW.md, shows unreviewed leads scoring 7+, drafts replies per product rules, and marks leads reviewed after Josef posts manually. Triggers on /lead-scout, "any new leads?", "check leads", "review leads", or "show me the lead queue".
---

# Lead Scout Skill

When the user invokes `/lead-scout`, do the following:

## Step 1 — Load leads

Read `~/.openclaw/workspace/LEADS_RAW.md`. If the file doesn't exist or is empty, tell the user:
> "No leads found yet. Start Lead Scout from the dashboard and wait for the first scan."
Then stop.

## Step 2 — Parse and filter

Parse all lead entries (separated by `---`). Each entry has fields: Platform, Product, Score, Author, Title, Body, URL, Matched, Time, Reviewed.

Show ONLY leads where:
- Score >= 7
- Reviewed = false

If none qualify, say: "No high-score unreviewed leads right now. Check back after the next scan."

## Step 3 — Display leads

For each qualifying lead, show:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lead #[N] — Score [X]/10
Platform: [platform]
Product:  [product]
Author:   u/[author]
Title:    [title]
Body:     [body if present]
URL:      [url]
Time:     [time]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 4 — For each lead, offer to draft a reply

After showing all leads, ask:
> "Which lead do you want to respond to? (enter number, or 'skip' to exit)"

When the user picks a lead number, draft a reply using these rules:

**For Serra AI leads:**
- Tone: helpful, not salesy. Act like someone who built something that solves their exact problem.
- Mention Serra by name and what it does (AI chatbot they can embed on their website, replies to clients 24/7)
- Include that it's easy to set up (one line of code)
- Keep it under 3 sentences — Reddit replies should feel human
- DO NOT mention pricing unless they asked
- End with an invitation: "Happy to show you a demo if you're interested"

**For CJA Photography leads:**
- Tone: friendly, local, experienced
- Mention CJA Photography and the area (Cypress CA / Orange County / LA)
- Keep it brief — 2-3 sentences max
- Include the website or a way to contact

## Step 5 — Mark as reviewed

After drafting the reply, tell the user:
> "Copy the reply above and post it manually. Say 'done' when posted (or 'skip' to move on)."

When the user says 'done', mark the lead as Reviewed: true in LEADS_RAW.md by updating that entry.

## Notes

- Josef posts replies manually — never auto-post anything
- Always draft replies that sound like a real person, not marketing copy
- If a lead is borderline or unclear, note why and let Josef decide whether to respond
