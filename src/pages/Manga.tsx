type Panel = {
  no: string
  title: string
  scene: string
  narration: string
  dialogue?: string
  prompt: string
  image: string
}

const CHARACTERS = [
  {
    name: '玄米茶ちゃん',
    role: '主人公 / 20代 女性経営者',
    note: '宮城県で焙煎玄米専業のおばあちゃん・お母さんを支えながら、新ブランド「焙 HOU」の立ち上げを決意する。愛称「玄米茶ちゃん」。',
  },
  {
    name: 'お母さん',
    role: '母 / 現役焙煎士',
    note: '工場を引き継いで30年以上の焙煎歴。玄米茶ちゃんの最大の理解者であり、最大の心配役。',
  },
  {
    name: '商工会議所 指導員さん',
    role: 'メンター役',
    note: '補助金・制度融資・地域連携の導線を提示する、実務サイドのキャラクター。',
  },
]

const PANELS: Panel[] = [
  {
    no: '1',
    title: '朝の工場',
    scene: '宮城県の小さな焙煎工場。夜明け前、釜の温度が上がり、玄米が踊る。',
    narration:
      'おばあちゃんが始め、お母さんが守ってきたこの焙煎釜。わたしの朝は、いつもこの香りから始まる。',
    dialogue: '玄米茶ちゃん: 「…今日も、いい焙けだ。」',
    prompt:
      'shojo manga style, pre-dawn scene inside a small traditional Japanese roasting factory in Miyagi, wooden beams, warm orange glow from a large roasting drum, a young woman in her 20s wearing a traditional work apron and bandana, gently lifting a wooden scoop of roasted brown rice, soft morning light through an old window, breath slightly visible, warm sepia and amber color palette, high contrast ink outlines, screentone shading, Japanese manga panel composition with borders',
    image: '/manga/panel-01.png',
  },
  {
    no: '2',
    title: '受け継がれた工場',
    scene: '工場の壁に飾られた白黒の家族写真。おじいちゃんとおばあちゃんが映っている。',
    narration:
      '焙煎玄米"だけ"を、70年。おじいちゃんとおばあちゃんが作ってきた工場は、お母さんの手を経て、わたしのところまで来ている。',
    prompt:
      'shojo manga style, close-up of an old black-and-white framed family photo on a wooden wall, showing an elderly couple in front of a small Japanese factory, beside it a fresh calendar and a cup of steaming green tea with roasted brown rice, warm beige background, gentle nostalgia, ink outlines with light screentone, manga panel frame',
    image: '/manga/panel-02.png',
  },
  {
    no: '3',
    title: 'お母さんとの会話',
    scene: '焙煎釜の前、お母さんと玄米茶ちゃんが並んで立っている。',
    narration: 'お母さんはいつも、わたしより一歩先に答えを持っている。',
    dialogue:
      'お母さん: 「ブランド、やりたいんでしょ？」\n玄米茶ちゃん: 「…バレてた。」',
    prompt:
      'shojo manga style, medium shot of two women standing in front of a large roasting drum: a mother in her 50s wearing work clothes with a calm smile, and her daughter (20s) looking slightly surprised, warm amber lighting, steam rising, visible rice grains on a tray, speech bubbles in Japanese, screentone shading, manga panel style',
    image: '/manga/panel-03.png',
  },
  {
    no: '4',
    title: '海外需要の発見',
    scene: 'ノートPCの画面に英語でGENMAICHAの海外記事が並ぶ。',
    narration:
      '海外では、抹茶の次に"Genmaicha"が名指しで探されている。焙煎玄米そのものを、まだ誰も真ん中に置いていない。',
    prompt:
      'shojo manga style, close-up of a laptop screen showing English articles about Japanese tea (with "GENMAICHA" highlighted), a young Japanese woman in her 20s looking intently at the screen while holding a cup of roasted brown rice tea, cozy cafe setting with a notebook and pen, warm golden hour light, manga ink outlines, screentone, panel composition',
    image: '/manga/panel-04.png',
  },
  {
    no: '5',
    title: '商工会議所での相談',
    scene: '商工会議所の相談室。指導員さんと向き合う玄米茶ちゃん。',
    narration:
      '"スモールスタートで、お母さんと2人のままでもできるやり方を考えましょう。" 地域の人たちが、最初の伴走者になってくれる。',
    dialogue:
      '指導員さん: 「補助金、制度融資、卸先の紹介。まずは商工会議所をフルに使いましょう。」',
    prompt:
      'shojo manga style, medium shot inside a Japanese chamber of commerce meeting room, a young Japanese woman (20s) in a simple office outfit sitting across from a middle-aged consultant in a business suit, both smiling, papers and a laptop on a white table, soft fluorescent lighting, city view through blinds, speech bubbles in Japanese, screentone shading, manga panel',
    image: '/manga/panel-05.png',
  },
  {
    no: '6',
    title: 'ブランド立ち上げ',
    scene: '「焙 HOU」のロゴが印刷されたパッケージを玄米茶ちゃんが手に取る。',
    narration:
      '焙煎玄米だけで、玄米茶の常識を焙き直す。わたしたちの小さな工場から、新しい物語が始まる。',
    dialogue: '玄米茶ちゃん: 「焙 HOU、始めます。」',
    prompt:
      'shojo manga style, close-up of a young Japanese woman (20s) smiling softly while holding a stylish brown paper package with a minimalist kanji logo "焙" and "HOU" written on it, warm sunlight, factory in soft-focus background, a small matcha-green ribbon on the package, warm amber and cream color palette, ink outlines, screentone shading, hopeful atmosphere, manga final panel style',
    image: '/manga/panel-06.png',
  },
]

