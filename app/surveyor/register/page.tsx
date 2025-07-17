// PATH: app/surveyor/register/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerSurveyor } from '@/lib/supabase/client'

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  
  // Professional Details
  licenseNumber: string
  yearsExperience: string
  
  // Service Information
  surveyTypes: string[]
  provinces: string[]
  
  // Additional Info
  bio: string
  agreeTerms: boolean
}

export default function SurveyorRegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    licenseNumber: '',
    yearsExperience: '',
    surveyTypes: [],
    provinces: [],
    bio: '',
    agreeTerms: false
  })

  const totalSteps = 4

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayToggle = (field: 'surveyTypes' | 'provinces', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const canProceedStep1 = formData.firstName && formData.lastName && formData.email && formData.phone
  const canProceedStep2 = formData.companyName && formData.licenseNumber
  const canProceedStep3 = formData.surveyTypes.length > 0 && formData.provinces.length > 0
  const canProceedStep4 = formData.agreeTerms

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const surveyorData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        licenseNumber: formData.licenseNumber,
        yearsExperience: formData.yearsExperience,
        surveyTypes: formData.surveyTypes,
        provinces: formData.provinces,
        bio: formData.bio
      }

      const { success, error } = await registerSurveyor(surveyorData)
      
      if (success) {
        router.push('/surveyor/register/success')
      } else {
        alert('There was an error with your registration. Please try again.')
        console.error('Registration error:', error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header with progress */}
      <section className="bg-white border-b border-stone-200 py-6">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-2">
            Surveyor Registration
          </h1>
          <p className="text-stone-600">
            Join our network of verified property surveyors in Puglia
          </p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-stone-700">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full">
              <div 
                className="h-full bg-sea rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20"
                      placeholder="Giuseppe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20"
                      placeholder="Rossi"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20"
                    placeholder="giuseppe.rossi@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20"
                    placeholder="+39 080 123 4567"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                  Professional Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20"
                    placeholder="Studio Tecnico Rossi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Professional License Number *
                  </label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20"
                    placeholder="BA/1234"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Years of Experience
                  </label>
                  <select
                    value={formData.yearsExperience}
                    onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20"
                  >
                    <option value="">Select...</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11+">11+ years</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Service Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                  Service Details
                </h2>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    Types of Surveys Offered *
                  </label>
                  <div className="space-y-3">
                    {[
                      'Structural Assessment',
                      'Property Valuation',
                      'Energy Certificate (APE)',
                      'Building Compliance',
                      'Cadastral Verification',
                      'Mortgage Survey'
                    ].map(type => (
                      <label key={type} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.surveyTypes.includes(type)}
                          onChange={() => handleArrayToggle('surveyTypes', type)}
                          className="w-5 h-5 text-sea border-stone-300 rounded focus:ring-sea"
                        />
                        <span className="text-stone-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    Service Areas (Provinces) *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Bari',
                      'Brindisi',
                      'Lecce',
                      'Taranto',
                      'Foggia',
                      'BAT'
                    ].map(province => (
                      <label key={province} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.provinces.includes(province)}
                          onChange={() => handleArrayToggle('provinces', province)}
                          className="w-5 h-5 text-sea border-stone-300 rounded focus:ring-sea"
                        />
                        <span className="text-stone-700">{province}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Professional Bio (optional)
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-sea focus:ring-2 focus:ring-sea/20"
                    placeholder="Tell us about your experience and specializations..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Terms & Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
                  Terms & Confirmation
                </h2>

                <div className="bg-stone-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-stone-800 mb-3">Commission Structure</h3>
                  <ul className="space-y-2 text-stone-700">
                    <li>• FREE registration - no monthly fees</li>
                    <li>• 10-15% commission on completed surveys</li>
                    <li>• You set your own prices</li>
                    <li>• Direct payment from clients</li>
                  </ul>
                </div>

                <div className="bg-sea/10 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-stone-800 mb-3">What happens next?</h3>
                  <ol className="space-y-2 text-stone-700">
                    <li>1. We verify your credentials (24-48 hours)</li>
                    <li>2. You receive email confirmation</li>
                    <li>3. Start receiving survey requests</li>
                    <li>4. Submit competitive bids</li>
                  </ol>
                </div>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    className="w-5 h-5 text-sea border-stone-300 rounded focus:ring-sea mt-0.5"
                  />
                  <span className="text-stone-700">
                    I agree to Apulink's Terms of Service, Privacy Policy, and commission structure *
                  </span>
                </label>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-stone-200">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 text-stone-600 hover:text-stone-800 font-medium"
                >
                  ← Back
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2) ||
                    (currentStep === 3 && !canProceedStep3)
                  }
                  className={`ml-auto px-8 py-3 rounded-lg font-semibold transition-all ${
                    ((currentStep === 1 && !canProceedStep1) ||
                     (currentStep === 2 && !canProceedStep2) ||
                     (currentStep === 3 && !canProceedStep3))
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-sea text-white hover:bg-sea-dark'
                  }`}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !canProceedStep4}
                  className={`ml-auto px-8 py-3 rounded-lg font-semibold transition-all ${
                    isSubmitting || !canProceedStep4
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-sea text-white hover:bg-sea-dark'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
