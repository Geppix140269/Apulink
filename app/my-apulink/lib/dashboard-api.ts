// app/my-apulink/lib/dashboard-api.ts
// Dashboard API functions with proper TypeScript types

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Project {
  id: string;
  name: string;
  property_type: string;
  location: string;
  purchase_price: number;
  renovation_budget: number;
  estimated_grant: number;
  status: 'planning' | 'purchasing' | 'renovating' | 'completed';
  progress_percentage: number;
  created_at: string;
  updated_at: string;
  buyer_id: string;
  is_active: boolean;
}

interface TeamMember {
  id: string;
  project_id: string;
  professional_id: string;
  role: string;
  status: string;
}

interface Document {
  id: string;
  project_id: string;
  name: string;
  type: string;
  status: string;
  created_at: string;
}

interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface DashboardData {
  projects: Project[];
  teamMembers: TeamMember[];
  documents: Document[];
  notifications: Notification[];
  metrics: {
    activeProjects: number;
    totalInvestment: number;
    totalBudget: number;
    totalGrants: number;
    totalTeamMembers: number;
    avgProgress: number;
  };
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const supabase = createClientComponentClient();

  try {
    // Fetch all data in parallel
    const [projectsRes, teamRes, docsRes, notificationsRes] = await Promise.all([
      supabase
        .from('projects')
        .select('*')
        .eq('buyer_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false }),
      
      supabase
        .from('project_team')
        .select('*')
        .eq('status', 'active'),
      
      supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10),
      
      supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .eq('is_read', false)
        .order('created_at', { ascending: false })
        .limit(10)
    ]);

    const projects = projectsRes.data || [];
    const teamMembers = teamRes.data || [];
    const documents = docsRes.data || [];
    const notifications = notificationsRes.data || [];

    // Calculate metrics with proper types
    const metrics = {
      activeProjects: projects.length,
      totalInvestment: projects.reduce((sum: number, p: Project) => sum + (p.purchase_price || 0), 0),
      totalBudget: projects.reduce((sum: number, p: Project) => sum + (p.renovation_budget || 0), 0),
      totalGrants: projects.reduce((sum: number, p: Project) => sum + (p.estimated_grant || 0), 0),
      totalTeamMembers: new Set(projects.flatMap((p: Project) => 
        teamMembers.filter((t: TeamMember) => t.project_id === p.id).map((t: TeamMember) => t.professional_id)
      )).size,
      avgProgress: projects.length > 0
        ? projects.reduce((sum: number, p: Project) => sum + (p.progress_percentage || 0), 0) / projects.length
        : 0
    };

    return {
      projects,
      teamMembers,
      documents,
      notifications,
      metrics
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    
    // Return empty data structure on error
    return {
      projects: [],
      teamMembers: [],
      documents: [],
      notifications: [],
      metrics: {
        activeProjects: 0,
        totalInvestment: 0,
        totalBudget: 0,
        totalGrants: 0,
        totalTeamMembers: 0,
        avgProgress: 0
      }
    };
  }
}

export async function getProjectDetails(projectId: string) {
  const supabase = createClientComponentClient();

  try {
    const { data: project, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_team (
          *,
          professionals (*)
        ),
        documents (*),
        project_milestones (*),
        budget_items (*)
      `)
      .eq('id', projectId)
      .single();

    if (error) throw error;
    return project;
  } catch (error) {
    console.error('Error fetching project details:', error);
    return null;
  }
}

export async function updateProject(projectId: string, updates: Partial<Project>) {
  const supabase = createClientComponentClient();

  try {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating project:', error);
    return { data: null, error };
  }
}

export async function createNotification(notification: {
  user_id: string;
  type: string;
  title: string;
  message: string;
  related_id?: string;
  related_type?: string;
}) {
  const supabase = createClientComponentClient();

  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating notification:', error);
    return { data: null, error };
  }
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = createClientComponentClient();

  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return { error };
  }
}
