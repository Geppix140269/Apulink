// PATH: app/components/home/LeadMagnetOffer.tsx
'use client'
import React, { useState } from 'react';
import { FileText, Download, Gift, Clock, Lock } from 'lucide-react';

const LeadMagnetOffer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="get-guide" className="py-20 bg-gradient-to-br from-terracotta/10 to-terracotta/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left side - What's Inside */}
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-10 h-10 text-terracotta" />
                  <div>
                    <h3 className="text-2xl font-playfair font-bold text-stone-800">
                      The Puglia Property Buyer's Survival Guide
                    </h3>
                    <p className="text-stone-600">2025 Edition • 47 Pages • €297 Value</p>
                  </div>
                </div>

                <h4 className="font-semibold text-stone-800 mb-4">What's Inside:</h4>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-terracotta font-bold">1.</span>
                    <div>
                      <p className="font-medium text-stone-800">The €5,000 Cadastral Trap</p>
                      <p className="text-sm text-stone-600">How outdated registrations cost buyers thousands</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-terracotta font-bold">2.</span>
                    <div>
                      <p className="font-medium text-stone-800">The "Abusivismo" Nightmare</p>
                      <p className="text-sm text-stone-600">Illegal modifications that kill deals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-terracotta font-bold">3.</span>
                    <div>
                      <p className="font-medium text-stone-800">IMU Tax Secrets</p>
                      <p className="text-sm text-stone-600">Legal ways to reduce property tax by 40%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-terracotta font-bold">4.</span>
                    <div>
                      <p className="font-medium text-stone-800">Negotiation Scripts That Work</p>
                      <p className="text-sm text-stone-600">Exact phrases that saved buyers €20k+</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-terracotta font-bold">5.</span>
                    <div>
                      <p className="font-medium text-stone-800">Professional Fee Benchmarks</p>
                      <p className="text-sm text-stone-600">What locals really pay (not tourist prices)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-terracotta font-bold">6.</span>
                    <div>
                      <p className="font-medium text-stone-800">Red Flag Checklist</p>
                      <p className="text-sm text-stone-600">27-point inspection before you buy</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-terracotta font-bold">7.</span>
                    <div>
                      <p className="font-medium text-stone-800">Trusted Professional Directory</p>
                      <p className="text-sm text-stone-600">Our vetted network (with direct contacts)</p>
                    </div>
                  </div>
                </div>

                {/* Bonuses */}
                <div className="bg-stone-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift className="w-5 h-5 text-terracotta" />
                    <h4 className="font-semibold text-stone-800">Free Bonuses:</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Property ROI Calculator (Excel)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Legal Document Templates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>€100 Professional Consultation Credit</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="bg-gradient-to-br from-stone-800 to-stone-900 p-8 md:p-12 text-white">
                <h3 className="text-2xl font-semibold mb-2">
                  Yes! Send Me The Free Guide
                </h3>
                <p className="text-stone-300 mb-6">
                  Join 2,847 smart buyers who've already downloaded it this month
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Best Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:border-terracotta focus:bg-white/20 transition-all"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-terracotta text-white py-4 rounded-lg font-semibold hover:bg-terracotta-dark transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Get Instant Access + €100 Credit
                  </button>

                  <div className="space-y-3 text-sm text-stone-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Delivered instantly to your inbox</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>Your email is 100% secure. No spam.</span>
                    </div>
                  </div>
                </form>

                {/* Urgency */}
                <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-sm">
                    <span className="font-semibold">⏰ Limited Time:</span> The €100 credit expires 
                    in 48 hours. 67 credits remaining.
                  </p>
                </div>

                {/* Testimonial */}
                <div className="mt-8 p-4 bg-white/5 rounded-lg">
                  <p className="text-sm italic mb-2">
                    "This guide saved me €12,000 on my trullo purchase. The negotiation 
                    scripts alone were worth thousands!"
                  </p>
                  <p className="text-xs text-stone-400">
                    - Sarah M., UK (Bought in Ostuni, Oct 2024)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetOffer;
