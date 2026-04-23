/**
 * 焙 HOU / 玄米茶ちゃん 商品パッケージ 30 SKU 自動生成 (nano-banana-pro)
 * 使い方:
 *   node agent/generate-products.js          # 全30枚
 *   node agent/generate-products.js 5        # No.5 のみ
 *   node agent/generate-products.js 10-15    # No.10〜15 のみ
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

const OUT_DIR = path.resolve(process.cwd(), 'public', 'packaging')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const BRAND = `
ブランド: 「焙 HOU」(ほう) / 「玄米茶ちゃん」。
ロゴ: 大きな漢字一字「焙」と小さなローマ字「HOU」の組み合わせ、
  または手書き風の「玄米茶ちゃん」日本語ロゴ。
ブランドカラー: 琥珀色 (#964c1c) / 深煎り茶 (#603419) / 抹茶緑 (#7d9c46) / 和紙クリーム (#faf4e5)。
書体: 筆書風(明朝+手書き)の和モダン。シンプルで余白多め。
質感: 和紙テクスチャの背景 / クラフト紙 / マット仕上げ。
`

const PRODUCT_MOCK_STYLE = `
スタイル: プロフェッショナルなプロダクト・パックショット写真。
撮影: 3/4アングル or 正面。スタジオ照明、ソフトシャドウ、高精細。
背景: 淡いクリーム色 (#faf4e5) か 和紙テクスチャ。被写体中央、余白ゆったり。
解像度: 高解像度 1:1 正方形 1024x1024。
ブランドロゴ・商品名・重量表記などテキストは正確な日本語で。
Sample / 参考用ラベル(右下に小さく 'SAMPLE' の透かし)。
`

const SKUS = [
  // ===== A. 国内 缶パッケージ (5) =====
  {
    no: 1,
    file: 'pkg-01.png',
    name: '朝の焙 ASA-HOU 100g 缶',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 直径75mm × 高さ100mmの円筒形アルミ缶。マットな琥珀色 (#cf7e2a) ボディ、
上半分に大きな漢字ロゴ「焙」と下に「HOU」(Latin)。中央に「朝の焙 ASA-HOU」の
筆書きタイポ、下部に「LIGHT ROAST 100g」の英日併記。蓋は艶消しブロンズ。
缶の横に実物の焙煎玄米粒が少量散らしてある。
右下に小さな「SAMPLE」透かしラベル。`,
  },
  {
    no: 2,
    file: 'pkg-02.png',
    name: '夜の焙 YORU-HOU 100g 缶',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 直径75mm × 高さ100mmの円筒形アルミ缶。ほぼ黒に近い深煎り茶 (#341a09) ボディ、
金色の「焙」大漢字と「HOU」。中央に「夜の焙 YORU-HOU」の筆書き、下に「DARK ROAST 100g」。
蓋はマットブラック。缶横に深煎りの艶のある玄米粒。
右下に「SAMPLE」透かし。`,
  },
  {
    no: 3,
    file: 'pkg-03.png',
    name: 'ASA-HOU 200g 大容量缶',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 直径90mm × 高さ140mmの大容量アルミ缶。琥珀色グラデーション。
「朝の焙 ASA-HOU 200g LARGE」表記。上下に金のトリム。業務用にも使える落ち着いた印象。
SAMPLE 透かし。`,
  },
  {
    no: 4,
    file: 'pkg-04.png',
    name: 'YORU-HOU 200g 大容量缶',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 直径90mm × 高さ140mmの大容量アルミ缶。深煎り茶 + 銅色トリム。
「夜の焙 YORU-HOU 200g LARGE」表記。高級感のある艶あり仕上げ。
SAMPLE 透かし。`,
  },
  {
    no: 5,
    file: 'pkg-05.png',
    name: '季節限定 HACHI-MITSU 100g 缶',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 中間サイズの缶。蜂蜜色 (#e9bb74) とクリーム色のツートンボディ、
「季節限定 蜂蜜焙 HACHI-MITSU 100g」表記、小さな蜂のイラスト装飾。
缶横に乾燥蓮の実と蜂蜜のスプーンを配置。SAMPLE 透かし。`,
  },

  // ===== B. 国内 袋パッケージ (5) =====
  {
    no: 6,
    file: 'pkg-06.png',
    name: 'ASA-HOU 50g スタンドアップパウチ',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 130mm × 180mm の自立型スタンドパウチ(底マチ付き)。クラフト紙素材。
中央に大きな「焙」の漢字スタンプ、下に「朝の焙 ASA-HOU 50g」。
ジッパートップ、マットな質感。紐付きタグは任意で結ばれている。
SAMPLE 透かし。`,
  },
  {
    no: 7,
    file: 'pkg-07.png',
    name: 'YORU-HOU 50g スタンドアップパウチ',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 130mm × 180mm のクラフト紙スタンドパウチ。濃茶の「焙」スタンプ、
「夜の焙 YORU-HOU 50g」。ジッパー付き。深煎りらしい重厚感。SAMPLE 透かし。`,
  },
  {
    no: 8,
    file: 'pkg-08.png',
    name: '業務用 500g クラフト紙袋',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 200mm × 320mmのクラフト紙袋、上部折り返し + 金属クリップ。
「焙 HOU 業務用」「FOR CAFE USE 500g」表記。カフェ・飲食店向け。
ラベルは大きめのマットステッカー。SAMPLE 透かし。`,
  },
  {
    no: 9,
    file: 'pkg-09.png',
    name: '業務用 1kg 紙袋',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 260mm × 400mmの大容量クラフト紙袋。「焙 HOU 1kg COMMERCIAL」、
上部ミシン縫い仕上げ、つかみ部に穴付き。プロ仕様のシンプルデザイン。SAMPLE 透かし。`,
  },
  {
    no: 10,
    file: 'pkg-10.png',
    name: 'リフィル用 100g ジッパー袋',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 150mm × 220mmの透明窓付きマット白ジッパー袋。中身(焙煎玄米)が透けて見える丸窓。
「REFILL 100g」「詰め替え用」と小さく表記。環境配慮を訴求するミニマルデザイン。SAMPLE 透かし。`,
  },

  // ===== C. お試しセット (3) =====
  {
    no: 11,
    file: 'pkg-11.png',
    name: '¥500 お試しセット 10g×2',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 小さなクラフト封筒 (120mm × 80mm) を中央に開いた状態。
中に朝の焙 10g(琥珀ラベル)と夜の焙 10g(濃茶ラベル)の小袋2種、
飲み方カード1枚が並ぶ。封筒には「¥500 お試しセット はじめての一杯」と
筆書きタイポ、中央に小さな麻紐リボン。SAMPLE 透かし。`,
  },
  {
    no: 12,
    file: 'pkg-12.png',
    name: '¥1,000 お試し 25g×2',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: クラフト紙スリーブボックス(150mm × 100mm × 30mm)にサテンリボン。
中に朝の焙・夜の焙 25g のミニパウチ2袋が並び、飲み方&物語ガイド付き。
「¥1,000 お試し デュオセット」表記。SAMPLE 透かし。`,
  },
  {
    no: 13,
    file: 'pkg-13.png',
    name: 'ファミリーお試し 50g×2',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 200mm × 140mm × 40mmの化粧箱。箱を開けた状態で50gパウチ2袋が見える。
「¥2,000 ファミリーお試し」表記、品のある金箔押し。SAMPLE 透かし。`,
  },

  // ===== D. 海外向け Export tin (5) =====
  {
    no: 14,
    file: 'pkg-14.png',
    name: 'GENMAICHA Light 50g export tin',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 海外向け export tin。英語主体のラベル。
「GENMAICHA / Roasted Brown Rice Tea / Light Roast 50g / From Miyagi, Japan」表記、
中央に小さな「焙 HOU」漢字ロゴ、下にFDA Facts風のシンプルな栄養情報風の図。
缶は琥珀+クリームのバイカラー、円筒形 60mm × 90mm。SAMPLE 透かし。`,
  },
  {
    no: 15,
    file: 'pkg-15.png',
    name: 'GENMAICHA Light 100g export tin',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 同ライトロースト 100g版。直径75mm × 高さ100mm。英語ラベル、
バーコード、原産地 Miyagi Japan 明記。高級ティーショップ陳列イメージ。SAMPLE 透かし。`,
  },
  {
    no: 16,
    file: 'pkg-16.png',
    name: 'GENMAICHA Light 200g export tin',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 200g大容量 export tin。90mm × 140mm。英語主体、高級感ある金の縁取り。SAMPLE 透かし。`,
  },
  {
    no: 17,
    file: 'pkg-17.png',
    name: 'GENMAICHA Dark 50g export tin',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 深煎りバージョンの 50g export tin。黒基調に銅色トリム。
「GENMAICHA / Dark Roast / 50g」、小さく「焙 HOU」漢字。SAMPLE 透かし。`,
  },
  {
    no: 18,
    file: 'pkg-18.png',
    name: 'GENMAICHA Dark 100g export tin',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 深煎り 100g export tin。黒+銅ツートン、エンボス加工の「焙」漢字。
「GENMAICHA Dark Roast 100g」。SAMPLE 透かし。`,
  },

  // ===== E. 海外 Export ギフトボックス (3) =====
  {
    no: 19,
    file: 'pkg-19.png',
    name: 'HOU Discovery Box (3-pack tasting)',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 220mm × 160mm × 50mmのクラフト化粧箱。蓋を斜めに少し開けた状態。
中に50gのLight/Dark/Hachi-Mitsuの3缶 + 英語ガイドカード。
「HOU DISCOVERY BOX / 3 roasts from Miyagi」表記。SAMPLE 透かし。`,
  },
  {
    no: 20,
    file: 'pkg-20.png',
    name: 'HOU Premium Gift Box',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 280mm × 200mm × 80mmのプレミアムギフトボックス。
黒のラッカー仕上げ、箔押しの「焙 HOU」ロゴ、シルクリボン。
中に 100g × 2缶(Light+Dark)と陶器の茶さじ、和紙のブランドストーリーカード。
SAMPLE 透かし。`,
  },
  {
    no: 21,
    file: 'pkg-21.png',
    name: 'HOU Subscription Welcome Box',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: サブスクリプション初回welcome box。200mm × 150mm × 60mm クラフト箱。
開封すると内側に「WELCOME to HOU」の英語メッセージ、50gパウチ2種 + 茶こし + 月刊ストーリーレター。
マルチチャネル対応のデザイン、英語+日本語併記。SAMPLE 透かし。`,
  },

  // ===== F. ティーバッグ (4) =====
  {
    no: 22,
    file: 'pkg-22.png',
    name: 'Triangle Pyramid お試し 5pc',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 120mm × 100mm × 30mmの小さな化粧箱。開封状態で三角ピラミッド型ティーバッグ5袋が並ぶ。
箱に「焙 HOU 三角ティーバッグ お試し5包」。個包装は半透明のマット素材。SAMPLE 透かし。`,
  },
  {
    no: 23,
    file: 'pkg-23.png',
    name: 'Triangle Pyramid 定番 15pc',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 160mm × 120mm × 50mmの化粧箱、立てて配置。
「焙 HOU 三角ティーバッグ 15包」、琥珀色ベース。3列×5個の配置イラストが箱側面に。SAMPLE 透かし。`,
  },
  {
    no: 24,
    file: 'pkg-24.png',
    name: 'Premium individual bag 10pc',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 和紙風個包装ティーバッグが10袋、木箱に並ぶ。
一袋ずつ「焙」の漢字印、高級感。木箱の蓋に筆書「焙 HOU プレミアム 10包」。SAMPLE 透かし。`,
  },
  {
    no: 25,
    file: 'pkg-25.png',
    name: 'Hojicha × Genmaicha blend 10pc',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 深緑×琥珀の2色デザインの化粧箱。「ほうじ茶×焙煎玄米ブレンド 10包」表記。
ティーバッグの色が濃茶、湯気のイラスト。SAMPLE 透かし。`,
  },

  // ===== G. ギフト・季節 (3) =====
  {
    no: 26,
    file: 'pkg-26.png',
    name: '父の日ギフト(深焙煎+カード)',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 紺色リボンの掛かった化粧箱。「父の日 感謝の一杯」の筆タイポ。
中に 夜の焙 100g缶 + 手書き風メッセージカード。父の日らしい落ち着いた配色。SAMPLE 透かし。`,
  },
  {
    no: 27,
    file: 'pkg-27.png',
    name: '母の日ギフト(浅焙煎+抹茶)',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: カーネーション色のリボンの化粧箱。「母の日 いつもありがとう」の筆タイポ。
朝の焙 100g缶 + 抹茶ブレンド小袋 + 手書きカード。柔らかい配色。SAMPLE 透かし。`,
  },
  {
    no: 28,
    file: 'pkg-28.png',
    name: '冬限定 焙煎玄米シロップ',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 200ml ガラス瓶に入った琥珀色のシロップ。クラフト紙ラベル「焙 HOU 焙煎玄米シロップ 冬限定」、
銅色のキャップ、雪の結晶の小装飾。ラテやホットケーキに使える季節商品。SAMPLE 透かし。`,
  },

  // ===== I. 追加 SKU (順次拡張枠) =====
  {
    no: 31,
    file: 'pkg-31.png',
    name: 'テイスティング4種フライト ¥980',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 横長クラフト紙箱(180mm × 100mm × 20mm)、上面に大きな透明窓。
窓の中に 5g の小袋4種が一列に整列(左から):
  1. 中焙煎 (琥珀色ラベル「中焙」)
  2. 深煎り (濃茶ラベル「深煎」)
  3. 抹茶混合 (抹茶緑ラベル「抹茶」)
  4. 塩玄米 (アクセント赤ラベル「塩」)
箱の正面に筆書き「テイスティング 4種フライト」、下に小さく「Roast Flight 4 Tea Bags ¥980」。
帯紙に「玄米茶ちゃん 焙 HOU / 5g×4 / 飲み方ガイド付き」。
箱横に飲み方ガイドのカード(三つ折り)。和紙背景、自然光。SAMPLE 透かし。`,
  },
  // ===== H. シール単体 (2) =====
  {
    no: 29,
    file: 'pkg-29.png',
    name: '円形ロゴシール 60mm (フラット)',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 円形 φ60mm のシールラベル、フラットレイアウト、台紙から少し剥がれかけた状態。
琥珀色の背景に大きく「焙」、下に小さく「HOU Genmaicha」の英日併記、
縁にダブルサークル装飾。マット PP 加工のイメージ。印刷業者向けの原稿見本として、
ラベル外側に 3mm ドブ (bleed) のグレー破線、中央にトンボマーク。SAMPLE 透かし。`,
  },
  {
    no: 30,
    file: 'pkg-30.png',
    name: '角ラベル 60×80mm 情報シール',
    prompt: `${PRODUCT_MOCK_STYLE}
${BRAND}
被写体: 60mm × 80mmの角丸矩形ラベル、台紙から少し剥がれた状態。
上段に筆書「朝の焙 ASA-HOU」、下段に成分・原材料名・賞味期限枠・製造者名欄 のレイアウト。
商品裏面貼付を想定した食品表示シール。枠線・区切り線が整ったテンプレート感。
外側に 3mm ドブ、トンボマーク。SAMPLE 透かし。`,
  },
]

async function generateOne(sku) {
  const out = path.join(OUT_DIR, sku.file)
  console.log(`\n== No.${sku.no} ${sku.name} → ${sku.file} ==`)
  const url = `${GEMINI_API_BASE}/${MODEL}:generateContent?key=${GEMINI_KEY}`
  const t0 = Date.now()

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: sku.prompt }] }],
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
  const parts = data.candidates?.[0]?.content?.parts ?? []
  const imagePart = parts.find((p) => p.inlineData)
  if (!imagePart) {
    console.error(`  ❌ no image in response (${ms}ms)`)
    return false
  }
  const buffer = Buffer.from(imagePart.inlineData.data, 'base64')
  writeFileSync(out, buffer)
  console.log(`  ✅ ${Math.round(buffer.length / 1024)}KB (${ms}ms)`)
  return true
}

function parseArg(arg) {
  if (!arg) return SKUS
  if (arg.includes('-')) {
    const [lo, hi] = arg.split('-').map(Number)
    return SKUS.filter((s) => s.no >= lo && s.no <= hi)
  }
  return SKUS.filter((s) => s.no === Number(arg))
}

async function main() {
  const target = parseArg(process.argv[2])
  if (!target.length) {
    console.error(`no matching SKU`)
    process.exit(1)
  }
  console.log(`========================================`)
  console.log(` 焙 HOU 商品 ${target.length} SKU 生成`)
  console.log(`========================================`)
  let ok = 0
  for (const s of target) {
    if (await generateOne(s)) ok++
  }
  console.log(`\n=== 完了: ${ok}/${target.length} ===`)
  if (ok < target.length) process.exit(2)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
