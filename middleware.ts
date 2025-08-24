import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Professional Geolocation Middleware for Albanian Business
 * 
 * Features:
 * - Multi-tier geolocation with Cloudflare headers (primary)
 * - IPinfo.io premium fallback service
 * - Comprehensive Albanian diaspora support (AL, XK, MK, ME, RS)
 * - Smart detection priority: Cookie → Geolocation → Browser → Default
 * - Production-ready with caching and error handling
 */

// List of supported locales
export const locales = ['en', 'sq'] // English and Albanian (sq = shqip)
export const defaultLocale = 'en'

// Cache to store IP to country mappings to avoid repeated API calls
const ipCountryCache = new Map<string, string>()

// Comprehensive country-to-locale mapping for Albanian speakers
// Includes main Albanian-speaking regions and significant diaspora communities
const ALBANIAN_COUNTRIES = new Set([
  'AL', // Albania (primary)
  'XK', // Kosovo (primary Albanian-speaking region)
  'MK', // North Macedonia (significant Albanian minority ~25%)
  'ME', // Montenegro (significant Albanian minority ~5%)
  'RS', // Serbia (Albanian minority in Preševo Valley)
]); // Total coverage: ~7-8 million Albanian speakers globally

// Professional geolocation with multiple fallbacks
async function getCountryFromCloudflare(request: NextRequest): Promise<string | null> {
  // Primary: Use Cloudflare's CF-IPCountry header (fastest & most reliable)
  const cfCountry = request.headers.get('CF-IPCountry');
  if (cfCountry && cfCountry !== 'XX' && cfCountry !== 'T1') {
    console.log(`🚀 Cloudflare geolocation: ${cfCountry}`);
    return cfCountry.toUpperCase();
  }
  return null;
}

async function getCountryFromIPInfo(ip: string): Promise<string | null> {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return null;
  }

  // Check cache first
  if (ipCountryCache.has(ip)) {
    return ipCountryCache.get(ip) || null;
  }

  try {
    // Premium fallback: IPinfo.io (most accurate according to 2024 studies)
    const apiToken = process.env.IPINFO_API_TOKEN;
    const url = apiToken 
      ? `https://ipinfo.io/${ip}/country?token=${apiToken}`
      : `https://ipinfo.io/${ip}/country`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'LucaWebBuilder/2.0',
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(2000) // Faster timeout
    });

    if (response.ok) {
      const countryCode = await response.text();
      const cleanCountryCode = countryCode.replace(/["\n\r]/g, '').trim().toUpperCase();
      
      if (cleanCountryCode && cleanCountryCode.length === 2) {
        ipCountryCache.set(ip, cleanCountryCode);
        console.log(`📍 IPinfo.io geolocation: ${cleanCountryCode}`);
        return cleanCountryCode;
      }
    }
  } catch (error) {
    console.warn('IPinfo.io geolocation failed:', error);
  }

  return null;
}

async function getCountryFromIPApi(ip: string): Promise<string | null> {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return null;
  }

  try {
    // Tertiary fallback: ipapi.co (free service)
    const response = await fetch(`https://ipapi.co/${ip}/country_code/`, {
      headers: {
        'User-Agent': 'LucaWebBuilder/2.0'
      },
      signal: AbortSignal.timeout(2000)
    });

    if (response.ok) {
      const countryCode = await response.text();
      const cleanCountryCode = countryCode.trim().toUpperCase();
      
      if (cleanCountryCode && cleanCountryCode.length === 2) {
        ipCountryCache.set(ip, cleanCountryCode);
        console.log(`🌐 ipapi.co geolocation: ${cleanCountryCode}`);
        return cleanCountryCode;
      }
    }
  } catch (error) {
    console.warn('ipapi.co geolocation failed:', error);
  }

  return null;
}

