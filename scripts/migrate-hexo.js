#!/usr/bin/env node

/**
 * Hexo to Astro Migration Script
 * 
 * This script migrates blog posts from a Hexo blog to Astro content collections.
 * It reads Hexo markdown files, converts the frontmatter format, and generates
 * Astro-compatible content files.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const HEXO_SOURCE_DIR = '/Users/jbrinkman/projects/joe.brinkman.hexo/source/_posts';
const ASTRO_CONTENT_DIR = './src/content/blog';
const ASTRO_ASSETS_DIR = './src/assets/images/blog';
const LOG_FILE = './migration.log';

// Ensure the target directories exist
if (!fs.existsSync(ASTRO_CONTENT_DIR)) {
  fs.mkdirSync(ASTRO_CONTENT_DIR, { recursive: true });
}
if (!fs.existsSync(ASTRO_ASSETS_DIR)) {
  fs.mkdirSync(ASTRO_ASSETS_DIR, { recursive: true });
}

// Initialize log file
const log = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(LOG_FILE, logMessage);
};

// Clear previous log
if (fs.existsSync(LOG_FILE)) {
  fs.unlinkSync(LOG_FILE);
}

/**
 * Convert Hexo date format to JavaScript Date
 * Hexo supports various date formats: YYYY-MM-DD, MM/DD/YYYY, etc.
 */
function parseHexoDate(dateStr) {
  if (!dateStr) return null;

  // Handle different date formats
  let date;

  // Try parsing as-is first (handles ISO dates)
  date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date;
  }

  // Handle MM/DD/YYYY format
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      // Assume MM/DD/YYYY
      date = new Date(parts[2], parts[0] - 1, parts[1]);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
  }

  // Handle YYYY-MM-DD format
  if (dateStr.includes('-')) {
    date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  log(`Warning: Could not parse date "${dateStr}"`);
  return null;
}

/**
 * Generate a slug from the filename
 */
