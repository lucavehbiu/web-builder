'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Locale } from '@/lib/i18n/config'

interface PaymentSuccessContentProps {
  locale: Locale
}

interface PaymentSession {
  status: string
  customerEmail: string
  amountTotal: number
  currency: string
  subscriptionId: string
}

export default function PaymentSuccessContent({ locale }: PaymentSuccessContentProps) {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const leadId = searchParams.get('lead_id')
  
  const [session, setSession] = useState<PaymentSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/stripe/checkout?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(true)
          } else {
            setSession(data)
          }
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false))
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">{locale === 'sq' ? 'Po ngarkon...' : 'Loading...'}</p>
        </div>
      </div>
    )
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            {locale === 'sq' ? 'Gabim në Verifikim' : 'Verification Error'}
          </h1>
          <p className="text-gray-400 mb-6">
            {locale === 'sq' 
              ? 'Nuk arritëm të verifikojmë pagesën tuaj. Ju lutem kontaktoni mbështetjen.'
              : "We couldn't verify your payment. Please contact support."}
          </p>
          <Link
            href={`/${locale}/get-started`}
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {locale === 'sq' ? 'Kthehu Prapa' : 'Go Back'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon with Animation */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Celebration Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-ping"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 mb-6">
            {locale === 'sq' ? 'Pagesa e Suksesshme!' : 'Payment Successful!'}
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {locale === 'sq' 
              ? 'Faleminderit për besimin tuaj! Abonesa juaj është aktive dhe ne do të fillojmë punën në faqen tuaj të internetit menjëherë.'
              : 'Thank you for your trust! Your subscription is active and we will start working on your website immediately.'}
          </p>

          {/* Payment Details */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              {locale === 'sq' ? 'Detajet e Pagesës' : 'Payment Details'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">{locale === 'sq' ? 'Email:' : 'Email:'}</span>
                <div className="text-white font-medium">{session.customerEmail}</div>
              </div>
              <div>
                <span className="text-gray-400">{locale === 'sq' ? 'Shuma:' : 'Amount:'}</span>
                <div className="text-white font-medium">
                  {session.currency.toUpperCase()} {(session.amountTotal / 100).toFixed(2)}
                </div>
              </div>
              <div>
                <span className="text-gray-400">{locale === 'sq' ? 'Status:' : 'Status:'}</span>
                <div className="text-emerald-400 font-medium capitalize">{session.status}</div>
              </div>
              <div>
                <span className="text-gray-400">{locale === 'sq' ? 'Lloji:' : 'Type:'}</span>
                <div className="text-white font-medium">
                  {locale === 'sq' ? 'Abonésë Mujore' : 'Monthly Subscription'}
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-emerald-500/10 rounded-2xl p-6 border border-emerald-500/20 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              {locale === 'sq' ? 'Çfarë Ndodh Tani?' : 'What Happens Next?'}
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                <p className="text-gray-300">
                  {locale === 'sq' 
                    ? 'Do të merrni një email konfirmimi brenda 5 minutave'
                    : "You'll receive a confirmation email within 5 minutes"}
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                <p className="text-gray-300">
                  {locale === 'sq' 
                    ? 'Ekipi ynë do t\'ju kontaktojë brenda 2 orëve për të diskutuar detajet'
                    : "Our team will contact you within 2 hours to discuss details"}
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                <p className="text-gray-300">
                  {locale === 'sq' 
                    ? 'Fillimi i punës në faqen tuaj brenda 24 orëve'
                    : "Work begins on your website within 24 hours"}
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
                <p className="text-gray-300">
                  {locale === 'sq' 
                    ? 'Përditësime të rregullta gjatë procesit të zhvillimit'
                    : "Regular updates throughout the development process"}
                </p>
              </div>
            </div>
          </div>

          {/* Refund Policy Reminder */}
          <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20 mb-8">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-blue-300 font-medium text-sm">
                {locale === 'sq' ? '7-Ditë Garanci Kthimi' : '7-Day Refund Guarantee'}
              </span>
            </div>
            <p className="text-xs text-gray-400 text-center">
              {locale === 'sq' 
                ? 'Kthim i plotë i parave brenda 7 ditëve - pa pyetje'
                : 'Full refund within 7 days - no questions asked'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {locale === 'sq' ? 'Kthehu në Shtëpi' : 'Go to Homepage'}
            </Link>
            
            <a
              href={`mailto:luca@lucavehbiu.com?subject=${encodeURIComponent(locale === 'sq' ? 'Pyetje për Projektin Tim' : 'Question about My Project')}&body=${encodeURIComponent(locale === 'sq' ? `Përshëndetje Luca,\n\nSapo kam paguar për abonésën dhe kam disa pyetje...\n\nID e Lead-it: ${leadId || 'N/A'}\nSession ID: ${sessionId || 'N/A'}\n\nFaleminderit!` : `Hi Luca,\n\nI just paid for the subscription and have some questions...\n\nLead ID: ${leadId || 'N/A'}\nSession ID: ${sessionId || 'N/A'}\n\nThank you!`)}`}
              className="inline-flex items-center px-8 py-3 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {locale === 'sq' ? 'Kontakto për Pyetje' : 'Contact for Questions'}
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}