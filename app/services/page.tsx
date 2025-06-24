import Link from 'next/link'

export default function Services() {
  const features = [
    {
      title: "Custom Website Design",
      description: "A unique 4-5 page website designed specifically for your business.",
      details: [
        "Homepage with compelling messaging",
        "About page telling your story",
        "Services/products showcase",
        "Contact page with forms",
        "Additional pages as needed"
      ]
    },
    {
      title: "Premium Hosting & Performance",
      description: "Fast, secure hosting with 99.9% uptime guarantee.",
      details: [
        "Lightning-fast loading speeds",
        "SSL certificate included",
        "Daily backups",
        "Security monitoring",
        "CDN for global performance"
      ]
    },
    {
      title: "Mobile-First Design",
      description: "Your website looks perfect on all devices and screen sizes.",
      details: [
        "Responsive design",
        "Touch-friendly navigation",
        "Optimized for mobile search",
        "Fast mobile loading",
        "Cross-browser compatibility"
      ]
    },
    {
      title: "Monthly Updates",
      description: "Keep your content fresh with included monthly updates.",
      details: [
        "Text and image updates",
        "New page creation",
        "Plugin updates",
        "Security patches",
        "Performance optimization"
      ]
    },
    {
      title: "SEO Optimization",
      description: "Get found on Google with built-in SEO best practices.",
      details: [
        "Keyword optimization",
        "Meta tags setup",
        "Google Analytics",
        "Search Console setup",
        "Local SEO optimization"
      ]
    },
    {
      title: "Ongoing Support",
      description: "Direct access to your developer whenever you need help.",
      details: [
        "Email support",
        "Quick response times",
        "Technical assistance",
        "Training and guidance",
        "No call centers"
      ]
    }
  ]

  const process = [
    {
      step: "1",
      title: "Discovery",
      description: "Fill out our simple form with your business details and requirements."
    },
    {
      step: "2",
      title: "Design",
      description: "I create a custom design mockup based on your brand and needs."
    },
    {
      step: "3",
      title: "Build",
      description: "Your website is built using modern, fast, and secure technologies."
    },
    {
      step: "4",
      title: "Launch",
      description: "Go live in 1-2 weeks and start receiving monthly maintenance."
    }
  ]

  const comparison = [
    {
      category: "Traditional Agencies",
      setup: "$3,000-$10,000 setup",
      hosting: "$100-$300/month hosting",
      updates: "$150/hour for updates",
      contract: "Complex contracts",
      timeline: "Long timelines",
      firstYear: "$5,000+ first year",
      highlight: false
    },
    {
      category: "WebBuilder",
      setup: "$0 setup fee",
      hosting: "Hosting included",
      updates: "Monthly updates included",
      contract: "Simple monthly payment",
      timeline: "1-2 week delivery",
      firstYear: "$720 first year",
      highlight: true
    },
    {
      category: "DIY Platforms",
      setup: "$20-$50/month platform",
      hosting: "Your time = $$$",
      updates: "Limited customization",
      contract: "Generic templates",
      timeline: "No support",
      firstYear: "$600+ first year (plus your time)",
      highlight: false
    }
  ]

  const faqs = [
    {
      question: "What if I need more than 5 pages?",
      answer: "Additional pages can be added for $10/month per page. Most small businesses find 4-5 pages sufficient for their needs."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, there are no long-term contracts. You can cancel with 30 days notice. You'll always own your domain and content."
    },
    {
      question: "What if my domain costs more than $15/year?",
      answer: "You'll pay the difference. Most .com domains are around $12-15/year, but premium domains may cost more."
    },
    {
      question: "Do you work with e-commerce sites?",
      answer: "For simple product catalogs, yes. For full e-commerce with shopping carts, that would be a custom project with different pricing."
    },
    {
      question: "What happens to my website if I cancel?",
      answer: "You keep your domain and can download all your content. I'll provide you with all files and help with the transition."
    },
    {
      question: "How many monthly updates do I get?",
      answer: "Reasonable monthly updates are included - typically 1-2 hours of work per month. Larger changes may incur additional fees."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">
              WebBuilder
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About
              </Link>
              <Link href="/services" className="text-blue-600 font-medium">
                Services
              </Link>
              <Link href="/portfolio" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Portfolio
              </Link>
            </nav>
            <Link
              href="/get-started"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Complete Web Solution for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              $60/month
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Everything your small business needs to establish a professional online presence.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">What&apos;s Included</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">How It Works</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Why Choose WebBuilder?</h2>
          <p className="text-xl text-gray-600 mb-16 text-center">Compare the real costs and see the difference</p>

          <div className="grid md:grid-cols-3 gap-8">
            {comparison.map((option) => (
              <div key={option.category} className={`rounded-2xl p-8 ${option.highlight ? 'bg-gradient-to-br from-blue-50 to-purple-50 ring-2 ring-blue-200 relative' : 'bg-gray-50'}`}>
                {option.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                      Best Value
                    </div>
                  </div>
                )}

                <h3 className={`text-xl font-bold mb-6 text-center ${option.highlight ? 'text-blue-900' : 'text-gray-900'}`}>
                  {option.category}
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Setup:</span>
                    <span className="font-medium">{option.setup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hosting:</span>
                    <span className="font-medium">{option.hosting}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Updates:</span>
                    <span className="font-medium">{option.updates}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contract:</span>
                    <span className="font-medium">{option.contract}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timeline:</span>
                    <span className="font-medium">{option.timeline}</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">First Year:</span>
                      <span className={`font-bold ${option.highlight ? 'text-blue-600' : 'text-gray-900'}`}>
                        {option.firstYear}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">Frequently Asked Questions</h2>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of small businesses with professional websites for just $60/month.
          </p>
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Website Today
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}