# Developer Guide

## Project Architecture

This project is built with Astro 5.0 and uses the AstroWind template as its foundation. The architecture follows modern web development practices with:

- **Astro**: Static site generator with component islands
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript development
- **MDX**: Enhanced markdown with component support

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

Blog posts are stored in `src/content/post/` as Markdown or MDX files. The content collection is configured in `src/content/config.ts`.

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
