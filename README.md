# 紡 TSUMUGI

> 焙煎玄米の老舗を、世界へ。

宮城の小さな焙煎工場(玄米茶用 焙煎玄米メーカー)4 代目・松永つむぎ(20代)が、
母と二人で守る老舗を、新ブランド「**紡 TSUMUGI**」としてリブランドし、海外市場へ紡ぎ直すための
**LP + 漫画 + 事業計画 + 10 の施策** を 1 サイトで共有する公式 Web サイト/構想資料置き場。

**開発コードネーム**: `genmaicha-brand` / 公開 URL: `genmaicha-tanpo.pages.dev`

参考スキーム: 同シリーズの不動産プロジェクト「[Akane Partners](https://fudousan-tanpo.pages.dev/)」と同じ Vite + React + Cloudflare Pages 構成。

---

## 機能

- **LP (ランディングページ)**: ブランドコンセプト・3 つの軸・QR コード・商工会議所/金融機関向けメッセージ
- **漫画**: 4 代目つむぎの紡ぎ方 — 全 6 話(`nano-banana-pro` で生成)
- **事業説明**: 現状・課題・「紡」が解こうとしている問い
- **カテゴリー調査**: 玄米茶カテゴリの構造分解と当社のニッチ
- **海外需要**: 北米・欧州・アジア別ファクトシート
- **価格比較**: 国内卸 / 国内 D2C / 越境 EC のユニットエコノミクス
- **10 の施策**: スモールスタート可能な独立施策 10 個(各詳細ページ)
- **資料**: 事業計画書・ブランドガイド・商品開発ロードマップ・OEM 雛形・輸出チェックリスト
- **簡易認証**: ID/PW ゲート(sessionStorage)

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
- `genmaicha-brand/.env`
- `~/shimanto-projects/lineclaude/agent/.env.shared`(共通 API キー置き場)

---

## デプロイ

`main` ブランチへの push で Cloudflare Pages に自動デプロイされます(`.github/workflows/deploy.yml`)。

### 必要な GitHub Secrets

- `CLOUDFLARE_API_TOKEN` — Cloudflare API Token (Pages:Edit 権限)
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare Account ID

### Cloudflare Pages プロジェクトの事前作成

初回のみ、Cloudflare ダッシュボードで `genmaicha-tanpo` という名前の Pages プロジェクトを作成してください。
以降は自動デプロイされます。

---

## ドキュメント (構想ドラフト一覧)

- `docs/business-overview.md` — 事業説明 (Web `/#business`)
- `docs/category-research.md` — カテゴリー調査 (Web `/#category`)
- `docs/global-demand.md` — 海外需要 (Web `/#global`)
- `docs/pricing-comparison.md` — 価格比較 (Web `/#pricing`)
- `docs/business-plan.md` — 事業計画書ドラフト
- `docs/brand-guidelines.md` — ブランドガイドライン
- `docs/product-roadmap.md` — 商品開発ロードマップ
- `docs/oem-contract-template.md` — OEM/法人ノベルティ提案 雛形
- `docs/export-checklist.md` — 輸出チェックリスト
- `docs/initiatives/01-direct-d2c.md` 〜 `10-corporate-oem.md` — 10 の施策

---

## 認証情報

参考スキームと同じ簡易ログイン:
- ID: `matsu`
- PW: `matsu`

(コードに直書き / sessionStorage 認証 / 公開資料の閲覧制限のみが目的)

---

## 改名候補メモ

「紡 TSUMUGI」は仮ブランド名です。商標調査の結果次第で改名する場合があるため、
リポジトリ名 (`genmaicha-brand`) と Pages サブドメイン (`genmaicha-tanpo`) は中立的な名前のまま運用します。
