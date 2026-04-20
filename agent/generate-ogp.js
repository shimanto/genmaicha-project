/**
 * 玄米茶ちゃん — OGP 画像生成 (1200x630)
 * 出力: public/ogp.png
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

const OUT_DIR = path.resolve(process.cwd(), 'public')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const PROMPT = `
スタイル: 上品なブランド写真風(現実的だが少し漫画タッチ)。和の落ち着き。
構図: 横長 1200x630 のソーシャルメディア OGP 画像。
レイアウト:
  - 左側 (60%): 焙煎玄米が入った木の升と、湯気が立ち上る玄米茶の湯飲み。
    背景には和紙の壁と、ぼやけた焙煎釜のシルエット。
  - 右側 (40%): 大きな和文タイトル「玄米茶ちゃん」(明朝体 / 琥珀色 #964c1c)。
    その下に小さく「焙煎玄米の老舗を、世界へ。」(墨色)。
    最下部に小さな英文 "Roasted Brown Rice — Miyagi, Japan"。
色味: 琥珀色 #964c1c、抹茶緑 #7d9c46、和紙クリーム #faf4e5、墨色 #1a1a1a。
全体に柔らかな自然光。
日本語テキストは正確に描画。タイトルが画像中で1番目立つように。
`

async function main() {
  console.log('== OGP 生成 ==')
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
  const out = path.join(OUT_DIR, 'ogp.png')
  writeFileSync(out, buffer)
  console.log(`✅ ${Math.round(buffer.length / 1024)} KB → ogp.png`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
