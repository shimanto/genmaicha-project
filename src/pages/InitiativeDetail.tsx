import { INITIATIVES } from '../data/initiatives'

type Props = {
  slug: string
  onBack: () => void
}

export default function InitiativeDetail({ slug, onBack }: Props) {
  const item = INITIATIVES.find((i) => i.slug === slug)

  if (!item) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-10 text-center">
        <p className="text-sm text-stone-600">指定された施策が見つかりませんでした。</p>
        <button
          onClick={onBack}
          className="mt-4 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
        >
          施策一覧に戻る
        </button>
      </div>
    )
  }

  const relatedItems = INITIATIVES.filter((i) => item.synergy.includes(i.slug))

  return (
    <div className="space-y-8 md:space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-stone-500 md:text-sm">
        <button onClick={onBack} className="hover:text-brand-700 hover:underline">
          施策10選
        </button>
        <span>/</span>
        <span className="text-stone-700">No.{item.number}</span>
      </div>

      {/* Header */}
      <header className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-6 text-white shadow-lg md:p-10">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide md:text-xs">
            {item.category}
          </span>
          <span className="font-mono text-xs text-brand-100 md:text-sm">No.{item.number}</span>
        </div>
        <h1 className="font-serif text-2xl font-bold leading-tight md:text-4xl">{item.title}</h1>
        <p className="mt-2 text-sm text-brand-100 md:text-base">{item.tagline}</p>
      </header>

      {/* Meta cards */}
      <section className="grid gap-3 md:grid-cols-3 md:gap-4">
        <MetaCard label="期間" value={item.timeline} />
        <MetaCard label="予算感" value={item.budget} />
        <MetaCard label="KPI" value={item.kpi} />
      </section>

      {/* Description */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-stone-900 md:text-xl">施策の狙い</h2>
        <p className="text-sm leading-relaxed text-stone-700 md:text-base">{item.description}</p>
      </section>

      {/* Steps */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-stone-900 md:text-xl">実行ステップ</h2>
        <ol className="space-y-3">
          {item.steps.map((step, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-700 font-mono text-xs font-semibold text-white md:h-7 md:w-7 md:text-sm">
                {i + 1}
              </div>
              <p className="text-sm leading-relaxed text-stone-700 md:text-base">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Risks */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-stone-900 md:text-xl">リスクと対処</h2>
        <ul className="space-y-2">
          {item.risks.map((r, i) => (
            <li
              key={i}
              className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-stone-700 md:text-base"
            >
              <span className="text-amber-600">⚠</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Synergy */}
      {relatedItems.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-bold text-stone-900 md:text-xl">
            関連施策(同時進行を推奨)
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {relatedItems.map((r) => (
              <div
                key={r.slug}
                className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm"
              >
                <div className="text-[10px] font-semibold uppercase tracking-wide text-brand-700 md:text-xs">
                  {r.category} · No.{r.number}
                </div>
                <div className="mt-1 font-serif text-base font-semibold text-stone-900 md:text-lg">
                  {r.title}
                </div>
                <div className="mt-0.5 text-xs text-stone-500 md:text-sm">{r.tagline}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Back */}
      <div className="flex justify-between border-t border-stone-200 pt-6">
        <button
          onClick={onBack}
          className="rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 md:px-5"
        >
          ← 施策一覧
        </button>
      </div>
    </div>
  )
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-stone-800 md:text-base">{value}</div>
    </div>
  )
}
