/**
 * 焙 HOU 販売ロードマップ漫画 (1枚 9:16 縦長 / 6コマ割り / クレヨンしんちゃん風)
 * 使い方: node agent/generate-roadmap-manga.js
 * 出力:  public/roadmap/roadmap-manga.png
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

const OUT_DIR = path.resolve(process.cwd(), 'public', 'roadmap')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })
const OUT_FILE = path.join(OUT_DIR, 'roadmap-manga.png')

const PROMPT = `
Generate ONE single tall portrait infographic-manga image (aspect ratio 9:16, target 1152x2048 pixels).
Do not return text — return image only.

# 全体構成
1枚の縦長インフォグラフィック漫画。上から下に縦に並ぶ 6コマ + ヘッダー + フッター。
全コマで主人公「玄米茶ちゃん」が登場し、図解と数字で焙煎玄米ブランド「焙 HOU」の販売ロードマップを説明。

# スタイル
クレヨンしんちゃん風のポップな日本の子供向けアニメ・漫画イラスト。
太い黒輪郭、フラットでビビッドな塗り、丸い大きい頭、点目+ハイライト、シンプルで表情豊かな口、頬のピンク赤み。
紙質感の和紙背景、手書き風タイトル文字、効果音文字、吹き出し。

# キャラクター「玄米茶ちゃん」
20代の日本人女性をデフォルメ(2-3頭身)、丸顔、ショートボブの黒髪(前髪パッツン)、
キャラメル色 (#C08552) のエプロン、クリーム色のシャツ、胸元に「焙」漢字ワッペン。
常に元気・前向き・親しみやすい。

# ブランドカラー
琥珀色 (#964c1c)、深煎り茶 (#603419)、抹茶緑 (#7d9c46)、和紙クリーム (#faf4e5)、アクセント赤 (#d94a38)

# レイアウト (上から)
[ヘッダー帯 (上端): 大きな手書き風タイトル「焙 HOU 販売ロードマップ 2026-2028」、
  サブ「玄米茶ちゃんと一緒に 7段階で世界へ」]

[コマ 1 / Step 1 (2026年4-6月)] STEP 1: 「BASE で開店!」
  玄米茶ちゃんがノートPCの前でガッツポーズ。
  画面に「OPEN!! BASE店オープン」のバナー。
  サイドに数字: 「初期費用 ¥0」「お試しセット ¥500」「想定 月10セット」

[コマ 2 / Step 2 (2026年7-9月)] STEP 2: 「マルシェ・ポップアップ」
  玄米茶ちゃんがマルシェのテントで試飲を提供。テーブルに小袋商品が並ぶ。
  数字: 「県内マルシェ 月2回」「対面試飲 月50杯」「リピート率 30%↑」

[コマ 3 / Step 3 (2026年10-12月)] STEP 3: 「リフィル + ティーバッグ追加」
  玄米茶ちゃんが両手に三角ティーバッグの箱とリフィル袋を掲げる。「新商品!!」の効果音。
  数字: 「商品数 3 → 8」「客単価 ¥500 → ¥1,500」

[コマ 4 / Step 4 (2027年1-3月)] STEP 4: 「ふるさと納税 + クラウドファンディング」
  玄米茶ちゃんが宮城県の地図を背景に、両手で「届け!」のジェスチャー。
  ふるさと納税ロゴ風アイコン、クラウドファンディング進捗バー(150%達成)。
  数字: 「目標 ¥500,000」「達成 150%」「新規顧客 200名」

[コマ 5 / Step 5 (2027年4-9月)] STEP 5: 「ギフト・OEM拡大」
  玄米茶ちゃんが化粧箱を抱える。父の日・母の日・季節限定のアイコン3つが並ぶ。
  数字: 「ギフト箱 月50箱」「カフェOEM 3社」「年商 ¥3M目標」

[コマ 6 / Step 6 (2027年10月-2028年)] STEP 6: 「越境EC・海外進出」
  玄米茶ちゃんが世界地図(北米・欧州・東南アジア)の前で「Genmaicha to the World!」と叫ぶ。
  飛行機の航跡。各エリアにピン: 「USA / EU / SEA」
  数字: 「海外売上比率 30%」「越境EC オープン」

[フッター帯 (下端): 「まずは¥500お試しから始めよう! / Start small, grow far.」
  右下に小さく「焙 HOU x 玄米茶ちゃん 4代目」、左下に小さく「SAMPLE / Roadmap Concept」]

# 制約
- 出力は1枚の画像のみ、テキスト返答なし
- 縦長 9:16
- 6コマ + ヘッダー + フッターを1枚に内包
- 各コマに玄米茶ちゃんが必ず登場(同一キャラデザ)
- 日本語テキスト・数字・効果音は正確に
- 全体で読みやすい色のコントラストとレイアウト
`

async function main() {
  console.log('== ロードマップ漫画 (1枚 9:16) 生成 ==')
  const url = `${GEMINI_API_BASE}/${MODEL}:generateContent?key=${GEMINI_KEY}`
  const t0 = Date.now()
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: PROMPT }] }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
    }),
  })
  console.log(`  ${Date.now() - t0}ms`)
  if (!res.ok) {
    console.error(`❌ ${res.status}: ${(await res.text()).slice(0, 500)}`)
    process.exit(1)
  }
  const data = await res.json()
  const part = (data.candidates?.[0]?.content?.parts ?? []).find((p) => p.inlineData)
  if (!part) {
    console.error('❌ no image in response')
    process.exit(2)
  }
  const buf = Buffer.from(part.inlineData.data, 'base64')
  writeFileSync(OUT_FILE, buf)
  console.log(`✅ ${Math.round(buf.length / 1024)}KB → ${OUT_FILE}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
