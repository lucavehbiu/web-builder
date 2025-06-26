'use client'

import { useState, useEffect, useCallback } from 'react'

interface NotificationProps {
  message: string
  type: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose: () => void
  autoClose?: boolean
  duration?: number
}

export default function Notification({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: NotificationProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClose = useCallback(() => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 300) // Match animation duration
  }, [onClose])

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose()
        }, duration)
        return () => clearTimeout(timer)
      }
    }
  }, [isVisible, autoClose, duration, handleClose])

  if (!isVisible) return null

  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  const iconStyles = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-blue-400'
  }

  const SuccessIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )

  const ErrorIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )

  const InfoIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )

  const icons = {
    success: SuccessIcon,
    error: ErrorIcon,
    info: InfoIcon
  }

  const IconComponent = icons[type]

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div
        className={`
          rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out
          ${typeStyles[type]}
          ${isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
      >
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${iconStyles[type]}`}>
            <IconComponent />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className={`
                inline-flex rounded-md p-1.5 focus:outline-hidden focus:ring-2 focus:ring-offset-2
                ${type === 'success' ? 'text-green-500 hover:bg-green-100 focus:ring-green-600' : ''}
                ${type === 'error' ? 'text-red-500 hover:bg-red-100 focus:ring-red-600' : ''}
                ${type === 'info' ? 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600' : ''}
              `}
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}