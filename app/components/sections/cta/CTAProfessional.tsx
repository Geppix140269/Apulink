// Path: app/components/sections/cta/CTAProfessional.tsx
// Call-to-action section for professionals with new brand colors

'use client';

import Link from 'next/link';
import { ArrowRight, Users, TrendingUp, Globe, Award } from 'lucide-react';

interface CTAProfessionalProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function CTAProfessional({
  title = 'Join 300+ Professionals Growing Their Business',
  subtitle = 'Connect with qualified international buyers actively looking for properties in Apulia',
  ctaText = 'Apply to Join Apulink',
  ctaLink = '/professional/register'
}: CTAProfessionalProps) {
  const benefits = [
    {
      icon: Users,
      title: 'Qualified Leads',
      description: 'Pre-screened international buyers with verified budgets'
    },
    {
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Average 40% revenue increase in first year'
    },
    {
      icon: Globe,
      title: 'International Reach',
      description: 'Access buyers from 50+ countries'
    },
    {
      icon: Award,
      title: 'Professional Tools',
      description: 'CRM, document management, and invoicing included'
    }
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{title}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="glass-card text-center hover-lift">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-600 to-emerald-600 p-0.5">
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="relative">
          <div className="glass-card bg-gradient-to-br from-purple-50 to-emerald-50 p-8 md:p-12 text-center">
            {/* Pricing preview */}
            <div className="mb-8">
              <p className="text-gray-600 mb-2">Starting from</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl font-bold text-gradient">€49</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">No setup fees • Cancel anytime</p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={ctaLink}
                className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
              >
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link 
                href="/professional/learn-more"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Learn More
              </Link>
            </div>
            
            {/* Trust text */}
            <p className="mt-6 text-sm text-gray-600">
              Join professionals from RE/MAX, Engel & Völkers, and independent experts
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full filter blur-3xl opacity-30" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full filter blur-3xl opacity-30" />
        </div>
      </div>
    </section>
  );
}
