// Path: app/components/sections/value-proposition/ValuePropositionA.tsx
// Value proposition section with new brand colors

'use client';

import { TrendingUp, Shield, Euro, Home } from 'lucide-react';

interface ValuePropositionAProps {
  title?: string;
  subtitle?: string;
}

export default function ValuePropositionA({
  title = 'Why International Buyers Choose Apulia',
  subtitle = 'Discover the financial and lifestyle benefits that make Apulia the smartest choice for property investment in Italy'
}: ValuePropositionAProps) {
  const benefits = [
    {
      icon: Euro,
      title: '7% Flat Tax for 10 Years',
      description: 'Save up to 93% on taxes as a foreign retiree. No wealth tax, no inheritance tax on Italian assets.',
      gradient: 'from-purple-600 to-purple-700',
      iconColor: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'EU Grants up to 45%',
      description: 'Access PIA and Mini PIA grants for renovations. We connect you with grant specialists.',
      gradient: 'from-emerald-600 to-emerald-700',
      iconColor: 'text-emerald-600'
    },
    {
      icon: Home,
      title: 'Properties 40% Below Tuscany',
      description: 'Get more for your money in Italy\'s hidden gem. From trulli to seafront villas.',
      gradient: 'from-purple-600 to-emerald-600',
      iconColor: 'text-purple-600'
    },
    {
      icon: Shield,
      title: 'Protected Investment',
      description: 'Work with verified professionals who safeguard your interests at every step.',
      gradient: 'from-emerald-600 to-purple-600',
      iconColor: 'text-emerald-600'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{title}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="glass-card group hover:transform hover:scale-105 transition-all duration-300"
              >
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} p-0.5 mb-4`}>
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    <Icon className={`w-8 h-8 ${benefit.iconColor}`} />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
                
                {/* Decorative gradient line */}
                <div className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r ${benefit.gradient} opacity-50 group-hover:w-full transition-all duration-500`} />
              </div>
            );
          })}
        </div>
        
        {/* Additional Trust Element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full">
            <Shield className="w-5 h-5 text-purple-600" />
            <span className="text-gray-700 font-medium">
              All benefits verified by Italian tax professionals
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
