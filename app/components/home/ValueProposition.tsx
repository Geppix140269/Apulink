import React from 'react'
import { Shield, Clock, Euro, Users, CheckCircle, Globe } from 'lucide-react'

export default function ValueProposition() {
  const benefits = [
    {
      icon: Shield,
      title: "Verified Professionals Only",
      description: "Every professional is screened, certified, and insured. No cowboys, no surprises."
    },
    {
      icon: Clock,
      title: "Get Quotes in 24 Hours",
      description: "Submit once, receive multiple competitive quotes. Save weeks of searching and calling."
    },
    {
      icon: Euro,
      title: "Save 20-30% on Services",
      description: "Competition drives better pricing. Compare quotes side-by-side and choose the best value."
    },
    {
      icon: Users,
      title: "All Professions in One Place",
      description: "Surveyors, architects, lawyers, notaries - everyone you need for your property journey."
    }
  ]

  const processSteps = [
    {
      number: "1",
      title: "Tell us what you need",
      description: "Quick form about your property and required services"
    },
    {
      number: "2",
      title: "Get matched instantly",
      description: "Our AI finds the best professionals for your specific needs"
    },
    {
      number: "3",
      title: "Receive competitive quotes",
      description: "Compare prices, reviews, and credentials"
    },
    {
      number: "4",
      title: "Choose with confidence",
      description: "Hire directly through the platform with payment protection"
    }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Benefits Grid */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            Why 10,000+ International Buyers Choose APULINK
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The smart way to find and hire Italian property professionals - without the language barriers, 
            hidden fees, or endless searching.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sea/10 text-sea rounded-full mb-4 group-hover:bg-sea group-hover:text-white transition-all duration-300">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* How it Works */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold text-center text-gray-900 mb-12">
            How APULINK Works
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300" />
                )}
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta text-white rounded-full font-bold text-xl mb-4">
                    {step.number}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Dispute Resolution</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Available in 5 Languages</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
