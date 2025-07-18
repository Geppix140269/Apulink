'use client'

import React, { useState } from 'react'
import { Calculator, TrendingUp, Euro, Shield } from 'lucide-react'

export default function ROICalculator() {
  const [propertyValue, setPropertyValue] = useState(250000)
  const [surveyType, setSurveyType] = useState('full')
  
  // Calculations
  const surveyFees = {
    basic: propertyValue * 0.001,
    full: propertyValue * 0.0015,
    building: propertyValue * 0.002
  }
  
  const potentialIssues = propertyValue * 0.15 // 15% average repair costs found
  const negotiationSavings = propertyValue * 0.05 // 5% average negotiation
  const totalSavings = potentialIssues + negotiationSavings - surveyFees[surveyType as keyof typeof surveyFees]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-olive/5 to-sea/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-olive/10 text-olive px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Calculator className="w-4 h-4" />
            Investment Calculator
          </div>
          
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            See How Much You Could Save
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional surveys typically uncover issues worth 15-20% of property value. 
            Calculate your potential savings and protection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Property Investment Calculator
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Purchase Price
                </label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sea focus:border-transparent"
                    step="10000"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Average property price in Puglia: €180,000 - €350,000
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Survey Needed
                </label>
                <select
                  value={surveyType}
                  onChange={(e) => setSurveyType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sea focus:border-transparent"
                >
                  <option value="basic">Basic Survey (€{surveyFees.basic.toFixed(0)})</option>
                  <option value="full">Full Building Survey (€{surveyFees.full.toFixed(0)})</option>
                  <option value="building">Structural Survey (€{surveyFees.building.toFixed(0)})</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-sea to-olive text-white rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6">
              Your Potential Protection
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Hidden Issues Avoided</span>
                  <span className="font-bold">€{potentialIssues.toFixed(0)}</span>
                </div>
                <p className="text-xs text-white/70">
                  Average repair costs discovered through surveys
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Negotiation Leverage</span>
                  <span className="font-bold">€{negotiationSavings.toFixed(0)}</span>
                </div>
                <p className="text-xs text-white/70">
                  Average price reduction from survey findings
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Survey Investment</span>
                  <span className="font-bold">-€{surveyFees[surveyType as keyof typeof surveyFees].toFixed(0)}</span>
                </div>
                <p className="text-xs text-white/70">
                  Professional survey fee
                </p>
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Potential Savings</span>
                  <span className="text-2xl font-bold">€{totalSavings.toFixed(0)}</span>
                </div>
                <p className="text-sm text-white/70 mt-2">
                  {(totalSavings / propertyValue * 100).toFixed(1)}% of property value protected
                </p>
              </div>
            </div>

            <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold mb-1">Peace of Mind Included</p>
                  <p className="text-xs text-white/80">
                    Beyond financial savings, a professional survey provides invaluable peace 
                    of mind and protects your investment from costly surprises.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Ready to protect your investment? Get quotes from verified professionals.
          </p>
          <button className="bg-terracotta text-white font-bold py-4 px-8 rounded-lg hover:bg-terracotta/90 transition-all duration-200 transform hover:scale-[1.02] inline-flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Find Your Professional
          </button>
        </div>
      </div>
    </section>
  )
}
