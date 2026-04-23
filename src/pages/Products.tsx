import { useMemo, useState } from 'react'
import {
  CATEGORIES,
  PRODUCTS,
  TOTAL_MEDIUM,
  TOTAL_SMALL_START,
  type Product,
  type ProductCategory,
} from '../data/products'

type Filter = 'all' | ProductCategory

const formatYen = (n: number) =>
  n === 0 ? 'ー' : `¥${n.toLocaleString()}`

export default function Products() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Product | null>(null)

  const filtered = useMemo(
    () => (filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter],
  )

  const filterCounts = useMemo(() => {
    const map = new Map<Filter, number>()
    map.set('all', PRODUCTS.length)
    for (const c of CATEGORIES) map.set(c, 0)
    for (const p of PRODUCTS) map.set(p.category, (map.get(p.category) ?? 0) + 1)
    return map
  }, [])

  return (
    <div className="space-y-10 md:space-y-14">
      {/* Header */}
      <header>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-px w-6 bg-brand-500" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
            PRODUCT LINEUP / 30 SKU SAMPLES
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-brand-900 md:text-3xl">
          商品ラインナップ — 30パターン サンプルデザイン
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-brand-800/80 md:text-sm">
          BASE 等 EC 出店時にすぐ使えることを想定した、焙 HOU 30 SKU の{' '}
          <strong className="text-brand-700">サンプル / 構想段階</strong>{' '}
          パッケージデザインです。価格・容量・最小ロット・外装概算コストは 2026年4月時点の
          市場相場をもとにした想定値で、実発売時に再見積りします。
        </p>
        <p className="mt-1 text-[11px] text-brand-700/60 md:text-xs">
          ※ 全画像は nano-banana-pro による生成。本印刷時はベクター化と CMYK 変換が必要です(下部の
          <a href="#print-guide" className="underline">印刷ガイド</a>を参照)。
        </p>

        {/* Sticky summary */}
        <div className="mt-5 grid gap-3 rounded-2xl border border-washi-200 bg-white p-4 shadow-sm md:grid-cols-3 md:p-5">
          <SummaryCell label="SKU 総数" value={`${PRODUCTS.length} 種`} sub="8カテゴリ" />
          <SummaryCell
            label="全SKU 最小ロット投資 合計"
            value={formatYen(TOTAL_SMALL_START)}
            sub="シール+外装のみ・茶葉除く"
          />
          <SummaryCell
            label="全SKU 中ロット投資 合計"
            value={formatYen(TOTAL_MEDIUM)}
            sub="販売軌道後を想定"
          />
        </div>
      </header>

      {/* Filter pills */}
      <section>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0">
          <FilterPill
            label="すべて"
            count={filterCounts.get('all') ?? 0}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          {CATEGORIES.map((c) => (
            <FilterPill
              key={c}
              label={c}
              count={filterCounts.get(c) ?? 0}
              active={filter === c}
              onClick={() => setFilter(c)}
            />
          ))}
        </div>
      </section>

      {/* Matrix grid */}
      <section>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="group flex flex-col overflow-hidden rounded-xl border border-washi-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden bg-washi-100">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement
                    img.style.display = 'none'
                  }}
                />
                <span className="absolute left-2 top-2 rounded bg-brand-900/80 px-1.5 py-0.5 text-[9px] font-mono font-semibold text-brand-100 md:text-[10px]">
                  No.{String(p.no).padStart(2, '0')}
                </span>
                <span className="absolute right-2 top-2 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-brand-700 md:text-[10px]">
                  {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3">
                <div className="font-serif text-xs font-bold text-brand-900 md:text-sm">
                  {p.name}
                </div>
                <div className="text-[10px] text-brand-700/60 md:text-xs">
                  {p.weight} / {formatYen(p.retailPrice)}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-washi-100 pt-2 text-[10px] text-brand-700/70 md:text-xs">
                  <span>最小 {p.smallStartLot}個〜</span>
                  <span className="font-semibold text-brand-700">
                    {formatYen(p.smallStartTotal)}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Roadmap section */}
      <section className="rounded-2xl border border-washi-200 bg-white p-5 shadow-sm md:p-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-matcha-600 md:text-xs">
              Sales Roadmap (2026-2028)
            </div>
            <h2 className="font-serif text-xl font-bold text-brand-900 md:text-2xl">
              玄米茶ちゃんの販売ロードマップ
            </h2>
            <p className="mt-1 text-xs text-brand-800/70 md:text-sm">
              縦長 1 枚に 6 段階を凝縮した図解漫画(クレヨンしんちゃん風)。
              スマホで縦スクロール、PC では中央寄せで表示します。
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/roadmap/roadmap-manga.png"
            alt="販売ロードマップ漫画"
            className="w-full max-w-md rounded-xl shadow-lg"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement
              img.replaceWith(roadmapPlaceholder())
            }}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/roadmap/roadmap-manga.png"
            download
            className="rounded-lg bg-brand-700 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-brand-800 md:text-sm"
          >
            ロードマップ漫画 PNG をDL
          </a>
        </div>
      </section>

      {/* Print guide CTA */}
      <section
        id="print-guide"
        className="rounded-2xl bg-gradient-to-br from-brand-900 to-brand-700 p-6 text-white md:p-10"
      >
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-100 md:text-xs">
          Print Guide
        </div>
        <h2 className="mb-2 font-serif text-xl font-bold md:text-2xl">
          シール・ラベル印刷の方式検討
        </h2>
        <p className="mb-5 text-xs leading-relaxed text-brand-100/90 md:text-sm">
          ラスクル / プリントネット / プリントパック / 山櫻 / ISC ルクサインの 5 業者と
          自宅プリントを比較。<strong className="text-white">¥3,000〜¥12,000</strong> から
          スモールスタートできる組み合わせ例も提示しています。
        </p>
        <a
          href="/#documents"
          className="inline-flex rounded-lg bg-white px-5 py-2.5 text-xs font-semibold text-brand-800 shadow hover:bg-brand-50 md:text-sm"
        >
          資料タブで全文を読む →
        </a>
      </section>

      {/* Modal */}
      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

