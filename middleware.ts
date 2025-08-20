import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of supported locales
export const locales = ['en', 'sq'] // English and Albanian (sq = shqip)
export const defaultLocale = 'en'

// Cache to store IP to country mappings to avoid repeated API calls
const ipCountryCache = new Map<string, string>()

async function getCountryFromIP(ip: string): Promise<string | null> {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return null // Skip local/private IPs
  }

  // Check cache first
  if (ipCountryCache.has(ip)) {
    return ipCountryCache.get(ip) || null
  }

  try {
    // Using ipapi.co - free service with 1000 requests/day
    const response = await fetch(`https://ipapi.co/${ip}/country_code/`, {
      headers: {
        'User-Agent': 'WebBuilder/1.0'
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(3000)
    })

    if (response.ok) {
      const countryCode = await response.text()
      const cleanCountryCode = countryCode.trim().toUpperCase()
      
      // Cache the result
      ipCountryCache.set(ip, cleanCountryCode)
      
      return cleanCountryCode
    }
  } catch (error) {
    console.warn('IP geolocation failed:', error)
  }

  return null
}

async function getLocaleFromIp(ip: string | null): Promise<string> {
  if (!ip) return defaultLocale
  
  try {
    const countryCode = await getCountryFromIP(ip)
    
    // Check if it's Albania
    if (countryCode === 'AL') {
      return 'sq'
    }
    
    // You can add more country mappings here
    // For example:
    // if (countryCode === 'XK') return 'sq' // Kosovo (also uses Albanian)
    // if (countryCode === 'MK') return 'sq' // North Macedonia (Albanian minority)
    
  } catch (error) {
    console.warn('Error detecting locale from IP:', error)
  }
  
  return defaultLocale
}

function getLocale(request: NextRequest): Promise<string> {
  // Check if user has a saved preference in cookies
  const cookieLocale = request.cookies.get('locale')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return Promise.resolve(cookieLocale)
  }
  
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const detectedLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().substring(0, 2))
      .find(lang => locales.includes(lang))
    if (detectedLocale) {
      return Promise.resolve(detectedLocale)
    }
  }
  
  // Get IP address
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwardedFor?.split(',')[0] || realIp || null
  
  // Detect locale from IP
  return getLocaleFromIp(ip)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if there's already a locale in the pathname
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) {
    // Extract the locale from the pathname
    const locale = pathname.split('/')[1]
    
    // Set cookie to remember user's locale preference
    const response = NextResponse.next()
    response.cookies.set('locale', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    return response
  }
  
  // Redirect if there's no locale
  const locale = await getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  
  const response = NextResponse.redirect(request.nextUrl)
  response.cookies.set('locale', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|fonts|images).*)',
  ],
}