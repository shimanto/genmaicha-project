import i01 from '../docs/initiatives/01-direct-d2c.md?raw'
import i02 from '../docs/initiatives/02-cross-border-ec.md?raw'
import i03 from '../docs/initiatives/03-tasting-set.md?raw'
import i04 from '../docs/initiatives/04-shorts-branding.md?raw'
import i05 from '../docs/initiatives/05-cci-event.md?raw'
import i06 from '../docs/initiatives/06-furusato-nozei.md?raw'
import i07 from '../docs/initiatives/07-crowdfunding.md?raw'
import i08 from '../docs/initiatives/08-creator-gifting.md?raw'
import i09 from '../docs/initiatives/09-popup-michinoeki.md?raw'
import i10 from '../docs/initiatives/10-corporate-oem.md?raw'

export type Initiative = {
  id: string
  no: number
  title: string
  oneLiner: string
  effort: '★' | '★★' | '★★★'
  cost: '◎' | '○' | '△'
  speed: '即日' | '1ヶ月' | '3ヶ月'
  audience: string
  md: string
}

export const INITIATIVES: Initiative[] = [
  {
    id: '01-direct-d2c',
    no: 1,
    title: '小ロット直販EC (BASE / Shopify Lite)',
    oneLiner: '在庫50袋 + 月1万円から始める「自社の値付け」を取り戻すD2C。',
    effort: '★',
    cost: '◎',
    speed: '即日',
    audience: '国内 健康志向 / 茶好き 30〜60代',
    md: i01,
  },
  {
    id: '02-cross-border-ec',
    no: 2,
    title: '越境EC試験販売 (Etsy / Amazon Global / eBay)',
    oneLiner: '海外配送代行を使い、北米・欧州への販売チャネルを実需テスト。',
    effort: '★★',
    cost: '○',
    speed: '1ヶ月',
    audience: '北米 / 欧州 茶好き / 日本食材ユーザー',
    md: i02,
  },
  {
    id: '03-tasting-set',
    no: 3,
    title: '焙煎玄米 2種テイスティングセット',
    oneLiner: '中焙煎×深煎り 5g×4袋の試飲セットで、ブランド理解を低価格で提供。',
    effort: '★',
    cost: '◎',
    speed: '即日',
    audience: '初回購入層 / イベント来場者 / ギフティング',
    md: i03,
  },
  {
    id: '04-shorts-branding',
    no: 4,
    title: '1日10分のショート動画ブランディング',
    oneLiner: '釜の音・湯気・玄米のはじけ。母娘の手元を撮るだけで成立する素材庫。',
    effort: '★',
    cost: '◎',
    speed: '即日',
    audience: 'Instagram / TikTok 国内+英語字幕で海外',
    md: i04,
  },
  {
    id: '05-cci-event',
    no: 5,
    title: '商工会議所 / 物産展 出店',
    oneLiner: '宮城県商工会議所のネットワークと補助制度を最大活用した名刺獲得装置。',
    effort: '★★',
    cost: '○',
    speed: '3ヶ月',
    audience: '法人バイヤー / 地元小売 / 自治体',
    md: i05,
  },
  {
    id: '06-furusato-nozei',
    no: 6,
    title: 'ふるさと納税 返礼品登録',
    oneLiner: '宮城県内自治体への返礼品提供で、無広告・在庫リスク低めの売上を立てる。',
    effort: '★★',
    cost: '○',
    speed: '3ヶ月',
    audience: 'ふるさと納税ユーザー (高所得寄付者中心)',
    md: i06,
  },
  {
    id: '07-crowdfunding',
    no: 7,
    title: 'クラウドファンディング (Makuake / CAMPFIRE)',
    oneLiner: '海外進出第一弾の旗艦商品 (パッケージ刷新+焙煎玄米2種ギフト) でファンと資金を同時獲得。',
    effort: '★★★',
    cost: '△',
    speed: '3ヶ月',
    audience: '国内ファースト顧客 / メディア露出',
    md: i07,
  },
  {
    id: '08-creator-gifting',
    no: 8,
    title: 'お茶クリエイター / インバウンドガイドへのギフティング',
    oneLiner: '英語コンテンツを持つ茶YouTuber・在日インバウンド向けガイドへ無償提供で口コミを設計。',
    effort: '★',
    cost: '◎',
    speed: '1ヶ月',
    audience: '海外 茶コミュニティ / 訪日客',
    md: i08,
  },
  {
    id: '09-popup-michinoeki',
    no: 9,
    title: '道の駅 / 地元百貨店 POPUP',
    oneLiner: '宮城の道の駅+JR駅ナカ百貨店 POPUPで、観光客と仙台市内の常連を同時に取りに行く。',
    effort: '★★',
    cost: '○',
    speed: '3ヶ月',
    audience: '宮城観光客 / 仙台市民 / お土産需要',
    md: i09,
  },
  {
    id: '10-corporate-oem',
    no: 10,
    title: '法人ノベルティ / OEM 受託',
    oneLiner: '商工会議所つながりの中小企業の周年・株主優待・贈答需要に対し、小ロットOEMで応える。',
    effort: '★★',
    cost: '◎',
    speed: '1ヶ月',
    audience: '宮城県内中小企業 / 金融機関 / 自治体',
    md: i10,
  },
]

export function findInitiative(id: string): Initiative | undefined {
  return INITIATIVES.find((x) => x.id === id)
}
