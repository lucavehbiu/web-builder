import Link from 'next/link'

export default function About() {
  const beliefs = [
    {
      icon: "💯",
      title: "Transparency",
      description: "No hidden fees, no surprises. You know exactly what you're paying for every month."
    },
    {
      icon: "🤝",
      title: "Partnership",
      description: "I&apos;m not just a service provider - I&apos;m your partner in building your online presence."
    },
    {
      icon: "⚡",
      title: "Efficiency",
      description: "Quick turnarounds without sacrificing quality. Your website will be live in 1-2 weeks."
    },
    {
      icon: "🎯",
      title: "Focus",
      description: "I specialize in small businesses because that's where I can make the biggest impact."
    }
  ]

  const skills = [
    { name: "Web Development", percentage: 95 },
    { name: "UI/UX Design", percentage: 85 },
    { name: "SEO Optimization", percentage: 80 },
    { name: "Performance Optimization", percentage: 90 },
    { name: "Client Communication", percentage: 100 }
  ]

  const highlights = [
    "10+ years of web development experience",
    "Direct communication - no middlemen or account managers",
    "Fast response times and personal attention",
    "Modern, secure, and scalable solutions",
    "Ongoing support and maintenance included",
    "Flexible and understanding of small business needs"
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
              <Link href="/about" className="text-blue-600 font-medium">
                About
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Hi, I&apos;m Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Web Developer
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                I help small businesses establish a professional online presence without breaking the bank.
              </p>
            </div>

            {/* Photo Placeholder */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">👨‍💻</div>
                  <p className="text-gray-600 font-medium">Your photo here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Story</h2>
          <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
            <p className="mb-6">
              After years of working with enterprise clients, I noticed something troubling: small businesses were being priced out of having a professional web presence.
            </p>
            <p className="mb-6">
              Quotes of $5,000+ for a simple website, plus hundreds per month for hosting? That didn&apos;t sit right with me. I knew there had to be a better way.
            </p>
            <p className="mb-6">
              So I created WebBuilder - a simple, transparent service that gives small businesses everything they need for one affordable monthly price.
            </p>
            <p className="text-lg font-semibold text-gray-900">
              No setup fees. No surprises. Just professional websites that work.
            </p>
          </div>
        </div>
      </section>

      {/* What I Believe In */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">What I Believe In</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beliefs.map((belief) => (
              <div key={belief.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{belief.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{belief.title}</h3>
                <p className="text-gray-600 leading-relaxed">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Skills */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">Experience & Skills</h2>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Technical Skills */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Technical Skills</h3>
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What I Bring */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">What I Bring</h3>
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to give your business the professional web presence it deserves?
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