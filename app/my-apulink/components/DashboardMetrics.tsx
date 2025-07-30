// app/my-apulink/components/DashboardMetrics.tsx
import React, { useState, useEffect } from 'react';
import { Euro, TrendingUp, Users, Calendar, Loader2 } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface DashboardMetricsProps {
  userId?: string;
}

export default function DashboardMetrics({ userId }: DashboardMetricsProps) {
  const supabase = createClientComponentClient();
  const [metrics, setMetrics] = useState({
    totalPortfolio: 0,
    totalGrants: 0,
    teamExperts: 0,
    avgProgress: 0,
    projectCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        setLoading(true);
        
        // Get current user if not provided
        let currentUserId = userId;
        if (!currentUserId) {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;
          currentUserId = user.id;
        }

        // Get projects count and total budget
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('id, target_budget, progress')
          .eq('buyer_id', currentUserId)
          .eq('is_active', true);

        if (projectsError) {
          console.error('Error loading projects:', projectsError);
          return;
        }

        // Calculate metrics from real data
        const projectCount = projects?.length || 0;
        const totalBudget = projects?.reduce((sum, p) => sum + (p.target_budget || 0), 0) || 0;
        const totalGrants = totalBudget * 0.45; // 45% grant calculation
        const avgProgress = projects?.length > 0 
          ? projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length 
          : 0;

        // Get unique team members count across all projects
        const { data: teamMembers, error: teamError } = await supabase
          .from('project_team')
          .select('professional_id')
          .in('project_id', projects?.map(p => p.id) || [])
          .eq('status', 'active');

        if (teamError) {
          console.error('Error loading team:', teamError);
        }

        // Count unique professionals
        const uniqueProfessionals = new Set(teamMembers?.map(tm => tm.professional_id) || []);
        const teamCount = uniqueProfessionals.size;

        setMetrics({
          totalPortfolio: totalBudget,
          totalGrants: totalGrants,
          teamExperts: teamCount,
          avgProgress: Math.round(avgProgress),
          projectCount: projectCount
        });
      } catch (error) {
        console.error('Error loading metrics:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, [supabase, userId]);

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
            formatCurrency(metrics.totalPortfolio)
          )}
        </p>
        <p className="text-xs md:text-sm text-gray-600">Total Portfolio</p>
        <p className="text-xs text-blue-600 mt-1 md:mt-2 hidden md:block">
          {!loading && `${metrics.projectCount} active projects`}
        </p>
      </div>
      
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6 text-center">
        <TrendingUp className="w-6 md:w-8 h-6 md:h-8 text-green-600 mx-auto mb-2" />
        <p className="text-xl md:text-3xl font-bold text-gray-900">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            formatCurrency(metrics.totalGrants)
          )}
        </p>
        <p className="text-xs md:text-sm text-gray-600">Total Grants</p>
        <p className="text-xs text-green-600 mt-1 md:mt-2 hidden md:block">45% savings secured</p>
      </div>
      
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6 text-center">
        <Users className="w-6 md:w-8 h-6 md:h-8 text-indigo-600 mx-auto mb-2" />
        <p className="text-xl md:text-3xl font-bold text-gray-900">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            metrics.teamExperts
          )}
        </p>
        <p className="text-xs md:text-sm text-gray-600">Team Experts</p>
        <p className="text-xs text-indigo-600 mt-1 md:mt-2 hidden md:block">
          {!loading && `${metrics.teamExperts} active now`}
        </p>
      </div>
      
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6 text-center">
        <Calendar className="w-6 md:w-8 h-6 md:h-8 text-orange-600 mx-auto mb-2" />
        <p className="text-xl md:text-3xl font-bold text-gray-900">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            `${metrics.avgProgress}%`
          )}
        </p>
        <p className="text-xs md:text-sm text-gray-600">Progress</p>
        <p className="text-xs text-orange-600 mt-1 md:mt-2 hidden md:block">On schedule</p>
      </div>
    </div>
  );
}
