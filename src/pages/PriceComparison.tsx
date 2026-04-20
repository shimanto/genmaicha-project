export default function PriceComparison() {
  return (
    <div className="space-y-10 md:space-y-14">
      <header className="border-b border-stone-200 pb-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-px w-6 bg-brand-500" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
            PRICE COMPARISON / 03
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-stone-900 md:text-4xl">
          国内 vs 海外 価格比較
        </h1>
        <p className="mt-2 text-sm text-stone-600 md:text-base">
          同等の玄米茶/焙煎玄米が、国内と海外でどの程度の価格差で販売されているかを整理します。
          海外直販(D2C)では国内の2〜4倍で販売されているのが一般的なレンジです。
        </p>
      </header>

      {/* Summary card */}
      <section className="grid gap-4 md:grid-cols-3 md:gap-6">
        <SumCard
          label="国内 (スーパー・卸)"
          value="¥150〜400"
          unit="/ 100g"
          note="ブレンド済み玄米茶の一般的な棚価格"
        />
        <SumCard
          label="国内 (D2C/専門店)"
          value="¥700〜1,500"
          unit="/ 100g"
          note="ストーリー・パッケージング付きで2〜4倍"
          accent
        />
        <SumCard
          label="海外 (D2C/専門茶店)"
          value="¥1,800〜4,500"
          unit="/ 100g相当"
          note="国内比 2〜4倍以上。送料・関税込み"
          accent
        />
      </section>

      {/* Detail table */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-900 md:text-2xl">
          1. チャネル別の典型価格レンジ
        </h2>
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-xs md:text-sm">
            <thead className="bg-brand-50 text-brand-900">
              <tr>
                <th className="px-3 py-2.5 text-left font-semibold md:px-5 md:py-3">チャネル</th>
                <th className="px-3 py-2.5 text-left font-semibold md:px-5 md:py-3">国 / エリア</th>
                <th className="px-3 py-2.5 text-right font-semibold md:px-5 md:py-3">想定単価</th>
                <th className="px-3 py-2.5 text-left font-semibold md:px-5 md:py-3">備考</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <PRow ch="スーパー棚" a="日本" p="¥150〜300 / 100g" n="ブレンド玄米茶の一般商品帯" />
              <PRow ch="百貨店・専門茶店" a="日本" p="¥800〜1,500 / 100g" n="パッケージ・産地表示付きの上位帯" />
              <PRow ch="D2C (Shopify等)" a="日本" p="¥900〜2,200 / 100g" n="ブランド・ストーリー設計で更に上振れ" />
              <PRow ch="専門茶店" a="北米" p="$15〜35 / 100g相当" n="¥2,200〜5,000相当。単一産地を明示" highlight />
              <PRow ch="Amazon.com" a="北米" p="$10〜22 / 100g相当" n="¥1,500〜3,300相当。価格競争厳しめ" />
              <PRow ch="D2C (Shopify Markets)" a="北米/欧州" p="$18〜35 / 100g相当" n="¥2,700〜5,000相当。HOUが目指す価格帯" highlight />
              <PRow ch="Specialty Tea Shop" a="欧州" p="€16〜32 / 100g相当" n="¥2,600〜5,100相当。オーガニック付きで更に上" />
              <PRow ch="カフェB2B (海外)" a="アジア他" p="$25〜60 / 500g" n="業務用。リピート取引で安定化" />
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-stone-500 md:text-xs">
          ※ 為替は 1USD=150円 / 1EUR=160円で換算した概算レンジ。実際の単価は為替・物流・年次で変動します。
        </p>
      </section>

      {/* Pricing strategy */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-900 md:text-2xl">
          2. 段階的な価格アップレンジ戦略
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          <StageCard
            step="STEP 1"
            title="国内OEM卸"
            price="¥基準 × 1.0"
            body="既存の卸顧客向け。実績と安定供給を重視。"
          />
          <StageCard
            step="STEP 2"
            title="国内D2C"
            price="¥基準 × 2〜3"
            body="100g缶/袋の完成品。ストーリー・パッケージングで差別化。"
            accent
          />
          <StageCard
            step="STEP 3"
            title="海外D2C"
            price="¥基準 × 3〜4"
            body="Shopify Markets / 専門茶店卸。英語ストーリーと認証で付加価値。"
            accent
          />
          <StageCard
            step="STEP 4"
            title="海外カフェB2B"
            price="¥基準 × 2〜3"
            body="卸だが継続取引。ブランドロゴ露出で二次的マーケティング効果。"
          />
        </div>
      </section>

      {/* Key insights */}
      <section className="rounded-2xl bg-stone-900 p-6 text-white md:p-10">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-300 md:text-xs">
          Pricing Insight
        </div>
        <h2 className="mb-3 font-serif text-xl font-bold md:text-2xl">
          海外D2Cは、国内卸の3〜4倍の粗利率を実現しやすい
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-stone-300 md:text-base">
          同じ焙煎玄米を、国内卸で売った場合と海外D2Cで売った場合では、粗利率に大きな差が出ます。
          HOUは既存の卸事業を維持しつつ、D2C/海外の高付加価値レーンへ段階的にシフトすることで、
          生産能力を変えずに営業利益率を2〜3倍に引き上げる設計としています。
        </p>
        <p className="text-xs text-stone-400 md:text-sm">
          ※ 数値は公開価格・業界ヒアリング・既存D2Cブランドの公開SKUを元にした概算レンジです。
          実行時はチャネルごとに単価・物流・返品率を再計測してください。
        </p>
      </section>
    </div>
  )
}

function SumCard({
  label,
  value,
  unit,
  note,
  accent,
}: {
  label: string
  value: string
  unit: string
  note: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-5 shadow-sm ${
        accent
          ? 'border-brand-500 bg-gradient-to-br from-brand-50 to-white'
          : 'border-stone-200 bg-white'
      }`}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-serif text-2xl font-bold text-stone-900 md:text-3xl">{value}</span>
        <span className="text-xs text-stone-500 md:text-sm">{unit}</span>
      </div>
      <p className="mt-1 text-xs text-stone-600">{note}</p>
    </div>
  )
}

function PRow({
  ch,
  a,
  p,
  n,
  highlight,
}: {
  ch: string
  a: string
  p: string
  n: string
  highlight?: boolean
}) {
  return (
    <tr className={highlight ? 'bg-brand-50/60' : ''}>
      <td className="px-3 py-2.5 font-semibold text-stone-900 md:px-5 md:py-3">{ch}</td>
      <td className="px-3 py-2.5 text-stone-700 md:px-5 md:py-3">{a}</td>
      <td
        className={`px-3 py-2.5 text-right font-mono md:px-5 md:py-3 ${
          highlight ? 'font-semibold text-brand-800' : 'text-stone-700'
        }`}
      >
        {p}
      </td>
      <td className="px-3 py-2.5 text-stone-600 md:px-5 md:py-3">{n}</td>
    </tr>
  )
}

function StageCard({
  step,
  title,
  price,
  body,
  accent,
}: {
  step: string
  title: string
  price: string
  body: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-4 shadow-sm ${
        accent
          ? 'border-brand-500 bg-gradient-to-br from-brand-50 to-white'
          : 'border-stone-200 bg-white'
      }`}
    >
      <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-[10px]">
        {step}
      </div>
      <div className="mt-1 font-serif text-base font-bold text-stone-900 md:text-lg">{title}</div>
      <div className="mt-1 font-mono text-sm font-semibold text-brand-800">{price}</div>
      <p className="mt-2 text-xs leading-relaxed text-stone-600">{body}</p>
    </div>
  )
}
