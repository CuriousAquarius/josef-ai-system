#!/usr/bin/env node
let raw = '';
process.stdin.on('data', chunk => raw += chunk);
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw);
    const prompt = input.prompt || input.content || input.message || '';
    const patterns = [
      /sk-ant-[a-zA-Z0-9_-]{80,}/,
      /sk_live_[a-zA-Z0-9]{24,}/,
      /sk_test_[a-zA-Z0-9]{24,}/,
      /sk-[a-zA-Z0-9]{48,}/,
      /ghp_[a-zA-Z0-9]{36,}/,
      /AKIA[A-Z0-9]{16}/,
      /-----BEGIN (RSA |EC )?PRIVATE KEY-----/,
    ];
    for (const pattern of patterns) {
      if (pattern.test(prompt)) {
        process.stderr.write('[HOOK] Secret detected in prompt — blocked.\n');
        process.stderr.write('[HOOK] Remove the credential before submitting.\n');
        process.exit(2);
      }
    }
  } catch {}
  process.exit(0);
});
