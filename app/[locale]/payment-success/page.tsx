import { Suspense } from 'react'
import { Locale } from '@/lib/i18n/config'
import PaymentSuccessContent from './content'

export const runtime = 'edge'

interface PaymentSuccessPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function PaymentSuccessPage({ params }: PaymentSuccessPageProps) {
  const { locale } = await params
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>}>
      <PaymentSuccessContent locale={locale} />
    </Suspense>
  )
}

export async function generateMetadata({ params }: PaymentSuccessPageProps) {
  const { locale } = await params
  
  return {
    title: locale === 'sq' ? 'Pagesa e Suksesshme - Luca' : 'Payment Success - Luca',
    description: locale === 'sq' 
      ? 'Faleminderit për pagesën tuaj! Do të fillojmë punën në faqen tuaj të internetit menjëherë.'
      : 'Thank you for your payment! We will start working on your website immediately.',
  }
}