export default function Manga() {
  return (
    <div className="space-y-10 md:space-y-14">
      <header className="border-b border-stone-200 pb-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-px w-6 bg-brand-500" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
            MANGA / 06 PANELS
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-stone-900 md:text-4xl">
          焙 HOU 物語 — 宮城の小さな焙煎工場から
        </h1>
        <p className="mt-2 text-sm text-stone-600 md:text-base">
          全6コマ構成の短編漫画。主人公は焙煎玄米工場の3代目・
          <span className="font-semibold text-brand-700">玄米茶ちゃん</span>
          (20代 女性経営者・仮名)。実画像は{' '}
          <span className="mx-1 rounded bg-stone-900 px-1.5 py-0.5 font-mono text-[10px] text-brand-200 md:text-xs">
            nano banana pro
          </span>
          で生成しています。
        </p>
      </header>

      {/* Characters */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-900 md:text-2xl">登場人物(仮名)</h2>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {CHARACTERS.map((c) => (
            <div
              key={c.name}
              className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
                {c.role}
              </div>
              <div className="mt-1 font-serif text-lg font-bold text-stone-900">{c.name}</div>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{c.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Panels */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-900 md:text-2xl">
          コマ割り(6コマ)
        </h2>
        <div className="space-y-6 md:space-y-8">
          {PANELS.map((panel) => (
            <article
              key={panel.no}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <div className="grid md:grid-cols-[320px_1fr]">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-100 via-brand-50 to-stone-100 md:aspect-auto">
                  <img
                    src={panel.image}
                    alt={`Panel ${panel.no} — ${panel.title}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                    }}
                  />
                  <div className="absolute left-3 top-3 rounded bg-stone-900/80 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-200 md:text-xs">
                    Panel {panel.no}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 font-serif text-sm font-bold text-white drop-shadow md:text-base">
                    {panel.title}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 p-5 md:p-6">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
                      シーン
                    </div>
                    <p className="mt-1 text-sm text-stone-700 md:text-base">{panel.scene}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
                      ナレーション
                    </div>
                    <p className="mt-1 font-serif text-sm leading-relaxed text-stone-900 md:text-base">
                      {panel.narration}
                    </p>
                  </div>
                  {panel.dialogue && (
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
                        セリフ
                      </div>
                      <pre className="mt-1 whitespace-pre-wrap font-sans text-sm leading-relaxed text-stone-700 md:text-base">
                        {panel.dialogue}
                      </pre>
                    </div>
                  )}
                  <details className="rounded-lg border border-stone-800 bg-stone-900 p-3 text-xs text-brand-100 md:p-4">
                    <summary className="cursor-pointer text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-300 md:text-xs">
                      nano banana pro プロンプト(展開)
                    </summary>
                    <div className="mt-2 font-mono text-xs text-brand-100 md:text-sm">
                      {panel.prompt}
                    </div>
                  </details>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About generation */}
      <section className="rounded-2xl bg-stone-900 p-6 text-white md:p-10">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-300 md:text-xs">
          About The Artwork
        </div>
        <h2 className="mb-3 font-serif text-xl font-bold md:text-2xl">
          画像は nano banana pro で生成
        </h2>
        <p className="text-sm leading-relaxed text-stone-300 md:text-base">
          本漫画の各コマは、Google Gemini 系の画像生成モデル{' '}
          <code className="rounded bg-stone-800 px-1.5 py-0.5 text-xs text-brand-200">
            nano-banana-pro-preview
          </code>{' '}
          を用いて生成しました。主人公「玄米茶ちゃん」は、実在の関係者を特定しないための仮名です。
        </p>
      </section>
    </div>
  )
}
