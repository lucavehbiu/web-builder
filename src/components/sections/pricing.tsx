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
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function Pricing({ locale, dictionary }: { locale: string, dictionary: Dictionary }) {
  const currency = '€'
  const price = '49.9'

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Minimal Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl mb-3">
            {dictionary.pricing.title}
          </h2>
          <p className="text-base text-gray-600 font-light">
            {dictionary.pricing.subtitle}
          </p>
        </div>

        {/* Clean Pricing Card with shadcn */}
        <div className="mx-auto mt-12 max-w-2xl lg:mt-16">
          <Card className="relative p-6 sm:p-8">
            {/* Subtle Badge */}
            <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2">
              <Badge variant="default">
                {dictionary.pricing.mostPopular}
              </Badge>
            </div>

            {/* Clean Pricing Header */}
            <div className="text-center">
              <h3 className="text-lg font-normal text-gray-900 mb-4">
                {locale === 'sq' ? 'Gjithçka që ju Nevojitet' : 'Everything You Need'}
              </h3>
              <div className="mt-4">
                <div className="flex items-baseline justify-center gap-x-2">
                  <span className="text-3xl font-medium tracking-tight text-gray-900">
                    {currency}39.9
                  </span>
                  <span className="text-xl font-normal text-gray-400 line-through">
                    {currency}{price}
                  </span>
                  <span className="text-sm font-normal leading-7 text-gray-600">
                    /{locale === 'sq' ? 'muaj' : 'month'}
                  </span>
                </div>
                <div className="mt-2 flex justify-center">
                  <span className="inline-flex items-center rounded-md bg-orange-50 border border-orange-200 px-2.5 py-1 text-xs font-normal text-orange-700">
                    {locale === 'sq' ? '20% ZBRITJE - 3 MUAJT E PARË' : '20% OFF - FIRST 3 MONTHS'}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500 font-light">
                {locale === 'sq'
                  ? 'Anulo në çdo kohë. Pa kontratë afatgjatë.'
                  : 'Cancel anytime. No long-term contract.'}
              </p>
            </div>

            {/* Minimal Features List with shadcn */}
            <CardContent className="mt-6 px-0">
              <ul role="list" className="space-y-3 text-sm leading-6 text-gray-600">
                {[
                  locale === 'sq' ? 'Dizajn profesional i personalizuar' : 'Professional custom design',
                  locale === 'sq' ? 'Hosting dhe domain të përfshirë*' : 'Hosting and domain included*',
                  locale === 'sq' ? 'Certifikatë SSL për siguri' : 'SSL certificate for security',
                  locale === 'sq' ? 'Optimizim për motorët e kërkimit (SEO + AI SEO)' : 'Search engine optimization (SEO + AI SEO)',
                  locale === 'sq' ? 'Dizajn plotësisht responsiv' : 'Fully responsive design',
                  locale === 'sq' ? 'Përditësime mujore të përmbajtjes' : 'Monthly content updates',
                  locale === 'sq' ? 'Mbështetje direkte nga zhvilluesi' : 'Direct developer support',
                  locale === 'sq' ? '99.9% garanci funksionimi' : '99.9% uptime guarantee',
                  locale === 'sq' ? 'Backup automatik ditor' : 'Automatic daily backups',
                  locale === 'sq' ? 'Email biznesi të përfshirë' : 'Business email included'
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-4 w-4 flex-shrink-0 text-emerald-500 mr-3 mt-0.5" />
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            {/* Clean CTA Button with shadcn */}
            <CardFooter className="px-0">
              <Button className="w-full" size="lg" asChild>
                <a href={`/${locale}/get-started`}>
                  {dictionary.pricing.getStarted}
                </a>
              </Button>
            </CardFooter>

            {/* Subtle Additional Info */}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 font-light">
                  {locale === 'sq'
                    ? '✓ Pa tarifa fillimi  ✓ Pa kosto të fshehura  ✓ Anulo në çdo kohë'
                    : '✓ No setup fees  ✓ No hidden costs  ✓ Cancel anytime'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Simple Comparison Table */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {locale === 'sq'
                ? 'Krahasimi: Të gjitha Opsionet vs Luca'
                : 'All Options vs Luca'}
            </h3>
            <p className="text-sm text-gray-600 font-light">
              {locale === 'sq'
                ? 'Shikoni sa para kurseni me shërbimin tonë'
                : 'See how much money you save with our service'}
            </p>
          </div>

          <div className="overflow-hidden rounded-md border border-gray-200 overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-900">
                    {locale === 'sq' ? 'Veçori' : 'Feature'}
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-900">
                    {locale === 'sq' ? 'Agjenci' : 'Agencies'}
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-emerald-600">
                    Luca
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-900">
                    {locale === 'sq' ? 'DIY/Wix' : 'DIY/Wix'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                <tr>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {locale === 'sq' ? 'Kosto Instalimi' : 'Setup Fee'}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-red-600 font-medium">€500-2000</td>
                  <td className="px-4 py-3 text-center text-xs text-emerald-600 font-medium">€0</td>
                  <td className="px-4 py-3 text-center text-xs text-orange-600">€0</td>
                </tr>
                <tr className="bg-gray-25">
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {locale === 'sq' ? 'Kosto Mujore' : 'Monthly Cost'}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-red-600 font-medium">€100-300+</td>
                  <td className="px-4 py-3 text-center text-xs text-emerald-600 font-medium">€50</td>
                  <td className="px-4 py-3 text-center text-xs text-orange-600">€15-50</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-xs text-gray-900">Domain</td>
                  <td className="px-4 py-3 text-center text-xs text-red-600">€15/vit ekstra*</td>
                  <td className="px-4 py-3 text-center text-xs text-emerald-600 font-medium">
                    {locale === 'sq' ? 'E përfshirë' : 'Included'}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-orange-600">€15/vit</td>
                </tr>
                <tr className="bg-gray-25">
                  <td className="px-4 py-3 text-xs text-gray-900">Hosting</td>
                  <td className="px-4 py-3 text-center text-xs text-red-600">€20/muaj ekstra</td>
                  <td className="px-4 py-3 text-center text-xs text-emerald-600 font-medium">
                    {locale === 'sq' ? 'E përfshirë' : 'Included'}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-orange-600">
                    {locale === 'sq' ? 'E përfshirë*' : 'Included*'}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-xs text-gray-900">SSL</td>
                  <td className="px-4 py-3 text-center text-xs text-red-600">€10/muaj ekstra</td>
                  <td className="px-4 py-3 text-center text-xs text-emerald-600 font-medium">
                    {locale === 'sq' ? 'E përfshirë' : 'Included'}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-orange-600">
                    {locale === 'sq' ? 'E përfshirë' : 'Included'}
                  </td>
                </tr>
                <tr className="bg-gray-25">
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {locale === 'sq' ? 'Përditësime' : 'Updates'}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-red-600">€50/orë</td>
                  <td className="px-4 py-3 text-center text-xs text-emerald-600 font-medium">
                    {locale === 'sq' ? 'E përfshirë' : 'Included'}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-orange-600">
                    {locale === 'sq' ? 'Kufizuar/Vetë' : 'Limited/DIY'}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {locale === 'sq' ? 'Shpejtësia' : 'Speed/Time'}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-red-600">
                    {locale === 'sq' ? 'E ngadaltë' : 'Slow'}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-emerald-600 font-medium">
                    {locale === 'sq' ? 'E shpejtë' : 'Fast'}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-orange-600">
                    {locale === 'sq' ? 'E gjatë/Ngadaltë' : 'Time intensive/Slow'}
                  </td>
                </tr>
                <tr className="bg-emerald-50 border-t border-emerald-200">
                  <td className="px-4 py-3 text-xs font-medium text-gray-900">
                    {locale === 'sq' ? 'Totali Muaji i Parë' : 'Total First Month'}
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-medium text-red-600">€2000+</td>
                  <td className="px-4 py-3 text-center text-sm font-medium text-emerald-600">
                    €50*
                    <div className="text-xs font-light text-gray-500">
                      *{locale === 'sq' ? '€600/vit' : '€600/year'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-medium text-orange-600">€500+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-600 font-light">
              {locale === 'sq'
                ? 'Kurseni mbi €1500+ në muajin e parë krahasuar me të gjitha opsionet e tjera'
                : 'Save over €1500+ in the first month compared to all other options'}
            </p>
            <p className="text-xs text-emerald-600 font-normal mt-1">
              {locale === 'sq'
                ? 'Luca: Më i shpejtë, më i lirë, më profesional'
                : 'Luca: Faster, cheaper, more professional'}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-light">
              {locale === 'sq'
                ? '*Deri në €15/vit, jo më shumë'
                : '*Up to €15/year, not more'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}