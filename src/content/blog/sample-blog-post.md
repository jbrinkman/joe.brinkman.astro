---
title: "Sample Blog Post for Testing"
description: "This is a sample blog post to test the content collections configuration"
date: 2024-01-15
publishDate: 2024-01-15T10:00:00Z
categories: ["Technology", "Web Development"]
tags: ["astro", "blog", "migration", "hexo"]
draft: false
published: true
author: "Joe Brinkman"
image: "/images/sample-post.jpg"
excerpt: "A sample blog post to validate our content collections schema works correctly with Hexo-compatible frontmatter."
---

# Sample Blog Post

This is a sample blog post created to test the content collections configuration. It includes all the necessary frontmatter fields that would be present in a typical Hexo blog post.

## Features Tested

- **Categories**: Multiple categories as an array
- **Tags**: Multiple tags as an array  
- **Dates**: Both Hexo (`date`) and Astro (`publishDate`) date formats
- **Status**: Both `draft` and `published` boolean fields
- **Metadata**: Title, description, excerpt, author, and image fields

## Content

This post validates that our schema correctly handles:

1. Hexo-style frontmatter fields
2. Array-based categories and tags
3. Multiple date field formats
4. Boolean status fields
5. Optional metadata fields

The content collections should now be able to process both the existing AstroWind posts in `src/data/post` and new blog posts in `src/content/blog` with full Hexo compatibility.
