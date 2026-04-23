/**
 * Raksul 規格 (ラクスル シール印刷) のサイズと 3mm 塗り足し付き PDF を生成
 *
 * 入力:  public/print/labels/<name>.png  (ラベルアートワーク)
 *        public/packaging/pkg-29.png      (シール SKU 29 = φ60mm 円形)
 *        public/packaging/pkg-30.png      (シール SKU 30 = 60×80mm 角)
 *
 * 出力:  public/print/raksul/<name>-<wmm>x<hmm>mm.pdf
 *
 * 仕様: ページサイズ = ラベル寸法 + 3mm 塗り足し (上下左右)
 *      アートワーク PNG/JPG をそのまま敷き詰める
 *      実際の本印刷では Illustrator で切り抜きパスとアウトライン化が必要
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import path from 'path'
import { PDFDocument } from 'pdf-lib'

const ROOT = process.cwd()
const LABEL_DIR = path.resolve(ROOT, 'public', 'print', 'labels')
const PKG_DIR = path.resolve(ROOT, 'public', 'packaging')
const OUT_DIR = path.resolve(ROOT, 'public', 'print', 'raksul')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const MM = 2.83465 // 1mm = 2.83465 PDF point
const BLEED_MM = 3 // ラクスル: 重要要素は 3mm 内側 / 塗り足し 3mm 推奨

// 印刷物カタログ (Raksul 規格に最も近いサイズに合わせる)
//
// Raksul 標準サイズ: 30×30, 50×50, 100×100, 40×70, 70×100, 50×200, または自由サイズ
// 自由サイズで発注する前提で、ブランド側のラベル寸法をそのまま使う。
const ITEMS = [
  // ¥500 お試しセット用ラベル
  {
    src: path.join(LABEL_DIR, 'try500-envelope.png'),
    out: 'try500-envelope-60x80mm',
    wMm: 60,
    hMm: 80,
    raksulSize: '自由サイズ 60×80mm 角丸 (最寄り規格: 70×100mm)',
    notes: '¥500 お試しセット 封筒前面ラベル。封筒 (120×80mm クラフト) の前面に貼付。',
  },
  {
    src: path.join(LABEL_DIR, 'try500-asa-sachet.png'),
    out: 'try500-asa-sachet-30x30mm',
    wMm: 30,
    hMm: 30,
    raksulSize: '30×30mm (Raksul 標準サイズ)',
    notes: '¥500 内袋 朝の焙ラベル。半透明小袋 (10g) に貼付。',
  },
  {
    src: path.join(LABEL_DIR, 'try500-yoru-sachet.png'),
    out: 'try500-yoru-sachet-30x30mm',
    wMm: 30,
    hMm: 30,
    raksulSize: '30×30mm (Raksul 標準サイズ)',
    notes: '¥500 内袋 夜の焙ラベル。半透明小袋 (10g) に貼付。',
  },
  // ¥980 4種フライト用ラベル
  {
    src: path.join(LABEL_DIR, 'try980-band.png'),
    out: 'try980-band-180x30mm',
    wMm: 180,
    hMm: 30,
    raksulSize: '自由サイズ 180×30mm 帯紙 (最寄り規格: 50×200mm)',
    notes: '¥980 4種フライト 箱帯紙。クラフト箱 (180×100×20mm) の胴に巻く。',
  },
  {
    src: path.join(LABEL_DIR, 'try980-naka.png'),
    out: 'try980-naka-30x30mm',
    wMm: 30,
    hMm: 30,
    raksulSize: '30×30mm (Raksul 標準サイズ)',
    notes: '¥980 内小袋 中焙煎ラベル。',
  },
  {
    src: path.join(LABEL_DIR, 'try980-shin.png'),
    out: 'try980-shin-30x30mm',
    wMm: 30,
    hMm: 30,
    raksulSize: '30×30mm (Raksul 標準サイズ)',
    notes: '¥980 内小袋 深煎りラベル。',
  },
  {
    src: path.join(LABEL_DIR, 'try980-matcha.png'),
    out: 'try980-matcha-30x30mm',
    wMm: 30,
    hMm: 30,
    raksulSize: '30×30mm (Raksul 標準サイズ)',
    notes: '¥980 内小袋 抹茶混合ラベル。',
  },
  {
    src: path.join(LABEL_DIR, 'try980-shio.png'),
    out: 'try980-shio-30x30mm',
    wMm: 30,
    hMm: 30,
    raksulSize: '30×30mm (Raksul 標準サイズ)',
    notes: '¥980 内小袋 塩玄米ラベル。',
  },
  // ===== v2: コンパクト・クリックポスト対応 (10%以下原価) =====
  {
    src: path.join(LABEL_DIR, 'try500-mailer-front.png'),
    out: 'try500-v2-card-front-148x100mm',
    wMm: 148,
    hMm: 100,
    raksulSize: 'ハガキサイズ 148×100mm (Raksul 標準)',
    notes: '¥500 v2 ハガキカード 表面。Raksul ハガキ印刷 両面で発注。',
  },
  {
    src: path.join(LABEL_DIR, 'try500-mailer-back.png'),
    out: 'try500-v2-card-back-148x100mm',
    wMm: 148,
    hMm: 100,
    raksulSize: 'ハガキサイズ 148×100mm (Raksul 標準)',
    notes: '¥500 v2 ハガキカード 裏面 (飲み方ガイド + QR + 製造者表記)。表面と同時入稿。',
  },
  {
    src: path.join(LABEL_DIR, 'try980-mailer-cover.png'),
    out: 'try980-v2-A5-cover-105x148mm',
    wMm: 105,
    hMm: 148,
    raksulSize: 'A5 二つ折りパンフ 表紙 (Raksul A5 半面)',
    notes: '¥980 v2 A5 二つ折りパンフ 折り後表紙。A5 両面印刷で発注、内側と一体。',
  },
  {
    src: path.join(LABEL_DIR, 'try980-mailer-inside.png'),
    out: 'try980-v2-A5-inside-210x148mm',
    wMm: 210,
    hMm: 148,
    raksulSize: 'A5 横 210×148mm (Raksul 標準)',
    notes: '¥980 v2 A5 二つ折りパンフ 内側展開 (4ポケット部分)。A5 両面印刷で発注。',
  },

  // 既存シール SKU
  {
    src: path.join(PKG_DIR, 'pkg-29.png'),
    out: 'sticker-circle-60mm',
    wMm: 60,
    hMm: 60,
    raksulSize: '自由サイズ φ60mm 円形 (最寄り規格: 50×50mm 角)',
    notes: 'SKU 29: φ60mm 円形ロゴシール。缶蓋上 / 封筒シール用。',
    circle: true,
  },
  {
    src: path.join(PKG_DIR, 'pkg-30.png'),
    out: 'sticker-info-60x80mm',
    wMm: 60,
    hMm: 80,
    raksulSize: '自由サイズ 60×80mm 角 (最寄り規格: 70×100mm)',
    notes: 'SKU 30: 食品表示用裏面シール。',
  },
]

function detectFormat(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'png'
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg'
  return null
}

async function buildOne(item) {
  if (!existsSync(item.src)) {
    console.error(`  ⚠ skip (missing source): ${item.src}`)
    return false
  }
  const bytes = readFileSync(item.src)
  const fmt = detectFormat(bytes)
  if (!fmt) throw new Error(`unknown image format: ${item.src}`)

  const pdf = await PDFDocument.create()
  pdf.setTitle(`焙 HOU - ${item.out}`)
  pdf.setAuthor('焙 HOU / 玄米茶ちゃん')
  pdf.setSubject(
    `Raksul 印刷用ラベル (${item.wMm}×${item.hMm}mm + 3mm 塗り足し). SAMPLE / 本印刷前にベクター化推奨.`,
  )
  pdf.setKeywords(['raksul', 'sticker', 'label', 'genmaicha', 'HOU', 'sample'])
  pdf.setCreator('genmaicha-project (build-raksul-pdfs.mjs)')

  const pageW = (item.wMm + BLEED_MM * 2) * MM
  const pageH = (item.hMm + BLEED_MM * 2) * MM
  const page = pdf.addPage([pageW, pageH])

  const img = fmt === 'png' ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes)
  page.drawImage(img, {
    x: 0,
    y: 0,
    width: pageW,
    height: pageH,
  })

  const out = path.join(OUT_DIR, `${item.out}.pdf`)
  writeFileSync(out, await pdf.save())
  return out
}

async function main() {
  console.log(`========================================`)
  console.log(` Raksul 規格 印刷用 PDF 生成 (${ITEMS.length} 件)`)
  console.log(`========================================`)
  let ok = 0
  for (const item of ITEMS) {
    try {
      const out = await buildOne(item)
      if (out) {
        console.log(`  ✅ ${path.basename(out)}  (${item.wMm}×${item.hMm}mm + 3mm bleed)`)
        ok++
      }
    } catch (e) {
      console.error(`  ❌ ${item.out}: ${e.message}`)
    }
  }
  console.log(`\n=== 完了: ${ok}/${ITEMS.length} ===`)
  if (ok < ITEMS.length) process.exit(2)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
