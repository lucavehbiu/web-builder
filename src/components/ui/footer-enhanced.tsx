'use client'

import { useState } from 'react'
import Link from 'next/link'
import Notification from './notification'

// Social media icons (you can replace with your preferred icon library)
const GitHubIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
  </svg>
)

const TwitterIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
  </svg>
)

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/lucavehbiu/', icon: GitHubIcon },
  { name: 'Twitter', href: '#', icon: TwitterIcon },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/luca-vehbiu/', icon: LinkedInIcon },
] 

export default function FooterEnhanced() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error' | 'info'
    isVisible: boolean
  }>({
    message: '',
    type: 'success',
    isVisible: false
  })

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({
      message,
      type,
      isVisible: true
    })
  }

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }))
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      showNotification('Please enter your email address.', 'error')
      return
    }

    if (!validateEmail(email)) {
      showNotification('Please enter a valid email address.', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call for newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would typically send to your newsletter service
      // Newsletter subscription for: email
      
      showNotification('Thank you for subscribing! You\'ll receive updates soon.', 'success')
      setEmail('') // Clear the input
      
    } catch {
      // Newsletter subscription error occurred
      showNotification('Sorry, there was an error. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-3">WebBuilder</h2>
            <p className="text-sm text-gray-300 mb-6 max-w-md">
              Professional websites for small businesses. $60/month, all-inclusive.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                  aria-label={`Follow us on ${item.name}`}
                >
                  <item.icon />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-300 mb-4">
              Get tips to grow your business online.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 text-sm bg-white/5 border border-gray-700 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 text-sm font-semibold text-white rounded-md transition-colors ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500'}`}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            
            <Link
              href="/get-started"
              className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mt-4"
            >
              Get Started
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-400">
              © {currentYear} WebBuilder. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </footer>
  )
}