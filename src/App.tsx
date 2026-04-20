import { useEffect, useState } from 'react'
import LandingPage from './pages/LandingPage'
import Slides from './pages/Slides'
import Documents from './pages/Documents'
import CategoryAnalysis from './pages/CategoryAnalysis'
import OverseasDemand from './pages/OverseasDemand'
import PriceComparison from './pages/PriceComparison'
import InitiativesIndex from './pages/InitiativesIndex'
import InitiativeDetail from './pages/InitiativeDetail'
import Manga from './pages/Manga'

type Page =
  | 'lp'
  | 'slides'
  | 'category'
  | 'overseas'
  | 'price'
  | 'initiatives'
  | 'manga'
  | 'documents'
  | 'initiative'

const NAV: { key: Page; label: string }[] = [
  { key: 'lp', label: 'トップ' },
  { key: 'slides', label: '事業説明' },
  { key: 'category', label: 'カテゴリー分析' },
  { key: 'overseas', label: '海外需要' },
  { key: 'price', label: '価格比較' },
  { key: 'initiatives', label: '施策10選' },
  { key: 'manga', label: '漫画' },
  { key: 'documents', label: '資料' },
]

type HashResult = { page: Page; param: string | null }

function parseHash(): HashResult {
  const raw = window.location.hash.replace('#', '')
  if (!raw) return { page: 'lp', param: null }
  const [head, param] = raw.split('/')
  const valid: Page[] = [
    'lp',
    'slides',
    'category',
    'overseas',
    'price',
    'initiatives',
    'manga',
    'documents',
    'initiative',
  ]
  if (valid.includes(head as Page)) {
    return { page: head as Page, param: param ?? null }
  }
  return { page: 'lp', param: null }
}

export default function App() {
  const [state, setState] = useState<HashResult>(parseHash)

  const setPage = (p: Page, param?: string) => {
    const hash = p === 'lp' ? '' : param ? `${p}/${param}` : p
    window.location.hash = hash
    setState({ page: p, param: param ?? null })
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    const handler = () => setState(parseHash())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setPage('lp')}
              className="flex items-center gap-2 text-stone-900"
              aria-label="HOU トップ"
            >
              <img src="/favicon.svg" alt="" className="h-8 w-8 md:h-9 md:w-9" />
              <span className="flex flex-col items-start leading-none">
                <span className="font-serif text-sm font-bold tracking-[0.2em] md:text-base">
                  焙 HOU
                </span>
                <span className="mt-0.5 text-[9px] text-stone-500 md:text-[10px]">
                  焙煎玄米だけの、玄米茶ブランド
                </span>
              </span>
            </button>
          </div>
          <nav className="mt-2 -mx-4 flex gap-1 overflow-x-auto px-4 pb-0.5 md:mx-0 md:mt-3 md:px-0 md:pb-0 scrollbar-none">
            {NAV.map((n) => {
              const active =
                state.page === n.key ||
                (n.key === 'initiatives' && state.page === 'initiative')
              return (
                <button
                  key={n.key}
                  onClick={() => setPage(n.key)}
                  className={`flex-shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition md:px-4 md:py-2 md:text-sm ${
                    active
                      ? 'bg-brand-700 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {n.label}
                </button>
              )
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-6 md:py-8">
        {state.page === 'lp' && <LandingPage onNavigate={(p) => setPage(p)} />}
        {state.page === 'slides' && <Slides />}
        {state.page === 'category' && <CategoryAnalysis />}
        {state.page === 'overseas' && <OverseasDemand />}
        {state.page === 'price' && <PriceComparison />}
        {state.page === 'initiatives' && (
          <InitiativesIndex
            onSelect={(slug) => setPage('initiative', slug)}
          />
        )}
        {state.page === 'initiative' && state.param && (
          <InitiativeDetail
            slug={state.param}
            onBack={() => setPage('initiatives')}
          />
        )}
        {state.page === 'manga' && <Manga />}
        {state.page === 'documents' && <Documents />}
      </main>
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 text-xs text-stone-500 md:flex-row md:items-center md:justify-between md:px-6">
          <div>© 2026 焙 HOU(ほう) | 宮城発・焙煎玄米ブランド</div>
          <div className="text-[11px] text-stone-400">
            Shimanto AI Project / Open Preview
          </div>
        </div>
      </footer>
    </div>
  )
}
