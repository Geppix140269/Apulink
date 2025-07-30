// Path: /app/register/buyer/page.tsx
// Buyer registration page with brand-compliant design

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import type { Metadata, Viewport } from 'next'

// Export metadata separately
export const metadata: Metadata = {
  title: 'Register as Buyer - Apulink',
  description: 'Create your buyer account on Apulink to connect with property professionals in Italy'
}

// Export viewport separately
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#9333ea'
}

export default function BuyerRegistrationPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    country: '',
    propertyBudget: '',
    propertyLocation: '',
    propertyType: '',
    timeline: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setError('')
    setStep(2)
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Sign up the user
      await signUp(formData.email, formData.password, 'buyer')

      // Create extended profile
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: formData.fullName,
            phone: formData.phone,
            country: formData.country,
            property_budget: formData.propertyBudget,
            property_location: formData.propertyLocation,
            property_type: formData.propertyType,
            timeline: formData.timeline,
          })
          .eq('id', user.id)

        if (profileError) throw profileError
      }

      // Redirect to dashboard
      router.push('/my-apulink')
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Apulink
            </h1>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your buyer account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
              Sign in
            </Link>
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            1
          </div>
          <div className={`w-24 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-300'}`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            2
          </div>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="propertyBudget" className="block text-sm font-medium text-gray-700">
                    Property Budget (€)
                  </label>
                  <select
                    id="propertyBudget"
                    name="propertyBudget"
                    value={formData.propertyBudget}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
                  >
                    <option value="">Select budget range</option>
                    <option value="0-100000">Up to €100,000</option>
                    <option value="100000-250000">€100,000 - €250,000</option>
                    <option value="250000-500000">€250,000 - €500,000</option>
                    <option value="500000-1000000">€500,000 - €1,000,000</option>
                    <option value="1000000+">€1,000,000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="propertyLocation" className="block text-sm font-medium text-gray-700">
                    Preferred Location in Italy
                  </label>
                  <input
                    id="propertyLocation"
                    name="propertyLocation"
                    type="text"
                    value={formData.propertyLocation}
                    onChange={handleChange}
                    placeholder="e.g., Tuscany, Milan, Sicily"
                    className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Alternative Registration */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Are you a professional?{' '}
            <Link href="/register/professional" className="font-medium text-purple-600 hover:text-purple-500">
              Register as a professional
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
