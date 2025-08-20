'use client'

import { useState } from 'react'
import Link from 'next/link'
import FeaturesCompact from '@/components/sections/features-compact'
import MobileNav from '@/components/ui/mobile-nav'
import Notification from '@/components/ui/notification'

export default function GetStarted() {
  const [currentStep, setCurrentStep] = useState(1)
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
  const [formData, setFormData] = useState({
    // Step 1
    businessName: '',
    industry: '',
    businessDescription: '',
    fullName: '',
    email: '',
    phone: '',
    // Step 2
    hasWebsite: '',
    currentWebsiteUrl: '',
    neededPages: [] as string[],
    preferredDomain: '',
    hasBranding: '',
    colorScheme: '',
    // Step 3
    launchTimeline: '',
    contentReady: '',
    specialRequirements: '',
    hearAboutUs: ''
  })

  const industries = [
    'Restaurant/Food Service',
    'Healthcare/Medical',
    'Legal Services',
    'Real Estate',
    'Retail/E-commerce',
    'Professional Services',
    'Construction/Contractors',
    'Beauty/Wellness',
    'Fitness/Gym',
    'Education/Training',
    'Technology',
    'Non-profit',
    'Other'
  ]

  const pages = [
    'Homepage',
    'About',
    'Services/Products',
    'Contact',
    'Portfolio/Gallery',
    'Blog',
    'Testimonials',
    'FAQ'
  ]

  const timelines = [
    'ASAP (Rush - additional $50)',
    'Within 1 week',
    'Within 2 weeks',
    'Within 1 month',
    'No rush, whenever convenient'
  ]

  const hearAboutOptions = [
    'Google Search',
    'Social Media',
    'Friend/Family Referral',
    'Business Referral',
    'Online Advertisement',
    'Other'
  ]

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

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePageToggle = (page: string) => {
    const currentPages = formData.neededPages
    if (currentPages.includes(page)) {
      handleInputChange('neededPages', currentPages.filter(p => p !== page))
    } else {
      handleInputChange('neededPages', [...currentPages, page])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.businessName || !formData.industry || !formData.businessDescription || 
        !formData.fullName || !formData.email) {
      showNotification('Please fill in all required fields.', 'error')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Here you would typically submit to your backend or Google Forms
      // Form submitted with formData
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showNotification('Thank you! Your application has been submitted. We\'ll be in touch within 24 hours.', 'success')
      
      // Optionally reset form or redirect
      // setFormData({ ... }) // Reset form if needed
      
    } catch {
      // Form submission error occurred
      showNotification('Sorry, there was an error submitting your application. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">
              WebBuilder
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  About
                </Link>
                <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Services
                </Link>
                <Link href="/portfolio" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Portfolio
                </Link>
              </nav>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                ← Back to Home
              </Link>
            </div>
            
            {/* Mobile Navigation */}
            <MobileNav theme="light" />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Start Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              $60/month Website
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Just a few questions and you&apos;ll be on your way to a professional website.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell Us About Your Business</h2>
                <p className="text-gray-600">Let&apos;s start with the basics</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Your business name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry/Type of Business <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brief Business Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                  placeholder="What does your business do? Who do you serve?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center"
                >
                  Next Step
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Website Requirements */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Website Requirements</h2>
                <p className="text-gray-600">Help us understand what you need</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you currently have a website?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasWebsite"
                      value="yes"
                      checked={formData.hasWebsite === 'yes'}
                      onChange={(e) => handleInputChange('hasWebsite', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Yes, I have a website</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasWebsite"
                      value="no"
                      checked={formData.hasWebsite === 'no'}
                      onChange={(e) => handleInputChange('hasWebsite', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">No, this is my first website</span>
                  </label>
                </div>
              </div>

              {formData.hasWebsite === 'yes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Website URL (if applicable)
                  </label>
                  <input
                    type="url"
                    value={formData.currentWebsiteUrl}
                    onChange={(e) => handleInputChange('currentWebsiteUrl', e.target.value)}
                    placeholder="https://yoursite.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What pages do you need? (Check all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {pages.map(page => (
                    <label key={page} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.neededPages.includes(page)}
                        onChange={() => handlePageToggle(page)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">{page}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have a preferred domain name?
                </label>
                <input
                  type="text"
                  value={formData.preferredDomain}
                  onChange={(e) => handleInputChange('preferredDomain', e.target.value)}
                  placeholder="yourbusiness.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Domain included if under $15/year. Most .com domains qualify.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you have existing branding (logo, colors, etc.)?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasBranding"
                      value="yes"
                      checked={formData.hasBranding === 'yes'}
                      onChange={(e) => handleInputChange('hasBranding', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Yes, I have a logo and brand colors</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasBranding"
                      value="some"
                      checked={formData.hasBranding === 'some'}
                      onChange={(e) => handleInputChange('hasBranding', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">I have some elements but need help</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasBranding"
                      value="no"
                      checked={formData.hasBranding === 'no'}
                      onChange={(e) => handleInputChange('hasBranding', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">No, I need help with branding</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Color Scheme
                </label>
                <input
                  type="text"
                  value={formData.colorScheme}
                  onChange={(e) => handleInputChange('colorScheme', e.target.value)}
                  placeholder="e.g., Blue and white, Earth tones, Modern black/gray"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center"
                >
                  Next Step
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Final Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Final Details</h2>
                <p className="text-gray-600">Almost done!</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When would you like to launch?
                </label>
                <select
                  value={formData.launchTimeline}
                  onChange={(e) => handleInputChange('launchTimeline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select timeline</option>
                  {timelines.map(timeline => (
                    <option key={timeline} value={timeline}>{timeline}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you have content ready?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contentReady"
                      value="yes"
                      checked={formData.contentReady === 'yes'}
                      onChange={(e) => handleInputChange('contentReady', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Yes, I have text and images ready</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contentReady"
                      value="some"
                      checked={formData.contentReady === 'some'}
                      onChange={(e) => handleInputChange('contentReady', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">I have some content but need help</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contentReady"
                      value="no"
                      checked={formData.contentReady === 'no'}
                      onChange={(e) => handleInputChange('contentReady', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">I need help creating content</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements or Features
                </label>
                <textarea
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  placeholder="Any specific features, integrations, or requirements?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about us?
                </label>
                <select
                  value={formData.hearAboutUs}
                  onChange={(e) => handleInputChange('hearAboutUs', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Please select</option>
                  {hearAboutOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* What happens next */}
              <div className="bg-blue-50 rounded-lg p-6 mt-8">
                <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">1</span>
                    I&apos;ll review your information within 24 hours
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">2</span>
                    We&apos;ll schedule a brief call to discuss your project
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">3</span>
                    I&apos;ll create a design mockup for your approval
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">4</span>
                    Your website will be built and launched in 1-2 weeks
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">5</span>
                    Monthly maintenance begins immediately
                  </li>
                </ol>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center
                    ${isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    } text-white
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="mr-2 h-5 w-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting, you agree to our{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </p>
            </div>
          )}
        </form>
      </div>

      {/* Compact Features Section */}
      <FeaturesCompact />

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  )
}