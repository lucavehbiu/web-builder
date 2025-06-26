import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Pricing from '@/components/sections/pricing'
import Testimonials from '@/components/sections/testimonials'
import MobileNav from '@/components/ui/mobile-nav'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header with Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-xl font-bold text-white">
              WebBuilder
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              <Link href="/" className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label="Go to homepage">
                Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label="Learn about the founder and company">
                About
              </Link>
              <Link href="/services" className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label="View our website services">
                Services
              </Link>
              <Link href="/portfolio" className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label="View our portfolio of completed websites">
                Portfolio
              </Link>
            </nav>

            {/* CTA Button - Hidden on mobile */}
            <Link
              href="/get-started"
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-xs"
            >
              Start Your Project
            </Link>

            {/* Mobile Navigation */}
            <MobileNav theme="dark" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}
