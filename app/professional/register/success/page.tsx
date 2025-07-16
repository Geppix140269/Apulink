// PATH: app/professional/register/success/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfessionalRegisterSuccessPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<'it' | 'en'>('it')
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sea/5 to-white">
      {/* Success Message */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* Language Toggle */}
          <div className="flex justify-center mb-8">
            <button 
              onClick={() => setLanguage(language === 'it' ? 'en' : 'it')}
              className="flex items-center space-x-2 text-stone-600 hover:text-sea font-medium"
            >
              <span className="text-2xl">{language === 'it' ? '🇮🇹' : '🇬🇧'}</span>
              <span>{language === 'it' ? 'EN' : 'IT'}</span>
            </button>
          </div>

          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-sea/20 rounded-full">
              <svg className="w-12 h-12 text-sea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="font-playfair text-4xl font-bold text-stone-800 mb-4">
            {language === 'it' 
              ? 'Benvenuto nella Rete Apulink!'
              : 'Welcome to the Apulink Network!'
            }
          </h1>
          
          <p className="text-xl text-stone-600 mb-8">
            {language === 'it'
              ? 'La tua registrazione è stata ricevuta con successo. Il nostro team verificherà il tuo profilo entro 48 ore.'
              : 'Your registration has been successfully received. Our team will verify your profile within 48 hours.'
            }
          </p>

          {/* Reference Number */}
          <div className="bg-terracotta/10 rounded-lg px-6 py-4 mb-8 inline-block">
            <p className="text-sm text-stone-600 mb-1">
              {language === 'it' ? 'Numero di riferimento' : 'Reference number'}
            </p>
            <p className="font-mono text-xl text-terracotta font-bold">APL-2024-{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}</p>
          </div>

          {/* What Happens Next */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 text-left">
            <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
              {language === 'it' ? 'I Prossimi Passi' : 'Next Steps'}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-sea/20 text-sea rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-stone-800 mb-1">
                    {language === 'it' ? 'Verifica del Profilo (24-48 ore)' : 'Profile Verification (24-48 hours)'}
                  </h3>
                  <p className="text-stone-600">
                    {language === 'it'
                      ? 'Il nostro team verificherà le tue credenziali e le informazioni fornite. Potremmo contattarti per ulteriori dettagli.'
                      : 'Our team will verify your credentials and the information provided. We may contact you for additional details.'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-sea/20 text-sea rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-0.5">
                  📧
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-stone-800 mb-1">
                    {language === 'it' ? 'Email di Benvenuto' : 'Welcome Email'}
                  </h3>
                  <p className="text-stone-600">
                    {language === 'it'
                      ? 'Riceverai un&apos;email con le tue credenziali di accesso, guide utili e informazioni su come ottimizzare il tuo profilo.'
                      : 'You&apos;ll receive an email with your login credentials, useful guides, and information on how to optimize your profile.'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-sea/20 text-sea rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-0.5">
                  🎯
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-stone-800 mb-1">
                    {language === 'it' ? 'Prima Opportunità' : 'First Opportunity'}
                  </h3>
                  <p className="text-stone-600">
                    {language === 'it'
                      ? 'Non appena avremo un cliente che cerca i tuoi servizi nella tua zona, ti contatteremo immediatamente.'
                      : 'As soon as we have a client looking for your services in your area, we&apos;ll contact you immediately.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips for Success */}
          <div className="bg-olive/10 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-stone-800 mb-3">
              {language === 'it' ? '💡 Consigli per il Successo' : '💡 Tips for Success'}
            </h3>
            <ul className="space-y-2 text-stone-700">
              <li className="flex items-start">
                <span className="text-olive mr-2">•</span>
                {language === 'it'
                  ? 'Rispondi rapidamente alle richieste dei clienti (entro 24 ore)'
                  : 'Respond quickly to client requests (within 24 hours)'
                }
              </li>
              <li className="flex items-start">
                <span className="text-olive mr-2">•</span>
                {language === 'it'
                  ? 'Mantieni il tuo profilo aggiornato con progetti recenti'
                  : 'Keep your profile updated with recent projects'
                }
              </li>
              <li className="flex items-start">
                <span className="text-olive mr-2">•</span>
                {language === 'it'
                  ? 'Sii trasparente sui costi e le tempistiche'
                  : 'Be transparent about costs and timelines'
                }
              </li>
              <li className="flex items-start">
                <span className="text-olive mr-2">•</span>
                {language === 'it'
                  ? 'Usa Apulink per gestire la comunicazione con i clienti'
                  : 'Use Apulink to manage client communication'
                }
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-sea text-white rounded-lg font-semibold hover:bg-sea-dark transition-all"
            >
              {language === 'it' ? 'Torna alla Home' : 'Back to Home'}
            </button>
            <button
              onClick={() => router.push('/professional')}
              className="px-8 py-3 bg-white text-sea border-2 border-sea rounded-lg font-semibold hover:bg-sea/5 transition-all"
            >
              {language === 'it' ? 'Scopri di Più' : 'Learn More'}
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-12 pt-8 border-t border-stone-200">
            <p className="text-stone-600 mb-2">
              {language === 'it' ? 'Hai domande sulla registrazione?' : 'Questions about your registration?'}
            </p>
            <p className="text-stone-700">
              {language === 'it' ? 'Contattaci a' : 'Contact us at'}{' '}
              <a href="mailto:professionals@apulink.com" className="text-sea hover:text-sea-dark font-medium">
                professionals@apulink.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
