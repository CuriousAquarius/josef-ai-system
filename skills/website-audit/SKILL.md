---
name: website-audit
description: Audits a friend's or prospect's website using Google Lighthouse + visual analysis, then generates a scored pitch report with a rebuild price quote. Use when: given a URL and asked to analyze a site, generate a website report, assess a friend's site, or create a sales pitch for a web rebuild. Triggers on "audit this site", "analyze this URL", "how does this site score", "can I pitch a rebuild", "check this website", "look at this site", "what do you think of this site", "score this site", "review this website", "my friend's website is", "here's a URL", or /website-audit. Also triggers when user pastes a URL with no other context. Returns a scored report with Lighthouse metrics + Core Web Vitals + design/UX critique + competitor snapshot + recommended price quote.
---

# Website Audit Skill

## Purpose

Given a URL, run a full multi-angle audit and generate a pitch-ready report that:
1. Scores the site (Performance, Core Web Vitals, SEO, Accessibility, Design/UX)
2. Identifies visual/UX/content problems and names what competitors do better
3. Produces a professional pitch summary Josef can show the site owner
4. Suggests a rebuild price anchored to Serra Studio's actual rates

---

## Step 1 — Get the URL

If user hasn't provided a URL, ask: "What's the URL?"

---

## Step 2 — Run Lighthouse Audit

Run Lighthouse via the CLI (no MCP server needed). Run both commands in the background in parallel — each takes 30–60s:

```bash
npx lighthouse <url> --output=json --output-path=/tmp/lh-mobile.json --quiet --chrome-flags="--headless" --form-factor=mobile --screenEmulation.mobile
npx lighthouse <url> --output=json --output-path=/tmp/lh-desktop.json --quiet --chrome-flags="--headless" --preset=desktop
```

Then parse both reports:

```bash
python3 -c "
import json
for label, path in [('MOBILE','/tmp/lh-mobile.json'), ('DESKTOP','/tmp/lh-desktop.json')]:
    r = json.load(open(path))
    cats = r['categories']
    a = r['audits']
    print(f'--- {label} ---')
    for c in ['performance','seo','accessibility','best-practices']:
        print(f'{c}: {round(cats[c][\"score\"]*100)}')
    print('LCP:', a['largest-contentful-paint']['displayValue'])
    print('CLS:', a['cumulative-layout-shift']['displayValue'])
    print('INP:', a.get('interaction-to-next-paint', {}).get('displayValue', 'n/a (lab)'))
    fails = [(k, v['title']) for k, v in a.items() if v.get('score') is not None and v['score'] < 0.5 and v.get('scoreDisplayMode') in ('binary','numeric')]
    print('Top failing audits:', [t for _, t in fails[:8]])
"
```

**Fallback:** If npx/Chrome fails (no headless Chrome available, network error), note "Lighthouse unavailable" and continue with manual analysis only (Step 4) — score Design/UX and Content normally, mark Lighthouse-sourced categories as N/A.

Capture:
- Performance score (0–100) — use the mobile run as the primary score
- SEO score (0–100)
- Accessibility score (0–100)
- Best Practices score (0–100)
- LCP value (seconds), CLS value, INP value (ms) — from the mobile run
- Mobile performance score vs desktop performance score (compare the two runs)
- Key failing audits (top 3–5 per category)

Note: lab Lighthouse may report TBT instead of INP — if INP is unavailable, use TBT (< 200ms = 100 · 200–600ms = 60 · > 600ms = 20) in the CWV average instead.

---

## Step 3 — Research Design Direction (MANDATORY — do before writing the report)

**First:** Read `/Users/throttle/Documents/Obsidian Vault/Claude/design_research_industries.md` and identify the client's industry. Note the listed palettes, fonts, and layout direction — these inform how you critique the current site and what you promise in the report.

**Then:** If the industry isn't in that file, or you want to supplement it, search Awwwards, Behance, or Dribbble for current 2026 trends in that vertical.

Use findings to:
1. Benchmark the prospect's site against what's actually winning in their industry
2. Name specific patterns or industry standards in the report ("Most top-performing medspas in 2026 use clean white layouts with before/after galleries above the fold — yours doesn't")
3. Prepare 3 design direction options in case Josef wants a mockup

Do NOT skip this step. The design critique is meaningless without industry context.

---

## Step 4 — Fetch and Analyze the Page

Use WebFetch to load the page HTML and analyze:

**Design & UX check:**
- Is there a clear headline/value proposition above the fold?
- Is the CTA (call-to-action) obvious and above the fold?
- Does the mobile layout make sense?
- Are images optimized/compressed?
- Is the font readable and brand-consistent?
- Does the nav make sense?
- Does the site feel modern or dated compared to industry standards from Step 3?

**Content check:**
- Is the copy clear and customer-focused?
- Is contact info easy to find?
- Are there testimonials/social proof?
- Is there a blog or SEO content?

**Technical red flags:**
- HTTP (not HTTPS)?
- No meta description?
- Broken links or missing images?
- No favicon?
- Slow load time?

**Competitor snapshot:**
- Use WebSearch or WebFetch to find 1–2 competitors in the same city/industry
- Note: do they have a clear CTA above the fold? Mobile-friendly? Trust badges? Reviews visible?
- One line per competitor is enough, e.g.: "Your top two competitors both show Google review counts above the fold and have a booking button in the hero — yours doesn't."
- If no competitors are findable, skip this section gracefully.

---

## Step 5 — Score the Site

Calculate an overall score using weighted averages:

