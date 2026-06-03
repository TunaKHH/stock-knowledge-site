# 股票知識網站 — 實作計畫

- 日期:2026-06-03
- 對應設計:`docs/plans/2026-06-03-stock-knowledge-site-design.md`
- 技術棧:Astro **Starlight** + Markdown + **Vercel**(git push 自動部署)
- 原則:壓低發佈摩擦、YAGNI、AI 只 scaffold 不代筆

> 每個 Phase 結尾都有「驗證」。一個 Phase 沒過不要進下一個。

---

## Phase 0 — Repo 與環境

**目標**:把目前的資料夾變成 git repo,確認 Node 版本可跑 Starlight。

- [ ] 確認 Node 版本 ≥ 20(Starlight 需要;Vercel 預設 Node 24 LTS)。`node -v`
- [ ] 在專案根目錄 `git init`(目前還不是 repo)。
- [ ] 加 `.gitignore`(node_modules / dist / .vercel / .env 等)。
- [ ] 首次 commit:把現有的 `docs/plans/*.md`(設計 + 本計畫)納管。

**驗證**:`git status` 乾淨、`git log` 有第一個 commit。

---

## Phase 1 — Starlight 專案初始化

**目標**:在現有資料夾長出可跑的 Starlight 站(不覆蓋 `docs/`)。

- [ ] 用官方 template 建立 Starlight。因為資料夾已有 `docs/`,採「建到子資料夾再搬」或「空資料夾建立後合併」其中較乾淨者:
  - 方案 A(建議):`npm create astro@latest -- --template starlight --no-install --no-git --skip-houston` 建到暫存資料夾,再把 `src/ public/ astro.config.mjs package.json` 等搬進根目錄,保留既有 `docs/`。
- [ ] `npm install`。
- [ ] 確認可啟動:`npm run dev`(預設 http://localhost:4321)。

**驗證**:dev server 起得來、看得到 Starlight 預設首頁與側欄。

---

## Phase 2 — 站台設定(astro.config.mjs)

**目標**:設定站的身分、語系、側欄。

- [ ] `site`:先填 placeholder(例 `https://stock-notes.vercel.app`),Phase 6 拿到真實網域後回填(canonical / RSS 絕對網址靠它)。
- [ ] Starlight 設定:
  - `title`:站名(例「投資知識筆記」)。
  - `locale` / `defaultLocale`:`zh-TW`(單語系)。
  - `social`:之後放 Threads / X 連結(cross-post 出口)。
  - `sidebar`:用 `autogenerate` 從 `src/content/docs/` 目錄結構長出主題分類。
  - `editLink`(選填):指向 repo,方便自己快速改。

**驗證**:`npm run dev` 標題/語系/側欄正確,頁面 `<html lang="zh-TW">`。

---

## Phase 3 — 內容結構與第一篇 scaffold

**目標**:建立第一個主題分類與第一篇的「空殼」(headings 由 AI/你定骨架,**內文你自己寫**)。

- [ ] 首頁 `src/content/docs/index.mdx`:站的定位一段 + 主題地圖(目前一條:基本面與技術面)。
- [ ] 第一篇 `src/content/docs/基本面與技術面/什麼是基本面與技術面.md`:
  - frontmatter:`title` / `description` / `pubDate`(草稿可 `draft: true`)。
  - 內文先放章節骨架(例:什麼是基本面 / 什麼是技術面 / 各看什麼 / 各自盲點 / 何時用哪個),**留白讓你填初稿**。
- [ ] 確認側欄出現「基本面與技術面」分類與該篇。

**驗證**:dev server 點得到第一篇、側欄分類正確、frontmatter schema 不報錯。

---

## Phase 4 — RSS feed

**目標**:給讀者訂閱、也方便日後自動化分發(對應 §6 cross-post)。

- [ ] `npm install @astrojs/rss`。
- [ ] 建立 `src/pages/rss.xml.js`:讀 docs collection,依 `pubDate` 排序輸出 feed(title / link / pubDate / description)。
- [ ] 在 head 或頁尾加上 feed 的 `<link rel="alternate" type="application/rss+xml">`。

**驗證**:`npm run build` 後 `/rss.xml` 有正確絕對網址與第一篇條目。

---

## Phase 5 — SEO / 分享 meta / canonical

**目標**:貼到 Threads/X 時連結預覽漂亮,且站是乾淨的 canonical 來源。

- [ ] 確認 Starlight 預設已輸出 canonical(來自 `site`)與基本 OG。
- [ ] 補完整分享標籤:用 astro.config 的 `head` 或自訂 Head 元件加 `og:image`、`twitter:card=summary_large_image`、`twitter:title/description`。
- [ ] 放一張全站預設 OG 圖到 `public/`(例 `og-default.png`),head 指向它。(每篇自動生成 OG 圖列為 later,YAGNI)
- [ ] canonical 方向備忘寫進 README:站上每頁 canonical 指自己;「指回自站」是去方格子/Medium 設定原文連結。

**驗證**:`view-source` 看得到 canonical、og:title/description/image、twitter:card;用分享預覽工具看連結卡正常。

---

## Phase 6 — 部署到 Vercel(git push 自動部署)

**目標**:達成「寫 .md → git push → 自動上線」零儀式。

- [ ] 建立 GitHub repo 並 push(git push 自動部署需要 Git remote 連到 Vercel)。
- [ ] 在 Vercel import 這個 repo:framework 自動偵測 Astro,build `astro build`,output `dist`(純靜態,**不需** adapter)。
- [ ] 首次部署成功後,拿到 Vercel 網域,回填 `astro.config.mjs` 的 `site`,再 push 一次(讓 canonical/RSS 是正式網址)。
- [ ] 確認 PR/分支會產生 preview 部署。

**驗證**:push 後 Vercel 自動 build；線上看得到首頁、第一篇、`/rss.xml`、正確 canonical/OG。

> 註:建立公開 repo 與部署上線屬「對外動作」,執行前我會再跟你確認一次。

---

## Phase 7 — 合規與收尾

**目標**:輕量合規 + 把寫作循環固定下來。

- [ ] 覆寫 Starlight Footer 元件(`src/components/Footer.astro` + astro.config 的 `components.Footer`),加一行「本站為個人學習筆記,非投資建議」。
- [ ] README 寫下「寫作循環」備忘:寫 `.md` → 丟 AI 當編輯/反方 → 修 → `git push` → 上線 → cross-post(連結+重點貼 Threads/X、可選 cross-post 方格子並設 canonical 回自站)。
- [ ] (選填)記一個可持續節奏(例每週一篇)在 README 當自我問責。

**驗證**:每頁頁尾有免責;README 讀完就知道完整發佈流程。

---

## 完成定義(Definition of Done)

1. 線上站可訪問,側欄有「基本面與技術面」分類與第一篇骨架。
2. `git push` 會自動觸發 Vercel build & deploy(零手動儀式)。
3. `/rss.xml` 正常;每頁 canonical + OG/Twitter meta 正確。
4. 頁尾有非投資建議聲明。
5. 你能在不碰建置設定的情況下,只靠「新增/編輯 `.md` + push」就發佈。

## 刻意不做(沿用設計 §9)

資料庫/CMS、會員、自建留言、站上 AI 功能、Notion 同步、前期 SEO 排名、每篇自動 OG 圖。任何新功能先過一關:對「我有沒有持續在寫」有沒有直接幫助?沒有就不做。
