# Suggested Commands

## Development Commands
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server (for testing)
npm start

# Run ESLint
npm run lint
```

## System Commands (macOS/Darwin)
```bash
# File operations
ls -la                    # List files with details
find . -name "*.tsx"      # Find TypeScript React files
grep -r "pattern" src/    # Search in source files

# Git operations
git status               # Check repository status
git add .               # Stage all changes
git commit -m "message" # Commit changes
git push origin main    # Push to main branch

# Package management
npm install             # Install dependencies
npm update             # Update packages
npm audit              # Check for vulnerabilities
```

## Project-Specific Commands
```bash
# Component creation (follow src/components structure)
# Create in src/components/ui/ for reusable UI components
# Create in src/components/sections/ for page sections

# TypeScript checking
npx tsc --noEmit       # Type check without compilation

# Static analysis
npm run lint -- --fix  # Auto-fix linting issues
```

## Deployment Commands
```bash
# Build static export
npm run build          # Generates static files in out/

# Preview static build locally
npx serve out/         # Serve static files locally
```