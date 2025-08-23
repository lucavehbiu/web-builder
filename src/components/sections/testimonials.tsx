import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, CheckCircle, ChevronRight } from 'lucide-react'

// Simplified StarRating Component with shadcn styling
interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function StarRating({ 
  rating = 5, 
  size = 'sm', 
  className = '' 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4', 
    lg: 'h-5 w-5'
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex" role="img" aria-label={`${rating} out of 5 stars`}>
        <span className="sr-only">{rating} out of 5 stars</span>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={`star-${i}`} 
            className={`${sizeClasses[size]} ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    </div>
  )
}

export default function Testimonials({ locale }: { locale: string }) {
  const testimonials = locale === 'sq' ? [
    {
      content: "Porositë online u rritën nga 3 në ditë në 20 në ditë! Faqja e re më ndihmoi të dyfishoj shitjet në më pak se 3 muaj. Çdo € që shpenzova vlen të dyfish.",
      author: "Mario Gjoni",
      role: "Pronar, Pizzeria Drita",
      location: "Tiranë",
      metric: "+127% Porosi",
      avatar: "MG",
      verified: true
    },
    {
      content: "Më në fund klientët mund të rezervojnë termine online! Më ka kursyer 2 orë në ditë që më parë i kaloja duke folur në telefon. Terminet janë trefishuar.",
      author: "Armando Kola", 
      role: "Pronar, Elite Auto Repair",
      location: "Durrës",
      metric: "+89% Klientë të Rinj",
      avatar: "AK",
      verified: true
    },
    {
      content: "Shitjet online kaluan nga 50,000 lekë në 130,000 lekë në muaj. Tani 60% e biznesit vjen nga interneti. Investimi më i mirë që kam bërë ndonjëherë!",
      author: "Elina Rama",
      role: "Pronare, Boutique Elegance", 
      location: "Vlorë",
      metric: "+156% Shitje",
      avatar: "ER",
      verified: true
    }
  ] : [
    {
      content: "Online orders went from 3 per day to 20 per day! The new website helped me double sales in less than 3 months. Every dollar I spent was worth double back.",
      author: "Mike Rodriguez",
      role: "Owner, Mario's Pizza",
      location: "Brooklyn, NY",
      metric: "+127% Orders",
      avatar: "MR",
      verified: true
    },
    {
      content: "Finally customers can book appointments online! It's saved me 2 hours a day I used to spend on the phone. Appointments have tripled since launch.",
      author: "David Chen",
      role: "Owner, Elite Auto Repair", 
      location: "Phoenix, AZ",
      metric: "+89% New Customers",
      avatar: "DC",
      verified: true
    },
    {
      content: "Online sales went from $2,000 to $5,100 per month. Now 60% of my business comes from the website. Best investment I've ever made for my boutique!",
      author: "Sarah Martinez",
      role: "Owner, Bella's Boutique",
      location: "Austin, TX", 
      metric: "+156% Sales",
      avatar: "SM",
      verified: true
    }
  ]

  return (
    <section className="py-20 sm:py-24 bg-gray-50">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Minimal Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="inline-flex items-center rounded-md bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-normal text-emerald-700 mb-3">
            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {locale === 'sq' ? 'Klientë të Verifikuar' : 'Verified Clients'}
          </div>
          <h2 className="text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl mb-3">
            {locale === 'sq' ? 'Dëgjo nga Klientët që Bëjnë Para' : 'Hear from Clients Making Money'}
          </h2>
          <p className="text-base text-gray-600 font-light">
            {locale === 'sq' 
              ? 'Këto janë bizneset që po fitojnë më shumë çdo muaj falë faqeve të reja'
              : 'These are the businesses earning more every month thanks to their new websites'}
          </p>
        </div>

        {/* Clean Testimonials Grid with shadcn Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative border-gray-100 shadow-none">
              {/* Simple Verified Badge */}
              <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white rounded-full p-1">
                <CheckCircle className="w-3 h-3" />
              </div>

              <CardContent className="pt-6">
                {/* Minimal Metric Badge */}
                <Badge variant="default" className="mb-4">
                  {testimonial.metric}
                </Badge>

                {/* Simple Rating */}
                <div className="flex items-center mb-3">
                  <StarRating rating={5} size="sm" />
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    {locale === 'sq' ? 'Verifikuar' : 'Verified'}
                  </span>
                </div>

                {/* Clean Content */}
                <blockquote className="mb-4">
                  <p className="text-gray-900 leading-relaxed font-light text-sm">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </blockquote>

                {/* Simple Author */}
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-9 h-9 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-700 font-medium text-sm">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 text-sm">{testimonial.author}</p>
                    <p className="text-xs text-gray-600 font-light">{testimonial.role}</p>
                    <p className="text-xs text-gray-500 font-light">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simple Bottom CTA with shadcn */}
        <div className="mt-16 text-center">
          <Card className="bg-emerald-600 text-white border-emerald-600">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-3">
                {locale === 'sq' 
                  ? 'Gati të Bëhesh Historia e Radhës e Suksesit?'
                  : 'Ready to Be the Next Success Story?'}
              </h3>
              <p className="text-emerald-100 mb-4 max-w-2xl mx-auto text-sm font-light">
                {locale === 'sq' 
                  ? 'Bashkohu me 200+ biznese që po rrisin të ardhurat me faqe që vërtet funksionojnë'
                  : 'Join 200+ businesses growing their revenue with websites that actually work'}
              </p>
              <Button variant="secondary" size="lg" asChild>
                <a href={`/${locale}/get-started`}>
                  {locale === 'sq' ? 'Merre Faqen në 48 Orë' : 'Get My Website in 48 Hours'}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}