function SummaryCell({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="rounded-lg border border-washi-100 bg-washi-50 p-3 md:p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-matcha-600 md:text-xs">
        {label}
      </div>
      <div className="mt-1 font-serif text-xl font-bold text-brand-900 md:text-2xl">
        {value}
      </div>
      {sub && <div className="text-[10px] text-brand-700/60 md:text-xs">{sub}</div>}
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

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-800 shadow hover:bg-brand-50 md:text-sm"
          aria-label="閉じる"
        >
          ✕ 閉じる
        </button>

        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-washi-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement
              img.style.display = 'none'
            }}
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            <span className="rounded bg-brand-900/85 px-2 py-0.5 text-xs font-mono font-bold text-brand-100">
              No.{String(product.no).padStart(2, '0')}
            </span>
            <span className="rounded bg-white/95 px-2 py-0.5 text-xs font-semibold text-brand-700">
              {product.category}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 md:p-7">
          <div className="mb-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-matcha-600 md:text-xs">
              {product.nameEn}
            </div>
            <h3 className="mt-1 font-serif text-xl font-bold text-brand-900 md:text-2xl">
              {product.name}
            </h3>
            <div className="mt-1 text-xs text-brand-700/70 md:text-sm">
              <span className="font-semibold text-brand-800">{product.weight}</span> /{' '}
              <span className="font-serif text-base font-bold text-brand-900 md:text-lg">
                {formatYen(product.retailPrice)}
              </span>
              <span className="text-[10px]">(税込)</span>
            </div>
          </div>

          {/* Spec table */}
          <div className="mb-5 overflow-hidden rounded-lg border border-washi-200">
            <SpecRow label="サイズ" value={product.dimensions} />
            <SpecRow label="素材" value={product.material} />
            <SpecRow label="シール仕様" value={product.sticker} />
            <SpecRow
              label="外装1個あたり概算"
              value={`${formatYen(product.packagingUnitCost)} (シール+容器、茶葉除く)`}
            />
          </div>

          {/* Lots */}
          <div className="mb-5 grid gap-3 md:grid-cols-2">
            <LotCell
              title="スモールスタート"
              accent="matcha"
              lot={product.smallStartLot}
              total={product.smallStartTotal}
              note="数千円〜数万円で試すロット"
            />
            <LotCell
              title="中ロット"
              accent="brand"
              lot={product.mediumLot}
              total={product.mediumTotal}
              note="販売軌道後の補充想定"
            />
          </div>

          {/* Notes */}
          {product.notes && (
            <div className="mb-5 rounded-lg border-l-4 border-brand-500 bg-washi-50 px-4 py-3 text-xs leading-relaxed text-brand-800 md:text-sm">
              💡 {product.notes}
            </div>
          )}

          {/* Downloads */}
          <div className="rounded-lg bg-washi-50 p-4">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-matcha-600 md:text-xs">
              印刷業者向けダウンロード(SAMPLE)
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <a
                href={product.image}
                download={`hou-${product.id}.png`}
                className="flex-1 rounded-lg bg-brand-700 px-4 py-2.5 text-center text-xs font-semibold text-white shadow hover:bg-brand-800 md:text-sm"
              >
                ⬇ PNG (1024px) をDL
              </a>
              <a
                href={product.printPdf}
                download={`hou-${product.id}.pdf`}
                className="flex-1 rounded-lg border border-brand-700 px-4 py-2.5 text-center text-xs font-semibold text-brand-700 hover:bg-brand-50 md:text-sm"
              >
                ⬇ PDF (100mm 角) をDL
              </a>
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-brand-700/70 md:text-xs">
              ⚠ 本データは <strong>nano-banana-pro による生成サンプル</strong> です。
              本印刷前に Illustrator でのベクター化・CMYK変換・食品表示の正規レイアウトが必要。
              プロデザイナー依頼の参考: ¥80,000〜200,000(全SKU一式)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] border-b border-washi-200 last:border-b-0">
      <div className="bg-washi-100 px-3 py-2 text-[10px] font-semibold text-brand-700 md:text-xs">
        {label}
      </div>
      <div className="px-3 py-2 text-xs text-brand-800 md:text-sm">{value}</div>
    </div>
  )
}

