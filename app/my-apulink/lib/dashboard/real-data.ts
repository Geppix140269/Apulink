// lib/dashboard/real-data.ts
// Dashboard data fetching functions with proper types

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Type definitions
interface Project {
  id: string;
  name: string;
  buyer_id: string;
  property_type: string;
  location: string;
  purchase_price: number;
  target_budget: number;
  estimated_grant?: number;
  status: 'planning' | 'purchasing' | 'renovating' | 'completed';
  progress: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Document {
  id: string;
  project_id: string;
  name: string;
  english_name?: string;
  type: string;
  status: string;
  file_size: number;
  version: string;
  created_at: string;
  updated_at: string;
  uploaded_by: string;
}

interface TeamMember {
  id: string;
  project_id: string;
  professional_id: string;
  role: string;
  status: string;
  joined_at: string;
  professional: {
    id: string;
    first_name: string;
    last_name: string;
    professional_type: string;
    email: string;
    phone?: string;
    company_name?: string;
  };
}

interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  related_id?: string;
  related_type?: string;
  created_at: string;
}

// Export the main function to get dashboard data
export async function getDashboardData(userId: string) {
  const supabase = createClientComponentClient();

  const [projects, documents, teamMembers, notifications] = await Promise.all([
    getProjects(userId),
    getDocuments(userId),
    getTeamMembers(userId),
    getNotifications(userId)
  ]);

  const metrics = calculateMetrics(projects, teamMembers);

  return {
    projects,
    documents,
    teamMembers,
    notifications,
    metrics
  };
}

async function getProjects(userId: string): Promise<Project[]> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('buyer_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return (data || []).map((project: any) => ({
    id: project.id,
    name: project.name || 'Untitled Project',
    buyer_id: project.buyer_id,
    property_type: project.property_type || 'residential',
    location: project.location || 'Italy',
    purchase_price: project.purchase_price || 0,
    target_budget: project.target_budget || 0,
    estimated_grant: project.estimated_grant || 0,
    status: project.status || 'planning',
    progress: project.progress || 0,
    is_active: project.is_active ?? true,
    created_at: project.created_at,
    updated_at: project.updated_at
  }));
}

async function getDocuments(userId: string): Promise<Document[]> {
  const supabase = createClientComponentClient();
  
  // First get user's projects
  const { data: projects } = await supabase
    .from('projects')
    .select('id')
    .eq('buyer_id', userId);

  if (!projects || projects.length === 0) return [];

  const projectIds = projects.map((p: any) => p.id);

  // Then get documents for those projects
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .in('project_id', projectIds)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching documents:', error);
    return [];
  }

  return (data || []).map((doc: any) => ({
    id: doc.id,
    project_id: doc.project_id,
    name: doc.name || 'Untitled Document',
    english_name: doc.english_name,
    type: doc.type || 'other',
    status: doc.status || 'draft',
    file_size: doc.file_size || 0,
    version: doc.version || 'v1',
    created_at: doc.created_at,
    updated_at: doc.updated_at,
    uploaded_by: doc.uploaded_by
  }));
}

async function getTeamMembers(userId: string): Promise<TeamMember[]> {
  const supabase = createClientComponentClient();
  
  // First get user's projects
  const { data: projects } = await supabase
    .from('projects')
    .select('id')
    .eq('buyer_id', userId);

  if (!projects || projects.length === 0) return [];

  const projectIds = projects.map((p: any) => p.id);

  // Then get team members for those projects
  const { data, error } = await supabase
    .from('project_team')
    .select(`
      *,
      professional:professionals (
        id,
        first_name,
        last_name,
        professional_type,
        email,
        phone,
        company_name
      )
    `)
    .in('project_id', projectIds)
    .eq('status', 'active');

  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }

  return (data || []).map((member: any) => ({
    id: member.id,
    project_id: member.project_id,
    professional_id: member.professional_id,
    role: member.role || 'team_member',
    status: member.status || 'active',
    joined_at: member.joined_at || member.created_at,
    professional: member.professional || {
      id: member.professional_id,
      first_name: 'Unknown',
      last_name: 'Professional',
      professional_type: 'professional',
      email: 'unknown@example.com'
    }
  }));
}

async function getNotifications(userId: string): Promise<Notification[]> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .eq('is_archived', false)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }

  return (data || []).map((notif: any) => ({
    id: notif.id,
    user_id: notif.user_id,
    type: notif.type || 'info',
    title: notif.title || 'Notification',
    message: notif.message || '',
    is_read: notif.is_read ?? false,
    is_archived: notif.is_archived ?? false,
    related_id: notif.related_id,
    related_type: notif.related_type,
    created_at: notif.created_at
  }));
}

function calculateMetrics(projects: Project[], teamMembers: TeamMember[]) {
  const activeProjects = projects.filter(p => p.status !== 'completed').length;
  const totalBudget = projects.reduce((sum: number, p: Project) => sum + (p.target_budget || 0), 0);
  const avgProgress = projects.length > 0
    ? Math.round(projects.reduce((sum: number, p: Project) => sum + (p.progress || 0), 0) / projects.length)
    : 0;

  return {
    activeProjects,
    totalBudget,
    avgProgress,
    teamSize: new Set(teamMembers.map(tm => tm.professional_id)).size
  };
}

// Export additional helper functions if needed
export async function updateProjectProgress(projectId: string, progress: number) {
  const supabase = createClientComponentClient();
  
  const { error } = await supabase
    .from('projects')
    .update({ progress })
    .eq('id', projectId);

  if (error) {
    console.error('Error updating project progress:', error);
    return false;
  }

  return true;
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = createClientComponentClient();
  
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }

  return true;
}
