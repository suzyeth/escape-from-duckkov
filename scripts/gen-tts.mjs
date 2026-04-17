#!/usr/bin/env node
// One-shot: read VOICE_MANIFEST, hit OpenAI tts-1, write .ogg into public/audio/bosses/
// Usage: OPENAI_API_KEY=sk-... node scripts/gen-tts.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { VOICE_MANIFEST } from '../fps-game/src/bosses/voiceBank.js';

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) { console.error('Missing OPENAI_API_KEY'); process.exit(1); }

const OUT_ROOT = path.resolve('fps-game/public/audio/bosses');

for (const [handle, cfg] of Object.entries(VOICE_MANIFEST)) {
  const outDir = path.join(OUT_ROOT, handle);
  await fs.mkdir(outDir, { recursive: true });
  for (const [key, text] of Object.entries(cfg.lines)) {
    const outPath = path.join(outDir, `${key}.ogg`);
    try { await fs.access(outPath); console.log(`skip (exists): ${handle}/${key}`); continue; } catch {}
    console.log(`gen: ${handle}/${key} — "${text}"`);
    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'tts-1', voice: cfg.voice, input: text, response_format: 'opus' }),
    });
    if (!res.ok) { console.error(`FAIL ${handle}/${key}: ${res.status} ${await res.text()}`); process.exit(1); }
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(outPath, buf);
  }
}
console.log('done');
