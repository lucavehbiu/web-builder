// Reusable StarRating Component
interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  text?: string;
  className?: string;
}

function StarRating({ 
  rating = 5, 
  size = 'md', 
  showText = false, 
  text,
  className = '' 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5', 
    lg: 'h-6 w-6'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex" role="img" aria-label={`${rating} out of 5 stars`}>
        <span className="sr-only">{rating} out of 5 stars</span>
        {[...Array(5)].map((_, i) => (
          <svg 
            key={`star-${i}`} 
            className={`${sizeClasses[size]} ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {showText && text && (
        <span className={`ml-2 ${textSizeClasses[size]} text-gray-300`}>
          {text}
        </span>
      )}
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
    <section className="py-24 sm:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.05),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {locale === 'sq' ? 'Klientë të Verifikuar' : 'Verified Clients'}
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            {locale === 'sq' ? 'Dëgjo nga Klientët që Bëjnë Para' : 'Hear from Clients Making Money'}
          </h2>
          <p className="text-xl text-gray-600">
            {locale === 'sq' 
              ? 'Këto janë bizneset që po fitojnë më shumë çdo muaj falë faqeve të reja'
              : 'These are the businesses earning more every month thanks to their new websites'}
          </p>
        </div>

        {/* Testimonials Grid - Masonry Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${
                index === 1 ? 'md:mt-8' : ''
              } ${index === 2 ? 'lg:mt-16' : ''}`}
            >
              {/* Verified Badge */}
              <div className="absolute -top-3 -right-3 bg-emerald-500 text-white rounded-full p-2 shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Metric Badge */}
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-1.5 text-sm font-bold text-white mb-6 shadow-md">
                {testimonial.metric}
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <StarRating rating={5} size="sm" />
                <span className="ml-2 text-sm font-medium text-gray-600">
                  {locale === 'sq' ? 'Verifikuar' : 'Verified'}
                </span>
              </div>

              {/* Content */}
              <blockquote className="mb-6">
                <p className="text-gray-900 leading-relaxed font-medium">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              {/* Hover gradient effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h3 className="text-2xl font-bold mb-4">
                {locale === 'sq' 
                  ? 'Gati të Bëhesh Historia e Radhës e Suksesit?'
                  : 'Ready to Be the Next Success Story?'}
              </h3>
              <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                {locale === 'sq' 
                  ? 'Bashkohu me 200+ biznese që po rrisin të ardhurat me faqe që vërtet funksionojnë'
                  : 'Join 200+ businesses growing their revenue with websites that actually work'}
              </p>
              <a
                href={`/${locale}/get-started`}
                className="inline-flex items-center justify-center rounded-xl bg-white text-emerald-600 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
              >
                {locale === 'sq' ? 'Merre Faqen në 48 Orë' : 'Get My Website in 48 Hours'}
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}