// app/my-apulink/components-new/DashboardMetrics.tsx
import React from 'react';
import { Euro, TrendingUp, Users, Calendar, Loader2 } from 'lucide-react';

interface DashboardMetricsProps {
  metrics: any;
  loading: boolean;
}

export default function DashboardMetrics({ metrics, loading }: DashboardMetricsProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `€${(amount / 1000).toFixed(0)}K`;
    }
    return `€${amount.toFixed(0)}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6 text-center">
        <Euro className="w-6 md:w-8 h-6 md:h-8 text-blue-600 mx-auto mb-2" />
        <p className="text-xl md:text-3xl font-bold text-gray-900">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            formatCurrency(metrics?.totalPortfolio || 0)
          )}
        </p>
        <p className="text-xs md:text-sm text-gray-600">Total Portfolio</p>
      </div>
      
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6 text-center">
        <TrendingUp className="w-6 md:w-8 h-6 md:h-8 text-green-600 mx-auto mb-2" />
        <p className="text-xl md:text-3xl font-bold text-gray-900">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            formatCurrency(metrics?.totalGrants || 0)
          )}
        </p>
        <p className="text-xs md:text-sm text-gray-600">Total Grants</p>
      </div>
      
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6 text-center">
        <Users className="w-6 md:w-8 h-6 md:h-8 text-indigo-600 mx-auto mb-2" />
        <p className="text-xl md:text-3xl font-bold text-gray-900">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            metrics?.teamExperts || 0
          )}
        </p>
        <p className="text-xs md:text-sm text-gray-600">Team Experts</p>
      </div>
      
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6 text-center">
        <Calendar className="w-6 md:w-8 h-6 md:h-8 text-orange-600 mx-auto mb-2" />
        <p className="text-xl md:text-3xl font-bold text-gray-900">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            `${metrics?.avgProgress || 0}%`
          )}
        </p>
        <p className="text-xs md:text-sm text-gray-600">Progress</p>
      </div>
    </div>
  );
}