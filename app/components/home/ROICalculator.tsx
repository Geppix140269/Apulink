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
                  Survey Type Required
                </label>
                <select
                  value={surveyType}
                  onChange={(e) => setSurveyType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sea focus:border-transparent"
                >
                  <option value="basic">Basic Survey (€{surveyFees.basic.toFixed(0)})</option>
                  <option value="full">Full Structural Survey (€{surveyFees.full.toFixed(0)})</option>
                  <option value="building">Building Survey + Tests (€{surveyFees.building.toFixed(0)})</option>
                </select>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-terracotta/10 to-olive/10 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">Your Potential Savings:</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Issues typically found:</span>
                  <span className="font-semibold">€{potentialIssues.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Negotiation leverage:</span>
                  <span className="font-semibold">€{negotiationSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Survey investment:</span>
                  <span className="font-semibold">-€{surveyFees[surveyType as keyof typeof surveyFees].toFixed(0)}</span>
                </div>
                <div className="pt-3 border-t border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Protection Value:</span>
                    <span className="text-2xl font-bold text-olive">€{totalSavings.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-terracotta flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Protect Your Investment</h4>
                  <p className="text-gray-600">
                    92% of property surveys reveal issues that affect value. Professional surveys 
                    give you negotiating power and prevent costly surprises after purchase.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-sea flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">ROI on Professional Services</h4>
                  <p className="text-gray-600">
                    Average return on survey investment: <strong>1,200%</strong>. Most buyers save 
                    10-15x their survey cost through issue discovery and negotiation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-sea to-olive text-white rounded-xl p-6">
              <h4 className="font-semibold mb-3">What&apos;s Typically Found:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Structural defects (€10k-50k repairs)</li>
                <li>• Roof issues (€5k-20k repairs)</li>
                <li>• Damp problems (€3k-15k treatment)</li>
                <li>• Illegal modifications (€5k-30k to regularize)</li>
                <li>• Boundary disputes (€2k-10k legal costs)</li>
              </ul>
            </div>

            <button className="w-full bg-terracotta text-white font-bold py-4 px-6 rounded-lg hover:bg-terracotta/90 transition-all duration-200 transform hover:scale-[1.02]">
              Get Quotes from Verified Surveyors
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
