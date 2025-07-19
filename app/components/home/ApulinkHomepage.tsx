'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckCircle, Home, FileText, Calculator, Users, Globe, Shield, Menu, X } from 'lucide-react'

export default function ApulinkHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              <Link href="/services" className="text-[#2C3E50] hover:text-[#D4A574] transition">
                Services
              </Link>
              <Link href="/about" className="text-[#2C3E50] hover:text-[#D4A574] transition">
                About
              </Link>
              <Link href="/professional/register" className="bg-[#D4A574] text-white px-6 py-2 rounded-full hover:bg-[#C4955A] transition">
                Join as Professional
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
              <Link href="/services" className="block px-3 py-2 text-[#2C3E50] hover:text-[#D4A574]">
                Services
              </Link>
              <Link href="/about" className="block px-3 py-2 text-[#2C3E50] hover:text-[#D4A574]">
                About
              </Link>
              <Link href="/professional/register" className="block px-3 py-2 bg-[#D4A574] text-white rounded-full text-center">
                Join as Professional
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/dbvghnclx/video/upload/v1752960658/geppix1402_81420_Homepage_concept_for_Apulink.com_a_modern_di_467a1d17-0990-46ea-b88e-7545ae48e598_3_mycs2i.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Gateway to<br />Italian Property Dreams
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Connect with trusted professionals in Apulia. Leverage 7% flat tax benefits and EU grants for your Mediterranean investment.
          </p>
          
          {/* CTA Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 max-w-xl mx-auto">
            <h3 className="text-[#2C3E50] text-lg font-semibold mb-4">Start Your Property Journey</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574] text-[#2C3E50]"
              />
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574] text-[#2C3E50]">
                <option>Select Service Needed</option>
                <option>Real Estate Agent</option>
                <option>Tax Advisor</option>
                <option>Legal Consultant</option>
                <option>Architect</option>
                <option>Property Inspector</option>
                <option>Translator</option>
              </select>
              <button
                type="submit"
                className="w-full bg-[#D4A574] text-white py-3 rounded-lg hover:bg-[#C4955A] transition font-semibold"
              >
                Get Matched with Professionals
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#2C3E50] mb-16">
            How Apulink Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#8B9A7B] rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">1. Share Your Project</h3>
              <p className="text-gray-600">
                Tell us about your property needs, budget, preferred regions, and timeline. Our intelligent form captures every detail.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#D4A574] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">2. Get Matched</h3>
              <p className="text-gray-600">
                We connect you with up to 3 vetted professionals who specialize in your needs and speak your language.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2C3E50] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">3. Choose & Connect</h3>
              <p className="text-gray-600">
                Review quotes, compare professionals, and choose the best fit. We facilitate secure communication throughout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#2C3E50] mb-6">
            Professional Services for Every Need
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            From finding your dream property to navigating Italian bureaucracy, our network of professionals has you covered.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Real Estate Agents */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-[#D4A574]/20 rounded-lg flex items-center justify-center mb-6">
                <Home className="text-[#D4A574]" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-[#2C3E50] mb-3">Real Estate Agents</h3>
              <p className="text-gray-600 mb-4">
                Licensed agents who understand foreign buyer needs and speak your language.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Property searches & viewings
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Price negotiations
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Local market insights
                </li>
              </ul>
            </div>

            {/* Tax Advisors */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-[#8B9A7B]/20 rounded-lg flex items-center justify-center mb-6">
                <Calculator className="text-[#8B9A7B]" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-[#2C3E50] mb-3">Tax Advisors</h3>
              <p className="text-gray-600 mb-4">
                Experts in the 7% flat tax regime and international tax planning.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  7% tax application assistance
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  EU grant applications
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Cross-border tax optimization
                </li>
              </ul>
            </div>

            {/* Legal Consultants */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-[#2C3E50]/20 rounded-lg flex items-center justify-center mb-6">
                <Shield className="text-[#2C3E50]" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-[#2C3E50] mb-3">Legal Consultants</h3>
              <p className="text-gray-600 mb-4">
                Navigate Italian property law with confidence and security.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Contract review & drafting
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Due diligence
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Residency permits
                </li>
              </ul>
            </div>

            {/* Architects */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-[#D4A574]/20 rounded-lg flex items-center justify-center mb-6">
                <Home className="text-[#D4A574]" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-[#2C3E50] mb-3">Architects</h3>
              <p className="text-gray-600 mb-4">
                Transform your Italian property with local expertise and style.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Renovation planning
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Permit applications
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Project management
                </li>
              </ul>
            </div>

            {/* Property Inspectors */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-[#8B9A7B]/20 rounded-lg flex items-center justify-center mb-6">
                <Shield className="text-[#8B9A7B]" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-[#2C3E50] mb-3">Property Inspectors</h3>
              <p className="text-gray-600 mb-4">
                Ensure your investment is sound with thorough inspections.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Structural assessments
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Energy certifications
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Detailed reports
                </li>
              </ul>
            </div>

            {/* Translators */}
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-[#2C3E50]/20 rounded-lg flex items-center justify-center mb-6">
                <Globe className="text-[#2C3E50]" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-[#2C3E50] mb-3">Translators</h3>
              <p className="text-gray-600 mb-4">
                Break down language barriers for smooth transactions.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Document translation
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Meeting interpretation
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#8B9A7B] mr-2 mt-0.5" size={16} />
                  Certified translations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="py-20 bg-[#2C3E50]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Are You a Professional in Apulia?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our network and connect with international property buyers. 
            Be part of the trusted community helping dreams come true.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Founding Member Special</h3>
            <div className="text-5xl font-bold text-[#D4A574] mb-2">€20/month</div>
            <p className="text-gray-300 mb-6">Regular price €79/month - Save 75%</p>
            
            <ul className="text-left max-w-sm mx-auto space-y-3 mb-8">
              <li className="flex items-start text-white">
                <CheckCircle className="text-[#8B9A7B] mr-3 mt-0.5" size={20} />
                Unlimited buyer inquiries
              </li>
              <li className="flex items-start text-white">
                <CheckCircle className="text-[#8B9A7B] mr-3 mt-0.5" size={20} />
                Priority matching algorithm
              </li>
              <li className="flex items-start text-white">
                <CheckCircle className="text-[#8B9A7B] mr-3 mt-0.5" size={20} />
                Professional profile page
              </li>
              <li className="flex items-start text-white">
                <CheckCircle className="text-[#8B9A7B] mr-3 mt-0.5" size={20} />
                Direct client messaging
              </li>
            </ul>
            
            <Link
              href="/professional/register"
              className="inline-flex items-center bg-[#D4A574] text-white px-8 py-3 rounded-full hover:bg-[#C4955A] transition font-semibold"
            >
              Join as a Founding Member
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
          
          <p className="text-sm text-gray-400">
            Limited to first 100 professionals • No setup fees • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Apulink</h3>
              <p className="text-gray-600 mb-6">
                Your trusted marketplace for Italian property services. 
                Connecting international buyers with vetted professionals in Apulia.
              </p>
              <div className="flex space-x-4">
                {/* Social links would go here */}
              </div>
            </div>
            
            {/* For Buyers */}
            <div>
              <h4 className="font-semibold text-[#2C3E50] mb-4">For Buyers</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/how-it-works" className="text-gray-600 hover:text-[#D4A574] transition">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/tax-benefits" className="text-gray-600 hover:text-[#D4A574] transition">
                    7% Tax Benefits
                  </Link>
                </li>
                <li>
                  <Link href="/grants" className="text-gray-600 hover:text-[#D4A574] transition">
                    EU Grants Guide
                  </Link>
                </li>
                <li>
                  <Link href="/regions" className="text-gray-600 hover:text-[#D4A574] transition">
                    Apulia Regions
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* For Professionals */}
            <div>
              <h4 className="font-semibold text-[#2C3E50] mb-4">For Professionals</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/professional/register" className="text-gray-600 hover:text-[#D4A574] transition">
                    Join Our Network
                  </Link>
                </li>
                <li>
                  <Link href="/professional/login" className="text-gray-600 hover:text-[#D4A574] transition">
                    Professional Login
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-600 hover:text-[#D4A574] transition">
                    Pricing Plans
                  </Link>
                </li>
                <li>
                  <Link href="/success-stories" className="text-gray-600 hover:text-[#D4A574] transition">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm mb-4 md:mb-0">
                © 2025 Apulink. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-gray-600 hover:text-[#D4A574] text-sm transition">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-600 hover:text-[#D4A574] text-sm transition">
                  Terms of Service
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-[#D4A574] text-sm transition">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
