import { marked } from 'marked'
import { useMemo } from 'react'
import pricingMd from '../../docs/pricing-comparison.md?raw'

export default function Pricing() {
  const html = useMemo(() => marked.parse(pricingMd) as string, [])

  return (
    <div className="space-y-8">
      <header className="border-b border-washi-200 pb-6">
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
          PRICING
        </div>
        <h1 className="mt-2 font-serif text-2xl font-bold text-brand-900 md:text-4xl">
          国内 vs 海外 価格比較
        </h1>
        <p className="mt-1 text-sm text-brand-800/80 md:text-base">
          同等内容量の玄米茶/焙煎玄米について、国内卸・国内D2C・北米EC・欧州EC・アジア越境の価格レンジを比較。
        </p>
      </header>

      <article className="rounded-2xl border border-washi-200 bg-white p-6 shadow-sm md:p-10">
        <div className="washi-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  )
}
