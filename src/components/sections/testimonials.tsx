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
      content: "WebBuilder na ndërtoi një faqe të mahnitshme që konverton vizitorët në klientë. Më shumë se dyfishoi shitjet tona online!",
      author: "Maria Koka",
      role: "Pronare, Boutique Tirana",
      rating: 5,
      avatar: "MK"
    },
    {
      content: "Më në fund një shërbim që është i thjeshtë dhe funksionon. Pa komplikime teknike, vetëm një faqe e bukur që funksionon.",
      author: "Arben Shehu",
      role: "CEO, Shehu Consulting",
      rating: 5,
      avatar: "AS"
    },
    {
      content: "Mbështetja është e jashtëzakonshme. Sa herë që kam nevojë për ndryshime, ata janë aty. Është si të kesh ekipin tuaj të IT-së.",
      author: "Elena Hoxha",
      role: "Drejtoreshë, Klinika Dentare Hoxha",
      rating: 5,
      avatar: "EH"
    }
  ] : [
    {
      content: "WebBuilder created a stunning website that converts visitors into customers. More than doubled our online sales!",
      author: "Sarah Johnson",
      role: "Owner, The Plant Shop",
      rating: 5,
      avatar: "SJ"
    },
    {
      content: "Finally a service that's simple and just works. No technical headaches, just a beautiful website that performs.",
      author: "Michael Chen",
      role: "CEO, Chen Consulting",
      rating: 5,
      avatar: "MC"
    },
    {
      content: "The support is phenomenal. Whenever I need changes, they're on it. It's like having my own IT team.",
      author: "Emma Rodriguez",
      role: "Director, Wellness Center",
      rating: 5,
      avatar: "ER"
    }
  ]

  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {locale === 'sq' ? 'Çfarë Thonë Klientët Tanë' : 'What Our Clients Say'}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
            {locale === 'sq' 
              ? 'Bashkohu me qindra biznese që besojnë tek ne për praninë e tyre online'
              : 'Join hundreds of businesses that trust us with their online presence'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Content */}
              <blockquote className="flex-1">
                <p className="text-lg leading-7 text-gray-700">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            {locale === 'sq' 
              ? 'Gati të filloni? Merrni faqen tuaj brenda 48 orëve.'
              : 'Ready to get started? Get your website within 48 hours.'}
          </p>
          <a
            href={`/${locale}/get-started`}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-105"
          >
            {locale === 'sq' ? 'Fillo Sot' : 'Start Today'}
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}