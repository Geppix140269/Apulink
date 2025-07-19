// PATH: app/components/home/HeroLeadMagnet.tsx
'use client'

import React, { useState } from 'react'
import { MapPin, Users, Shield, Clock, CheckCircle } from 'lucide-react'
import { submitBuyerInquiry } from '@/lib/supabase/client'

export default function HeroLeadMagnet() {
  const [email, setEmail] = useState('')
  const [propertyLocation, setPropertyLocation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Create a basic inquiry to capture the lead using YOUR schema
      const result = await submitBuyerInquiry({
        email: email,
        first_name: 'Lead', // We'll get full details later
        last_name: 'Capture',
        property_types: ['Not specified'],
        budget: 'Not specified',
        budget_range: 'Not specified',
        locations: [propertyLocation],
        preferred_locations: [propertyLocation],
        timeline: 'Researching',
        purpose: 'investment',
        purchase_purpose: 'investment',
        has_visited_puglia: false,
        needs_financing: false,
        is_survey_request: false,
        additional_notes: `Lead magnet signup from: ${propertyLocation}`,
        urgency: 'low',
        status: 'new',
        priority: 'normal'
      })

      if (!result.success) {
        console.error('Database error:', result.error)
        setError('There was an issue saving your information. Please try again.')
        return
      }

      // Send email with guide (you can implement this later)
      try {
        await fetch('/api/emails/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'lead_magnet',
            data: {
              email: email,
              location: propertyLocation
            }
          })
        })
      } catch (emailError) {
        console.error('Email error:', emailError)
        // Don't fail the whole process if email fails
      }

      // Show success message
      setShowSuccess(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail('')
        setPropertyLocation('')
        setShowSuccess(false)
      }, 3000)

    } catch (error) {
      console.error('Submission error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <section className="relative bg-gradient-to-br from-terracotta via-sea to-olive animate-gradient-shift text-white overflow-hidden">
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
              <h3 className="text-2xl font-playfair font-bold mb-2">
                Success! Check Your Email
              </h3>
              <p className="text-white/80 mb-6">
                We've sent your free guide to {email}. You'll also receive personalized professional matches within 24 hours.
              </p>
              <p className="text-sm text-white/60">
                Redirecting you to more resources...
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-gradient-to-br from-terracotta via-sea to-olive animate-gradient-shift text-white overflow-hidden">
      {/* Shimmer effect */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 20%, white, transparent 60%)',
          animation: 'shimmer 20s linear infinite',
        }}
      />

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Platform badge */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white/10 px-6 py-2 rounded-full text-sm font-semibold tracking-wide backdrop-blur-md glass mb-6">
            <MapPin className="inline w-4 h-4 mr-2" />
            Italy&apos;s Trusted Property Professional Marketplace
          </div>
        </div>

        {/* Clear headline */}
        <h1 className="text-4xl md:text-6xl font-playfair font-light leading-tight text-center text-balance max-w-4xl mx-auto">
          Find <strong className="font-bold">Verified Professionals</strong> for Your <strong className="font-bold">Italian Property</strong>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white/90 font-opensans max-w-3xl mx-auto text-center">
          Connect with RICS-certified surveyors, registered architects, structural engineers, 
          property lawyers, and notaries. Get competitive quotes and expert guidance for your property investment in Italy.
        </p>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <Users className="w-4 h-4" />
            <span>500+ Verified Professionals</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <Shield className="w-4 h-4" />
            <span>100% Screened & Certified</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <Clock className="w-4 h-4" />
            <span>Quotes in 24 Hours</span>
          </div>
        </div>

        {/* Lead capture form */}
        <div className="mt-12 max-w-xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-playfair font-bold mb-2">
              Get Your Free Guide
            </h3>
            <p className="text-white/80 mb-6">
              Download "The Complete Guide to Buying Property in Italy" + Get matched with verified professionals
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-2">
                  Where&apos;s your property located?
                </label>
                <input
                  type="text"
                  id="location"
                  value={propertyLocation}
                  onChange={(e) => setPropertyLocation(e.target.value)}
                  placeholder="e.g., Puglia, Tuscany, Lake Como..."
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-md"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-md"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-200 transform shadow-lg ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-white text-terracotta hover:bg-white/90 hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Get Free Guide + Professional Access'
                )}
              </button>

              <p className="text-xs text-center text-white/70 mt-4">
                Join 10,000+ international property buyers. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* Professional categories showcase */}
        <div className="mt-16 text-center">
          <p className="text-sm text-white/80 mb-4">Trusted by property buyers from:</p>
          <div className="flex flex-wrap justify-center gap-4 text-white/60">
            <span>🇬🇧 United Kingdom</span>
            <span>🇺🇸 United States</span>
            <span>🇩🇪 Germany</span>
            <span>🇫🇷 France</span>
            <span>🇨🇦 Canada</span>
          </div>
        </div>
      </div>
    </section>
  )
}
