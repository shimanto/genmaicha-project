/**
 * public/packaging/pkg-XX.png を 100mm × 100mm の参考用 PDF に wrap して
 * public/packaging/pkg-XX.pdf として書き出すスクリプト。
 *
 * 用途: 印刷業者へのコンセプト共有用 (実寸ではなく PNG をそのまま埋め込んだもの)。
 *      本印刷には Illustrator でのベクター化と CMYK 変換が必要。
 *
 * 使い方: node scripts/build-print-pdfs.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { PDFDocument } from 'pdf-lib'

const PKG_DIR = path.resolve(process.cwd(), 'public', 'packaging')

// 1mm = 2.83465 PDF point
const MM = 2.83465
const PAGE_MM = 100 // 100mm × 100mm の正方形ページ
const MARGIN_MM = 5

function detectImage(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return 'png'
  }
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return 'jpg'
  }
  return 'unknown'
}

async function buildOne(pngFile) {
  const pngPath = path.join(PKG_DIR, pngFile)
  const bytes = readFileSync(pngPath)
  const fmt = detectImage(bytes)
  if (fmt === 'unknown') throw new Error('unknown image format')

  const pdf = await PDFDocument.create()
  pdf.setTitle(`焙 HOU 商品サンプル - ${pngFile}`)
  pdf.setAuthor('焙 HOU / 玄米茶ちゃん')
  pdf.setSubject('SAMPLE / Concept Design — Not Production-Ready')
  pdf.setKeywords(['SAMPLE', 'concept', 'genmaicha', 'HOU'])
  pdf.setCreator('genmaicha-project (build-print-pdfs.mjs)')

  const page = pdf.addPage([PAGE_MM * MM, PAGE_MM * MM])
  const img = fmt === 'png' ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes)

  const innerSize = (PAGE_MM - MARGIN_MM * 2) * MM
  page.drawImage(img, {
    x: MARGIN_MM * MM,
    y: MARGIN_MM * MM,
    width: innerSize,
    height: innerSize,
  })

  const out = path.join(PKG_DIR, pngFile.replace(/\.png$/, '.pdf'))
  writeFileSync(out, await pdf.save())
  return out
}

async function main() {
  const pngFiles = readdirSync(PKG_DIR)
    .filter((f) => /^pkg-\d+\.png$/.test(f))
    .sort()
  console.log(`[build-pdfs] ${pngFiles.length} 件 を変換`)

  let ok = 0
  for (const f of pngFiles) {
    try {
      const out = await buildOne(f)
      console.log(`  ✅ ${path.basename(out)}`)
      ok++
    } catch (e) {
      console.error(`  ❌ ${f}: ${e.message}`)
    }
  }
  console.log(`\n=== 完了: ${ok}/${pngFiles.length} ===`)
  if (ok < pngFiles.length) process.exit(2)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
