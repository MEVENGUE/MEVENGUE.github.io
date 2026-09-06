import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const localizedBase = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  locale: z.enum(['fr', 'en']).optional(),
  translationKey: z.string().optional(),
  date: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  year: z.union([z.string(), z.number()]).optional(),
  category: z.string().optional(),
  number: z.string().optional(),
  metrics: z.preprocess(
    (value) => Array.isArray(value) ? value : [],
    z.array(z.object({ value: z.string(), label: z.string() }))
  ).default([]),
  school: z.string().optional(),
  readingTime: z.string().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  cover: z.string().optional(),
  image: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  canonical: z.url().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: localizedBase.extend({
    gallery: z.array(z.string()).default([]),
    documents: z.array(z.object({
      title: z.string(),
      type: z.enum(['report', 'presentation', 'guide', 'deliverable', 'document']).default('document'),
      url: z.string(),
      description: z.string().optional(),
    })).default([]),
    role: z.string().optional(),
    client: z.string().optional(),
    stack: z.array(z.string()).default([]),
    link: z.url().optional(),
    repository: z.url().optional(),
    github: z.url().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: localizedBase.extend({
    published: z.coerce.date().optional(),
    author: z.string().default('Franck Mevengue'),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: localizedBase.extend({
    section: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { projects, articles, docs };
