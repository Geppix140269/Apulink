// PATH: app/components/home/ApulinkHomepage.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Check, ArrowRight, MapPin, Home, FileText, Users, Globe, Shield, Play } from 'lucide-react'

interface FormData {
  // Step 1: Basic Info
  fullName: string
  email: string
  phone: string
  nationality: string
  currentLocation: string
  
  // Step 2: Property Goals
  propertyTypes: string[]
  primaryPurpose: string
  timeline: string
  budgetRange: string
  hasVisitedApulia: boolean
  
  // Step 3: Preferences
  preferredRegions: string[]
  mustHaves: string[]
  dealBreakers: string[]
  renovationAppetite: string
  
  // Step 4: Services Needed
  servicesNeeded: string[]
  languageSupport: string[]
  additionalNotes: string
}

const PROPERTY_TYPES = [
  'Trullo',
  'Masseria',
  'Villa',
  'Apartment',
  'Townhouse',
  'Land to Build'
]

const REGIONS = [
  'Bari & Coast',
  'Valle d\'Itria',
  'Salento',
  'Gargano',
  'Foggia Province',
  'Not Sure Yet'
]

const SERVICES = [
  'Real Estate Agent',
  'Lawyer/Notary',
  'Architect',
  'Surveyor',
  'Tax Advisor',
  'Property Manager',
  'Contractor',
  'Interior Designer',
  'Translator',
  'Local Guide'
]

const LANGUAGES = [
  'English',
  'German',
  'French',
  'Dutch',
  'Spanish',
  'Russian',
  'Other'
]