| Category         | Weight | Source                          |
|------------------|--------|---------------------------------|
| Performance      | 20%    | Lighthouse                      |
| Core Web Vitals  | 15%    | LCP / CLS / INP measured values |
| SEO              | 15%    | Lighthouse                      |
| Accessibility    | 10%    | Lighthouse                      |
| Best Practices   | 5%     | Lighthouse                      |
| Design/UX        | 20%    | Manual analysis (Step 4)        |
| Content          | 10%    | Manual analysis (Step 4)        |
| Mobile           | 5%     | Mobile vs desktop run gap       |

**Core Web Vitals scoring:**
- LCP: < 2.5s = 100 · 2.5–4s = 60 · > 4s = 20
- CLS: < 0.1 = 100 · 0.1–0.25 = 60 · > 0.25 = 20
- INP: < 200ms = 100 · 200–500ms = 60 · > 500ms = 20
- CWV score = average of the three

**Mobile penalty:** If mobile score is >20 points below desktop, deduct 5 points from final overall.

**Overall = weighted average**

Grade scale:
- 85–100: Good — minor polish needed
- 70–84: Fair — several notable gaps
- 55–69: Poor — significant problems
- < 55: Critical — needs a full rebuild

---

## Step 6 — Rebuild Price Quote

Serra Studio pricing:
- **Custom website:** $750 one-time (Josef builds and maintains it)
- **Full Stack Management:** $129/mo (hosting, updates, security, Serra AI chatbot included)
- **Design-only handoff:** $500–$800 (client handles their own hosting)

| Score | Situation | Recommended Pitch |
|-------|-----------|-------------------|
| < 55  | Full rebuild needed | $750 + $129/mo FSM — structural problems can't be patched |
| 55–69 | Significant problems | $750 + $129/mo FSM — faster to rebuild than fix |
| 70–84 | Refresh viable | $750 + $129/mo FSM (preferred), or $500–$800 design-only if they insist on self-hosting |
| 85+   | Site is decent | Be honest. Lead with $129/mo FSM for ongoing management + Serra AI chatbot — that's the recurring revenue entry point. Don't pitch a full rebuild they don't need. |

**Always lead with the $750 + $129/mo package.** The $129/mo is where recurring income lives. Never quote below $500 for any work.

---

## Step 7 — Output Format

Use this exact format. No intro. No closing remarks before the report.

```
🔍 Website Audit — [domain] · [date]

📊 Lighthouse Scores
  Performance:    XX/100
  SEO:            XX/100
  Accessibility:  XX/100
  Best Practices: XX/100
  Core Web Vitals: LCP X.Xs · CLS X.XX · INP XXXms
  Mobile vs Desktop: XX vs XX

✅ What's Working
  • [1–3 genuine strengths — fast load, good headline, trust badges, clear CTA, etc.]
  • Only list things that are actually good, even if minor

🎨 Design & UX Issues
  • [issue]
  • [issue]

✍️ Content
  • [issue or strength]
  • [issue or strength]

⚙️ Technical Issues
  • [issue]

🏆 Competitor Snapshot
  • [Competitor A name]: [1-line observation]
  • [Competitor B name]: [1-line observation]
  (Skip section entirely if competitors couldn't be found)

━━━━━━━━━━━━━━━━━━━━
Overall Score: XX/100 · [Grade]
Rebuild Quote: $750 + $129/mo (Full Stack Management)
Top 3 things to fix: [comma-separated]

---
📋 Pitch Summary (show this to the client):
"I looked at [domain] — [one genuine thing they got right].
The main things holding it back are: [top 3 in plain English].
I build custom sites for local [business type]s — $750 one-time, and for $129/mo I handle hosting, updates, and add an AI chatbot that answers questions and captures leads after hours.
Want me to put together a quick mockup so you can see what it could look like?"
```

---

## Step 8 — Mockup Offer

After delivering the report, ask:

> "Want me to design a mockup? I'll build a full HTML version — you could screenshot it and show it alongside this report as part of your pitch."

If yes: use the `frontend-design` skill to build a redesigned homepage based on:
- The design direction from Step 3 research (industry-specific, NOT Josef's other projects)
- The client's industry palette
- Fixing the top design/UX issues found in the audit

---

## Step 9 — Outreach Integration (Optional)

After delivering the report, ask:

> "Want me to add [business name] to your outreach queue? I'll add them to local_leads.csv so smart_outreach.py sends a personalized follow-up email when you have their contact info."

If yes:
1. Read `/Users/throttle/automation/local_leads.csv`
2. Generate a new 8-char hex ID
3. Append a new row:
   - ID: [generated]
   - Product: website
   - Business Type: [inferred from audit]
   - Business Name: [name or domain]
   - Website: [audited URL]
   - Status: new
   - Date Scraped: [today YYYY-MM-DD]
   - Notes: `Audit score: XX/100. Top issues: [top 3]`
   - Leave Email, Phone, Contact Name, Address blank — Josef fills these in
4. Write the updated CSV back
5. Confirm: "Added [Business Name] to local_leads.csv. Add their email when you have it and smart_outreach.py will pick them up."

Skip if: site scored 85+ with no clear pitch angle, or Josef says no.

---

## Edge Cases

- **Site is down:** Note it, stop, tell user the site isn't reachable.
- **Lighthouse fails:** Retry the npx command once. If it fails again, do manual analysis only — note "Lighthouse unavailable" and score based on manual review alone.
- **Paywalled content:** Audit what's publicly visible, note any login walls.
- **Very high score (85+):** Be honest — site is decent. Pitch $129/mo FSM + Serra AI chatbot as the entry point, not a full rebuild.
- **Competitors not found:** Skip the Competitor Snapshot section entirely — don't fabricate.
