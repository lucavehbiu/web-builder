import Header from '@/components/ui/header'
import GetStartedForm from '@/components/forms/get-started-form'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { Locale } from '@/lib/i18n/config'

export const runtime = 'edge'

export default async function GetStarted({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      <Header locale={locale} dictionary={dictionary} />
      <GetStartedForm dictionary={dictionary} locale={locale} />
    </div>
  )
}