function LotCell({
  title,
  accent,
  lot,
  total,
  note,
}: {
  title: string
  accent: 'matcha' | 'brand'
  lot: number
  total: number
  note: string
}) {
  const colorMap = {
    matcha: 'border-matcha-300 bg-matcha-400/10 text-matcha-700',
    brand: 'border-brand-300 bg-brand-50 text-brand-700',
  }
  return (
    <div className={`rounded-lg border ${colorMap[accent]} p-3`}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] md:text-xs">
        {title}
      </div>
      <div className="mt-1 text-xs text-brand-800 md:text-sm">
        最小ロット <strong className="font-semibold">{lot}個</strong>
      </div>
      <div className="mt-1 font-serif text-lg font-bold text-brand-900 md:text-xl">
        {formatYen(total)}
      </div>
      <div className="mt-0.5 text-[10px] text-brand-700/60 md:text-xs">{note}</div>
    </div>
  )
}

function roadmapPlaceholder(): HTMLElement {
  const div = document.createElement('div')
  div.className =
    'flex aspect-[9/16] w-full max-w-md items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 via-washi-100 to-matcha-100 text-brand-700/60'
  div.innerHTML = `<div class="text-center px-4">
    <div class="font-serif text-lg font-bold">ロードマップ漫画</div>
    <div class="mt-2 text-xs">画像未生成 / agent/generate-roadmap-manga.js を実行してください</div>
  </div>`
  return div
}
