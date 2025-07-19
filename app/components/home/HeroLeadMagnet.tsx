'use client'

import React, { useState } from 'react'
import { MapPin, Users, Shield, Clock } from 'lucide-react'

export default function HeroLeadMagnet() {
  const [email, setEmail] = useState('')
  const [propertyLocation, setPropertyLocation] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', { email, propertyLocation })
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
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-terracotta font-bold py-4 px-6 rounded-lg hover:bg-white/90 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
              >
                Get Free Guide + Professional Access
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
