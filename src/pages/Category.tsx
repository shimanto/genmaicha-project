import { marked } from 'marked'
import { useMemo } from 'react'
import categoryMd from '../../docs/category-research.md?raw'

export default function Category() {
  const html = useMemo(() => marked.parse(categoryMd) as string, [])

  return (
    <div className="space-y-8">
      <header className="border-b border-washi-200 pb-6">
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
          CATEGORY RESEARCH
        </div>
        <h1 className="mt-2 font-serif text-2xl font-bold text-brand-900 md:text-4xl">
          玄米茶のカテゴリー調査
        </h1>
        <p className="mt-1 text-sm text-brand-800/80 md:text-base">
          玄米茶の構造を「素材 / ブレンド / 焙煎度 / 飲み方」で分解し、当社の立ち位置を明確化します。
        </p>
      </header>

      <article className="rounded-2xl border border-washi-200 bg-white p-6 shadow-sm md:p-10">
        <div className="washi-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  )
}
