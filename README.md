# 焙 HOU (ほう) — 焙煎玄米ブランド資料サイト

宮城県・焙煎玄米専業の老舗から独立する、20代女性経営者(仮名: 玄米茶ちゃん)による新規ブランド「**焙 HOU**」の事業構想を、
商工会議所・地域金融機関・卸先・メディア向けに共有するための公開プレビューサイトです。

**コードネーム**: `genmaicha-project`

## 主な構成

| ページ | 内容 |
|--------|------|
| トップ | ブランドコンセプト / 商品 / 将来の小売商品構想 / QR導線 |
| 事業説明スライド | 6枚構成の事業コンセプト〜スケーリング |
| カテゴリー分析 | 日本茶カテゴリー構造とHOUのポジショニング |
| 海外需要 | エリア別(北米/欧州/東南アジア)の需要分析 |
| 価格比較 | 国内 vs 海外のチャネル別価格レンジと戦略 |
| 施策10選 | スモールスタート施策10個(各独立ページ) |
| 漫画 | nano banana pro で生成した 6コマ短編漫画 |
| 資料 | ブランドコンセプト / 事業計画 / 運用チェックリスト 等 |

## 技術スタック

- React 18 / TypeScript 5 / Vite 5
- Tailwind CSS 3
- Cloudflare Pages (GitHub Actions 経由で自動デプロイ)

## ローカル開発

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # dist/ にビルド出力
pnpm typecheck  # 型チェックのみ
```

## 公開

認証は設けていません(機密情報を含まない公開プレビューの前提)。

## デプロイ

`main` ブランチに push すると GitHub Actions が起動し、Cloudflare Pages プロジェクト
`genmaicha-project` にデプロイされます。

- 公開URL: https://genmaicha-project.pages.dev/
- リポジトリ: https://github.com/shimanto/genmaicha-project

必要な GitHub Secrets:

- `CLOUDFLARE_API_TOKEN` (Pages:Edit 権限)
- `CLOUDFLARE_ACCOUNT_ID`

初回のみ、Cloudflare ダッシュボードで `genmaicha-project` という名前の Pages プロジェクトを作成してください。以降は自動デプロイされます。

## 漫画画像の生成

6コマ漫画の実画像は `scripts/generate-manga.mjs` から `nano-banana-pro-preview` で自動生成し、
`public/manga/panel-01.png` 〜 `panel-06.png` に保存されます。

```bash
# lineclaude/agent/.env.shared の GEMINI_API_KEY を利用します
node scripts/generate-manga.mjs
```

## ドキュメント

`docs/` 配下の Markdown は `Documents` ページから閲覧できます。

- `brand-concept.md` — ブランドコンセプト / バリュー / ラインナップ / 将来の小売商品構想
- `business-plan.md` — 事業計画(市場・チャネル・体制・ファイナンス)
- `operations-checklist.md` — 母娘2名体制の週次運用ルール
- `nano-banana-prompts.md` — 漫画・キービジュアル生成の共通プロンプト

## 補足

- 本サイトに記載の市場規模・価格レンジ・成長率は、公開情報を元にした概算です。
- 登場人物は全員、実在の関係者を特定しないための仮名です(主人公: 玄米茶ちゃん)。
- 数値は実行時点で再計測・再設計することを前提としています。
