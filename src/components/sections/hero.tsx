import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Circle } from 'lucide-react'

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
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Minimal Background - Single Elegant Effect */}
      <div className="absolute inset-0">
        {/* Single refined light source */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-emerald-500/20 via-emerald-500/5 to-transparent rounded-full blur-3xl"></div>
        
        {/* Subtle grid - much more refined */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-36 sm:pb-32 lg:px-8 lg:pt-40 lg:pb-40">
        <div className="mx-auto max-w-5xl">
          {/* Minimal Badge with shadcn */}
          <Badge variant="success" className="mb-12 bg-emerald-500/10 border-emerald-500/20 text-emerald-300">
            <Circle className="w-1.5 h-1.5 fill-emerald-400 text-emerald-400 mr-2" />
            {dictionary.hero.badge}
          </Badge>

          {/* Clean, Confident Headline */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
              <span className="block text-white mb-2">
                {dictionary.hero.title.split(' ').slice(0, 4).join(' ')}
              </span>
              <span className="block text-emerald-400 font-semibold">
                {dictionary.hero.title.split(' ').slice(4).join(' ')}
              </span>
            </h1>
          </div>

          {/* Refined subtitle */}
          <div className="mb-12">
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl font-light">
              {dictionary.hero.subtitle}
            </p>
          </div>

          {/* Clean CTA Section with shadcn Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-16">
            <Button asChild size="lg">
              <Link href={`/${locale}/get-started`}>
                {dictionary.hero.cta}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="ghost" size="lg" className="text-gray-300 hover:text-white hover:bg-white/10" asChild>
              <Link href={`/${locale}/portfolio`}>
                {dictionary.hero.secondaryCta}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Refined Social Proof */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <StarRating rating={5} size="sm" />
              <span className="text-gray-300 ml-2">4.9/5</span>
              <span className="ml-1">{locale === 'sq' ? '(200+ klientë)' : '(200+ clients)'}</span>
            </div>
            
            <div className="h-4 w-px bg-gray-600"></div>
            
            <div className="flex items-center">
              <Circle className="w-1.5 h-1.5 fill-emerald-400 text-emerald-400 mr-2" />
              <span>{locale === 'sq' ? 'Aktiv tani' : 'Available now'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clean transition */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
    </section>
  )
}