import Link from 'next/link'
import Logo from './logo'
import LanguageSwitcher from './language-switcher'
import MobileNav from './mobile-nav'
import type { Dictionary } from '@/lib/i18n/types'
import type { Locale } from '@/lib/i18n/config'

interface HeaderProps {
  locale: Locale
  dictionary: Dictionary
}

export default function Header({ locale, dictionary }: HeaderProps) {
  return (
    <header className="absolute left-0 top-0 w-full flex items-center h-24 z-40">
      <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
        {/* Logo */}
        <div className="flex items-center min-w-max relative">
          <Link href={`/${locale}`} className="font-semibold flex items-center gap-x-2" aria-label="Go to homepage">
            <Logo size="sm" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:justify-between lg:items-center w-full">
          <ul className="flex flex-row gap-6 lg:items-center text-gray-300 lg:w-full lg:justify-center">
            <li>
              <Link 
                href={`/${locale}/about`} 
                className="relative py-2.5 duration-300 ease-linear hover:text-emerald-400 font-light"
                aria-label={dictionary.navigation.aboutLabel}
              >
                {dictionary.common.about}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${locale}/services`} 
                className="relative py-2.5 duration-300 ease-linear hover:text-emerald-400 font-light"
                aria-label={dictionary.navigation.servicesLabel}
              >
                {dictionary.common.services}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${locale}/portfolio`} 
                className="relative py-2.5 duration-300 ease-linear hover:text-emerald-400 font-light"
                aria-label={dictionary.navigation.portfolioLabel}
              >
                {dictionary.common.portfolio}
              </Link>
            </li>
          </ul>
          
          {/* Right Actions */}
          <div className="flex items-center gap-4 lg:min-w-max">
            <LanguageSwitcher locale={locale} />
            <Link
              href={`/${locale}/get-started`}
              className="px-6 py-3 duration-300 ease-linear border border-emerald-500 text-emerald-400 hover:text-white hover:bg-emerald-600 rounded-xl font-light"
            >
              {dictionary.common.getStarted}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex items-center lg:hidden">
          <MobileNav theme="dark" locale={locale} dictionary={dictionary} />
        </div>
      </nav>
    </header>
  )
}