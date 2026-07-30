import rss from '@astrojs/rss';
import { getPublishedArticles } from '../utils/posts';
import { siteConfig } from '../config/site';

export async function GET(context: any) {
  const articles = await getPublishedArticles();
  
  return rss({
    title: siteConfig.siteName,
    description: siteConfig.description,
    site: context.site || siteConfig.siteUrl,
    items: articles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.publishDate,
      description: article.data.description,
      link: `/${article.slug || article.id}`,
    })),
    customData: `<language>en-us</language>`,
  });
}
