import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n/types'

// Reusable StarRating Component
interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  text?: string;
  className?: string;
}

function StarRating({ 
  rating = 5, 
  size = 'md', 
  showText = false, 
  text,
  className = '' 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5', 
    lg: 'h-6 w-6'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex" role="img" aria-label={`${rating} out of 5 stars`}>
        <span className="sr-only">{rating} out of 5 stars</span>
        {[...Array(5)].map((_, i) => (
          <svg 
            key={`star-${i}`} 
            className={`${sizeClasses[size]} ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {showText && text && (
        <span className={`ml-2 ${textSizeClasses[size]} text-gray-300`}>
          {text}
        </span>
      )}
    </div>
  )
}

export default function Hero({ locale, dictionary }: { locale: string, dictionary: Dictionary }) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-5xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full bg-emerald-500/10 px-6 py-2 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20 backdrop-blur-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-ping"></div>
            {dictionary.hero.badge}
          </div>

          {/* Main Headline - Staggered Layout */}
          <div className="mb-8">
            <div className="relative">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-4">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
                  {dictionary.hero.title.split(' ').slice(0, 2).join(' ')}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 relative">
                  {dictionary.hero.title.split(' ').slice(2).join(' ')}
                  {/* Underline decoration */}
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                </span>
              </h1>
            </div>
          </div>

          {/* Simplified single subtitle */}
          <div className="mb-12">
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-3xl">
              {dictionary.hero.subtitle}
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-16">
            <Link
              href={`/${locale}/get-started`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                {dictionary.hero.cta}
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            <Link
              href={`/${locale}/portfolio`}
              className="group flex items-center text-lg font-semibold text-gray-300 hover:text-white transition-colors"
            >
              <div className="w-12 h-12 rounded-full border-2 border-gray-600 group-hover:border-white flex items-center justify-center mr-3 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {dictionary.hero.secondaryCta}
            </Link>
          </div>

          {/* Simplified Social Proof */}
          <div className="flex flex-wrap items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center">
              <StarRating rating={5} size="sm" />
              <span className="text-yellow-400 font-bold ml-2">4.9/5</span>
              <span className="ml-2">{locale === 'sq' ? '(200+ klientë)' : '(200+ clients)'}</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
              <span>{locale === 'sq' ? 'Aktiv tani' : 'Online now'}</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
              <span>{locale === 'sq' ? '3 faqe këtë javë' : '3 sites this week'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave - more modern */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 C240,100 480,80 720,90 C960,100 1200,110 1440,90 L1440,120 Z"/>
        </svg>
      </div>
    </section>
  )
}