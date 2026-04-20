import { INITIATIVES } from '../data/initiatives'

type Props = {
  onSelect: (slug: string) => void
}

const CATEGORY_COLOR: Record<string, string> = {
  EC: 'bg-brand-700 text-white',
  BRAND: 'bg-stone-800 text-white',
  SALES: 'bg-matcha-500 text-white',
  MARKETING: 'bg-brand-500 text-white',
  FINANCE: 'bg-stone-600 text-white',
}

export default function InitiativesIndex({ onSelect }: Props) {
  return (
    <div className="space-y-10 md:space-y-12">
      <header className="border-b border-stone-200 pb-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-px w-6 bg-brand-500" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
            SMALL-START INITIATIVES / 10
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-stone-900 md:text-4xl">
          スモールスタート施策 10選
        </h1>
        <p className="mt-2 text-sm text-stone-600 md:text-base">
          母娘2名体制 / 工場機能は維持 / コストは最小限、という条件下で実行できる10施策です。
          各施策ページにはステップ・予算・KPI・リスク・他施策とのシナジーを記載しています。
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {INITIATIVES.map((item) => (
          <button
            key={item.slug}
            onClick={() => onSelect(item.slug)}
            className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-md md:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide md:text-xs ${
                      CATEGORY_COLOR[item.category] ?? 'bg-stone-800 text-white'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="font-mono text-xs text-stone-400 md:text-sm">
                    No.{item.number}
                  </span>
                </div>
                <h2 className="mt-2 font-serif text-lg font-bold leading-snug text-stone-900 md:text-xl">
                  {item.title}
                </h2>
                <p className="mt-1 text-xs text-stone-500 md:text-sm">{item.tagline}</p>
              </div>
              <span className="flex-shrink-0 rounded-full border border-stone-300 bg-white px-2.5 py-1 text-xs text-stone-500 transition group-hover:border-brand-500 group-hover:text-brand-700">
                詳細 →
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-stone-500 md:text-xs">
              <MiniMeta label="期間" value={item.timeline} />
              <MiniMeta label="予算" value={item.budget} />
              <MiniMeta label="KPI" value={item.kpi} />
            </div>
          </button>
        ))}
      </div>

      <section className="rounded-2xl bg-stone-900 p-6 text-white md:p-10">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-300 md:text-xs">
          How To Read
        </div>
        <h2 className="mb-3 font-serif text-xl font-bold md:text-2xl">
          施策は"順番"ではなく"同時進行の優先度"で読んでください
        </h2>
        <p className="text-sm leading-relaxed text-stone-300 md:text-base">
          すべてを一気に実行する必要はありません。1〜2ヶ月目は 01・02・03・04 から、
          3〜6ヶ月目は 05〜08、6〜12ヶ月目は 09・10 といったように、
          段階的に積み重ねることを想定した組み合わせになっています。
        </p>
      </section>
    </div>
  )
}

function MiniMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] font-semibold uppercase tracking-wider text-stone-400 md:text-[10px]">
        {label}
      </div>
      <div className="mt-0.5 truncate text-stone-700">{value}</div>
    </div>
  )
}
