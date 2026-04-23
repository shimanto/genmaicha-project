const BASE_SHOP_URL = 'https://genmaicha.base.shop/'

type Product = {
  id: string
  name: string
  en: string
  price: number
  tag: string
  bg: string
  description: string
  badge?: string
  image: string
}

const PRODUCTS: Product[] = [
  {
    id: 'try20',
    name: 'お試しセット ¥500',
    en: 'Tasting Set 10g × 2',
    price: 500,
    tag: 'はじめての一杯 / 2種',
    bg: 'from-brand-400 to-brand-600',
    description: '朝の焙 10g + 夜の焙 10g + 飲み方カード。送料込み ¥500。「とりあえず一杯」用の超エントリー。',
    badge: '送料込み',
    image: '/packaging/pkg-11.png',
  },
  {
    id: 'try980',
    name: 'テイスティング 4種フライト ¥980',
    en: 'Roast Flight 4 Tea Bags',
    price: 980,
    tag: '世界観を一気に / 4種',
    bg: 'from-matcha-500 to-matcha-700',
    description: '中焙煎・深煎り・抹茶混合・塩玄米の 5g×4 包。飲み方ガイド + 透明窓のクラフト箱で贈答にも。',
    badge: 'BEST FOR ENTRY',
    image: '/packaging/pkg-31.png',
  },
  {
    id: 'asa100',
    name: '朝の焙 ASA-HOU 100g',
    en: 'Light Roast 100g',
    price: 1200,
    tag: '浅焙煎 × 爽やか',
    bg: 'from-brand-300 to-brand-500',
    description: '緑茶とのブレンドにも最適。朝の目覚めを香りで整える軽やかな焙煎玄米。',
    image: '/packaging/pkg-01.png',
  },
  {
    id: 'yoru100',
    name: '夜の焙 YORU-HOU 100g',
    en: 'Dark Roast 100g',
    price: 1400,
    tag: '深焙煎 × 深み',
    bg: 'from-brand-700 to-brand-900',
    description: '単体飲用に。ノンカフェインなので夜のリラックスタイムにも。',
    image: '/packaging/pkg-02.png',
  },
]

const FEATURES = [
  {
    icon: '♨',
    title: 'ノンカフェイン',
    body: '玄米100%の単一素材だから、妊娠中・就寝前にも安心して飲めます。',
  },
  {
    icon: '🌾',
    title: '宮城の焙煎工場',
    body: '創業1956年。祖父母から受け継いだ釜で、200℃の直火焙煎。',
  },
  {
    icon: '✦',
    title: '単一素材の贅沢',
    body: '市販の玄米茶の85%はブレンド品。焙煎玄米100%の深い香ばしさを。',
  },
  {
    icon: '♡',
    title: '母娘2人の手仕事',
    body: '焙煎〜選別〜袋詰めまで、母と娘の2人体制で丁寧に仕上げます。',
  },
]

const TESTIMONIALS = [
  {
    name: 'M.S. さん (30代・女性)',
    body: '妊娠中でカフェインを控えていて出会いました。こんなに香ばしい玄米茶は初めて。',
    stars: 5,
  },
  {
    name: 'K.T. さん (50代・男性)',
    body: '夜寝る前の一杯が習慣に。深焙煎の香りで、気持ちがすっと落ち着きます。',
    stars: 5,
  },
  {
    name: 'A.N. さん (20代・女性)',
    body: 'お試しセットで朝と夜の飲み比べが楽しかった。パッケージも可愛い!',
    stars: 5,
  },
]

const FAQ = [
  {
    q: 'いつ頃届きますか?',
    a: 'ご注文から3〜5営業日で発送します。焙煎してから2週間以内のロットを選んでお届けします。',
  },
  {
    q: '賞味期限は?',
    a: '焙煎日から6ヶ月です。開封後は密閉容器に入れ、1ヶ月以内にお飲みいただくと香りが最もお楽しみいただけます。',
  },
  {
    q: '飲み方は?',
    a: '熱湯200mlに対し茶葉3〜5g(大さじ1弱)、30秒〜1分の抽出がおすすめ。2煎目も美味しくお楽しみいただけます。',
  },
  {
    q: 'ギフト対応は?',
    a: '2026年夏頃、のし・包装対応のギフトボックスをリリース予定です。それまでは、お試しセット+手書きカードでお贈りいただけます。',
  },
  {
    q: 'お米の価格が高騰していますが、値上げはありますか?',
    a: '2024年以降の玄米相場高騰の影響で、今後やむを得ず価格を見直す可能性があります。現在の価格は応援価格として、在庫限りで提供中です。',
  },
]