export default function ApulinkHomepage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    currentLocation: '',
    propertyTypes: [],
    primaryPurpose: '',
    timeline: '',
    budgetRange: '',
    hasVisitedApulia: false,
    preferredRegions: [],
    mustHaves: [],
    dealBreakers: [],
    renovationAppetite: '',
    servicesNeeded: [],
    languageSupport: [],
    additionalNotes: ''
  })

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayInput = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      return { ...prev, [field]: newArray }
    })
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch('/api/buyer/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        router.push('/buyer/success')
      } else {
        const data = await response.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.fullName && formData.email && formData.nationality
      case 1:
        return formData.propertyTypes.length > 0 && formData.primaryPurpose && formData.timeline && formData.budgetRange
      case 2:
        return formData.preferredRegions.length > 0 && formData.renovationAppetite
      case 3:
        return formData.servicesNeeded.length > 0 && formData.languageSupport.length > 0
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source 
            src="https://res.cloudinary.com/dbvghnclx/video/upload/v1752960658/geppix1402_81420_Homepage_concept_for_Apulink.com_a_modern_di_467a1d17-0990-46ea-b88e-7545ae48e598_3_mycs2i.mp4" 
            type="video/mp4" 
          />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Dream Home in Apulia Awaits
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Connect with trusted professionals who understand foreign buyers. 
            Save up to 93% in taxes. Get expert guidance in your language.
          </p>
          <button
            onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#D4A574] hover:bg-[#C4956A] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-xl"
          >
            Start Your Free Assessment
          </button>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span>7+ Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>500+ Happy Buyers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Trullo Video */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] text-center mb-16">
            Why International Buyers Choose Apulia
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-[#D4A574] mb-3">7% Flat Tax for 10 Years</h3>
                <p className="text-gray-700">Save up to 93% on taxes as a foreign retiree. No wealth tax, no inheritance tax on Italian assets.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-[#8B9A7B] mb-3">EU Grants up to 45%</h3>
                <p className="text-gray-700">Access PIA and Mini PIA grants for renovations. We connect you with grant specialists.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-3">Properties 40% Below Tuscany</h3>
                <p className="text-gray-700">Get more for your money in Italy&apos;s hidden gem. From trulli to seafront villas.</p>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <video
                controls
                className="w-full h-full object-cover"
                poster="https://res.cloudinary.com/dbvghnclx/image/upload/v1752960844/apulia-trullo-landscape_qtpwxe.jpg"
              >
                <source 
                  src="https://res.cloudinary.com/dbvghnclx/video/upload/v1752960674/geppix1402_81420_Imagine_an_adorable_cartoon_character_shaped__f49f78b5-5cbd-4cf1-81ab-96f37c22bbef_j4pvcq.mp4" 
                  type="video/mp4" 
                />
              </video>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-sm font-semibold text-[#2C3E50] flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Meet Trullo, Your AI Guide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Form Section */}
      <section id="assessment" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] text-center mb-4">
            Get Your Personalized Apulia Plan
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Tell us about your dream property and we&apos;ll match you with the right professionals
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {['Basic Info', 'Property Goals', 'Preferences', 'Services'].map((step, index) => (
                <span 
                  key={step}
                  className={`text-sm font-medium ${
                    index <= currentStep ? 'text-[#D4A574]' : 'text-gray-400'
                  }`}
                >
                  {step}
                </span>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#D4A574] h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Steps */}
          <div className="bg-[#F5F2ED] rounded-lg p-8 shadow-lg">
            {/* Step 1: Basic Information */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">Let&apos;s get to know you</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nationality *
                    </label>
                    <input
                      type="text"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                      placeholder="American"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Location
                    </label>
                    <input
                      type="text"
                      value={formData.currentLocation}
                      onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                      placeholder="New York, USA"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Property Goals */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">What&apos;s your property dream?</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Property Types (select all that interest you) *
                  </label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {PROPERTY_TYPES.map(type => (
                      <label key={type} className="flex items-center bg-white p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={formData.propertyTypes.includes(type)}
                          onChange={() => handleArrayInput('propertyTypes', type)}
                          className="mr-2"
                        />
                        <span className="text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Purpose *
                  </label>
                  <select
                    value={formData.primaryPurpose}
                    onChange={(e) => handleInputChange('primaryPurpose', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                  >
                    <option value="">Select purpose</option>
                    <option value="retirement">Retirement Home</option>
                    <option value="vacation">Vacation Home</option>
                    <option value="investment">Investment/Rental</option>
                    <option value="relocation">Full Relocation</option>
                    <option value="mixed">Mixed Use</option>
                  </select>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline *
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Ready to buy now</option>
                      <option value="3months">Within 3 months</option>
                      <option value="6months">Within 6 months</option>
                      <option value="1year">Within 1 year</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range (EUR) *
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    >
                      <option value="">Select budget</option>
                      <option value="under100k">Under €100,000</option>
                      <option value="100-250k">€100,000 - €250,000</option>
                      <option value="250-500k">€250,000 - €500,000</option>
                      <option value="500k-1m">€500,000 - €1,000,000</option>
                      <option value="over1m">Over €1,000,000</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hasVisitedApulia}
                      onChange={(e) => handleInputChange('hasVisitedApulia', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">I have visited Apulia before</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">Let&apos;s narrow it down</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Regions *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {REGIONS.map(region => (
                      <label key={region} className="flex items-center bg-white p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={formData.preferredRegions.includes(region)}
                          onChange={() => handleArrayInput('preferredRegions', region)}
                          className="mr-2"
                        />
                        <span className="text-gray-700">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Must-Haves (separate with commas)
                  </label>
                  <textarea
                    value={formData.mustHaves.join(', ')}
                    onChange={(e) => handleInputChange('mustHaves', e.target.value.split(',').map(item => item.trim()).filter(Boolean))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    rows={3}
                    placeholder="Sea view, swimming pool, walk to town, garden..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deal Breakers (separate with commas)
                  </label>
                  <textarea
                    value={formData.dealBreakers.join(', ')}
                    onChange={(e) => handleInputChange('dealBreakers', e.target.value.split(',').map(item => item.trim()).filter(Boolean))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    rows={3}
                    placeholder="Too remote, needs major renovation, noisy area..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Renovation Appetite *
                  </label>
                  <select
                    value={formData.renovationAppetite}
                    onChange={(e) => handleInputChange('renovationAppetite', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                  >
                    <option value="">Select option</option>
                    <option value="turnkey">Turn-key only</option>
                    <option value="cosmetic">Cosmetic updates OK</option>
                    <option value="moderate">Moderate renovation OK</option>
                    <option value="full">Full renovation welcome</option>
                    <option value="newbuild">Prefer new build</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Services Needed */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">How can we help you?</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Services Needed *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {SERVICES.map(service => (
                      <label key={service} className="flex items-center bg-white p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={formData.servicesNeeded.includes(service)}
                          onChange={() => handleArrayInput('servicesNeeded', service)}
                          className="mr-2"
                        />
                        <span className="text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Language Support Needed *
                  </label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {LANGUAGES.map(language => (
                      <label key={language} className="flex items-center bg-white p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={formData.languageSupport.includes(language)}
                          onChange={() => handleArrayInput('languageSupport', language)}
                          className="mr-2"
                        />
                        <span className="text-gray-700">{language}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    rows={4}
                    placeholder="Tell us anything else that would help us find your perfect match..."
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
                >
                  ← Back
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                      isStepValid()
                        ? 'bg-[#D4A574] hover:bg-[#C4956A] text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!isStepValid() || isSubmitting}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                      isStepValid() && !isSubmitting
                        ? 'bg-[#8B9A7B] hover:bg-[#7A8A6A] text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get My Matches'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] text-center mb-16">
            How Apulink Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#D4A574] rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-3">1. Share Your Dream</h3>
              <p className="text-gray-600">Tell us about your ideal property and needs. Our AI analyzes your requirements to find perfect matches.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#8B9A7B] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-3">2. Get Matched</h3>
              <p className="text-gray-600">We connect you with 3-5 verified professionals who specialize in your needs and speak your language.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2C3E50] rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-3">3. Find Your Home</h3>
              <p className="text-gray-600">Work with your chosen professional to navigate the process smoothly and secure your dream property.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#2C3E50] to-[#34495E]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Are You a Professional?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join Apulink to connect with qualified international buyers actively looking for properties in Apulia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/professional/register')}
              className="bg-[#D4A574] hover:bg-[#C4956A] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            >
              Join as Professional
            </button>
            <button
              onClick={() => router.push('/professional/learn-more')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#2C3E50] px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Apulink</h3>
              <p className="text-white/80">Connecting international buyers with trusted Italian professionals.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">For Buyers</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="/buyers/how-it-works" className="hover:text-white">How It Works</a></li>
                <li><a href="/buyers/tax-guide" className="hover:text-white">7% Tax Guide</a></li>
                <li><a href="/buyers/regions" className="hover:text-white">Explore Regions</a></li>
                <li><a href="/buyers/resources" className="hover:text-white">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">For Professionals</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="/professional/register" className="hover:text-white">Join Apulink</a></li>
                <li><a href="/professional/pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="/professional/success-stories" className="hover:text-white">Success Stories</a></li>
                <li><a href="/professional/login" className="hover:text-white">Login</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2025 Apulink. All rights reserved. Made with ❤️ in Apulia</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
