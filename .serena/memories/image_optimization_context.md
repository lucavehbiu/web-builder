# Image Optimization Context

## Current Image Setup
- **Next.js Image Optimization**: Disabled (`images.unoptimized: true`)
- **Reason**: Static export doesn't support Next.js Image optimization
- **Current Images**: Using `<img>` tags with external URLs

## Image Sources
- **External Hosting**: Google Storage (`storage.googleapis.com/web-builder-luca/`)
- **Files**: 
  - Profile photo: `profile.webp`
  - Portfolio screenshots: `odashop.webp`, `mosaic.webp`, `kallmibukur.webp`, `playpals.webp`, `cocomoco.webp`, `reelmetrics.webp`

## Current Issues
1. No size hints - potential layout shift
2. Basic lazy loading only (`loading="lazy"`)
3. No error handling for failed loads
4. No responsive image serving
5. No progressive loading or placeholders
6. No WebP format optimization verification

## Optimization Requirements for Static Hosting
- Custom image component to replace `<img>` tags
- Intersection Observer for advanced lazy loading
- Size hints to prevent layout shift
- Error handling and fallbacks
- Loading states and placeholders
- Responsive image serving
- Performance optimizations (decoding, fetchpriority)

## Performance Goals
- Reduce layout shift (CLS)
- Improve loading performance
- Better user experience with loading states
- Mobile-optimized image delivery
- Accessibility improvements