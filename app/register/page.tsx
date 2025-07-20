// Path: app/register/page.tsx
// Registration type selection page

'use client';

import Link from 'next/link';
import { Building2, Home, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Apulink</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Join Apulink
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Choose how you want to use our platform
          </p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Buyer Option */}
          <Link href="/register/buyer" className="group">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-blue-500">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Home className="w-10 h-10 text-blue-600" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                I&apos;m a Property Buyer
              </h3>
              
              <p className="text-gray-600 text-center mb-6">
                Looking to invest in Italian property with expert guidance and secure project management
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Access verified professionals</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Secure document storage</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Project management tools</span>
                </li>
              </ul>

              <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700 font-semibold">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </div>
          </Link>

          {/* Professional Option */}
          <Link href="/register/professional" className="group">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-purple-500">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Building2 className="w-10 h-10 text-purple-600" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                I&apos;m a Professional
              </h3>
              
              <p className="text-gray-600 text-center mb-6">
                Architect, surveyor, contractor, or other property professional serving international clients
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Showcase your portfolio</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Connect with qualified buyers</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">Manage projects efficiently</span>
                </li>
              </ul>

              <div className="flex items-center justify-center text-purple-600 group-hover:text-purple-700 font-semibold">
                Join as Professional
                <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
