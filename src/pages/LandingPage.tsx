import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

type NavTarget =
  | 'lp'
  | 'manga'
  | 'business'
  | 'category'
  | 'global'
  | 'pricing'
  | 'initiatives'
  | 'documents'

type Props = {
  onNavigate: (page: NavTarget) => void
}

export default function LandingPage({ onNavigate }: Props) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const siteUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : 'https://genmaicha-tanpo.pages.dev/'

  useEffect(() => {
    QRCode.toDataURL(siteUrl, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 360,
      color: {
        dark: '#603419',
        light: '#fdfaf3',
      },
    }).then(setQrDataUrl)
  }, [siteUrl])

  return (
    <div className="space-y-10 md:space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-matcha-700 px-5 py-10 text-white shadow-xl md:px-10 md:py-16">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-brand-300/15 to-transparent" />
        <div className="relative max-w-3xl">
          <div className="mb-4 flex items-center gap-2 md:mb-6">
            <div className="h-px w-8 bg-brand-200 md:w-12" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-100 md:text-xs">
              TSUMUGI 紡
            </span>
          </div>
          <h1 className="mb-4 font-serif text-3xl font-bold leading-tight md:mb-6 md:text-5xl">
            焙煎玄米の老舗を、
            <br />
            <span className="bg-gradient-to-r from-brand-100 to-brand-300 bg-clip-text text-transparent">
              世界へ紡ぐ。
            </span>
          </h1>
          <p className="mb-3 text-sm text-brand-50 md:mb-4 md:text-lg">
            琥珀色の一杯を、宮城から世界の食卓へ。
          </p>
          <p className="mb-6 text-xs leading-relaxed text-brand-100/90 md:mb-8 md:text-base">
            宮城の小さな焙煎工場で、祖父祖母から受け継いだ「玄米茶用 焙煎玄米」専業メーカー。
            4代目・松永つむぎが、母と二人三脚で守ってきた老舗を、
            既存事業を止めずに玄米茶ブランドへとリブランドし、海外市場へと紡ぎ直していく構想です。
          </p>
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-3">
            <button
              onClick={() => onNavigate('manga')}
              className="rounded-lg bg-brand-200 px-4 py-2.5 text-sm font-semibold text-brand-900 shadow hover:bg-brand-100 md:px-6 md:py-3 md:text-base"
            >
              漫画で読む
            </button>
            <button
              onClick={() => onNavigate('business')}
              className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-brand-800 shadow hover:bg-washi-100 md:px-6 md:py-3 md:text-base"
            >
              事業説明
            </button>
            <button
              onClick={() => onNavigate('initiatives')}
              className="rounded-lg border border-brand-200/60 bg-brand-900/40 px-4 py-2.5 text-sm font-semibold text-brand-100 shadow hover:bg-brand-900/60 md:px-6 md:py-3 md:text-base"
            >
              10の施策
            </button>
            <button
              onClick={() => onNavigate('documents')}
              className="rounded-lg border border-white/40 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 md:px-6 md:py-3 md:text-base"
            >
              資料一覧
            </button>
          </div>
        </div>
      </section>

      {/* Story / 3 strengths */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-brand-900 md:mb-8 md:text-2xl">
          「紡」3つの軸
        </h2>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <Card
            title="本気の焙煎玄米"
            body="100年近く玄米茶用の焙煎玄米だけを焼いてきた老舗。中焙煎(玄米茶用)と深煎り(単品飲用・料理用)の2種を、母娘2人で1釜ずつ手仕上げ。"
          />
          <Card
            title="既存事業を止めない継承"
            body="お茶問屋への卸はそのまま継続。新ブランド「紡」は休日と早朝の余剰時間でスモールスタート。資金とリソースを最小化した二刀流。"
          />
          <Card
            title="海外への紡ぎ直し"
            body="Genmaichaは欧米でじわじわ伸長中。和食ブームと健康志向に乗せ、Etsy・Amazon Global・越境ECで小ロットから世界へ。"
          />
        </div>
      </section>

      {/* 玄米茶のいま (mini-stats) */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-brand-900 md:mb-8 md:text-2xl">
          玄米茶の「いま」を数字で
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Stat label="国内 緑茶市場 (2024)" value="約 4,200 億円" sub="うち玄米茶含む下位カテゴリは数百億円規模" />
          <Stat label="海外 抹茶/緑茶輸出額" value="364 億円 (2023)" sub="10年で約4倍 / 年率15%超の伸長" />
          <Stat label="玄米茶 海外単価倍率" value="2.5 〜 4倍" sub="国内卸 vs 米欧オンライン小売の参考レンジ" />
          <Stat label="工場体制" value="2人 + 1釜" sub="母娘体制 / 既存卸を止めない範囲でスモールスタート" />
        </div>
        <p className="mt-3 text-xs text-brand-800/70 md:text-sm">
          ※ 数値は公開データ・参考レンジで、商品設計・販売戦略の前提として「カテゴリー」「海外需要」「価格比較」ページで詳述します。
        </p>
      </section>

      {/* 漫画ティーザー */}
      <section className="overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="aspect-[4/5] bg-gradient-to-br from-brand-100 via-washi-100 to-matcha-100 md:aspect-auto">
            <img
              src="/manga/cover.png"
              alt="紡 漫画 — 4代目つむぎの挑戦"
              className="h-full w-full object-cover"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-10">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
              MANGA
            </div>
            <h2 className="mb-3 font-serif text-xl font-bold text-brand-900 md:text-3xl">
              4代目つむぎの紡ぎ方。
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-brand-800 md:text-base">
              祖父母から受け継いだ焙煎工場。母と二人で1釜を回す日々。
              「ここを継ぐ」と決めた20代女性経営者が、海外市場と新ブランドを描き始める6話の物語。
            </p>
            <button
              onClick={() => onNavigate('manga')}
              className="self-start rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-brand-800 md:text-base"
            >
              漫画を読む →
            </button>
          </div>
        </div>
      </section>

      {/* 価格イメージ・経済性ミニ表 */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-brand-900 md:mb-8 md:text-2xl">
          1袋(50g)あたり 想定経済性
        </h2>
        <div className="overflow-hidden rounded-xl border border-washi-200 bg-white shadow-sm">
          <table className="w-full text-xs md:text-sm">
            <thead className="bg-washi-100 text-brand-900">
              <tr>
                <th className="px-3 py-2.5 text-left font-semibold md:px-6 md:py-3">項目</th>
                <th className="px-3 py-2.5 text-right font-semibold md:px-6 md:py-3">国内卸 (現行)</th>
                <th className="px-3 py-2.5 text-right font-semibold md:px-6 md:py-3">国内D2C</th>
                <th className="px-3 py-2.5 text-right font-semibold md:px-6 md:py-3">越境EC (北米想定)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-washi-200">
              <PriceRow label="販売価格 (税抜)" v={['¥180', '¥780', '$12.0 (≒¥1,800)']} />
              <PriceRow label="原価 (玄米+焙煎+包装)" v={['¥75', '¥110', '¥130']} />
              <PriceRow label="物流・決済手数料" v={['¥5', '¥80', '¥420']} />
              <PriceRow label="プラットフォーム手数料" v={['—', '¥80 (10%)', '¥270 (15%)']} />
              <PriceRow label="粗利" v={['¥100', '¥510', '¥980']} highlight />
              <PriceRow label="粗利率" v={['約56%', '約65%', '約54%']} highlight />
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-brand-800/70 md:text-sm">
          ※ 詳しい根拠とシナリオは「価格比較」ページに掲載。為替・送料は控えめ前提で試算。
        </p>
      </section>

      {/* QR Code section */}
      <section className="overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-washi-100 via-white to-matcha-50 p-6 shadow-sm md:p-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
          <div className="flex-shrink-0 rounded-xl border-2 border-brand-300/60 bg-white p-3 shadow-md">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="紡 TSUMUGI QRコード"
                className="h-44 w-44 md:h-52 md:w-52"
              />
            ) : (
              <div className="h-44 w-44 animate-pulse bg-washi-100 md:h-52 md:w-52" />
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
              SHARE THIS PAGE
            </div>
            <h2 className="mb-2 font-serif text-xl font-bold text-brand-900 md:text-2xl">
              スマホで本サイトへ
            </h2>
            <p className="mb-3 text-xs text-brand-800/80 md:text-sm">
              商工会議所・金融機関・展示会等での名刺交換時に、このQRコードからWebサイトへご案内できます。
              印刷物にも同じQRをそのまま使えます。
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg bg-brand-900 px-4 py-2 font-mono text-xs text-brand-100 md:text-sm">
              <span className="text-brand-300">URL:</span>
              <span className="break-all">{siteUrl}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 商工会議所・金融機関へ */}
      <section className="rounded-2xl bg-brand-900 px-5 py-8 text-white md:px-8 md:py-12">
        <h2 className="mb-3 font-serif text-xl font-bold md:mb-4 md:text-2xl">
          商工会議所・金融機関の皆さまへ
        </h2>
        <p className="mb-5 max-w-2xl text-sm text-brand-100/90 md:mb-6 md:text-base">
          本ブランドは、宮城県内の小規模事業者(母娘2名)による事業承継+新規事業の構想を、
          外部支援者(商工会議所担当者・金融機関融資担当者・補助金審査者)に共有することを主眼に整理した資料群です。
          雇用1名以上創出、設備投資、海外販路、補助金申請の各観点でレビュー可能な構成にしてあります。
        </p>
        <div className="grid max-w-3xl gap-3 md:grid-cols-3 md:gap-4">
          <InvCard
            title="補助金 親和性"
            body="事業再構築・小規模持続化・販路海外開拓 など複数枠と整合"
          />
          <InvCard title="融資 想定額" body="設備+運転 800万〜2,000万円 / 信用保証協会想定" />
          <InvCard
            title="伴走の入口"
            body="商工会議所 経営指導員 経由のメリット最大化を前提に設計"
          />
        </div>
        <p className="mt-6 text-xs text-brand-200/70">
          ※ 詳細は「事業説明」「資料」ページの事業計画書ドラフトをご参照ください。
        </p>
      </section>
    </div>
  )
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-washi-200 bg-white p-6 shadow-sm">
      <h3 className="mb-3 font-serif text-lg font-semibold text-brand-900">{title}</h3>
      <p className="text-sm leading-relaxed text-brand-800">{body}</p>
    </div>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-washi-200 bg-white p-5 shadow-sm">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
        {label}
      </div>
      <div className="mt-2 font-serif text-xl font-bold text-brand-900 md:text-2xl">{value}</div>
      <div className="mt-1 text-[11px] text-brand-800/70 md:text-xs">{sub}</div>
    </div>
  )
}

function PriceRow({
  label,
  v,
  highlight,
}: {
  label: string
  v: [string, string, string]
  highlight?: boolean
}) {
  return (
    <tr className={highlight ? 'bg-washi-100' : ''}>
      <td className="px-3 py-2.5 text-brand-900 md:px-6 md:py-3">{label}</td>
      {v.map((x, i) => (
        <td
          key={i}
          className={`px-3 py-2.5 text-right font-mono md:px-6 md:py-3 ${
            highlight ? 'font-semibold text-brand-700' : 'text-brand-800'
          }`}
        >
          {x}
        </td>
      ))}
    </tr>
  )
}

function InvCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg bg-brand-800 p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-brand-200">{title}</div>
      <div className="mt-1 font-semibold text-white">{body}</div>
    </div>
  )
}
