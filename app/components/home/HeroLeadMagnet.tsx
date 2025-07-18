'use client';
import React, { useState } from 'react';
import { ArrowRight, Download, Shield, Clock, TrendingUp } from 'lucide-react';

const HeroLeadMagnet = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1000);
  };

  return (
    <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-terracotta-dark text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-terracotta/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-sea/20 rounded-full blur-3xl animate-pulse animation-delay-200" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Value Proposition */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm">Trusted by 500+ International Property Investors</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold leading-tight mb-6">
                Save €10,000+ on Your 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-terracotta-light">
                  Puglia Property Purchase
                </span>
              </h1>

              <p className="text-xl text-stone-200 mb-8">
                Get instant access to our exclusive guide revealing the 7 costly mistakes 
                foreign buyers make in Italy – and how to avoid them.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-stone-200">Legal pitfalls that cost buyers €5,000–15,000</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-stone-200">How to negotiate 20–30% below asking price</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-stone-200">Trusted professionals that won’t overcharge foreigners</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-stone-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Updated Jan 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>PDF + Checklist</span>
                </div>
              </div>
            </div>

            {/* Right side - Lead Capture Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  Get Your Free Guide Instantly
                </h2>
                <p className="text-stone-300">
                  Plus: €100 credit toward your first professional consultation
                </p>
              </div>

              {!showSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-5 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:border-terracotta focus:bg-white/20 transition-all"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-terracotta text-white py-4 rounded-lg font-semibold hover:bg-terracotta-dark transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Get Instant Access
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-stone-400 text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Check Your Email!</h3>
                  <p className="text-stone-300 mb-4">
                    We’ve sent your guide and €100 credit code to {email}
                  </p>
                  <button className="text-terracotta hover:text-terracotta-light transition-colors">
                    Browse Professionals While You Wait →
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-stone-600 rounded-full border-2 border-white/20"
                        style={{
                          backgroundImage: `url(https://i.pravatar.cc/32?img=${i})`,
                          backgroundSize: 'cover',
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-stone-300">
                    Join 2,847 smart property buyers
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">
                  🎯 Limited Time: First 100 buyers get exclusive access to our network of pre-vetted professionals
                </p>
                <p className="text-stone-300">67 spots remaining • Offer ends in 48 hours</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">47</div>
                  <div className="text-xs text-stone-400">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-xs text-stone-400">Minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLeadMagnet;
