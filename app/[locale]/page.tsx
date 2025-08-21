import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Pricing from '@/components/sections/pricing'
import Portfolio from '@/components/sections/portfolio'
import Header from '@/components/ui/header'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { Locale } from '@/lib/i18n/config'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return (
    <div className="min-h-screen">
      <Header locale={locale} dictionary={dictionary} />
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