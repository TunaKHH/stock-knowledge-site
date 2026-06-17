import { getCollection } from 'astro:content';

export interface ArticleLink {
	title: string;
	href: string;
	description?: string;
}

/**
 * 取某分類資料夾底下「已發佈」的文章(排除草稿、分類首頁 index、可選排除當前頁)。
 * 排序:先看 sidebar.order,再依 pubDate(新→舊),最後標題。
 * href 由 entry.id 轉小寫推得(中文不受影響,ASCII 轉小寫對齊 Starlight slug)。
 */
export async function getCategoryArticles(
	dir: string,
	opts: { excludeId?: string } = {},
): Promise<ArticleLink[]> {
	const all = await getCollection('docs');
	return all
		.filter((e) => e.id.startsWith(`${dir}/`))
		.filter((e) => e.id !== dir && !e.id.endsWith('/index'))
		.filter((e) => !e.data.draft)
		.filter((e) => e.id !== opts.excludeId)
		.sort((a, b) => {
			const oa = a.data.sidebar?.order ?? Number.POSITIVE_INFINITY;
			const ob = b.data.sidebar?.order ?? Number.POSITIVE_INFINITY;
			if (oa !== ob) return oa - ob;
			const da = a.data.pubDate?.getTime() ?? 0;
			const db = b.data.pubDate?.getTime() ?? 0;
			if (da !== db) return db - da;
			return a.data.title.localeCompare(b.data.title, 'zh-Hant');
		})
		.map((e) => ({
			title: e.data.title,
			href: `/${e.id.toLowerCase()}/`,
			description: e.data.description,
		}));
}
