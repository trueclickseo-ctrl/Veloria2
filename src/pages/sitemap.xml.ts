import { getPublishedArticles, getAllTags } from '../utils/posts';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';

export async function GET() {
  const articles = await getPublishedArticles();
  const tags = await getAllTags();
  const authors = await getCollection('authors');
  const categories = Object.keys(siteConfig.categories);

  const urls: string[] = [
    siteConfig.siteUrl, // Homepage
    `${siteConfig.siteUrl}/search`, // Search page
  ];

  // Add categories
  categories.forEach(category => {
    urls.push(`${siteConfig.siteUrl}/${category.toLowerCase()}`);
  });

  // Add tags
  tags.forEach(tag => {
    urls.push(`${siteConfig.siteUrl}/tags/${tag.name.toLowerCase()}`);
  });

  // Add authors
  authors.forEach(author => {
    urls.push(`${siteConfig.siteUrl}/authors/${author.id}`);
  });

  // Add articles
  articles.forEach(article => {
    urls.push(`${siteConfig.siteUrl}/${article.slug || article.id}`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url === siteConfig.siteUrl ? '1.0' : url.includes('/articles/') ? '0.8' : '0.5'}</priority>
  </url>`).join('')}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
