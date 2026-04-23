import { useMemo, useState } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import PptxGenJS from 'pptxgenjs'
import {
  CATEGORIES,
  PRODUCTS,
  TEA_COST_PER_G,
  packagingMarginPct,
  profit,
  profitMarginPct,
  teaCost,
  teaMarginPct,
  type Product,
  type ProductCategory,
  type Revision,
} from '../data/products'

type Filter = 'all' | ProductCategory

const yen = (n: number) => `¥${n.toLocaleString()}`
const pct = (n: number) => `${n.toFixed(1)}%`

type Row = {
  no: number
  id: string
  name: string
  category: string
  weight: string
  smallStartLot: number
  retailPrice: number
  packagingUnitCost: number
  packagingPct: number
  teaUnitCost: number
  teaPct: number
  profit: number
  marginPct: number
}

function buildRow(p: Product): Row {
  return {
    no: p.no,
    id: p.id,
    name: p.name,
    category: p.category,
    weight: p.weight,
    smallStartLot: p.smallStartLot,
    retailPrice: p.retailPrice,
    packagingUnitCost: p.packagingUnitCost,
    packagingPct: packagingMarginPct(p),
    teaUnitCost: teaCost(p),
    teaPct: teaMarginPct(p),
    profit: profit(p),
    marginPct: profitMarginPct(p),
  }
}

