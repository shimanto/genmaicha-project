type Panel = {
  no: string
  title: string
  scene: string
  narration: string
  dialogue?: string
  prompt: string
}

const CHARACTERS = [
  {
    name: '松本 穂香 (まつもと ほのか)',
    role: '主人公 / 20代若手経営者',
    note: '宮城県で焙煎玄米専業の祖父母・母を支えながら、新ブランド「焙 HOU」の立ち上げを決意する。',
  },
  {
    name: '松本 芳江 (まつもと よしえ)',
    role: '母 / 現役焙煎士',
    note: '祖父母から工場を継いで30年以上の焙煎歴。穂香の最大の理解者であり、最大の心配役。',
  },
  {
    name: '商工会議所・経営指導員',
    role: 'メンター役',
    note: '補助金・制度融資・地域連携の導線を提示する実務サイドのキャラクター。',
  },
]

const PANELS: Panel[] = [
  {
    no: '1',
    title: '朝の工場',
    scene: '宮城県の小さな焙煎工場。夜明け前、釜の温度が上がり、玄米が踊る。',
    narration:
      '祖父母が始め、母が守ってきたこの焙煎釜。わたしの朝は、いつもこの香りから始まる。',
    dialogue: '穂香: 「…今日も、いい焙けだ。」',
    prompt:
      'shojo manga style, pre-dawn scene inside a small traditional Japanese roasting factory in Miyagi, wooden beams, warm orange glow from a large roasting drum, a young woman in her 20s (name: Honoka) wearing a traditional work apron and bandana, gently lifting a wooden scoop of roasted brown rice, soft morning light through an old window, breath slightly visible, warm sepia and amber color palette, high contrast ink outlines, screentone shading, Japanese manga panel composition with borders',
  },
  {
    no: '2',
    title: '祖父母からの継承',
    scene: '工場の壁に飾られた白黒の家族写真。祖父母が映っている。',
    narration:
      '焙煎玄米"だけ"を、70年。おじいちゃんとおばあちゃんが作ってきた工場は、母の手を経て、わたしのところまで来ている。',
    prompt:
      'shojo manga style, close-up of an old black-and-white framed family photo on a wooden wall, showing an elderly couple in front of a small Japanese factory, beside it a fresh calendar and a cup of steaming green tea with roasted brown rice, warm beige background, gentle nostalgia, ink outlines with light screentone, manga panel frame',
  },
  {
    no: '3',
    title: '母との会話',
    scene: '焙煎釜の前、母と穂香が並んで立っている。',
    narration: '母はいつも、わたしより一歩先に答えを持っている。',
    dialogue:
      '母: 「ブランド、やりたいんでしょ？」\n穂香: 「…バレてた。」',
    prompt:
      'shojo manga style, medium shot of two women standing in front of a large roasting drum: a mother in her 50s wearing work clothes with a calm smile, and her daughter (Honoka, 20s) looking slightly surprised, warm amber lighting, steam rising, visible rice grains on a tray, speech bubbles in Japanese, screentone shading, manga panel style',
  },
  {
    no: '4',
    title: '海外需要の発見',
    scene: 'ノートPCの画面に英語でGENMAICHAの海外記事が並ぶ。',
    narration:
      '海外では、抹茶の次に"Genmaicha"が名指しで探されている。焙煎玄米そのものを、まだ誰も真ん中に置いていない。',
    prompt:
      'shojo manga style, close-up of a laptop screen showing English articles about Japanese tea (with "GENMAICHA" highlighted), the protagonist Honoka looking intently at the screen while holding a cup of roasted brown rice tea, cozy cafe setting with a notebook and pen, warm golden hour light, manga ink outlines, screentone, panel composition',
  },
  {
    no: '5',
    title: '商工会議所での相談',
    scene: '商工会議所の相談室。経営指導員と向き合う穂香。',
    narration:
      '"スモールスタートで、母と2人のままでもできるやり方を考えましょう。" 地域の人たちが、最初の伴走者になってくれる。',
    dialogue:
      '指導員: 「補助金、制度融資、卸先の紹介。まずは商工会議所をフルに使いましょう。」',
    prompt:
      'shojo manga style, medium shot inside a Japanese chamber of commerce meeting room, a young woman (Honoka, 20s) in a simple office outfit sitting across from a middle-aged consultant in a business suit, both smiling, papers and a laptop on a white table, soft fluorescent lighting, city view through blinds, speech bubbles in Japanese, screentone shading, manga panel',
  },
  {
    no: '6',
    title: 'ブランド立ち上げ',
    scene: '「焙 HOU」のロゴが印刷されたパッケージを穂香が手に取る。',
    narration:
      '焙煎玄米だけで、玄米茶の常識を焙き直す。わたしたちの小さな工場から、新しい物語が始まる。',
    dialogue: '穂香: 「焙 HOU、始めます。」',
    prompt:
      'shojo manga style, close-up of a young woman (Honoka, 20s) smiling softly while holding a stylish brown paper package with a minimalist kanji logo "焙" and "HOU" written on it, warm sunlight, factory in soft-focus background, a small matcha-green ribbon on the package, warm amber and cream color palette, ink outlines, screentone shading, hopeful atmosphere, manga final panel style',
  },
]

