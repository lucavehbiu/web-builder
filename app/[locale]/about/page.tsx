import Link from 'next/link'
import MobileNav from '@/components/ui/mobile-nav'
import OptimizedImage from '@/components/ui/optimized-image'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { Locale } from '@/lib/i18n/config'
import LanguageSwitcher from '@/components/ui/language-switcher'

export default async function About({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const beliefs = [
    {
      icon: "💯",
      title: dictionary.about.beliefs.transparency.title,
      description: dictionary.about.beliefs.transparency.description
    },
    {
      icon: "🤝",
      title: dictionary.about.beliefs.partnership.title,
      description: dictionary.about.beliefs.partnership.description
    },
    {
      icon: "⚡",
      title: dictionary.about.beliefs.efficiency.title,
      description: dictionary.about.beliefs.efficiency.description
    },
    {
      icon: "🎯",
      title: dictionary.about.beliefs.focus.title,
      description: dictionary.about.beliefs.focus.description
    }
  ]

  const skills = [
    { name: dictionary.about.skills.webDevelopment, percentage: 95 },
    { name: dictionary.about.skills.uiuxDesign, percentage: 85 },
    { name: dictionary.about.skills.seoOptimization, percentage: 80 },
    { name: dictionary.about.skills.performanceOptimization, percentage: 90 },
    { name: dictionary.about.skills.clientCommunication, percentage: 100 }
  ]

  const highlights = [
    dictionary.about.skills.highlight1,
    dictionary.about.skills.highlight2,
    dictionary.about.skills.highlight3,
    dictionary.about.skills.highlight4,
    dictionary.about.skills.highlight5,
    dictionary.about.skills.highlight6
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-white">
              {dictionary.navigation.logoText}
            </div>
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              <Link href={`/${locale}`} className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label={dictionary.navigation.homeLabel}>
                {dictionary.common.home}
              </Link>
              <Link href={`/${locale}/about`} className="text-white font-medium" aria-label={dictionary.navigation.aboutLabel}>
                {dictionary.common.about}
              </Link>
              <Link href={`/${locale}/services`} className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label={dictionary.navigation.servicesLabel}>
                {dictionary.common.services}
              </Link>
              <Link href={`/${locale}/portfolio`} className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label={dictionary.navigation.portfolioLabel}>
                {dictionary.common.portfolio}
              </Link>
              <LanguageSwitcher locale={locale} />
            </nav>
            <Link
              href={`/${locale}/get-started`}
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-xs"
            >
              {dictionary.common.getStarted}
            </Link>
            
            {/* Mobile Navigation */}
            <MobileNav theme="dark" locale={locale} dictionary={dictionary} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8 inline-flex items-center rounded-full bg-emerald-500/10 px-6 py-2 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20 backdrop-blur-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-ping"></div>
                {locale === 'sq' ? 'Zhvilluesi Juaj Personal' : 'Your Personal Developer'}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
                  {dictionary.about.hero.title}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 relative">
                  {dictionary.about.hero.titleHighlight}
                  {/* Underline decoration */}
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {dictionary.about.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Link
                  href={`/${locale}/get-started`}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center">
                    {dictionary.about.cta.button}
                    <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-3xl blur-xl"></div>
                <div className="relative w-96 h-[28rem] bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 shadow-xl">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <OptimizedImage
                      src="https://storage.googleapis.com/web-builder-luca/profile.webp"
                      alt="Profile photo"
                      width={320}
                      height={384}
                      className="w-full h-full object-cover rounded-2xl"
                      priority={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 C240,100 480,80 720,90 C960,100 1200,110 1440,90 L1440,120 Z"/>
          </svg>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{dictionary.about.story.title}</h2>
          <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
            <p className="mb-6">
              {dictionary.about.story.paragraph1}
            </p>
            <p className="mb-6">
              {dictionary.about.story.paragraph2}
            </p>
            <p className="mb-6">
              {dictionary.about.story.paragraph3}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {dictionary.about.story.conclusion}
            </p>
          </div>
        </div>
      </section>

      {/* What I Believe In */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">{dictionary.about.beliefs.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beliefs.map((belief) => (
              <div key={belief.title} className="bg-white rounded-2xl p-8 shadow-xs hover:shadow-md transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{belief.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{belief.title}</h3>
                <p className="text-gray-600 leading-relaxed">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Skills */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">{dictionary.about.skills.title}</h2>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Technical Skills */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">{dictionary.about.skills.technicalTitle}</h3>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-8">{dictionary.about.skills.whatIBringTitle}</h3>
              <div className="space-y-4">
                {highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start">
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
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {dictionary.about.cta.title}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {dictionary.about.cta.subtitle}
          </p>
          <Link
            href={`/${locale}/get-started`}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center">
              {dictionary.about.cta.button}
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