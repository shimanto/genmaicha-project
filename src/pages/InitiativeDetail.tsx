import { marked } from 'marked'
import { useMemo } from 'react'
import { INITIATIVES, findInitiative } from '../initiatives'

type Props = {
  id: string
  onBack: () => void
  onSelect: (id: string) => void
}

export default function InitiativeDetail({ id, onBack, onSelect }: Props) {
  const item = findInitiative(id)
  const html = useMemo(() => (item ? (marked.parse(item.md) as string) : ''), [item])

  if (!item) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-brand-800">
          指定された施策が見つかりませんでした。
        </p>
        <button
          onClick={onBack}
          className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
        >
          ← 一覧へ戻る
        </button>
      </div>
    )
  }

  const idx = INITIATIVES.findIndex((x) => x.id === id)
  const prev = idx > 0 ? INITIATIVES[idx - 1] : null
  const next = idx < INITIATIVES.length - 1 ? INITIATIVES[idx + 1] : null

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="text-xs text-brand-700/80 hover:text-brand-700 md:text-sm"
      >
        ← 10 の施策 一覧へ
      </button>

      <header className="border-b border-washi-200 pb-6">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
          <span>INITIATIVE {String(item.no).padStart(2, '0')} / 10</span>
        </div>
        <h1 className="mt-2 font-serif text-2xl font-bold text-brand-900 md:text-4xl">
          {item.title}
        </h1>
        <p className="mt-2 text-sm text-brand-800/80 md:text-base">{item.oneLiner}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-[10px] md:text-xs">
          <Tag>手間 {item.effort}</Tag>
          <Tag>コスト {item.cost}</Tag>
          <Tag>速度 {item.speed}</Tag>
          <Tag>対象 {item.audience}</Tag>
        </div>
      </header>

      <article className="rounded-2xl border border-washi-200 bg-white p-6 shadow-sm md:p-10">
        <div className="washi-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <nav className="flex flex-col gap-3 border-t border-washi-200 pt-6 md:flex-row md:items-stretch md:justify-between">
        {prev ? (
          <button
            onClick={() => onSelect(prev.id)}
            className="flex-1 rounded-xl border border-washi-200 bg-white p-4 text-left transition hover:border-brand-300"
          >
            <div className="text-[10px] font-semibold uppercase tracking-wide text-brand-700/70">
              ← 前の施策 / {String(prev.no).padStart(2, '0')}
            </div>
            <div className="mt-1 font-serif text-sm font-bold text-brand-900 md:text-base">
              {prev.title}
            </div>
          </button>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <button
            onClick={() => onSelect(next.id)}
            className="flex-1 rounded-xl border border-washi-200 bg-white p-4 text-right transition hover:border-brand-300"
          >
            <div className="text-[10px] font-semibold uppercase tracking-wide text-brand-700/70">
              次の施策 / {String(next.no).padStart(2, '0')} →
            </div>
            <div className="mt-1 font-serif text-sm font-bold text-brand-900 md:text-base">
              {next.title}
            </div>
          </button>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-washi-200 bg-washi-100 px-2.5 py-0.5 font-medium text-brand-800">
      {children}
    </span>
  )
}
