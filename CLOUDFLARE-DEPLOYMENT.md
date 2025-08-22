# 🚀 Cloudflare Pages Deployment Guide for Next.js 15

This guide documents the complete process for deploying a Next.js 15 application to Cloudflare Pages with Edge Runtime compatibility.

## 📋 Prerequisites

- Next.js 15+ application
- Cloudflare account
- GitHub repository connected to Cloudflare Pages

## 🔧 Step 1: Install Required Dependencies

```bash
npm install --save-dev @cloudflare/next-on-pages
```

## 📝 Step 2: Update package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "pages:build": "npx @cloudflare/next-on-pages",
    "preview": "npm run pages:build && wrangler pages dev",
    "deploy": "npm run pages:build && wrangler pages deploy"
  }
}
```

## ⚡ Step 3: Configure Edge Runtime

### Critical Requirements for Cloudflare Pages:

1. **Add Edge Runtime to ALL Server Components**

Every page route MUST export the edge runtime:

```typescript
// app/[locale]/page.tsx
export const runtime = 'edge'
```

2. **Add Edge Runtime to Layout**

```typescript
// app/[locale]/layout.tsx
export const runtime = 'edge'
```

3. **Create Custom Not-Found Page**

Prevent Next.js from auto-generating Node.js functions:

```typescript
// app/[locale]/not-found.tsx
export const runtime = 'edge'

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  )
}
```

4. **Remove or Handle generateStaticParams**

You CANNOT use both `generateStaticParams` and `export const runtime = 'edge'` in the same file. Remove `generateStaticParams` from pages with edge runtime.

5. **Convert Client Components Properly**

For pages that need interactivity, split into server + client components:

```typescript
// app/[locale]/interactive/page.tsx (Server Component)
import ClientForm from '@/components/ClientForm'

export const runtime = 'edge'

export default async function Page() {
  const data = await getData()
  return <ClientForm data={data} />
}
```

```typescript
// components/ClientForm.tsx (Client Component)
'use client'

export default function ClientForm({ data }) {
  // Interactive logic here
}
```

## 🔄 Step 4: Convert API Routes to Edge Runtime

All API routes must be Edge-compatible:

```typescript
// app/api/example/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  return NextResponse.json({ message: 'Hello from Edge!' })
}
```

### Important API Conversions:

- Replace Node.js libraries with Edge-compatible alternatives
- Use `fetch()` instead of Node.js HTTP libraries
- No file system access - use external storage (Supabase, R2, etc.)

## 🛠️ Step 5: Update Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true, // Prevents hydration errors
  // Remove any Node.js specific configurations
}

module.exports = nextConfig
```

## ☁️ Step 6: Cloudflare Pages Configuration

### In Cloudflare Pages Dashboard:

1. **Build Settings:**
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `/` (or leave empty)

2. **Environment Variables:**
   ```
   NODE_VERSION=18
   # Add your app-specific env vars:
   NEXT_PUBLIC_API_URL=your-api-url
   DATABASE_URL=your-database-url
   # etc...
   ```

3. **Compatibility Flags** (if available):
   - Add: `nodejs_compat`

## 🔍 Step 7: Test Build Locally

```bash
# Test the Cloudflare Pages build
npm run pages:build

# If successful, you'll see:
# ⚡️ Build Summary (@cloudflare/next-on-pages)
# ⚡️ Edge Function Routes (X)
# ⚡️ Prerendered Routes (Y)
```

## ❌ Common Errors & Solutions

### Error: "Routes were not configured to run with the Edge Runtime"

**Solution**: Add `export const runtime = 'edge'` to the failing routes.

### Error: "Page cannot use both runtime='edge' and generateStaticParams"

**Solution**: Remove `generateStaticParams` from pages with edge runtime.

### Error: "Invalid segment configuration: experimental-edge"

**Solution**: Use `'edge'` not `'experimental-edge'` in Next.js 15+.

### Error: "Build output directory not found"

**Solution**: Set build output to `.vercel/output/static` in Cloudflare Pages.

### CSS/Styles Not Loading

**Solution**: Ensure build output directory is set correctly to `.vercel/output/static`.

## 📊 Limitations with Cloudflare Pages

When using Edge Runtime, these Next.js features are NOT available:

- ❌ Node.js APIs (fs, path, crypto, etc.)
- ❌ generateStaticParams with edge runtime
- ❌ ISR (Incremental Static Regeneration)
- ❌ Image Optimization (use Cloudflare Images instead)
- ❌ Middleware with Node.js runtime

## ✅ What Works

- ✅ Server-side rendering (SSR)
- ✅ Client-side rendering (CSR)
- ✅ API Routes (with Edge Runtime)
- ✅ Dynamic routing
- ✅ Internationalization (i18n)
- ✅ Environment variables
- ✅ External databases (Supabase, Planetscale, etc.)

## 🎯 Complete Checklist

Before deploying to Cloudflare Pages:

- [ ] All page routes have `export const runtime = 'edge'`
- [ ] Layout file has `export const runtime = 'edge'`
- [ ] Custom not-found.tsx created with edge runtime
- [ ] API routes converted to Edge Runtime
- [ ] Removed generateStaticParams or moved to non-edge pages
- [ ] No Node.js dependencies in edge runtime pages
- [ ] Environment variables set in Cloudflare Pages
- [ ] Build output directory set to `.vercel/output/static`
- [ ] Test build locally with `npm run pages:build`

## 📚 Additional Resources

- [Cloudflare Pages Next.js Guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [@cloudflare/next-on-pages GitHub](https://github.com/cloudflare/next-on-pages)
- [Next.js Edge Runtime Docs](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)

## 💡 Pro Tips

1. **Use Cloudflare services** for better integration:
   - R2 for file storage (instead of AWS S3)
   - D1 for SQL database
   - KV for key-value storage
   - Durable Objects for real-time features

2. **Monitor Performance**: Use Cloudflare Analytics to track Core Web Vitals

3. **Cache Strategy**: Leverage Cloudflare's CDN for static assets

4. **Preview Deployments**: Cloudflare Pages creates preview URLs for each PR

---

## 🎉 Success Example

This website (lucavehbiu.com) successfully runs on Cloudflare Pages with:
- Next.js 15.3.4
- Full Edge Runtime compatibility
- Mailjet email integration
- Supabase database
- Multi-language support (i18n)
- Contact form with lead management

**Deployment Time**: ~1 minute
**Global Performance**: <100ms TTFB worldwide

---

*Last Updated: January 2025*
*Tested with: Next.js 15.3.4, @cloudflare/next-on-pages 1.13.14*