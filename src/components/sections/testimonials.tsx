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
            key={i} 
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

// Reusable GradientText Component
interface GradientTextProps {
  children: React.ReactNode;
  gradient?: 'primary' | 'secondary' | 'custom';
  from?: string;
  to?: string;
  className?: string;
}

function GradientText({ 
  children, 
  gradient = 'primary', 
  from,
  to,
  className = '' 
}: GradientTextProps) {
  const gradientClasses = {
    primary: 'from-blue-600 to-purple-600',
    secondary: 'from-purple-600 to-pink-600',
    custom: from && to ? `from-${from} to-${to}` : 'from-blue-600 to-purple-600'
  }

  return (
    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientClasses[gradient]} ${className}`}>
      {children}
    </span>
  )
}

export default function Testimonials() {
  const testimonials = [
    {
      quote: "WebBuilder transformed my online presence. My restaurant now gets 3x more reservations through our website. The $60/month is the best investment I've made.",
      name: "Sarah Chen",
      business: "Chen's Kitchen",
      avatar: "SC"
    },
    {
      quote: "No hidden fees, no surprises. Just a beautiful website that works. My clients love how professional we look now. Highly recommend!",
      name: "Mike Rodriguez",
      business: "Rodriguez Plumbing",
      avatar: "MR"
    },
    {
      quote: "I was quoted $5,000+ by other developers. WebBuilder gave me exactly what I needed for a fraction of the cost. Amazing service!",
      name: "Emily Watson",
      business: "Watson Wellness Studio",
      avatar: "EW"
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            What{" "}
            <GradientText gradient="primary">
              Clients Say
            </GradientText>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
            Join dozens of satisfied small business owners
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-xl hover:ring-blue-300 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>

              {/* Quote */}
              <blockquote className="text-lg leading-8 text-gray-700 mb-8">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>

                {/* Author Info */}
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.business}</div>
                </div>
              </div>

              {/* Star Rating */}
              <StarRating rating={5} size="md" className="mt-4" />

              {/* Hover Effect Background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex" role="img" aria-label="4.9 out of 5 stars rating">
                <span className="sr-only">4.9 out of 5 stars</span>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">4.9/5</span>
            </div>
            <p className="text-gray-600">
              Average rating from 200+ small business owners
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}