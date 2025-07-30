// Path: app/register/success/page.tsx
// Registration success page with email confirmation message

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import type { Metadata, Viewport } from 'next'

// Export metadata separately
export const metadata: Metadata = {
  title: 'Registration Successful - Apulink',
  description: 'Your Apulink registration was successful. Check your email to confirm your account.'
}

// Export viewport separately
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#9333ea'
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const userType = searchParams.get('type') || 'buyer';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Apulink</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Apulink!
          </h1>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-left">
            <div className="flex items-center justify-center mb-6">
              <Mail className="h-16 w-16 text-blue-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Check Your Email
            </h2>
            
            <p className="text-gray-600 mb-6">
              We&apos;ve sent a confirmation email to your inbox. Please click the confirmation link to activate your account.
            </p>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Check your email inbox</li>
                <li>Click the confirmation link</li>
                <li>
                  {userType === 'professional' 
                    ? 'Complete your professional profile'
                    : 'Start exploring Italian property opportunities'
                  }
                </li>
              </ol>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-4">
                Didn&apos;t receive the email? Check your spam folder or{' '}
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  resend confirmation email
                </button>
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Return to Homepage
              </Link>
              
              {userType === 'buyer' && (
                <Link
                  href="/browse-professionals"
                  className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Browse Professionals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@apulink.com" className="text-blue-600 hover:text-blue-700">
              support@apulink.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegistrationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
