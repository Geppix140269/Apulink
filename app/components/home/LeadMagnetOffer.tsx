// PATH: app/components/home/LeadMagnetOffer.tsx
'use client'

import React, { useState } from 'react'
import { Download, CheckCircle, Book, FileText, Calculator, Users } from 'lucide-react'

export default function LeadMagnetOffer() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      // In real implementation, trigger download here
    }, 1000)
  }

  const guides = [
    {
      icon: Book,
      title: 'Complete Puglia Property Guide',
      description: 'Everything you need to know about buying property in Puglia'
    },
    {
      icon: FileText,
      title: 'Legal Checklist',
      description: 'Essential documents and legal requirements for foreign buyers'
    },
    {
      icon: Calculator,
      title: 'Cost Calculator',
      description: 'Calculate all costs involved in your property purchase'
    },
    {
      icon: Users,
      title: 'Professional Directory',
      description: 'Verified local professionals ready to help you'
    }
  ]

  return (
    <>
      {/* Floating CTA Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-40 flex items-center gap-2 bg-gradient-to-r from-terracotta to-terracotta-dark text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <Download className="w-5 h-5" />
        <span className="font-medium">Free Buyer's Guide</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-terracotta to-terracotta-dark p-8 text-white rounded-t-2xl">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h2 className="text-3xl font-playfair font-bold mb-4">
                Get Your Free Puglia Property Buyer's Kit
              </h2>
              <p className="text-xl text-white/90">
                Essential guides, checklists, and tools for international property buyers
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              {!isSuccess ? (
                <>
                  {/* What's Included */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-stone-800 mb-4">What's Included:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {guides.map((guide, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-terracotta/10 p-2 rounded-lg">
                            <guide.icon className="w-5 h-5 text-terracotta" />
                          </div>
                          <div>
                            <h4 className="font-medium text-stone-800">{guide.title}</h4>
                            <p className="text-sm text-stone-600">{guide.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                        Enter your email to get instant access:
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 rounded-lg font-medium transition-all ${
                        isSubmitting
                          ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                          : 'bg-terracotta text-white hover:bg-terracotta-dark'
                      }`}
                    >
                      {isSubmitting ? 'Processing...' : 'Get My Free Guide'}
                    </button>
                    
                    <p className="text-xs text-stone-500 text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-stone-800 mb-2">
                    Success! Check Your Email
                  </h3>
                  <p className="text-stone-600 mb-6">
                    We've sent your Puglia Property Buyer's Kit to {email}
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-terracotta text-white px-6 py-2 rounded-lg hover:bg-terracotta-dark transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
