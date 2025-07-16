// PATH: app/buyer/inquiry/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitBuyerInquiry } from '@/lib/supabase/client'

interface FormData {
  // Contact Information
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  preferredLanguage: string
  
  // Property Interest
  propertyType: string[]
  budget: string
  locations: string[]
  timeline: string
  purpose: string
  
  // Additional Information
  hasVisitedPuglia: boolean
  needsFinancing: boolean
  additionalNotes: string
}

export default function BuyerInquiryPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<'en' | 'it'>('en')
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    preferredLanguage: 'en',
    propertyType: [],
    budget: '',
    locations: [],
    timeline: '',
    purpose: 'residence',
    hasVisitedPuglia: false,
    needsFinancing: false,
    additionalNotes: ''
  })

  const totalSteps = 3

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayToggle = (field: 'propertyType' | 'locations', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const canProceedStep1 = formData.firstName && formData.lastName && formData.email && formData.phone
  const canProceedStep2 = formData.propertyType.length > 0 && formData.budget && formData.locations.length > 0
  
  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Prepare data for Supabase
      const inquiryData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality,
        preferred_language: formData.preferredLanguage,
        property_types: formData.propertyType,
        budget_range: formData.budget,
        preferred_locations: formData.locations,
        timeline: formData.timeline,
        purchase_purpose: formData.purpose,
        has_visited_puglia: formData.hasVisitedPuglia,
        needs_financing: formData.needsFinancing,
        additional_notes: formData.additionalNotes
      }

      // Submit to Supabase
      const { success, error } = await submitBuyerInquiry(inquiryData)
      
      if (success) {
        // Send notification email (API route)
        try {
          await fetch('/api/notifications/buyer-inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inquiryData)
          })
        } catch (emailError) {
          console.error('Email notification failed:', emailError)
          // Don't block the user if email fails
        }
        
        // Redirect to success page
        router.push('/buyer/inquiry/success')
      } else {
        // Show error message
        alert(language === 'en' 
          ? 'There was an error submitting your inquiry. Please try again.' 
          : 'Si è verificato un errore. Riprova.'
        )
        console.error('Submission error:', error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert(language === 'en' 
        ? 'Something went wrong. Please try again.' 
        : 'Qualcosa è andato storto. Riprova.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Header with progress */}
      <section className="bg-white border-b border-stone-200 py-6">
        <div className="max-w-3xl mx-auto px-4">
          {/* Language Toggle */}
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'it' : 'en')}
              className="flex items-center space-x-2 text-stone-600 hover:text-terracotta font-medium"
            >
              <span className="text-2xl">{language === 'en' ? '🇬🇧' : '🇮🇹'}</span>
              <span>{language === 'en' ? 'IT' : 'EN'}</span>
            </button>
          </div>

          <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-2">
            {language === 'en' ? 'Property Inquiry Form' : 'Modulo di Richiesta Proprietà'}
          </h1>
          <p className="text-stone-600">
            {language === 'en' 
              ? 'Tell us about your dream property in Puglia'
              : 'Raccontaci della tua proprietà dei sogni in Puglia'
            }
          </p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-stone-700">
                {language === 'en' ? `Step ${currentStep} of ${totalSteps}` : `Passo ${currentStep} di ${totalSteps}`}
              </span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full">
              <div 
                className="h-full bg-terracotta rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12 bg-stone-50 min-h-[600px]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8">
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                  {language === 'en' ? 'Your Contact Information' : 'I Tuoi Dati di Contatto'}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'en' ? 'First Name' : 'Nome'} *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                      placeholder={language === 'en' ? 'John' : 'Giovanni'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'en' ? 'Last Name' : 'Cognome'} *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                      placeholder={language === 'en' ? 'Smith' : 'Rossi'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'en' ? 'Email Address' : 'Indirizzo Email'} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                    placeholder="john.smith@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'en' ? 'Phone Number' : 'Numero di Telefono'} *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'en' ? 'Nationality' : 'Nazionalità'}
                    </label>
                    <select
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                    >
                      <option value="">{language === 'en' ? 'Select...' : 'Seleziona...'}</option>
                      <option value="US">🇺🇸 United States</option>
                      <option value="UK">🇬🇧 United Kingdom</option>
                      <option value="DE">🇩🇪 Germany</option>
                      <option value="FR">🇫🇷 France</option>
                      <option value="CA">🇨🇦 Canada</option>
                      <option value="AU">🇦🇺 Australia</option>
                      <option value="NL">🇳🇱 Netherlands</option>
                      <option value="CH">🇨🇭 Switzerland</option>
                      <option value="other">{language === 'en' ? 'Other' : 'Altro'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'en' ? 'Preferred Language for Communication' : 'Lingua Preferita per la Comunicazione'}
                  </label>
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                  >
                    <option value="en">English</option>
                    <option value="it">Italiano</option>
                    <option value="de">Deutsch</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Property Preferences */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                  {language === 'en' ? 'Property Preferences' : 'Preferenze Proprietà'}
                </h2>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    {language === 'en' ? 'Property Type (select all that apply)' : 'Tipo di Proprietà (seleziona tutti quelli applicabili)'} *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { value: 'trullo', label: language === 'en' ? 'Trullo' : 'Trullo' },
                      { value: 'masseria', label: language === 'en' ? 'Masseria (Farmhouse)' : 'Masseria' },
                      { value: 'villa', label: language === 'en' ? 'Villa' : 'Villa' },
                      { value: 'apartment', label: language === 'en' ? 'Apartment' : 'Appartamento' },
                      { value: 'townhouse', label: language === 'en' ? 'Townhouse' : 'Casa a schiera' },
                      { value: 'land', label: language === 'en' ? 'Land/Plot' : 'Terreno' }
                    ].map(type => (
                      <label key={type.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.propertyType.includes(type.value)}
                          onChange={() => handleArrayToggle('propertyType', type.value)}
                          className="w-5 h-5 text-terracotta border-stone-300 rounded focus:ring-terracotta"
                        />
                        <span className="text-stone-700">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'en' ? 'Budget Range (EUR)' : 'Budget (EUR)'} *
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                  >
                    <option value="">{language === 'en' ? 'Select budget range...' : 'Seleziona fascia di budget...'}</option>
                    <option value="0-100k">€0 - €100,000</option>
                    <option value="100k-250k">€100,000 - €250,000</option>
                    <option value="250k-500k">€250,000 - €500,000</option>
                    <option value="500k-1m">€500,000 - €1,000,000</option>
                    <option value="1m+">€1,000,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    {language === 'en' ? 'Preferred Locations' : 'Località Preferite'} *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Ostuni',
                      'Alberobello',
                      'Locorotondo',
                      'Martina Franca',
                      'Fasano',
                      'Cisternino',
                      'Monopoli',
                      'Polignano a Mare'
                    ].map(location => (
                      <label key={location} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.locations.includes(location)}
                          onChange={() => handleArrayToggle('locations', location)}
                          className="w-5 h-5 text-terracotta border-stone-300 rounded focus:ring-terracotta"
                        />
                        <span className="text-stone-700">{location}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'en' ? 'Timeline' : 'Tempistiche'}
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                    >
                      <option value="">{language === 'en' ? 'Select...' : 'Seleziona...'}</option>
                      <option value="immediate">{language === 'en' ? 'Ready to buy now' : 'Pronto ad acquistare ora'}</option>
                      <option value="3months">{language === 'en' ? 'Within 3 months' : 'Entro 3 mesi'}</option>
                      <option value="6months">{language === 'en' ? 'Within 6 months' : 'Entro 6 mesi'}</option>
                      <option value="1year">{language === 'en' ? 'Within 1 year' : 'Entro 1 anno'}</option>
                      <option value="exploring">{language === 'en' ? 'Just exploring' : 'Solo esplorando'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'en' ? 'Purpose' : 'Scopo'}
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => handleInputChange('purpose', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                    >
                      <option value="residence">{language === 'en' ? 'Primary residence' : 'Residenza principale'}</option>
                      <option value="vacation">{language === 'en' ? 'Vacation home' : 'Casa vacanze'}</option>
                      <option value="investment">{language === 'en' ? 'Investment/Rental' : 'Investimento/Affitto'}</option>
                      <option value="retirement">{language === 'en' ? 'Retirement' : 'Pensionamento'}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Additional Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                  {language === 'en' ? 'Additional Information' : 'Informazioni Aggiuntive'}
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasVisitedPuglia}
                      onChange={(e) => handleInputChange('hasVisitedPuglia', e.target.checked)}
                      className="w-5 h-5 text-terracotta border-stone-300 rounded focus:ring-terracotta"
                    />
                    <span className="text-stone-700">
                      {language === 'en' ? 'I have visited Puglia before' : 'Ho già visitato la Puglia'}
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.needsFinancing}
                      onChange={(e) => handleInputChange('needsFinancing', e.target.checked)}
                      className="w-5 h-5 text-terracotta border-stone-300 rounded focus:ring-terracotta"
                    />
                    <span className="text-stone-700">
                      {language === 'en' ? 'I need financing assistance' : 'Ho bisogno di assistenza finanziaria'}
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'en' 
                      ? 'Tell us more about your dream property (optional)' 
                      : 'Raccontaci di più sulla tua proprietà dei sogni (opzionale)'
                    }
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                    placeholder={language === 'en' 
                      ? 'Any specific requirements, questions, or details you&apos;d like to share...'
                      : 'Requisiti specifici, domande o dettagli che vorresti condividere...'
                    }
                  />
                </div>

                <div className="bg-terracotta/10 rounded-lg p-6">
                  <h3 className="font-semibold text-stone-800 mb-2">
                    {language === 'en' ? 'What happens next?' : 'Cosa succede dopo?'}
                  </h3>
                  <ul className="space-y-2 text-stone-700">
                    <li className="flex items-start">
                      <span className="text-terracotta mr-2">✓</span>
                      {language === 'en' 
                        ? 'We&apos;ll review your inquiry within 24 hours'
                        : 'Esamineremo la tua richiesta entro 24 ore'
                      }
                    </li>
                    <li className="flex items-start">
                      <span className="text-terracotta mr-2">✓</span>
                      {language === 'en' 
                        ? 'Match you with qualified local professionals'
                        : 'Ti abbineremo con professionisti locali qualificati'
                      }
                    </li>
                    <li className="flex items-start">
                      <span className="text-terracotta mr-2">✓</span>
                      {language === 'en' 
                        ? 'Schedule a free consultation call'
                        : 'Pianificare una chiamata di consulenza gratuita'
                      }
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-stone-200">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 text-stone-600 hover:text-stone-800 font-medium transition-colors"
                >
                  {language === 'en' ? '← Back' : '← Indietro'}
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2)
                  }
                  className={`ml-auto px-8 py-3 rounded-lg font-semibold transition-all ${
                    (currentStep === 1 && !canProceedStep1) || (currentStep === 2 && !canProceedStep2)
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-terracotta text-white hover:bg-terracotta-dark'
                  }`}
                >
                  {language === 'en' ? 'Next →' : 'Avanti →'}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`ml-auto px-8 py-3 rounded-lg font-semibold transition-all ${
                    isSubmitting
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-terracotta text-white hover:bg-terracotta-dark'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {language === 'en' ? 'Submitting...' : 'Invio in corso...'}
                    </span>
                  ) : (
                    language === 'en' ? 'Submit Inquiry' : 'Invia Richiesta'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
