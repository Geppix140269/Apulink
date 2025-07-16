// PATH: app/buyer/inquiry/success/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BuyerInquirySuccessPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<'en' | 'it'>('en')
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-terracotta/5 to-white">
      {/* Success Message */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* Language Toggle */}
          <div className="flex justify-center mb-8">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'it' : 'en')}
              className="flex items-center space-x-2 text-stone-600 hover:text-terracotta font-medium"
            >
              <span className="text-2xl">{language === 'en' ? '🇬🇧' : '🇮🇹'}</span>
              <span>{language === 'en' ? 'IT' : 'EN'}</span>
            </button>
          </div>

          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-terracotta/20 rounded-full">
              <svg className="w-12 h-12 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="font-playfair text-4xl font-bold text-stone-800 mb-4">
            {language === 'en' 
              ? 'Thank You for Your Inquiry!'
              : 'Grazie per la Tua Richiesta!'
            }
          </h1>
          
          <p className="text-xl text-stone-600 mb-8">
            {language === 'en'
              ? 'We&apos;ve received your property inquiry and will be in touch within 24 hours.'
              : 'Abbiamo ricevuto la tua richiesta e ti contatteremo entro 24 ore.'
            }
          </p>

          {/* What Happens Next */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 text-left">
            <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
              {language === 'en' ? 'What Happens Next?' : 'Cosa Succede Ora?'}
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-terracotta/20 text-terracotta rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-stone-800 mb-1">
                    {language === 'en' ? 'Review & Matching' : 'Revisione e Abbinamento'}
                  </h3>
                  <p className="text-stone-600">
                    {language === 'en'
                      ? 'Our team will review your requirements and identify the best local professionals for your needs.'
                      : 'Il nostro team esaminerà le tue esigenze e identificherà i migliori professionisti locali per te.'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-terracotta/20 text-terracotta rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-stone-800 mb-1">
                    {language === 'en' ? 'Initial Contact' : 'Primo Contatto'}
                  </h3>
                  <p className="text-stone-600">
                    {language === 'en'
                      ? 'We&apos;ll reach out via email with a personalized proposal and suggested next steps.'
                      : 'Ti contatteremo via email con una proposta personalizzata e i prossimi passi suggeriti.'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-terracotta/20 text-terracotta rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-stone-800 mb-1">
                    {language === 'en' ? 'Free Consultation' : 'Consulenza Gratuita'}
                  </h3>
                  <p className="text-stone-600">
                    {language === 'en'
                      ? 'Schedule a free video call to discuss your property goals and answer any questions.'
                      : 'Pianifica una videochiamata gratuita per discutere i tuoi obiettivi e rispondere a qualsiasi domanda.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-sea/10 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-stone-800 mb-3">
              {language === 'en' ? 'While You Wait' : 'Mentre Aspetti'}
            </h3>
            <p className="text-stone-600 mb-4">
              {language === 'en'
                ? 'Explore these resources to learn more about buying property in Puglia:'
                : 'Esplora queste risorse per saperne di più sull&apos;acquisto di proprietà in Puglia:'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/guides/buying-in-puglia" className="text-sea hover:text-sea-dark font-medium underline">
                {language === 'en' ? 'Buying Guide' : 'Guida all&apos;Acquisto'}
              </a>
              <a href="/guides/property-types" className="text-sea hover:text-sea-dark font-medium underline">
                {language === 'en' ? 'Property Types' : 'Tipi di Proprietà'}
              </a>
              <a href="/guides/legal-process" className="text-sea hover:text-sea-dark font-medium underline">
                {language === 'en' ? 'Legal Process' : 'Processo Legale'}
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-terracotta text-white rounded-lg font-semibold hover:bg-terracotta-dark transition-all"
            >
              {language === 'en' ? 'Back to Home' : 'Torna alla Home'}
            </button>
            <button
              onClick={() => router.push('/buyer')}
              className="px-8 py-3 bg-white text-terracotta border-2 border-terracotta rounded-lg font-semibold hover:bg-terracotta/5 transition-all"
            >
              {language === 'en' ? 'Learn More' : 'Scopri di Più'}
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-stone-200">
            <p className="text-stone-600 mb-2">
              {language === 'en' ? 'Need immediate assistance?' : 'Hai bisogno di assistenza immediata?'}
            </p>
            <p className="text-stone-700">
              {language === 'en' ? 'Email us at' : 'Scrivici a'}{' '}
              <a href="mailto:info@apulink.com" className="text-terracotta hover:text-terracotta-dark font-medium">
                info@apulink.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
