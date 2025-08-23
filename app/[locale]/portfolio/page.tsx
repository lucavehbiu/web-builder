import Link from 'next/link'
import Header from '@/components/ui/header'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { Locale } from '@/lib/i18n/config'

export const runtime = 'edge'

export default async function Portfolio({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const projects = [
    {
      title: "OdaShop",
      category: "E-commerce",
      description: "An innovative e-commerce platform that uses Instagram API to collect posts and OpenAI API to parse product information, automating product creation from Instagram sources. Built for the Albanian market where Instagram dominates social commerce, featuring Make.com automation, newsletter integration, Algolia search with suggestions, purchase history, and similar item recommendations.",
      results: [
        "Automated product creation from Instagram",
        "Advanced search with AI-powered suggestions",
        "Complete e-commerce solution from scratch",
        "Daily automation for new product updates"
      ],
      technologies: ["Instagram API", "OpenAI API", "Make.com Automation", "Algolia Search"],
      screenshot: "https://storage.googleapis.com/web-builder-luca/odashop.webp",
      url: "https://odashop.al/"
    },
    {
      title: "Mosaic AML",
      category: "FinTech",
      description: "An AI-powered anti-money laundering educational platform designed to train AML analysts to detect hard fraud cases and reduce false positives and false negatives. Features a comprehensive learning system similar to Duolingo with progress tracking, user authentication, dashboard, and AI-generated use cases via OpenAI API.",
      results: [
        "Full-stack application with authentication",
        "AI-powered educational content generation",
        "User progress tracking and analytics",
        "Comprehensive user dashboard and profiles"
      ],
      technologies: ["OpenAI API", "User Authentication", "Progress Tracking", "AI Integration"],
      screenshot: "https://storage.googleapis.com/web-builder-luca/mosaic.webp",
      url: "https://mosaic-aml.com"
    },
    {
      title: "Kallmi Bukur Restaurant",
      category: "Restaurant & E-commerce",
      description: "A family-owned restaurant in Kallmi, Durres that created a small paradise corner. The website integrates both restaurant services and an online shop for their locally produced products, combining dining experience with local product sales.",
      results: [
        "Integrated restaurant and e-commerce platform",
        "Local product marketplace",
        "Family business digital presence",
        "Enhanced customer engagement"
      ],
      technologies: ["E-commerce Integration", "Restaurant Management", "Product Catalog", "Local Business"],
      screenshot: "https://storage.googleapis.com/web-builder-luca/kallmibukur.webp",
      url: "https://www.kallmibukur.al/"
    },
    {
      title: "PlayPals",
      category: "Social Platform",
      description: "A comprehensive social media platform for sports enthusiasts looking to join teams, create them, and participate in nearby events for any kind of sports. Features include social feed, chat, notifications, team creation, user profiles, polls, calendars, and event management.",
      results: [
        "Full social media platform for sports",
        "Real-time chat and notifications",
        "Team and event management system",
        "Complete user engagement features"
      ],
      technologies: ["Social Media Features", "Real-time Chat", "Event Management", "User Profiles"],
      screenshot: "https://storage.googleapis.com/web-builder-luca/playpals.webp",
      url: "https://play-pals-adengripshi.replit.app/auth"
    },
    {
      title: "Cocomoco",
      category: "Food & Beverage",
      description: "A healthy snack startup revolutionizing the food industry in the Balkans by providing healthy snack alternatives to chips, gummies, and other processed foods. The landing page showcases their mission to bring healthier snacking options to the region.",
      results: [
        "Modern landing page for startup launch",
        "Clear brand positioning in health food market",
        "Engaging product showcase",
        "Mobile-optimized for target demographic"
      ],
      technologies: ["Next.js", "Responsive Design", "Modern UI/UX", "Brand Showcase"],
      screenshot: "https://storage.googleapis.com/web-builder-luca/cocomoco.webp",
      url: "https://v0-new-project-syx0fd1pxxb-8v97caug2-lucas-projects-7cbc24c5.vercel.app/"
    },
    {
      title: "ReelMetrics",
      category: "Casino Analytics",
      description: "A comprehensive casino consultancy platform where casinos upload their data and receive complex dashboards with detailed insights for optimizing their floors and making strategic decisions. Built with enterprise-grade architecture using AWS, PostgreSQL, Vertica, Lambda, Rails, React, Python, Pentaho, ECS, and Kubernetes.",
      results: [
        "Enterprise-scale data analytics platform",
        "Complex dashboard with actionable insights",
        "Strategic decision-making tools for casinos",
        "Scalable cloud infrastructure implementation"
      ],
      technologies: ["AWS", "PostgreSQL", "Vertica", "Lambda", "Rails", "React", "Python", "Pentaho", "ECS", "Kubernetes"],
      screenshot: "https://storage.googleapis.com/web-builder-luca/reelmetrics.webp",
      url: "https://www.reelmetrics.com/"
    }
  ]

  const testimonials = [
    {
      quote: "The platform perfectly captures our mission to revolutionize healthy snacking in the Balkans. The modern design and clear messaging have been instrumental in our startup launch.",
      name: "Cocomoco Team",
      business: "Cocomoco",
      avatar: "CC"
    },
    {
      quote: "The AI-powered educational platform has transformed how we train AML analysts. The progress tracking and interactive learning approach significantly improved our training outcomes.",
      name: "Mosaic Team",
      business: "Mosaic AML",
      avatar: "MA"
    },
    {
      quote: "Integrating our restaurant with an online shop for local products was exactly what our family business needed. The platform beautifully showcases both our dining experience and local products.",
      name: "Kallmi Bukur Family",
      business: "Kallmi Bukur Restaurant",
      avatar: "KB"
    },
    {
      quote: "PlayPals has become the go-to platform for sports enthusiasts in our community. The comprehensive features for team management and event organization exceeded our expectations.",
      name: "PlayPals Community",
      business: "PlayPals",
      avatar: "PP"
    }
  ]

  const process = [
    {
      step: "1",
      title: dictionary.portfolioPage.process.discovery.title,
      description: dictionary.portfolioPage.process.discovery.description
    },
    {
      step: "2",
      title: dictionary.portfolioPage.process.design.title,
      description: dictionary.portfolioPage.process.design.description
    },
    {
      step: "3",
      title: dictionary.portfolioPage.process.development.title,
      description: dictionary.portfolioPage.process.development.description
    },
    {
      step: "4",
      title: dictionary.portfolioPage.process.launch.title,
      description: dictionary.portfolioPage.process.launch.description
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <Header locale={locale} dictionary={dictionary} />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse"></div>
          
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40 text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-emerald-500/10 px-6 py-2 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20 backdrop-blur-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-ping"></div>
            {dictionary.portfolioPage.hero.badge}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
              {dictionary.portfolioPage.hero.title}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 relative">
              {dictionary.portfolioPage.hero.titleHighlight}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            {dictionary.portfolioPage.hero.subtitle}
          </p>
          
          <p className="text-lg text-gray-400 leading-relaxed mb-12 max-w-3xl mx-auto">
            {dictionary.portfolioPage.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href={`/${locale}/get-started`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                {dictionary.portfolioPage.cta.button}
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 C240,100 480,80 720,90 C960,100 1200,110 1440,90 L1440,120 Z"/>
          </svg>
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
                    <div className="bg-white rounded-lg p-6 shadow-xs">
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src={project.screenshot}
                          alt={`${project.title} screenshot`}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
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
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">{dictionary.portfolioPage.projects.resultsLabel}</h4>
                    <ul className="space-y-3">
                      {project.results.map((result) => (
                        <li key={result} className="flex items-start">
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
                    {project.technologies.map((tech) => (
                      <span key={tech} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* URL */}
                  <div className="mt-8">
                    <Link
                      href={project.url}
                      className="text-blue-600 font-medium hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {dictionary.portfolioPage.projects.viewProject}
                    </Link>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">{dictionary.portfolioPage.testimonials.title}</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-2xl p-8 shadow-xs hover:shadow-md transition-all duration-300">
                {/* Quote */}
                <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{dictionary.portfolioPage.process.title}</h2>
          <p className="text-xl text-gray-600 mb-16 text-center">{dictionary.portfolioPage.process.subtitle}</p>

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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {dictionary.portfolioPage.cta.title}
          </h2>
          <h3 className="text-2xl font-semibold mb-6 opacity-90">
            {dictionary.portfolioPage.cta.subtitle}
          </h3>
          <p className="text-xl mb-8 opacity-90">
            {dictionary.portfolioPage.cta.description}
          </p>
          <Link
            href={`/${locale}/get-started`}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center">
              {dictionary.portfolioPage.cta.button}
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}