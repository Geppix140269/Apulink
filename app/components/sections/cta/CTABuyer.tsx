// Path: app/components/sections/cta/CTABuyer.tsx
// Call-to-action section for buyers with new brand colors

'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Calendar, Globe, Shield } from 'lucide-react';

interface CTABuyerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function CTABuyer({
  title = 'Ready to Find Your Dream Property in Apulia?',
  subtitle = 'Get matched with verified professionals who speak your language and understand your needs',
  ctaText = 'Start Your Free Assessment',
  ctaLink = '#assessment'
}: CTABuyerProps) {
  const benefits = [
    'Free property assessment and professional matching',
    'Save up to 93% in taxes with expert guidance',
    'Access EU grants up to 45% for renovations',
    'Support in 7+ languages'
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-emerald-900" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main content */}
        <div className="glass-card-dark p-8 md:p-12 rounded-3xl backdrop-blur-lg">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          {/* Benefits list */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <Link 
            href={ctaLink}
            className="btn-primary inline-flex items-center gap-2 text-lg transform hover:scale-105"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>No obligation</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>International support</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Verified professionals</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-600 rounded-full filter blur-3xl opacity-20" />
    </section>
  );
}
