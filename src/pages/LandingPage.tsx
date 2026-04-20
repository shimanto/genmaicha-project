import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

type Page =
  | 'lp'
  | 'slides'
  | 'category'
  | 'overseas'
  | 'price'
  | 'initiatives'
  | 'manga'
  | 'documents'

type Props = {
  onNavigate: (page: Page) => void
}

export default function LandingPage({ onNavigate }: Props) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const siteUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : 'https://genmaicha-project.pages.dev/'

  useEffect(() => {
    QRCode.toDataURL(siteUrl, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 360,
      color: {
        dark: '#3d220f',
        light: '#ffffff',
      },
    }).then(setQrDataUrl)
  }, [siteUrl])

  return (
    <div className="space-y-10 md:space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 via-brand-700 to-matcha-600 px-5 py-10 text-white shadow-xl md:px-10 md:py-16">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-brand-300/25 to-transparent" />
        <div className="relative max-w-3xl">
          <div className="mb-4 flex items-center gap-2 md:mb-6">
            <div className="h-px w-8 bg-brand-200 md:w-12" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-100 md:text-xs">
              HOU BRAND · MIYAGI
            </span>
          </div>
          <h1 className="mb-4 font-serif text-3xl font-bold leading-tight md:mb-6 md:text-5xl">
            焙煎玄米だけで、
            <br />
            <span className="bg-gradient-to-r from-brand-100 to-brand-300 bg-clip-text text-transparent">
              玄米茶の常識を焙き直す。
            </span>
          </h1>
          <p className="mb-3 text-sm text-brand-50 md:mb-4 md:text-lg">
            宮城県・老舗焙煎玄米工場から生まれる、新しい玄米茶ブランド。
          </p>
          <p className="mb-6 text-xs leading-relaxed text-brand-100 md:mb-8 md:text-base">
            祖父祖母から受け継いだ焙煎技術と、20代若手経営者の視点で、
            国内の嗜好変化と海外需要をつかむ「焙煎玄米2種」を軸に、
            小さな規模のまま独立ブランド化を進めます。
          </p>
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-3">
            <button
              onClick={() => onNavigate('slides')}
              className="rounded-lg bg-brand-100 px-4 py-2.5 text-sm font-semibold text-brand-900 shadow hover:bg-white md:px-6 md:py-3 md:text-base"
            >
              📊 事業説明
            </button>
            <button
              onClick={() => onNavigate('category')}
              className="rounded-lg border border-brand-100/60 bg-stone-900/30 px-4 py-2.5 text-sm font-semibold text-brand-100 shadow hover:bg-stone-900/50 md:px-6 md:py-3 md:text-base"
            >
              🔍 カテゴリー分析
            </button>
            <button
              onClick={() => onNavigate('initiatives')}
              className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-brand-800 shadow hover:bg-brand-50 md:px-6 md:py-3 md:text-base"
            >
              ⚡ 施策10選
            </button>
            <button
              onClick={() => onNavigate('manga')}
              className="rounded-lg border border-white/40 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 md:px-6 md:py-3 md:text-base"
            >
              📖 漫画で知る
            </button>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-stone-900 md:mb-8 md:text-2xl">3つの強み</h2>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <Card
            title="焙煎玄米 専業の老舗技術"
            body="玄米茶の『玄米』のみを卸してきた老舗の焙煎技術を継承。浅焙煎 / 深焙煎の2種で、香ばしさ・甘み・コクを使い分けます。"
          />
          <Card
            title="若き経営者の独立ブランド化"
            body="20代女性経営者による商品企画・デザイン・SNS発信。工場機能は維持しつつ、D2C/海外ECで『顔の見える』直販を作ります。"
          />
          <Card
            title="スモールスタート設計"
            body="母娘2名体制でも回る年間計画。広告費より『人肌の物語』。商工会議所・地域金融機関との連携で、低コスト×高信頼の立ち上げを目指します。"
          />
        </div>
      </section>

      {/* Product */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-stone-900 md:mb-8 md:text-2xl">
          焙煎玄米 2種ラインナップ
        </h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <ProductCard
            grade="浅焙煎"
            name="朝の焙 ASA-HOU"
            description="軽やかで甘みの立つ浅煎り。緑茶とブレンドすると、玄米茶本来の『お米の甘さ』が引き立ちます。海外抹茶ラテ市場とも親和性が高い。"
            rice="宮城県産うるち米"
            target="国内緑茶ブレンド用 / 海外カフェ向け"
          />
          <ProductCard
            grade="深焙煎"
            name="夜の焙 YORU-HOU"
            description="香ばしさとコクを前面に出した深煎り。単体で『焙じ玄米茶』として飲める、カフェインレス+ノンカフェインの夜用リラクゼーション。"
            rice="宮城県産玄米 (有機移行圃場)"
            target="国内D2C / ギフト / 海外ウェルネス向け"
          />
        </div>
      </section>

      {/* Future retail lineup */}
      <section>
        <div className="mb-5 flex items-end justify-between md:mb-8">
          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-matcha-600 md:text-xs">
              Retail Product Roadmap · 2026-2028
            </div>
            <h2 className="text-xl font-bold text-stone-900 md:text-2xl">
              将来の小売商品構想
            </h2>
          </div>
          <span className="hidden rounded-md border border-brand-200 bg-brand-50 px-2 py-1 text-[10px] font-semibold text-brand-700 md:inline-block md:text-xs">
            長期ロードマップ
          </span>
        </div>
        <p className="mb-5 text-xs leading-relaxed text-stone-600 md:mb-6 md:text-sm">
          焙煎玄米2種(ASA-HOU / YORU-HOU)を起点に、
          <strong className="font-semibold text-stone-900">"焙煎玄米を中心にした飲料・食のライフスタイル"</strong>
          を段階的に拡張します。ここに載る商品は全て構想段階であり、
          スモールスタートでの検証と商工会議所・地域金融機関との連携を前提に、年次で判断していきます。
        </p>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          <RoadmapPhase
            phase="PHASE 1"
            year="2026 (初年度)"
            headline="焙煎玄米 2種 + お試しセット"
            items={[
              '朝の焙 ASA-HOU 100g 缶(浅焙煎)',
              '夜の焙 YORU-HOU 100g 缶(深焙煎)',
              '¥500 お試しセット(ASA 10g + YORU 10g + 飲み方カード)',
              'D2C / ECサイト(Shopify or BASE) / 宮城県内マルシェ出店',
            ]}
            accent="brand"
          />
          <RoadmapPhase
            phase="PHASE 2"
            year="2027"
            headline="ブレンド・ティーバッグ・ギフト"
            items={[
              '焙煎玄米 × 緑茶 ブレンド ティーバッグ(個包装)',
              '焙じ玄米茶ラテ用 粉末(カフェ / 自宅向け)',
              'ギフトボックス(お試しセット豪華版 / のし対応)',
              '専門茶店・カフェ向けのプレミアムOEM枠',
            ]}
            accent="matcha"
          />
          <RoadmapPhase
            phase="PHASE 3"
            year="2028〜"
            headline="海外D2C + 食のライフスタイル"
            items={[
              '海外向け Genmaicha セット(英語パッケージ / 海外D2C)',
              '焙煎玄米 × 米菓子(玄米あられ / グラノーラ試作)',
              '焙煎玄米 × 発酵(甘酒 / 米麹)',
              'サブスク(月イチで旬の焙煎ロット届ける)',
            ]}
            accent="stone"
          />
        </div>
        <p className="mt-4 text-xs text-stone-500 md:text-sm">
          ※ 表記の商品名・SKUはいずれも開発コードであり、実際の発売時に変更されます。投資・仕入れの確約情報ではありません。
        </p>
      </section>

      {/* Market highlights */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-stone-900 md:mb-8 md:text-2xl">
          マーケットハイライト
        </h2>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <MetricCard
            label="国内お茶飲料市場"
            value="約 4,800億円"
            sub="うち緑茶・玄米茶カテゴリは安定成長"
          />
          <MetricCard
            label="抹茶・日本茶の海外市場"
            value="CAGR ~9%"
            sub="北米・欧州・東南アジアで継続拡大"
          />
          <MetricCard
            label="卸 vs 自社ブランド粗利"
            value="2〜4倍"
            sub="焙煎玄米OEMから直販ブランドへの移行で収益性改善"
          />
        </div>
        <p className="mt-4 text-xs text-stone-500 md:text-sm">
          ※ 数値は公開統計とカテゴリー調査に基づく概算レンジです。詳細は
          <button
            onClick={() => onNavigate('category')}
            className="mx-1 text-brand-700 underline underline-offset-2 hover:text-brand-900"
          >
            カテゴリー分析
          </button>
          ・
          <button
            onClick={() => onNavigate('overseas')}
            className="mx-1 text-brand-700 underline underline-offset-2 hover:text-brand-900"
          >
            海外需要
          </button>
          ページをご参照ください。
        </p>
      </section>

      {/* QR Code section */}
      <section className="overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-matcha-400/10 p-6 shadow-sm md:p-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
          <div className="flex-shrink-0 rounded-xl border-2 border-brand-500/30 bg-white p-3 shadow-md">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="HOU QRコード"
                className="h-44 w-44 md:h-52 md:w-52"
              />
            ) : (
              <div className="h-44 w-44 animate-pulse bg-stone-100 md:h-52 md:w-52" />
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700 md:text-xs">
              SHARE THIS PAGE
            </div>
            <h2 className="mb-2 font-serif text-xl font-bold text-stone-900 md:text-2xl">
              商談・営業資料への添付に
            </h2>
            <p className="mb-3 text-xs text-stone-600 md:text-sm">
              商工会議所・金融機関・卸先でのミーティングで、
              このQRコードを印刷/スライドに貼るだけで、事業概要・市場分析・施策を一気に共有できます。
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 font-mono text-xs text-brand-200 md:text-sm">
              <span className="text-stone-400">URL:</span>
              <span className="break-all">{siteUrl}</span>
            </div>
          </div>
        </div>
      </section>

      {/* For stakeholders */}
      <section className="rounded-2xl bg-stone-900 px-5 py-8 text-white md:px-8 md:py-12">
        <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
          商工会議所・金融機関ご担当者さまへ
        </h2>
        <p className="mb-5 max-w-2xl text-sm text-stone-300 md:mb-6 md:text-base">
          本サイトは、事業継承と新ブランド立ち上げに関する事業計画の"要約パンフレット"です。
          資金調達・補助金申請・取引先紹介にあたっての参考資料としてご覧ください。
        </p>
        <div className="grid max-w-3xl gap-3 md:grid-cols-3 md:gap-4">
          <InvCard title="体制" body="母娘2名 / 工場機能は既存継承" />
          <InvCard title="初期投資規模" body="小ロット×D2Cの段階投資モデル" />
          <InvCard title="想定ファイナンス" body="日本公庫・地銀・補助金+自己資金" />
        </div>
        <p className="mt-6 text-xs text-stone-400">
          ※ 本ページは事業構想の共有を目的としており、不特定多数への出資勧誘ではありません。
          具体的な取引・融資のご相談は個別面談にて対応いたします。
        </p>
      </section>
    </div>
  )
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-stone-900">{title}</h3>
      <p className="text-sm leading-relaxed text-stone-600">{body}</p>
    </div>
  )
}