export default function Costing() {
  const [filter, setFilter] = useState<Filter>('all')

  const rows = useMemo(() => {
    const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)
    return list.map(buildRow)
  }, [filter])

  const totals = useMemo(() => {
    const sumRetail = rows.reduce((s, r) => s + r.retailPrice, 0)
    const sumPkg = rows.reduce((s, r) => s + r.packagingUnitCost, 0)
    const sumTea = rows.reduce((s, r) => s + r.teaUnitCost, 0)
    const sumProfit = rows.reduce((s, r) => s + r.profit, 0)
    return {
      retail: sumRetail,
      pkg: sumPkg,
      tea: sumTea,
      profit: sumProfit,
      marginPct: sumRetail > 0 ? (sumProfit / sumRetail) * 100 : 0,
    }
  }, [rows])

  // フラットな改定履歴 (新しい順)
  const allRevisions = useMemo(() => {
    const flat: { product: Product; rev: Revision }[] = []
    for (const p of PRODUCTS) {
      for (const r of p.revisions ?? []) {
        flat.push({ product: p, rev: r })
      }
    }
    flat.sort((a, b) => (a.rev.date < b.rev.date ? 1 : -1))
    return flat
  }, [])

  return (
    <div className="space-y-10 md:space-y-14">
      {/* Header */}
      <header>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-px w-6 bg-brand-500" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
            COST &amp; MARGIN TABLE
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-brand-900 md:text-3xl">
          原価表 — 商品別 外装 / 茶葉 / 利益率
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-brand-800/80 md:text-sm">
          画像なしの数表中心ページ。
          <strong className="text-brand-700">外装原価率は 10% 以下が目標</strong>、
          茶葉原価は <strong>{TEA_COST_PER_G * 1000} 円/kg</strong>{' '}
          (2024年からの高騰価格) で計算しています。
          原価を見直したい場合は{' '}
          <code className="rounded bg-washi-100 px-1 py-0.5 text-[11px]">
            src/data/products.ts
          </code>{' '}
          の <code>packagingUnitCost</code> を更新し、
          <code>revisions[]</code> に履歴を追記してください(下部「改定履歴」参照)。
        </p>

        {/* Download buttons */}
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => downloadPdf(rows)}
            className="rounded-lg bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow hover:bg-brand-800 md:text-sm"
          >
            ⬇ 原価表 PDF をDL
          </button>
          <button
            onClick={() => downloadPptx(rows)}
            className="rounded-lg bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white shadow hover:bg-orange-700 md:text-sm"
          >
            ⬇ 原価表 PowerPoint をDL
          </button>
          <button
            onClick={() => downloadCsv(rows)}
            className="rounded-lg border border-brand-700 px-5 py-2.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 md:text-sm"
          >
            ⬇ CSV をDL (Excel互換)
          </button>
        </div>
      </header>

      {/* Filter + Totals */}
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
          <FilterPill
            label="すべて"
            count={PRODUCTS.length}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          {CATEGORIES.map((c) => {
            const cnt = PRODUCTS.filter((p) => p.category === c).length
            return (
              <FilterPill
                key={c}
                label={c}
                count={cnt}
                active={filter === c}
                onClick={() => setFilter(c)}
              />
            )
          })}
        </div>
        <div className="rounded-lg bg-washi-50 px-4 py-3 text-xs text-brand-800 md:text-sm">
          {filter === 'all' ? '全' : filter} {rows.length} SKU 合計平均利益率:
          <strong className="ml-2 font-serif text-base text-brand-900 md:text-lg">
            {pct(totals.marginPct)}
          </strong>
        </div>
      </section>

      {/* Table */}
      <section className="overflow-x-auto rounded-2xl border border-washi-200 bg-white shadow-sm">
        <table className="w-full text-xs md:text-sm">
          <thead className="bg-brand-900 text-brand-100">
            <tr>
              <Th>No.</Th>
              <Th>商品名</Th>
              <Th>SKU 名</Th>
              <Th>カテゴリ</Th>
              <Th align="right">最小ロット</Th>
              <Th align="right">設定価格</Th>
              <Th align="right">外装原価 (率)</Th>
              <Th align="right">茶葉原価 (率)</Th>
              <Th align="right">利益 (率)</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-washi-200 last:border-b-0 hover:bg-washi-50">
                <Td className="font-mono text-brand-700">
                  {String(r.no).padStart(2, '0')}
                </Td>
                <Td>
                  <div className="font-semibold text-brand-900">{r.name}</div>
                  <div className="text-[10px] text-brand-700/60 md:text-xs">{r.weight}</div>
                </Td>
                <Td className="font-mono text-brand-800">{r.id}</Td>
                <Td>
                  <span className="rounded bg-washi-100 px-1.5 py-0.5 text-[10px] font-semibold text-brand-700 md:text-xs">
                    {r.category}
                  </span>
                </Td>
                <Td align="right" className="font-mono">
                  {r.smallStartLot}個
                </Td>
                <Td align="right" className="font-mono font-semibold text-brand-900">
                  {yen(r.retailPrice)}
                </Td>
                <Td align="right">
                  <div className="font-mono">{yen(r.packagingUnitCost)}</div>
                  <div
                    className={`text-[10px] md:text-xs ${
                      r.packagingPct <= 10 ? 'text-matcha-600' : 'text-orange-600'
                    }`}
                  >
                    {r.retailPrice > 0 ? pct(r.packagingPct) : 'ー'}
                  </div>
                </Td>
                <Td align="right">
                  <div className="font-mono">{yen(r.teaUnitCost)}</div>
                  <div className="text-[10px] text-brand-700/60 md:text-xs">
                    {r.retailPrice > 0 ? pct(r.teaPct) : 'ー'}
                  </div>
                </Td>
                <Td align="right">
                  <div className="font-mono font-semibold text-brand-900">{yen(r.profit)}</div>
                  <div
                    className={`text-[10px] font-semibold md:text-xs ${
                      r.marginPct >= 50
                        ? 'text-matcha-600'
                        : r.marginPct >= 30
                          ? 'text-brand-700'
                          : 'text-orange-600'
                    }`}
                  >
                    {r.retailPrice > 0 ? pct(r.marginPct) : 'ー'}
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-washi-50 font-semibold">
            <tr>
              <Td colSpan={5} className="text-right text-brand-700">
                合計 {rows.length} SKU
              </Td>
              <Td align="right" className="font-mono text-brand-900">
                {yen(totals.retail)}
              </Td>
              <Td align="right" className="font-mono text-brand-900">
                {yen(totals.pkg)}
              </Td>
              <Td align="right" className="font-mono text-brand-900">
                {yen(totals.tea)}
              </Td>
              <Td align="right" className="font-mono text-brand-900">
                {yen(totals.profit)}
                <div className="text-[10px] font-bold text-matcha-700">
                  平均 {pct(totals.marginPct)}
                </div>
              </Td>
            </tr>
          </tfoot>
        </table>
      </section>

      {/* SKU naming rule */}
      <section className="rounded-2xl border border-washi-200 bg-white p-5 shadow-sm md:p-7">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-matcha-600 md:text-xs">
          SKU Naming Rule
        </div>
        <h2 className="mb-3 font-serif text-xl font-bold text-brand-900 md:text-2xl">
          SKU ID のネーミングルール(簡単に)
        </h2>
        <p className="mb-4 text-xs leading-relaxed text-brand-800 md:text-sm">
          SKU ID は{' '}
          <code className="rounded bg-washi-100 px-1.5 py-0.5 text-[11px]">
            {'{容器カテゴリ}-{ロースト/系統}-{容量g or 個数}'}
          </code>{' '}
          のハイフン区切り 3 段(または 4 段)で命名しています。例:{' '}
          <code className="rounded bg-brand-50 px-1.5 py-0.5 text-[11px]">can-asa-100</code>{' '}
          = 缶(can) × 朝の焙(asa) × 100g。
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <NameRule
            head="容器カテゴリ"
            items={[
              ['can', 'アルミ缶 (国内 缶パッケージ)'],
              ['pouch', 'スタンドパウチ / クラフト袋'],
              ['try', 'お試しセット (¥500/¥980/¥1000…)'],
              ['export', '海外向け export tin'],
              ['gift', 'ギフト・季節商品'],
              ['tb', 'ティーバッグ'],
              ['syrup', '焙煎玄米シロップ等'],
              ['sticker', 'シール単体'],
            ]}
          />
          <NameRule
            head="ロースト/系統"
            items={[
              ['asa', '朝の焙 (浅焙煎)'],
              ['yoru', '夜の焙 (深焙煎)'],
              ['hachi', '蜂蜜ブレンド (季節)'],
              ['light / dark', '海外向けの浅 / 深'],
              ['discovery / premium / subscription', 'ギフト箱グレード'],
              ['tri / premium / blend', '三角/個包装/ブレンド (TB)'],
              ['pro / refill', '業務用 / 詰替'],
              ['father / mother', '父の日 / 母の日'],
            ]}
          />
        </div>
        <div className="mt-4 rounded-lg border-l-4 border-brand-500 bg-washi-50 px-4 py-3 text-[11px] leading-relaxed text-brand-800 md:text-xs">
          💡 <strong>例外</strong>: <code>try-980-flight</code> のように 4 段を使うのは、
          同カテゴリ内で価格と形態の両方を区別したい場合のみ。新規 SKU を追加する際は
          まず 3 段で命名し、衝突が起きたら 4 段目を加える方針です。
        </div>
      </section>

      {/* Revision history */}
      <section className="rounded-2xl border border-washi-200 bg-white p-5 shadow-sm md:p-7">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-matcha-600 md:text-xs">
          Revision History
        </div>
        <h2 className="mb-1 font-serif text-xl font-bold text-brand-900 md:text-2xl">
          改定履歴(時系列・新しい順)
        </h2>
        <p className="mb-5 text-xs leading-relaxed text-brand-800/80 md:text-sm">
          パッケージ設計や原価を改定した記録。古い版もここで閲覧できるので、
          意思決定の経緯を後から追えます。新しい改定は{' '}
          <code className="rounded bg-washi-100 px-1.5 py-0.5 text-[11px]">
            products.ts
          </code>{' '}
          の該当 SKU に <code>revisions[]</code> エントリを追加してください。
        </p>

        {allRevisions.length === 0 ? (
          <div className="rounded-lg bg-washi-50 px-4 py-5 text-center text-xs text-brand-700/60 md:text-sm">
            まだ改定履歴はありません
          </div>
        ) : (
          <ol className="space-y-4">
            {allRevisions.map(({ product, rev }, i) => (
              <li
                key={`${product.id}-${rev.date}-${i}`}
                className="overflow-hidden rounded-xl border border-washi-200"
              >
                <div className="flex flex-wrap items-center gap-2 border-b border-washi-200 bg-washi-50 px-4 py-2.5 text-[10px] md:text-xs">
                  <span className="font-mono font-semibold text-brand-700">{rev.date}</span>
                  <span className="rounded bg-brand-700 px-1.5 py-0.5 text-white">
                    No.{String(product.no).padStart(2, '0')} {product.name.split(' ')[0]}
                  </span>
                  <span className="rounded bg-orange-100 px-1.5 py-0.5 font-semibold text-orange-700">
                    {rev.field}
                  </span>
                  <span className="font-mono text-brand-700/70">{product.id}</span>
                </div>
                <div className="grid gap-3 p-4 md:grid-cols-2 md:gap-5">
                  <div>
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-600 md:text-xs">
                      改定前
                    </div>
                    <div className="text-xs leading-relaxed text-brand-800 md:text-sm">
                      {rev.before}
                    </div>
                    {rev.beforeCost !== undefined && (
                      <div className="mt-2 font-mono text-xs text-orange-700 md:text-sm">
                        外装原価: {yen(rev.beforeCost)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-matcha-600 md:text-xs">
                      改定後
                    </div>
                    <div className="text-xs leading-relaxed text-brand-800 md:text-sm">
                      {rev.after}
                    </div>
                    {rev.afterCost !== undefined && (
                      <div className="mt-2 font-mono text-xs text-matcha-700 md:text-sm">
                        外装原価: {yen(rev.afterCost)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-t border-washi-200 bg-washi-50 px-4 py-2.5 text-xs text-brand-800 md:text-sm">
                  <strong className="font-semibold text-brand-700">理由:</strong> {rev.reason}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition md:text-sm ${
        active
          ? 'bg-brand-700 text-white shadow-sm'
          : 'border border-washi-200 bg-white text-brand-700 hover:bg-washi-100'
      }`}
    >
      <span>{label}</span>
      <span
        className={`rounded-full px-1.5 text-[10px] ${
          active ? 'bg-brand-900/40 text-brand-100' : 'bg-washi-200 text-brand-800'
        }`}
      >
        {count}
      </span>
    </button>
  )
}

function NameRule({ head, items }: { head: string; items: [string, string][] }) {
  return (
    <div className="rounded-lg border border-washi-200 bg-washi-50 p-4">
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
        {head}
      </div>
      <ul className="space-y-1.5 text-xs md:text-sm">
        {items.map(([k, v]) => (
          <li key={k} className="flex items-baseline gap-2">
            <code className="flex-shrink-0 rounded bg-white px-1.5 py-0.5 font-mono text-[11px] text-brand-700 md:text-xs">
              {k}
            </code>
            <span className="text-brand-800">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Th({ children, align }: { children: React.ReactNode; align?: 'right' }) {
  return (
    <th
      className={`whitespace-nowrap px-3 py-2.5 font-semibold ${
        align === 'right' ? 'text-right' : 'text-left'
      } md:px-4 md:py-3`}
    >
      {children}
    </th>
  )
}

function Td({
  children,
  align,
  className = '',
  colSpan,
}: {
  children: React.ReactNode
  align?: 'right'
  className?: string
  colSpan?: number
}) {
  return (
    <td
      colSpan={colSpan}
      className={`px-3 py-2.5 align-top md:px-4 md:py-3 ${
        align === 'right' ? 'text-right' : 'text-left'
      } ${className}`}
    >
      {children}
    </td>
  )
}

// ===== Downloads =====

const HEADERS = [
  'No.',
  '商品名',
  'SKU 名',
  'カテゴリ',
  '最小ロット',
  '設定価格',
  '外装原価',
  '外装原価率',
  '茶葉原価',
  '茶葉原価率',
  '利益',
  '利益率',
]

function rowToArray(r: Row): (string | number)[] {
  return [
    String(r.no).padStart(2, '0'),
    r.name,
    r.id,
    r.category,
    `${r.smallStartLot}個`,
    yen(r.retailPrice),
    yen(r.packagingUnitCost),
    r.retailPrice > 0 ? pct(r.packagingPct) : 'ー',
    yen(r.teaUnitCost),
    r.retailPrice > 0 ? pct(r.teaPct) : 'ー',
    yen(r.profit),
    r.retailPrice > 0 ? pct(r.marginPct) : 'ー',
  ]
}

function downloadCsv(rows: Row[]) {
  const csv = [
    HEADERS.join(','),
    ...rows.map((r) => rowToArray(r).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')),
  ].join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  triggerDownload(blob, `hou-cost-${todayISO()}.csv`)
}

async function downloadPdf(rows: Row[]) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  doc.setFont('helvetica')
  doc.setFontSize(14)
  doc.text('Hou / Genmaicha-chan - Product Cost Table', 14, 15)
  doc.setFontSize(9)
  doc.text(
    `Generated: ${todayISO()} | ${rows.length} SKU | Tea cost: ¥${TEA_COST_PER_G}/g`,
    14,
    21,
  )

  autoTable(doc, {
    head: [HEADERS],
    body: rows.map(rowToArray),
    startY: 25,
    styles: { font: 'helvetica', fontSize: 7 },
    headStyles: { fillColor: [96, 52, 25], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [253, 248, 240] },
    margin: { left: 8, right: 8 },
  })

  const blob = doc.output('blob')
  triggerDownload(blob, `hou-cost-${todayISO()}.pdf`)
}

async function downloadPptx(rows: Row[]) {
  const pptx = new PptxGenJS()
  pptx.layout = 'LAYOUT_WIDE'

  // Title slide
  const title = pptx.addSlide()
  title.background = { color: '603419' }
  title.addText('焙 HOU / 玄米茶ちゃん 商品原価表', {
    x: 0.5,
    y: 1.5,
    w: 12,
    h: 1.2,
    fontSize: 36,
    bold: true,
    color: 'FFFFFF',
    fontFace: 'Yu Gothic',
  })
  title.addText(
    `Generated: ${todayISO()} | ${rows.length} SKU | Tea cost: ¥${TEA_COST_PER_G}/g`,
    {
      x: 0.5,
      y: 3,
      w: 12,
      h: 0.5,
      fontSize: 14,
      color: 'F3D8AA',
      fontFace: 'Yu Gothic',
    },
  )

  // Table slide(s)
  const ROWS_PER_SLIDE = 14
  for (let i = 0; i < rows.length; i += ROWS_PER_SLIDE) {
    const chunk = rows.slice(i, i + ROWS_PER_SLIDE)
    const slide = pptx.addSlide()
    slide.addText(
      `商品原価表 (${i + 1}〜${i + chunk.length}/${rows.length})`,
      {
        x: 0.3,
        y: 0.2,
        w: 12,
        h: 0.4,
        fontSize: 16,
        bold: true,
        color: '603419',
        fontFace: 'Yu Gothic',
      },
    )

    const tableRows = [
      HEADERS.map((h) => ({
        text: h,
        options: { bold: true, color: 'FFFFFF', fill: { color: '603419' }, align: 'center' as const },
      })),
      ...chunk.map((r) =>
        rowToArray(r).map((v, idx) => ({
          text: String(v),
          options: {
            align: idx < 4 ? ('left' as const) : ('right' as const),
            fontSize: 9,
            fill: { color: 'FDF8F0' },
          },
        })),
      ),
    ]

    slide.addTable(tableRows, {
      x: 0.3,
      y: 0.7,
      w: 12.7,
      colW: [0.5, 2.6, 1.6, 1.0, 0.9, 0.9, 0.9, 0.8, 0.9, 0.8, 0.9, 0.8],
      fontSize: 9,
      fontFace: 'Yu Gothic',
      border: { type: 'solid', pt: 0.5, color: 'CCCCCC' },
    })
  }

  const buf = await pptx.write({ outputType: 'blob' })
  triggerDownload(buf as Blob, `hou-cost-${todayISO()}.pptx`)
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function todayISO(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
