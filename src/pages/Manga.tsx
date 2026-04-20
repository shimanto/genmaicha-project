import { useEffect, useRef, useState } from 'react'

type Page = {
  title: string
  caption: string
  image: string
}

const PAGES: Page[] = [
  {
    title: '第1話 — 釜の前で',
    caption: '宮城の小さな焙煎工場。「ここを継ぐ」と決めた朝。',
    image: '/manga/page-01.png',
  },
  {
    title: '第2話 — 母とふたり',
    caption: '母と二人きりの日々。1日が玄米の香りで終わっていく。',
    image: '/manga/page-02.png',
  },
  {
    title: '第3話 — 卸と直販のあいだ',
    caption: '長年の卸先は止められない。でも、これだけでは未来が描けない。',
    image: '/manga/page-03.png',
  },
  {
    title: '第4話 — 玄米茶という地図',
    caption: '海の向こうでは"Genmaicha"が静かに人気を集めていた。',
    image: '/manga/page-04.png',
  },
  {
    title: '第5話 — 「玄米茶ちゃん」という名前',
    caption: '祖父祖母から受け継いだものを、世界へ繋ぎ直す。',
    image: '/manga/page-05.png',
  },
  {
    title: '第6話 — 小さく、確かに、海へ',
    caption: 'スモールスタート10策。釜を止めず、母を疲れさせず、世界に届ける。',
    image: '/manga/page-06.png',
  },
]

export default function Manga() {
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
        {PAGES.map((p, i) => (
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
            MANGA / 全6話
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-brand-900 md:text-3xl">
          4代目・玄米茶ちゃんの継ぎ方
        </h1>
        <p className="mt-1 text-xs text-brand-800/70 md:text-sm">
          縦スクロールで全6話を閲覧できます。挿絵は nano-banana-pro で生成しています。
        </p>
      </div>

      <div className="sticky top-[116px] z-10 mb-4 -mx-4 bg-washi-50/95 px-4 py-2 backdrop-blur md:hidden">
        <div className="flex items-center justify-between text-xs text-brand-800/70">
          <span className="font-semibold text-brand-700">
            Page {current + 1} / {PAGES.length}
          </span>
          <span className="truncate">{PAGES[current]?.title}</span>
        </div>
        <div className="mt-1 h-1 overflow-hidden rounded-full bg-washi-200">
          <div
            className="h-full bg-gradient-to-r from-brand-700 to-matcha-500 transition-all"
            style={{ width: `${((current + 1) / PAGES.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6 md:space-y-10">
        {PAGES.map((p, i) => (
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
                      Page {String(i + 1).padStart(2, '0')} / {String(PAGES.length).padStart(2, '0')}
                    </span>
                    <div className="h-px w-6 bg-brand-500/50" />
                  </div>
                  <h2 className="mt-1 font-serif text-lg font-bold text-brand-900 md:text-2xl">
                    {p.title}
                  </h2>
                  <p className="text-xs text-brand-800/70 md:text-sm">{p.caption}</p>
                </div>
                {i < PAGES.length - 1 && (
                  <button
                    onClick={() => scrollTo(i + 1)}
                    className="flex-shrink-0 rounded-lg bg-brand-900 px-3 py-1.5 text-[10px] font-medium text-brand-200 hover:bg-brand-800 md:px-4 md:py-2 md:text-xs"
                  >
                    次へ ↓
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-center bg-washi-100 p-3 md:p-6">
              <img
                src={p.image}
                alt={`${p.title} - ${p.caption}`}
                className="max-h-[80vh] w-auto rounded-lg shadow-lg"
                loading={i === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement
                  img.replaceWith(placeholder(p.title))
                }}
              />
            </div>
          </section>
        ))}
      </div>

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

// 画像未生成時のプレースホルダ
function placeholder(title: string): HTMLElement {
  const div = document.createElement('div')
  div.className =
    'flex aspect-[4/5] w-full max-w-md items-center justify-center rounded-lg bg-gradient-to-br from-brand-100 via-washi-100 to-matcha-100 text-brand-700/60'
  const inner = document.createElement('div')
  inner.className = 'text-center'
  inner.innerHTML = `
    <div class="font-serif text-lg font-bold">${title}</div>
    <div class="mt-2 text-xs">画像未生成 / agent/generate-manga.js を実行してください</div>
  `
  div.appendChild(inner)
  return div
}
