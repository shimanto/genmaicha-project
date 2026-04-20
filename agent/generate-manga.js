/**
 * 紡 TSUMUGI 漫画 6ページを nano-banana-pro で生成
 *
 * 使い方:
 *   node agent/generate-manga.js [pageNumber]
 *     - pageNumber 省略時は全6ページ生成
 *     - 例: node agent/generate-manga.js 3   ← 第3話のみ生成
 *
 * 必要環境変数:
 *   GEMINI_API_KEY (lineclaude プロジェクトの agent/.env.shared から拾う)
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs'
import path from 'path'

// .env.shared から GEMINI_API_KEY を拾う(lineclaude agent と同じ場所)
function loadEnv() {
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '.env.local'),
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

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'
const MODEL = 'nano-banana-pro-preview'
const GEMINI_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_KEY) {
  console.error('GEMINI_API_KEY required (set in env, .env, or ~/shimanto-projects/lineclaude/agent/.env.shared)')
  process.exit(1)
}

const OUT_DIR = path.resolve(process.cwd(), 'public', 'manga')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const COMMON_STYLE = `
スタイル: 温かみのある手描き風アニメ・漫画イラスト。柔らかな線、淡い水彩の質感。
色味: 焙煎玄米の琥珀色 (#964c1c)、抹茶の緑 (#7d9c46)、和紙のクリーム色 (#faf4e5) を基調。
構図: 縦長 (portrait, 4:5 アスペクト比, 1080x1350相当) のシングルパネル漫画。
キャラクター:
  - 主人公「松永つむぎ」: 20代の若手日本人女性。黒髪のショートボブ。素朴な笑顔、知的な目。
    生成り色のリネンの作業エプロンと、中の薄い藍染シャツ。手は荒れている(働き者)。
  - 母「松永の母」: 50代後半の日本人女性。白髪混じりの後ろで結んだ髪。穏やかな表情。
    紺の作業着 + 同じく作業エプロン。
場所: 宮城県の小さな焙煎工場。直火の焙煎釜、選別ザル、クラフト紙袋、和紙のような壁。
湯気・玄米のはじける粒・茶葉の匂いが画面から伝わるように。
ブランドマーク: 画面左下に小さく「紡 TSUMUGI」のロゴ(目立たせすぎず)。
日本語テキスト: 漫画のフキダシ・キャプションの形で正確に描画。
`

const PAGES = [
  {
    file: 'page-01.png',
    title: '第1話 — 釜の前で',
    prompt: `${COMMON_STYLE}
シーン: 朝の焙煎工場。釜の前に立つ主人公つむぎ(20代女性)。
焙煎釜の中の玄米から立ち上る湯気と熱、その向こうに窓から差し込む朝の光。
主人公は腕組みをして、釜と真っ直ぐ向き合っている。覚悟を決めた表情。
キャプション(画面下部): 「ここを継ぐ、と決めた朝。」
ブランドマーク左下: 紡 TSUMUGI`,
  },
  {
    file: 'page-02.png',
    title: '第2話 — 母とふたり',
    prompt: `${COMMON_STYLE}
シーン: 工場内の作業台で母娘が並んで焙煎玄米の選別をしている横顔。
背景に積み重なったクラフト紙袋。窓の外は午後の光。
表情は静かで、職人らしい集中。会話はないが温度感のある空気。
キャプション(画面下部): 「母とふたりきりの日々。1日が玄米の香りで終わっていく。」
ブランドマーク左下: 紡 TSUMUGI`,
  },
  {
    file: 'page-03.png',
    title: '第3話 — 卸と直販のあいだ',
    prompt: `${COMMON_STYLE}
シーン: 夜の事務机で、つむぎがノートPCに向かいながら帳簿(紙)も広げている。
画面には EC 管理画面、紙には「卸 / 直販」の図解メモ。
表情は思案。コーヒー(または玄米茶)の湯気。
フキダシ(つむぎ): 「卸先は止められない。でも、これだけじゃ未来が描けない。」
ブランドマーク左下: 紡 TSUMUGI`,
  },
  {
    file: 'page-04.png',
    title: '第4話 — 玄米茶という地図',
    prompt: `${COMMON_STYLE}
シーン: 工場の壁に世界地図を貼り、北米・欧州・アジアに色付きピンを刺しているつむぎ。
机にはタブレット、英語のEC画面、Etsy/Amazonのロゴが小さく見える。
表情は希望のある真剣さ。
キャプション(画面下部): 「海の向こうで、Genmaicha は静かに人気を集めていた。」
ブランドマーク左下: 紡 TSUMUGI`,
  },
  {
    file: 'page-05.png',
    title: '第5話 — 紡という名前',
    prompt: `${COMMON_STYLE}
シーン: 工場の作業台に置かれた、できたばかりの新パッケージ(クラフト紙袋に「紡 TSUMUGI」のロゴと焙煎玄米のイラスト)。
背景に祖父祖母の古い写真額。つむぎが袋を両手で持ち上げ、母が後ろから穏やかに微笑んで見守る。
キャプション(画面下部): 「祖父祖母から受け継いだものを、世界へ紡ぎ直す。」
ブランドマーク左下: 紡 TSUMUGI`,
  },
  {
    file: 'page-06.png',
    title: '第6話 — 小さく、確かに、海へ',
    prompt: `${COMMON_STYLE}
シーン: 工場の扉が開いていて、外には宅配便のドライバーが小型ダンボールを受け取っている。
ダンボールには紡のロゴと「Made in Miyagi, Japan」の英語表記。
つむぎと母が並んで見送る。空には朝焼け (琥珀色のグラデーション)。
キャプション(画面下部): 「小さく、確かに、海へ。釜を止めず、母を疲れさせず、世界に届ける。」
ブランドマーク左下: 紡 TSUMUGI`,
  },
]

async function generateOne(page) {
  const out = path.join(OUT_DIR, page.file)
  console.log(`\n== ${page.title} → ${page.file} ==`)
  const url = `${GEMINI_API_BASE}/${MODEL}:generateContent?key=${GEMINI_KEY}`
  const t0 = Date.now()

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: page.prompt }] }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
    }),
  })

  console.log(`  ${Date.now() - t0}ms`)
  if (!res.ok) {
    const body = (await res.text()).slice(0, 500)
    console.error(`❌ ${res.status}: ${body}`)
    return false
  }

  const data = await res.json()
  const parts = data.candidates?.[0]?.content?.parts ?? []
  const imagePart = parts.find((p) => p.inlineData)
  if (!imagePart) {
    console.error('❌ no image in response')
    return false
  }
  const buffer = Buffer.from(imagePart.inlineData.data, 'base64')
  writeFileSync(out, buffer)
  console.log(`✅ ${Math.round(buffer.length / 1024)} KB → ${page.file}`)
  return true
}

async function main() {
  const arg = process.argv[2]
  const target = arg ? PAGES.filter((p, i) => String(i + 1) === arg) : PAGES
  if (target.length === 0) {
    console.error(`page index ${arg} not found (1-${PAGES.length})`)
    process.exit(1)
  }

  let ok = 0
  for (const p of target) {
    const r = await generateOne(p)
    if (r) ok++
  }
  console.log(`\n=== 完了: ${ok}/${target.length} ===`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
