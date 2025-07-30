// app/my-apulink/components/BudgetPlanner.tsx
import React, { useState, useEffect } from 'react';
import { 
  Euro, TrendingUp, TrendingDown, Info, PieChart, 
  BarChart3, Calculator, FileText, Loader2, 
  AlertCircle, CheckCircle, Download, Upload
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface BudgetItem {
  id: string;
  project_id: string;
  category: string;
  subcategory?: string;
  description: string;
  estimated_cost: number;
  actual_cost?: number;
  grant_eligible: boolean;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  vendor?: string;
  invoice_number?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

interface BudgetCategory {
  name: string;
  estimated: number;
  actual: number;
  grantEligible: number;
  items: BudgetItem[];
}

interface BudgetScenario {
  name: 'realistic' | 'optimistic' | 'conservative';
  adjustmentFactor: number;
  description: string;
}

interface BudgetPlannerProps {
  projectId?: string;
  userId?: string;
}

export default function BudgetPlanner({ projectId, userId }: BudgetPlannerProps) {
  const supabase = createClientComponentClient();
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState<'realistic' | 'optimistic' | 'conservative'>('realistic');
  const [showAddItem, setShowAddItem] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const scenarios: BudgetScenario[] = [
    { 
      name: 'optimistic', 
      adjustmentFactor: 0.9, 
      description: 'Best case - 10% under budget' 
    },
    { 
      name: 'realistic', 
      adjustmentFactor: 1.0, 
      description: 'Expected costs based on estimates' 
    },
    { 
      name: 'conservative', 
      adjustmentFactor: 1.15, 
      description: 'Buffer included - 15% over budget' 
    }
  ];

  const categories = [
    'Property Purchase',
    'Legal & Notary',
    'Renovation',
    'Design & Architecture',
    'Permits & Licenses',
    'Marketing & Launch',
    'Contingency'
  ];

  useEffect(() => {
    loadBudgetData();
  }, [projectId, userId]);

  async function loadBudgetData() {
    try {
      setLoading(true);
      
      let currentUserId = userId;
      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        currentUserId = user.id;
      }

      // Build query
      let query = supabase
        .from('budget_items')
        .select(`
          *,
          project:projects!inner (
            buyer_id,
            name,
            target_budget
          )
        `)
        .order('category', { ascending: true });

      if (projectId) {
        query = query.eq('project_id', projectId);
      } else {
        // Get budget items for all user's projects
        query = query.eq('project.buyer_id', currentUserId);
      }

      const { data: items, error } = await query;

      if (error) {
        console.error('Error loading budget:', error);
        return;
      }

      setBudgetItems(items || []);
    } catch (error) {
      console.error('Error loading budget data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function addBudgetItem(item: Partial<BudgetItem>) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('budget_items')
        .insert({
          ...item,
          project_id: projectId,
          status: 'pending'
        });

      if (error) {
        console.error('Error adding budget item:', error);
        return;
      }

      // Reload budget data
      await loadBudgetData();
      setShowAddItem(false);
    } catch (error) {
      console.error('Error adding budget item:', error);
    }
  }

  async function updateBudgetItem(itemId: string, updates: Partial<BudgetItem>) {
    try {
      const { error } = await supabase
        .from('budget_items')
        .update(updates)
        .eq('id', itemId);

      if (error) {
        console.error('Error updating budget item:', error);
        return;
      }

      // Reload budget data
      await loadBudgetData();
    } catch (error) {
      console.error('Error updating budget item:', error);
    }
  }

  // Group items by category
  const groupedBudget = budgetItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = {
        name: category,
        estimated: 0,
        actual: 0,
        grantEligible: 0,
        items: []
      };
    }
    
    acc[category].estimated += item.estimated_cost;
    acc[category].actual += item.actual_cost || 0;
    if (item.grant_eligible) {
      acc[category].grantEligible += item.estimated_cost;
    }
    acc[category].items.push(item);
    
    return acc;
  }, {} as Record<string, BudgetCategory>);

  // Calculate totals
  const totals = {
    estimated: budgetItems.reduce((sum, item) => sum + item.estimated_cost, 0),
    actual: budgetItems.reduce((sum, item) => sum + (item.actual_cost || 0), 0),
    grantEligible: budgetItems.filter(item => item.grant_eligible).reduce((sum, item) => sum + item.estimated_cost, 0)
  };

  // Apply scenario adjustment
  const scenarioTotals = {
    total: totals.estimated * scenarios.find(s => s.name === selectedScenario)!.adjustmentFactor,
    grant: totals.grantEligible * 0.45,
    net: (totals.estimated * scenarios.find(s => s.name === selectedScenario)!.adjustmentFactor) - (totals.grantEligible * 0.45)
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'approved':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Scenario Selector */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-lg md:text-xl font-semibold">Investment Scenarios</h3>
          <div className="flex gap-2 flex-wrap">
            {scenarios.map((scenario) => (
              <button
                key={scenario.name}
                onClick={() => setSelectedScenario(scenario.name)}
                className={`px-3 md:px-4 py-2 rounded-lg capitalize text-sm ${
                  selectedScenario === scenario.name 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {scenario.name}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="p-4 md:p-6 bg-blue-50 rounded-xl text-center">
            <p className="text-xs md:text-sm text-gray-600 mb-2">Total Investment</p>
            <p className="text-xl md:text-2xl font-bold text-blue-700">
              {formatCurrency(scenarioTotals.total)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {scenarios.find(s => s.name === selectedScenario)?.description}
            </p>
          </div>
          <div className="p-4 md:p-6 bg-green-50 rounded-xl text-center">
            <p className="text-xs md:text-sm text-gray-600 mb-2">Grant (45%)</p>
            <p className="text-xl md:text-2xl font-bold text-green-700">
              {formatCurrency(scenarioTotals.grant)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              From {formatCurrency(totals.grantEligible)} eligible
            </p>
          </div>
          <div className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl text-center">
            <p className="text-xs md:text-sm text-gray-600 mb-2">Your Investment</p>
            <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {formatCurrency(scenarioTotals.net)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              After grants applied
            </p>
          </div>
        </div>

        {/* Budget vs Actual */}
        {totals.actual > 0 && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-semibold text-yellow-900">Budget vs Actual</p>
                  <p className="text-sm text-yellow-700">
                    {formatCurrency(totals.actual)} spent of {formatCurrency(totals.estimated)} budgeted
                  </p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${
                totals.actual <= totals.estimated ? 'text-green-600' : 'text-red-600'
              }`}>
                {((totals.actual / totals.estimated) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm ${
            selectedCategory === 'all'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        {Object.keys(groupedBudget).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Budget Categories */}
      <div className="space-y-4">
        {Object.entries(groupedBudget)
          .filter(([category]) => selectedCategory === 'all' || selectedCategory === category)
          .map(([categoryName, category]) => (
            <div key={categoryName} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{categoryName}</h4>
                  <p className="text-sm text-gray-600">
                    {category.items.length} items • {formatCurrency(category.estimated)} budgeted
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Grant Eligible</p>
                  <p className="font-semibold text-green-600">{formatCurrency(category.grantEligible)}</p>
                </div>
              </div>

              {/* Category Items */}
              <div className="space-y-2">
                {category.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-medium text-sm text-gray-900">{item.description}</p>
                        {item.grant_eligible && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Grant eligible
                          </span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      {item.vendor && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item.vendor} {item.invoice_number && `• Invoice: ${item.invoice_number}`}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(item.estimated_cost)}</p>
                      {item.actual_cost && item.actual_cost !== item.estimated_cost && (
                        <p className={`text-xs ${
                          item.actual_cost > item.estimated_cost ? 'text-red-600' : 'text-green-600'
                        }`}>
                          Actual: {formatCurrency(item.actual_cost)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Category Summary */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category Total</span>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(category.estimated)}</p>
                    {category.actual > 0 && (
                      <p className={`text-xs ${
                        category.actual > category.estimated ? 'text-red-600' : 'text-green-600'
                      }`}>
                        Actual: {formatCurrency(category.actual)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Add Budget Item Button */}
      <div className="text-center">
        <button
          onClick={() => setShowAddItem(!showAddItem)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
        >
          <Upload className="w-5 h-5" />
          Add Budget Item
        </button>
      </div>

      {/* Budget Summary Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Budget Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Budget</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(totals.estimated)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Grant Eligible</p>
            <p className="text-xl font-bold text-green-600">{formatCurrency(totals.grantEligible)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Spent</p>
            <p className="text-xl font-bold text-blue-600">{formatCurrency(totals.actual)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Remaining</p>
            <p className="text-xl font-bold text-orange-600">
              {formatCurrency(totals.estimated - totals.actual)}
            </p>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="flex justify-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
          <Download className="w-4 h-4" />
          Export to Excel
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
          <FileText className="w-4 h-4" />
          Generate Report
        </button>
      </div>
    </div>
  );
}
