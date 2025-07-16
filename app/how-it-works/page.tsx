// PATH: app/how-it-works/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  FileText, 
  Send, 
  Users, 
  CheckCircle, 
  Shield, 
  Globe, 
  PiggyBank,
  Award,
  ArrowRight,
  Lock,
  MessageSquare,
  FileCheck,
  Handshake,
  Gavel
} from 'lucide-react'

export default function HowItWorksPage() {
  const [activeView, setActiveView] = useState<'buyer' | 'surveyor'>('buyer')

  const buyerSteps = [
    {
      number: 1,
      title: 'Upload Documents',
      description: 'Upload your property documents or let us obtain them for you',
      benefits: [
        'Secure document storage',
        'Document procurement service available',
        'Multi-language support'
      ],
      icon: FileText
    },
    {
      number: 2,
      title: 'Submit Survey Request',
      description: 'Create your RFP with property details and requirements',
      benefits: [
        'Automated matching with qualified surveyors',
        'Specify exact needs and timeline',
        'No upfront costs'
      ],
      icon: Send
    },
    {
      number: 3,
      title: 'Review Anonymous Bids',
      description: 'Compare competitive bids from verified surveyors',
      benefits: [
        'Transparent pricing',
        'Anonymous until selection',
        'Ask questions through platform'
      ],
      icon: Gavel
    },
    {
      number: 4,
      title: 'Select & Secure',
      description: 'Choose your surveyor and pay 10% deposit',
      benefits: [
        'Deposit held securely by Apulink',
        'Direct contact details exchanged',
        'Protected transaction'
      ],
      icon: Shield
    },
    {
      number: 5,
      title: 'Survey Completion',
      description: 'Surveyor completes work, settle remaining payment directly',
      benefits: [
        'Quality guaranteed',
        'All documents in one place',
        'Rate your experience'
      ],
      icon: CheckCircle
    }
  ]

  const surveyorSteps = [
    {
      number: 1,
      title: 'Create Your Profile',
      description: 'Set your service areas and property specializations',
      benefits: [
        'Choose specific cities or all Puglia',
        'Highlight expertise (masserie, industrial, etc.)',
        'Set your availability'
      ],
      icon: Award
    },
    {
      number: 2,
      title: 'Receive Matched RFPs',
      description: 'Get notified of relevant survey requests automatically',
      benefits: [
        'Only see relevant opportunities',
        'No time wasted on mismatched requests',
        'Instant notifications'
      ],
      icon: MessageSquare
    },
    {
      number: 3,
      title: 'Submit Competitive Bids',
      description: 'Review documents and submit your anonymous bid',
      benefits: [
        'Access all property documents',
        'Communicate anonymously with buyer',
        'Set your own pricing'
      ],
      icon: Gavel
    },
    {
      number: 4,
      title: 'Win & Connect',
      description: 'Get selected and receive buyer contact details',
      benefits: [
        '10% deposit secured by Apulink',
        'Direct communication enabled',
        'Clear scope of work'
      ],
      icon: Handshake
    },
    {
      number: 5,
      title: 'Complete & Get Paid',
      description: 'Deliver survey, receive payment, build reputation',
      benefits: [
        'Payment guaranteed',
        'Build your rating',
        'Expand international client base'
      ],
      icon: FileCheck
    }
  ]

  const steps = activeView === 'buyer' ? buyerSteps : surveyorSteps

  const faqs = [
    {
      question: 'How does the anonymous bidding process work?',
      answer: 'All communication between buyers and surveyors remains anonymous until a bid is accepted. This ensures fair competition and prevents circumvention of the platform. Once a buyer selects a surveyor, contact details are exchanged.'
    },
    {
      question: 'Is my property documentation secure?',
      answer: 'Yes! All documents are encrypted and stored securely on our platform. Only matched surveyors can view documents relevant to their bids, and access is monitored and logged.'
    },
    {
      question: 'What languages are supported?',
      answer: 'Apulink supports English, Italian, and German. We handle all translation and communication barriers between international buyers and local surveyors.'
    },
    {
      question: 'How much can I save using Apulink?',
      answer: 'By creating competition through our bidding system, buyers typically save 20-30% compared to traditional surveyor fees. Plus, you avoid costly translation services and administrative headaches.'
    },
    {
      question: 'What happens if I need documents I do not have?',
      answer: 'Apulink can obtain official property documents on your behalf for a small fee. We have established relationships with local authorities and can quickly secure any required documentation.'
    },
    {
      question: 'How is payment handled?',
      answer: 'Buyers pay a 10% deposit to Apulink when accepting a bid, which we hold securely. The remaining 90% is settled directly between buyer and surveyor after survey completion. Surveyors pay Apulink a commission only on completed work.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-coral-500 to-coral-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              How Apulink Works
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              The easiest way to connect international buyers with trusted surveyors in Puglia
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Secure Platform</span>
              </div>
              <div className="flex flex-col items-center">
                <Globe className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Multi-Language</span>
              </div>
              <div className="flex flex-col items-center">
                <PiggyBank className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Save 20-30%</span>
              </div>
              <div className="flex flex-col items-center">
                <Lock className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Anonymous Bidding</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* View Toggle */}
      <section className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-full">
              <button
                onClick={() => setActiveView('buyer')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeView === 'buyer'
                    ? 'bg-coral-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                I am a Buyer
              </button>
              <button
                onClick={() => setActiveView('surveyor')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeView === 'surveyor'
                    ? 'bg-coral-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                I am a Surveyor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {activeView === 'buyer' ? 'Your Journey as a Buyer' : 'Your Journey as a Surveyor'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {activeView === 'buyer' 
                ? 'From document upload to survey completion in 5 simple steps'
                : 'Start receiving international clients in 5 simple steps'
              }
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Step Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-coral-500 text-white font-bold text-xl">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                  
                  {/* Benefits */}
                  <div className="space-y-3">
                    {step.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Illustration */}
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-coral-100 rounded-full blur-3xl opacity-30"></div>
                    <div className="relative bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                      <step.icon className="w-24 h-24 lg:w-32 lg:h-32 text-coral-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              href={activeView === 'buyer' ? '/buyer' : '/professional/register'}
              className="inline-flex items-center gap-2 px-8 py-4 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors text-lg font-medium"
            >
              Get Started as a {activeView === 'buyer' ? 'Buyer' : 'Surveyor'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            The Apulink Guarantee
          </h2>
          <div className="inline-flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-coral-500 rounded-full blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-full p-8 shadow-lg">
                <Award className="w-16 h-16 text-coral-500" />
              </div>
            </div>
          </div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Every transaction on Apulink is protected by our secure platform. 
            We verify all surveyors, encrypt all documents, and hold deposits 
            securely until work is completed.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-coral-500 to-coral-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied buyers and surveyors using Apulink
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/buyer"
              className="px-8 py-4 bg-white text-coral-500 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Start as Buyer
            </Link>
            <Link
              href="/professional/register"
              className="px-8 py-4 bg-coral-700 text-white rounded-lg hover:bg-coral-800 transition-colors font-medium"
            >
              Register as Surveyor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