export default function Shop() {
  return (
    <div className="space-y-10 md:space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-matcha-700 px-5 py-10 text-white shadow-xl md:px-10 md:py-16">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-brand-300/15 to-transparent" />
        <div className="relative grid items-center gap-6 md:grid-cols-[1.1fr_1fr] md:gap-10">
          <div>
            <div className="mb-4 flex items-center gap-2 md:mb-6">
              <div className="h-px w-8 bg-brand-200 md:w-12" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-100 md:text-xs">
                GENMAICHA-CHAN / BASE STORE
              </span>
            </div>
            <h1 className="mb-3 font-serif text-3xl font-bold leading-tight md:mb-5 md:text-5xl">
              焙煎玄米100%、
              <br />
              ひと釜ずつ、丁寧に。
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-brand-100 md:mb-8 md:text-base">
              宮城の小さな工場で、創業70年の家族が焙煎する玄米茶。
              ノンカフェインで香ばしく、単一素材ならではの深い味わい。
              <br />
              まずは{' '}
              <strong className="font-semibold text-white">¥500 お試し</strong>{' '}
              か{' '}
              <strong className="font-semibold text-white">¥980 4種フライト</strong>{' '}
              からどうぞ。
            </p>
            <div className="flex flex-col gap-3 md:flex-row">
              <a
                href={BASE_SHOP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-900 shadow-lg hover:bg-brand-50 md:px-8 md:py-4 md:text-base"
              >
                BASE でお試しセットを買う →
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 md:px-8 md:py-4 md:text-base"
              >
                商品を見る
              </a>
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-sm justify-self-center">
            <img
              src="/biz-manga/biz-08.png"
              alt="玄米茶ちゃん お試しセット"
              className="h-full w-full rounded-2xl object-cover shadow-2xl"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement
                img.style.display = 'none'
              }}
            />
            <div className="absolute -bottom-3 -right-3 rounded-full bg-washi-50 px-4 py-2 font-serif text-sm font-bold text-brand-800 shadow-lg md:text-base">
              ¥500 送料込み
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="features">
        <div className="mb-5 flex items-end justify-between md:mb-8">
          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-matcha-600 md:text-xs">
              Product Lineup
            </div>
            <h2 className="text-xl font-bold text-brand-900 md:text-2xl">
              4 つのスターターと焙煎玄米
            </h2>
            <p className="mt-1 text-xs text-brand-700/70 md:text-sm">
              ¥500 と ¥980 の二段エントリーから、お好みで本商品 100g へ。
            </p>
          </div>
          <a
            href={BASE_SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md border border-brand-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 md:inline-block"
          >
            BASE 全商品ページ →
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.bg}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover opacity-80"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement
                    img.style.display = 'none'
                  }}
                />
                {p.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-brand-800 shadow md:text-xs">
                    {p.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="inline-block rounded bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-brand-700 md:text-xs">
                    {p.tag}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-matcha-600 md:text-xs">
                    {p.en}
                  </div>
                  <h3 className="mt-1 font-serif text-lg font-bold text-brand-900 md:text-xl">
                    {p.name}
                  </h3>
                </div>
                <p className="flex-1 text-xs leading-relaxed text-brand-800/80 md:text-sm">
                  {p.description}
                </p>
                <div className="flex items-end justify-between border-t border-washi-200 pt-3">
                  <div className="font-serif text-2xl font-bold text-brand-900 md:text-3xl">
                    ¥{p.price.toLocaleString()}
                    <span className="ml-1 text-[10px] font-normal text-brand-700/60 md:text-xs">
                      税込
                    </span>
                  </div>
                  <a
                    href={BASE_SHOP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-brand-700 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-800 md:text-sm"
                  >
                    BASE で買う →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="mb-5 md:mb-8">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-matcha-600 md:text-xs">
            Why Genmaicha-chan?
          </div>
          <h2 className="text-xl font-bold text-brand-900 md:text-2xl">
            玄米茶ちゃんの4つの約束
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4 md:gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-washi-200 bg-white p-5 shadow-sm md:p-6"
            >
              <div className="mb-3 text-2xl text-brand-600 md:text-3xl">{f.icon}</div>
              <h3 className="mb-2 font-serif text-base font-bold text-brand-900 md:text-lg">
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed text-brand-800/80 md:text-sm">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Rice inflation story */}
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-washi-100 to-washi-200 p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-[240px_1fr] md:gap-10">
          <div className="relative aspect-square w-full max-w-[240px] justify-self-center md:justify-self-start">
            <img
              src="/biz-manga/biz-04.png"
              alt="お米高騰エピソード"
              className="h-full w-full rounded-xl object-cover shadow-lg"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement
                img.style.display = 'none'
              }}
            />
          </div>
          <div>
            <div className="mb-2 inline-block rounded-full bg-brand-700 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white md:text-xs">
              Our Challenge
            </div>
            <h2 className="font-serif text-xl font-bold text-brand-900 md:text-2xl">
              お米の値段が高騰している、という現実。
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-800 md:text-base">
              2024年から続くお米の値上がりで、玄米の仕入れ価格は2年で<strong className="font-semibold text-brand-700">+60%</strong>上昇しました(¥480/kg → ¥770/kg)。
              小さな工場にとって、これは決して軽い話ではありません。
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-800 md:text-base">
              それでも、私たちは<strong className="font-semibold text-brand-700">卸一本ではなく直販にシフトすること</strong>、
              そして<strong className="font-semibold text-brand-700">単一素材の質で勝負すること</strong>で、
              この原材料高騰を乗り越えるつもりです。¥500のお試しセットは、
              まず「焙 HOU を知ってもらう」ための、私たちからの最初のメッセージです。
            </p>
            <div className="mt-5 rounded-lg border-l-4 border-brand-600 bg-white px-4 py-3 text-xs italic text-brand-800/80 md:text-sm">
              「原材料が上がっても、焙く気持ちは変わりません。」 — 玄米茶ちゃん 4代目
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="mb-5 md:mb-8">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-matcha-600 md:text-xs">
            Voices
          </div>
          <h2 className="text-xl font-bold text-brand-900 md:text-2xl">お客様の声</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-washi-200 bg-white p-5 shadow-sm md:p-6"
            >
              <div className="mb-3 text-matcha-600">
                {'★'.repeat(t.stars)}
                <span className="text-washi-200">{'★'.repeat(5 - t.stars)}</span>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-brand-800/90 md:text-base">
                「{t.body}」
              </p>
              <div className="text-xs font-semibold text-brand-700 md:text-sm">
                — {t.name}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-brand-700/50 md:text-xs">
          ※ 掲載の声は開発段階のモニター様からいただいた感想です。
        </p>
      </section>

      {/* FAQ */}
      <section>
        <div className="mb-5 md:mb-8">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-matcha-600 md:text-xs">
            FAQ
          </div>
          <h2 className="text-xl font-bold text-brand-900 md:text-2xl">よくある質問</h2>
        </div>
        <div className="space-y-3 md:space-y-4">
          {FAQ.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-washi-200 bg-white shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 md:p-5">
                <span className="font-serif text-sm font-bold text-brand-900 md:text-base">
                  Q. {item.q}
                </span>
                <span className="flex-shrink-0 text-brand-600 transition group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <div className="border-t border-washi-200 p-4 text-xs leading-relaxed text-brand-800 md:p-5 md:text-sm">
                A. {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 px-6 py-10 text-center text-white md:px-10 md:py-14">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-100 md:text-xs">
          Start With ¥500 or ¥980
        </div>
        <h2 className="mb-3 font-serif text-2xl font-bold md:text-3xl">
          はじめての一杯を、焙 HOU で。
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-brand-100 md:text-base">
          ¥500「とりあえず一杯」セット(10g×2) か、¥980 4種フライト
          (中焙煎・深煎り・抹茶混合・塩玄米 5g×4)。
          <br />
          70年の焙煎を、自分のペースでお試しください。
        </p>
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
          <a
            href={BASE_SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-bold text-brand-900 shadow-lg hover:bg-brand-50 md:px-10 md:py-5 md:text-lg"
          >
            ¥500 お試しセットを買う →
          </a>
          <a
            href={BASE_SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-base font-bold text-white hover:bg-white/10 md:px-10 md:py-5 md:text-lg"
          >
            ¥980 4種フライトを買う →
          </a>
        </div>
        <p className="mt-4 text-[10px] text-brand-200/70 md:text-xs">
          ※ BASE 店舗は 2026 年夏オープン予定(準備中)。リンク先は仮 URL です。
        </p>
      </section>
    </div>
  )
}
