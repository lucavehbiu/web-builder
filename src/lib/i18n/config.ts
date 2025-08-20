export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'sq'] as const,
} as const

export type Locale = (typeof i18n)['locales'][number]

export const localeNames: Record<Locale, string> = {
  en: 'English',
  sq: 'Shqip', // Albanian
}

export const localeCurrencies: Record<Locale, string> = {
  en: 'USD',
  sq: 'EUR', // Albania uses Euro for many transactions
}

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  sq: '🇦🇱',
}