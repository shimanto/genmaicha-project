import { useEffect, useState } from 'react'
import LandingPage from './pages/LandingPage'
import Manga from './pages/Manga'
import BizStory from './pages/BizStory'
import Shop from './pages/Shop'
import Products from './pages/Products'
import Business from './pages/Business'
import Category from './pages/Category'
import Global from './pages/Global'
import Pricing from './pages/Pricing'
import Initiatives from './pages/Initiatives'
import InitiativeDetail from './pages/InitiativeDetail'
import Documents from './pages/Documents'

type Page =
  | 'lp'
  | 'manga'
  | 'bizstory'
  | 'shop'
  | 'products'
  | 'business'
  | 'category'
  | 'global'
  | 'pricing'
  | 'initiatives'
  | 'documents'
  | { kind: 'initiative'; id: string }

const NAV: { key: Exclude<Page, { kind: string }>; label: string; accent?: boolean }[] = [
  { key: 'lp', label: 'トップ' },
  { key: 'shop', label: 'ショップ', accent: true },
  { key: 'products', label: '商品ラインナップ', accent: true },
  { key: 'bizstory', label: '事業ストーリー' },
  { key: 'manga', label: '漫画' },
  { key: 'business', label: '事業説明' },
  { key: 'category', label: 'カテゴリー' },
  { key: 'global', label: '海外需要' },
  { key: 'pricing', label: '価格比較' },
  { key: 'initiatives', label: '10の施策' },
  { key: 'documents', label: '資料' },
]

function pageFromHash(): Page {
  const h = window.location.hash.replace('#', '')
  if (h.startsWith('initiative/')) {
    const id = h.slice('initiative/'.length)
    if (id) return { kind: 'initiative', id }
  }
  if (
    h === 'manga' ||
    h === 'bizstory' ||
    h === 'shop' ||
    h === 'products' ||
    h === 'business' ||
    h === 'category' ||
    h === 'global' ||
    h === 'pricing' ||
    h === 'initiatives' ||
    h === 'documents'
  ) {
    return h
  }
  return 'lp'
}

function pageKey(p: Page): string {
  return typeof p === 'string' ? p : `initiative-${p.id}`
}

export default function App() {
  const [page, setPageState] = useState<Page>(pageFromHash)

  const setPage = (p: Page) => {
    setPageState(p)
    if (typeof p === 'string') {
      window.location.hash = p === 'lp' ? '' : p
    } else {
      window.location.hash = `initiative/${p.id}`
    }
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    const handler = () => setPageState(pageFromHash())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const activeKey: string = typeof page === 'string' ? page : 'initiatives'

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-20 border-b border-washi-200 bg-washi-50/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setPage('lp')}
              className="flex items-center gap-2 text-brand-900"
              aria-label="玄米茶ちゃん トップ"
            >
              <img src="/favicon.svg" alt="" className="h-8 w-8 md:h-9 md:w-9" />
              <span className="flex flex-col items-start leading-none">
                <span className="font-serif text-sm font-bold tracking-[0.12em] md:text-base">
                  玄米茶ちゃん
                </span>
                <span className="mt-0.5 text-[9px] text-brand-700/80 md:text-[10px]">
                  焙煎玄米の老舗を、世界へ。
                </span>
              </span>
            </button>
            <a
              href="https://github.com/shimanto/genmaicha-project"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-washi-200 bg-white px-2.5 py-1 text-[10px] font-medium text-brand-700 hover:bg-washi-100 md:px-3 md:py-2 md:text-xs"
            >
              GitHub
            </a>
          </div>
          <nav className="mt-2 -mx-4 flex gap-1 overflow-x-auto px-4 pb-0.5 md:mx-0 md:mt-3 md:px-0 md:pb-0 scrollbar-none">
            {NAV.map((n) => {
              const isActive = activeKey === n.key
              const baseClasses =
                'flex-shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition md:px-4 md:py-2 md:text-sm'
              const accent = n.accent && !isActive
              return (
                <button
                  key={n.key}
                  onClick={() => setPage(n.key)}
                  className={`${baseClasses} ${
                    isActive
                      ? 'bg-brand-700 text-white shadow-sm'
                      : accent
                        ? 'bg-matcha-600 text-white hover:bg-matcha-700 shadow-sm'
                        : 'text-brand-800 hover:bg-washi-100'
                  }`}
                >
                  {n.label}
                </button>
              )
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-6 md:py-8" key={pageKey(page)}>
        {page === 'lp' && <LandingPage onNavigate={setPage} />}
        {page === 'manga' && <Manga />}
        {page === 'bizstory' && <BizStory onNavigateShop={() => setPage('shop')} />}
        {page === 'shop' && <Shop />}
        {page === 'products' && <Products />}
        {page === 'business' && <Business />}
        {page === 'category' && <Category />}
        {page === 'global' && <Global />}
        {page === 'pricing' && <Pricing />}
        {page === 'initiatives' && (
          <Initiatives onSelect={(id) => setPage({ kind: 'initiative', id })} />
        )}
        {page === 'documents' && <Documents />}
        {typeof page === 'object' && page.kind === 'initiative' && (
          <InitiativeDetail
            id={page.id}
            onBack={() => setPage('initiatives')}
            onSelect={(id) => setPage({ kind: 'initiative', id })}
          />
        )}
      </main>
      <footer className="border-t border-washi-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 text-xs text-brand-800/70 md:flex-row md:items-center md:justify-between md:px-6">
          <div>© 2026 玄米茶ちゃん | 焙煎玄米の老舗を、世界へ。</div>
          <div className="text-[11px] text-brand-700/50">Built with Claude Code</div>
        </div>
      </footer>
    </div>
  )
}
