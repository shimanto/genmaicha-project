# 玄米茶ちゃん (genmaicha-project)

> 焙煎玄米の老舗を、世界へ。

宮城の小さな焙煎工場(玄米茶用 焙煎玄米メーカー)4 代目「玄米茶ちゃん」(20代の女性経営者、ニックネーム)が、
母と二人で守る老舗を、新ブランド「**玄米茶ちゃん**」としてリブランドし、海外市場および新しい小売カテゴリーへと広げていくための
**LP + 漫画 + 事業計画 + 10 の施策** を 1 サイトで共有する公式 Web サイト。

> ⭐ **実工場の取扱商品**: 現在は ① **玄米あられ(炒り玄米)** と ② **白くはじけた玄米(ポップライス・花)** の 2 種を生産。
> 将来追加候補に ③ 黒玄米(黒焙煎)/ ④ 普通炒り玄米(未発芽)/ ⑤ 発芽玄米の焙煎 + 工場増設を検討。
> 詳細: [`docs/actual-product-lineup.md`](./docs/actual-product-lineup.md)

**リポジトリ / プロジェクト名**: `genmaicha-project` / 公開 URL: `genmaicha-project.pages.dev`

---

## 機能

- **LP (ランディングページ)**: ブランドコンセプト・3 つの軸・QR コード・商工会議所/金融機関向けメッセージ・商品ラインナップ構想(将来の小売商品を含む)
- **漫画**: 4 代目「玄米茶ちゃん」の継ぎ方 — 全 6 話(`nano-banana-pro` で生成)
- **事業説明**: 現状・課題・「玄米茶ちゃん」ブランドが解こうとしている問い
- **カテゴリー調査**: 玄米茶カテゴリの構造分解と当社のニッチ
- **海外需要**: 北米・欧州・アジア別ファクトシート
- **価格比較**: 国内卸 / 国内 D2C / 越境 EC のユニットエコノミクス
- **10 の施策**: スモールスタート可能な独立施策 10 個(各詳細ページ)
- **資料**: 事業計画書・ブランドガイド・商品開発ロードマップ・OEM 雛形・輸出チェックリスト

認証ゲートはありません(資料は公開前提のドラフトとして扱います)。

---

## 技術スタック

- Vite + React 18 + TypeScript + Tailwind CSS v3
- Cloudflare Pages (GitHub Actions 自動デプロイ)
- 漫画/OGP/カバー画像: Google Gemini `nano-banana-pro-preview`

---

## 開発

```bash
pnpm install
pnpm dev       # 開発サーバ
pnpm build     # ビルド
pnpm typecheck # 型チェック
```

---

## 漫画・OGP 画像生成

`agent/` 内に nano-banana-pro 用の Node スクリプトを置いています。

```bash
# 全6話の漫画ページを生成
node agent/generate-manga.js

# 特定の1話のみ再生成
node agent/generate-manga.js 3

# LP 用カバー画像
node agent/generate-cover.js

# OGP 画像
node agent/generate-ogp.js
```

`GEMINI_API_KEY` は以下のいずれかから自動でロードします:
- `genmaicha-project/.env`
- `~/shimanto-projects/lineclaude/agent/.env.shared`(共通 API キー置き場)

---

## デプロイ

`main` ブランチへの push で Cloudflare Pages に自動デプロイされます(`.github/workflows/deploy.yml`)。

### 必要な GitHub Secrets

- `CLOUDFLARE_API_TOKEN` — Cloudflare API Token (Pages:Edit 権限)
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare Account ID

### Cloudflare Pages プロジェクトの事前作成

初回のみ、Cloudflare ダッシュボードで `genmaicha-project` という名前の Pages プロジェクトを作成してください。
以降は自動デプロイされます。

---

## ドキュメント (構想ドラフト一覧)

- `docs/business-overview.md` — 事業説明
- `docs/category-research.md` — カテゴリー調査
- `docs/global-demand.md` — 海外需要
- `docs/pricing-comparison.md` — 価格比較
- `docs/business-plan.md` — 事業計画書ドラフト
- `docs/brand-guidelines.md` — ブランドガイドライン
- `docs/product-roadmap.md` — 商品開発ロードマップ(小売拡張構想を含む)
- `docs/oem-contract-template.md` — OEM/法人ノベルティ提案 雛形
- `docs/export-checklist.md` — 輸出チェックリスト
- `docs/initiatives/01-direct-d2c.md` 〜 `10-corporate-oem.md` — 10 の施策

---

## 改名メモ

本プロジェクトは仮ブランド名「紡 TSUMUGI」から「**玄米茶ちゃん**」へ改名しました。
「玄米茶ちゃん」は20代女性経営者のニックネームであり、そのままブランド/マスコットとして機能させる設計です。
ロゴ・商標は商標調査を経て正式化予定。
