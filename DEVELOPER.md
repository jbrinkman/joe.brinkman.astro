# Developer Guide

## Project Architecture

This project is built with Astro 5.0 and uses the AstroWind template as its foundation. The architecture follows modern web development practices with:

- **Astro**: Static site generator with component islands
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript development
- **MDX**: Enhanced markdown with component support

### Blog Architecture

The blog system supports dual content collections:

- **Legacy Collection** (`src/data/post/`): Original AstroWind posts
- **Blog Collection** (`src/content/blog/`): Migrated Hexo content with enhanced schema

#### Dynamic Blog Pages

- **Individual Posts**: `src/pages/blog/[slug].astro` - Handles both collections
- **Post Layout**: `src/components/blog/SinglePost.astro` - Enhanced with categories support
- **Content Collections**: `src/content/config.ts` - Dual schema configuration

## Development Setup

### Prerequisites

- Node.js 18.20.8 or higher (recommended: Node.js 20+)
- npm 9.6.5 or higher

### Installation

```bash
git clone <repository-url>
cd astro-blog
npm install
```

### Migration Scripts

This project includes scripts for migrating content from Hexo to Astro:

- `scripts/migrate-hexo.js` - Main migration script that converts Hexo posts to Astro format
- `scripts/fix-image-refs.js` - Utility script to fix image references in migrated content

#### Running Migration

```bash
# Run the main migration script
node scripts/migrate-hexo.js

# Fix image references (if needed)
node scripts/fix-image-refs.js
```

The migration script:

- Reads Hexo markdown files from the configured source directory
- Converts frontmatter from Hexo to Astro format
- Preserves categories, tags, and dates
- Copies associated images to Astro assets directory
- Updates image references in content

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting and formatting
npm run fix

# Check project for errors
npm run check
```

## Project Structure

```
src/
├── assets/          # Static assets (images, styles)
├── components/      # Reusable Astro components
│   ├── blog/       # Blog-specific components
│   ├── common/     # Common utility components
│   ├── ui/         # UI components
│   └── widgets/    # Page section widgets
├── content/        # Content collections (blog posts)
├── layouts/        # Page layout templates
├── pages/          # File-based routing
├── utils/          # Utility functions
├── config.yaml     # Site configuration
└── navigation.ts   # Navigation configuration
```

## Content Management

The project uses Astro Content Collections for managing blog content with two collections:

### Collections

1. **Legacy Post Collection** (`src/data/post/`)
   - Contains existing AstroWind template posts
   - Used by current blog pages and components
   - Schema supports basic blog metadata

2. **Blog Collection** (`src/content/blog/`)
   - New collection for migrated Hexo content
   - Enhanced schema with Hexo-compatible fields
   - Supports categories, tags, and multiple date formats

### Content Schema

The blog collection schema supports:

- **Hexo compatibility**: `date`, `categories[]`, `tags[]`, `published`
- **Astro conventions**: `publishDate`, `updateDate`, `draft`
- **SEO metadata**: `title`, `description`, `excerpt`, `image`
- **Content organization**: Multiple categories and tags as arrays

### Adding Content

Create new blog posts in `src/content/blog/` with frontmatter:

```yaml
---
title: "Your Post Title"
description: "Post description for SEO"
date: 2024-01-15
categories: ["Technology", "Web Development"]
tags: ["astro", "blog", "migration"]
draft: false
published: true
---
```

Content collections are configured in `src/content/config.ts` with TypeScript schemas for validation.

## Styling

The project uses Tailwind CSS for styling with custom configurations in:

- `tailwind.config.js` - Tailwind configuration
- `src/assets/styles/tailwind.css` - Base styles
- `src/components/CustomStyles.astro` - Custom component styles

## Migration Notes

This project was initialized from the AstroWind template and is being configured for blog migration from Hexo. Key migration tasks include:

1. Content structure adaptation
2. URL structure preservation
3. Asset migration
4. SEO metadata preservation

## Blog Implementation Details

### Content Collections

The project uses two content collections:

1. **Post Collection** (`post`): Legacy AstroWind posts from `src/data/post/`
2. **Blog Collection** (`blog`): Migrated Hexo content from `src/content/blog/`

### Dynamic Blog Post Pages

The `src/pages/blog/[slug].astro` file handles rendering for both collections:

- Automatically generates static paths for all posts
- Normalizes data between different collection schemas
- Handles Hexo-specific fields (categories array, multiple date formats)
- Provides proper SEO metadata and Open Graph tags

### Post Data Normalization

The blog page normalizes data from both collections:

```typescript
// Handles both Hexo and Astro date conventions
const publishDate = data.publishDate || data.date || new Date();

// Converts categories to consistent format
const categories = data.categories || (data.category ? [data.category] : []);

// Normalizes tags to object format
const tags = tags.map((tag: string) => ({ slug: cleanSlug(tag), title: tag }));
```

### Enhanced SinglePost Component

The `SinglePost` component has been enhanced to display:

- Categories as clickable tags (when available)
- Tags with proper linking
- Proper metadata (author, date, reading time)
- Social sharing buttons
- Responsive image handling

### Testing Blog Posts

To test blog post rendering:

```bash
# Build the site
npm run build

# Check generated pages in dist/blog/
ls dist/blog/

# Start development server
npm run dev
# Visit http://localhost:4321/blog/[post-slug]
```
