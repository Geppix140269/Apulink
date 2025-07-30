// app/my-apulink/components/ProjectList.tsx
import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Euro, TrendingUp, Clock, Users, Loader2 } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Project {
  id: string;
  name: string;
  location: string;
  price: number;
  target_budget: number;
  progress: number;
  status: 'new' | 'under-review' | 'shortlisted' | 'completed';
  next_milestone?: string;
  days_to_milestone?: number;
  created_at: string;
  updated_at: string;
}

interface ProjectWithTeam extends Project {
  team_activity?: string;
  team_count?: number;
  grant_amount?: number;
  roi?: number;
}

interface ProjectListProps {
  userId?: string;
  onProjectClick?: (projectId: string) => void;
}

export default function ProjectList({ userId, onProjectClick }: ProjectListProps) {
  const supabase = createClientComponentClient();
  const [projects, setProjects] = useState<ProjectWithTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        
        // Get current user if not provided
        let currentUserId = userId;
        if (!currentUserId) {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;
          currentUserId = user.id;
        }

        // Get projects with related data
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select(`
            *,
            project_team (
              id,
              professional_id,
              role,
              status
            ),
            project_messages (
              id,
              content,
              created_at,
              sender_id
            )
          `)
          .eq('buyer_id', currentUserId)
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (projectError) {
          console.error('Error loading projects:', projectError);
          return;
        }

        // Process projects to add calculated fields
        const processedProjects: ProjectWithTeam[] = await Promise.all(
          (projectData || []).map(async (project) => {
            // Count active team members
            const activeTeamMembers = project.project_team?.filter(
              (member: any) => member.status === 'active'
            ).length || 0;

            // Get latest team activity
            const latestMessage = project.project_messages?.[0];
            let teamActivity = 'No recent activity';
            
            if (latestMessage) {
              // Get professional name who sent the message
              const { data: professional } = await supabase
                .from('professionals')
                .select('first_name, last_name')
                .eq('user_id', latestMessage.sender_id)
                .single();
                
              if (professional) {
                teamActivity = `${professional.first_name} ${professional.last_name}: ${latestMessage.content.substring(0, 50)}...`;
              }
            }

            // Calculate grant amount (45% of target budget)
            const grantAmount = (project.target_budget || 0) * 0.45;

            // Calculate estimated ROI (simplified calculation)
            const roi = project.price > 0 ? Math.round((grantAmount / project.price) * 100) : 0;

            return {
              ...project,
              team_activity: teamActivity,
              team_count: activeTeamMembers,
              grant_amount: grantAmount,
              roi: roi
            };
          })
        );

        setProjects(processedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [supabase, userId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under-review':
        return 'bg-blue-100 text-blue-700';
      case 'shortlisted':
        return 'bg-indigo-100 text-indigo-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Projects</h3>
        <p className="text-gray-500">Start by creating your first property project</p>
        <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
          Create New Project
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      {projects.map((property) => (
        <div 
          key={property.id} 
          className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
          onClick={() => onProjectClick?.(property.id)}
        >
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm md:text-base pr-2">{property.name}</h4>
                <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {property.location}
                </p>
              </div>
              <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(property.status)}`}>
                {property.status.replace('-', ' ')}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price</span>
                <span className="font-semibold text-gray-900">{formatCurrency(property.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Grant (45%)</span>
                <span className="font-semibold text-green-600">{formatCurrency(property.grant_amount || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Est. ROI</span>
                <span className="font-semibold text-blue-600">{property.roi}%</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Project Progress</span>
                <span className="font-bold text-gray-900">{property.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${property.progress}%` }}
                />
              </div>
            </div>

            {property.next_milestone && (
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-xs font-medium text-gray-700 mb-1">Next Milestone</p>
                <p className="text-sm font-semibold text-gray-900">{property.next_milestone}</p>
                {property.days_to_milestone && (
                  <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    in {property.days_to_milestone} days
                  </p>
                )}
              </div>
            )}

            {property.team_activity && (
              <div className="text-xs text-gray-600 mb-4 flex items-start gap-2">
                <Users className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <p className="line-clamp-2">{property.team_activity}</p>
              </div>
            )}

            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
              View Project Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
