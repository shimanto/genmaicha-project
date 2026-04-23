type Variant = 'full' | 'compact' | 'banner'

type Props = {
  variant?: Variant
  className?: string
}

/**
 * 実工場で生産中の 2 種(玄米あられ / 白くはじけた玄米)と、
 * 将来追加候補(黒焙煎 / 未発芽 / 発芽焙煎)+ 工場増設方針を明示する共通 callout。
 *
 * - variant="full":     詳細(2種 + 3候補 + 工場増設、資料内の解説用)
 * - variant="compact":  要約(LP / Products の補足に最適)
 * - variant="banner":   1 行バナー (ヘッダー直下)
 */
export default function ActualProductsNote({ variant = 'compact', className = '' }: Props) {
  if (variant === 'banner') {
    return (
      <div
        className={`flex flex-wrap items-center gap-2 rounded-lg border border-matcha-300 bg-matcha-50 px-3 py-2 text-[11px] leading-relaxed text-matcha-900 md:text-xs ${className}`}
      >
        <span className="rounded bg-matcha-600 px-1.5 py-0.5 font-semibold text-white">
          実商品
        </span>
        <span>
          現在生産中: <strong>玄米あられ(炒り玄米)</strong> / <strong>白くはじけた玄米(ポップライス・花)</strong>。
          将来候補: 黒焙煎 / 未発芽炒り / 発芽焙煎(工場増設検討)。
        </span>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <aside
        className={`rounded-xl border border-matcha-300 bg-matcha-50 p-4 md:p-5 ${className}`}
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded bg-matcha-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white md:text-xs">
            ACTUAL LINEUP
          </span>
          <span className="text-xs font-semibold text-matcha-900 md:text-sm">
            実工場で生産している商品 (現行 2 種 + 将来候補)
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          <div className="rounded-lg bg-white p-3 text-xs md:text-sm">
            <div className="mb-1 font-semibold text-brand-900">現在の取扱 (2 種)</div>
            <ul className="space-y-1 text-brand-800">
              <li>① <strong>玄米あられ</strong>(炒り玄米)</li>
              <li>② <strong>白くはじけた玄米</strong>(ポップライス・花)</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-3 text-xs md:text-sm">
            <div className="mb-1 font-semibold text-brand-900">将来追加候補 (3 種 + 工場増設)</div>
            <ul className="space-y-1 text-brand-800">
              <li>③ 黒玄米(黒焙煎)</li>
              <li>④ 普通炒り玄米(未発芽)</li>
              <li>⑤ 発芽玄米の焙煎(要・発芽設備)</li>
            </ul>
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-matcha-900/80 md:text-xs">
          本サイトの ASA-HOU / YORU-HOU などの SKU 呼称は、これら実商品を焙煎度軸で再編成した仮称です。
          実発売時には実体(あられ / ポップライス / 将来の黒焙煎など)に紐づけて表示します。
          詳細: <a href="/#documents" className="underline">資料タブ → 実際の取扱商品ラインナップ</a>
        </p>
      </aside>
    )
  }

  // full
  return (
    <section
      className={`rounded-2xl border border-matcha-300 bg-matcha-50 p-5 md:p-7 ${className}`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded bg-matcha-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white md:text-xs">
          ACTUAL LINEUP
        </span>
        <span className="text-xs font-semibold text-matcha-900 md:text-sm">
          実工場で生産している商品ラインナップ
        </span>
      </div>
      <h2 className="mb-3 font-serif text-lg font-bold text-matcha-900 md:text-xl">
        現在の取扱 2 種 + 将来候補 3 種 + 工場増設
      </h2>

      <div className="mb-5 grid gap-3 md:grid-cols-2 md:gap-5">
        <div className="rounded-xl bg-white p-4">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-matcha-600 md:text-xs">
            Now Producing
          </div>
          <ul className="space-y-2 text-xs text-brand-800 md:text-sm">
            <li>
              <strong className="text-brand-900">① 玄米あられ(炒り玄米)</strong>
              <div className="text-[11px] text-brand-700/80 md:text-xs">
                クランチ系、米粒形を保った炒り仕上げ。玄米茶ブレンド用の主力。
              </div>
            </li>
            <li>
              <strong className="text-brand-900">② 白くはじけた玄米(ポップライス・花)</strong>
              <div className="text-[11px] text-brand-700/80 md:text-xs">
                ポップコーン状に白く膨らんだ玄米。茶席の視覚アクセント。
              </div>
            </li>
          </ul>
        </div>
        <div className="rounded-xl bg-white p-4">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-matcha-600 md:text-xs">
            Future Candidates
          </div>
          <ul className="space-y-2 text-xs text-brand-800 md:text-sm">
            <li>
              <strong className="text-brand-900">③ 黒玄米(黒焙煎)</strong>
              <div className="text-[11px] text-brand-700/80 md:text-xs">
                深焙煎を極限まで → ラテ / 海外 darker-roast 層。現行釜で試作可。
              </div>
            </li>
            <li>
              <strong className="text-brand-900">④ 普通炒り玄米(未発芽)</strong>
              <div className="text-[11px] text-brand-700/80 md:text-xs">
                料理用・業務用卸の大容量ロット。既存ラインで対応可。
              </div>
            </li>
            <li>
              <strong className="text-brand-900">⑤ 発芽玄米の焙煎</strong>
              <div className="text-[11px] text-brand-700/80 md:text-xs">
                GABA 訴求の高単価品。<strong>発芽タンク + 乾燥機の新設備が必須</strong>。
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg border-l-4 border-matcha-600 bg-white px-4 py-3 text-xs leading-relaxed text-matcha-900 md:text-sm">
        💡 <strong>基本方針</strong>: 既存 2 種を最大限活かしつつ、売上 ¥1,500〜¥3,000 万で ③④ 追加、
        ¥5,000 万超で ⑤ + 工場増設を段階的に検討。サイト上の ASA-HOU / YORU-HOU 等の SKU 呼称は
        焙煎度軸の仮称で、実商品を紐づけて運用します。
      </div>
      <p className="mt-3 text-[11px] text-matcha-900/70 md:text-xs">
        全文: <a href="/#documents" className="underline font-semibold">資料タブ → 実際の取扱商品ラインナップ</a>
      </p>
    </section>
  )
}
