// PATH: app/components/home/ROICalculator.tsx
'use client'
import React, { useState } from 'react';
import { Calculator, TrendingUp, Euro } from 'lucide-react';

const ROICalculator = () => {
  const [propertyValue, setPropertyValue] = useState(250000);
  const [renovationBudget, setRenovationBudget] = useState(50000);

  const savingsWithoutApulink = 0;
  const savingsWithApulink = Math.round((propertyValue * 0.03) + (renovationBudget * 0.20));
  const professionalFees = Math.round(propertyValue * 0.08);
  const optimizedFees = Math.round(professionalFees * 0.7);
  const totalSavings = savingsWithApulink + (professionalFees - optimizedFees);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              <span>Interactive Savings Calculator</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-stone-800 mb-4">
              Calculate Your Potential Savings
            </h2>
            <p className="text-xl text-stone-600">
              See how much you could save on your specific property purchase
            </p>
          </div>

          <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Side */}
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-6">Your Property Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Property Purchase Price
                    </label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                      <input
                        type="range"
                        min="100000"
                        max="1000000"
                        step="10000"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(Number(e.target.value))}
                        className="w-full mb-2"
                      />
                      <div className="text-2xl font-bold text-stone-800">
                        €{propertyValue.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Renovation Budget
                    </label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                      <input
                        type="range"
                        min="0"
                        max="200000"
                        step="5000"
                        value={renovationBudget}
                        onChange={(e) => setRenovationBudget(Number(e.target.value))}
                        className="w-full mb-2"
                      />
                      <div className="text-2xl font-bold text-stone-800">
                        €{renovationBudget.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Side */}
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-6">Your Potential Savings</h3>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-stone-600">Professional Fees (Typical)</span>
                      <span className="font-semibold text-stone-800">€{professionalFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-stone-600">With Apulink Network</span>
                      <span className="font-semibold text-stone-800">€{optimizedFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-stone-600">Fee Savings</span>
                      <span className="font-bold text-green-600">€{(professionalFees - optimizedFees).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-stone-600">Negotiation Savings (3%)</span>
                      <span className="font-semibold text-green-600">€{Math.round(propertyValue * 0.03).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">Renovation Savings (20%)</span>
                      <span className="font-semibold text-green-600">€{Math.round(renovationBudget * 0.20).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Total Potential Savings</p>
                        <p className="text-3xl font-bold">€{totalSavings.toLocaleString()}</p>
                      </div>
                      <TrendingUp className="w-12 h-12 text-green-200" />
                    </div>
                  </div>
                </div>

                <p className="text-sm text-stone-600 mt-4">
                  * Based on average savings reported by Apulink members. Individual results may vary.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8 pt-8 border-t">
              <p className="text-lg text-stone-700 mb-4">
                Ready to save €{totalSavings.toLocaleString()} on your property purchase?
              </p>
              <a 
                href="#get-guide" 
                className="inline-flex items-center gap-2 bg-terracotta text-white px-8 py-4 rounded-lg font-semibold hover:bg-terracotta-dark transition-all duration-200"
              >
                Get Your Savings Guide Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
