# Task Completion Checklist

## When a Task is Completed

### 1. Code Quality Checks
- [ ] Run `npm run lint` to check for linting errors
- [ ] Fix any ESLint warnings or errors
- [ ] Ensure TypeScript types are correct (`npx tsc --noEmit`)
- [ ] Verify responsive design on different screen sizes

### 2. Testing
- [ ] Run `npm run dev` to test in development
- [ ] Test all interactive features
- [ ] Verify mobile navigation works
- [ ] Check accessibility features

### 3. Build Verification
- [ ] Run `npm run build` to ensure static export builds successfully
- [ ] Check that no build errors occur
- [ ] Verify that all pages render correctly in static export

### 4. File Organization
- [ ] Ensure new components are in correct directories:
  - `src/components/ui/` for reusable UI components
  - `src/components/sections/` for page sections
- [ ] Follow TypeScript path mapping (`@/` imports)
- [ ] Use proper file naming conventions

### 5. Performance Considerations
- [ ] Optimize images if added
- [ ] Check bundle size impact
- [ ] Ensure lazy loading where appropriate
- [ ] Verify static export compatibility

### 6. Documentation
- [ ] Update code comments if complex logic added
- [ ] Ensure prop interfaces are documented
- [ ] Update README.md if major changes made

### 7. Version Control
- [ ] Stage appropriate files with `git add`
- [ ] Write descriptive commit message
- [ ] Push changes to repository

## Special Considerations for Static Export
- No server-side functionality
- All images must be optimized manually or use external hosting
- No dynamic API routes
- All pages must be statically renderable