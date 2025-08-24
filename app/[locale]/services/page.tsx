import Link from 'next/link'
import Header from '@/components/ui/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// Tabs removed - using simple grid layout instead
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { Locale } from '@/lib/i18n/config'
import { ChevronRight, Check, Circle } from 'lucide-react'

export const runtime = 'edge'

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
      speed: dictionary.services.comparison.agenciesSpeed,
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
      speed: dictionary.services.comparison.webbuilderSpeed,
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
      speed: dictionary.services.comparison.diySpeed,
      firstYear: dictionary.services.comparison.diyFirstYear,
      highlight: false
    },
    {
      category: dictionary.services.comparison.wix,
      setup: dictionary.services.comparison.wixSetup,
      hosting: dictionary.services.comparison.wixHosting,
      updates: dictionary.services.comparison.wixUpdates,
      contract: dictionary.services.comparison.wixContract,
      timeline: dictionary.services.comparison.wixTimeline,
      speed: dictionary.services.comparison.wixSpeed,
      firstYear: dictionary.services.comparison.wixFirstYear,
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
      <Header locale={locale} dictionary={dictionary} />

      {/* Minimal Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white overflow-hidden">
        {/* Simple Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-emerald-500/15 via-emerald-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 sm:py-36 lg:px-8 lg:py-40 text-center">
          <Badge variant="success" className="mb-8 bg-emerald-500/10 border-emerald-500/20 text-emerald-300">
            <Circle className="w-1.5 h-1.5 fill-emerald-400 text-emerald-400 mr-2" />
            {dictionary.services.hero.badge}
          </Badge>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight mb-6">
            <span className="block text-white mb-2">
              {dictionary.services.hero.title}
            </span>
            <span className="block text-emerald-400 font-semibold">
              {dictionary.services.hero.price}
            </span>
          </h1>
          
          <p className="text-base text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto font-light">
            {dictionary.services.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href={`/${locale}/get-started`}>
                {dictionary.common.getStarted}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 C240,100 480,80 720,90 C960,100 1200,110 1440,90 L1440,120 Z"/>
          </svg>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-12 text-center">{dictionary.services.included.title}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-gray-100 shadow-none hover:shadow-sm transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-gray-900">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 font-light">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail) => (
                      <li key={detail} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-sm text-gray-700 font-light">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-12 text-center">{dictionary.services.process.title}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step) => (
              <Card key={step.step} className="text-center border-gray-100 shadow-none">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full flex items-center justify-center text-lg font-medium mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-4 text-center">{dictionary.services.comparison.title}</h2>
          <p className="text-base text-gray-600 mb-12 text-center font-light">{dictionary.services.comparison.subtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {comparison.map((option) => (
              <Card key={option.category} className={`${option.highlight ? 'border-emerald-200 bg-emerald-50/50 relative' : 'border-gray-100'} shadow-none`}>
                {option.highlight && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600 hover:bg-emerald-600">
                    {dictionary.services.comparison.bestValue}
                  </Badge>
                )}

                <CardHeader>
                  <CardTitle className={`text-lg font-medium text-center ${option.highlight ? 'text-emerald-900' : 'text-gray-900'}`}>
                    {option.category}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className={`text-xs ${option.highlight ? 'text-emerald-600' : 'text-gray-500'}`}>{dictionary.services.comparison.setup}</span>
                      <span className={`text-xs text-right font-medium ${option.highlight ? 'text-emerald-800' : 'text-gray-700'} max-w-[60%]`}>{option.setup}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className={`text-xs ${option.highlight ? 'text-emerald-600' : 'text-gray-500'}`}>{dictionary.services.comparison.hosting}</span>
                      <span className={`text-xs text-right font-medium ${option.highlight ? 'text-emerald-800' : 'text-gray-700'} max-w-[60%]`}>{option.hosting}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className={`text-xs ${option.highlight ? 'text-emerald-600' : 'text-gray-500'}`}>{dictionary.services.comparison.updates}</span>
                      <span className={`text-xs text-right font-medium ${option.highlight ? 'text-emerald-800' : 'text-gray-700'} max-w-[60%]`}>{option.updates}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className={`text-xs ${option.highlight ? 'text-emerald-600' : 'text-gray-500'}`}>{dictionary.services.comparison.contract}</span>
                      <span className={`text-xs text-right font-medium ${option.highlight ? 'text-emerald-800' : 'text-gray-700'} max-w-[60%]`}>{option.contract}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className={`text-xs ${option.highlight ? 'text-emerald-600' : 'text-gray-500'}`}>{dictionary.services.comparison.timeline}</span>
                      <span className={`text-xs text-right font-medium ${option.highlight ? 'text-emerald-800' : 'text-gray-700'} max-w-[60%]`}>{option.timeline}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className={`text-xs ${option.highlight ? 'text-emerald-600' : 'text-gray-500'}`}>{dictionary.services.comparison.speed}</span>
                      <span className={`text-xs text-right font-medium ${option.highlight ? 'text-emerald-800' : 'text-gray-700'} max-w-[60%]`}>{option.speed}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="text-xs font-medium text-gray-900">{dictionary.services.comparison.firstYear}</span>
                        <span className={`text-xs font-semibold ${option.highlight ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {option.firstYear}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-12 text-center">{dictionary.services.faq.title}</h2>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <Card key={faq.question} className="border-gray-100 shadow-none">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{faq.answer}</p>
                </CardContent>
              </Card>
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
          <h2 className="text-2xl md:text-3xl font-medium mb-6">
            {dictionary.services.cta.title}
          </h2>
          <p className="text-lg mb-8 opacity-90 font-light">
            {dictionary.services.cta.subtitle}
          </p>
          <Button asChild size="lg">
            <Link href={`/${locale}/get-started`}>
              {dictionary.services.cta.button}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}