// Smart country-to-locale mapping
function getLocaleFromCountry(countryCode: string): string {
  // Albanian-speaking regions (prioritize Albanian)
  if (ALBANIAN_COUNTRIES.has(countryCode)) {
    const countryNames: Record<string, string> = {
      'AL': 'Albania',
      'XK': 'Kosovo', 
      'MK': 'North Macedonia',
      'ME': 'Montenegro',
      'RS': 'Serbia'
    };
    const countryName = countryNames[countryCode] || countryCode;
    console.log(`🇦🇱 Albanian region detected: ${countryName} (${countryCode}) → sq`);
    return 'sq';
  }
  
  // For all other countries, default to English
  console.log(`🇺🇸 Non-Albanian region: ${countryCode} → en`);
  return 'en';
}

async function getLocaleFromGeolocation(request: NextRequest): Promise<string> {
  try {
    console.log('🚀 Starting professional geolocation detection...');
    
    // 1. Try Cloudflare geolocation first (fastest, most reliable)
    const cfCountry = await getCountryFromCloudflare(request);
    if (cfCountry) {
      console.log(`✅ Cloudflare geolocation successful: ${cfCountry}`);
      return getLocaleFromCountry(cfCountry);
    }

    // 2. Get IP for fallback services
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const connectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare's real IP
    const ip = connectingIp || forwardedFor?.split(',')[0] || realIp || null;
    
    console.log(`🔗 IP detection: CF-Connecting=${connectingIp}, X-Forwarded=${forwardedFor}, X-Real=${realIp}, Selected=${ip}`);
    
    if (!ip) {
      console.log('⚠️ No IP available for geolocation fallbacks');
      return defaultLocale;
    }

    // 3. Try IPinfo.io (premium service, most accurate)
    console.log(`🔍 Trying IPinfo.io for IP: ${ip}`);
    const ipinfoCountry = await getCountryFromIPInfo(ip);
    if (ipinfoCountry) {
      console.log(`✅ IPinfo.io geolocation successful: ${ipinfoCountry}`);
      return getLocaleFromCountry(ipinfoCountry);
    }

    // 4. Try ipapi.co as final fallback
    console.log(`🔍 Trying ipapi.co for IP: ${ip}`);
    const ipapiCountry = await getCountryFromIPApi(ip);
    if (ipapiCountry) {
      console.log(`✅ ipapi.co geolocation successful: ${ipapiCountry}`);
      return getLocaleFromCountry(ipapiCountry);
    }
    
    console.log('❌ All geolocation services failed, using default');
    
  } catch (error) {
    console.error('💥 Error in geolocation detection:', error);
  }
  
  return defaultLocale;
}

async function getLocale(request: NextRequest): Promise<string> {
  console.log('🔍 Starting locale detection...');
  
  // Priority 1: User's saved preference in cookies (highest priority)
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    console.log(`🍪 Using cookie preference: ${cookieLocale}`);
    return cookieLocale;
  }
  console.log(`🍪 No valid cookie locale found (value: ${cookieLocale})`);
  
  // Priority 2: Professional geolocation (NEW - prioritized for Albanian business)
  console.log(`🌍 Attempting geolocation detection...`);
  const geoLocale = await getLocaleFromGeolocation(request);
  if (geoLocale !== defaultLocale) {
    console.log(`🌍 Using geolocation result: ${geoLocale}`);
    return geoLocale;
  }
  console.log(`🌍 Geolocation returned default locale: ${geoLocale}`);
  
  // Priority 3: Browser language (fallback)
  const acceptLanguage = request.headers.get('accept-language');
  console.log(`🌐 Browser Accept-Language: ${acceptLanguage}`);
  if (acceptLanguage) {
    const detectedLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().substring(0, 2))
      .find(lang => locales.includes(lang));
    if (detectedLocale) {
      console.log(`🌐 Using browser language: ${detectedLocale}`);
      return detectedLocale;
    }
    console.log(`🌐 No supported language found in browser preferences`);
  }
  
  console.log(`📍 Falling back to default locale: ${defaultLocale}`);
  return defaultLocale;
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