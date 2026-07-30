import { getCollection, type CollectionEntry } from 'astro:content';

// Get all published articles, sorted by publish date descending
export async function getPublishedArticles(): Promise<CollectionEntry<'articles'>[]> {
  const articles = await getCollection('articles');
  return articles
    .filter(article => !article.data.draft)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

// Get all articles for a specific category
export async function getArticlesByCategory(category: string): Promise<CollectionEntry<'articles'>[]> {
  const articles = await getPublishedArticles();
  return articles.filter(article => article.data.category.toLowerCase() === category.toLowerCase());
}

// Get all articles for a specific tag
export async function getArticlesByTag(tag: string): Promise<CollectionEntry<'articles'>[]> {
  const articles = await getPublishedArticles();
  return articles.filter(article => article.data.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()));
}

// Get all articles written by a specific author
export async function getArticlesByAuthor(authorId: string): Promise<CollectionEntry<'articles'>[]> {
  const articles = await getPublishedArticles();
  return articles.filter(article => article.data.author.id === authorId);
}

// Get related articles based on category match + shared tags
export async function getRelatedArticles(
  currentArticle: CollectionEntry<'articles'>,
  limit = 3
): Promise<CollectionEntry<'articles'>[]> {
  const allArticles = await getPublishedArticles();
  const otherArticles = allArticles.filter(article => article.id !== currentArticle.id);

  // If explicit related article slugs are specified in frontmatter, resolve them first
  if (currentArticle.data.related && currentArticle.data.related.length > 0) {
    const explicitRelated = otherArticles.filter(article => 
      currentArticle.data.related.includes(article.id) || currentArticle.data.related.includes(article.slug)
    );
    if (explicitRelated.length >= limit) {
      return explicitRelated.slice(0, limit);
    }
  }

  // Calculate scores: same category = 5 points, each shared tag = 2 points
  const currentTags = currentArticle.data.tags.map(t => t.toLowerCase());
  
  const scored = otherArticles.map(article => {
    let score = 0;
    
    // Category match
    if (article.data.category.toLowerCase() === currentArticle.data.category.toLowerCase()) {
      score += 5;
    }
    
    // Tags match
    const articleTags = article.data.tags.map(t => t.toLowerCase());
    const sharedTags = articleTags.filter(t => currentTags.includes(t));
    score += sharedTags.length * 2;
    
    return { article, score };
  });

  // Sort by score descending, then by publishDate descending
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.article.data.publishDate.getTime() - a.article.data.publishDate.getTime();
    })
    .map(item => item.article)
    .slice(0, limit);
}

// Get unique tags and their counts
export async function getAllTags(): Promise<Array<{ name: string; count: number }>> {
  const articles = await getPublishedArticles();
  const tagCounts: Record<string, number> = {};
  
  articles.forEach(article => {
    article.data.tags.forEach(tag => {
      const normalized = tag.trim();
      tagCounts[normalized] = (tagCounts[normalized] || 0) + 1;
    });
  });

  return Object.keys(tagCounts)
    .map(name => ({ name, count: tagCounts[name] }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
