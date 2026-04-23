import { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'

import businessPlanMd from '../../docs/business-plan.md?raw'
import brandGuidelinesMd from '../../docs/brand-guidelines.md?raw'
import productRoadmapMd from '../../docs/product-roadmap.md?raw'
import oemContractMd from '../../docs/oem-contract-template.md?raw'
import exportChecklistMd from '../../docs/export-checklist.md?raw'
import stickerPrintingMd from '../../docs/sticker-printing-research.md?raw'
import actualLineupMd from '../../docs/actual-product-lineup.md?raw'

type DocKey = 'plan' | 'brand' | 'product' | 'oem' | 'export' | 'sticker' | 'actual'

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
    key: 'actual',
    title: '実際の取扱商品ラインナップ',
    subtitle: '現行 2 種(あられ・ポップライス)+ 将来候補 3 種 + 工場増設',
    category: 'ACTUAL',
    md: actualLineupMd,
    icon: '⭐',
  },
  {
    key: 'plan',
    title: '事業計画書ドラフト',
    subtitle: '商工会議所・金融機関提出版',
    category: 'PLAN',
    md: businessPlanMd,
    icon: '◆',
  },
  {
    key: 'brand',
    title: 'ブランドガイドライン',
    subtitle: '玄米茶ちゃんのロゴ・色・トーン',
    category: 'BRAND',
    md: brandGuidelinesMd,
    icon: '◇',
  },
  {
    key: 'product',
    title: '商品開発ロードマップ',
    subtitle: '焙煎玄米2種からの拡張計画',
    category: 'PRODUCT',
    md: productRoadmapMd,
    icon: '◈',
  },
  {
    key: 'oem',
    title: 'OEM/法人ノベルティ提案 雛形',
    subtitle: '商工会議所つながりを活用した法人営業用',
    category: 'CONTRACT',
    md: oemContractMd,
    icon: '◇',
  },
  {
    key: 'export',
    title: '輸出チェックリスト',
    subtitle: '小ロット越境EC開始のためのToDo',
    category: 'CHECKLIST',
    md: exportChecklistMd,
    icon: '◈',
  },
  {
    key: 'sticker',
    title: 'シール・ラベル印刷ガイド',
    subtitle: '5業者比較 + ¥3,000〜のスモールスタート組合せ',
    category: 'PRINT',
    md: stickerPrintingMd,
    icon: '◆',
  },
]

marked.setOptions({
  gfm: true,
  breaks: false,
})

export default function Documents() {
  const [activeKey, setActiveKey] = useState<DocKey>('actual')
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
    <div className="-mx-4 -mt-6 min-h-[calc(100vh-140px)] bg-gradient-to-b from-washi-100 via-washi-50 to-white px-4 py-8 md:-mx-6 md:-mt-8 md:min-h-[calc(100vh-73px)] md:px-6 md:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 border-b border-brand-200/60 pb-6 md:mb-10 md:pb-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-300/60" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs md:tracking-[0.3em]">
              Project Documents
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-300/60" />
          </div>
          <h1 className="mt-5 text-center font-serif text-2xl font-bold tracking-tight text-brand-900 md:mt-6 md:text-5xl">
            事業資料 アーカイブ
          </h1>
          <p className="mt-2 text-center text-[11px] text-brand-800/70 md:mt-3 md:text-sm">
            事業計画・ブランドガイド・商品ロードマップ・OEM雛形・輸出チェックリスト
          </p>
        </header>

        <div className="mb-6 lg:hidden">
          <button
            onClick={() => setMobileIndexOpen(!mobileIndexOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-brand-300/60 bg-gradient-to-r from-brand-100/60 to-transparent px-4 py-3 text-left shadow-sm"
          >
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700">
                {active.category}
              </div>
              <div className="mt-0.5 font-serif text-base text-brand-900">{active.title}</div>
            </div>
            <span className="text-brand-700">{mobileIndexOpen ? '▲' : '▼'}</span>
          </button>
          {mobileIndexOpen && (
            <div className="mt-2 space-y-2 rounded-lg border border-washi-200 bg-white p-2">
              {DOCS.map((doc) => (
                <button
                  key={doc.key}
                  onClick={() => selectDoc(doc.key)}
                  className={`w-full rounded-md border px-3 py-2.5 text-left transition ${
                    doc.key === activeKey
                      ? 'border-brand-300 bg-brand-50'
                      : 'border-washi-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={doc.key === activeKey ? 'text-brand-700' : 'text-brand-700/40'}>
                      {doc.icon}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-700/70">
                      {doc.category}
                    </span>
                  </div>
                  <div className="mt-0.5 font-serif text-sm text-brand-900">{doc.title}</div>
                  <div className="text-[11px] text-brand-800/60">{doc.subtitle}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
          <aside className="hidden space-y-2 lg:block">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-700">
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
                      ? 'border-brand-300 bg-gradient-to-r from-brand-100 to-transparent shadow-sm'
                      : 'border-washi-200 bg-white hover:border-brand-200 hover:bg-washi-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={isActive ? 'text-brand-700' : 'text-brand-700/40'}>
                      {doc.icon}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700/70">
                      {doc.category}
                    </span>
                  </div>
                  <div className={`mt-1.5 font-serif text-base ${isActive ? 'text-brand-900' : 'text-brand-900/80'}`}>
                    {doc.title}
                  </div>
                  <div className="mt-0.5 text-xs text-brand-800/60">{doc.subtitle}</div>
                </button>
              )
            })}

            <div className="mt-6 rounded-lg border border-matcha-300/40 bg-matcha-50 p-4 text-xs text-matcha-900">
              <div className="mb-2 font-semibold text-matcha-700">⚠ ご注意</div>
              本資料は構想段階のドラフトです。実運用前に税理士・弁理士・弁護士のレビューを受けてください。
            </div>
          </aside>

          <main>
            <article className="relative overflow-hidden rounded-xl border border-washi-200 bg-white p-5 shadow-sm md:rounded-2xl md:p-10">
              <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-brand-100/60 to-transparent" />
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-brand-300/40 to-transparent" />

              <div className="mb-6 md:mb-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs md:tracking-[0.3em]">
                  {active.category}
                </div>
                <h2 className="mt-2 font-serif text-2xl font-bold text-brand-900 md:text-4xl">
                  {active.title}
                </h2>
                <p className="mt-1 text-xs text-brand-800/70 md:text-sm">{active.subtitle}</p>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-brand-300/60 via-brand-300/30 to-transparent md:mt-6" />
              </div>

              <div
                className="washi-prose"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              <div className="mt-10 border-t border-washi-200 pt-5 text-center text-[10px] text-brand-800/50 md:mt-12 md:pt-6 md:text-xs">
                — 玄米茶ちゃん / 構想ドラフト —
              </div>
            </article>

            <div className="mt-4 rounded-lg border border-matcha-300/40 bg-matcha-50 p-4 text-xs text-matcha-900 lg:hidden">
              <div className="mb-1 font-semibold text-matcha-700">⚠ ご注意</div>
              本資料は構想段階のドラフトです。実運用前に税理士・弁理士・弁護士のレビューを受けてください。
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
