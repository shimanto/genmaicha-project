/**
 * 紡 TSUMUGI — 漫画カバー画像生成 (LP のティーザーセクション用)
 * 出力: public/manga/cover.png
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs'
import path from 'path'

function loadEnv() {
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '../lineclaude/agent/.env.shared'),
    path.resolve(process.env.HOME || process.env.USERPROFILE || '', 'shimanto-projects/lineclaude/agent/.env.shared'),
  ]
  for (const p of candidates) {
    if (existsSync(p)) {
      const lines = readFileSync(p, 'utf-8').split('\n')
      for (const line of lines) {
        const m = line.match(/^([A-Z_]+)=(.*)$/)
        if (m) process.env[m[1]] = m[2].trim()
      }
    }
  }
}
loadEnv()

const GEMINI_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_KEY) {
  console.error('GEMINI_API_KEY required')
  process.exit(1)
}

const OUT_DIR = path.resolve(process.cwd(), 'public', 'manga')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const PROMPT = `
スタイル: 温かみのある手描きアニメ・漫画イラスト。淡い水彩。柔らかな線。
構図: 縦長 portrait 4:5 (1080x1350相当)。
色味: 焙煎玄米の琥珀色 (#964c1c)、抹茶の緑 (#7d9c46)、和紙のクリーム (#faf4e5)。

シーン: 宮城の小さな焙煎工場の前に立つ、20代の若手日本人女性「松永つむぎ」。
黒髪のショートボブ。生成り色のリネン作業エプロン、藍染シャツ。素朴で芯のある笑顔。
両手で焙煎玄米のクラフト紙袋(「紡 TSUMUGI」のロゴが見える)を抱えている。
背景: 古びた木造の工場、釜から立ち上る湯気、朝焼けの琥珀色の空。
画面右上に小さく「紡 TSUMUGI」、下端中央に英文「Roasted Brown Rice from Miyagi」。
タッチ: コミックスのカバーイラストのような、品格のある一枚絵。文字は少なく。
`

async function main() {
  console.log('== 漫画カバー生成 ==')
  const url = `https://generativelanguage.googleapis.com/v1beta/models/nano-banana-pro-preview:generateContent?key=${GEMINI_KEY}`
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
    const body = (await res.text()).slice(0, 500)
    console.error(`❌ ${res.status}: ${body}`)
    process.exit(1)
  }
  const data = await res.json()
  const parts = data.candidates?.[0]?.content?.parts ?? []
  const imagePart = parts.find((p) => p.inlineData)
  if (!imagePart) {
    console.error('❌ no image in response')
    process.exit(1)
  }
  const buffer = Buffer.from(imagePart.inlineData.data, 'base64')
  const out = path.join(OUT_DIR, 'cover.png')
  writeFileSync(out, buffer)
  console.log(`✅ ${Math.round(buffer.length / 1024)} KB → manga/cover.png`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