function generateSlug(filename) {
  return filename
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Copy images from Hexo post directory to Astro assets
 */
function copyPostImages(hexoPostPath, slug) {
  const hexoPostDir = path.dirname(hexoPostPath);
  const postDirName = path.basename(hexoPostPath, '.md');
  const hexoImageDir = path.join(hexoPostDir, postDirName);

  const copiedImages = [];

  // Check if the post has an associated image directory
  if (fs.existsSync(hexoImageDir)) {
    const imageFiles = fs.readdirSync(hexoImageDir)
      .filter(file => /\.(png|jpg|jpeg|gif|svg)$/i.test(file));

    for (const imageFile of imageFiles) {
      const sourcePath = path.join(hexoImageDir, imageFile);
      const targetPath = path.join(ASTRO_ASSETS_DIR, `${slug}-${imageFile}`);

      try {
        fs.copyFileSync(sourcePath, targetPath);
        copiedImages.push({
          original: imageFile,
          new: `${slug}-${imageFile}`,
          relativePath: `./Bits-and-Bytes-2022-12/${imageFile}`, // Original reference
          newPath: `~/assets/images/blog/${slug}-${imageFile}` // New Astro reference
        });
        log(`  ✓ Copied image: ${imageFile} -> ${slug}-${imageFile}`);
      } catch (error) {
        log(`  ✗ Failed to copy image ${imageFile}: ${error.message}`);
      }
    }
  }

  return copiedImages;
}

/**
 * Update image references in markdown content
 */
function updateImageReferences(content, slug, copiedImages) {
  let updatedContent = content;

  for (const image of copiedImages) {
    // Update relative image references
    const oldRef = `./${slug}/${image.original}`;
    const newRef = `~/assets/images/blog/${image.new}`;
    updatedContent = updatedContent.replace(new RegExp(oldRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newRef);

    // Also handle the case where the directory name might be different
    const postDirPattern = `\\./${slug.replace(/-/g, '-')}/${image.original}`;
    updatedContent = updatedContent.replace(new RegExp(postDirPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newRef);
  }

  return updatedContent;
}

/**
 * Convert Hexo frontmatter to Astro-compatible format
 */
function convertFrontmatter(hexoData, filename) {
  const astroData = {};

  // Title (required)
  astroData.title = hexoData.title || path.basename(filename, '.md');

  // Dates - convert to proper Date objects
  if (hexoData.date) {
    const parsedDate = parseHexoDate(hexoData.date);
    if (parsedDate) {
      astroData.publishDate = parsedDate;
      astroData.date = parsedDate; // Keep both for compatibility
    }
  }

  if (hexoData.updated) {
    const parsedDate = parseHexoDate(hexoData.updated);
    if (parsedDate) {
      astroData.updateDate = parsedDate;
      astroData.updated = parsedDate; // Keep both for compatibility
    }
  }

  // Categories - ensure it's an array
  if (hexoData.categories) {
    if (Array.isArray(hexoData.categories)) {
      astroData.categories = hexoData.categories;
    } else if (typeof hexoData.categories === 'string') {
      astroData.categories = [hexoData.categories];
    }
  } else {
    astroData.categories = [];
  }

  // Tags - ensure it's an array
  if (hexoData.tags) {
    if (Array.isArray(hexoData.tags)) {
      astroData.tags = hexoData.tags;
    } else if (typeof hexoData.tags === 'string') {
      astroData.tags = [hexoData.tags];
    }
  } else {
    astroData.tags = [];
  }

  // Optional fields
  if (hexoData.excerpt) {
    astroData.excerpt = hexoData.excerpt;
    astroData.description = hexoData.excerpt; // Use excerpt as description
  }

  if (hexoData.hero) {
    astroData.image = hexoData.hero;
  }

  if (hexoData.draft !== undefined) {
    astroData.draft = Boolean(hexoData.draft);
  } else {
    astroData.draft = false;
  }

  // Preserve Hexo-specific fields that might be useful
  if (hexoData.permalink) {
    astroData.permalink = hexoData.permalink;
  }

  if (hexoData.layout) {
    astroData.layout = hexoData.layout;
  }

  // Set published status
  astroData.published = !astroData.draft;

  return astroData;
}

/**
 * Process a single Hexo markdown file
 */
function processHexoFile(filePath) {
  try {
    const filename = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf8');

    // Parse the frontmatter and content
    const { data: hexoData, content: markdownContent } = matter(content);

    // Convert frontmatter
    const astroData = convertFrontmatter(hexoData, filename);

    // Generate output filename (slug-based)
    const slug = generateSlug(filename);

    // Copy associated images
    const copiedImages = copyPostImages(filePath, slug);

    // Update image references in content
    let updatedContent = markdownContent;
    if (copiedImages.length > 0) {
      updatedContent = updateImageReferences(markdownContent, slug, copiedImages);
    }

    // Create the new file with Astro-compatible frontmatter
    const astroContent = matter.stringify(updatedContent, astroData);

    // Write the converted file
    const outputPath = path.join(ASTRO_CONTENT_DIR, `${slug}.md`);
    fs.writeFileSync(outputPath, astroContent);

    log(`✓ Migrated: ${filename} -> ${slug}.md`);
    if (copiedImages.length > 0) {
      log(`  └─ Copied ${copiedImages.length} image(s)`);
    }

    return {
      success: true,
      filename,
      slug,
      categories: astroData.categories,
      tags: astroData.tags,
      publishDate: astroData.publishDate,
      imagesCopied: copiedImages.length
    };

  } catch (error) {
    log(`✗ Error processing ${filePath}: ${error.message}`);
    return {
      success: false,
      filename: path.basename(filePath),
      error: error.message
    };
  }
}

/**
 * Main migration function
 */
function migrateHexoContent() {
  log('Starting Hexo to Astro migration...');
  log(`Source: ${HEXO_SOURCE_DIR}`);
  log(`Target: ${ASTRO_CONTENT_DIR}`);

  // Check if source directory exists
  if (!fs.existsSync(HEXO_SOURCE_DIR)) {
    log(`Error: Source directory does not exist: ${HEXO_SOURCE_DIR}`);
    process.exit(1);
  }

  // Get all markdown files from the Hexo posts directory
  const files = fs.readdirSync(HEXO_SOURCE_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(HEXO_SOURCE_DIR, file));

  log(`Found ${files.length} Hexo posts to migrate`);

  // Process each file
  const results = files.map(processHexoFile);

  // Generate summary
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  log('\n=== Migration Summary ===');
  log(`Total files processed: ${results.length}`);
  log(`Successfully migrated: ${successful.length}`);
  log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    log('\nFailed files:');
    failed.forEach(f => log(`  - ${f.filename}: ${f.error}`));
  }

  // Generate statistics
  const allCategories = new Set();
  const allTags = new Set();
  const dateRange = { earliest: null, latest: null };

  successful.forEach(result => {
    if (result.categories) {
      result.categories.forEach(cat => allCategories.add(cat));
    }
    if (result.tags) {
      result.tags.forEach(tag => allTags.add(tag));
    }
    if (result.publishDate) {
      if (!dateRange.earliest || result.publishDate < dateRange.earliest) {
        dateRange.earliest = result.publishDate;
      }
      if (!dateRange.latest || result.publishDate > dateRange.latest) {
        dateRange.latest = result.publishDate;
      }
    }
  });

  log('\n=== Content Statistics ===');
  log(`Categories found: ${allCategories.size}`);
  if (allCategories.size > 0) {
    log(`  Categories: ${Array.from(allCategories).join(', ')}`);
  }

  log(`Tags found: ${allTags.size}`);
  if (allTags.size > 0) {
    log(`  Tags: ${Array.from(allTags).join(', ')}`);
  }

  if (dateRange.earliest && dateRange.latest) {
    log(`Date range: ${dateRange.earliest.toISOString().split('T')[0]} to ${dateRange.latest.toISOString().split('T')[0]}`);
  }

  log('\nMigration completed!');
  log(`Log file: ${LOG_FILE}`);

  return {
    total: results.length,
    successful: successful.length,
    failed: failed.length,
    categories: Array.from(allCategories),
    tags: Array.from(allTags)
  };
}

// Run the migration if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateHexoContent();
}

export { migrateHexoContent, parseHexoDate, convertFrontmatter };
