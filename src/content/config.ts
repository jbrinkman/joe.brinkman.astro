import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              }),
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional()

// Legacy post collection for existing AstroWind posts
const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
})

// New blog collection for migrated Hexo content with enhanced schema
const blogCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/content/blog' }),
  schema: z.object({
    // Core post metadata
    title: z.string(),
    description: z.string().optional(),

    // Date fields (supporting both Hexo and Astro conventions)
    date: z.date().optional(), // Hexo convention
    publishDate: z.date().optional(), // Astro convention
    updated: z.date().optional(), // Hexo convention
    updateDate: z.date().optional(), // Astro convention

    // Hexo-compatible taxonomy fields
    categories: z.array(z.string()).default([]), // Hexo uses array of categories
    tags: z.array(z.string()).default([]), // Hexo uses array of tags

    // Post status and metadata
    draft: z.boolean().default(false),
    published: z.boolean().default(true), // Hexo convention

    // Content metadata
    excerpt: z.string().optional(),
    image: z.string().optional(),
    author: z.string().optional(),

    // Hexo-specific fields that might be present
    permalink: z.string().optional(),
    layout: z.string().optional(),

    // SEO and social metadata
    metadata: metadataDefinition(),
  }),
})

export const collections = {
  post: postCollection,
  blog: blogCollection,
}
