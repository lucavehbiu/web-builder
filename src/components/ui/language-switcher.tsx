'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { Locale, localeNames, localeFlags } from '@/lib/i18n/config'

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    // Get the current path without the locale
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    
    // Set cookie to remember preference
    document.cookie = `locale=${newLocale};max-age=31536000;path=/;samesite=lax${window.location.protocol === 'https:' ? ';secure' : ''}`
    
    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{localeFlags[locale]}</span>
        <span className="text-sm font-medium">{localeNames[locale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
          {Object.entries(localeNames).map(([key, name]) => {
            const localeKey = key as Locale
            return (
              <button
                key={localeKey}
                onClick={() => handleLocaleChange(localeKey)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-gray-700 transition-colors ${
                  locale === localeKey ? 'bg-gray-700/50 text-white' : 'text-gray-300'
                }`}
              >
                <span className="text-lg">{localeFlags[localeKey]}</span>
                <span>{name}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}