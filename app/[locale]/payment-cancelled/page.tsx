import { Locale } from '@/lib/i18n/config'
import Link from 'next/link'

export const runtime = 'edge'

interface PaymentCancelledPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function PaymentCancelledPage({ params }: PaymentCancelledPageProps) {
  const { locale } = await params
  
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Cancelled Icon */}
          <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.854-.833-2.624 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          {/* Cancelled Message */}
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 mb-6">
            {locale === 'sq' ? 'Pagesa u Anulua' : 'Payment Cancelled'}
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {locale === 'sq' 
              ? 'Pa problem! Pagesa juaj u anulua dhe nuk ju është tërhequr asnjë pagesë. Formësi i kontaktit mbetet i ruajtur nëse dëshironi të vazhdoni më vonë.'
              : "No worries! Your payment was cancelled and you haven't been charged. Your contact form submission is still saved if you want to continue later."}
          </p>

          {/* Reassurance */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              {locale === 'sq' ? 'Çfarë Tani?' : 'What Now?'}
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                <p className="text-gray-300">
                  {locale === 'sq' 
                    ? 'Të dhënat tuaja janë ruajtur dhe do t\'ju kontaktojmë brenda 24 orëve'
                    : "Your information is saved and we'll contact you within 24 hours"}
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                <p className="text-gray-300">
                  {locale === 'sq' 
                    ? 'Mund të paguani më vonë pas diskutimit të detajeve'
                    : "You can pay later after discussing the details"}
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                <p className="text-gray-300">
                  {locale === 'sq' 
                    ? 'Asnjë detyrim - mund ta anuloni kurdo që dëshironi'
                    : "No obligation - you can cancel anytime you want"}
                </p>
              </div>
            </div>
          </div>

          {/* Benefits of Waiting */}
          <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              {locale === 'sq' ? 'Përfitimet e Pritjes' : 'Benefits of Waiting'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300 text-left">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {locale === 'sq' ? 'Konsultim i detajuar falas' : 'Detailed free consultation'}
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {locale === 'sq' ? 'Plan i personalizuar për biznesin tuaj' : 'Custom plan for your business'}
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {locale === 'sq' ? 'Mundësi për zbritje të veçanta' : 'Opportunity for special discounts'}
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {locale === 'sq' ? 'Kohë për të marrë vendime të informuara' : 'Time to make informed decisions'}
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/get-started`}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              {locale === 'sq' ? 'Provo Pagesën Përsëri' : 'Try Payment Again'}
            </Link>
            
            <Link
              href={`/${locale}`}
              className="inline-flex items-center px-8 py-3 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {locale === 'sq' ? 'Kthehu në Shtëpi' : 'Go to Homepage'}
            </Link>
          </div>

          {/* Contact Information */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              {locale === 'sq' ? 'Pyetje? Na kontaktoni:' : 'Questions? Contact us:'}
            </p>
            <a
              href="mailto:luca@lucavehbiu.com"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              luca@lucavehbiu.com
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

export async function generateMetadata({ params }: PaymentCancelledPageProps) {
  const { locale } = await params
  return {
    title: locale === 'sq' ? 'Pagesa u Anulua - Luca' : 'Payment Cancelled - Luca',
    description: locale === 'sq' 
      ? 'Pagesa juaj u anulua. Asnjë pagesë nuk u krye dhe të dhënat tuaja janë ruajtur.'
      : 'Your payment was cancelled. No charge was made and your information is saved.',
  }
}