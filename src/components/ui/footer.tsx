import Link from 'next/link'



export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main footer content */}
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-8 xl:col-span-1">
            <div>
              <h2 className="text-2xl font-bold">WebBuilder</h2>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Professional websites for small businesses. $60/month, all-inclusive.
              </p>
            </div>
          </div>

          {/* Links sections */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Services */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/services/website-creation"
                      className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Website Creation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/hosting"
                      className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Hosting & Maintenance
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/updates"
                      className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Monthly Updates
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      About Me
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio"
                      className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/get-started"
                      className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Get Started
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-1 md:gap-8">
              {/* Support */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 lg:mt-24">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link
                href="/privacy"
                className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
            <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
              © {new Date().getFullYear()} WebBuilder. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

