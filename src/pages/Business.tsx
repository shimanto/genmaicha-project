import { marked } from 'marked'
import { useMemo } from 'react'
import businessMd from '../../docs/business-overview.md?raw'

export default function Business() {
  const html = useMemo(() => marked.parse(businessMd) as string, [])

  return (
    <div className="space-y-8">
      <header className="border-b border-washi-200 pb-6">
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
          BUSINESS
        </div>
        <h1 className="mt-2 font-serif text-2xl font-bold text-brand-900 md:text-4xl">
          事業説明
        </h1>
        <p className="mt-1 text-sm text-brand-800/80 md:text-base">
          現在の老舗事業 / 課題 / 新ブランド「玄米茶ちゃん」が解こうとしている問い。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="拠点" value="宮城県" sub="商工会議所サポート圏内" />
        <Stat label="現体制" value="母娘 2名" sub="他従業員なし / 1釜・小規模焙煎工場" />
        <Stat label="既存事業" value="玄米茶用 焙煎玄米 卸" sub="近隣茶問屋・地場ブレンダーへ100年近い実績" />
      </section>

      <article className="rounded-2xl border border-washi-200 bg-white p-6 shadow-sm md:p-10">
        <div className="washi-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-washi-200 bg-white p-5 shadow-sm">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
        {label}
      </div>
      <div className="mt-2 font-serif text-xl font-bold text-brand-900 md:text-2xl">{value}</div>
      <div className="mt-1 text-[11px] text-brand-800/70 md:text-xs">{sub}</div>
    </div>
  )
}
