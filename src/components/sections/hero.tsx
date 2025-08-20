import Link from 'next/link'

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

// Reusable AnimatedIndicator Component  
interface AnimatedIndicatorProps {
  variant?: 'ping' | 'pulse' | 'bounce';
  color?: 'blue' | 'green' | 'red' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function AnimatedIndicator({ 
  variant = 'ping', 
  color = 'blue', 
  size = 'md',
  className = '' 
}: AnimatedIndicatorProps) {
  const sizeClasses = {
    sm: 'h-1 w-1',
    md: 'h-2 w-2',
    lg: 'h-3 w-3'
  }

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      ping: 'bg-blue-400'
    },
    green: {
      bg: 'bg-green-500', 
      ping: 'bg-green-400'
    },
    red: {
      bg: 'bg-red-500',
      ping: 'bg-red-400'
    },
    white: {
      bg: 'bg-white',
      ping: 'bg-white'
    }
  }

  const colorConfig = colorClasses[color]

  return (
    <span className={`relative flex ${sizeClasses[size]} ${className}`}>
      <span 
        className={`animate-${variant} absolute inline-flex h-full w-full rounded-full ${colorConfig.ping} opacity-75`}
      ></span>
      <span 
        className={`relative inline-flex rounded-full ${sizeClasses[size]} ${colorConfig.bg}`}
      ></span>
    </span>
  )
}

// Reusable GradientText Component
interface GradientTextProps {
  children: React.ReactNode;
  gradient?: 'primary' | 'secondary' | 'custom';
  from?: string;
  to?: string;
  className?: string;
}

function GradientText({ 
  children, 
  gradient = 'primary', 
  from,
  to,
  className = '' 
}: GradientTextProps) {
  const gradientClasses = {
    primary: 'from-blue-600 to-purple-600',
    secondary: 'from-purple-600 to-pink-600',
    custom: from && to ? `from-${from} to-${to}` : 'from-blue-600 to-purple-600'
  }

  return (
    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientClasses[gradient]} ${className}`}>
      {children}
    </span>
  )
}

import type { Dictionary } from '@/lib/i18n/types'

export default function Hero({ locale, dictionary }: { locale: string, dictionary: Dictionary }) {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full bg-blue-600/10 px-6 py-2 text-sm font-medium text-blue-300 ring-1 ring-inset ring-blue-600/20">
            <AnimatedIndicator color="blue" size="md" className="mr-2" />
            {locale === 'sq' ? 'Pa Tarifa Fillimi • Pa Kosto të Fshehura' : 'No Setup Fees • No Hidden Costs'}
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block">{dictionary.hero.title.split(' ').slice(0, 2).join(' ')}</span>
            <span className="block">
              <GradientText gradient="custom" from="blue-400" to="purple-400">
                {dictionary.hero.title.split(' ').slice(2).join(' ')}
              </GradientText>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-xl lg:text-2xl max-w-3xl mx-auto">
            {dictionary.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href={`/${locale}/get-started`}
              className="group inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              {dictionary.hero.cta}
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center justify-center rounded-lg border border-gray-600 bg-gray-800/50 px-8 py-4 text-lg font-semibold text-white hover:bg-gray-700/50 hover:border-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-all duration-200 backdrop-blur-sm"
            >
              {dictionary.hero.secondaryCta}
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-4">
              {locale === 'sq' ? 'Besuar nga 500+ biznese të vogla' : 'Trusted by 500+ small businesses'}
            </p>
            <div className="flex items-center space-x-2">
              {/* Star rating */}
              <StarRating rating={5} size="md" />
              <span className="text-sm text-gray-300 ml-2">
                {locale === 'sq' ? '4.9/5 nga 200+ vlerësime' : '4.9/5 from 200+ reviews'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}