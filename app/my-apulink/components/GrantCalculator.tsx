// app/my-apulink/components/GrantCalculator.tsx
// Dashboard component version - simplified and integrated
import React, { useState, useEffect } from 'react';
import { 
  Calculator, Euro, CheckCircle, Info, TrendingUp, 
  FileText, Download, AlertCircle, Loader2, Building2,
  MapPin, Calendar, Briefcase, Shield, Sparkles,
  Hotel, Store, Tractor, Home
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface GrantCalculation {
  propertyValue: number;
  renovationCost: number;
  grantEligibleCost: number;
  grantAmount: number;
  grantPercentage: number;
  maxGrantAmount: number;
  netInvestment: number;
}

interface GrantRequirement {
  id: string;
  requirement: string;
  category: string;
  isMet: boolean;
  description?: string;
}

interface GrantCalculatorProps {
  projectId?: string;
  onCalculation?: (calculation: GrantCalculation) => void;
}

export default function GrantCalculator({ projectId, onCalculation }: GrantCalculatorProps) {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState<string>('tourism');
  const [propertyValue, setPropertyValue] = useState<string>('');
  const [renovationCost, setRenovationCost] = useState<string>('');
  const [calculation, setCalculation] = useState<GrantCalculation | null>(null);
  const [requirements, setRequirements] = useState<GrantRequirement[]>([]);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  const propertyTypes = [
    { value: 'tourism', label: 'Tourism Property (Hotel, B&B)', percentage: 45, icon: Hotel },
    { value: 'agricultural', label: 'Agricultural/Agriturismo', percentage: 45, icon: Tractor },
    { value: 'commercial', label: 'Commercial Property', percentage: 40, icon: Store },
    { value: 'residential', label: 'Residential (Special Cases)', percentage: 35, icon: Home }
  ];

  const eligibleExpenses = [
    { category: 'Structural Work', items: ['Foundation repairs', 'Roof renovation', 'Seismic upgrades'], eligible: true },
    { category: 'Energy Efficiency', items: ['Solar panels', 'Insulation', 'Heat pumps'], eligible: true },
    { category: 'Accessibility', items: ['Elevators', 'Ramps', 'Accessible bathrooms'], eligible: true },
    { category: 'Technology', items: ['Booking systems', 'Smart home', 'Security systems'], eligible: true },
    { category: 'Interior Design', items: ['Furniture', 'Decorations', 'Artwork'], eligible: false },
    { category: 'Marketing', items: ['Website', 'Branding', 'Photography'], eligible: false }
  ];

  useEffect(() => {
    loadGrantRequirements();
    if (projectId) {
      loadProjectData();
    }
  }, [propertyType, projectId]);

  async function loadProjectData() {
    if (!projectId) return;
    
    try {
      const { data: project } = await supabase
        .from('projects')
        .select('price, target_budget, property_type')
        .eq('id', projectId)
        .single();
        
      if (project) {
        setPropertyValue(project.price?.toString() || '');
        setRenovationCost(project.target_budget?.toString() || '');
        if (project.property_type) {
          setPropertyType(project.property_type);
        }
      }
    } catch (error) {
      console.error('Error loading project data:', error);
    }
  }

  async function loadGrantRequirements() {
    // In a real app, this would load from database
    const baseRequirements: GrantRequirement[] = [
      {
        id: '1',
        requirement: 'Property located in Puglia region',
        category: 'Location',
        isMet: true,
        description: 'Property must be within Puglia administrative boundaries'
      },
      {
        id: '2',
        requirement: 'Tourism or hospitality use',
        category: 'Property Type',
        isMet: propertyType === 'tourism' || propertyType === 'agricultural',
        description: 'Hotels, B&Bs, vacation rentals, agriturismo eligible'
      },
      {
        id: '3',
        requirement: 'Minimum investment €50,000',
        category: 'Financial',
        isMet: false,
        description: 'Total project cost must exceed minimum threshold'
      },
      {
        id: '4',
        requirement: 'Business plan submitted',
        category: 'Documentation',
        isMet: false,
        description: '5-year business plan with revenue projections'
      },
      {
        id: '5',
        requirement: 'Environmental sustainability',
        category: 'Compliance',
        isMet: false,
        description: 'Project must include energy efficiency improvements'
      },
      {
        id: '6',
        requirement: 'Job creation commitment',
        category: 'Social Impact',
        isMet: false,
        description: 'Minimum 2 FTE positions for properties over €500k'
      }
    ];

    setRequirements(baseRequirements);
  }

  function calculateGrant() {
    const property = parseFloat(propertyValue.replace(/[^\d]/g, '')) || 0;
    const renovation = parseFloat(renovationCost.replace(/[^\d]/g, '')) || 0;
    
    const selectedType = propertyTypes.find(t => t.value === propertyType);
    const grantPercentage = selectedType?.percentage || 45;
    
    // Calculate eligible costs (property + renovation for tourism)
    let eligibleCost = renovation;
    if (propertyType === 'tourism' || propertyType === 'agricultural') {
      eligibleCost = property + renovation;
    }
    
    // Apply grant percentage
    const grantAmount = Math.min(eligibleCost * (grantPercentage / 100), 2250000);
    
    const calc: GrantCalculation = {
      propertyValue: property,
      renovationCost: renovation,
      grantEligibleCost: eligibleCost,
      grantAmount: grantAmount,
      grantPercentage: grantPercentage,
      maxGrantAmount: 2250000,
      netInvestment: (property + renovation) - grantAmount
    };
    
    setCalculation(calc);
    
    // Update requirements based on calculation
    setRequirements(prev => prev.map(req => {
      if (req.id === '3') {
        return { ...req, isMet: (property + renovation) >= 50000 };
      }
      return req;
    }));
    
    if (onCalculation) {
      onCalculation(calc);
    }
  }

  async function saveCalculation() {
    if (!calculation || !projectId) return;
    
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      // Save grant calculation to project
      const { error } = await supabase
        .from('projects')
        .update({
          estimated_grant: calculation.grantAmount,
          grant_percentage: calculation.grantPercentage,
          grant_calculation: calculation
        })
        .eq('id', projectId);
      
      if (error) {
        console.error('Error saving calculation:', error);
        return;
      }
      
      alert('Grant calculation saved to project!');
    } catch (error) {
      console.error('Error saving calculation:', error);
    } finally {
      setLoading(false);
    }
  }

  async function generateReport() {
    if (!calculation) return;
    
    // In a real app, this would generate a PDF report
    alert('Generating detailed grant analysis report...');
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const metRequirements = requirements.filter(r => r.isMet).length;
  const totalRequirements = requirements.length;
  const eligibilityScore = (metRequirements / totalRequirements) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-4 shadow-lg">
            <Sparkles className="w-4 h-4" />
            PIA GRANT CALCULATOR
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Calculate Your PIA Tourism Grant</h3>
          <p className="text-gray-600">
            Puglia Region offers 45% grants for tourism properties. Calculate your savings instantly.
          </p>
        </div>

        {/* Property Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
          <div className="grid grid-cols-2 gap-3">
            {propertyTypes.map(type => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => setPropertyType(type.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    propertyType === type.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${
                    propertyType === type.value ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <p className="text-sm font-medium">{type.label}</p>
                  <p className="text-xs text-blue-600 font-bold mt-1">{type.percentage}% Grant</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Purchase Price
            </label>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                placeholder="450,000"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Renovation Budget
            </label>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={renovationCost}
                onChange={(e) => setRenovationCost(e.target.value)}
                placeholder="200,000"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateGrant}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Grant
        </button>
      </div>

      {/* Calculation Results */}
      {calculation && (
        <>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl shadow-xl border border-green-200 p-6 md:p-8">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Estimated Grant</p>
              <p className="text-4xl md:text-5xl font-bold text-green-700">
                {formatCurrency(calculation.grantAmount)}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {calculation.grantPercentage}% of {formatCurrency(calculation.grantEligibleCost)} eligible costs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/70 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">Total Investment</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(calculation.propertyValue + calculation.renovationCost)}
                </p>
              </div>
              <div className="bg-white/70 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">Grant Savings</p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(calculation.grantAmount)}
                </p>
              </div>
              <div className="bg-white/70 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">Net Investment</p>
                <p className="text-xl font-bold text-blue-600">
                  {formatCurrency(calculation.netInvestment)}
                </p>
              </div>
            </div>

            {calculation.grantAmount >= calculation.maxGrantAmount && (
              <div className="mt-4 p-3 bg-yellow-100 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Maximum Grant Reached</p>
                  <p className="text-sm text-yellow-700">
                    The maximum grant amount of €2.25M has been applied to your calculation.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Eligibility Check */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-semibold">Eligibility Requirements</h4>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{eligibilityScore.toFixed(0)}%</p>
                <p className="text-sm text-gray-600">Eligibility Score</p>
              </div>
            </div>

            <div className="space-y-3">
              {requirements.map(req => (
                <div key={req.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    req.isMet ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {req.isMet ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-3 h-3 bg-gray-400 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${req.isMet ? 'text-gray-900' : 'text-gray-500'}`}>
                      {req.requirement}
                    </p>
                    {req.description && (
                      <p className="text-sm text-gray-500 mt-1">{req.description}</p>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    req.isMet ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {req.category}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Next Steps</p>
                  <p className="text-sm text-blue-700 mt-1">
                    {eligibilityScore >= 80 
                      ? "You're well-positioned for grant approval! Schedule a consultation to finalize your application."
                      : "Complete the remaining requirements to improve your eligibility score."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Eligible Expenses Guide */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
            <h4 className="text-lg font-semibold mb-4">Eligible vs Non-Eligible Expenses</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Grant Eligible (45%)
                </h5>
                <div className="space-y-2">
                  {eligibleExpenses.filter(e => e.eligible).map((expense, i) => (
                    <div key={i} className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-sm text-gray-900">{expense.category}</p>
                      <p className="text-xs text-gray-600 mt-1">{expense.items.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-red-700 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Not Eligible
                </h5>
                <div className="space-y-2">
                  {eligibleExpenses.filter(e => !e.eligible).map((expense, i) => (
                    <div key={i} className="p-3 bg-red-50 rounded-lg">
                      <p className="font-medium text-sm text-gray-900">{expense.category}</p>
                      <p className="text-xs text-gray-600 mt-1">{expense.items.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {projectId && (
              <button
                onClick={saveCalculation}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Shield className="w-5 h-5" />
                )}
                Save to Project
              </button>
            )}
            <button
              onClick={generateReport}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Generate Full Report
            </button>
            <button
              onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
            >
              Detailed Analysis
            </button>
          </div>
        </>
      )}

      {/* Success Stories */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Success Stories</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-700">€1.8M</p>
            <p className="text-sm text-gray-600">Largest grant approved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-700">92%</p>
            <p className="text-sm text-gray-600">Success rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-700">€45M</p>
            <p className="text-sm text-gray-600">Total grants secured</p>
          </div>
        </div>
      </div>
    </div>
  );
}
