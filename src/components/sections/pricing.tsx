// Removed unused StarRating component
/*
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
*/

// Removed unused AnimatedIndicator component
/*  
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
*/

// Removed unused GradientText component
/*
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
*/

import type { Dictionary } from '@/lib/i18n/types'

export default function Pricing({ locale, dictionary }: { locale: string, dictionary: Dictionary }) {
  const currency = '€'
  const price = '49.9'
  
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {dictionary.pricing.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
            {dictionary.pricing.subtitle}
          </p>
        </div>

        {/* Pricing Card */}
        <div className="mx-auto mt-16 max-w-2xl lg:mt-24">
          <div className="relative rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200 sm:p-10">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2 text-sm font-semibold text-white shadow-md">
                {dictionary.pricing.mostPopular}
              </span>
            </div>

            {/* Pricing Header */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">
                {locale === 'sq' ? 'Gjithçka që ju Nevojitet' : 'Everything You Need'}
              </h3>
              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    {currency}39.9
                  </span>
                  <span className="text-3xl font-bold text-gray-400 line-through">
                    {currency}{price}
                  </span>
                  <span className="text-base font-semibold leading-7 text-gray-600">
                    /{locale === 'sq' ? 'muaj' : 'month'}
                  </span>
                </div>
                <div className="mt-2 flex justify-center">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 text-xs font-medium text-white">
                    {locale === 'sq' ? '20% ZBRITJE - 3 MUAJT E PARË' : '20% OFF - FIRST 3 MONTHS'}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-base text-gray-600">
                {locale === 'sq' 
                  ? 'Anulo në çdo kohë. Pa kontratë afatgjatë.'
                  : 'Cancel anytime. No long-term contract.'}
              </p>
            </div>

            {/* Features List */}
            <div className="mt-10">
              <ul role="list" className="space-y-4 text-base leading-7 text-gray-600">
                {[
                  locale === 'sq' ? 'Dizajn profesional i personalizuar' : 'Professional custom design',
                  locale === 'sq' ? 'Hosting dhe domain të përfshirë' : 'Hosting and domain included',
                  locale === 'sq' ? 'Certifikatë SSL për siguri' : 'SSL certificate for security',
                  locale === 'sq' ? 'Optimizim për motorët e kërkimit (SEO)' : 'Search engine optimization (SEO)',
                  locale === 'sq' ? 'Dizajn plotësisht responsiv' : 'Fully responsive design',
                  locale === 'sq' ? 'Përditësime mujore të përmbajtjes' : 'Monthly content updates',
                  locale === 'sq' ? 'Mbështetje direkte nga zhvilluesi' : 'Direct developer support',
                  locale === 'sq' ? '99.9% garanci funksionimi' : '99.9% uptime guarantee',
                  locale === 'sq' ? 'Backup automatik ditor' : 'Automatic daily backups',
                  locale === 'sq' ? 'Email biznesi të përfshirë' : 'Business email included'
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg 
                      className="h-6 w-6 flex-shrink-0 text-green-500 mr-3" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <a
                href={`/${locale}/get-started`}
                className="group relative overflow-hidden block w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-center text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">
                  {dictionary.pricing.getStarted}
                </span>
              </a>
            </div>

            {/* Additional Info */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  {locale === 'sq'
                    ? '✓ Pa tarifa fillimi  ✓ Pa kosto të fshehura  ✓ Anulo në çdo kohë'
                    : '✓ No setup fees  ✓ No hidden costs  ✓ Cancel anytime'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}