# Codebase Structure

## Directory Structure
```
/
├── src/                    # Main source directory
│   └── components/
│       ├── ui/            # Reusable UI components
│       │   ├── footer.tsx
│       │   ├── footer-enhanced.tsx
│       │   └── mobile-nav.tsx
│       └── sections/      # Page sections
│           ├── hero.tsx
│           ├── testimonials.tsx
│           ├── pricing.tsx
│           ├── features.tsx
│           └── features-compact.tsx
├── app/                   # Next.js App Router pages
├── public/               # Static assets
├── lib/                  # Utility libraries
├── components/           # Legacy/additional components
└── config files          # Various configuration files
```

## TypeScript Configuration
- Path mapping: `@/*` maps to `./src/*`
- All components must be placed in `src/components/` to be accessible via `@/components/`
- Strict TypeScript configuration for better type safety

## Component Organization
- **UI Components**: Reusable, generic components (footer, navigation, etc.)
- **Section Components**: Specific page sections (hero, pricing, testimonials, etc.)
- Components use proper TypeScript interfaces and Next.js 15.3+ patterns