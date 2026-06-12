---
name: security-auditor
description: Security scanner for external files, scripts, and code before installation or execution. Use BEFORE reading, copying, or installing any file that came from outside this Mac — including skills, plugins, scripts, GitHub downloads, ZIP files, or anything from the internet. Returns a clear CLEAN or RISK verdict. Triggers when: user wants to install something new, download a file, copy code from the web, or before adding any external content to the system.
---

# Security Auditor

## When to Trigger

Before ANY of these actions:
- Copying a file from Downloads to a system folder
- Running a script downloaded from the internet
- Installing a plugin or skill from an external source
- Adding code from GitHub or any website
- Executing any `.sh`, `.py`, `.js`, or `.bash` file from outside this Mac

## Scan Process

For each file to audit:

### Step 1 — Read the file
Use the Read tool to load the full contents.

### Step 2 — Check for Red Flags

**Critical (RISK if found):**
- `curl ... | bash` or `wget ... | sh` — downloads and runs code without showing you
- `eval(` or `exec(` with non-literal arguments — runs hidden/dynamic code
- `base64 --decode | bash` — obfuscated command execution
- `rm -rf /` or `rm -rf ~` — deletes everything
- Network calls to unexpected URLs (not the service the file claims to be for)
- `pickle.load(` in Python — can execute arbitrary code
- `yaml.load(` without `safe_load` — can execute code in YAML files
- Hardcoded credentials, API keys, or passwords
- Reverse shell patterns: `nc -e`, `bash -i >& /dev/tcp/`, `socat ... exec`
- Credential exfiltration: reads `.env`, `~/.ssh/`, Keychain, or browser profiles AND makes a network call — this is the Axios RAT pattern (Mar 2026 incident)
- npm packages: `postinstall`/`preinstall`/`prepare` scripts in package.json that run anything beyond standard build steps — these execute automatically on `npm install`

**Suspicious (investigate further):**
- `subprocess.call(shell=True, ...)` — runs shell commands from Python
- Calls to external URLs not documented in the file's purpose
- Obfuscated variable names (`x1a`, `_0x`, etc.)
- Long base64-encoded strings
- `os.system(` with user-controlled input

**Binaries and archives:** Never Read compiled binaries (`.app`, `.bin`, Mach-O, `.pyc`) or run archives blind. For ZIPs: list contents first (`unzip -l`), extract to /tmp, scan the extracted text files. Unscannable binaries = SUSPICIOUS by default — verdict depends on the source's reputation, and say so explicitly.

**Safe patterns (don't flag these):**
- `yaml.safe_load(` — the safe version
- `pathlib.Path(...)` file operations
- `subprocess.run([...])` with a list (not `shell=True`)
- Standard library imports (os, sys, re, json, pathlib, etc.)

### Step 3 — Report

Format:
```
FILE: [filename]
STATUS: CLEAN / RISK / SUSPICIOUS

[If CLEAN]: No threats found. Safe to use.

[If RISK]:
⚠️ THREAT FOUND: [description]
Line [N]: [the exact problematic code]
Why it's dangerous: [plain English explanation]
Recommendation: Do NOT install this file.

[If SUSPICIOUS]:
⚠️ Needs review: [description]
Line [N]: [the code in question]
Why it's worth checking: [explanation]
Recommendation: Ask Claude for more context before proceeding.
```

## Final Verdict

After scanning all files in a batch:
- All CLEAN → "Safe to proceed."
- Any RISK → "Do NOT install. [list risks]"
- Any SUSPICIOUS → "Pausing for review. [list concerns]"

Never proceed with installation if any file returns RISK.

## Scope Note

This skill is for scanning **files before install/execution**. For whole-system threat scans ("is my machine clean", "audit the system"), run `bash ~/automation/vscode_audit.sh` + `nightly_security_scan.py` + check LaunchAgents instead — per CLAUDE.md.
