// PATH: app/professional/register/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitProfessionalRegistration } from '@/lib/supabase/client'

interface FormData {
  // Step 1: Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Step 2: Professional Information
  profession: string
  companyName: string
  vatNumber: string
  professionalLicense: string
  yearsExperience: string
  website: string
  
  // Step 3: Service Details
  services: string[]
  languages: string[]
  serviceAreas: string[]
  maxDistance: string
  
  // Step 4: Experience & Portfolio
  clientsServed: string
  specializations: string[]
  bio: string
  
  // Step 5: Terms & Verification
  agreeTerms: boolean
  agreeCommission: boolean
  marketingConsent: boolean
}

export default function ProfessionalRegisterPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<'it' | 'en'>('it') // Default Italian for locals
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profession: '',
    companyName: '',
    vatNumber: '',
    professionalLicense: '',
    yearsExperience: '',
    website: '',
    services: [],
    languages: [],
    serviceAreas: [],
    maxDistance: '50',
    clientsServed: '',
    specializations: [],
    bio: '',
    agreeTerms: false,
    agreeCommission: false,
    marketingConsent: false
  })

  const totalSteps = 5

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayToggle = (field: 'services' | 'languages' | 'serviceAreas' | 'specializations', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  // Validation for each step
  const canProceedStep1 = formData.firstName && formData.lastName && formData.email && formData.phone
  const canProceedStep2 = formData.profession && formData.companyName && formData.vatNumber
  const canProceedStep3 = formData.services.length > 0 && formData.languages.length > 0 && formData.serviceAreas.length > 0
  const canProceedStep4 = formData.clientsServed && formData.bio
  const canProceedStep5 = formData.agreeTerms && formData.agreeCommission
  
  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Prepare data for Supabase
      const professionalData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        profession: formData.profession,
        company_name: formData.companyName,
        vat_number: formData.vatNumber,
        professional_license: formData.professionalLicense,
        years_experience: formData.yearsExperience,
        website: formData.website,
        services: formData.services,
        languages: formData.languages,
        service_areas: formData.serviceAreas,
        max_distance: formData.maxDistance,
        clients_served: formData.clientsServed,
        specializations: formData.specializations,
        bio: formData.bio
      }

      // Submit to Supabase
      const { success, error } = await submitProfessionalRegistration(professionalData)
      
      if (success) {
        // Send notification email (API route)
        try {
          await fetch('/api/notifications/professional-registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...professionalData,
              preferred_language: language
            })
          })
        } catch (emailError) {
          console.error('Email notification failed:', emailError)
          // Don't block the user if email fails
        }
        
        // Redirect to success page
        router.push('/professional/register/success')
      } else {
        // Show error message
        alert(language === 'it' 
          ? 'Si è verificato un errore durante la registrazione. Riprova.' 
          : 'There was an error with your registration. Please try again.'
        )
        console.error('Registration error:', error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert(language === 'it' 
        ? 'Qualcosa è andato storto. Riprova.' 
        : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const professionOptions = [
    { value: 'geometra', label: { it: 'Geometra', en: 'Surveyor' } },
    { value: 'architect', label: { it: 'Architetto', en: 'Architect' } },
    { value: 'lawyer', label: { it: 'Avvocato', en: 'Lawyer' } },
    { value: 'notary', label: { it: 'Notaio', en: 'Notary' } },
    { value: 'realtor', label: { it: 'Agente Immobiliare', en: 'Real Estate Agent' } },
    { value: 'contractor', label: { it: 'Impresa Edile', en: 'Construction Company' } },
    { value: 'accountant', label: { it: 'Commercialista', en: 'Accountant' } }
  ]

  const serviceOptions = {
    geometra: [
      { value: 'cadastral', label: { it: 'Pratiche catastali', en: 'Cadastral services' } },
      { value: 'survey', label: { it: 'Rilievi topografici', en: 'Topographic surveys' } },
      { value: 'permits', label: { it: 'Pratiche edilizie', en: 'Building permits' } },
      { value: 'appraisal', label: { it: 'Stime immobiliari', en: 'Property appraisals' } }
    ],
    architect: [
      { value: 'design', label: { it: 'Progettazione', en: 'Architectural design' } },
      { value: 'renovation', label: { it: 'Ristrutturazioni', en: 'Renovations' } },
      { value: 'interior', label: { it: 'Interior design', en: 'Interior design' } },
      { value: 'landscape', label: { it: 'Progettazione giardini', en: 'Landscape design' } }
    ],
    lawyer: [
      { value: 'duediligence', label: { it: 'Due diligence', en: 'Due diligence' } },
      { value: 'contracts', label: { it: 'Contratti', en: 'Contracts' } },
      { value: 'fiscal', label: { it: 'Consulenza fiscale', en: 'Tax consulting' } },
      { value: 'inheritance', label: { it: 'Successioni', en: 'Inheritance' } }
    ],
    notary: [
      { value: 'deeds', label: { it: 'Atti di vendita', en: 'Sales deeds' } },
      { value: 'mortgages', label: { it: 'Mutui', en: 'Mortgages' } },
      { value: 'donations', label: { it: 'Donazioni', en: 'Donations' } }
    ],
    realtor: [
      { value: 'buying', label: { it: 'Assistenza acquisto', en: 'Buying assistance' } },
      { value: 'selling', label: { it: 'Vendita immobili', en: 'Property sales' } },
      { value: 'valuation', label: { it: 'Valutazioni', en: 'Valuations' } },
      { value: 'rental', label: { it: 'Gestione affitti', en: 'Rental management' } }
    ],
    contractor: [
      { value: 'construction', label: { it: 'Costruzioni', en: 'Construction' } },
      { value: 'restoration', label: { it: 'Restauri', en: 'Restoration' } },
      { value: 'trullo', label: { it: 'Restauro trulli', en: 'Trullo restoration' } },
      { value: 'pool', label: { it: 'Piscine', en: 'Swimming pools' } }
    ],
    accountant: [
      { value: 'tax', label: { it: 'Consulenza fiscale', en: 'Tax consulting' } },
      { value: 'vat', label: { it: 'Apertura partita IVA', en: 'VAT registration' } },
      { value: 'accounting', label: { it: 'Contabilità', en: 'Accounting' } }
    ]
  }

  const currentServices = serviceOptions[formData.profession as keyof typeof serviceOptions] || []

  return (
    <>
      {/* Header with progress */}
      <section className="bg-white border-b border-stone-200 py-6">
        <div className="max-w-3xl mx-auto px-4">
          {/* Language Toggle */}
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setLanguage(language === 'it' ? 'en' : 'it')}
              className="flex items-center space-x-2 text-stone-600 hover:text-sea font-medium"
            >
              <span className="text-2xl">{language === 'it' ? '🇮🇹' : '🇬🇧'}</span>
              <span>{language === 'it' ? 'EN' : 'IT'}</span>
            </button>
          </div>

          <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-2">
            {language === 'it' ? 'Registrazione Professionista' : 'Professional Registration'}
          </h1>
          <p className="text-stone-600">
            {language === 'it' 
              ? 'Unisciti alla rete Apulink e accedi a clienti internazionali'
              : 'Join the Apulink network and access international clients'
            }
          </p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-stone-700">
                {language === 'it' ? `Passo ${currentStep} di ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`}
              </span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full">
              <div 
                className="h-full bg-sea rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            {/* Step Labels */}
            <div className="grid grid-cols-5 gap-2 mt-2">
              <span className={`text-xs ${currentStep >= 1 ? 'text-sea font-medium' : 'text-stone-500'}`}>
                {language === 'it' ? 'Dati' : 'Info'}
              </span>
              <span className={`text-xs ${currentStep >= 2 ? 'text-sea font-medium' : 'text-stone-500'}`}>
                {language === 'it' ? 'Professione' : 'Profession'}
              </span>
              <span className={`text-xs ${currentStep >= 3 ? 'text-sea font-medium' : 'text-stone-500'}`}>
                {language === 'it' ? 'Servizi' : 'Services'}
              </span>
              <span className={`text-xs ${currentStep >= 4 ? 'text-sea font-medium' : 'text-stone-500'}`}>
                {language === 'it' ? 'Esperienza' : 'Experience'}
              </span>
              <span className={`text-xs text-right ${currentStep >= 5 ? 'text-sea font-medium' : 'text-stone-500'}`}>
                {language === 'it' ? 'Conferma' : 'Confirm'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12 bg-stone-50 min-h-[600px]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                  {language === 'it' ? 'Informazioni Personali' : 'Personal Information'}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'it' ? 'Nome' : 'First Name'} *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                      placeholder={language === 'it' ? 'Mario' : 'John'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'it' ? 'Cognome' : 'Last Name'} *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                      placeholder={language === 'it' ? 'Rossi' : 'Smith'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'it' ? 'Email Professionale' : 'Professional Email'} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                    placeholder="mario.rossi@studio.it"
                  />
                  <p className="text-xs text-stone-500 mt-1">
                    {language === 'it' 
                      ? 'Useremo questa email per le comunicazioni con i clienti'
                      : 'We&apos;ll use this email for client communications'
                    }
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'it' ? 'Telefono' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                    placeholder="+39 080 123 4567"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                  {language === 'it' ? 'Informazioni Professionali' : 'Professional Information'}
                </h2>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'it' ? 'Professione' : 'Profession'} *
                  </label>
                  <select
                    value={formData.profession}
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                  >
                    <option value="">{language === 'it' ? 'Seleziona...' : 'Select...'}</option>
                    {professionOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label[language]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'it' ? 'Nome Studio/Azienda' : 'Company Name'} *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                    placeholder={language === 'it' ? 'Studio Rossi' : 'Smith & Associates'}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'it' ? 'Partita IVA' : 'VAT Number'} *
                    </label>
                    <input
                      type="text"
                      value={formData.vatNumber}
                      onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                      placeholder="IT12345678901"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'it' ? 'Numero Iscrizione Albo' : 'License Number'}
                    </label>
                    <input
                      type="text"
                      value={formData.professionalLicense}
                      onChange={(e) => handleInputChange('professionalLicense', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                      placeholder={language === 'it' ? 'Es. BA/1234' : 'e.g. BA/1234'}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'it' ? 'Anni di Esperienza' : 'Years of Experience'}
                    </label>
                    <select
                      value={formData.yearsExperience}
                      onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                    >
                      <option value="">{language === 'it' ? 'Seleziona...' : 'Select...'}</option>
                      <option value="0-2">0-2 {language === 'it' ? 'anni' : 'years'}</option>
                      <option value="3-5">3-5 {language === 'it' ? 'anni' : 'years'}</option>
                      <option value="6-10">6-10 {language === 'it' ? 'anni' : 'years'}</option>
                      <option value="11-20">11-20 {language === 'it' ? 'anni' : 'years'}</option>
                      <option value="20+">20+ {language === 'it' ? 'anni' : 'years'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'it' ? 'Sito Web' : 'Website'}
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                      placeholder="https://www.studiorossi.it"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Service Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                  {language === 'it' ? 'Dettagli Servizi' : 'Service Details'}
                </h2>

                {formData.profession && (
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-3">
                      {language === 'it' ? 'Servizi Offerti' : 'Services Offered'} *
                    </label>
                    <div className="space-y-3">
                      {currentServices.map(service => (
                        <label key={service.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service.value)}
                            onChange={() => handleArrayToggle('services', service.value)}
                            className="w-5 h-5 text-sea border-stone-300 rounded focus:ring-sea"
                          />
                          <span className="text-stone-700">{service.label[language]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    {language === 'it' ? 'Lingue Parlate' : 'Languages Spoken'} *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { value: 'it', label: 'Italiano' },
                      { value: 'en', label: 'English' },
                      { value: 'de', label: 'Deutsch' },
                      { value: 'fr', label: 'Français' },
                      { value: 'es', label: 'Español' },
                      { value: 'ru', label: 'Русский' }
                    ].map(lang => (
                      <label key={lang.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(lang.value)}
                          onChange={() => handleArrayToggle('languages', lang.value)}
                          className="w-5 h-5 text-sea border-stone-300 rounded focus:ring-sea"
                        />
                        <span className="text-stone-700">{lang.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    {language === 'it' ? 'Zone di Servizio' : 'Service Areas'} *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Bari',
                      'Brindisi',
                      'Lecce',
                      'Taranto',
                      'Foggia',
                      'BAT',
                      language === 'it' ? 'Tutta la Puglia' : 'All Puglia'
                    ].map(area => (
                      <label key={area} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.serviceAreas.includes(area)}
                          onChange={() => handleArrayToggle('serviceAreas', area)}
                          className="w-5 h-5 text-sea border-stone-300 rounded focus:ring-sea"
                        />
                        <span className="text-stone-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'it' ? 'Distanza Massima di Spostamento' : 'Maximum Travel Distance'}
                  </label>
                  <select
                    value={formData.maxDistance}
                    onChange={(e) => handleInputChange('maxDistance', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                  >
                    <option value="25">25 km</option>
                    <option value="50">50 km</option>
                    <option value="100">100 km</option>
                    <option value="200">200 km</option>
                    <option value="all">{language === 'it' ? 'Tutta la Puglia' : 'All Puglia'}</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Experience & Portfolio */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                  {language === 'it' ? 'Esperienza e Portfolio' : 'Experience & Portfolio'}
                </h2>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'it' ? 'Clienti Stranieri Serviti' : 'Foreign Clients Served'} *
                  </label>
                  <select
                    value={formData.clientsServed}
                    onChange={(e) => handleInputChange('clientsServed', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                  >
                    <option value="">{language === 'it' ? 'Seleziona...' : 'Select...'}</option>
                    <option value="none">{language === 'it' ? 'Nessuno ancora' : 'None yet'}</option>
                    <option value="1-5">1-5</option>
                    <option value="6-20">6-20</option>
                    <option value="20-50">20-50</option>
                    <option value="50+">50+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    {language === 'it' ? 'Specializzazioni' : 'Specializations'}
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'trulli', label: { it: 'Restauro Trulli', en: 'Trulli Restoration' } },
                      { value: 'masseria', label: { it: 'Ristrutturazione Masserie', en: 'Masseria Renovation' } },
                      { value: 'historic', label: { it: 'Immobili Storici', en: 'Historic Properties' } },
                      { value: 'luxury', label: { it: 'Immobili di Lusso', en: 'Luxury Properties' } },
                      { value: 'commercial', label: { it: 'Immobili Commerciali', en: 'Commercial Properties' } },
                      { value: 'rural', label: { it: 'Proprietà Rurali', en: 'Rural Properties' } }
                    ].map(spec => (
                      <label key={spec.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.specializations.includes(spec.value)}
                          onChange={() => handleArrayToggle('specializations', spec.value)}
                          className="w-5 h-5 text-sea border-stone-300 rounded focus:ring-sea"
                        />
                        <span className="text-stone-700">{spec.label[language]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {language === 'it' 
                      ? 'Presentazione Professionale' 
                      : 'Professional Bio'
                    } *
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all"
                    placeholder={language === 'it' 
                      ? 'Descrivi la tua esperienza, i tuoi punti di forza e perché i clienti stranieri dovrebbero sceglierti...'
                      : 'Describe your experience, strengths, and why foreign clients should choose you...'
                    }
                  />
                  <p className="text-xs text-stone-500 mt-1">
                    {language === 'it' 
                      ? 'Questa descrizione sarà visibile ai potenziali clienti'
                      : 'This description will be visible to potential clients'
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Terms & Verification */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                  {language === 'it' ? 'Termini e Conferma' : 'Terms & Confirmation'}
                </h2>

                <div className="bg-stone-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-stone-800 mb-3">
                    {language === 'it' ? 'Modello di Commissione' : 'Commission Model'}
                  </h3>
                  <div className="space-y-2 text-stone-700">
                    <p>• {language === 'it' ? 'Registrazione GRATUITA' : 'FREE Registration'}</p>
                    <p>• {language === 'it' 
                      ? '10-15% di commissione solo su affari conclusi'
                      : '10-15% commission only on closed deals'
                    }</p>
                    <p>• {language === 'it' 
                      ? 'Nessun costo mensile o annuale'
                      : 'No monthly or annual fees'
                    }</p>
                    <p>• {language === 'it' 
                      ? 'Pagamento garantito dai clienti'
                      : 'Guaranteed payment from clients'
                    }</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                      className="w-5 h-5 text-sea border-stone-300 rounded focus:ring-sea mt-0.5"
                    />
                    <span className="text-stone-700">
                      {language === 'it' 
                        ? 'Accetto i Termini di Servizio e la Privacy Policy di Apulink *'
                        : 'I agree to Apulink&apos;s Terms of Service and Privacy Policy *'
                      }
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeCommission}
                      onChange={(e) => handleInputChange('agreeCommission', e.target.checked)}
                      className="w-5 h-5 text-sea border-stone-300 rounded focus:ring-sea mt-0.5"
                    />
                    <span className="text-stone-700">
                      {language === 'it' 
                        ? 'Accetto il modello di commissione del 10-15% sugli affari conclusi *'
                        : 'I agree to the 10-15% commission model on closed deals *'
                      }
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.marketingConsent}
                      onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                      className="w-5 h-5 text-sea border-stone-300 rounded focus:ring-sea mt-0.5"
                    />
                    <span className="text-stone-700">
                      {language === 'it' 
                        ? 'Accetto di ricevere comunicazioni su nuove opportunità di business'
                        : 'I agree to receive communications about new business opportunities'
                      }
                    </span>
                  </label>
                </div>

                <div className="bg-sea/10 rounded-lg p-6">
                  <h3 className="font-semibold text-stone-800 mb-2">
                    {language === 'it' ? 'Prossimi Passi' : 'Next Steps'}
                  </h3>
                  <ul className="space-y-2 text-stone-700">
                    <li className="flex items-start">
                      <span className="text-sea mr-2">1.</span>
                      {language === 'it' 
                        ? 'Verifica del profilo entro 48 ore'
                        : 'Profile verification within 48 hours'
                      }
                    </li>
                    <li className="flex items-start">
                      <span className="text-sea mr-2">2.</span>
                      {language === 'it' 
                        ? 'Email di benvenuto con credenziali di accesso'
                        : 'Welcome email with login credentials'
                      }
                    </li>
                    <li className="flex items-start">
                      <span className="text-sea mr-2">3.</span>
                      {language === 'it' 
                        ? 'Prima opportunità entro 7 giorni (se disponibile)'
                        : 'First opportunity within 7 days (if available)'
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
                  {language === 'it' ? '← Indietro' : '← Back'}
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2) ||
                    (currentStep === 3 && !canProceedStep3) ||
                    (currentStep === 4 && !canProceedStep4)
                  }
                  className={`ml-auto px-8 py-3 rounded-lg font-semibold transition-all ${
                    ((currentStep === 1 && !canProceedStep1) ||
                     (currentStep === 2 && !canProceedStep2) ||
                     (currentStep === 3 && !canProceedStep3) ||
                     (currentStep === 4 && !canProceedStep4))
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-sea text-white hover:bg-sea-dark'
                  }`}
                >
                  {language === 'it' ? 'Avanti →' : 'Next →'}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !canProceedStep5}
                  className={`ml-auto px-8 py-3 rounded-lg font-semibold transition-all ${
                    isSubmitting || !canProceedStep5
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-sea text-white hover:bg-sea-dark'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {language === 'it' ? 'Invio in corso...' : 'Submitting...'}
                    </span>
                  ) : (
                    language === 'it' ? 'Completa Registrazione' : 'Complete Registration'
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
