# Tech Stack and Dependencies

## Core Dependencies
- **React**: ^19.0.0
- **React DOM**: ^19.0.0  
- **Next.js**: 15.3.4

## Development Dependencies
- **TypeScript**: ^5
- **@types/node**: ^20
- **@types/react**: ^19
- **@types/react-dom**: ^19
- **Tailwind CSS**: ^4 (with @tailwindcss/postcss)
- **ESLint**: ^9 with eslint-config-next 15.3.4
- **@eslint/eslintrc**: ^3

## Configuration Files
- **tsconfig.json**: Strict TypeScript with path mapping (@/* → ./src/*)
- **next.config.ts**: Static export with unoptimized images and trailing slash
- **eslint.config.mjs**: Next.js configs with accessibility rules
- **postcss.config.mjs**: PostCSS configuration for Tailwind
- **globals.css**: Tailwind v4 import with custom CSS properties

## Key TypeScript Settings
- Target: ES2020
- Strict mode enabled
- Path mapping: @/* → ./src/*
- noUnusedLocals and noUnusedParameters enabled
- Next.js plugin integration