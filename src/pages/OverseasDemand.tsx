export default function OverseasDemand() {
  return (
    <div className="space-y-10 md:space-y-14">
      <header className="border-b border-stone-200 pb-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-px w-6 bg-brand-500" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
            OVERSEAS DEMAND / 02
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-stone-900 md:text-4xl">
          海外での玄米茶・焙煎玄米需要
        </h1>
        <p className="mt-2 text-sm text-stone-600 md:text-base">
          北米・欧州・東南アジアを中心に、日本茶(特に抹茶/ほうじ茶/玄米茶)の需要が拡大しています。
          焙煎玄米は"Genmaicha"の独自要素として、英語圏でもキーワード認知が進んでいます。
        </p>
      </header>

      {/* Region breakdown */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-900 md:text-2xl">
          1. エリア別の需要プロファイル
        </h2>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <RegionCard
            region="北米 (US/CA)"
            growth="CAGR 約 8〜10%"
            points={[
              '抹茶ラテが起点。玄米茶/ほうじ茶にも派生',
              '"ノンカフェイン/クリーンラベル"がキーメッセージ',
              'Amazon.com・Whole Foods・Starbucks系カフェが主戦場',
            ]}
          />
          <RegionCard
            region="欧州 (EU/UK)"
            growth="CAGR 約 7〜9%"
            points={[
              'オーガニック/サステナ志向が強い',
              'パリ/ロンドンの専門茶店からスペシャルティ文脈で浸透',
              'EU有機認証・残留農薬規制への適合が必須条件',
            ]}
          />
          <RegionCard
            region="東南アジア (SG/TH/VN 他)"
            growth="CAGR 約 9〜12%"
            points={[
              'JカルチャーとWellnessトレンドが結合',
              '日本食レストラン・カフェチェーン向けB2Bの余地',
              'ハラール対応・常温物流の設計が鍵',
            ]}
          />
        </div>
      </section>

      {/* Key drivers */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-900 md:text-2xl">
          2. 海外需要を押し上げている3つのドライバー
        </h2>
        <div className="space-y-4">
          <DriverItem
            no="01"
            title="抹茶ブームの『後続カテゴリ』としての玄米茶"
            body="海外市場ではまず抹茶が認知され、その後ほうじ茶・玄米茶といった焙煎系・ブレンド系に関心が広がる傾向があります。焙煎玄米はこの流れの受け皿となりえます。"
          />
          <DriverItem
            no="02"
            title="ウェルネス/ノンカフェイン需要"
            body="就寝前・妊娠期・オフィスのアフタヌーンティー代替として、低/ノンカフェインのお茶需要が恒常化。焙煎玄米単品は『ノンカフェイン』で売りやすい明確な強みがあります。"
          />
          <DriverItem
            no="03"
            title="日本の『地域×職人』ストーリーの評価"
            body="海外バイヤー/エンドユーザーともに、『家族経営/事業継承/地方の小さな工場』のストーリーを高付加価値の根拠として受け入れやすい。"
          />
        </div>
      </section>

      {/* Channels */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-900 md:text-2xl">
          3. 想定チャネル
        </h2>
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-xs md:text-sm">
            <thead className="bg-brand-50 text-brand-900">
              <tr>
                <th className="px-3 py-2.5 text-left font-semibold md:px-5 md:py-3">チャネル</th>
                <th className="px-3 py-2.5 text-left font-semibold md:px-5 md:py-3">特徴</th>
                <th className="px-3 py-2.5 text-left font-semibold md:px-5 md:py-3">着手優先度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <ChRow ch="越境EC(Shopify Markets)" f="少額から始められ、価格コントロールしやすい" p="A (初期)" />
              <ChRow ch="Amazon Global / Etsy" f="集客量は大きいが利鞘が薄くブランド形成は弱い" p="B (補完)" />
              <ChRow ch="海外専門茶店への卸" f="ブランド信頼形成に有効。ロット小でも対応可" p="A (中期)" />
              <ChRow ch="カフェ/レストランB2B" f="リピートが強く長期の安定収入源になる" p="B (中期〜)" />
              <ChRow ch="展示会(Foodex/Specialty Coffee Expo等)" f="バイヤーとの直接商談・ブランド露出に有効" p="C (年1-2回)" />
            </tbody>
          </table>
        </div>
      </section>

      {/* Risks */}
      <section className="rounded-2xl bg-stone-900 p-6 text-white md:p-10">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-300 md:text-xs">
          Risk & Compliance
        </div>
        <h2 className="mb-3 font-serif text-xl font-bold md:text-2xl">
          海外展開で最初に押さえるべきチェックリスト
        </h2>
        <ul className="space-y-2 text-sm text-stone-300 md:text-base">
          <li>◆ 有機認証 / 残留農薬基準 (EU・USDAなど仕向地ごと)</li>
          <li>◆ 英語表示ラベル / アレルゲン / 栄養成分表示</li>
          <li>◆ 防湿・酸化対策を考慮したパッケージ設計</li>
          <li>◆ 越境送料と関税(特にEUは低額でも課税される)</li>
          <li>◆ 現地決済・通貨・為替ヘッジの方針</li>
        </ul>
      </section>
    </div>
  )
}

function RegionCard({
  region,
  growth,
  points,
}: {
  region: string
  growth: string
  points: string[]
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
        {region}
      </div>
      <div className="mt-1 font-serif text-xl font-bold text-stone-900">{growth}</div>
      <ul className="mt-3 space-y-1.5 text-sm text-stone-600">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DriverItem({
  no,
  title,
  body,
}: {
  no: string
  title: string
  body: string
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm md:p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 rounded-lg bg-brand-700 px-3 py-1.5 font-mono text-xs font-semibold text-white md:text-sm">
          {no}
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-stone-900 md:text-xl">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-stone-600 md:text-base">{body}</p>
        </div>
      </div>
    </div>
  )
}

function ChRow({ ch, f, p }: { ch: string; f: string; p: string }) {
  return (
    <tr>
      <td className="px-3 py-2.5 font-semibold text-stone-900 md:px-5 md:py-3">{ch}</td>
      <td className="px-3 py-2.5 text-stone-700 md:px-5 md:py-3">{f}</td>
      <td className="px-3 py-2.5 font-mono text-brand-800 md:px-5 md:py-3">{p}</td>
    </tr>
  )
}
