import React, { useState } from 'react'
import { Download, CheckCircle, Book, FileText, Calculator, Users } from 'lucide-react'

export default function LeadMagnetOffer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Lead magnet request:', email)
  }

  const guideContents = [
    "Complete checklist for buying property in Italy",
    "How to verify professional credentials",
    "Understanding Italian property law basics",
    "Cost breakdown: All fees and taxes explained",
    "Red flags to avoid when buying Italian property",
    "Region-by-region market analysis"
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-terracotta/5 to-olive/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Book className="w-4 h-4" />
              Free Resource
            </div>
            
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
              The International Buyer&apos;s Guide to Italian Property
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Everything you need to know before buying property in Italy. Written by experts, 
              trusted by 10,000+ international buyers.
            </p>

            <div className="space-y-3 mb-8">
              {guideContents.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-olive mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>47 pages</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>PDF format</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10k+ downloads</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">
              Get Your Free Guide
            </h3>
            <p className="text-gray-600 mb-6">
              Plus exclusive access to our professional network
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="guide-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="guide-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sea focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sea text-white font-bold py-4 px-6 rounded-lg hover:bg-sea/90 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Send Me the Free Guide
              </button>

              <p className="text-xs text-center text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                <strong>Bonus:</strong> Get instant access to our directory of 500+ verified professionals
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
