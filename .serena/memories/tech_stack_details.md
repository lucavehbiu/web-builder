# Tech Stack Details

## Next.js 15.3.4
- **App Router**: Uses the new app directory structure
- **Server Components**: Default behavior - components are server-side unless marked with 'use client'
- **Client Components**: Require 'use client' directive for interactivity
- **Turbopack**: Enabled for faster development builds (`--turbopack` flag)
- **Trailing Slash**: Configured to prevent hydration errors

## React 19.0.0
- Latest React version with Server Components support
- Default behavior is Server Component (no interactivity)
- Client Components needed for event handlers, hooks, browser APIs

## Tailwind CSS v4
- **Breaking Changes**: Many utility classes renamed (shadow-sm → shadow-xs, etc.)
- **Single Import**: Uses `@import "tailwindcss"` instead of multiple @tailwind directives
- **Modern Features**: CSS variables, container queries, color opacity with slash notation

## TypeScript
- Full TypeScript support throughout the project
- Path mapping configured (@/* → ./src/*)
- Strict type checking enabled
- Next.js built-in TypeScript support