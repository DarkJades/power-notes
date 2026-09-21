import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.enum(['power-electronics', 'components', 'analog', 'pcb', 'engineering', 'ai-hardware']),
    tags: z.array(z.string()).default([]),
    template: z.enum(['component-guide', 'circuit-design', 'topology-analysis', 'engineering-case', 'design-checklist', 'ai-hardware']).default('component-guide'),
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog };
