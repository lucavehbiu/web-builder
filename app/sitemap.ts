import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lucavehbiu.com'
  const lastModified = new Date('2024-12-23')

  // Define all routes for both languages
  const routes = [
    '',
    '/about',
    '/services', 
    '/portfolio',
    '/get-started'
  ]

  const locales = ['en', 'sq']
  
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Generate entries for each route in each locale
  routes.forEach(route => {
    locales.forEach(locale => {
      const url = `${baseUrl}/${locale}${route}/`
      
      // Set priority based on route importance
      let priority = 0.8
      if (route === '') priority = 1.0 // Homepage
      if (route === '/services' || route === '/get-started') priority = 0.9
      
      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority,
      })
    })
  })

  return sitemapEntries
}