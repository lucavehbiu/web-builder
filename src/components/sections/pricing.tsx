import Link from 'next/link'

export default function Pricing() {
  const features = [
    "Professional 4-5 page website",
    "Custom design tailored to your brand",
    "Mobile responsive on all devices",
    "Fast, secure hosting included",
    "SSL certificate for security",
    "Monthly content updates",
    "Basic SEO optimization",
    "Contact forms and social media integration",
    "Google Analytics setup",
    "Domain registration (if under $15/year)",
    "99.9% uptime guarantee",
    "Direct developer support"
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Simple,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Transparent Pricing
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
            No setup fees. No hidden costs. Just one monthly payment.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="mx-auto mt-16 max-w-lg">
          <div className="relative">
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-sm font-medium text-white shadow-lg">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Most Popular Plan
              </div>
            </div>

            {/* Main pricing card */}
            <div className="relative rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200 hover:shadow-3xl transition-all duration-300">
              {/* Price */}
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <span className="text-5xl font-bold text-gray-900">$60</span>
                  <span className="text-xl text-gray-500 ml-2">/month</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Everything included, no surprises</p>
              </div>

              {/* Features list */}
              <div className="mt-8">
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm leading-6 text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="/get-started"
                  className="block w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-center text-lg font-semibold text-white shadow-lg hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Get Started Today
                </Link>
              </div>

              {/* Money back guarantee */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  30-day money-back guarantee • Cancel anytime
                </p>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Bottom testimonial/trust signals */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-6">
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">4.9/5 from 200+ clients</span>
            </div>
            <div className="text-sm text-gray-500">•</div>
            <div className="text-sm text-gray-600">500+ websites launched</div>
            <div className="text-sm text-gray-500">•</div>
            <div className="text-sm text-gray-600">99.9% uptime</div>
          </div>
        </div>
      </div>
    </section>
  )
}