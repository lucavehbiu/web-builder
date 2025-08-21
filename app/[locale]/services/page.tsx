import Link from 'next/link'
import MobileNav from '@/components/ui/mobile-nav'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { Locale } from '@/lib/i18n/config'
import LanguageSwitcher from '@/components/ui/language-switcher'

export default async function Services({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const features = [
    {
      title: dictionary.services.included.customDesign.title,
      description: dictionary.services.included.customDesign.description,
      details: [
        dictionary.services.included.customDesign.detail1,
        dictionary.services.included.customDesign.detail2,
        dictionary.services.included.customDesign.detail3,
        dictionary.services.included.customDesign.detail4,
        dictionary.services.included.customDesign.detail5
      ]
    },
    {
      title: dictionary.services.included.hosting.title,
      description: dictionary.services.included.hosting.description,
      details: [
        dictionary.services.included.hosting.detail1,
        dictionary.services.included.hosting.detail2,
        dictionary.services.included.hosting.detail3,
        dictionary.services.included.hosting.detail4,
        dictionary.services.included.hosting.detail5
      ]
    },
    {
      title: dictionary.services.included.mobile.title,
      description: dictionary.services.included.mobile.description,
      details: [
        dictionary.services.included.mobile.detail1,
        dictionary.services.included.mobile.detail2,
        dictionary.services.included.mobile.detail3,
        dictionary.services.included.mobile.detail4,
        dictionary.services.included.mobile.detail5
      ]
    },
    {
      title: dictionary.services.included.updates.title,
      description: dictionary.services.included.updates.description,
      details: [
        dictionary.services.included.updates.detail1,
        dictionary.services.included.updates.detail2,
        dictionary.services.included.updates.detail3,
        dictionary.services.included.updates.detail4,
        dictionary.services.included.updates.detail5
      ]
    },
    {
      title: dictionary.services.included.seo.title,
      description: dictionary.services.included.seo.description,
      details: [
        dictionary.services.included.seo.detail1,
        dictionary.services.included.seo.detail2,
        dictionary.services.included.seo.detail3,
        dictionary.services.included.seo.detail4,
        dictionary.services.included.seo.detail5
      ]
    },
    {
      title: dictionary.services.included.support.title,
      description: dictionary.services.included.support.description,
      details: [
        dictionary.services.included.support.detail1,
        dictionary.services.included.support.detail2,
        dictionary.services.included.support.detail3,
        dictionary.services.included.support.detail4,
        dictionary.services.included.support.detail5
      ]
    }
  ]

  const process = [
    {
      step: "1",
      title: dictionary.services.process.step1.title,
      description: dictionary.services.process.step1.description
    },
    {
      step: "2",
      title: dictionary.services.process.step2.title,
      description: dictionary.services.process.step2.description
    },
    {
      step: "3",
      title: dictionary.services.process.step3.title,
      description: dictionary.services.process.step3.description
    },
    {
      step: "4",
      title: dictionary.services.process.step4.title,
      description: dictionary.services.process.step4.description
    }
  ]

  const comparison = [
    {
      category: dictionary.services.comparison.agencies,
      setup: dictionary.services.comparison.agenciesSetup,
      hosting: dictionary.services.comparison.agenciesHosting,
      updates: dictionary.services.comparison.agenciesUpdates,
      contract: dictionary.services.comparison.agenciesContract,
      timeline: dictionary.services.comparison.agenciesTimeline,
      firstYear: dictionary.services.comparison.agenciesFirstYear,
      highlight: false
    },
    {
      category: dictionary.services.comparison.webbuilder,
      setup: dictionary.services.comparison.webbuilderSetup,
      hosting: dictionary.services.comparison.webbuilderHosting,
      updates: dictionary.services.comparison.webbuilderUpdates,
      contract: dictionary.services.comparison.webbuilderContract,
      timeline: dictionary.services.comparison.webbuilderTimeline,
      firstYear: dictionary.services.comparison.webbuilderFirstYear,
      highlight: true
    },
    {
      category: dictionary.services.comparison.diy,
      setup: dictionary.services.comparison.diySetup,
      hosting: dictionary.services.comparison.diyHosting,
      updates: dictionary.services.comparison.diyUpdates,
      contract: dictionary.services.comparison.diyContract,
      timeline: dictionary.services.comparison.diyTimeline,
      firstYear: dictionary.services.comparison.diyFirstYear,
      highlight: false
    }
  ]

  const faqs = [
    {
      question: dictionary.services.faq.q1.question,
      answer: dictionary.services.faq.q1.answer
    },
    {
      question: dictionary.services.faq.q2.question,
      answer: dictionary.services.faq.q2.answer
    },
    {
      question: dictionary.services.faq.q3.question,
      answer: dictionary.services.faq.q3.answer
    },
    {
      question: dictionary.services.faq.q4.question,
      answer: dictionary.services.faq.q4.answer
    },
    {
      question: dictionary.services.faq.q5.question,
      answer: dictionary.services.faq.q5.answer
    },
    {
      question: dictionary.services.faq.q6.question,
      answer: dictionary.services.faq.q6.answer
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-white">
              {dictionary.navigation.logoText}
            </div>
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              <Link href={`/${locale}`} className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label={dictionary.navigation.homeLabel}>
                {dictionary.common.home}
              </Link>
              <Link href={`/${locale}/about`} className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label={dictionary.navigation.aboutLabel}>
                {dictionary.common.about}
              </Link>
              <Link href={`/${locale}/services`} className="text-white font-medium" aria-label={dictionary.navigation.servicesLabel}>
                {dictionary.common.services}
              </Link>
              <Link href={`/${locale}/portfolio`} className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label={dictionary.navigation.portfolioLabel}>
                {dictionary.common.portfolio}
              </Link>
              <LanguageSwitcher locale={locale} />
            </nav>
            <Link
              href={`/${locale}/get-started`}
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-xs"
            >
              {dictionary.common.getStarted}
            </Link>
            
            {/* Mobile Navigation */}
            <MobileNav theme="dark" locale={locale} dictionary={dictionary} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse"></div>
          
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40 text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-emerald-500/10 px-6 py-2 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20 backdrop-blur-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-ping"></div>
            {locale === 'sq' ? 'Zgjidhje Komplet për Biznesin' : 'Complete Business Solution'}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
              {dictionary.services.hero.title}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 relative">
              {dictionary.services.hero.price}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed mb-12">
            {dictionary.services.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href={`/${locale}/get-started`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                {dictionary.common.getStarted}
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 C240,100 480,80 720,90 C960,100 1200,110 1440,90 L1440,120 Z"/>
          </svg>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">{dictionary.services.included.title}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">{dictionary.services.process.title}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{dictionary.services.comparison.title}</h2>
          <p className="text-xl text-gray-600 mb-16 text-center">{dictionary.services.comparison.subtitle}</p>

          <div className="grid md:grid-cols-3 gap-8">
            {comparison.map((option) => (
              <div key={option.category} className={`rounded-2xl p-8 ${option.highlight ? 'bg-gradient-to-br from-blue-50 to-purple-50 ring-2 ring-blue-200 relative' : 'bg-gray-50'}`}>
                {option.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                      {dictionary.services.comparison.bestValue}
                    </div>
                  </div>
                )}

                <h3 className={`text-xl font-bold mb-6 text-center ${option.highlight ? 'text-blue-900' : 'text-gray-900'}`}>
                  {option.category}
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{dictionary.services.comparison.setup}</span>
                    <span className="font-medium">{option.setup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{dictionary.services.comparison.hosting}</span>
                    <span className="font-medium">{option.hosting}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{dictionary.services.comparison.updates}</span>
                    <span className="font-medium">{option.updates}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{dictionary.services.comparison.contract}</span>
                    <span className="font-medium">{option.contract}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{dictionary.services.comparison.timeline}</span>
                    <span className="font-medium">{option.timeline}</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">{dictionary.services.comparison.firstYear}</span>
                      <span className={`font-bold ${option.highlight ? 'text-blue-600' : 'text-gray-900'}`}>
                        {option.firstYear}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">{dictionary.services.faq.title}</h2>

          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl p-8 shadow-xs">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {dictionary.services.cta.title}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {dictionary.services.cta.subtitle}
          </p>
          <Link
            href={`/${locale}/get-started`}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center">
              {dictionary.services.cta.button}
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}