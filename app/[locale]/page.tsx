import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Pricing from '@/components/sections/pricing'
import Portfolio from '@/components/sections/portfolio'
import MobileNav from '@/components/ui/mobile-nav'
import Logo from '@/components/ui/logo'
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
      {/* Modern Header with Perfect Alignment */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/10 border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size="md" />
            </div>

            {/* Desktop Navigation - Perfectly Centered */}
            <nav className="hidden lg:flex items-center justify-center flex-1" role="navigation" aria-label="Main navigation">
              <div className="flex items-center space-x-8">
                <Link 
                  href={`/${locale}`} 
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-transparent" 
                  aria-label={dictionary.navigation.homeLabel}
                >
                  {dictionary.common.home}
                </Link>
                <Link 
                  href={`/${locale}/about`} 
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-transparent" 
                  aria-label={dictionary.navigation.aboutLabel}
                >
                  {dictionary.common.about}
                </Link>
                <Link 
                  href={`/${locale}/services`} 
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-transparent" 
                  aria-label={dictionary.navigation.servicesLabel}
                >
                  {dictionary.common.services}
                </Link>
                <Link 
                  href={`/${locale}/portfolio`} 
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-transparent" 
                  aria-label={dictionary.navigation.portfolioLabel}
                >
                  {dictionary.common.portfolio}
                </Link>
              </div>
            </nav>

            {/* Right Actions - Language + CTA */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              <div className="flex items-center">
                <LanguageSwitcher locale={locale} />
              </div>
              
              <Link
                href={`/${locale}/get-started`}
                className="group relative overflow-hidden rounded-xl backdrop-blur-xl bg-gradient-to-r from-emerald-500/90 to-cyan-500/90 border border-white/20 px-6 py-2.5 text-white font-semibold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 hover:from-emerald-400/90 hover:to-cyan-400/90"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-sm">
                  {dictionary.common.getStarted}
                </span>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <MobileNav theme="dark" locale={locale} dictionary={dictionary} />
            </div>
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