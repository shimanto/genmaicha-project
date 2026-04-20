export default function CategoryAnalysis() {
  return (
    <div className="space-y-10 md:space-y-14">
      {/* Header */}
      <header className="border-b border-stone-200 pb-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-px w-6 bg-brand-500" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
            CATEGORY ANALYSIS / 01
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-stone-900 md:text-4xl">
          玄米茶カテゴリー 調査分析
        </h1>
        <p className="mt-2 text-sm text-stone-600 md:text-base">
          日本茶の中での玄米茶の位置づけと、焙煎玄米そのものが持つ独自のポジショニングを整理します。
        </p>
      </header>

      {/* Market structure */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-900 md:text-2xl">
          1. 日本茶カテゴリー構造
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-stone-700 md:text-base">
          日本の茶類市場は、小売ベースで概ね数千億円規模。ペットボトル緑茶飲料が最大のチャネルを占め、
          リーフ(茶葉)市場は緑茶・抹茶・ほうじ茶・玄米茶などに分岐しています。
        </p>
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-xs md:text-sm">
            <thead className="bg-brand-50 text-brand-900">
              <tr>
                <th className="px-3 py-2.5 text-left font-semibold md:px-5 md:py-3">カテゴリー</th>
                <th className="px-3 py-2.5 text-left font-semibold md:px-5 md:py-3">特徴</th>
                <th className="px-3 py-2.5 text-left font-semibold md:px-5 md:py-3">HOUの位置づけ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <Row c="緑茶 (煎茶/深蒸し)" f="国内茶類の主力。リーフ・ペットボトルとも成熟" p="ブレンド原料として供給" />
              <Row c="抹茶" f="海外で最も伸びているカテゴリ。ラテ・菓子用途で拡大" p="抹茶玄米茶・ラテトッピングとして連携余地" />
              <Row c="ほうじ茶" f="焙煎カテゴリー。ノンカフェイン訴求で拡大" p="焙煎玄米の類似文脈で消費者教育しやすい" />
              <Row c="玄米茶" f="緑茶+焙煎玄米のブレンド。安価だが根強い定番" p="本ブランドの主戦場。焙煎玄米の品質で差別化" highlight />
              <Row c="焙煎玄米(単品)" f="現状ほぼ『玄米茶の原料』として流通" p="HOU は焙煎玄米『そのもの』を主役にする" highlight />
            </tbody>
          </table>
        </div>
      </section>

      {/* Positioning */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-900 md:text-2xl">
          2. ポジショニング (2軸マップ)
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-stone-700 md:text-base">
          「素材のシンプルさ」×「体験の高付加価値化」の2軸で見ると、焙煎玄米単品は空白地帯にあります。
        </p>
        <div className="rounded-2xl border border-stone-200 bg-gradient-to-br from-brand-50 via-white to-matcha-400/10 p-6 shadow-sm md:p-10">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <QuadrantCard
              pos="シンプル × 低付加価値"
              examples="リーフ玄米茶(ブレンド)・業務用"
              color="bg-stone-100 text-stone-700"
            />
            <QuadrantCard
              pos="シンプル × 高付加価値"
              examples="HOU 焙煎玄米 2種(目指す場所)"
              color="bg-brand-200 text-brand-900 border border-brand-500"
            />
            <QuadrantCard
              pos="複雑(ブレンド) × 低付加価値"
              examples="PETボトル緑茶飲料"
              color="bg-stone-100 text-stone-700"
            />
            <QuadrantCard
              pos="複雑 × 高付加価値"
              examples="抹茶スイーツ・高級ブレンド茶"
              color="bg-matcha-400/20 text-matcha-600"
            />
          </div>
        </div>
      </section>

      {/* Consumer trends */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-900 md:text-2xl">
          3. 消費者トレンド
        </h2>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <TrendCard
            title="ノンカフェイン志向"
            body="睡眠の質・妊娠/授乳期・就業後のリラックス用途で、玄米茶・ほうじ茶・焙煎玄米は追い風。"
          />
          <TrendCard
            title="単一素材への回帰"
            body="ブレンドより『素材そのものを楽しむ』嗜好。コーヒーのシングルオリジンと同じ構造がお茶にも。"
          />
          <TrendCard
            title="地域×ストーリー"
            body="宮城県産・家族経営・事業継承といった『人肌』のストーリーは、D2C/EC時代に強い差別化要因。"
          />
        </div>
      </section>

      {/* Opportunity */}
      <section className="rounded-2xl bg-stone-900 p-6 text-white md:p-10">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-300 md:text-xs">
          Key Opportunity
        </div>
        <h2 className="mb-3 font-serif text-xl font-bold md:text-2xl">
          焙煎玄米"そのもの"を売るブランドは、まだほぼ存在しない
        </h2>
        <p className="text-sm leading-relaxed text-stone-300 md:text-base">
          玄米茶カテゴリーでは"ブレンド済み商品"が主流であり、焙煎玄米そのものを単品で訴求する
          D2C/EC ブランドは国内外ともに限定的です。焙煎専業の技術資産と 20代女性経営者の発信力を
          組み合わせることで、まだ名前のついていない市場ポジションを獲得できる可能性があります。
        </p>
      </section>
    </div>
  )
}

function Row({
  c,
  f,
  p,
  highlight,
}: {
  c: string
  f: string
  p: string
  highlight?: boolean
}) {
  return (
    <tr className={highlight ? 'bg-brand-50/60' : ''}>
      <td className="px-3 py-2.5 font-semibold text-stone-900 md:px-5 md:py-3">{c}</td>
      <td className="px-3 py-2.5 text-stone-700 md:px-5 md:py-3">{f}</td>
      <td
        className={`px-3 py-2.5 md:px-5 md:py-3 ${
          highlight ? 'font-semibold text-brand-800' : 'text-stone-700'
        }`}
      >
        {p}
      </td>
    </tr>
  )
}

function QuadrantCard({
  pos,
  examples,
  color,
}: {
  pos: string
  examples: string
  color: string
}) {
  return (
    <div className={`rounded-xl p-5 ${color}`}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-80 md:text-xs">
        {pos}
      </div>
      <div className="mt-2 text-sm font-medium leading-relaxed md:text-base">{examples}</div>
    </div>
  )
}

function TrendCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <h3 className="mb-2 font-serif text-lg font-semibold text-stone-900">{title}</h3>
      <p className="text-sm leading-relaxed text-stone-600">{body}</p>
    </div>
  )
}
