---
name: quote-manager
description: Manages Josef's quote PDF system. Lists all client quote templates, generates PDFs, and tracks outputs. All quotes live in ~/automation/quotes/. Catalog is at ~/automation/quotes/catalog.json. Use when Josef says /quote-manager, asks about quotes, wants to generate a quote, or asks which template to use for a client.
---

# Quote Manager

Josef has multiple quote generator scripts for different clients. This skill is the central memory for that system.

## Catalog Location
`/Users/throttle/automation/quotes/catalog.json`

Always read this file first before taking any action. It contains all client entries, their scripts, pricing, and the path to the last generated PDF.

---

## Actions

### list
Show all clients in a clean table with: Name | Template Style | Pricing | Last Output

Read catalog.json and format the output as a markdown table. If `last_output` is empty, show "None yet".

### generate [client]
1. Read catalog.json and find the matching client by `slug` or `name` (fuzzy match is fine).
2. Check `cli_args`:
   - **false** (Rokid): Run `run_cmd` as-is. After it runs, move the file from `~/Desktop/rokid_philippines_quote_fixed.pdf` to `~/automation/quotes/` and update `last_output` in catalog.json.
   - **true** (Avi, CJA): Ask Josef for the missing details (client name, items, total). Then construct the command from `run_cmd`, replacing `[NAME]`, `[OCCASION]`, `[slug]` with the real values. Save the PDF to `~/automation/quotes/`. Update `last_output` in catalog.json.
3. After generating, confirm the file path and offer to open it.

### open [client]
Read `last_output` for that client from catalog.json. Run `open [path]` to open the PDF. If `last_output` is empty, say so and offer to generate one.

### add [client]
Guide Josef through adding a new client entry to catalog.json:
1. Ask: client name, pricing, and any notes.
2. Use `~/automation/serra_quote.py` as the base script for any new template — copy and adapt it.
3. Write the new entry to catalog.json.
4. Confirm it was added and show the updated list.

---

## Rules

- **Never modify any .py script** — catalog.json is the only file this skill writes to.
- All PDF outputs go to `~/automation/quotes/` — never Desktop, never /tmp.
- After any `generate`, always update `last_output` in catalog.json with the new file path.

### Default House Style (apply to ALL quotes and documents)
- **Colors: Navy #1B2A4A + Gold #C9A227** — this is the default. Never change colors unless Josef explicitly says to.
- **Background: LGRAY (#F8F8F8)** — locked. Do not change.
- **Border: BORD (#DDDDDD), thickness 0.5** — locked. Do not change.
- **Padding: LEFTPADDING 14, TOPPADDING/BOTTOMPADDING as set** — locked. Do not change.
- **Spacing: Spacer(1, 6) between sections** — locked. Do not change.
- **SpacePusher logic** — locked. Do not remove or modify.

These are only changed if Josef says "change the design." Content changes (prices, names, bullet points) never touch these values.
