import Link from 'next/link'
import Image from 'next/image'

export default function Portfolio() {
  const projects = [
    {
      title: "Chen's Kitchen",
      category: "Restaurant",
      description: "A family-owned Chinese restaurant needed an online presence to showcase their menu and accept reservations. The website features an elegant design that reflects their traditional cooking with modern presentation.",
      results: [
        "300% increase in online reservations",
        "Reduced phone calls by 60%",
        "Featured in local food blogs",
        "Average 4.8/5 customer rating"
      ],
      technologies: ["Next.js", "Responsive Design", "Online Reservations", "SEO"],
      screenshot: "Screenshot of Chen's Kitchen"
    },
    {
      title: "Rodriguez Plumbing",
      category: "Home Services",
      description: "A local plumbing service wanted to establish credibility and make it easy for customers to request service calls. The site emphasizes trust, experience, and quick response times.",
      results: [
        "40% increase in service calls",
        "Improved Google search ranking",
        "Reduced no-shows by 25%",
        "Built customer trust"
      ],
      technologies: ["Contact Forms", "Mobile-First", "Local SEO", "Fast Loading"],
      screenshot: "Screenshot of Rodriguez Plumbing"
    },
    {
      title: "Watson Wellness Studio",
      category: "Health & Wellness",
      description: "A wellness coach needed a calming, professional website to attract new clients and showcase her services. The design emphasizes tranquility and personal transformation.",
      results: [
        "50% increase in new clients",
        "Higher quality lead generation",
        "Streamlined booking process",
        "Enhanced professional image"
      ],
      technologies: ["Booking System", "Content Management", "Social Integration", "Analytics"],
      screenshot: "Screenshot of Watson Wellness Studio"
    },
    {
      title: "Mountain View Accounting",
      category: "Professional Services",
      description: "A CPA firm wanted to modernize their online presence and attract small business clients. The website emphasizes trust, expertise, and personalized service.",
      results: [
        "35% growth in new clients",
        "Reduced client onboarding time",
        "Improved client communication",
        "Enhanced professional credibility"
      ],
      technologies: ["Secure Forms", "Client Portal", "Resource Library", "Contact Management"],
      screenshot: "Screenshot of Mountain View Accounting"
    }
  ]

  const testimonials = [
    {
      quote: "The website has transformed how customers find and interact with our restaurant. We're booked solid most nights now!",
      name: "Sarah Chen",
      business: "Chen's Kitchen",
      avatar: "SC"
    },
    {
      quote: "Professional, reliable, and affordable. The website pays for itself with just one new client per month.",
      name: "Mike Rodriguez",
      business: "Rodriguez Plumbing",
      avatar: "MR"
    },
    {
      quote: "I was amazed at how quickly my professional image improved. The website perfectly captures what my practice is about.",
      name: "Dr. Emily Watson",
      business: "Watson Wellness Studio",
      avatar: "DEW"
    },
    {
      quote: "The best investment I've made for my business. Clear communication and excellent results.",
      name: "David Park",
      business: "Mountain View Accounting",
      avatar: "DP"
    }
  ]

  const process = [
    {
      step: "1",
      title: "Discovery",
      description: "We discuss your business, goals, and design preferences."
    },
    {
      step: "2",
      title: "Design",
      description: "I create a custom mockup that reflects your brand."
    },
    {
      step: "3",
      title: "Development",
      description: "Your website is built with modern, fast technologies."
    },
    {
      step: "4",
      title: "Launch",
      description: "Go live and start attracting customers online."
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
              <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Services
              </Link>
              <Link href="/portfolio" className="text-blue-600 font-medium">
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
            See{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              What's Possible
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Real websites for real businesses, all built for $60/month.
          </p>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {projects.map((project, index) => (
              <div key={project.title} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Screenshot */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-xl">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="text-center text-gray-500 text-sm mb-4">
                        {project.screenshot}
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded mt-4"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{project.description}</p>

                  {/* Results */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Results:</h4>
                    <ul className="space-y-3">
                      {project.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">What Clients Say</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                {/* Quote */}
                <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.business}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Every Project Follows the Same Proven Process</h2>
          <p className="text-xl text-gray-600 mb-16 text-center">This systematic approach ensures consistent results and happy clients, every time.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Start Your Project Today
          </h2>
          <h3 className="text-2xl font-semibold mb-6 opacity-90">
            Ready to Join These Success Stories?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Your business deserves a website that works as hard as you do.
          </p>
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started for $60/month
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}