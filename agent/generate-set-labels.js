/**
 * ¥500 お試しセット / ¥980 4種フライト の印刷用ラベル素材を生成
 *  - ¥500: 封筒前面ラベル + 内袋ラベル ×2
 *  - ¥980: 帯紙 + 内小袋ラベル ×4
 *
 * 使い方: node agent/generate-set-labels.js [name]
 *   name 省略で全件、name 指定で個別
 *   例: node agent/generate-set-labels.js try500-envelope
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs'
import path from 'path'

function loadEnv() {
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '.env.local'),
    path.resolve(process.cwd(), '../roblox/.env'),
    path.resolve(process.cwd(), '../kyoutsu-roblox/.env'),
    path.resolve(process.cwd(), '../lineclaude/agent/.env.shared'),
  ]
  for (const p of candidates) {
    if (!existsSync(p)) continue
    const lines = readFileSync(p, 'utf-8').split(/\r?\n/)
    for (const line of lines) {
      const m = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*?)\s*$/)
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
      }
    }
  }
}
loadEnv()

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'
const MODEL = 'nano-banana-pro-preview'
const GEMINI_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_KEY) {
  console.error('GEMINI_API_KEY required')
  process.exit(1)
}

const OUT_DIR = path.resolve(process.cwd(), 'public', 'print', 'labels')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const BRAND = `
ブランド: 「焙 HOU」(ほう) / 「玄米茶ちゃん」。
ロゴ: 大きな漢字一字「焙」と小さなローマ字「HOU」、
  または手書き風の「玄米茶ちゃん」日本語ロゴ。
ブランドカラー: 琥珀色 (#964c1c) / 深煎り茶 (#603419) / 抹茶緑 (#7d9c46) / 和紙クリーム (#faf4e5)。
書体: 筆書風(明朝+手書き)の和モダン。
`

const PRINT_RULES = `
スタイル: フラットレイ ラベル原稿(印刷用)。
構図: ラベル本体を中央に大きく、四隅に小さくトリムマーク(L字 + クロスマーク)を配置。
ラベル外周にうっすらとグレーの破線で 3mm の塗り足し(ドブ)領域を示す。
ラベル本体内部の 3mm 内側に重要要素を収める。
背景: 純白(#ffffff)。物体は描かず、ラベルのアートワークのみ。
解像度: 高精細、文字はくっきり読める。SAMPLE 透かしは入れない(印刷データ想定のため)。
`

const LABELS = [
  // ¥500 お試しセット (No.11) 用ラベル
  {
    name: 'try500-envelope',
    title: '¥500 お試し 封筒前面ラベル (60×80mm)',
    sizeMm: '60×80mm 角丸',
    aspect: '正方形に近い 4:5 縦長を意識',
    prompt: `${PRINT_RULES}
${BRAND}
ラベル仕様: 60mm × 80mm 角丸長方形。3mm 塗り足し含めて 66×86mm。
内容(上から):
  - 大きな漢字「焙」+ 小さく「HOU」(琥珀色)
  - 帯線 (薄い金色)
  - 筆書「お試しセット」(やや大きめ)
  - 小さく「TASTING SET」
  - 「朝の焙 10g + 夜の焙 10g」
  - 「飲み方カード付き」
  - 下端に 「¥500 / 送料込み」 と 「玄米茶ちゃん」 ロゴ
全体: 和紙のクリーム色背景、琥珀のアクセント、余白広め、上品。
四隅に L 字トリムマーク、外周 3mm 塗り足しはグレー破線で示す。`,
  },
  {
    name: 'try500-asa-sachet',
    title: '¥500 内袋 朝の焙 ラベル (30×30mm)',
    sizeMm: '30×30mm 正方形',
    aspect: '1:1',
    prompt: `${PRINT_RULES}
${BRAND}
ラベル仕様: 30mm × 30mm 正方形(3mm 塗り足し含めて 36×36mm)。
内容: 上に大きく「朝の焙」筆書、中央に琥珀色の小さな「焙」漢字+「HOU」、
下に英文「ASA-HOU LIGHT 10g」。
全体: 琥珀色 (#cf7e2a) ベース、白文字。シンプル。
四隅 L 字トリムマーク、3mm 塗り足し領域グレー破線。`,
  },
  {
    name: 'try500-yoru-sachet',
    title: '¥500 内袋 夜の焙 ラベル (30×30mm)',
    sizeMm: '30×30mm 正方形',
    aspect: '1:1',
    prompt: `${PRINT_RULES}
${BRAND}
ラベル仕様: 30mm × 30mm 正方形(3mm 塗り足し含めて 36×36mm)。
内容: 上に大きく「夜の焙」筆書、中央に金色の「焙」漢字+「HOU」、
下に英文「YORU-HOU DARK 10g」。
全体: 深煎り茶 (#341a09) ベース、金/クリームの文字。
四隅 L 字トリムマーク、3mm 塗り足し領域グレー破線。`,
  },

  // ¥980 4種フライト (No.31) 用ラベル
  {
    name: 'try980-band',
    title: '¥980 4種フライト 帯紙 (180×30mm)',
    sizeMm: '180×30mm 横長',
    aspect: '6:1 横長',
    prompt: `${PRINT_RULES}
${BRAND}
ラベル仕様: 180mm × 30mm 横長帯紙(箱に巻きつける)。3mm 塗り足し含めて 186×36mm。
構成: 左から右へ:
  - 「焙」漢字 + HOU ロゴ(左端、琥珀)
  - 中央に大きく「テイスティング 4種フライト」筆書
  - 右側に「ROAST FLIGHT 4 TEA BAGS / ¥980 (税込・送料込)」
背景は和紙クリームで、上下に細い金線。
※ 横長レイアウトでアスペクト比 6:1 を必ず維持。
四隅にトリムマーク、塗り足しはグレー破線。`,
  },
  {
    name: 'try980-naka',
    title: '¥980 内小袋 中焙煎 (30×30mm)',
    sizeMm: '30×30mm 正方形',
    aspect: '1:1',
    prompt: `${PRINT_RULES}
${BRAND}
ラベル仕様: 30mm × 30mm 正方形。中央に大きく「中焙」筆書、
下に英文「MEDIUM 5g」。背景: 琥珀色 #cf7e2a、白文字。
3mm 塗り足し、L 字トリム。`,
  },
  {
    name: 'try980-shin',
    title: '¥980 内小袋 深煎り (30×30mm)',
    sizeMm: '30×30mm 正方形',
    aspect: '1:1',
    prompt: `${PRINT_RULES}
${BRAND}
ラベル仕様: 30mm × 30mm 正方形。中央に大きく「深煎」筆書、
下に英文「DARK 5g」。背景: 深煎り茶 #341a09、金文字。
3mm 塗り足し、L 字トリム。`,
  },
  {
    name: 'try980-matcha',
    title: '¥980 内小袋 抹茶混合 (30×30mm)',
    sizeMm: '30×30mm 正方形',
    aspect: '1:1',
    prompt: `${PRINT_RULES}
${BRAND}
ラベル仕様: 30mm × 30mm 正方形。中央に大きく「抹茶」筆書、
下に英文「MATCHA BLEND 5g」。背景: 抹茶緑 #7d9c46、クリーム文字。
3mm 塗り足し、L 字トリム。`,
  },
  {
    name: 'try980-shio',
    title: '¥980 内小袋 塩玄米 (30×30mm)',
    sizeMm: '30×30mm 正方形',
    aspect: '1:1',
    prompt: `${PRINT_RULES}
${BRAND}
ラベル仕様: 30mm × 30mm 正方形。中央に大きく「塩」筆書、
下に英文「SALT BROWN RICE 5g」。背景: 和紙クリーム #faf4e5、深煎り茶文字、
小さなアクセント赤 #d94a38 (塩の結晶イラスト風)。
3mm 塗り足し、L 字トリム。`,
  },
]

async function generateOne(label) {
  const out = path.join(OUT_DIR, `${label.name}.png`)
  console.log(`\n== ${label.title} ==`)
  const url = `${GEMINI_API_BASE}/${MODEL}:generateContent?key=${GEMINI_KEY}`
  const t0 = Date.now()

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: label.prompt }] }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
    }),
  })

  const ms = Date.now() - t0
  if (!res.ok) {
    const body = (await res.text()).slice(0, 400)
    console.error(`  ❌ ${res.status}: ${body} (${ms}ms)`)
    return false
  }

  const data = await res.json()
  const part = (data.candidates?.[0]?.content?.parts ?? []).find((p) => p.inlineData)
  if (!part) {
    console.error(`  ❌ no image (${ms}ms)`)
    return false
  }
  const buffer = Buffer.from(part.inlineData.data, 'base64')
  writeFileSync(out, buffer)
  console.log(`  ✅ ${Math.round(buffer.length / 1024)}KB → ${label.name}.png (${ms}ms)`)
  return true
}

async function main() {
  const arg = process.argv[2]
  const target = arg ? LABELS.filter((l) => l.name === arg) : LABELS
  if (!target.length) {
    console.error(`label "${arg}" not found`)
    process.exit(1)
  }
  console.log(`========================================`)
  console.log(` ¥500 / ¥980 セット ラベル ${target.length} 件 生成`)
  console.log(`========================================`)
  let ok = 0
  for (const l of target) {
    if (await generateOne(l)) ok++
  }
  console.log(`\n=== 完了: ${ok}/${target.length} ===`)
  if (ok < target.length) process.exit(2)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
