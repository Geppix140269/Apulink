// PATH: app/surveyor/register/success/page.tsx
'use client'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export default function SurveyorRegisterSuccessPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sea/5 to-white">
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-sea/20 rounded-full">
              <CheckCircle className="w-12 h-12 text-sea" />
            </div>
          </div>

          <h1 className="font-playfair text-4xl font-bold text-stone-800 mb-4">
            Registration Successful!
          </h1>
          
          <p className="text-xl text-stone-600 mb-8">
            Thank you for joining the Apulink network. We&apos;ll verify your credentials within 24-48 hours.
          </p>

          {/* Reference Number */}
          <div className="bg-sea/10 rounded-lg px-6 py-4 mb-8 inline-block">
            <p className="text-sm text-stone-600 mb-1">Reference number</p>
            <p className="font-mono text-xl text-sea font-bold">
              SURV-{new Date().getFullYear()}-{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}
            </p>
          </div>

          {/* What Happens Next */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 text-left">
            <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
              What Happens Next?
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-sea/20 text-sea rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-0.5">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-stone-800 mb-1">
                    Credential Verification (24-48 hours)
                  </h3>
                  <p className="text-stone-600">
                    Our team will verify your professional license and credentials.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-sea/20 text-sea rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-0.5">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-stone-800 mb-1">
                    Welcome Email
                  </h3>
                  <p className="text-stone-600">
                    You&apos;ll receive login credentials and platform guides.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-sea/20 text-sea rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-0.5">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-stone-800 mb-1">
                    Start Receiving Requests
                  </h3>
                  <p className="text-stone-600">
                    Get notified when survey requests match your expertise and service areas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-terracotta/10 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-stone-800 mb-3">
              💡 Tips for Success
            </h3>
            <ul className="space-y-2 text-stone-700">
              <li className="flex items-start">
                <span className="text-terracotta mr-2">•</span>
                Respond to survey requests quickly (within 24 hours)
              </li>
              <li className="flex items-start">
                <span className="text-terracotta mr-2">•</span>
                Provide competitive and transparent pricing
              </li>
              <li className="flex items-start">
                <span className="text-terracotta mr-2">•</span>
                Include detailed descriptions of your services
              </li>
              <li className="flex items-start">
                <span className="text-terracotta mr-2">•</span>
                Maintain professionalism in all communications
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-sea text-white rounded-lg font-semibold hover:bg-sea-dark transition-all"
            >
              Back to Home
            </button>
            <button
              onClick={() => router.push('/how-it-works')}
              className="px-8 py-3 bg-white text-sea border-2 border-sea rounded-lg font-semibold hover:bg-sea/5 transition-all"
            >
              Learn How It Works
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-stone-200">
            <p className="text-stone-600 mb-2">
              Questions about your registration?
            </p>
            <p className="text-stone-700">
              Contact us at{' '}
              <a href="mailto:surveyors@apulink.com" className="text-sea hover:text-sea-dark font-medium">
                surveyors@apulink.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
