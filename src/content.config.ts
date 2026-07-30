import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { frontmatterExtension } from './config/frontmatter.extend';

const authorsCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/authors' }),
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string(),
    twitter: z.string().url().optional(),
    facebook: z.string().url().optional(),
    github: z.string().url().optional(),
    website: z.string().url().optional(),
  }),
});

const articlesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: 'src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: reference('authors'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    related: z.array(z.string()).default([]), // explicit related overrides (slugs)
    schemaType: z.enum(['Article', 'DefinedTerm', 'CreativeWork']).default('Article'),
  }).merge(frontmatterExtension),
});

export const collections = {
  authors: authorsCollection,
  articles: articlesCollection,
};
