'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckCircle, Home, FileText, Calculator, Users, Globe, Shield, Menu, X, ChevronRight, Euro, Calendar, MapPin, Briefcase, Languages, Phone } from 'lucide-react'

// Cloudinary media assets
const mediaAssets = {
  videos: [
    'https://res.cloudinary.com/dbvghnclx/video/upload/v1752960658/geppix1402_81420_Homepage_concept_for_Apulink.com_a_modern_di_467a1d17-0990-46ea-b88e-7545ae48e598_3_mycs2i.mp4',
    'https://res.cloudinary.com/dbvghnclx/video/upload/v1752960657/geppix1402_81420_Homepage_concept_for_Apulink.com_a_modern_di_02fb68c3-5806-40b5-984f-f47e14c23456_0_pczlqg.mp4',
    'https://res.cloudinary.com/dbvghnclx/video/upload/v1752960679/TrulloClip_cqvxxm.mp4'
  ],
  images: {
    hero1: 'https://res.cloudinary.com/dbvghnclx/image/upload/v1752960636/geppix1402_81420_Homepage_concept_for_Apulink.com_a_modern_di_fd98a3fb-f692-494c-8b15-225d1ae77875_0_x7gjaf.png',
    hero2: 'https://res.cloudinary.com/dbvghnclx/image/upload/v1752960659/geppix1402_81420_Homepage_concept_for_Apulink.com_a_modern_di_8cc82465-1b62-45b5-863f-f8ca2c75318a_3_gukcwi.png',
    lifestyle1: 'https://res.cloudinary.com/dbvghnclx/image/upload/v1752960662/geppix1402_81420_Homepage_design_concept_for_Apulink.com_a_mo_0ee381a8-a249-4e17-b53d-fca4decaba9c_0_eeu8qq.png',
    lifestyle2: 'https://res.cloudinary.com/dbvghnclx/image/upload/v1752960663/geppix1402_81420_Homepage_design_concept_for_Apulink.com_a_mo_0ee381a8-a249-4e17-b53d-fca4decaba9c_3_cp2mdt.png'
  }
}

