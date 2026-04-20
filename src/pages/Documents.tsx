import { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'

import brandConceptMd from '../../docs/brand-concept.md?raw'
import businessPlanMd from '../../docs/business-plan.md?raw'
import operationsMd from '../../docs/operations-checklist.md?raw'
import nanoPromptsMd from '../../docs/nano-banana-prompts.md?raw'

type DocKey = 'concept' | 'plan' | 'ops' | 'manga-prompt'

type DocItem = {
  key: DocKey
  title: string
  subtitle: string
  category: string
  md: string
  icon: string
}

const DOCS: DocItem[] = [
  {
    key: 'concept',
    title: 'ブランドコンセプト',
    subtitle: '焙 HOU の世界観とバリュー',
    category: 'BRAND',
    md: brandConceptMd,
    icon: '◆',
  },
  {
    key: 'plan',
    title: '事業計画(概要)',
    subtitle: '市場機会 / チャネル / 体制 / ファイナンス',
    category: 'PLAN',
    md: businessPlanMd,
    icon: '◇',
  },
  {
    key: 'ops',
    title: '運用チェックリスト',
    subtitle: '母娘2名体制の週次運用ルール',
    category: 'OPS',
    md: operationsMd,
    icon: '◈',
  },
  {
    key: 'manga-prompt',
    title: 'nano banana pro プロンプト集',
    subtitle: 'キャラ・コマ・キービジュアルの生成指針',
    category: 'MANGA',
    md: nanoPromptsMd,
    icon: '✦',
  },
]

marked.setOptions({
  gfm: true,
  breaks: false,
})

export default function Documents() {
  const [activeKey, setActiveKey] = useState<DocKey>('concept')
  const [mobileIndexOpen, setMobileIndexOpen] = useState(false)

  const active = DOCS.find((d) => d.key === activeKey)!

  const html = useMemo(() => {
    return marked.parse(active.md) as string
  }, [active])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeKey])

  const selectDoc = (key: DocKey) => {
    setActiveKey(key)
    setMobileIndexOpen(false)
  }

  return (
    <div className="-mx-4 -mt-6 min-h-[calc(100vh-140px)] bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 px-4 py-8 text-stone-100 md:-mx-6 md:-mt-8 md:min-h-[calc(100vh-73px)] md:px-6 md:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 border-b border-brand-500/20 pb-6 md:mb-10 md:pb-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-500/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-300 md:text-xs md:tracking-[0.3em]">
              Project Documents
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-500/40" />
          </div>
          <h1 className="mt-5 text-center font-serif text-2xl font-bold tracking-tight text-white md:mt-6 md:text-5xl">
            事業資料アーカイブ
          </h1>
          <p className="mt-2 text-center text-[11px] text-stone-400 md:mt-3 md:text-sm">
            Open Preview — 構想段階の資料です
          </p>
        </header>

        {/* Mobile selector */}
        <div className="mb-6 lg:hidden">
          <button
            onClick={() => setMobileIndexOpen(!mobileIndexOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-brand-500/30 bg-gradient-to-r from-brand-500/10 to-transparent px-4 py-3 text-left shadow-lg"
          >
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-300/80">
                {active.category}
              </div>
              <div className="mt-0.5 font-serif text-base text-white">{active.title}</div>
            </div>
            <span className="text-brand-300">{mobileIndexOpen ? '▲' : '▼'}</span>
          </button>
          {mobileIndexOpen && (
            <div className="mt-2 space-y-2 rounded-lg border border-stone-800 bg-stone-950/80 p-2">
              {DOCS.map((doc) => (
                <button
                  key={doc.key}
                  onClick={() => selectDoc(doc.key)}
                  className={`w-full rounded-md border px-3 py-2.5 text-left transition ${
                    doc.key === activeKey
                      ? 'border-brand-500/50 bg-brand-500/10'
                      : 'border-stone-800 bg-stone-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={doc.key === activeKey ? 'text-brand-300' : 'text-stone-500'}>
                      {doc.icon}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-300/70">
                      {doc.category}
                    </span>
                  </div>
                  <div className="mt-0.5 font-serif text-sm text-white">{doc.title}</div>
                  <div className="text-[11px] text-stone-500">{doc.subtitle}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Sidebar (desktop) */}
          <aside className="hidden space-y-2 lg:block">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-300/80">
              INDEX
            </div>
            {DOCS.map((doc) => {
              const isActive = doc.key === activeKey
              return (
                <button
                  key={doc.key}
                  onClick={() => setActiveKey(doc.key)}
                  className={`w-full rounded-lg border px-4 py-3 text-left transition ${
                    isActive
                      ? 'border-brand-500/50 bg-gradient-to-r from-brand-500/10 to-transparent shadow-lg shadow-brand-500/5'
                      : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 hover:bg-stone-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={isActive ? 'text-brand-300' : 'text-stone-500'}>
                      {doc.icon}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-300/70">
                      {doc.category}
                    </span>
                  </div>
                  <div className={`mt-1.5 font-serif text-base ${isActive ? 'text-white' : 'text-stone-200'}`}>
                    {doc.title}
                  </div>
                  <div className="mt-0.5 text-xs text-stone-500">{doc.subtitle}</div>
                </button>
              )
            })}

            <div className="mt-6 rounded-lg border border-brand-500/20 bg-brand-500/5 p-4 text-xs text-stone-400">
              <div className="mb-2 font-semibold text-brand-300">📎 ご注意</div>
              本資料は事業構想の共有を目的とした内部資料です。数値はいずれも概算です。
            </div>
          </aside>

          {/* Main */}
          <main>
            <article className="relative overflow-hidden rounded-xl border border-stone-800 bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 p-5 shadow-2xl md:rounded-2xl md:p-10">
              <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-brand-500/10 to-transparent" />
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

              <div className="mb-6 md:mb-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-300 md:text-xs md:tracking-[0.3em]">
                  {active.category}
                </div>
                <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-4xl">
                  {active.title}
                </h2>
                <p className="mt-1 text-xs text-stone-400 md:text-sm">{active.subtitle}</p>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-brand-500/40 via-brand-500/20 to-transparent md:mt-6" />
              </div>

              <div
                className="luxury-prose"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              <div className="mt-10 border-t border-stone-800 pt-5 text-center text-[10px] text-stone-600 md:mt-12 md:pt-6 md:text-xs">
                — 焙 HOU / Open Preview —
              </div>
            </article>

            {/* Mobile legal notice */}
            <div className="mt-4 rounded-lg border border-brand-500/20 bg-brand-500/5 p-4 text-xs text-stone-400 lg:hidden">
              <div className="mb-1 font-semibold text-brand-300">📎 ご注意</div>
              本資料は事業構想の共有を目的とした内部資料です。数値はいずれも概算です。
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
