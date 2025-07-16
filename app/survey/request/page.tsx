// PATH: app/survey/request/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitSurveyRequest } from '@/lib/supabase/client'

interface SurveyRequestData {
  // Contact Info
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Property Details
  propertyType: string
  propertyAddress: string
  city: string
  province: string
  cadastralDetails: string
  
  // Survey Requirements
  surveyType: string[]
  urgency: string
  additionalNotes: string
  
  // Budget
  maxBudget: string
}

export default function SurveyRequestPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<'en' | 'it'>('en')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<SurveyRequestData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: '',
    propertyAddress: '',
    city: '',
    province: 'BA', // Default to Bari
    cadastralDetails: '',
    surveyType: [],
    urgency: 'normal',
    additionalNotes: '',
    maxBudget: ''
  })

  const totalSteps = 3

  const handleInputChange = (field: keyof SurveyRequestData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayToggle = (value: string) => {
    setFormData(prev => ({
      ...prev,
      surveyType: prev.surveyType.includes(value)
        ? prev.surveyType.filter(item => item !== value)
        : [...prev.surveyType, value]
    }))
  }

  const canProceedStep1 = formData.firstName && formData.lastName && formData.email && formData.phone
  const canProceedStep2 = formData.propertyType && formData.propertyAddress && formData.city && formData.province
  const canProceedStep3 = formData.surveyType.length > 0 && formData.maxBudget

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Submit to Supabase
      const { success, error } = await submitSurveyRequest(formData)
      
      if (success) {
        // Redirect to dashboard
        router.push('/survey/dashboard')
      } else {
        alert(language === 'en' 
          ? 'Error submitting request. Please try again.' 
          : 'Errore nell\'invio della richiesta. Riprova.'
        )
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-2">
                {language === 'en' ? 'Request Survey Quotes' : 'Richiedi Preventivi Perizia'}
              </h1>
              <p className="text-stone-600">
                {language === 'en' 
                  ? 'Get competitive quotes from verified surveyors in Puglia'
                  : 'Ricevi preventivi competitivi da geometri verificati in Puglia'
                }
              </p>
            </div>
            
            {/* Language Toggle */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'it' : 'en')}
              className="flex items-center space-x-2 text-stone-600 hover:text-terracotta font-medium"
            >
              <span className="text-xl">{language === 'en' ? '🇬🇧' : '🇮🇹'}</span>
              <span>{language === 'en' ? 'IT' : 'EN'}</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-2">
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

        {/* Form */}
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
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
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
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {language === 'en' ? 'Email' : 'Email'} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {language === 'en' ? 'Phone' : 'Telefono'} *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                />
              </div>
            </div>
          )}

          {/* Step 2: Property Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                {language === 'en' ? 'Property Details' : 'Dettagli Proprietà'}
              </h2>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {language === 'en' ? 'Property Type' : 'Tipo di Proprietà'} *
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                >
                  <option value="">{language === 'en' ? 'Select...' : 'Seleziona...'}</option>
                  <option value="trullo">Trullo</option>
                  <option value="masseria">Masseria</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">{language === 'en' ? 'Apartment' : 'Appartamento'}</option>
                  <option value="land">{language === 'en' ? 'Land' : 'Terreno'}</option>
                  <option value="commercial">{language === 'en' ? 'Commercial' : 'Commerciale'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {language === 'en' ? 'Property Address' : 'Indirizzo Proprietà'} *
                </label>
                <input
                  type="text"
                  value={formData.propertyAddress}
                  onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  placeholder={language === 'en' ? 'Street address or locality' : 'Via o località'}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'en' ? 'City' : 'Comune'} *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                    placeholder="Ostuni, Alberobello, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'en' ? 'Province' : 'Provincia'} *
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  >
                    <option value="BA">Bari (BA)</option>
                    <option value="BR">Brindisi (BR)</option>
                    <option value="BT">Barletta-Andria-Trani (BT)</option>
                    <option value="FG">Foggia (FG)</option>
                    <option value="LE">Lecce (LE)</option>
                    <option value="TA">Taranto (TA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {language === 'en' ? 'Cadastral Details (if known)' : 'Dati Catastali (se noti)'}
                </label>
                <textarea
                  value={formData.cadastralDetails}
                  onChange={(e) => handleInputChange('cadastralDetails', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  placeholder={language === 'en' ? 'Foglio, Particella, Subalterno...' : 'Foglio, Particella, Subalterno...'}
                />
              </div>
            </div>
          )}

          {/* Step 3: Survey Requirements */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                {language === 'en' ? 'Survey Requirements' : 'Requisiti Perizia'}
              </h2>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  {language === 'en' ? 'Type of Survey Needed' : 'Tipo di Perizia Necessaria'} *
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'structural', label: language === 'en' ? 'Structural Assessment' : 'Valutazione Strutturale' },
                    { value: 'valuation', label: language === 'en' ? 'Property Valuation' : 'Valutazione Immobiliare' },
                    { value: 'energy', label: language === 'en' ? 'Energy Certificate (APE)' : 'Certificato Energetico (APE)' },
                    { value: 'compliance', label: language === 'en' ? 'Building Compliance' : 'Conformità Edilizia' },
                    { value: 'cadastral', label: language === 'en' ? 'Cadastral Verification' : 'Verifica Catastale' },
                    { value: 'mortgage', label: language === 'en' ? 'Mortgage Survey' : 'Perizia per Mutuo' }
                  ].map(type => (
                    <label key={type.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.surveyType.includes(type.value)}
                        onChange={() => handleArrayToggle(type.value)}
                        className="w-5 h-5 text-terracotta border-stone-300 rounded focus:ring-terracotta"
                      />
                      <span className="text-stone-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {language === 'en' ? 'Urgency' : 'Urgenza'}
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => handleInputChange('urgency', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                >
                  <option value="normal">{language === 'en' ? 'Normal (1-2 weeks)' : 'Normale (1-2 settimane)'}</option>
                  <option value="urgent">{language === 'en' ? 'Urgent (within 1 week)' : 'Urgente (entro 1 settimana)'}</option>
                  <option value="asap">{language === 'en' ? 'ASAP (2-3 days)' : 'Subito (2-3 giorni)'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {language === 'en' ? 'Maximum Budget (EUR)' : 'Budget Massimo (EUR)'} *
                </label>
                <select
                  value={formData.maxBudget}
                  onChange={(e) => handleInputChange('maxBudget', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                >
                  <option value="">{language === 'en' ? 'Select budget range...' : 'Seleziona fascia di budget...'}</option>
                  <option value="0-500">€0 - €500</option>
                  <option value="500-1000">€500 - €1,000</option>
                  <option value="1000-2000">€1,000 - €2,000</option>
                  <option value="2000-5000">€2,000 - €5,000</option>
                  <option value="5000+">€5,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {language === 'en' ? 'Additional Notes' : 'Note Aggiuntive'}
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  placeholder={language === 'en' 
                    ? 'Any specific requirements or concerns...'
                    : 'Requisiti specifici o preoccupazioni...'
                  }
                />
              </div>

              {/* Info Box */}
              <div className="bg-terracotta/10 rounded-lg p-6">
                <h3 className="font-semibold text-stone-800 mb-2">
                  {language === 'en' ? 'What happens next?' : 'Cosa succede dopo?'}
                </h3>
                <ul className="space-y-2 text-stone-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-terracotta mr-2">✓</span>
                    {language === 'en' 
                      ? 'Verified surveyors in your area will receive your request'
                      : 'I geometri verificati nella tua zona riceveranno la richiesta'
                    }
                  </li>
                  <li className="flex items-start">
                    <span className="text-terracotta mr-2">✓</span>
                    {language === 'en' 
                      ? 'You&apos;ll receive quotes within 48 hours'
                      : 'Riceverai preventivi entro 48 ore'
                    }
                  </li>
                  <li className="flex items-start">
                    <span className="text-terracotta mr-2">✓</span>
                    {language === 'en' 
                      ? 'Compare quotes and chat anonymously before choosing'
                      : 'Confronta preventivi e chatta anonimamente prima di scegliere'
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
                className="px-6 py-3 text-stone-600 hover:text-stone-800 font-medium"
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
                  ((currentStep === 1 && !canProceedStep1) || (currentStep === 2 && !canProceedStep2))
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-terracotta text-white hover:bg-terracotta-dark'
                }`}
              >
                {language === 'en' ? 'Next →' : 'Avanti →'}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !canProceedStep3}
                className={`ml-auto px-8 py-3 rounded-lg font-semibold transition-all ${
                  isSubmitting || !canProceedStep3
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
                    {language === 'en' ? 'Submitting...' : 'Invio...'}
                  </span>
                ) : (
                  language === 'en' ? 'Submit Request' : 'Invia Richiesta'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
