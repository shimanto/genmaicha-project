import { INITIATIVES } from '../initiatives'

type Props = {
  onSelect: (id: string) => void
}

export default function Initiatives({ onSelect }: Props) {
  return (
    <div className="space-y-8">
      <header className="border-b border-washi-200 pb-6">
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
          INITIATIVES
        </div>
        <h1 className="mt-2 font-serif text-2xl font-bold text-brand-900 md:text-4xl">
          スモールスタートでできる 10 の施策
        </h1>
        <p className="mt-1 text-sm text-brand-800/80 md:text-base">
          母娘 2 名・既存事業を止めずに、確実に進められる順に並べてあります。
          各カードをタップすると、目的・必要なもの・90 日アクション・KPI まで詳細を確認できます。
        </p>
      </header>

      <div className="rounded-xl border border-matcha-300/40 bg-matcha-50 p-4 text-xs text-matcha-900 md:text-sm">
        <strong className="text-matcha-700">読み方:</strong>{' '}
        <span className="ml-1">手間 ★(軽) → ★★★(重) / コスト ◎(数千〜万円) → △(数十万円〜) / 速度 即日 / 1ヶ月 / 3ヶ月</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {INITIATIVES.map((it) => (
          <button
            key={it.id}
            onClick={() => onSelect(it.id)}
            className="group overflow-hidden rounded-xl border border-washi-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3 border-b border-washi-200 bg-gradient-to-br from-washi-100 to-white px-4 py-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-700 font-serif text-base font-bold text-white">
                {String(it.no).padStart(2, '0')}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-sm font-bold text-brand-900 md:text-base">
                  {it.title}
                </h3>
                <div className="mt-0.5 flex flex-wrap gap-1.5 text-[10px] text-brand-800/70 md:text-xs">
                  <Badge>手間 {it.effort}</Badge>
                  <Badge>コスト {it.cost}</Badge>
                  <Badge>{it.speed}</Badge>
                </div>
              </div>
            </div>
            <div className="px-4 py-4">
              <p className="text-sm leading-relaxed text-brand-800">{it.oneLiner}</p>
              <div className="mt-3 flex items-center justify-between text-[10px] text-brand-700/80 md:text-xs">
                <span>対象: {it.audience}</span>
                <span className="font-semibold transition group-hover:text-brand-700">詳細 →</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-washi-200 bg-white px-2 py-0.5 font-medium">
      {children}
    </span>
  )
}