function ProductCard({
  grade,
  name,
  description,
  rice,
  target,
}: {
  grade: string
  name: string
  description: string
  rice: string
  target: string
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-200 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-brand-700 to-brand-800 px-5 py-3 text-white">
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-200">
          {grade}
        </div>
        <div className="font-serif text-xl font-bold">{name}</div>
      </div>
      <div className="space-y-3 px-5 py-4 md:px-6 md:py-5">
        <p className="text-sm leading-relaxed text-stone-700">{description}</p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs text-stone-600">
          <dt className="font-semibold text-stone-500">原料</dt>
          <dd>{rice}</dd>
          <dt className="font-semibold text-stone-500">想定顧客</dt>
          <dd>{target}</dd>
        </dl>
      </div>
    </div>
  )
}

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 md:text-xs">
        {label}
      </div>
      <div className="mt-2 font-serif text-2xl font-bold text-stone-900 md:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs text-stone-500">{sub}</div>
    </div>
  )
}

function InvCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg bg-stone-800 p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-brand-300">{title}</div>
      <div className="mt-1 font-semibold text-white">{body}</div>
    </div>
  )
}

function RoadmapPhase({
  phase,
  year,
  headline,
  items,
  accent,
}: {
  phase: string
  year: string
  headline: string
  items: string[]
  accent: 'brand' | 'matcha' | 'stone'
}) {
  const accentMap = {
    brand: {
      bar: 'from-brand-700 to-brand-500',
      chip: 'bg-brand-50 text-brand-700 border-brand-200',
      dot: 'bg-brand-500',
    },
    matcha: {
      bar: 'from-matcha-600 to-matcha-400',
      chip: 'bg-matcha-400/10 text-matcha-700 border-matcha-400/30',
      dot: 'bg-matcha-500',
    },
    stone: {
      bar: 'from-stone-800 to-stone-500',
      chip: 'bg-stone-100 text-stone-700 border-stone-300',
      dot: 'bg-stone-500',
    },
  }[accent]

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className={`h-1 w-full bg-gradient-to-r ${accentMap.bar}`} />
      <div className="flex-1 space-y-3 p-5 md:p-6">
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${accentMap.chip}`}
          >
            {phase}
          </span>
          <span className="text-[10px] font-semibold text-stone-500 md:text-xs">{year}</span>
        </div>
        <h3 className="font-serif text-base font-bold leading-snug text-stone-900 md:text-lg">
          {headline}
        </h3>
        <ul className="space-y-1.5 text-xs leading-relaxed text-stone-700 md:text-sm">
          {items.map((it) => (
            <li key={it} className="flex gap-2">
              <span className={`mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${accentMap.dot}`} />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
