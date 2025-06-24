import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Pricing from '@/components/sections/pricing'
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

      {/* Features Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose WebBuilder?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with creative design to deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">Optimized for speed and performance, ensuring your site loads instantly.</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile First</h3>
              <p className="text-gray-600">Responsive designs that look perfect on every device and screen size.</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Design</h3>
              <p className="text-gray-600">Unique, tailored designs that perfectly reflect your brand identity.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
