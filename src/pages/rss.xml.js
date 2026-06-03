import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const docs = await getCollection('docs');
	const items = docs
		// 只收非草稿、且有發佈日期的文章(首頁等沒有 pubDate,自然排除)。
		.filter((d) => !d.data.draft && d.data.pubDate)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return rss({
		title: '投資知識筆記',
		description: '用費曼學習法把投資與股票知識親手寫清楚的個人筆記。非投資建議。',
		site: context.site,
		items: items.map((d) => ({
			title: d.data.title,
			description: d.data.description ?? '',
			pubDate: d.data.pubDate,
			link: `/${d.id}/`,
		})),
	});
}
