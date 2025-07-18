// PATH: app/buyer/page.tsx
import Link from 'next/link'
import { 
  FileSearch, 
  Users, 
  Shield, 
  Globe,
  Clock,
  PiggyBank,
  CheckCircle,
  ArrowRight,
  FileText,
  MessageSquare,
  Award
} from 'lucide-react'

export default function BuyerPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Verified Surveyors',
      description: 'All surveyors are licensed professionals in Puglia with proven track records'
    },
    {
      icon: Globe,
      title: 'No Language Barriers',
      description: 'We handle all communication in English, Italian, and German'
    },
    {
      icon: PiggyBank,
      title: 'Save 20-30%',
      description: 'Competitive bidding ensures you get the best price for quality work'
    },
    {
      icon: Shield,
      title: 'Secure Process',
      description: 'Anonymous bidding and secure document storage protect your interests'
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: 'Receive multiple quotes within 24-48 hours of posting'
    },
    {
      icon: FileText,
      title: 'Document Support',
      description: 'We can obtain missing property documents on your behalf'
    }
  ]

  const processSteps = [
    {
      number: '1',
      title: 'Upload Documents',
      description: 'Provide property details and any existing documentation'
    },
    {
      number: '2',
      title: 'Receive Bids',
      description: 'Get competitive quotes from qualified surveyors'
    },
    {
      number: '3',
      title: 'Select & Connect',
      description: 'Choose your surveyor and we facilitate the connection'
    }
  ]

  const surveyTypes = [
    'Property Purchase Surveys',
    'Structural Assessments',
    'Boundary Surveys',
    'Due Diligence Reports',
    'Masseria Evaluations',
    'Commercial Property Surveys'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-coral-500 to-coral-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">Trusted by 500+ International Buyers</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Get Professional Property Surveys in Puglia
              </h1>
              
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/90">
                Connect with verified local surveyors through our secure bidding platform. 
                Save time, money, and avoid language barriers.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  href="/buyer/inquiry"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-coral-500 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm sm:text-base"
                >
                  Start Survey Request
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-coral-700 text-white rounded-lg hover:bg-coral-800 transition-colors font-medium text-sm sm:text-base"
                >
                  How It Works
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Licensed Surveyors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Secure Platform</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="mt-8 sm:mt-12 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Why Choose Apulink?</h3>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold">€350-500</div>
                    <div className="text-sm sm:text-base text-white/80">Average savings per survey</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold">24-48h</div>
                    <div className="text-sm sm:text-base text-white/80">To receive multiple quotes</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold">100%</div>
                    <div className="text-sm sm:text-base text-white/80">Secure & anonymous bidding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Process */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Get your property survey completed in days, not weeks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {processSteps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-coral-100 text-coral-500 rounded-full text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 px-4 sm:px-0">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Everything You Need for Peace of Mind
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              We handle the complexities so you can focus on your property purchase
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-coral-100 text-coral-500 rounded-lg mb-3 sm:mb-4">
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Survey Types */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                All Types of Property Surveys
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                Whether you&apos;re buying a historic masseria, a modern apartment, or commercial property, 
                our network of surveyors covers all your needs across Puglia.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                {surveyTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">{type}</span>
                  </div>
                ))}
              </div>

              {/* View Sample Report Link */}
              <Link
                href="/survey-report-template"
                className="inline-flex items-center gap-2 text-coral-500 font-medium hover:text-coral-600 transition-colors text-sm sm:text-base"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                View Sample Survey Report
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>

            <div className="mt-8 sm:mt-12 lg:mt-0">
              <div className="bg-gradient-to-br from-coral-50 to-coral-100 rounded-2xl p-6 sm:p-8">
                <FileSearch className="w-14 h-14 sm:w-16 sm:h-16 text-coral-500 mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Need Documents?
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                  Missing property documents? No problem. We can obtain official 
                  documents from local authorities on your behalf for a small 
                  additional fee.
                </p>
                <Link
                  href="/buyer/inquiry"
                  className="inline-flex items-center gap-2 text-coral-500 font-medium hover:text-coral-600 text-sm sm:text-base"
                >
                  Learn more
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12">
            <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-coral-500 mx-auto mb-4 sm:mb-6" />
            <blockquote className="text-lg sm:text-xl text-gray-700 italic mb-4 sm:mb-6">
              &ldquo;Apulink made our property survey in Ostuni so simple. We received 
              5 quotes within 2 days and saved over €400 compared to the first 
              surveyor we contacted directly. The platform handled everything in 
              English - a huge relief!&rdquo;
            </blockquote>
            <div className="font-medium text-gray-900">Sarah Mitchell</div>
            <div className="text-sm sm:text-base text-gray-600">UK Buyer, Ostuni</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-coral-500 to-coral-600 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Get Your Property Survey?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/90 px-4 sm:px-0">
            Join hundreds of international buyers who trust Apulink for their 
            property surveys in Puglia
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/buyer/inquiry"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-coral-500 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm sm:text-base"
            >
              Start Your Survey Request
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-coral-700 text-white rounded-lg hover:bg-coral-800 transition-colors font-medium text-sm sm:text-base"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
