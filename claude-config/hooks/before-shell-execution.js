#!/usr/bin/env node
let raw = '';
process.stdin.on('data', chunk => raw += chunk);
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw);
    const command = (input.tool_input && input.tool_input.command) || '';
    const segments = command.split(/\s*(?:&&|\|\||[;|\n])\s*/);
    for (const seg of segments) {
      const firstToken = seg.trim().split(/\s+/)[0] || '';
      if (firstToken !== 'git' && !firstToken.endsWith('/git')) continue;
      if (/--no-verify/.test(seg)) {
        process.stderr.write('[HOOK] Blocked: git commit --no-verify is not allowed.\n');
        process.stderr.write('[HOOK] Fix the pre-commit hook failure instead of bypassing it.\n');
        process.exit(2);
      }
      if (/push/.test(seg) && /--force(?!-with-lease)/.test(seg) && /(main|master)/.test(seg)) {
        process.stderr.write('[HOOK] Blocked: force push to main/master is not allowed.\n');
        process.exit(2);
      }
    }
  } catch {}
  process.exit(0);
});
