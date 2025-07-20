// Path: app/components/sections/trust-builders/TrustBuildersA.tsx
// Trust builders section with testimonials and stats with new brand colors

'use client';

import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Award, Shield, TrendingUp, ArrowRight } from 'lucide-react';

interface TrustBuildersAProps {
  title?: string;
  subtitle?: string;
}

export default function TrustBuildersA({
  title = 'Trusted by Property Buyers Worldwide',
  subtitle = 'See why international investors choose Apulink for their Italian property journey'
}: TrustBuildersAProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      location: 'United Kingdom',
      property: 'Trullo in Valle d\'Itria',
      rating: 5,
      text: 'Apulink made our dream of owning a trullo in Puglia a reality. The tax savings alone covered our renovation costs. Our project manager spoke perfect English and handled everything professionally.',
      savings: '€45,000 in taxes saved'
    },
    {
      id: 2,
      name: 'Hans Mueller',
      location: 'Germany',
      property: 'Masseria near Ostuni',
      rating: 5,
      text: 'The 7% flat tax benefit was a game-changer for our retirement plans. Apulink\'s professionals guided us through the entire process, from finding the property to getting our residency permits.',
      savings: '€78,000 in taxes saved'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      location: 'United States',
      property: 'Villa in Salento',
      rating: 5,
      text: 'We saved over 40% compared to similar properties in Tuscany. The grant specialist Apulink connected us with secured 45% funding for our renovation. Incredible service!',
      savings: '€120,000 total savings'
    }
  ];
  
  const stats = [
    {
      icon: Award,
      value: '€5.2M',
      label: 'In Tax Savings',
      gradient: 'from-purple-600 to-purple-700'
    },
    {
      icon: Shield,
      value: '500+',
      label: 'Happy Buyers',
      gradient: 'from-emerald-600 to-emerald-700'
    },
    {
      icon: TrendingUp,
      value: '€3.8M',
      label: 'In EU Grants Secured',
      gradient: 'from-purple-600 to-emerald-600'
    }
  ];
  
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-emerald-50 opacity-40" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{title}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="glass-card text-center hover-lift">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} p-0.5`}>
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div className={`text-3xl font-bold mb-2 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
        
        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative glass-card overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 text-purple-200">
              <Quote className="w-12 h-12" />
            </div>
            
            {/* Testimonial content */}
            <div className="p-8 md:p-12">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Text */}
              <p className="text-lg md:text-xl text-gray-700 mb-6 italic">
                "{current.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">{current.name}</p>
                  <p className="text-gray-600">{current.location} • {current.property}</p>
                </div>
                <div className="glass-card px-4 py-2 bg-gradient-to-r from-purple-50 to-emerald-50">
                  <p className="font-bold text-purple-700">{current.savings}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-50 to-emerald-50">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial 
                        ? 'w-8 bg-gradient-to-r from-purple-600 to-emerald-600' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 glass-card px-6 py-3 rounded-full">
            <Shield className="w-5 h-5 text-purple-600" />
            <span className="text-gray-700 font-medium">Verified Professionals Only</span>
          </div>
          <div className="flex items-center gap-2 glass-card px-6 py-3 rounded-full">
            <Award className="w-5 h-5 text-emerald-600" />
            <span className="text-gray-700 font-medium">Success Fee Guarantee</span>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 right-20 w-40 h-40 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-40 left-20 w-48 h-48 bg-emerald-200 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }} />
    </section>
  );
}
