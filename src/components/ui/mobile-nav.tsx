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
      panel: 'bg-white backdrop-blur-none', // Solid white background for light theme
      logo: 'text-gray-900',
      link: 'text-gray-700 hover:text-blue-600',
      activeLink: 'text-blue-600',
      border: 'border-gray-200',
      cta: 'bg-blue-600 text-white hover:bg-blue-700'
    },
    dark: {
      hamburger: 'text-white',
      overlay: 'bg-black/70',
      panel: 'bg-gray-900 backdrop-blur-none', // Solid dark background for dark theme
      logo: 'text-white',
      link: 'text-gray-300 hover:text-white',
      activeLink: 'text-white',
      border: 'border-gray-700',
      cta: 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400'
    }
  }

  const classes = themeClasses[theme]

  return (
    <div className="md:hidden" data-mobile-nav>
      {/* Hamburger Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="outline-none border-l border-l-gray-300 dark:border-l-gray-700 pl-3 relative py-3"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        <span className="sr-only">Toggle navbar</span>
        <span 
          aria-hidden="true" 
          className={`flex h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300 ${
            isOpen ? "rotate-45 translate-y-[0.33rem]" : ""
          }`} 
        />
        <span 
          aria-hidden="true" 
          className={`flex mt-2 h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300 ${
            isOpen ? "-rotate-45 -translate-y-[0.33rem]" : ""
          }`} 
        />
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
        className={`fixed top-0 right-0 bottom-0 z-[60] w-80 max-w-[80vw] shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${theme === 'dark' ? 'bg-gray-900/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-nav-title"
      >
        {/* Panel Header */}
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              <div id="mobile-nav-title">
                <Logo size="sm" />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-rose-400 to-pink-400 hover:shadow-lg hover:shadow-rose-200/50 transition-all duration-300"
                aria-label="Close navigation menu"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <ul className="space-y-3" role="list">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  style={{
                    animation: isOpen ? `slideInFromRight ${0.3 + index * 0.1}s ease-out` : 'none'
                  }}
                >
                  <Link
                    href={link.href}
                    className={`block px-5 py-4 rounded-xl font-medium transition-all duration-300 ${
                      pathname === link.href
                        ? theme === 'dark'
                          ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 border border-blue-500/30'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100/50 hover:text-gray-900'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Switcher */}
            <div className={`mt-8 pt-8 border-t ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
              <LanguageSwitcher locale={locale as Locale} />
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <Link
                href={`/${locale}/get-started`}
                className="block w-full text-center px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 text-white hover:from-emerald-400 hover:via-green-500 hover:to-teal-500 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-[1.02]"
                onClick={() => setIsOpen(false)}
              >
                {dictionary?.common?.getStarted || 'Start Your Project'}
              </Link>
            </div>
          </div>
        </nav>

        {/* Contact Info - Very Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-inherit">
          <div className="space-y-2">
            <a 
              href="mailto:info@lucavehbiu.com" 
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800/30' : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-100/30'}`}
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-3.5 h-3.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">info@lucavehbiu.com</span>
            </a>
            
            <a 
              href="https://wa.me/31644765785" 
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-emerald-400 hover:bg-gray-800/30' : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-100/30'}`}
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-3.5 h-3.5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span className="text-xs">+31 644 765 785</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}