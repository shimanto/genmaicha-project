import { useEffect, useRef, useState } from 'react'

type Panel = {
  title: string
  caption: string
  keyPoint: string
  image: string
}

const PANELS: Panel[] = [
  {
    title: '第1話 — 玄米茶ちゃん、参上!',
    caption:
      '宮城の山あいに佇む、創業70年の焙煎玄米工場。祖父母から母、そして4代目の「玄米茶ちゃん」へ。',
    keyPoint: '創業1956年 / 宮城県 / 焙煎玄米ひと筋70年',
    image: '/biz-manga/biz-01.png',
  },
  {
    title: '第2話 — 焙煎玄米ってなに?',
    caption:
      '玄米を200℃の釜で「はぜる」まで焙煎。ノンカフェインで香ばしく、栄養価も高い単一素材の茶葉。',
    keyPoint: '200℃焙煎 × ノンカフェイン × 栄養満点',
    image: '/biz-manga/biz-02.png',
  },
  {
    title: '第3話 — 国内市場のチャンス',
    caption:
      '国内のノンカフェイン飲料市場は年+12%成長。玄米茶はブレンド品が85%を占め、単一素材の焙煎玄米はわずか15%。ここに狙いがあります。',
    keyPoint: '市場年+12%成長 / 単一素材シェア15%',
    image: '/biz-manga/biz-03.png',
  },
  {
    title: '第4話 — お米の値段が高騰!? ピンチ!',
    caption:
      '2024年から続くお米の値上がり。玄米仕入れ価格は2年で+60%上昇しました。小規模工場にとって、原材料高騰は死活問題です。',
    keyPoint: '玄米仕入れ価格 ¥480 → ¥770 (+60%)',
    image: '/biz-manga/biz-04.png',
  },
  {
    title: '第5話 — だからこそ、直販と付加価値',
    caption:
      '卸だけではコスト吸収できない。D2C直販にシフトして利益率15%→45%へ。¥500お試しセットで参入障壁を下げ、新規顧客を獲得します。',
    keyPoint: '直販利益率 3倍 / お試しセット ¥500',
    image: '/biz-manga/biz-05.png',
  },
  {
    title: '第6話 — 海の向こうでも「Genmaicha」',
    caption:
      '北米・欧州・東南アジアで日本茶ブームが拡大。海外での「Genmaicha」検索数は年+34%成長し、単一素材の高品質ロットが求められています。',
    keyPoint: '「Genmaicha」検索 年+34% (北米)',
    image: '/biz-manga/biz-06.png',
  },
  {
    title: '第7話 — BASE でオープン!',
    caption:
      'ECプラットフォーム BASE で小さく始動。初期費用¥0、最短1日で開店できるスモールスタートに最適な環境です。',
    keyPoint: '初期費用 ¥0 / 最短1日開店',
    image: '/biz-manga/biz-07.png',
  },
  {
    title: '第8話 — まずは¥500お試しから!',
    caption:
      '最初の一歩は¥500お試しセット。朝の焙(浅焙煎)と夜の焙(深焙煎)を10gずつ、飲み方カード付きで送料込み。',
    keyPoint: '¥500 / 送料込み / 朝の焙 + 夜の焙',
    image: '/biz-manga/biz-08.png',
  },
]

type ShopNav = () => void

