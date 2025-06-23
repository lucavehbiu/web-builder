import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-xl font-bold text-gray-900">
              WebBuilder
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Services
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Portfolio
              </a>
            </nav>

            {/* CTA Button */}
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              Start Your Project
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              Professional Web Development
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Build Your Dream
              <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Website Today
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into stunning, high-performance websites that captivate your audience and drive results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Get Started Free
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold border border-gray-300 hover:bg-gray-50 hover:scale-105 transition-all duration-200 shadow-sm">
                View Our Work
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col items-center">
              <p className="text-gray-500 text-sm mb-4">Trusted by 500+ businesses worldwide</p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="text-gray-400 font-semibold">Company A</div>
                <div className="text-gray-400 font-semibold">Company B</div>
                <div className="text-gray-400 font-semibold">Company C</div>
                <div className="text-gray-400 font-semibold">Company D</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-16 h-16 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </section>

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
