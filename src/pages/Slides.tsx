import { useEffect, useRef, useState } from 'react'

type Slide = {
  title: string
  label: string
  highlights: string[]
  tone: 'brand' | 'matcha' | 'stone'
}

const SLIDES: Slide[] = [
  {
    title: '事業コンセプト',
    label: '焙煎玄米だけで、玄米茶の常識を焙き直す',
    highlights: [
      '宮城県・老舗焙煎玄米工場の事業継承',
      '祖父母→母→娘(20代)へとつなぐ、3世代の技術資産',
      '卸中心モデル → 自社ブランド+海外D2Cへシフト',
    ],
    tone: 'brand',
  },
  {
    title: '製品ラインナップ',
    label: '浅焙煎 ASA-HOU / 深焙煎 YORU-HOU の2種',
    highlights: [
      '浅焙煎: 軽やかで甘みが立つ。緑茶ブレンド/海外カフェ向け',
      '深焙煎: 香ばしさとコク。ノンカフェイン単体飲用',
      '"玄米茶の玄米だけ"という、カテゴリ内のニッチポジション',
    ],
    tone: 'matcha',
  },
  {
    title: 'カテゴリー構造',
    label: '緑茶/玄米茶/ほうじ茶/抹茶ラテ と焙煎玄米の関係',
    highlights: [
      '玄米茶は"緑茶+焙煎玄米"のブレンド飲料。焙煎玄米はOEM原料',
      '抹茶ラテ・ほうじ茶ラテなど新しい飲用文脈でも活用可能',
      '焙煎玄米を単品で売る設計は、国内・海外ともに競合が少ない',
    ],
    tone: 'stone',
  },
  {
    title: '海外需要',
    label: '日本茶は北米/欧州/東南アジアで継続拡大',
    highlights: [
      '抹茶・ほうじ茶に続き、"Genmaicha" も認知されつつある',
      '免疫・リラックス・ノンカフェイン訴求と親和性が高い',
      '海外価格は国内の2〜4倍が標準(高単価市場としての位置づけ)',
    ],
    tone: 'brand',
  },
  {
    title: '価格戦略',
    label: '卸 → 自社ブランド → 海外D2C の段階的アップレンジ',
    highlights: [
      '卸: kg単価ベース。粗利は薄いが回転が読める',
      '国内D2C: 100g缶/袋ベース。ストーリー原価×3〜5倍',
      '海外D2C: 同等SKUを2〜4倍で販売可能。送料は重量で最適化',
    ],
    tone: 'matcha',
  },
  {
    title: 'スモールスタート施策10選',
    label: 'コストを抑えつつ、独立ブランド化を立ち上げる10施策',
    highlights: [
      'Shopify/BASE/STORESなど最小構成ECから開始',
      'Instagram/TikTokで"顔の見える物語"を積み上げる',
      '商工会議所・地域金融機関・補助金との連携を初期から設計',
    ],
    tone: 'stone',
  },
]

const toneMap: Record<Slide['tone'], string> = {
  brand:
    'from-brand-900 via-brand-700 to-brand-500',
  matcha:
    'from-brand-800 via-brand-600 to-matcha-500',
  stone:
    'from-stone-900 via-brand-800 to-brand-600',
}

export default function Slides() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'))
            setCurrentSlide(idx)
          }
        })
      },
      { threshold: 0.5 },
    )
    slideRefs.current.forEach((ref) => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  const scrollToSlide = (idx: number) => {
    slideRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative">
      {/* Side navigation dots (desktop) */}
      <nav className="fixed right-3 top-1/2 z-10 hidden -translate-y-1/2 space-y-3 md:right-8 md:block">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className={`group flex items-center gap-2 ${
              currentSlide === i ? 'text-brand-700' : 'text-stone-400 hover:text-stone-600'
            }`}
            aria-label={s.title}
          >
            <span className="hidden rounded bg-white/90 px-2 py-0.5 text-xs font-medium shadow group-hover:inline">
              {s.title}
            </span>
            <span
              className={`block h-3 w-3 rounded-full border-2 transition ${
                currentSlide === i
                  ? 'border-brand-700 bg-brand-700 scale-125'
                  : 'border-stone-400 bg-white'
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Header */}
      <div className="mb-5 md:mb-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-px w-6 bg-brand-500" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
            HOU BRAND / BUSINESS SLIDES
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-stone-900 md:text-3xl">
          事業説明スライド
        </h1>
        <p className="mt-1 text-xs text-stone-600 md:text-sm">
          縦スクロールで全{SLIDES.length}スライドを閲覧できます。商談・説明会資料としてそのままご利用ください。
        </p>
      </div>

      {/* Mobile progress bar */}
      <div className="sticky top-[116px] z-10 mb-4 -mx-4 bg-stone-50/95 px-4 py-2 backdrop-blur md:hidden">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span className="font-semibold text-brand-700">
            Slide {currentSlide + 1} / {SLIDES.length}
          </span>
          <span className="truncate">{SLIDES[currentSlide]?.title}</span>
        </div>
        <div className="mt-1 h-1 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full bg-gradient-to-r from-brand-700 to-matcha-500 transition-all"
            style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Slides */}
      <div className="space-y-6 md:space-y-10">
        {SLIDES.map((slide, i) => (
          <section
            key={i}
            ref={(el: HTMLDivElement | null) => {
              slideRefs.current[i] = el
            }}
            data-idx={i}
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
          >
            <div className="border-b border-stone-100 bg-white/80 px-4 py-3 md:px-6 md:py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
                      Slide {String(i + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                    </span>
                    <div className="h-px w-6 bg-brand-500/50" />
                  </div>
                  <h2 className="mt-1 font-serif text-lg font-bold text-stone-900 md:text-2xl">
                    {slide.title}
                  </h2>
                  <p className="text-xs text-stone-500 md:text-sm">{slide.label}</p>
                </div>
                {i < SLIDES.length - 1 && (
                  <button
                    onClick={() => scrollToSlide(i + 1)}
                    className="flex-shrink-0 rounded-lg bg-stone-900 px-3 py-1.5 text-[10px] font-medium text-brand-200 hover:bg-stone-800 md:px-4 md:py-2 md:text-xs"
                  >
                    次へ ↓
                  </button>
                )}
              </div>
            </div>

            <div
              className={`bg-gradient-to-br ${toneMap[slide.tone]} px-6 py-10 text-white md:px-12 md:py-16`}
            >
              <div className="mx-auto max-w-3xl">
                <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 md:text-xs">
                  Slide {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mb-3 font-serif text-2xl font-bold leading-tight md:text-4xl">
                  {slide.title}
                </h3>
                <p className="mb-8 text-sm text-white/80 md:text-base">{slide.label}</p>
                <ul className="space-y-3 text-sm md:space-y-4 md:text-base">
                  {slide.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-white/80" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Back to top */}
      <div className="mt-10 flex justify-center md:mt-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="rounded-lg bg-gradient-to-r from-brand-700 to-brand-900 px-6 py-3 text-sm font-semibold text-white shadow hover:from-brand-600 hover:to-brand-800 md:text-base"
        >
          ↑ 先頭に戻る
        </button>
      </div>
    </div>
  )
}
