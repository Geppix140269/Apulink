// app/my-apulink/lib/dashboard-api.ts
// Dashboard API helper functions

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface DashboardMetrics {
  activeProjects: number;
  totalInvestment: number;
  totalTeamMembers: number;
  documentsUploaded: number;
  avgProgress: number;
  potentialGrants: number;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  status: 'planning' | 'purchasing' | 'renovating' | 'completed';
  progress: number;
  budget: number;
  grant_amount?: number;
  created_at: string;
  updated_at: string;
  buyer_id: string;
  project_team?: any[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  status: string;
  created_at: string;
  project_id: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  professional_type: string;
  joined_at: string;
  project_id: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export async function getDashboardData(userId: string) {
  const supabase = createClientComponentClient();

  try {
    // Fetch user's projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*, project_team(*)')
      .eq('buyer_id', userId)
      .order('created_at', { ascending: false });

    if (projectsError) throw projectsError;

    // Fetch recent documents
    const { data: documents, error: docsError } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (docsError) throw docsError;

    // Fetch notifications
    const { data: notifications, error: notifError } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .eq('is_read', false)
      .order('created_at', { ascending: false })
      .limit(5);

    if (notifError) throw notifError;

    // Calculate metrics
    const metrics: DashboardMetrics = {
      activeProjects: projects?.filter(p => p.status !== 'completed').length || 0,
      totalInvestment: projects?.reduce((sum, p) => sum + (p.budget || 0), 0) || 0,
      totalTeamMembers: new Set(projects?.flatMap(p => p.project_team?.map((t: any) => t.professional_id) || [])).size,
      documentsUploaded: documents?.length || 0,
      avgProgress: projects?.length > 0 
        ? projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length 
        : 0,
      potentialGrants: projects?.reduce((sum, p) => sum + (p.grant_amount || 0), 0) || 0
    };

    return {
      projects: projects || [],
      documents: documents || [],
      notifications: notifications || [],
      metrics
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      projects: [],
      documents: [],
      notifications: [],
      metrics: {
        activeProjects: 0,
        totalInvestment: 0,
        totalTeamMembers: 0,
        documentsUploaded: 0,
        avgProgress: 0,
        potentialGrants: 0
      }
    };
  }
}
