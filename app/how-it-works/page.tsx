// PATH: app/how-it-works/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search,
  MessageSquare,
  Shield,
  CheckCircle,
  Users,
  Globe,
  Clock,
  Award,
  ArrowRight,
  FileText,
  Gavel,
  Building,
  Scale,
  Calculator,
  HardHat
} from 'lucide-react'

export default function HowItWorksPage() {
  const [activeView, setActiveView] = useState<'buyer' | 'professional'>('buyer')

  const buyerSteps = [
    {
      number: 1,
      title: 'Tell Us What You Need',
      description: 'Describe your property project and which professionals you need',
      details: 'Whether you need a surveyor for pre-purchase inspection, an architect for renovation plans, or a lawyer for contracts, we match you with the right experts.',
      icon: Search
    },
    {
      number: 2,
      title: 'Receive Multiple Quotes',
      description: 'Get competitive quotes from verified professionals within 24 hours',
      details: 'Compare prices, timelines, and expertise. All professionals are verified, licensed, and insured.',
      icon: MessageSquare
    },
    {
      number: 3,
      title: 'Ask Questions & Choose',
      description: 'Chat with professionals before making your decision',
      details: 'Communication stays anonymous until you select a professional. Ask about experience, approach, and clarify any concerns.',
      icon: Users
    },
    {
      number: 4,
      title: 'Secure & Protected',
      description: 'Pay securely through our platform with full protection',
      details: 'We hold payment in escrow until work is completed to your satisfaction. All professionals carry insurance.',
      icon: Shield
    }
  ]

  const professionalSteps = [
    {
      number: 1,
      title: 'Create Your Profile',
      description: 'Register with your credentials and expertise',
      details: 'Surveyors, architects, engineers, lawyers, notaries, and contractors - all property professionals welcome.',
      icon: Award
    },
    {
      number: 2,
      title: 'Set Your Service Area',
      description: 'Choose where you work and what services you offer',
      details: 'Select specific cities or regions. Specify property types you specialize in (residential, commercial, historic, etc.).',
      icon: Globe
    },
    {
      number: 3,
      title: 'Receive Matched Requests',
      description: 'Get notified only about relevant projects',
      details: 'Our AI matches you with buyers who need your exact expertise in your service area.',
      icon: MessageSquare
    },
    {
      number: 4,
      title: 'Submit Quotes & Win Work',
      description: 'Competitive bidding ensures fair pricing',
      details: 'Set your own prices. Build your reputation with reviews. Expand your international client base.',
      icon: CheckCircle
    }
  ]

  const professionals = [
    { 
      title: 'Surveyors', 
      icon: FileText, 
      services: 'Property inspections, structural surveys, valuations',
      color: 'text-terracotta'
    },
    { 
      title: 'Architects', 
      icon: Building, 
      services: 'Design, renovation plans, permits',
      color: 'text-sea'
    },
    { 
      title: 'Lawyers', 
      icon: Scale, 
      services: 'Contracts, due diligence, legal advice',
      color: 'text-olive'
    },
    { 
      title: 'Engineers', 
      icon: HardHat, 
      services: 'Structural analysis, seismic assessments',
      color: 'text-terracotta'
    },
    { 
      title: 'Notaries', 
      icon: Gavel, 
      services: 'Property transfers, official documentation',
      color: 'text-sea'
    },
    { 
      title: 'Contractors', 
      icon: Calculator, 
      services: 'Renovation quotes, project management',
      color: 'text-olive'
    }
  ]

  const steps = activeView === 'buyer' ? buyerSteps : professionalSteps

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Better contrast */}
      <section className="bg-gradient-to-br from-stone-900 to-stone-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold mb-6">
              How Apulink Works
            </h1>
            <p className="text-xl text-stone-200 mb-8 max-w-3xl mx-auto">
              Connect with verified property professionals across Italy. 
              Simple, secure, and saves you thousands.
            </p>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-terracotta" />
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-stone-300">Verified Professionals</div>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 text-sea" />
                <div className="text-2xl font-bold">4 Languages</div>
                <div className="text-sm text-stone-300">EN, IT, DE, FR</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-olive" />
                <div className="text-2xl font-bold">24hr</div>
                <div className="text-sm text-stone-300">Response Time</div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-terracotta" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-stone-300">Secure & Insured</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Types */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-playfair font-bold text-center text-stone-800 mb-12">
            All Property Professionals in One Place
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {professionals.map((prof, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-stone-100 mb-4 ${prof.color}`}>
                  <prof.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-stone-800 text-lg mb-2">{prof.title}</h3>
                <p className="text-stone-600 text-sm">{prof.services}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* View Toggle */}
      <section className="sticky top-0 z-40 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center">
            <div className="bg-stone-100 p-1 rounded-full">
              <button
                onClick={() => setActiveView('buyer')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeView === 'buyer'
                    ? 'bg-terracotta text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-800'
                }`}
              >
                I&apos;m a Property Buyer
              </button>
              <button
                onClick={() => setActiveView('professional')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeView === 'professional'
                    ? 'bg-terracotta text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-800'
                }`}
              >
                I&apos;m a Professional
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-stone-800 mb-4">
              {activeView === 'buyer' ? 'Find Your Perfect Professional' : 'Grow Your Business'}
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              {activeView === 'buyer' 
                ? 'Connect with verified professionals in 4 simple steps'
                : 'Access international clients and grow your business'
              }
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="relative mb-12 last:mb-0">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-full bg-stone-200"></div>
                )}
                
                <div className="flex gap-6">
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-terracotta text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Step content */}
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-semibold text-stone-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-stone-600 mb-3">
                      {step.description}
                    </p>
                    <div className="bg-stone-50 rounded-lg p-4">
                      <step.icon className="w-5 h-5 text-terracotta mb-2" />
                      <p className="text-sm text-stone-700">
                        {step.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              href={activeView === 'buyer' ? '/buyer/inquiry' : '/professional/register'}
              className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta text-white rounded-lg hover:bg-terracotta-dark transition-colors text-lg font-medium"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-stone-600 mt-4">
              {activeView === 'buyer' 
                ? 'Free to browse • Pay only when you hire'
                : 'Free registration • Pay only on successful projects'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-terracotta/5 to-sea/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-playfair font-bold text-center text-stone-800 mb-12">
            Why Choose Apulink?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Shield className="w-12 h-12 text-terracotta mx-auto mb-4" />
              <h3 className="font-semibold text-stone-800 mb-2">100% Verified</h3>
              <p className="text-stone-600">Every professional is licensed, insured, and background-checked</p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 text-sea mx-auto mb-4" />
              <h3 className="font-semibold text-stone-800 mb-2">Multi-Language</h3>
              <p className="text-stone-600">We handle translations so you can work with any professional</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-olive mx-auto mb-4" />
              <h3 className="font-semibold text-stone-800 mb-2">Fast & Easy</h3>
              <p className="text-stone-600">Get quotes in 24 hours, complete projects in days not weeks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-stone-300 mb-8">
            Join thousands using Apulink for their Italian property needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/buyer/inquiry"
              className="px-8 py-4 bg-white text-stone-800 rounded-lg hover:bg-stone-100 transition-colors font-medium"
            >
              Find Professionals
            </Link>
            <Link
              href="/professional/register"
              className="px-8 py-4 bg-terracotta text-white rounded-lg hover:bg-terracotta-dark transition-colors font-medium"
            >
              Join as Professional
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
