/**
 * 焙 HOU 漫画 6コマを nano-banana-pro-preview で生成する
 *
 * Usage: node scripts/generate-manga.mjs
 *
 * 入力:  lineclaude/agent/.env.shared の GEMINI_API_KEY
 * 出力:  public/manga/panel-01.png 〜 panel-06.png (1024x1024目安)
 *
 * 生成失敗時は gemini-2.5-flash-image にカスケードフォールバック。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'manga');
fs.mkdirSync(OUT_DIR, { recursive: true });

// 環境変数読込 — 複数の候補 env を試す (leak報告で無効化された key は飛ばす)
const ENV_CANDIDATES = [
  path.resolve(ROOT, '.env.local'),
  path.resolve(ROOT, '..', 'roblox', '.env'),
  path.resolve(ROOT, '..', 'kyoutsu-roblox', '.env'),
  path.resolve(ROOT, '..', 'lineclaude', 'agent', '.env.shared'),
];
function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  const txt = fs.readFileSync(file, 'utf8');
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  }
}
for (const f of ENV_CANDIDATES) loadEnv(f);

const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) {
  console.error('GEMINI_API_KEY required (checked', LINECLAUDE_ENV, ')');
  process.exit(1);
}

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const MODEL_CASCADE = ['nano-banana-pro-preview', 'gemini-2.5-flash-image'];

const STYLE_TOKEN = `shojo manga style, Japanese manga panel composition, warm sepia and amber color palette with matcha green accent, ink outlines with screentone shading, hopeful atmosphere, consistent character design across panels`;

const CHAR_MAIN = `the main character "Genmaicha-chan": a Japanese woman in her early 20s, shoulder-length dark brown hair with a small brown ribbon, gentle eyes with light brown iris, warm smile, slender build, wearing a beige work apron over a cream colored shirt, small stud earrings`;
const CHAR_MOTHER = `the mother: a Japanese woman in her mid 50s, short dark hair with slight grey streaks, kind expression, apron over a plain blouse, work trousers, practical build, hands showing years of craft work`;
const CHAR_CONSULTANT = `the chamber-of-commerce consultant: a Japanese man in his late 40s, neat short hair, thin-framed glasses, navy business suit without tie, calm professional expression`;

const PANELS = [
  {
    file: 'panel-01.png',
    title: '朝の工場',
    body: `Panel 1 of 6: pre-dawn scene inside a small traditional Japanese roasting factory in Miyagi. Wooden beams, warm orange glow from a large roasting drum. ${CHAR_MAIN}. She is gently lifting a wooden scoop of freshly roasted brown rice grains, looking down at the rice with a calm satisfied expression. Soft morning light through an old window, breath slightly visible, wisps of steam rising. Warm sepia and amber palette. High contrast ink outlines, screentone shading. Single square manga panel with thin black border. No foreign text. No watermark.`,
  },
  {
    file: 'panel-02.png',
    title: '受け継がれた工場',
    body: `Panel 2 of 6: close-up of an old black-and-white framed family photo hanging on a wooden wall of a small Japanese factory. The photo shows an elderly couple (grandfather and grandmother in their 70s) standing in front of a small traditional Japanese rice-roasting factory. Beside the framed photo on the wall: a calendar and a small cup of steaming green genmaicha tea with visible roasted brown rice grains. Warm beige background, gentle nostalgic mood. Ink outlines with light screentone. Single square manga panel with thin black border. No foreign text. No watermark.`,
  },
  {
    file: 'panel-03.png',
    title: 'お母さんとの会話',
    body: `Panel 3 of 6: medium shot of two women standing side-by-side in front of a large cylindrical roasting drum. On the right: ${CHAR_MOTHER}, wearing a calm knowing smile. On the left: ${CHAR_MAIN}, looking slightly surprised and embarrassed. Warm amber lighting, gentle steam rising between them, visible rice grains on a metal tray in the foreground. Empty Japanese-style oval speech bubbles (no text inside). Screentone shading. Single square manga panel with thin black border. No foreign text. No watermark.`,
  },
  {
    file: 'panel-04.png',
    title: '海外需要の発見',
    body: `Panel 4 of 6: close-up over-the-shoulder composition of ${CHAR_MAIN} sitting at a small wooden cafe table, looking intently at a laptop screen. The laptop screen shows English news articles with the word "GENMAICHA" shown in large bold letters. In her right hand she holds a small ceramic cup of brewed genmaicha tea with steam rising. A notebook and a pen rest beside the laptop. Cozy cafe setting, warm golden-hour light through a window. Manga ink outlines, screentone. Single square manga panel with thin black border. Only the word "GENMAICHA" is allowed as visible text. No other text. No watermark.`,
  },
  {
    file: 'panel-05.png',
    title: '商工会議所での相談',
    body: `Panel 5 of 6: medium shot inside a Japanese chamber-of-commerce meeting room. ${CHAR_MAIN} sits on the left in a simple office outfit (cream blouse, dark skirt), attentive posture. Across the white table sits ${CHAR_CONSULTANT}, gesturing gently with one hand while the other holds a document. Papers and a laptop on the table between them. Soft fluorescent overhead lighting, a daytime city view through vertical blinds on the right. Empty Japanese-style speech bubbles (no text inside). Screentone shading. Single square manga panel with thin black border. No foreign text. No watermark.`,
  },
  {
    file: 'panel-06.png',
    title: 'ブランド立ち上げ',
    body: `Panel 6 of 6, final hopeful panel: close-up of ${CHAR_MAIN} smiling softly and confidently, holding in both hands a stylish cylindrical kraft-paper tea package. The package has a large minimalist kanji character "焙" centered on the label and beneath it small Latin letters "HOU". A small matcha-green ribbon is tied around the package. Warm sunlight streams from the upper-left. Soft-focus view of the roasting factory interior in the background. Warm amber and cream color palette with a single matcha green accent. Ink outlines, screentone shading, hopeful final-panel atmosphere. Single square manga panel with thin black border. The only allowed visible text on the package is the kanji "焙" and the Latin letters "HOU". No other text. No watermark.`,
  },
];

function buildPrompt(panel) {
  return `Generate exactly ONE completed manga panel image (1:1 square, target 1024x1024). Do not reply with text.

# Style (shared across all 6 panels for consistency)
${STYLE_TOKEN}

# Panel
${panel.body}

# Hard constraints
- Output exactly one image, no text response
- 1:1 square composition
- Draw only the text explicitly allowed above; all other characters/letters must be omitted
- Keep the same character designs across panels (Genmaicha-chan: brown hair with ribbon, apron, slender)
- Single square manga panel with a thin black border around the artwork
- No watermark, no logo except when the panel explicitly asks for the 焙/HOU kanji`;
}

async function callModel(model, prompt) {
  const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${GEMINI_KEY}`;
  const t0 = Date.now();
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
    }),
  });
  const ms = Date.now() - t0;
  if (!res.ok) {
    const body = (await res.text()).slice(0, 400);
    return { ok: false, ms, status: res.status, error: body };
  }
  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const img = parts.find((p) => p.inlineData);
  if (!img) {
    const t = parts.find((p) => p.text)?.text?.slice(0, 200);
    return { ok: false, ms, status: 200, error: `no inlineData (text: ${t || 'none'})` };
  }
  return {
    ok: true,
    ms,
    buffer: Buffer.from(img.inlineData.data, 'base64'),
    mime: img.inlineData.mimeType,
  };
}

async function generatePanel(panel) {
  const prompt = buildPrompt(panel);
  for (const model of MODEL_CASCADE) {
    const r = await callModel(model, prompt);
    if (r.ok) {
      return { ...r, model };
    }
    console.log(`    ⚠ ${model} failed (${r.status}, ${r.ms}ms): ${(r.error || '').slice(0, 160)}`);
  }
  return { ok: false };
}

async function main() {
  console.log('========================================');
  console.log(' 焙 HOU 漫画 6コマ生成 (nano banana pro)');
  console.log('========================================');
  console.log('出力:', OUT_DIR);
  console.log('枚数:', PANELS.length);

  const results = [];
  for (let i = 0; i < PANELS.length; i++) {
    const p = PANELS[i];
    console.log(`\n--- ${i + 1}/${PANELS.length}: ${p.title} (${p.file}) ---`);
    const r = await generatePanel(p);
    if (!r.ok) {
      console.log(`  ❌ 失敗 (全モデル)`);
      results.push({ ...p, ok: false });
      continue;
    }
    const out = path.join(OUT_DIR, p.file);
    fs.writeFileSync(out, r.buffer);
    const kb = Math.round(r.buffer.length / 1024);
    console.log(`  ✅ ${r.model} ${kb}KB (${r.ms}ms) → ${p.file}`);
    results.push({ ...p, ok: true, kb, ms: r.ms, model: r.model });
    if (i < PANELS.length - 1) await new Promise((r) => setTimeout(r, 3000));
  }

  console.log('\n========================================');
  const ok = results.filter((r) => r.ok).length;
  console.log(` 完了: ${ok}/${PANELS.length}`);
  console.log('========================================');
  for (const r of results) {
    console.log(`  ${r.ok ? '✅' : '❌'} ${r.file}${r.ok ? ` (${r.kb}KB, ${r.model})` : ''}`);
  }
  if (ok < PANELS.length) process.exit(2);
}

main().catch((e) => {
  console.error('💥', e.message);
  console.error(e.stack);
  process.exit(1);
});
