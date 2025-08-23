import type { Dictionary } from '@/lib/i18n/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Circle } from 'lucide-react'

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
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Minimal Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-2xl font-medium text-gray-900 mb-3">
            {dictionary.features.title}
          </h2>
          <p className="text-base text-gray-600 font-light">
            {dictionary.features.subtitle}
          </p>
        </div>

        {/* Minimal Features Grid with shadcn Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center border-gray-100 shadow-none">
              <CardContent className="pt-6">
                {/* Refined Icon */}
                <div className="text-xl mb-4 opacity-70">
                  {feature.emoji}
                </div>

                {/* Minimal Content */}
                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-2 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subtle Bottom CTA with shadcn Badge */}
        <div className="mt-14 text-center">
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500 mr-2" />
            {locale === 'sq' 
              ? 'Të gjitha veçoritë të përfshira në abonimin tuaj €49.9/muaj' 
              : 'All features included in your €49.9/month subscription'}
          </Badge>
        </div>
      </div>
    </section>
  )
}