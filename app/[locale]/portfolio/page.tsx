import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/ui/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { Locale } from '@/lib/i18n/config'
import { ChevronRight, Check, Circle, ExternalLink } from 'lucide-react'

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
      <section className="relative min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-emerald-500/15 via-emerald-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40 text-center">
          <Badge variant="success" className="mb-8 bg-emerald-500/10 border-emerald-500/20 text-emerald-300">
            <Circle className="w-1.5 h-1.5 fill-emerald-400 text-emerald-400 mr-2" />
            {dictionary.portfolioPage.hero.badge}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6">
            <span className="block text-white mb-2">
              {dictionary.portfolioPage.hero.title}
            </span>
            <span className="block text-emerald-400 font-semibold">
              {dictionary.portfolioPage.hero.titleHighlight}
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto font-light">
            {dictionary.portfolioPage.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href={`/${locale}/get-started`}>
                {dictionary.portfolioPage.cta.button}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 C240,100 480,80 720,90 C960,100 1200,110 1440,90 L1440,120 Z"/>
          </svg>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {projects.map((project, index) => (
              <div key={project.title} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Screenshot */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <Card className="border-gray-100 shadow-sm overflow-hidden">
                    <CardContent className="p-4">
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={project.screenshot}
                          alt={`${project.title} screenshot`}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                    {project.category}
                  </Badge>

                  <h3 className="text-2xl font-medium text-gray-900 mb-4">{project.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 font-light">{project.description}</p>

                  {/* Results */}
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">{dictionary.portfolioPage.projects.resultsLabel}</h4>
                    <ul className="space-y-2">
                      {project.results.map((result) => (
                        <li key={result} className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </div>
                          <span className="text-sm text-gray-700 font-light">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* URL */}
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {dictionary.portfolioPage.projects.viewProject}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-12 text-center">{dictionary.portfolioPage.testimonials.title}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-gray-100 shadow-none hover:shadow-sm transition-shadow">
                <CardContent className="pt-6">
                  <blockquote className="text-base text-gray-700 mb-6 leading-relaxed font-light">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>

                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium text-sm mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 font-light">{testimonial.business}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-4 text-center">{dictionary.portfolioPage.process.title}</h2>
          <p className="text-base text-gray-600 mb-12 text-center font-light">{dictionary.portfolioPage.process.subtitle}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step) => (
              <Card key={step.step} className="text-center border-gray-100 shadow-none">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full flex items-center justify-center text-lg font-medium mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">{step.description}</p>
                </CardContent>
              </Card>
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
          <h2 className="text-2xl md:text-3xl font-medium mb-6">
            {dictionary.portfolioPage.cta.title}
          </h2>
          <p className="text-lg mb-8 opacity-90 font-light">
            {dictionary.portfolioPage.cta.description}
          </p>
          <Button asChild size="lg">
            <Link href={`/${locale}/get-started`}>
              {dictionary.portfolioPage.cta.button}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}