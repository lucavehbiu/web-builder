import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Pricing from '@/components/sections/pricing'
import Portfolio from '@/components/sections/portfolio'
import MobileNav from '@/components/ui/mobile-nav'
import Link from 'next/link'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { Locale } from '@/lib/i18n/config'
import LanguageSwitcher from '@/components/ui/language-switcher'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return (
    <div className="min-h-screen">
      {/* Header with Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-xl font-bold text-white">
              {dictionary.navigation.logoText}
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              <Link href={`/${locale}`} className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label={dictionary.navigation.homeLabel}>
                {dictionary.common.home}
              </Link>
              <Link href={`/${locale}/about`} className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label={dictionary.navigation.aboutLabel}>
                {dictionary.common.about}
              </Link>
              <Link href={`/${locale}/services`} className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label={dictionary.navigation.servicesLabel}>
                {dictionary.common.services}
              </Link>
              <Link href={`/${locale}/portfolio`} className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label={dictionary.navigation.portfolioLabel}>
                {dictionary.common.portfolio}
              </Link>
              <LanguageSwitcher locale={locale} />
            </nav>

            {/* CTA Button - Hidden on mobile */}
            <Link
              href={`/${locale}/get-started`}
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-xs"
            >
              {dictionary.common.getStarted}
            </Link>

            {/* Mobile Navigation */}
            <MobileNav theme="dark" locale={locale} dictionary={dictionary} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero locale={locale} dictionary={dictionary} />

      {/* Features Section */}
      <Features locale={locale} dictionary={dictionary} />

      {/* Pricing Section */}
      <Pricing locale={locale} dictionary={dictionary} />

      {/* Portfolio Section */}
      <Portfolio locale={locale} dictionary={dictionary} />
    </div>
  )
}