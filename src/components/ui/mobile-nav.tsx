'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/ui/logo'
import LanguageSwitcher from '@/components/ui/language-switcher'
import type { Dictionary } from '@/lib/i18n/types'
import type { Locale } from '@/lib/i18n/config'

interface MobileNavProps {
  theme?: 'light' | 'dark'
  locale?: Locale | string
  dictionary?: Dictionary
}

export default function MobileNav({ 
  theme = 'dark',
  locale = 'en',
  dictionary
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isOpen && !target.closest('[data-mobile-nav]')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const navLinks = [
    { href: `/${locale}/about`, label: dictionary?.common?.about || 'About' },
    { href: `/${locale}/services`, label: dictionary?.common?.services || 'Services' },
    { href: `/${locale}/portfolio`, label: dictionary?.common?.portfolio || 'Portfolio' },
  ]

  const themeClasses = {
    light: {
      hamburger: 'text-gray-900',
      overlay: 'bg-black/50',
      panel: 'bg-white',
      logo: 'text-gray-900',
      link: 'text-gray-700 hover:text-blue-600',
      activeLink: 'text-blue-600',
      cta: 'bg-blue-600 text-white hover:bg-blue-700'
    },
    dark: {
      hamburger: 'text-white',
      overlay: 'bg-black/50',
      panel: 'bg-gray-900',
      logo: 'text-white',
      link: 'text-gray-300 hover:text-white',
      activeLink: 'text-white',
      cta: 'bg-blue-600 text-white hover:bg-blue-700'
    }
  }

  const classes = themeClasses[theme]

  return (
    <div className="md:hidden" data-mobile-nav>
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors hover:bg-white/10 ${classes.hamburger}`}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center relative">
          <span 
            className={`block w-6 h-0.5 bg-current transform transition-transform duration-300 ${
              isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-current transform transition-transform duration-300 ${
              isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className={`fixed inset-0 z-40 ${classes.overlay}`}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Navigation Panel */}
      <div
        id="mobile-navigation"
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[80vw] ${classes.panel} shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-nav-title"
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div id="mobile-nav-title">
            <Logo size="sm" />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${classes.hamburger}`}
            aria-label="Close navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    pathname === link.href ? classes.activeLink : classes.link
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language Switcher */}
          <div className="mt-6 px-4">
            <LanguageSwitcher locale={locale as Locale} />
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              href={`/${locale}/get-started`}
              className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors shadow-xs ${classes.cta}`}
              onClick={() => setIsOpen(false)}
            >
              {dictionary?.common?.getStarted || 'Start Your Project'}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}