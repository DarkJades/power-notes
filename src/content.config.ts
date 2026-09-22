import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const category = z.enum(['power-electronics', 'components', 'analog', 'pcb', 'engineering', 'ai-hardware']);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category,
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().int().nonnegative().optional(),
    template: z.enum(['component-guide', 'circuit-design', 'topology-analysis', 'engineering-case', 'design-checklist', 'ai-hardware', 'online-article']).default('component-guide'),
    attachments: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category,
    resourceType: z.enum(['standard', 'datasheet', 'application-note', 'design-template', 'test-report', 'tool', 'other']),
    tags: z.array(z.string()).default([]),
    file: z.string(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog, resources };
