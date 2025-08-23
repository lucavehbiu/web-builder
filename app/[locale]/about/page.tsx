import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/ui/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { Locale } from '@/lib/i18n/config'
import { ChevronRight, Check, Circle } from 'lucide-react'

export const runtime = 'edge'

export default async function About({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const beliefs = [
    {
      icon: "💯",
      title: dictionary.about.beliefs.transparency.title,
      description: dictionary.about.beliefs.transparency.description
    },
    {
      icon: "🤝",
      title: dictionary.about.beliefs.partnership.title,
      description: dictionary.about.beliefs.partnership.description
    },
    {
      icon: "⚡",
      title: dictionary.about.beliefs.efficiency.title,
      description: dictionary.about.beliefs.efficiency.description
    },
    {
      icon: "🎯",
      title: dictionary.about.beliefs.focus.title,
      description: dictionary.about.beliefs.focus.description
    }
  ]

  const skills = [
    { name: dictionary.about.skills.webDevelopment, percentage: 95 },
    { name: dictionary.about.skills.uiuxDesign, percentage: 85 },
    { name: dictionary.about.skills.seoOptimization, percentage: 80 },
    { name: dictionary.about.skills.performanceOptimization, percentage: 90 },
    { name: dictionary.about.skills.clientCommunication, percentage: 100 }
  ]

  const highlights = [
    dictionary.about.skills.highlight1,
    dictionary.about.skills.highlight2,
    dictionary.about.skills.highlight3,
    dictionary.about.skills.highlight4,
    dictionary.about.skills.highlight5,
    dictionary.about.skills.highlight6,
    dictionary.about.skills.highlight7,
    dictionary.about.skills.highlight8
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header locale={locale} dictionary={dictionary} />

      {/* Minimal Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white overflow-hidden">
        {/* Simple Background */}
        <div className="absolute inset-0">
          {/* Single elegant effect */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-emerald-500/15 via-emerald-500/5 to-transparent rounded-full blur-3xl"></div>
          
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 sm:py-36 lg:px-8 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="success" className="mb-8 bg-emerald-500/10 border-emerald-500/20 text-emerald-300">
                <Circle className="w-1.5 h-1.5 fill-emerald-400 text-emerald-400 mr-2" />
                {locale === 'sq' ? 'Zhvilluesi Juaj Personal' : 'Your Personal Developer'}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6">
                <span className="block text-white mb-2">
                  {dictionary.about.hero.title}
                </span>
                <span className="block text-emerald-400 font-semibold">
                  {dictionary.about.hero.titleHighlight}
                </span>
              </h1>
              
              <p className="text-lg text-gray-400 leading-relaxed mb-8 font-light">
                {dictionary.about.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button asChild size="lg">
                  <Link href={`/${locale}/get-started`}>
                    {dictionary.about.cta.button}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Clean Profile Photo with Name */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative text-center">
                <div className="absolute -inset-2 bg-emerald-500/10 rounded-2xl blur-xl"></div>
                <div className="relative w-80 h-96 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-4">
                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <Image
                      src="https://storage.googleapis.com/web-builder-luca/profile.webp"
                      alt="Luca Vehbiu - Personal Web Developer"
                      width={320}
                      height={384}
                      className="w-full h-full object-cover rounded-xl"
                      priority={true}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-white">Luca Vehbiu</h3>
                <p className="text-sm text-gray-400 font-light mt-1">
                  {locale === 'sq' ? 'Zhvillues Web Personal' : 'Personal Web Developer'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 C240,100 480,80 720,90 C960,100 1200,110 1440,90 L1440,120 Z"/>
          </svg>
        </div>
      </section>

      {/* Clean Story Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-8 text-center">{dictionary.about.story.title}</h2>
          <Card className="border-gray-100 shadow-none">
            <CardContent className="prose prose-sm mx-auto text-gray-600 leading-relaxed font-light pt-8">
              <p className="mb-4">
                {dictionary.about.story.paragraph1}
              </p>
              <p className="mb-4">
                {dictionary.about.story.paragraph2}
              </p>
              <p className="mb-4">
                {dictionary.about.story.paragraph3}
              </p>
              <p className="mb-4">
                {dictionary.about.story.paragraph4}
              </p>
              <p className="text-base font-medium text-gray-900">
                {dictionary.about.story.conclusion}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Clean Beliefs Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-12 text-center">{dictionary.about.beliefs.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beliefs.map((belief) => (
              <Card key={belief.title} className="text-center border-gray-100 shadow-none">
                <CardContent className="pt-6">
                  <div className="text-2xl mb-3 opacity-80">{belief.icon}</div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">{belief.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">{belief.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Skills Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-12 text-center">{dictionary.about.skills.title}</h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <Card className="border-gray-100 shadow-none">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">{dictionary.about.skills.technicalTitle}</h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-normal text-gray-900">{skill.name}</span>
                        <span className="text-xs text-gray-600">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-600 to-emerald-700 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What I Bring */}
            <Card className="border-gray-100 shadow-none">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">{dictionary.about.skills.whatIBringTitle}</h3>
                <div className="space-y-3">
                  {highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed font-light">{highlight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beautiful CTA Section - Inspired Template */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
          <div className="bg-gradient-to-br from-emerald-100 to-gray-50 rounded-lg p-8 md:p-10 py-14 lg:p-14 flex flex-col md:flex-row items-center justify-center text-center md:text-left md:justify-start md:items-start gap-8">
            <div className="md:w-2/5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-emerald-950 font-medium leading-tight">
                {dictionary.about.cta.title}
              </h1>
            </div>
            <div className="flex flex-col md:flex-1 space-y-8">
              <p className="text-gray-700 font-light leading-relaxed">
                {dictionary.about.cta.subtitle}
              </p>
              <div className="flex justify-center md:justify-start">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500">
                  <Link href={`/${locale}/get-started`}>
                    {dictionary.about.cta.button}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}