# Design System — 投資知識筆記

> 落地檔:`src/styles/theme.css`(覆寫 Starlight `--sl-*` 變數)+ `astro.config.mjs`
> 的字型 `<link>`。改視覺先改這份文件,再改 `theme.css`,兩邊保持一致。

## Product Context
- **What this is:** 用費曼學習法把投資與股票知識親手寫清楚的個人筆記站。
- **Who it's for:** 想真正搞懂投資觀念的自己 + 同溫層讀者(Threads / X 導流)。
- **Space/industry:** 投資 / 財經內容、長文閱讀。
- **Project type:** Editorial 閱讀站(Astro **Starlight** + Markdown,部署 Vercel)。

## Aesthetic Direction
- **Direction:** 編輯感 / 紙感(paper editorial)。
- **Decoration level:** 克制(minimal→intentional)。細線分隔、寬邊距、淡紙底。
  **禁:** 漸層、色塊 blob、圖示彩色圓圈、置中一切、bubbly 圓角。
- **Mood:** 冷靜、可信、像一本用心寫的專欄。字與留白做主角。

## Typography
- **Display/Hero:** `Fraunces`(拉丁,opsz auto)+ `Noto Serif TC` 思源宋體(中文) — 襲線體,大字級有印刷編輯感。
- **Body:** `DM Sans`(拉丁)+ 系統中文黑體(PingFang TC / Microsoft JhengHei / Noto Sans TC fallback) — 螢幕清楚、中文不另載大檔。
- **Data/Tables:** 同 body,`font-variant-numeric: tabular-nums`(報酬率/殖利率對齊)。
- **Code:** `JetBrains Mono`。
- **Loading:** Google Fonts CSS2(`astro.config.mjs` head)。中文襲線靠瀏覽器依字元動態子集,只載標題用到的字。
- **Reading:** 內文 `line-height: 1.85`,中文 `letter-spacing: 0.01em`。

## Color
- **Approach:** restrained — 暖紙中性 + 單一墨綠 accent。綠只用在連結/重點,別鋪滿(避免「鈔票俗」)。
- **亮色:** bg `#faf8f3` · text `#1f2421` · muted `#6b6b63` · hairline `#e4dfd2` · **accent `#2f5d4e`**。
- **暗色:** bg `#14171a` · text `#e8e6df` · **accent `#7fb3a0`**(霧綠,降飽和)。
- **Note:** Starlight 把 `--sl-color-white` 當「最強前景」、`--sl-color-black` 當「最弱背景」;亮色主題已反轉成深墨 / 暖紙。

## Spacing
- **Base unit:** 8px。
- **Density:** comfortable→spacious(閱讀導向)。
- **Scale:** xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64)。

## Layout
- **Approach:** Starlight 文件版型 + 上方主分類導覽列(`src/components/SiteTitle.astro`)。
- **Reading measure:** 沿用 Starlight 內容寬度(約 70 字元),長文好讀。
- **Border radius:** 沿用 Starlight 預設(克制,不加 bubbly 圓角)。

## Motion
- **Approach:** minimal-functional。連結底線過渡、focus 狀態,無 scroll 特效。
- **Duration:** micro 50–100ms / short 150–250ms。

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-15 | 初版設計系統(編輯感/紙感) | `/design-consultation` 產出;暖紙底取代冷白、墨綠 accent 取代 fintech 藍、Fraunces 襲線標題,服務長文閱讀。 |
