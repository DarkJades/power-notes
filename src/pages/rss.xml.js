import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site, resolveUrl } from '../data/site';
export async function GET(context){const entries=(await getCollection('blog',({data})=>!data.draft)).sort((a,b)=>b.data.publishedAt-a.data.publishedAt);return rss({title:site.name,description:site.description,site:context.site,items:entries.map(e=>({title:e.data.title,description:e.data.description,pubDate:e.data.publishedAt,link:resolveUrl(`articles/${e.data.slug}/`)}))});}
