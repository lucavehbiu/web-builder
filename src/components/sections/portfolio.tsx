import type { Dictionary } from '@/lib/i18n/types'
import Link from 'next/link'

export default function Portfolio({ locale, dictionary }: { locale: string, dictionary: Dictionary }) {
  const results = [
    {
      business: dictionary.portfolio.result1.business,
      location: dictionary.portfolio.result1.location,
      result: dictionary.portfolio.result1.result,
      timeframe: dictionary.portfolio.result1.timeframe,
      description: dictionary.portfolio.result1.description,
      before: dictionary.portfolio.result1.before,
      after: dictionary.portfolio.result1.after,
      image: '/images/portfolio/pizza-before-after.jpg',
      color: 'from-green-500 to-emerald-600'
    },
    {
      business: dictionary.portfolio.result2.business,
      location: dictionary.portfolio.result2.location, 
      result: dictionary.portfolio.result2.result,
      timeframe: dictionary.portfolio.result2.timeframe,
      description: dictionary.portfolio.result2.description,
      before: dictionary.portfolio.result2.before,
      after: dictionary.portfolio.result2.after,
      image: '/images/portfolio/auto-before-after.jpg',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      business: dictionary.portfolio.result3.business,
      location: dictionary.portfolio.result3.location,
      result: dictionary.portfolio.result3.result, 
      timeframe: dictionary.portfolio.result3.timeframe,
      description: dictionary.portfolio.result3.description,
      before: dictionary.portfolio.result3.before,
      after: dictionary.portfolio.result3.after,
      image: '/images/portfolio/boutique-before-after.jpg',
      color: 'from-purple-500 to-pink-600'
    }
  ]

  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {dictionary.portfolio.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
            {dictionary.portfolio.subtitle}
          </p>
        </div>

        {/* Results Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {results.map((result, index) => (
            <div
              key={index}
              className="group relative flex flex-col bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-xl hover:ring-gray-300 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Result Badge */}
              <div className={`absolute -top-3 left-8 px-4 py-2 rounded-full bg-gradient-to-r ${result.color} text-white text-sm font-bold shadow-lg`}>
                {result.result}
              </div>

              {/* Business Info */}
              <div className="mt-4 mb-6">
                <h3 className="text-xl font-bold text-gray-900">{result.business}</h3>
                <p className="text-sm text-gray-500">{result.location} • {result.timeframe}</p>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                {result.description}
              </p>

              {/* Before/After */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                      {locale === 'sq' ? 'Përpara' : 'Before'}
                    </p>
                    <p className="text-sm text-gray-600">{result.before}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                      {locale === 'sq' ? 'Pas' : 'After'}
                    </p>
                    <p className="text-sm text-gray-600">{result.after}</p>
                  </div>
                </div>
              </div>

              {/* View Case Study Button */}
              <button className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors group-hover:underline">
                {dictionary.portfolio.viewCase}
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Hover Gradient Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${result.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center space-y-4 bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-lg font-semibold text-gray-900">
                {locale === 'sq' 
                  ? 'Gati për rezultate si këto?' 
                  : 'Ready for results like these?'}
              </p>
            </div>
            <p className="text-gray-600 max-w-md">
              {locale === 'sq' 
                ? 'Bashkohu me 200+ biznese që po bëjnë më shumë para me faqet e reja.'
                : 'Join 200+ businesses making more money with their new websites.'}
            </p>
            <Link
              href={`/${locale}/get-started`}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-md hover:from-blue-500 hover:to-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              {locale === 'sq' ? 'Merre Faqen Time në 48 Orë' : 'Get My Website in 48 Hours'}
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}