---
name: stock-knowledge-article
description: This skill should be used when writing or drafting a new article for the stock-knowledge-site investing-notes site (任何要新增 stock-knowledge-site 文章、寫一篇股票/投資知識文、把某個觀念寫成站上文章的需求). It produces articles in the site's default style — a 實習生/貝肯 teacher-student dialogue built around one running everyday analogy, with 🟧🟩 alternating section headers — and follows the project's file, frontmatter, draft, and design conventions.
---

# 撰寫 stock-knowledge-site 文章

把一個窄的投資 / 股票觀念,寫成站上預設的**師徒對話 + 一條生活比喻**文章。

## 何時使用

要為 stock-knowledge-site 新增 / 起草一篇知識文章時。這是站上**所有新文章的預設寫法**(舊的 24 篇說明體文章不在此列,除非明確要求改寫)。

## 動工前先讀

1. `references/style-guide.md` — 角色卡、結構模板、格式規則、比喻挑選、紅線。**每次都讀**,確保角色名與風格一致。
2. 專案根目錄 `DESIGN.md` — 禁 AI slop 的視覺 / 語氣界線。
3. (新分類才需要)`CLAUDE.md` 的「導覽結構」段。

## 寫一篇的流程

1. **定主題與比喻**:挑一個窄主題,選一個讀者百分百有經驗的生活比喻(法說會已用「成績單/家長會」,別重複)。確認主題的每個關鍵組成在比喻裡都有對應物。
2. **查證事實**:涉及制度、數字、規範的部分先查清楚再寫(例:Reg FD、公開資訊觀測站、ADR 換股比例)。不確定不要憑印象。
3. **複製模板**:以 `assets/article-template.md` 為骨架,填入 frontmatter 與六拍對話結構(破題比喻 → 為什麼存在 → 本體 → 常見誤解 → 實務該抓什麼 → 簡單說)。
4. **寫對話**:實習生問 / 貝肯答交替,比喻一條到底,術語第一次出現粗體+括號原文。少表格、少廢話。
5. **存檔位置**:`src/content/docs/<分類>/<什麼是XXX>.md`。分類沿用現有資料夾(如 `金融商品與機制/`、`投資地基/`);檔名用中文、對應 `title`。
6. **frontmatter**:`title` / `description` / `pubDate`(發稿日)。**新稿一律 `draft: true`** —— 草稿不會上線,等作者本人讀過、認可才由作者拿掉。

## 發佈規矩(README 已定)

- 內文可由 AI 代筆,但**發佈前作者一定要自己讀懂、認可**;AI 同時兼編輯 / 反方。
- AI 不負責拿掉 `draft: true`、不負責 push —— 那是作者按下「我認可」的動作。

## 新增分類時(少數情況)

若主題不屬於任何現有資料夾,要同時:
1. 建 `src/content/docs/<新主題>/`(含 `index.md` 落地頁)。
2. `astro.config.mjs` 的 `sidebar` 加一條 `{ label: '<新主題>', autogenerate: { directory: '<新主題>' } }`。
3. `src/components/SiteTitle.astro` 的 `categories` 加一條。

## 完成後

跟作者說檔案路徑、用了什麼比喻、`draft: true` 已設,並提醒可 `npm run dev`(localhost:4321)看排版。把可疑的事實點列出來請作者一起確認。
