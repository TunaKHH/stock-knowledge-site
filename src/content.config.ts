import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		// 在 Starlight 預設 schema 上補一個發佈日期欄位,供 RSS 排序。
		schema: docsSchema({
			extend: z.object({
				pubDate: z.date().optional(),
			}),
		}),
	}),
};