export default function ApulinkHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [assessmentStep, setAssessmentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    currentCountry: '',
    
    // Step 2: Property Goals
    buyerType: '',
    timeline: '',
    budget: '',
    financingNeeded: false,
    
    // Step 3: Property Preferences
    propertyTypes: [],
    regions: [],
    mustHaves: [],
    
    // Step 4: Services Needed
    servicesNeeded: [],
    languagesSpoken: [],
    specificRequirements: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleArrayInput = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof formData].includes(value)
        ? (prev[field as keyof typeof formData] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof formData] as string[]), value]
    }))
  }

  const nextStep = () => {
    if (assessmentStep < 4) {
      setAssessmentStep(assessmentStep + 1)
    }
  }

  const prevStep = () => {
    if (assessmentStep > 1) {
      setAssessmentStep(assessmentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#2C3E50]">
                Apulink
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/how-it-works" className="text-[#2C3E50] hover:text-[#D4A574] transition">
                How It Works
              </Link>
              <Link href="/tax-benefits" className="text-[#2C3E50] hover:text-[#D4A574] transition">
                7% Tax Benefits
              </Link>
              <Link href="/regions" className="text-[#2C3E50] hover:text-[#D4A574] transition">
                Regions
              </Link>
              <Link href="/professional/login" className="text-[#2C3E50] hover:text-[#D4A574] transition">
                Professional Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/how-it-works" className="block px-3 py-2 text-[#2C3E50] hover:text-[#D4A574]">
                How It Works
              </Link>
              <Link href="/tax-benefits" className="block px-3 py-2 text-[#2C3E50] hover:text-[#D4A574]">
                7% Tax Benefits
              </Link>
              <Link href="/regions" className="block px-3 py-2 text-[#2C3E50] hover:text-[#D4A574]">
                Regions
              </Link>
              <Link href="/professional/login" className="block px-3 py-2 text-[#2C3E50] hover:text-[#D4A574]">
                Professional Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Assessment Form */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src={mediaAssets.videos[0]} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Hero Content - Split Screen */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Left Side - Value Proposition */}
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Italian Property Journey Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Get matched with trusted professionals who understand your needs
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="text-[#8B9A7B] mr-3 flex-shrink-0" size={24} />
                <p className="text-lg">Save up to 93% on taxes with the 7% flat rate</p>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-[#8B9A7B] mr-3 flex-shrink-0" size={24} />
                <p className="text-lg">Access EU grants up to €200,000 for renovations</p>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-[#8B9A7B] mr-3 flex-shrink-0" size={24} />
                <p className="text-lg">Connect with English-speaking professionals</p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 text-sm text-gray-300">
              <div>
                <span className="text-2xl font-bold text-white block">500+</span>
                Happy Buyers
              </div>
              <div>
                <span className="text-2xl font-bold text-white block">€45M</span>
                Property Value
              </div>
              <div>
                <span className="text-2xl font-bold text-white block">200+</span>
                Professionals
              </div>
            </div>
          </div>

          {/* Right Side - Assessment Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Step {assessmentStep} of 4</span>
                <span>{Math.round((assessmentStep / 4) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#D4A574] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(assessmentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">
              Let's Find Your Perfect Match
            </h2>

            <form className="space-y-6">
              {/* Step 1: Basic Information */}
              {assessmentStep === 1 && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">
                      Tell us about yourself
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nationality *
                        </label>
                        <select
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574]"
                          required
                        >
                          <option value="">Select</option>
                          <option value="german">German</option>
                          <option value="uk">British</option>
                          <option value="us">American</option>
                          <option value="dutch">Dutch</option>
                          <option value="french">French</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Currently Living In *
                        </label>
                        <input
                          type="text"
                          name="currentCountry"
                          value={formData.currentCountry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Property Goals */}
              {assessmentStep === 2 && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">
                      What are your property goals?
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        I am looking to: *
                      </label>
                      <div className="space-y-3">
                        {['Buy a holiday home', 'Relocate permanently', 'Investment property', 'Retirement home'].map((type) => (
                          <label key={type} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="buyerType"
                              value={type}
                              checked={formData.buyerType === type}
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Timeline *
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574]"
                        required
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget Range (EUR) *
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574]"
                        required
                      >
                        <option value="">Select budget</option>
                        <option value="under100k">Under €100,000</option>
                        <option value="100-250k">€100,000 - €250,000</option>
                        <option value="250-500k">€250,000 - €500,000</option>
                        <option value="500k-1m">€500,000 - €1,000,000</option>
                        <option value="over1m">Over €1,000,000</option>
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="financingNeeded"
                          checked={formData.financingNeeded}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-700">I need help with financing/mortgage</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Property Preferences */}
              {assessmentStep === 3 && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">
                      Property preferences
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type (select all that apply) *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Trullo', 'Masseria', 'Villa', 'Apartment', 'Townhouse', 'Land to build'].map((type) => (
                          <label key={type} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={formData.propertyTypes.includes(type)}
                              onChange={() => handleArrayInput('propertyTypes', type)}
                              className="mr-2"
                            />
                            <span className="text-sm">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Regions *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Valle d\'Itria', 'Salento', 'Gargano', 'Bari Coast', 'Anywhere in Apulia', 'Not sure yet'].map((region) => (
                          <label key={region} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={formData.regions.includes(region)}
                              onChange={() => handleArrayInput('regions', region)}
                              className="mr-2"
                            />
                            <span className="text-sm">{region}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Must-haves
                      </label>
                      <div className="space-y-2">
                        {['Sea view', 'Swimming pool', 'Garden', 'Garage', 'Move-in ready', 'Renovation project'].map((feature) => (
                          <label key={feature} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.mustHaves.includes(feature)}
                              onChange={() => handleArrayInput('mustHaves', feature)}
                              className="mr-2"
                            />
                            <span className="text-sm">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 4: Services Needed */}
              {assessmentStep === 4 && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">
                      Which professionals do you need?
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select all services you need *
                      </label>
                      <div className="space-y-3">
                        {[
                          { service: 'Real Estate Agent', icon: Home },
                          { service: 'Tax Advisor (7% regime)', icon: Calculator },
                          { service: 'Legal Consultant', icon: Shield },
                          { service: 'Architect/Engineer', icon: Briefcase },
                          { service: 'Property Inspector', icon: FileText },
                          { service: 'Translator', icon: Globe }
                        ].map(({ service, icon: Icon }) => (
                          <label key={service} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={formData.servicesNeeded.includes(service)}
                              onChange={() => handleArrayInput('servicesNeeded', service)}
                              className="mr-3"
                            />
                            <Icon className="text-[#D4A574] mr-3" size={20} />
                            <span>{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Languages you speak
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['English', 'German', 'Italian', 'French', 'Dutch', 'Spanish'].map((lang) => (
                          <label key={lang} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.languagesSpoken.includes(lang)}
                              onChange={() => handleArrayInput('languagesSpoken', lang)}
                              className="mr-2"
                            />
                            <span className="text-sm">{lang}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Any specific requirements or questions?
                      </label>
                      <textarea
                        name="specificRequirements"
                        value={formData.specificRequirements}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574]"
                        placeholder="E.g., Need help with residency permit, interested in commercial properties, specific renovation needs..."
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {assessmentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-[#D4A574] text-[#D4A574] rounded-lg hover:bg-[#D4A574] hover:text-white transition"
                  >
                    Previous
                  </button>
                )}
                
                {assessmentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-3 bg-[#D4A574] text-white rounded-lg hover:bg-[#C4955A] transition flex items-center"
                  >
                    Next
                    <ChevronRight className="ml-2" size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-8 py-3 bg-[#8B9A7B] text-white rounded-lg hover:bg-[#7A8A6A] transition font-semibold"
                  >
                    Get My Matches
                  </button>
                )}
              </div>
            </form>

            {/* Trust Message */}
            <p className="text-xs text-gray-500 text-center mt-6">
              Your information is secure and will only be shared with matched professionals
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section with Images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#2C3E50] mb-16">
            Why Choose Apulink?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <img 
                  src={mediaAssets.images.lifestyle1} 
                  alt="Italian lifestyle"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white">Vetted Professionals</h3>
                </div>
              </div>
              <p className="text-gray-600">
                Every professional is verified, licensed, and speaks your language. No more communication barriers or trust issues.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={mediaAssets.videos[2]} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white">Local Expertise</h3>
                </div>
              </div>
              <p className="text-gray-600">
                Our professionals know Apulia inside out. From hidden gems to tax benefits, they'll guide you through everything.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <img 
                  src={mediaAssets.images.lifestyle2} 
                  alt="Italian property"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white">End-to-End Support</h3>
                </div>
              </div>
              <p className="text-gray-600">
                From property search to renovation grants, we match you with all the professionals you need for a smooth journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section for Professionals */}
      <section className="py-16 bg-[#2C3E50]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Are You a Professional in Apulia?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our network and connect with qualified international buyers
          </p>
          <Link
            href="/professional/register"
            className="inline-flex items-center bg-[#D4A574] text-white px-8 py-3 rounded-full hover:bg-[#C4955A] transition font-semibold"
          >
            Apply to Join
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-[#2C3E50]">Apulink</h3>
              <p className="text-gray-600 mt-2">Connecting dreams with expertise</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-600 hover:text-[#D4A574]">Privacy</Link>
              <Link href="/terms" className="text-gray-600 hover:text-[#D4A574]">Terms</Link>
              <Link href="/contact" className="text-gray-600 hover:text-[#D4A574]">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
