// PATH: app/buyer/page.tsx
'use client'
import { useState } from 'react'

export default function BuyerPage() {
  const [language, setLanguage] = useState<'it' | 'en'>('en')
  
  return (
    <>
      {/* Language Toggle - Premium style */}
      <div className="fixed top-24 right-8 z-50">
        <button 
          onClick={() => setLanguage(language === 'it' ? 'en' : 'it')}
          className="flex items-center space-x-2 text-stone-700 hover:text-terracotta font-medium bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-stone-200 transition-all hover:shadow-xl"
        >
          <span className="text-xl">{language === 'en' ? '🇬🇧' : '🇮🇹'}</span>
          <span className="font-semibold">{language === 'en' ? 'IT' : 'EN'}</span>
        </button>
      </div>

      {/* Hero Section with Real Value */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1920&q=85" 
            alt="Luxury Trullo in Puglia"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 mb-6">
              <svg className="w-5 h-5 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium">
                {language === 'en' ? '500+ Happy Property Owners' : '500+ Proprietari Soddisfatti'}
              </span>
            </div>

            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {language === 'en' 
                ? <>Your Dream Home<br/>in Puglia <span className="text-terracotta">Awaits</span></>
                : <>La Tua Casa dei Sogni<br/>in Puglia <span className="text-terracotta">Ti Aspetta</span></>
              }
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {language === 'en'
                ? 'Access exclusive properties, get expert guidance, and make your Italian dream a reality with trusted professionals by your side.'
                : 'Accedi a proprietà esclusive, ottieni consulenza esperta e realizza il tuo sogno italiano con professionisti di fiducia al tuo fianco.'
              }
            </p>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-terracotta">€180k</div>
                <div className="text-sm text-white/80">
                  {language === 'en' ? 'Average Saving' : 'Risparmio Medio'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-terracotta">45</div>
                <div className="text-sm text-white/80">
                  {language === 'en' ? 'Days to Close' : 'Giorni per Chiudere'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-terracotta">100%</div>
                <div className="text-sm text-white/80">
                  {language === 'en' ? 'Secure Process' : 'Processo Sicuro'}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/buyer/inquiry"
                className="inline-flex items-center justify-center bg-terracotta text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-terracotta-dark transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                {language === 'en' ? 'Start Your Free Search' : 'Inizia la Ricerca Gratuita'}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <button className="inline-flex items-center justify-center bg-white/10 backdrop-blur border-2 border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all duration-200">
                {language === 'en' ? 'Browse Properties' : 'Sfoglia Proprietà'}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* What You Get - Clear Value */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              {language === 'en' ? 'Your Exclusive Buyer Benefits' : 'I Tuoi Vantaggi Esclusivi'}
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Register for free and unlock powerful tools and exclusive access'
                : 'Registrati gratuitamente e sblocca strumenti potenti e accesso esclusivo'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-gradient-to-br from-terracotta/5 to-terracotta/10 rounded-2xl p-8 border border-terracotta/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-terracotta rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-stone-800 mb-3">
                {language === 'en' ? 'Off-Market Properties' : 'Proprietà Fuori Mercato'}
              </h3>
              <p className="text-stone-600 mb-4">
                {language === 'en'
                  ? 'Access properties before they hit the public market. Get first viewing rights on exclusive listings.'
                  : 'Accedi alle proprietà prima che arrivino sul mercato pubblico. Ottieni diritti di prima visione su annunci esclusivi.'
                }
              </p>
              <div className="text-terracotta font-semibold">
                {language === 'en' ? '30+ exclusive listings' : '30+ annunci esclusivi'}
              </div>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-gradient-to-br from-sea/5 to-sea/10 rounded-2xl p-8 border border-sea/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-sea rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-stone-800 mb-3">
                {language === 'en' ? 'Smart Tools & Analytics' : 'Strumenti Intelligenti'}
              </h3>
              <p className="text-stone-600 mb-4">
                {language === 'en'
                  ? 'ROI calculator, tax estimator, renovation cost planner, and market trend analysis at your fingertips.'
                  : 'Calcolatore ROI, stimatore fiscale, pianificatore costi ristrutturazione e analisi tendenze di mercato.'
                }
              </p>
              <div className="text-sea font-semibold">
                {language === 'en' ? 'Save hours of research' : 'Risparmia ore di ricerca'}
              </div>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-gradient-to-br from-olive/5 to-olive/10 rounded-2xl p-8 border border-olive/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-olive rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-stone-800 mb-3">
                {language === 'en' ? 'Expert Guides & Resources' : 'Guide Esperte'}
              </h3>
              <p className="text-stone-600 mb-4">
                {language === 'en'
                  ? 'Legal guides, buying process timeline, area comparisons, and video tours of Puglia regions.'
                  : 'Guide legali, timeline del processo di acquisto, confronti tra aree e video tour delle regioni pugliesi.'
                }
              </p>
              <div className="text-olive font-semibold">
                {language === 'en' ? '50+ resources available' : '50+ risorse disponibili'}
              </div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {/* Benefit 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-stone-200">
              <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-stone-800 mb-3">
                {language === 'en' ? 'Personal Property Advisor' : 'Consulente Personale'}
              </h3>
              <p className="text-stone-600">
                {language === 'en'
                  ? 'Get matched with an English-speaking advisor who understands your needs and guides you through every step.'
                  : `Abbinamento con un consulente che parla inglese e comprende le tue esigenze.`
                }
              </p>
            </div>
            
            {/* Benefit 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-stone-200">
              <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-stone-800 mb-3">
                {language === 'en' ? 'Virtual Property Tours' : 'Tour Virtuali'}
              </h3>
              <p className="text-stone-600">
                {language === 'en'
                  ? `Can't visit in person? Experience properties through professional virtual tours and drone footage.`
                  : 'Non puoi visitare di persona? Vivi le proprietà attraverso tour virtuali professionali.'
                }
              </p>
            </div>
            
            {/* Benefit 6 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-stone-200">
              <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-stone-800 mb-3">
                {language === 'en' ? 'Verified & Secure' : 'Verificato e Sicuro'}
              </h3>
              <p className="text-stone-600">
                {language === 'en'
                  ? 'All properties legally verified, all professionals background-checked, all transactions secure.'
                  : 'Tutte le proprietà verificate legalmente, tutti i professionisti controllati.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-4xl font-bold text-center mb-16 text-stone-800">
            {language === 'en' ? 'Success Stories from Real Buyers' : 'Storie di Successo'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
                  alt="James"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-stone-800">James & Sarah Miller</div>
                  <div className="text-stone-600">London, UK</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-stone-700 italic">
                {language === 'en'
                  ? `"Found our dream trullo in just 6 weeks. The virtual tours saved us 3 trips, and the ROI calculator helped us make a smart investment."`
                  : `"Trovato il nostro trullo dei sogni in sole 6 settimane. I tour virtuali ci hanno risparmiato 3 viaggi."`
                }
              </p>
              <div className="mt-4 text-sm text-terracotta font-semibold">
                Purchased in Ostuni - €285,000
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" 
                  alt="Emma"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-stone-800">Emma Schmidt</div>
                  <div className="text-stone-600">Munich, Germany</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-stone-700 italic">
                {language === 'en'
                  ? `"The tax calculator alone saved me €15,000. Having all documents translated and verified gave me complete peace of mind."`
                  : `"Il calcolatore fiscale mi ha fatto risparmiare €15.000. Avere tutti i documenti tradotti mi ha dato tranquillità."`
                }
              </p>
              <div className="mt-4 text-sm text-terracotta font-semibold">
                Purchased Masseria - €520,000
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
                  alt="Robert"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-stone-800">Robert Chen</div>
                  <div className="text-stone-600">New York, USA</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-stone-700 italic">
                {language === 'en'
                  ? `"Access to off-market properties was a game-changer. Found a villa that wasn't even listed publicly yet."`
                  : `"L'accesso a proprietà fuori mercato è stato fondamentale. Trovata una villa non ancora pubblicata."`
                }
              </p>
              <div className="mt-4 text-sm text-terracotta font-semibold">
                Villa in Polignano - €750,000
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=50&fit=crop" alt="Security" className="h-12 mx-auto mb-3 opacity-60 grayscale" />
              <div className="text-sm text-stone-600">Bank-Level Security</div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=100&h=50&fit=crop" alt="Licensed" className="h-12 mx-auto mb-3 opacity-60 grayscale" />
              <div className="text-sm text-stone-600">Licensed Professionals</div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=50&fit=crop" alt="Insurance" className="h-12 mx-auto mb-3 opacity-60 grayscale" />
              <div className="text-sm text-stone-600">Fully Insured</div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=100&h=50&fit=crop" alt="Legal" className="h-12 mx-auto mb-3 opacity-60 grayscale" />
              <div className="text-sm text-stone-600">Legal Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Design */}
      <section className="py-24 bg-gradient-to-br from-terracotta to-terracotta-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute transform rotate-45 -right-40 -top-40 w-80 h-80 bg-white/20 rounded-full"></div>
          <div className="absolute transform rotate-45 -left-40 -bottom-40 w-80 h-80 bg-white/20 rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' 
              ? 'Start Your Puglia Property Journey Today'
              : 'Inizia Oggi il Tuo Viaggio Immobiliare in Puglia'
            }
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Join 500+ smart buyers who found their dream property with our exclusive tools and expert network.'
              : 'Unisciti a 500+ acquirenti che hanno trovato la proprietà dei loro sogni con i nostri strumenti esclusivi.'
            }
          </p>
          
          <div className="bg-white/20 backdrop-blur rounded-xl p-8 max-w-xl mx-auto mb-8">
            <h3 className="font-semibold text-xl mb-4">
              {language === 'en' ? 'Register Now and Get:' : 'Registrati Ora e Ottieni:'}
            </h3>
            <ul className="text-left space-y-3 mb-6">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-white mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{language === 'en' ? 'Instant access to 200+ properties' : 'Accesso istantaneo a 200+ proprietà'}</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-white mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{language === 'en' ? 'Free consultation worth €500' : 'Consulenza gratuita del valore di €500'}</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-white mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{language === 'en' ? 'Exclusive buyer guide PDF' : 'Guida esclusiva per acquirenti PDF'}</span>
              </li>
            </ul>
            
            <a 
              href="/buyer/inquiry"
              className="inline-flex items-center justify-center bg-white text-terracotta px-10 py-4 rounded-lg font-bold text-lg hover:bg-stone-100 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 w-full"
            >
              {language === 'en' ? 'Create Free Account' : 'Crea Account Gratuito'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
          
          <p className="text-white/70 text-sm">
            {language === 'en' 
              ? 'No credit card required • Cancel anytime • 100% secure'
              : 'Nessuna carta di credito • Cancella quando vuoi • 100% sicuro'
            }
          </p>
        </div>
      </section>
    </>
  )
}
