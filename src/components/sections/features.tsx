import type { Dictionary } from '@/lib/i18n/types'

export default function Features({ locale, dictionary }: { locale: string, dictionary: Dictionary }) {
  const features = [
    {
      emoji: '🎨',
      title: dictionary.features.feature1.title,
      description: dictionary.features.feature1.description
    },
    {
      emoji: '📱',
      title: dictionary.features.feature2.title,
      description: dictionary.features.feature2.description
    },
    {
      emoji: '🚀',
      title: dictionary.features.feature4.title,
      description: dictionary.features.feature4.description
    },
    {
      emoji: '🔐',
      title: locale === 'sq' ? 'Hosting i Sigurt' : 'Secure Hosting',
      description: locale === 'sq' ? 'Certifikatë SSL e përfshirë. Faqja dhe të dhënat tuaja janë gjithmonë të mbrojtura.' : 'SSL certificate included. Your website and customer data are always protected.'
    },
    {
      emoji: '🔄',
      title: locale === 'sq' ? 'Përditësime Mujore' : 'Monthly Updates',
      description: locale === 'sq' ? 'Mbani përmbajtjen tuaj të freskët. Ne do të përditësojmë faqen tuaj çdo muaj si pjesë e shërbimit.' : 'Keep your content fresh. We\'ll update your website monthly as part of the service.'
    },
    {
      emoji: '💬',
      title: locale === 'sq' ? 'Mbështetje e Plotë' : 'Full Support',
      description: locale === 'sq' ? 'Qasje direkte tek zhvilluesi juaj. Merrni ndihmë kur ju nevojitet, pa qendra thirrjesh.' : 'Direct access to your developer. Get help when you need it, no call centers.'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {dictionary.features.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {dictionary.features.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-gray-50 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 border border-gray-100 hover:scale-105 hover:bg-white"
            >
              {/* Emoji */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.emoji}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-6 py-3 text-sm font-medium text-emerald-700">
            <span className="relative flex h-2 w-2 mr-3" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {locale === 'sq' 
              ? 'Të gjitha veçoritë të përfshira në abonimin tuaj €49.9/muaj' 
              : 'All features included in your €49.9/month subscription'}
          </div>
        </div>
      </div>
    </section>
  )
}