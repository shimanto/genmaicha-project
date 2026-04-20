/**
 * 玄米茶ちゃん 事業説明 8コマ漫画 (クレヨンしんちゃん風 + インフォグラフィック)
 *
 * 使い方:
 *   node agent/generate-biz-manga.js [pageNumber]
 *     - pageNumber 省略時は全8ページ生成
 *     - 例: node agent/generate-biz-manga.js 4
 *
 * 必要環境変数: GEMINI_API_KEY
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

const OUT_DIR = path.resolve(process.cwd(), 'public', 'biz-manga')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const STYLE_TOKEN = `
スタイル: クレヨンしんちゃん風のポップな日本の子供向けアニメ・漫画イラスト。
太い黒い輪郭線、単純化されたシルエット、フラットでビビッドな塗り。
大きめの丸い頭、点のような黒目に小さなハイライト、シンプルな鼻と大きく表情豊かな口。
紙質感の背景、手書き風のタイトル文字、ポップな吹き出し、「!」「?」などの効果音文字。
アスペクト比: 1:1 正方形 (1024x1024)。シングルパネルの漫画コマ。
`

const CHARACTER = `
主人公「玄米茶ちゃん」(クレヨンしんちゃん風にアレンジ):
  - 20代の日本人女性だが、クレヨンしんちゃん風に単純化・デフォルメ。
  - 大きい丸顔、ショートボブの黒髪(前髪パッツン)、頬にピンクの丸い赤み。
  - 点目(黒丸)にハイライト、太く描かれた眉、大きく表情豊かな口。
  - キャラメル色(#C08552)のエプロン、クリーム色(#FAF4E5)のシャツ、茶色のズボン。
  - 胸元に小さな「焙」の漢字ワッペン。
  - 常に元気で前向き、時々困り顔・驚き顔。
  - 身長は画面下半分に収まる程度(頭身は2〜3頭身、デフォルメ強め)。
`

const INFOGRAPHIC_RULES = `
インフォグラフィック・図解のルール:
  - 数字は大きく太いフォントで描画(例: 「+34%」「¥500」「70年」)。
  - 矢印、棒グラフ、円グラフ、チェックリストを積極的に使う。
  - 日本語テキストは正確に、手書き風マンガフォントで。
  - ブランドカラー: 焙煎玄米の琥珀色 (#964c1c)、抹茶緑 (#7d9c46)、和紙クリーム (#faf4e5)、アクセント赤 (#d94a38)。
  - グラフの軸・単位も明記。
`

const PAGES = [
  {
    file: 'biz-01.png',
    title: '第1話 — 玄米茶ちゃん、参上!',
    caption:
      '70年続く宮城の焙煎玄米工場。4代目「玄米茶ちゃん」がブランドを立ち上げる。',
    prompt: `${STYLE_TOKEN}
${CHARACTER}
${INFOGRAPHIC_RULES}
シーン: 玄米茶ちゃんが小さな焙煎工場の前でピースサインをしながら画面に向かって自己紹介。
背景: 古い木造の工場、看板に「創業1956 焙煎玄米工場」の文字、煙突から香ばしい湯気。
画面右に大きな吹き出し:「4代目、玄米茶ちゃん!! 焙煎玄米ひと筋70年の工場、受け継ぎます!!」
画面左上に「EPISODE 1 / 8」のバッジ、右下に「焙 HOU」ブランドロゴ。
効果音: 「ドーン!!」(左下に大きな手書き文字)。
`,
  },
  {
    file: 'biz-02.png',
    title: '第2話 — 焙煎玄米ってなに?',
    caption:
      '玄米を高温の釜で「はぜる」まで焙煎。香ばしさとノンカフェインが武器。',
    prompt: `${STYLE_TOKEN}
${CHARACTER}
${INFOGRAPHIC_RULES}
シーン: 玄米茶ちゃんが黒板の前で指し棒を持ち、焙煎玄米の作り方を図解している。
黒板に3ステップのフローチャート(左から右へ矢印):
  1. 「玄米」(茶色の米粒イラスト)
  2. 「高温焙煎 200℃」(炎と釜のイラスト、赤い温度計)
  3. 「焙煎玄米」(はじけた黄金色の玄米、「パチッ」の効果音)
下に大きな文字: 「ノンカフェイン × 香ばしい × 栄養満点」
右上に小さな吹き出し:「これが基本!」
`,
  },
  {
    file: 'biz-03.png',
    title: '第3話 — 国内市場のチャンス',
    caption:
      'ノンカフェイン飲料の需要は年+12%成長中。単一素材の玄米茶はまだ少ない。',
    prompt: `${STYLE_TOKEN}
${CHARACTER}
${INFOGRAPHIC_RULES}
シーン: 玄米茶ちゃんが右手にタブレットを持ち、左手で画面の棒グラフを指差している。
中央に大きな棒グラフ: 縦軸「ノンカフェイン飲料市場 (億円)」、横軸「2020 2021 2022 2023 2024 2025」、右肩上がりに伸びる緑の棒。最右上に「+12%/年」の赤い矢印。
右側に円グラフ: 「玄米茶市場のブレンド率」、85%がブレンド、15%が単一素材、15%部分を黄色でハイライト。
吹き出し(玄米茶ちゃん):「単一素材は狙い目ッ!」
画面下に小見出し:「EPISODE 3 — 国内チャンス」
`,
  },
  {
    file: 'biz-04.png',
    title: '第4話 — お米の値段が高騰!? ピンチ!',
    caption:
      '2024年から続くお米の値上がりで仕入れコストが増加。小さな工場には痛手。',
    prompt: `${STYLE_TOKEN}
${CHARACTER}
${INFOGRAPHIC_RULES}
シーン: 玄米茶ちゃんが頭を抱えて困った顔(涙マーク一粒)、背景に新聞・ニュース画面が重なる。
背景: ニュースヘッダー「お米高騰! 前年比 +60%」、新聞紙面「玄米仕入れ価格 高騰続く」の見出し。
中央の棒グラフ: 縦軸「玄米 仕入れ価格 (¥/kg)」、「2023: ¥480 → 2024: ¥620 → 2025: ¥770」、赤い矢印で急上昇、「+60%!」の赤い大きな文字。
吹き出し(玄米茶ちゃん、困り顔):「仕入れコストが…ピンチ!!」
画面下に小さな文字: 「原材料高騰は全国の米加工業者の共通の悩み」
`,
  },
  {
    file: 'biz-05.png',
    title: '第5話 — だからこそ、直販と付加価値',
    caption:
      '卸だけではコスト吸収できない。直販でマージン確保 + お試しセットで新規開拓。',
    prompt: `${STYLE_TOKEN}
${CHARACTER}
${INFOGRAPHIC_RULES}
シーン: 玄米茶ちゃんがガッツポーズ、前向きな笑顔。復活モード。
中央に戦略図(3つのアイコン + 矢印):
  1. 「卸のみ」(工場→大手、利益薄い) X印赤
  2. 「卸 + 直販D2C」(工場→直接顧客、太い緑矢印)○印緑
  3. 「お試しセット ¥500」(小さな袋のイラスト、¥マーク)
右下に比較:「卸 利益率 15% vs 直販 利益率 45%」、大きな矢印で「3倍!」
吹き出し(玄米茶ちゃん):「ピンチをチャンスに変えるッ!!」
効果音:「ガッ!」「バーン!」
`,
  },
  {
    file: 'biz-06.png',
    title: '第6話 — 海の向こうでも「Genmaicha」',
    caption:
      '北米・欧州・東南アジアで日本茶ブーム。「Genmaicha」検索は年+34%成長。',
    prompt: `${STYLE_TOKEN}
${CHARACTER}
${INFOGRAPHIC_RULES}
シーン: 玄米茶ちゃんが世界地図の前で指差し、目を輝かせて興奮している。
中央に大きな世界地図(シンプルなフラットイラスト):
  - 北米に大きなピン(赤)+ 「+34%」
  - 欧州(イギリス・ドイツあたり)にピン(緑)+ 「+28%」
  - 東南アジア(シンガポール・タイ)にピン(青)+ 「+22%」
各ピンから「GENMAICHA」という文字の吹き出し(英語表記)。
画面下部:「世界が焙煎玄米を待っている!」と大きな手書き文字。
吹き出し(玄米茶ちゃん、星目):「ワールドワイドに焙いていくよ〜!」
`,
  },
  {
    file: 'biz-07.png',
    title: '第7話 — BASE でオープン!',
    caption:
      'ECプラットフォーム BASE で小さく始動。初期投資¥0、すぐ出店可能。',
    prompt: `${STYLE_TOKEN}
${CHARACTER}
${INFOGRAPHIC_RULES}
シーン: 玄米茶ちゃんがノートPCの前でガッツポーズ、画面には出店ページが映る。
PC 画面内に商品陳列(3商品):
  - 左「朝の焙 ASA-HOU ¥1,200」(浅焙煎缶、琥珀色ラベル)
  - 中「夜の焙 YORU-HOU ¥1,400」(深焙煎缶、濃茶ラベル)
  - 右「お試しセット ¥500」(小袋、リボン付き)
画面上部に「BASE(ベイス)」のロゴ風の文字、「新規出店 OPEN!!」のバナー。
チェックリスト(画面左):
  ✓ 初期費用 ¥0
  ✓ 最短1日で開店
  ✓ スマホ完結
吹き出し(玄米茶ちゃん):「小さく、でも確かに、開店でっす!!」
`,
  },
  {
    file: 'biz-08.png',
    title: '第8話 — まずは¥500お試しから!',
    caption:
      '第一歩は¥500お試しセット。朝の焙・夜の焙を10gずつ + 飲み方カード付き。',
    prompt: `${STYLE_TOKEN}
${CHARACTER}
${INFOGRAPHIC_RULES}
シーン: 玄米茶ちゃんが両手で小さなお試しセットの袋を持ち、画面に向かって「買ってね!」と笑顔で差し出している。
セットの中身を吹き出しで展開表示:
  - 朝の焙 ASA-HOU 10g (浅焙煎、琥珀色)
  - 夜の焙 YORU-HOU 10g (深焙煎、濃茶色)
  - 飲み方カード
大きく「¥500 お試しセット」「送料込み」の文字、背景に「はじめての一杯を、焙 HOU で」のコピー。
画面右下に「BASE で購入 →」の赤い大きなボタン風イラスト。
「EPISODE 8 / 8 FINAL」「焙 HOU」ブランドロゴを画面下に。
効果音:「ポン!」「キラッ!」
`,
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
    console.error(`page ${arg} not found (1-${PAGES.length})`)
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
