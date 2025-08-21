import type { Locale } from './config'
import type { Dictionary } from './types'

// Client-side dictionary loading without server-only restriction
const dictionaries = {
  en: () => import('./translations/en.json').then((module) => module.default as Dictionary),
  sq: () => import('./translations/sq.json').then((module) => module.default as Dictionary),
}

export const getDictionaryClient = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.en()
}