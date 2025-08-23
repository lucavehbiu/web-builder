'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Notification from '@/components/ui/notification'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dictionary } from '@/lib/i18n/types'
import { Locale } from '@/lib/i18n/config'
import { ChevronRight, ChevronLeft, Send, CreditCard, MessageCircle, Shield, Lock } from 'lucide-react'

interface GetStartedFormProps {
  dictionary: Dictionary
  locale: Locale
}

export default function GetStartedForm({ dictionary, locale }: GetStartedFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null)
  const [showTerms, setShowTerms] = useState(false)
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
    countryCode: '+355',
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
    hearAboutUs: '',
    // Terms acceptance
    acceptedTerms: false
  })
  
  // Random number of people who signed up today (between 8-24) - fixed for hydration
  const [signupsToday, setSignupsToday] = useState(15) // Default to avoid hydration mismatch
  
  // Set random number on client side only
  useEffect(() => {
    setSignupsToday(Math.floor(Math.random() * 17) + 8)
  }, [])

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

  const handleInputChange = (field: string, value: string | string[] | boolean) => {
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
      // Submit to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const result = await response.json()
      
      // Store the lead ID for payment processing
      setSubmittedLeadId(result.leadId)
      
      showNotification(dictionary.getStarted.notifications.submitSuccess, 'success')
      
      // Move to payment step
      setCurrentStep(4)
      
    } catch {
      showNotification(dictionary.getStarted.notifications.submitError, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateStep1 = () => {
    const required = ['businessName', 'industry', 'businessDescription', 'fullName', 'email']
    const missing = required.filter(field => !formData[field as keyof typeof formData].toString().trim())
    
    // Check if all required fields are filled
    if (missing.length > 0) {
      return false
    }
    
    // Validate email format
    if (!validateEmail(formData.email)) {
      return false
    }
    
    return true
  }

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate Step 1 before proceeding
      const required = ['businessName', 'industry', 'businessDescription', 'fullName', 'email']
      const missing = required.filter(field => !formData[field as keyof typeof formData].toString().trim())
      
      if (missing.length > 0) {
        showNotification(dictionary.getStarted.notifications.fillRequired, 'error')
        return
      }
      
      if (!validateEmail(formData.email)) {
        showNotification(
          locale === 'sq' 
            ? 'Ju lutemi vendosni një email të vlefshëm (p.sh. emri@example.com)' 
            : 'Please enter a valid email address (e.g. name@example.com)',
          'error'
        )
        return
      }
    }
    
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handlePayNow = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadId: submittedLeadId,
          email: formData.email,
          businessName: formData.businessName,
          locale,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { checkoutUrl } = await response.json()
      
      // Redirect to Stripe checkout
      window.location.href = checkoutUrl
    } catch {
      showNotification('Failed to process payment. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWaitForContact = () => {
    // Reset form and show thank you message
    setFormData({
      businessName: '',
      industry: '',
      businessDescription: '',
      fullName: '',
      email: '',
      phone: '',
      countryCode: '+355',
      hasWebsite: '',
      currentWebsiteUrl: '',
      neededPages: [],
      preferredDomain: '',
      hasBranding: '',
      colorScheme: '',
      launchTimeline: '',
      contentReady: '',
      specialRequirements: '',
      hearAboutUs: '',
      acceptedTerms: false
    })
    setCurrentStep(1)
    setSubmittedLeadId(null)
    showNotification(locale === 'sq' ? 'Faleminderit! Do të kontaktohemi brenda 24 orëve.' : 'Thank you! We will contact you within 24 hours.', 'success')
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="relative pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6">
            <span className="block text-white mb-2">
              {dictionary.getStarted.header.title}
            </span>
            <span className="block text-emerald-400 font-semibold">
              {dictionary.getStarted.header.price}
            </span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto font-light">
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
              {currentStep === 4 ? (locale === 'sq' ? 'Pagesë' : 'Payment') : `${dictionary.getStarted.progress.step} ${currentStep} ${dictionary.getStarted.progress.of} 3`}
            </span>
            <span className="text-sm text-gray-400">
              {currentStep === 4 ? '100%' : `${Math.round((currentStep / 3) * 100)}%`} {dictionary.getStarted.progress.complete}
            </span>
          </div>
          <Progress value={currentStep === 4 ? 100 : (currentStep / 3) * 100} className="h-2" />
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
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  {dictionary.getStarted.step1.businessName} <span className="text-red-400">*</span>
                </Label>
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
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  {dictionary.getStarted.step1.industry} <span className="text-red-400">*</span>
                </Label>
                <select
                  required
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all [&>option]:bg-gray-800 [&>option]:text-white [&>option]:py-2"
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
                <div className="flex">
                  <select
                    value={formData.countryCode || '+355'}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    className="px-3 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all [&>option]:bg-gray-800 [&>option]:text-white"
                  >
                    <option value="+355">🇦🇱 +355</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+43">🇦🇹 +43</option>
                    <option value="+32">🇧🇪 +32</option>
                    <option value="+30">🇬🇷 +30</option>
                    <option value="+381">🇷🇸 +381</option>
                    <option value="+383">🇽🇰 +383</option>
                    <option value="+382">🇲🇪 +382</option>
                    <option value="+387">🇧🇦 +387</option>
                    <option value="+385">🇭🇷 +385</option>
                    <option value="+386">🇸🇮 +386</option>
                    <option value="+389">🇲🇰 +389</option>
                  </select>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder={locale === 'sq' ? '69 123 4567' : '123 456 7890'}
                    className="flex-1 px-4 py-3 bg-white/10 border border-l-0 border-white/20 rounded-r-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep1()}
                  size="lg"
                >
                  {dictionary.getStarted.buttons.nextStep}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
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
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="bg-white/10 text-gray-300 border-white/20 hover:bg-white/20"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {dictionary.getStarted.buttons.back}
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  size="lg"
                >
                  {dictionary.getStarted.buttons.nextStep}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
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
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all [&>option]:bg-gray-800 [&>option]:text-white [&>option]:py-2"
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
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/15 transition-all [&>option]:bg-gray-800 [&>option]:text-white [&>option]:py-2"
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

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="terms"
                    checked={formData.acceptedTerms}
                    onCheckedChange={(checked) => handleInputChange('acceptedTerms', checked === true)}
                    className="h-3.5 w-3.5"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer font-light">
                    {locale === 'sq' 
                      ? (
                        <span>
                          Unë pranoj{' '}
                          <button 
                            type="button"
                            onClick={() => setShowTerms(!showTerms)}
                            className="text-emerald-400 hover:text-emerald-300 underline"
                          >
                            kushtet dhe shërbimet
                          </button>
                          {' '}dhe politikën e privatësisë
                        </span>
                      )
                      : (
                        <span>
                          I accept the{' '}
                          <button 
                            type="button"
                            onClick={() => setShowTerms(!showTerms)}
                            className="text-emerald-400 hover:text-emerald-300 underline"
                          >
                            terms and conditions
                          </button>
                          {' '}and privacy policy
                        </span>
                      )}
                  </Label>
                </div>
                
                {showTerms && (
                  <div className="bg-white/5 rounded-lg border border-white/20 p-4">
                    <ScrollArea className="h-32 w-full">
                      <div className="text-sm text-gray-300 space-y-3 pr-4">
                        <div>
                          <p className="font-medium text-white mb-1">1. {locale === 'sq' ? 'Shërbimi' : 'Service'}</p>
                          <p className="font-light">{locale === 'sq' 
                            ? 'Ne ofrojmë shërbime zhvillimi dhe mirëmbajtjeje për faqe interneti. Shërbimi përfshin dizajn, zhvillim, hosting dhe mbështetje.'
                            : 'We provide website development and maintenance services. Service includes design, development, hosting and support.'}
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-white mb-1">2. {locale === 'sq' ? 'Pagesa' : 'Payment'}</p>
                          <p className="font-light">{locale === 'sq'
                            ? 'Pagesa është mujore në shumën €39.9/muaj. Pagesa është e detyrueshme dhe bëhet paraprakisht për çdo muaj.'
                            : 'Payment is monthly at €39.9/month. Payment is mandatory and made in advance for each month.'}
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-white mb-1">3. {locale === 'sq' ? 'Anulimi' : 'Cancellation'}</p>
                          <p className="font-light">{locale === 'sq'
                            ? 'Mund të anuloni shërbimin në çdo kohë me njoftim 30-ditor. Nuk ka tarifa anulimi.'
                            : 'You may cancel the service at any time with 30-day notice. No cancellation fees.'}
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-white mb-1">4. {locale === 'sq' ? 'Përgjegjësia' : 'Responsibility'}</p>
                          <p className="font-light">{locale === 'sq'
                            ? 'Ne jemi përgjegjës për mirëmbajtjen dhe funksionimin e faqes suaj. Ju jeni përgjegjës për përmbajtjen që siguroni.'
                            : 'We are responsible for maintaining and operating your website. You are responsible for content you provide.'}
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-white mb-1">5. {locale === 'sq' ? 'Privatësia' : 'Privacy'}</p>
                          <p className="font-light">{locale === 'sq'
                            ? 'Të dhënat tuaja mbrohen sipas politikës sonë të privatësisë. Nuk i ndajmë të dhënat me palë të treta.'
                            : 'Your data is protected according to our privacy policy. We do not share data with third parties.'}
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-white mb-1">6. {locale === 'sq' ? 'Ndërrimi i Kushteve' : 'Terms Changes'}</p>
                          <p className="font-light">{locale === 'sq'
                            ? 'Ne rezervojmë të drejtën për të ndryshuar këto kushte me njoftim paraprak.'
                            : 'We reserve the right to change these terms with prior notice.'}
                          </p>
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="bg-white/10 text-gray-300 border-white/20 hover:bg-white/20"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {dictionary.getStarted.buttons.back}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.acceptedTerms}
                  className={`
                    ${isSubmitting || !formData.acceptedTerms
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                    }
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      {dictionary.getStarted.buttons.submitting}
                    </>
                  ) : (
                    <>
                      {dictionary.getStarted.buttons.submit}
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Payment Options */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {locale === 'sq' ? 'Zgjidh Opsionin e Pagesës' : 'Choose Payment Option'}
                </h2>
                <p className="text-gray-400">
                  {locale === 'sq' 
                    ? 'Zgjidh nëse dëshiron të paguash tani apo të presësh për kontakt' 
                    : 'Choose whether to pay now or wait for our contact'}
                </p>
              </div>

              {/* Payment Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Pay Now Option */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl opacity-75 group-hover:opacity-100 transition duration-300 blur"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        {locale === 'sq' ? 'Kompletoni Sot' : 'Complete Setup Today'}
                      </h3>
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                        {locale === 'sq' ? 'KURSE €500' : 'SAVE €500'}
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">€39.9</span>
                        <span className="text-xl font-bold text-gray-400 line-through">€49.9</span>
                        <span className="text-base font-normal text-gray-400">
                          {locale === 'sq' ? '/muaj' : '/month'}
                        </span>
                      </div>
                      <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                        {locale === 'sq' ? '20% ZBRITJE - 3 MUAJT E PARË' : '20% OFF - FIRST 3 MONTHS'}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-4">
                      {locale === 'sq' 
                        ? '3 ditë provë falas - anullo kur të duash' 
                        : '3-day free trial - cancel anytime'}
                    </p>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
                      <div className="text-center">
                        <h4 className="text-white font-bold text-sm mb-2">
                          {locale === 'sq' ? 'Çfarë Përfshihet për €39.9/muaj:' : "What's Included for €39.9/month:"}
                        </h4>
                        <ul className="space-y-1 text-xs text-gray-300">
                          <li>✓ {locale === 'sq' ? 'Instalim komplet faqeje (€500 vlerë - FALAS)' : 'Complete website setup (€500 value - FREE)'}</li>
                          <li>✓ {locale === 'sq' ? 'Dizajn profesional (€1000 vlerë - FALAS)' : 'Professional design (€1000 value - FREE)'}</li>
                          <li>✓ {locale === 'sq' ? 'Domain-i juaj (.com/.al)' : 'Your own domain (.com/.al)'}</li>
                          <li>✓ {locale === 'sq' ? 'Hosting i shpejtë dhe i sigurt' : 'Fast secure hosting'}</li>
                          <li>✓ {locale === 'sq' ? 'Certifikatë sigurie SSL' : 'SSL security certificate'}</li>
                          <li>✓ {locale === 'sq' ? 'Përditësime mujore të përmbajtjes' : 'Monthly content updates'}</li>
                          <li>✓ {locale === 'sq' ? 'Mbështetje 24/7' : '24/7 support'}</li>
                        </ul>
                      </div>
                    </div>

                    <ul className="space-y-2 text-sm text-gray-300 mb-6">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {locale === 'sq' ? 'Fillim i menjëhershëm' : 'Immediate start'}
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {locale === 'sq' ? 'Prioritet i lartë' : 'High priority'}
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {locale === 'sq' ? 'Kthim i plotë brenda 3 ditëve' : '100% refund within 3 days'}
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {locale === 'sq' ? 'Mbështetje 24/7' : '24/7 support'}
                      </li>
                    </ul>

                    <Button
                      type="button"
                      onClick={handlePayNow}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          {locale === 'sq' ? 'Po përpunohet...' : 'Processing...'}
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          {locale === 'sq' ? 'Fillo Tani - €39.9/muaj' : 'Start Now - €39.9/month'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Wait for Contact Option */}
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">
                      {locale === 'sq' ? 'Pres Kontaktin' : 'Wait for Contact'}
                    </h3>
                    <div className="bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                      {locale === 'sq' ? 'FALAS' : 'FREE'}
                    </div>
                  </div>
                  
                  <div className="text-3xl font-black text-white mb-2">
                    {locale === 'sq' ? 'Falas' : 'Free'}
                    <span className="text-base font-normal text-gray-400 ml-2">
                      {locale === 'sq' ? 'konsultim' : 'consultation'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-4">
                    {locale === 'sq' 
                      ? 'Pa angazhim - diskutojmë së pari' 
                      : 'No commitment - we discuss first'}
                  </p>

                  <ul className="space-y-2 text-sm text-gray-300 mb-6">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === 'sq' ? 'Konsultim falas' : 'Free consultation'}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === 'sq' ? 'Ofertë e personalizuar' : 'Custom quote'}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === 'sq' ? 'Përgjigje brenda 24 orëve' : 'Response within 24 hours'}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === 'sq' ? 'Pa angazhim' : 'No commitment'}
                    </li>
                  </ul>

                  <Button
                    type="button"
                    onClick={handleWaitForContact}
                    variant="outline"
                    className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
                    size="lg"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {locale === 'sq' ? 'Kontakto Më Vonë' : 'Contact Me Later'}
                  </Button>
                </div>
              </div>

              {/* Refund Policy */}
              <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="font-semibold text-white">
                    {locale === 'sq' ? '7-Ditë Garanci Kthimi të Plotë' : '7-Day Full Refund Guarantee'}
                  </h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {locale === 'sq' 
                    ? 'Nëse nuk je i kënaqur me shërbimin tonë brenda 7 ditëve të para, do të merrësh kthimin e plotë të parave - pa pyetje. Ne jemi të sigurt që do të jesh i kënaqur me punën tonë profesionale.' 
                    : "If you're not satisfied with our service within the first 7 days, you'll get a full refund - no questions asked. We're confident you'll love our professional work."}
                </p>
              </div>

              {/* Security Badge */}
              <div className="text-center">
                <div className="inline-flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/10">
                  <Lock className="w-4 h-4 text-emerald-400 mr-2" />
                  <span className="text-xs text-gray-400">
                    {locale === 'sq' ? 'Pagesa e sigurt me Stripe' : 'Secure payment with Stripe'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </form>
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