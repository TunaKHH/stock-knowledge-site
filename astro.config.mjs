// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// 部署後請把這裡換成正式 Vercel 網域(canonical / RSS 絕對網址靠它)。
const site = 'https://stock-knowledge-site.vercel.app';

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [
		starlight({
			title: '投資知識筆記',
			// 設計系統(編輯感 / 紙感):覆寫 --sl-* 變數,理念見根目錄 DESIGN.md。
			customCss: ['./src/styles/theme.css'],
			// 單一語系:用 root locale,網址不帶 /en 前綴,<html lang> = zh-TW。
			defaultLocale: 'root',
			locales: {
				root: { label: '繁體中文', lang: 'zh-TW' },
			},
			// cross-post 出口:填上你的 Threads / X 後取消註解。
			// social: [
			// 	{ icon: 'x.com', label: 'X', href: 'https://x.com/你的帳號' },
			// 	{ icon: 'threads', label: 'Threads', href: 'https://www.threads.net/@你的帳號' },
			// ],
			// 側欄按主題分類;每開一個新主題就在這裡加一條 autogenerate。
			sidebar: [
				{
					label: '投資地基(先讀這裡)',
					items: [{ autogenerate: { directory: '投資地基' } }],
				},
				{
					label: '基本面與技術面',
					items: [{ autogenerate: { directory: '基本面與技術面' } }],
				},
				{
					label: '金融商品與機制',
					items: [{ autogenerate: { directory: '金融商品與機制' } }],
				},
				{
					label: '風險與資產配置',
					items: [{ autogenerate: { directory: '風險與資產配置' } }],
				},
				{
					label: '選股策略與回測',
					items: [{ autogenerate: { directory: '選股策略與回測' } }],
				},
				{
					label: '產業知識',
					items: [{ autogenerate: { directory: '產業知識' } }],
				},
			],
			// 覆寫頁尾(免責聲明)與站名(右側加主分類導覽列)。
			components: {
				Footer: './src/components/Footer.astro',
				SiteTitle: './src/components/SiteTitle.astro',
			},
			// 分享 meta:Starlight 預設已輸出 og:title/description 與 twitter:card,
			// 這裡補上預設分享圖與 RSS 連結。
			head: [
				{ tag: 'meta', attrs: { property: 'og:image', content: `${site}/og-default.png` } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: `${site}/og-default.png` } },
				// 設計系統字型:標題襲線(Fraunces / Noto Serif TC)、內文 DM Sans、程式碼 JetBrains Mono。
				// 中文襲線(Noto Serif TC)由 Google Fonts 依字元動態子集,只載標題用得到的字。
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=JetBrains+Mono:wght@400;600&family=Noto+Serif+TC:wght@600;700&display=swap',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'alternate',
						type: 'application/rss+xml',
						title: '投資知識筆記',
						href: `${site}/rss.xml`,
					},
				},
			],
		}),
	],
});
