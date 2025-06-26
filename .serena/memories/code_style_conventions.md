# Code Style and Conventions

## TypeScript/React Patterns
- **Function Components**: Use function declarations, not arrow functions for exports
- **Props Interfaces**: Define interfaces for all component props
- **Server vs Client**: Default to Server Components, add 'use client' only when needed
- **Imports**: Use TypeScript path mapping (@/components/ui/footer)

## File Naming
- **Component Files**: kebab-case (e.g., `mobile-nav.tsx`, `footer-enhanced.tsx`)
- **Component Names**: PascalCase (e.g., `MobileNav`, `FooterEnhanced`)
- **Interface Names**: Component name + "Props" (e.g., `MobileNavProps`)

## Component Structure
```tsx
// Server Component (default)
export default function ComponentName() {
  return <div>...</div>
}

// Client Component (when interactivity needed)
'use client'
export default function InteractiveComponent() {
  const [state, setState] = useState()
  return <div onClick={() => {}}>...</div>
}
```

## Tailwind CSS Conventions
- Use Tailwind v4 utility classes (shadow-xs, not shadow-sm)
- Group related classes: container/spacing, colors, layout
- Mobile-first responsive design
- Use semantic color names where possible

## Accessibility
- Include proper ARIA labels
- Use semantic HTML elements
- Ensure keyboard navigation support
- Screen reader friendly patterns