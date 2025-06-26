# Code Style & Conventions

## File Naming
- **Components**: PascalCase (e.g., `MobileNav.tsx`)
- **Pages**: lowercase with dashes (e.g., `get-started/page.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)

## Component Structure
```tsx
// Import order: React, Next.js, third-party, local
import React from 'react'
import Link from 'next/link'
import { SomeLibrary } from 'third-party'
import { LocalComponent } from '@/components/ui/local'

// Props interface if needed
interface ComponentProps {
  title: string
  className?: string
}

// Export default function component
export default function ComponentName({ title, className }: ComponentProps) {
  return (
    <div className={className}>
      {title}
    </div>
  )
}
```

## TypeScript
- **Strict mode**: Enabled
- **Path mapping**: Use `@/` for src directory imports
- **Type definitions**: Explicit interfaces for props
- **No any types**: Prefer specific types

## Tailwind CSS
- **Version 4**: Modern syntax with single @import
- **Responsive**: Mobile-first approach
- **Utility classes**: Prefer utilities over custom CSS
- **Class organization**: Group by purpose (layout, colors, spacing)

## React Patterns
- **Server Components**: Default (no 'use client')
- **Client Components**: Add 'use client' only when needed for interactivity
- **Hooks**: Follow rules of hooks (enforced by ESLint)
- **Props**: Destructure in function parameters

## ESLint Rules
- React hooks rules enforced
- Accessibility rules enabled
- TypeScript-specific rules
- Next.js best practices
- Custom rule: img elements allowed (due to static export)