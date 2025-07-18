// PATH: app/components/home/ValueProposition.tsx
import React from 'react'
import { Shield, Clock, PiggyBank, Globe, CheckCircle, Users } from 'lucide-react'

export default function ValueProposition() {
  const benefits = [
    {
      icon: Shield,
      title: "100% Verified Professionals",
      description: "Every professional is licensed, insured, and background-checked before joining our platform",
      color: "text-terracotta"
    },
    {
      icon: Clock,
      title: "24-Hour Response Time",
      description: "Get multiple competitive quotes within 24 hours of posting your request",
      color: "text-sea"
    },
    {
      icon: PiggyBank,
      title: "Save 20-30% on Average",
      description: "Competition drives better prices. Our buyers save thousands compared to direct quotes",
      color: "text-olive"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "We handle all communication in English, Italian, German, and French",
      color: "text-terracotta"
    },
    {
      icon: CheckCircle,
      title: "Quality Guaranteed",
      description: "All work comes with professional guarantees and insurance coverage",
      color: "text-sea"
    },
    {
      icon: Users,
      title: "Complete Professional Network",
      description: "From surveyors to lawyers, find every professional you need in one place",
      color: "text-olive"
    }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            Why International Buyers Choose Apulink
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've built the only platform designed specifically for international property buyers in Italy. 
            Here's what makes us different.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 p-6 rounded-xl bg-gray-50 hover:bg-white"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white shadow-md mb-4 group-hover:scale-110 transition-transform ${benefit.color}`}>
                <benefit.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-6 py-3 rounded-full text-sm font-semibold">
            <Shield className="w-4 h-4" />
            All professionals carry €1M+ professional indemnity insurance
          </div>
        </div>
      </div>
    </section>
  )
}
