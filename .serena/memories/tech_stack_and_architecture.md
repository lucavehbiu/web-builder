# Tech Stack & Architecture

## Core Technologies
- **Next.js**: 15.3.4 with App Router
- **TypeScript**: Full TypeScript support
- **Tailwind CSS**: Version 4.x with modern CSS features
- **React**: 18.x

## Configuration
- **Static Export**: `output: 'export'` in next.config.ts
- **Image Optimization**: Disabled (`images.unoptimized: true`)
- **TypeScript Paths**: `@/*` maps to `./src/*`
- **Trailing Slash**: Enabled for static hosting compatibility

## Project Structure
```
/
├── app/                    # Next.js App Router pages
│   ├── about/page.tsx     # About page
│   ├── portfolio/page.tsx # Portfolio showcase
│   ├── services/page.tsx  # Services description
│   └── get-started/page.tsx # Contact form
├── src/
│   └── components/        # Reusable components
│       ├── ui/           # UI components (footer, nav)
│       └── sections/     # Page sections (hero, features)
├── public/               # Static assets
└── [config files]       # TypeScript, ESLint, Tailwind configs
```

## Deployment
- **Target**: Static hosting (Cloudflare)
- **Build Output**: Static HTML/CSS/JS files
- **Images**: External hosting (Google Storage)