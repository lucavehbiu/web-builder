# Tailwind CSS v4 Migration Notes

## Critical Class Updates Required
This project is using Tailwind CSS v4, which has breaking changes from v3:

### Class Renames (v3 → v4)
| v3 Class | v4 Class | Usage |
|----------|----------|-------|
| `shadow-sm` | `shadow-xs` | Small shadows |
| `shadow` | `shadow-sm` | Default shadows |
| `rounded-sm` | `rounded-xs` | Small border radius |
| `rounded` | `rounded-sm` | Default border radius |
| `outline-none` | `outline-hidden` | Hide outline |
| `blur-sm` | `blur-xs` | Small blur |
| `blur` | `blur-sm` | Default blur |
| `ring` | `ring-3` | Focus rings (default width changed) |

### Focus States
- `focus-visible:outline` → `focus-visible:outline-2`
- Remove invalid classes like `hover:shadow-3xl` (doesn't exist in v4)

### CSS Import
- Uses single `@import "tailwindcss";` instead of multiple @tailwind directives
- Located in `app/globals.css`

### Modern Features
- Color opacity: `bg-white/5` (5% opacity)
- CSS variables: `bg-\(--brand-color\)` (parentheses instead of brackets)
- Container queries: `@container`, `@sm:grid-cols-3`

## Files That Need Updating
Based on the mission, these files contain v3 classes that need updating:
- app/page.tsx
- app/get-started/page.tsx  
- app/services/page.tsx
- app/about/page.tsx
- app/portfolio/page.tsx
- src/components/sections/hero.tsx
- src/components/sections/features-compact.tsx
- src/components/sections/pricing.tsx
- src/components/ui/footer.tsx
- src/components/ui/footer-enhanced.tsx