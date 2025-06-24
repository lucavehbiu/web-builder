# Working with Tailwind CSS v4 & Next.js 15.3.4 - Learning Notes

*Documentation of key insights, patterns, and solutions discovered while building components*

## 🎯 Project Structure & Configuration

### TypeScript Path Mapping
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // Maps @/ to src directory
    }
  }
}
```

**Key Learning**: Always check `tsconfig.json` for path mapping before creating components. If `@/*` points to `./src/*`, components must be in `src/components/`, not root `components/`.

### Next.js 15.3.4 Configuration
```typescript
// next.config.ts (TypeScript support built-in)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true, // Prevents hydration errors with URL mismatches
};

export default nextConfig;
```

## 🎨 Tailwind CSS v4 Key Changes

### Utility Class Renames
| v3 | v4 | Usage |
|---|---|---|
| `shadow-sm` | `shadow-xs` | Small shadows |
| `shadow` | `shadow-sm` | Default shadows |
| `blur-sm` | `blur-xs` | Small blur |
| `blur` | `blur-sm` | Default blur |
| `rounded-sm` | `rounded-xs` | Small border radius |
| `rounded` | `rounded-sm` | Default border radius |
| `outline-none` | `outline-hidden` | Hide outline |
| `ring` | `ring-3` | Focus rings (default width changed) |

### CSS Import Syntax
```css
/* v4 - Single import replaces all @tailwind directives */
@import "tailwindcss";
```

### Modern CSS Features in v4
```css
/* Color opacity with slash notation */
.bg-white\/5  /* bg-white with 5% opacity */

/* CSS variables in arbitrary values */
.bg-\(--brand-color\)  /* Note: parentheses instead of brackets */

/* Container queries (native support) */
.@container
.@sm:grid-cols-3
```

## ⚛️ Next.js 15.3.4 Component Patterns

### Server vs Client Components

**Default**: All components are **Server Components** (no interactivity)
```tsx
// Server Component (default)
export default function Footer() {
  // ❌ Cannot use: onClick, onSubmit, useState, useEffect
  // ✅ Can use: async/await, server-side data fetching
  return <footer>...</footer>
}
```

**Client Components**: Need `'use client'` directive for interactivity
```tsx
'use client'  // Must be first line

export default function InteractiveFooter() {
  // ✅ Can use: onClick, onSubmit, useState, useEffect, etc.

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Interactive elements */}
    </form>
  )
}
```

### When to Use Client Components
- Event handlers (`onClick`, `onSubmit`, etc.)
- React hooks (`useState`, `useEffect`, etc.)
- Browser APIs (`localStorage`, `window`, etc.)
- Interactive form elements
- Real-time updates

### Metadata API (Built-in SEO)
```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your App Title',
  description: 'App description',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    url: 'https://yoursite.com',
    siteName: 'Your Site',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourusername',
  },
}
```

## 🐛 Common Issues & Solutions

### 1. Module Not Found Error
```
Module not found: Can't resolve '@/components/ui/footer'
```

**Solution**: Check TypeScript path mapping and ensure files are in correct directory structure.

### 2. Hydration Errors
```
Hydration failed because the server rendered HTML didn't match the client
```

**Causes & Solutions**:
- **URL trailing slash mismatch**: Add `trailingSlash: true` to `next.config.ts`
- **Dynamic content**: Use consistent data between server and client
- **Browser extensions**: Can interfere with HTML before React loads

### 3. Event Handler Errors
```
Error: Event handlers cannot be passed to Client Component props
```

**Solution**: Add `'use client'` directive to component that needs interactivity.

### 4. Invalid Element Type
```
Element type is invalid: expected a string or class/function but got: object
```

**Common Causes**:
- Wrong import syntax (named vs default import)
- Component not exported properly
- Circular import dependencies

## 🎯 Best Practices Learned

### Component Organization
```
src/
  components/
    ui/              # Reusable UI components
      footer.tsx     # Basic version
      footer-enhanced.tsx  # Feature-rich version
    sections/        # Page sections
    forms/           # Form components
```

### Responsive Design Patterns
```tsx
// Mobile-first responsive design
<div className="
  grid grid-cols-1           // Mobile: 1 column
  md:grid-cols-2            // Tablet: 2 columns
  xl:grid-cols-3            // Desktop: 3 columns
  gap-4 md:gap-6 xl:gap-8   // Responsive gaps
">
```

### Accessibility Implementation
```tsx
<footer role="contentinfo">
  <ul role="list">
    <li>
      <Link
        href="/contact"
        className="focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Contact us"
      >
        Contact
      </Link>
    </li>
  </ul>
</footer>
```

### Form Handling in Client Components
```tsx
'use client'

export default function NewsletterForm() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Handle submission
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" className="sr-only">Email</label>
      <input
        type="email"
        id="email"
        required
        autoComplete="email"
        className="..."
      />
      <button type="submit">Subscribe</button>
    </form>
  )
}
```

## 🚀 Performance Optimizations

### Component Splitting Strategy
- **Server Components**: For static content, data fetching
- **Client Components**: Only when interactivity is needed
- **Hybrid Approach**: Server Component wrapper with Client Component islands

### CSS Class Organization
```tsx
// Group related classes for readability
<div className="
  mx-auto max-w-7xl px-6 py-12    // Container & spacing
  lg:px-8                         // Responsive spacing
  bg-gray-900 text-white          // Colors
  xl:grid xl:grid-cols-3 xl:gap-8 // Layout
">
```

## 📝 Key Takeaways

1. **Always check project structure** before creating components
2. **Use `'use client'` sparingly** - only when interactivity is needed
3. **Tailwind v4 has breaking changes** - check utility class renames
4. **Next.js 15.3.4 hydration** can be tricky - ensure server/client consistency
5. **TypeScript path mapping** must match your file structure
6. **Metadata API** provides excellent built-in SEO support
7. **Responsive design** should be mobile-first with Tailwind utilities

## 🔧 Debugging Checklist

When encountering issues:
- [ ] Check `tsconfig.json` path mapping
- [ ] Verify component export/import syntax
- [ ] Ensure `'use client'` for interactive components
- [ ] Check Next.js config for hydration settings
- [ ] Verify Tailwind class names (v4 changes)
- [ ] Test both server and client rendering
- [ ] Check browser console for React errors

---

*Last updated: December 2024*
*Next.js Version: 15.3.4*
*Tailwind CSS Version: 4.x*