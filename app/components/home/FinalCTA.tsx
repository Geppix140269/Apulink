import React from 'react'
import { ArrowRight, Users, Shield, Clock, Star } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-terracotta via-sea to-olive animate-gradient-shift text-white relative overflow-hidden">
      {/* Shimmer effect */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 80% 80%, white, transparent 60%)',
          animation: 'shimmer 20s linear infinite',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-6">
          Ready to Start Your Italian Property Journey?
        </h2>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of international buyers who&apos;ve found their dream property in Italy 
          with help from our verified professional network.
        </p>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Users className="w-5 h-5" />
            <span>500+ Professionals</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Shield className="w-5 h-5" />
            <span>100% Verified</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Clock className="w-5 h-5" />
            <span>24hr Response</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <Star className="w-5 h-5" />
            <span>4.9/5 Rating</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-terracotta font-bold py-4 px-8 rounded-lg hover:bg-white/90 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg">
            Find Professionals Now
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button className="bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/30 flex items-center justify-center gap-2">
            Download Free Guide
          </button>
        </div>

        <p className="text-sm text-white/70 mt-8">
          No credit card required • Free to browse • Get quotes in 24 hours
        </p>

        {/* Final trust message */}
        <div className="mt-12 pt-12 border-t border-white/20">
          <p className="text-lg text-white/80">
            &ldquo;Apulink connected us with an amazing surveyor who found €40,000 worth of issues. 
            We negotiated a better price and fixed everything before moving in. Couldn&apos;t have done it without them!&rdquo;
          </p>
          <p className="text-sm text-white/60 mt-3">
            — Emma Williams, Property owner in Polignano a Mare
          </p>
        </div>
      </div>
    </section>
  )
}