export default function Manga() {
  return (
    <div className="space-y-10 md:space-y-14">
      <header className="border-b border-stone-200 pb-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-px w-6 bg-brand-500" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
            MANGA SYNOPSIS / 06
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-stone-900 md:text-4xl">
          焙 HOU 物語 — 宮城の小さな焙煎工場から
        </h1>
        <p className="mt-2 text-sm text-stone-600 md:text-base">
          全6コマ構成の短編漫画シノプシス(作画用プロンプト付き)。実画像は
          <span className="mx-1 rounded bg-stone-900 px-1.5 py-0.5 font-mono text-[10px] text-brand-200 md:text-xs">
            nano banana pro
          </span>
          で生成する想定です。生成後は
          <code className="mx-1 rounded bg-stone-100 px-1 py-0.5 text-[11px]">
            public/manga/panel-01.png
          </code>
          のような名前で配置し、本ページ内で差し替え可能な構造にしています。
        </p>
      </header>

      {/* Characters */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-stone-900 md:text-2xl">登場人物</h2>
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
          コマ割り(6コマ + プロンプト)
        </h2>
        <div className="space-y-6 md:space-y-8">
          {PANELS.map((panel) => (
            <article
              key={panel.no}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <div className="grid md:grid-cols-[280px_1fr]">
                {/* Image placeholder */}
                <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-brand-100 via-brand-50 to-stone-100 md:aspect-auto">
                  <div className="text-center">
                    <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
                      Panel {panel.no}
                    </div>
                    <div className="mt-2 font-serif text-xl font-bold text-stone-800 md:text-2xl">
                      {panel.title}
                    </div>
                    <div className="mt-3 text-[11px] text-stone-500 md:text-xs">
                      /public/manga/panel-0{panel.no}.png
                    </div>
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
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
                      nano banana pro プロンプト
                    </div>
                    <div className="mt-1 rounded-lg border border-stone-800 bg-stone-900 p-3 font-mono text-xs text-brand-100 md:p-4 md:text-sm">
                      {panel.prompt}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How to generate */}
      <section className="rounded-2xl bg-stone-900 p-6 text-white md:p-10">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-300 md:text-xs">
          How To Generate
        </div>
        <h2 className="mb-3 font-serif text-xl font-bold md:text-2xl">
          画像の生成と差し替えフロー
        </h2>
        <ol className="ml-5 list-decimal space-y-2 text-sm text-stone-300 md:text-base">
          <li>nano banana pro にアクセスし、各プロンプトを順番に入力</li>
          <li>
            出力画像から"顔の一貫性"があるものを選定(穂香の顔を最初に固定し、以降はそれを参照)
          </li>
          <li>
            出力を <code>public/manga/panel-01.png 〜 panel-06.png</code>{' '}
            としてリポジトリに配置
          </li>
          <li>本ページの画像プレースホルダーを <code>&lt;img /&gt;</code> に差し替え</li>
          <li>
            A5 / A4 印刷用の PDF を別途 <code>docs/manga-a5.pdf</code> として追加する
          </li>
        </ol>
      </section>
    </div>
  )
}
