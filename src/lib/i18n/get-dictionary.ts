import 'server-only'
import type { Locale } from './config'

// We enumerate all dictionaries here for better linting and typescript support
const dictionaries = {
  en: () => import('./translations/en.json').then((module) => module.default),
  sq: () => import('./translations/sq.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.en()
}