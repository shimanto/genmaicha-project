import { marked } from 'marked'
import { useMemo } from 'react'
import globalMd from '../../docs/global-demand.md?raw'

export default function Global() {
  const html = useMemo(() => marked.parse(globalMd) as string, [])

  return (
    <div className="space-y-8">
      <header className="border-b border-washi-200 pb-6">
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
          GLOBAL DEMAND
        </div>
        <h1 className="mt-2 font-serif text-2xl font-bold text-brand-900 md:text-4xl">
          海外での玄米茶需要
        </h1>
        <p className="mt-1 text-sm text-brand-800/80 md:text-base">
          北米・欧州・アジアの順に、Genmaichaを取り巻く市場と購買動機を整理します。
        </p>
      </header>

      <article className="rounded-2xl border border-washi-200 bg-white p-6 shadow-sm md:p-10">
        <div className="washi-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  )
}