export default function BizStory({ onNavigateShop }: { onNavigateShop?: ShopNav }) {
  const [current, setCurrent] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'))
            setCurrent(idx)
          }
        })
      },
      { threshold: 0.5 },
    )
    refs.current.forEach((ref) => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (idx: number) => {
    refs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative">
      <nav className="fixed right-3 top-1/2 z-10 hidden -translate-y-1/2 space-y-3 md:right-8 md:block">
        {PANELS.map((p, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`group flex items-center gap-2 ${
              current === i ? 'text-brand-700' : 'text-brand-700/40 hover:text-brand-700/70'
            }`}
            aria-label={p.title}
          >
            <span className="hidden rounded bg-white/95 px-2 py-0.5 text-xs font-medium shadow group-hover:inline">
              {p.title}
            </span>
            <span
              className={`block h-3 w-3 rounded-full border-2 transition ${
                current === i
                  ? 'border-brand-700 bg-brand-700 scale-125'
                  : 'border-brand-700/40 bg-white'
              }`}
            />
          </button>
        ))}
      </nav>

      <div className="mb-5 md:mb-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-px w-6 bg-brand-500" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
            BUSINESS STORY / 全8話
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-brand-900 md:text-3xl">
          玄米茶ちゃんの事業説明 — 8コマ図解ストーリー
        </h1>
        <p className="mt-1 text-xs text-brand-800/70 md:text-sm">
          クレヨンしんちゃん風にアレンジした玄米茶ちゃんと一緒に、焙煎玄米ビジネスを8コマの図解漫画で解説します。
          お米高騰というリアルな課題と、それをチャンスに変える戦略までカバー。
        </p>
      </div>

      <div className="sticky top-[116px] z-10 mb-4 -mx-4 bg-washi-50/95 px-4 py-2 backdrop-blur md:hidden">
        <div className="flex items-center justify-between text-xs text-brand-800/70">
          <span className="font-semibold text-brand-700">
            Episode {current + 1} / {PANELS.length}
          </span>
          <span className="truncate">{PANELS[current]?.title}</span>
        </div>
        <div className="mt-1 h-1 overflow-hidden rounded-full bg-washi-200">
          <div
            className="h-full bg-gradient-to-r from-brand-700 to-matcha-500 transition-all"
            style={{ width: `${((current + 1) / PANELS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6 md:space-y-10">
        {PANELS.map((p, i) => (
          <section
            key={i}
            ref={(el: HTMLDivElement | null) => {
              refs.current[i] = el
            }}
            data-idx={i}
            className="overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm"
          >
            <div className="border-b border-washi-200 bg-washi-50 px-4 py-3 md:px-6 md:py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
                      Episode {String(i + 1).padStart(2, '0')} / {String(PANELS.length).padStart(2, '0')}
                    </span>
                    <div className="h-px w-6 bg-brand-500/50" />
                  </div>
                  <h2 className="mt-1 font-serif text-lg font-bold text-brand-900 md:text-2xl">
                    {p.title}
                  </h2>
                </div>
                {i < PANELS.length - 1 && (
                  <button
                    onClick={() => scrollTo(i + 1)}
                    className="flex-shrink-0 rounded-lg bg-brand-900 px-3 py-1.5 text-[10px] font-medium text-brand-200 hover:bg-brand-800 md:px-4 md:py-2 md:text-xs"
                  >
                    次へ ↓
                  </button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-[1fr_340px]">
              <div className="flex items-center justify-center bg-washi-100 p-3 md:p-6">
                <img
                  src={p.image}
                  alt={`${p.title} - ${p.caption}`}
                  className="max-h-[70vh] w-auto rounded-lg shadow-lg"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement
                    img.replaceWith(placeholder(p.title))
                  }}
                />
              </div>
              <div className="border-t border-washi-200 p-5 md:border-l md:border-t-0 md:p-6">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-matcha-600 md:text-xs">
                  Caption
                </div>
                <p className="text-sm leading-relaxed text-brand-800 md:text-base">
                  {p.caption}
                </p>
                <div className="mt-5 rounded-lg border border-brand-200 bg-brand-50 p-4">
                  <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
                    Key Point
                  </div>
                  <div className="font-serif text-sm font-bold text-brand-900 md:text-base">
                    {p.keyPoint}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 md:mt-12">
        {onNavigateShop && (
          <button
            onClick={onNavigateShop}
            className="rounded-lg bg-gradient-to-r from-brand-700 to-brand-900 px-8 py-4 text-base font-semibold text-white shadow hover:from-brand-600 hover:to-brand-800 md:text-lg"
          >
            お試しセット ¥500 を見る →
          </button>
        )}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs text-brand-700/70 underline md:text-sm"
        >
          ↑ 先頭に戻る
        </button>
      </div>
    </div>
  )
}

function placeholder(title: string): HTMLElement {
  const div = document.createElement('div')
  div.className =
    'flex aspect-square w-full max-w-md items-center justify-center rounded-lg bg-gradient-to-br from-brand-100 via-washi-100 to-matcha-100 text-brand-700/60'
  const inner = document.createElement('div')
  inner.className = 'text-center px-4'
  inner.innerHTML = `
    <div class="font-serif text-lg font-bold">${title}</div>
    <div class="mt-2 text-xs">画像未生成 / agent/generate-biz-manga.js を実行してください</div>
  `
  div.appendChild(inner)
  return div
}
