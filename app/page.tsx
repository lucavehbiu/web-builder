import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Pricing from '@/components/sections/pricing'
import Testimonials from '@/components/sections/testimonials'
import FeaturesCompact from '@/components/sections/features-compact'
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
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white font-medium transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white font-medium transition-colors">
                About
              </Link>
              <Link href="/services" className="text-gray-300 hover:text-white font-medium transition-colors">
                Services
              </Link>
              <Link href="/portfolio" className="text-gray-300 hover:text-white font-medium transition-colors">
                Portfolio
              </Link>
            </nav>

            {/* CTA Button */}
            <Link
              href="/get-started"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Start Your Project
            </Link>
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
