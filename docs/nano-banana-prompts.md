# nano banana pro プロンプト集

本ブランドの漫画・キービジュアルを生成する際の共通プロンプト設計。
画像生成は [nano banana pro](https://) を想定しています。

## 共通スタイルトークン

以下を各プロンプト冒頭に共通で付与し、世界観の一貫性を担保します。

```
shojo manga style, Japanese manga panel composition,
warm sepia and amber color palette with matcha green accent,
ink outlines with screentone shading, hopeful atmosphere,
consistent character design across panels
```

## キャラクター設定(顔の一貫性用)

### 松本 穂香 (Honoka)

```
female, early 20s, Japanese, shoulder-length dark brown hair with a small ribbon,
gentle eyes with light brown iris, warm smile, slender build,
casual work apron over a neutral-tone shirt, small stud earrings
```

### 松本 芳江 (Yoshie / 母)

```
female, mid 50s, Japanese, short dark hair with slight grey streaks,
kind expression, apron over a blouse, work trousers, practical build,
hands showing years of craft work
```

### 商工会議所 経営指導員

```
male, late 40s, Japanese, neat short hair, glasses,
business suit without tie, calm professional expression
```

## パネルごとのプロンプト(短編6コマ)

Panel 1 〜 Panel 6 のプロンプトは `src/pages/Manga.tsx` の `PANELS` 配列から参照してください。

## キービジュアル用

### Hero (サイトトップの主要ビジュアル)

```
cinematic wide shot of a small traditional Japanese roasting factory in Miyagi at dawn,
warm orange glow from a large roasting drum, a young woman (Honoka) and her mother
standing side by side looking out a window, steam rising, roasted brown rice grains
scattered on a wooden counter, poster-like composition, warm amber and sepia palette,
no text, 16:9 aspect ratio
```

### OGP 画像(1200x630)

```
product photography style, top-down view of two small cylindrical paper packages
with minimalist kanji logo "焙" and latin "HOU" printed in brown ink,
scattered roasted brown rice grains, a cup of freshly brewed genmaicha tea,
one small matcha-green ribbon, wooden table texture background,
warm cream and amber lighting, luxurious but humble feel, 16:9 aspect ratio
```

### パッケージモック

```
product mockup, a 100g cylindrical kraft-paper tea tin with a minimalist kanji "焙"
centered on the label, small sub-text "HOU / ASA-HOU 100g / 浅焙煎玄米",
beige and brown color scheme with one matcha-green foil stripe,
studio photo lighting, slight shadow, centered composition, no background clutter
```

## 運用ルール

1. 生成時は「同一キャラクター説明」を毎回プロンプトに含め、顔の差分を抑える
2. 出力から"宮城の空気"に合うものを選定(過度に豪華・欧風な雰囲気は避ける)
3. 採用画像はリポジトリの `public/manga/` / `public/hero/` / `public/ogp/` に分類配置
4. 採用時は本ファイルに生成日とプロンプトのバリエーションを追記して履歴化
