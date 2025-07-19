// File: app/page.tsx

import ApulinkHomepage from './components/home/ApulinkHomepage'

export default function HomePage() {
  return <ApulinkHomepage />
}

// ===================================
// File: app/components/home/ApulinkHomepage.tsx
// UPDATE: Add the handleSubmit function to the existing component

// Add this import at the top
import { useRouter } from 'next/navigation'

// Inside the ApulinkHomepage component, add:
const router = useRouter()
const [isSubmitting, setIsSubmitting] = useState(false)
const [error, setError] = useState('')

// Add this handleSubmit function after the state declarations:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  setError('')

  try {
    const response = await fetch('/api/buyer/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit profile')
    }

    // Success! Redirect to success page or show confirmation
    if (data.success) {
      // Store profile ID in localStorage for the success page
      localStorage.setItem('buyerProfileId', data.profile.id)
      localStorage.setItem('buyerEmail', data.profile.email)
      localStorage.setItem('matchCount', data.matches.toString())
      
      // Redirect to success page
      router.push('/buyer/success')
    }
  } catch (err) {
    console.error('Submission error:', err)
    setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}

// Update the form tag in the assessment form section:
<form className="space-y-6" onSubmit={handleSubmit}>

// Update the final submit button:
{assessmentStep < 4 ? (
  <button
    type="button"
    onClick={nextStep}
    className="ml-auto px-6 py-3 bg-[#D4A574] text-white rounded-lg hover:bg-[#C4955A] transition flex items-center"
    disabled={isSubmitting}
  >
    Next
    <ChevronRight className="ml-2" size={20} />
  </button>
) : (
  <button
    type="submit"
    className="ml-auto px-8 py-3 bg-[#8B9A7B] text-white rounded-lg hover:bg-[#7A8A6A] transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={isSubmitting}
  >
    {isSubmitting ? 'Processing...' : 'Get My Matches'}
  </button>
)}

// Add error display above the form navigation buttons:
{error && (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
    {error}
  </div>
)}

// ===================================
// File: app/buyer/success/page.tsx
// CREATE NEW FILE: Success page after form submission

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Mail, Clock, ArrowRight } from 'lucide-react'

export default function BuyerSuccessPage() {
  const [profileId, setProfileId] = useState('')
  const [email, setEmail] = useState('')
  const [matchCount, setMatchCount] = useState(0)

  useEffect(() => {
    // Get data from localStorage
    setProfileId(localStorage.getItem('buyerProfileId') || '')
    setEmail(localStorage.getItem('buyerEmail') || '')
    setMatchCount(parseInt(localStorage.getItem('matchCount') || '0'))

    // Clear localStorage
    localStorage.removeItem('buyerProfileId')
    localStorage.removeItem('buyerEmail')
    localStorage.removeItem('matchCount')
  }, [])

  return (
    <div className="min-h-screen bg-[#F5F2ED] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
            Perfect! We're On It
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Your profile has been created and we're matching you with the best professionals for your needs.
          </p>

          {matchCount > 0 && (
            <div className="bg-[#8B9A7B]/10 rounded-lg p-6 mb-8">
              <p className="text-2xl font-semibold text-[#2C3E50] mb-2">
                {matchCount} Professionals Matched!
              </p>
              <p className="text-gray-600">
                We've found professionals who match your requirements and speak your language.
              </p>
            </div>
          )}

          <div className="space-y-6 mb-8">
            <div className="flex items-start text-left">
              <Mail className="text-[#D4A574] mr-4 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-[#2C3E50] mb-1">Check Your Email</h3>
                <p className="text-gray-600">
                  We've sent a confirmation to {email || 'your email'} with details about your matches.
                </p>
              </div>
            </div>

            <div className="flex items-start text-left">
              <Clock className="text-[#D4A574] mr-4 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-[#2C3E50] mb-1">Within 24 Hours</h3>
                <p className="text-gray-600">
                  You'll receive detailed profiles and personalized quotes from matched professionals.
                </p>
              </div>
            </div>

            <div className="flex items-start text-left">
              <CheckCircle className="text-[#D4A574] mr-4 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-[#2C3E50] mb-1">No Obligation</h3>
                <p className="text-gray-600">
                  Review the professionals at your own pace. You decide who to work with.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">
              While you wait, explore these resources:
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Link 
                href="/tax-benefits"
                className="p-4 border border-[#D4A574] rounded-lg hover:bg-[#D4A574]/10 transition"
              >
                <h4 className="font-semibold text-[#2C3E50] mb-1">7% Tax Guide</h4>
                <p className="text-sm text-gray-600">Save up to 93% on taxes</p>
              </Link>

              <Link 
                href="/regions"
                className="p-4 border border-[#8B9A7B] rounded-lg hover:bg-[#8B9A7B]/10 transition"
              >
                <h4 className="font-semibold text-[#2C3E50] mb-1">Apulia Regions</h4>
                <p className="text-sm text-gray-600">Find your perfect area</p>
              </Link>

              <Link 
                href="/grants"
                className="p-4 border border-[#2C3E50] rounded-lg hover:bg-[#2C3E50]/10 transition"
              >
                <h4 className="font-semibold text-[#2C3E50] mb-1">EU Grants</h4>
                <p className="text-sm text-gray-600">Up to €200k funding</p>
              </Link>
            </div>

            <Link 
              href="/"
              className="inline-flex items-center text-[#D4A574] hover:text-[#C4955A] transition"
            >
              Return to Homepage
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>

          {profileId && (
            <p className="text-xs text-gray-400 mt-8">
              Your reference ID: {profileId.slice(0, 8)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
