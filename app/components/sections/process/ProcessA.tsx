// Path: app/components/sections/process/ProcessA.tsx
// Process section showing how Apulink works with new brand colors

'use client';

import { FileText, Users, Home, ArrowRight } from 'lucide-react';

interface ProcessAProps {
  title?: string;
  subtitle?: string;
}

export default function ProcessA({
  title = 'How Apulink Works',
  subtitle = 'Your journey to Italian property ownership in three simple steps'
}: ProcessAProps) {
  const steps = [
    {
      number: '01',
      icon: FileText,
      title: 'Share Your Dream',
      description: 'Tell us about your ideal property and needs. Our AI analyzes your requirements to find perfect matches.',
      color: 'purple'
    },
    {
      number: '02',
      icon: Users,
      title: 'Get Matched',
      description: 'We connect you with 3-5 verified professionals who specialize in your needs and speak your language.',
      color: 'emerald'
    },
    {
      number: '03',
      icon: Home,
      title: 'Find Your Home',
      description: 'Work with your chosen professional to navigate the process smoothly and secure your dream property.',
      color: 'purple'
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-emerald-50 opacity-50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-purple-200 via-emerald-200 to-purple-200" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            const gradientClass = step.color === 'purple' 
              ? 'from-purple-600 to-purple-700' 
              : 'from-emerald-600 to-emerald-700';
            const iconColorClass = step.color === 'purple' 
              ? 'text-purple-600' 
              : 'text-emerald-600';
              
            return (
              <div key={index} className="relative">
                {/* Step card */}
                <div className="glass-card text-center group hover-lift">
                  {/* Step number */}
                  <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${gradientClass} p-0.5`}>
                    <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                      <Icon className={`w-10 h-10 ${iconColorClass}`} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>
                  
                  {/* Arrow for flow */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-8 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <a 
            href="#assessment"
            className="btn-primary inline-flex items-center gap-2 text-lg"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-purple-200 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-emerald-200 rounded-full filter blur-3xl opacity-20" />
    </section>
  );
}
