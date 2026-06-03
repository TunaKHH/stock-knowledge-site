# 投資知識筆記

用費曼學習法把投資與股票知識「親手寫清楚」的個人筆記站。
技術:Astro **Starlight** + Markdown,部署在 **Vercel**(git push 自動部署)。

> 設計與實作計畫見 `docs/plans/`。**本站為個人學習筆記,非投資建議。**

## 寫作循環(發佈流程)

```
寫 .md  →  丟 AI 當編輯/反方挑毛病  →  修  →  git push  →  Vercel 自動上線  →  cross-post 分發
```

1. 在 `src/content/docs/<主題>/` 新增或編輯 `.md`。frontmatter:`title` / `description` / `pubDate`,草稿加 `draft: true`(不會上線)。
2. 寫完把 `draft: true` 拿掉。**內文一律自己寫**——AI 只當編輯/反方,不代筆。
3. `git push` → Vercel 自動 build & deploy。
4. **分發(逼迫感來源,別省)**:把連結 + 重點貼到 Threads / X;可選 cross-post 到方格子,並在那邊把 canonical(原文連結)設回本站。

> 節奏目標:每週一篇。一次寫深一個窄主題,寫完再開下一個分類。

## 新增一個主題分類

1. 建資料夾 `src/content/docs/<新主題>/` 並放文章。
2. 在 `astro.config.mjs` 的 `sidebar` 加一條 `{ label: '<新主題>', autogenerate: { directory: '<新主題>' } }`。

## canonical / 分享圖

- 站上每頁 canonical 由 Starlight 依 `astro.config.mjs` 的 `site` 自動產生(指向自己)。
- 「canonical 指回自站」是去方格子 / Medium 那邊設定原文連結——本站只需是乾淨的 canonical 來源。
- 預設分享圖:`public/og-default.png`,由 `scripts/gen-og.mjs` 產生(要換樣式改腳本後 `node scripts/gen-og.mjs`)。每篇自動生成 OG 圖列為 later。

## 常用指令

| 指令 | 作用 |
| :-- | :-- |
| `npm run dev` | 本機開發伺服器 `localhost:4321` |
| `npm run build` | 產生正式站到 `./dist/` |
| `npm run preview` | 本機預覽 build 結果 |

## 部署後待辦

- 首次部署拿到 Vercel 網域後,回填 `astro.config.mjs` 的 `site`,再 push 一次(讓 canonical / RSS / OG 是正式網址)。
- 在 `astro.config.mjs` 取消註解 `social`,填上你的 Threads / X 連結。

## 刻意不做

資料庫/CMS、會員、自建留言、站上 AI 功能、Notion 同步、前期 SEO 排名、每篇自動 OG 圖。
新功能先過一關:對「我有沒有持續在寫」有沒有直接幫助?沒有就不做。
