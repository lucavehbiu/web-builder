# Coding Style & Conventions

## TypeScript/React Conventions
- **File Extensions**: `.tsx` for React components, `.ts` for utilities
- **Component Naming**: PascalCase for components, kebab-case for files
- **Export Style**: Default exports for components
- **Type Imports**: `import type { Type } from 'module'` for type-only imports

## Component Patterns
### Server Components (Default)
```tsx
// No 'use client' directive
export default function ServerComponent() {
  // ❌ Cannot use: onClick, useState, useEffect
  // ✅ Can use: async/await, server-side data fetching
  return <div>Static content</div>
}
```

### Client Components
```tsx
'use client'  // Must be first line

export default function ClientComponent() {
  // ✅ Can use: onClick, useState, useEffect, etc.
  return <div onClick={handleClick}>Interactive content</div>
}
```

## Tailwind CSS Style Guide
### Class Organization
```tsx
<div className="
  mx-auto max-w-7xl px-6 py-12    // Container & spacing
  lg:px-8                         // Responsive spacing  
  bg-gray-900 text-white          // Colors
  xl:grid xl:grid-cols-3 xl:gap-8 // Layout
">
```

### Responsive Design
- Mobile-first approach
- Use `sm:`, `md:`, `lg:`, `xl:` breakpoints
- Group related responsive classes together

## File Organization
- Components in `src/components/`
- UI components in `src/components/ui/`  
- Page sections in `src/components/sections/`
- Use TypeScript path mapping: `@/components/...`

## Accessibility
- Always include `aria-label` for interactive elements
- Use semantic HTML elements
- Include `role` attributes where appropriate
- Focus states: `focus:outline-hidden focus:ring-2 focus:ring-blue-500`

## ESLint Configuration
- Using ESLint v9 with Next.js config
- Run `npm run lint` before committing
- Follow Next.js conventions for App Router