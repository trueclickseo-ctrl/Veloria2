import { siteConfig } from '../config/site';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.siteUrl}/#organization`,
    'name': siteConfig.organizationInfo.name,
    'url': siteConfig.organizationInfo.url,
    'logo': {
      '@type': 'ImageObject',
      'url': siteConfig.organizationInfo.logo,
      'caption': siteConfig.organizationInfo.name,
    },
    'sameAs': siteConfig.organizationInfo.sameAs,
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}/#website`,
    'name': siteConfig.siteName,
    'url': siteConfig.siteUrl,
    'description': siteConfig.description,
    'publisher': {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${siteConfig.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.item,
    })),
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  publishDate: Date;
  updatedDate?: Date;
  image: string;
  url: string;
  authorName: string;
  authorUrl?: string;
  category: string;
}) {
  const absoluteImage = article.image.startsWith('http')
    ? article.image
    : `${siteConfig.siteUrl}${article.image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle', // NewsArticle or BlogPosting or Article
    'headline': article.title,
    'description': article.description,
    'image': [absoluteImage],
    'datePublished': article.publishDate.toISOString(),
    'dateModified': article.updatedDate ? article.updatedDate.toISOString() : article.publishDate.toISOString(),
    'author': {
      '@type': 'Person',
      'name': article.authorName,
      'url': article.authorUrl,
    },
    'publisher': {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': article.url,
    },
    'articleSection': article.category,
  };
}

export function getDefinedTermSchema(term: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    'name': term.name,
    'description': term.description,
    'url': term.url,
    'inDefinedTermSet': `${siteConfig.siteUrl}/#definedtermset`,
  };
}

export function getCreativeWorkSchema(work: {
  name: string;
  description: string;
  url: string;
  authorName: string;
  publishDate: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': work.name,
    'description': work.description,
    'url': work.url,
    'datePublished': work.publishDate.toISOString(),
    'author': {
      '@type': 'Person',
      'name': work.authorName,
    },
    'publisher': {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
  };
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}
