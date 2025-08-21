'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import MobileNav from '@/components/ui/mobile-nav'
import Logo from '@/components/ui/logo'
import Notification from '@/components/ui/notification'
import { Locale } from '@/lib/i18n/config'
import { getDictionaryClient } from '@/lib/i18n/get-dictionary-client'
import { Dictionary } from '@/lib/i18n/types'
import LanguageSwitcher from '@/components/ui/language-switcher'
import { useEffect } from 'react'

export default function GetStarted() {
  const params = useParams()
  const locale = params.locale as Locale
  const [dictionary, setDictionary] = useState<Dictionary | null>(null)
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
  
  // Random number of people who signed up today (between 8-24)
  const [signupsToday] = useState(() => Math.floor(Math.random() * 17) + 8)

  useEffect(() => {
    getDictionaryClient(locale).then(setDictionary)
  }, [locale])

  if (!dictionary) return null

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
      showNotification(dictionary.getStarted.notifications.fillRequired, 'error')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Here you would typically submit to your backend or Google Forms
      // Form submitted with formData
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showNotification(dictionary.getStarted.notifications.submitSuccess, 'success')
      
      // Optionally reset form or redirect
      // setFormData({ ... }) // Reset form if needed
      
    } catch {
      // Form submission error occurred
      showNotification(dictionary.getStarted.notifications.submitError, 'error')
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo size="md" />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-8" role="navigation" aria-label="Main navigation">
                <Link href={`/${locale}`} className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label={dictionary.navigation.homeLabel}>
                  {dictionary.common.home}
                </Link>
                <Link href={`/${locale}/about`} className="text-gray-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-xs" aria-label={dictionary.navigation.aboutLabel}>
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
              <Link href={`/${locale}`} className="text-gray-400 hover:text-white">
                ← {dictionary.buttons?.back || 'Back'}
              </Link>
            </div>
            
            {/* Mobile Navigation */}
            <MobileNav theme="dark" locale={locale} dictionary={dictionary} />
          </div>
        </div>
      </header>

      <div className="relative pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
                {dictionary.getStarted.header.title}{" "}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                {dictionary.getStarted.header.price}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {dictionary.getStarted.header.subtitle}
            </p>
            
            {/* Social Proof - People Signing Up */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face&auto=format&q=80"
                  alt="User profile"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=48&h=48&fit=crop&crop=face&auto=format&q=80"
                  alt="User profile"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&auto=format&q=80"
                  alt="User profile"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face&auto=format&q=80"
                  alt="User profile"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
                />
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-semibold text-sm border-2 border-white shadow-lg animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-emerald-400 font-semibold">{signupsToday} {dictionary.common.portfolio === 'Portofoli' ? 'persona' : 'people'}</span> {dictionary.common.portfolio === 'Portofoli' ? 'u regjistruan sot' : 'signed up today'}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                {dictionary.getStarted.progress.step} {currentStep} {dictionary.getStarted.progress.of} 3
              </span>
              <span className="text-sm text-gray-400">
                {Math.round((currentStep / 3) * 100)}% {dictionary.getStarted.progress.complete}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/10">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">{dictionary.getStarted.step1.title}</h2>
                  <p className="text-gray-400">{dictionary.getStarted.step1.subtitle}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.getStarted.step1.businessName} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder={dictionary.getStarted.step1.businessName}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.getStarted.step1.industry} <span className="text-red-400">*</span>
                  </label>
                  <select
                    required
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all [&>option]:bg-gray-800 [&>option]:text-white"
                  >
                    <option value="">{dictionary.getStarted.step1.selectIndustry}</option>
                    {dictionary.getStarted.industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.getStarted.step1.businessDescription} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                    placeholder={dictionary.getStarted.step1.businessDescriptionPlaceholder}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.getStarted.step1.fullName} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder={dictionary.getStarted.step1.fullNamePlaceholder}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.getStarted.step1.email} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={dictionary.getStarted.step1.emailPlaceholder}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.getStarted.step1.phone}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder={dictionary.getStarted.step1.phonePlaceholder}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all"
                  />
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center">
                      {dictionary.getStarted.buttons.nextStep}
                      <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Website Requirements */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">{dictionary.getStarted.step2.title}</h2>
                  <p className="text-gray-400">{dictionary.getStarted.step2.subtitle}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    {dictionary.getStarted.step2.hasWebsite}
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasWebsite"
                        value="yes"
                        checked={formData.hasWebsite === 'yes'}
                        onChange={(e) => handleInputChange('hasWebsite', e.target.value)}
                        className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600 bg-white/10"
                      />
                      <span className="ml-2 text-gray-300">{dictionary.getStarted.step2.hasWebsiteYes}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasWebsite"
                        value="no"
                        checked={formData.hasWebsite === 'no'}
                        onChange={(e) => handleInputChange('hasWebsite', e.target.value)}
                        className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600 bg-white/10"
                      />
                      <span className="ml-2 text-gray-300">{dictionary.getStarted.step2.hasWebsiteNo}</span>
                    </label>
                  </div>
                </div>

                {formData.hasWebsite === 'yes' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {dictionary.getStarted.step2.currentUrl}
                    </label>
                    <input
                      type="url"
                      value={formData.currentWebsiteUrl}
                      onChange={(e) => handleInputChange('currentWebsiteUrl', e.target.value)}
                      placeholder={dictionary.getStarted.step2.urlPlaceholder}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    {dictionary.getStarted.step2.pagesNeeded}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {dictionary.getStarted.pages.map(page => (
                      <label key={page} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.neededPages.includes(page)}
                          onChange={() => handlePageToggle(page)}
                          className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600 bg-white/10 rounded"
                        />
                        <span className="ml-2 text-gray-300">{page}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.getStarted.step2.preferredDomain}
                  </label>
                  <input
                    type="text"
                    value={formData.preferredDomain}
                    onChange={(e) => handleInputChange('preferredDomain', e.target.value)}
                    placeholder={dictionary.getStarted.step2.domainPlaceholder}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all"
                  />
                  <p className="text-sm text-gray-500 mt-1">{dictionary.getStarted.step2.domainNote}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    {dictionary.getStarted.step2.hasBranding}
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasBranding"
                        value="yes"
                        checked={formData.hasBranding === 'yes'}
                        onChange={(e) => handleInputChange('hasBranding', e.target.value)}
                        className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600 bg-white/10"
                      />
                      <span className="ml-2 text-gray-300">{dictionary.getStarted.step2.brandingYes}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasBranding"
                        value="some"
                        checked={formData.hasBranding === 'some'}
                        onChange={(e) => handleInputChange('hasBranding', e.target.value)}
                        className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600 bg-white/10"
                      />
                      <span className="ml-2 text-gray-300">{dictionary.getStarted.step2.brandingSome}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasBranding"
                        value="no"
                        checked={formData.hasBranding === 'no'}
                        onChange={(e) => handleInputChange('hasBranding', e.target.value)}
                        className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600 bg-white/10"
                      />
                      <span className="ml-2 text-gray-300">{dictionary.getStarted.step2.brandingNo}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.getStarted.step2.colorScheme}
                  </label>
                  <input
                    type="text"
                    value={formData.colorScheme}
                    onChange={(e) => handleInputChange('colorScheme', e.target.value)}
                    placeholder={dictionary.getStarted.step2.colorSchemePlaceholder}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all"
                  />
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-white/10 text-gray-300 px-8 py-3 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-200 flex items-center border border-white/20"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {dictionary.getStarted.buttons.back}
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center">
                      {dictionary.getStarted.buttons.nextStep}
                      <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Final Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">{dictionary.getStarted.step3.title}</h2>
                  <p className="text-gray-400">{dictionary.getStarted.step3.subtitle}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.getStarted.step3.launchTimeline}
                  </label>
                  <select
                    value={formData.launchTimeline}
                    onChange={(e) => handleInputChange('launchTimeline', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all [&>option]:bg-gray-800 [&>option]:text-white"
                  >
                    <option value="">{dictionary.getStarted.step3.selectTimeline}</option>
                    {dictionary.getStarted.timelines.map(timeline => (
                      <option key={timeline} value={timeline}>{timeline}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    {dictionary.getStarted.step3.contentReady}
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contentReady"
                        value="yes"
                        checked={formData.contentReady === 'yes'}
                        onChange={(e) => handleInputChange('contentReady', e.target.value)}
                        className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600 bg-white/10"
                      />
                      <span className="ml-2 text-gray-300">{dictionary.getStarted.step3.contentYes}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contentReady"
                        value="some"
                        checked={formData.contentReady === 'some'}
                        onChange={(e) => handleInputChange('contentReady', e.target.value)}
                        className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600 bg-white/10"
                      />
                      <span className="ml-2 text-gray-300">{dictionary.getStarted.step3.contentSome}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contentReady"
                        value="no"
                        checked={formData.contentReady === 'no'}
                        onChange={(e) => handleInputChange('contentReady', e.target.value)}
                        className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600 bg-white/10"
                      />
                      <span className="ml-2 text-gray-300">{dictionary.getStarted.step3.contentNo}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.getStarted.step3.specialRequirements}
                  </label>
                  <textarea
                    value={formData.specialRequirements}
                    onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                    placeholder={dictionary.getStarted.step3.specialRequirementsPlaceholder}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.getStarted.step3.hearAboutUs}
                  </label>
                  <select
                    value={formData.hearAboutUs}
                    onChange={(e) => handleInputChange('hearAboutUs', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all [&>option]:bg-gray-800 [&>option]:text-white"
                  >
                    <option value="">{dictionary.getStarted.step3.selectOption}</option>
                    {dictionary.getStarted.hearAboutOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* What happens next */}
                <div className="bg-emerald-500/10 rounded-2xl p-6 mt-8 border border-emerald-500/20">
                  <h3 className="font-semibold text-white mb-3">{dictionary.getStarted.step3.whatNext}</h3>
                  <ol className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">1</span>
                      {dictionary.getStarted.step3.next1}
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">2</span>
                      {dictionary.getStarted.step3.next2}
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">3</span>
                      {dictionary.getStarted.step3.next3}
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">4</span>
                      {dictionary.getStarted.step3.next4}
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">5</span>
                      {dictionary.getStarted.step3.next5}
                    </li>
                  </ol>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-white/10 text-gray-300 px-8 py-3 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-200 flex items-center border border-white/20"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {dictionary.getStarted.buttons.back}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      group relative overflow-hidden rounded-2xl px-8 py-3 font-bold shadow-xl transition-all duration-300
                      ${isSubmitting 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-2xl transform hover:scale-105'
                      } text-white
                    `}
                  >
                    {!isSubmitting && <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
                    <span className="relative flex items-center">
                      {isSubmitting ? (
                        <>
                          <svg className="mr-2 h-5 w-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          {dictionary.getStarted.buttons.submitting}
                        </>
                      ) : (
                        <>
                          {dictionary.getStarted.buttons.submit}
                          <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  {dictionary.getStarted.step3.terms}{' '}
                  <Link href={`/${locale}/terms`} className="text-emerald-400 hover:underline">{dictionary.getStarted.step3.termsOfService}</Link>
                  {' '}{dictionary.getStarted.step3.and}{' '}
                  <Link href={`/${locale}/privacy`} className="text-emerald-400 hover:underline">{dictionary.getStarted.step3.privacyPolicy}</Link>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>


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