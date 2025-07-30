// app/my-apulink/lib/dashboard-api.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Types
export interface DashboardMetrics {
  totalProjects: number;
  totalBudget: number;
  totalGrants: number;
  totalTeamMembers: number;
  avgProgress: number;
}

export interface Project {
  id: string;
  buyer_id: string;
  property_type: string;
  location: string;
  target_budget: number;
  progress: number;
  status: 'planning' | 'in_progress' | 'completed';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  project_id: string;
  name: string;
  type: string;
  size: number;
  uploaded_by: string;
  uploaded_at: string;
  url?: string;
}

export interface TeamMember {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  profession: string;
  role: string;
  email: string;
  avatar_url?: string;
}

// API Functions
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const supabase = createClientComponentClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Get metrics using RPC or manual calculation
    const { data: projects } = await supabase
      .from('projects')
      .select('*, project_team(*)')
      .eq('buyer_id', user.id)
      .eq('is_active', true);

    if (!projects) {
      return {
        totalProjects: 0,
        totalBudget: 0,
        totalGrants: 0,
        totalTeamMembers: 0,
        avgProgress: 0
      };
    }

    const metrics = {
      totalProjects: projects.length,
      totalBudget: projects.reduce((sum, p) => sum + (p.target_budget || 0), 0),
      totalGrants: projects.reduce((sum, p) => sum + (p.target_budget || 0) * 0.45, 0),
      totalTeamMembers: new Set(projects.flatMap(p => p.project_team?.map(t => t.professional_id) || [])).size,
      avgProgress: projects.length > 0 
        ? projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length 
        : 0
    };

    return metrics;
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    throw error;
  }
}

export async function getUserProjects(): Promise<Project[]> {
  const supabase = createClientComponentClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('buyer_id', user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function getProjectDocuments(projectId: string): Promise<Document[]> {
  const supabase = createClientComponentClient();
  
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('project_id', projectId)
      .order('uploaded_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}

export async function getProjectTeam(projectId: string): Promise<TeamMember[]> {
  const supabase = createClientComponentClient();
  
  try {
    const { data, error } = await supabase
      .from('project_team')
      .select(`
        *,
        professionals!inner(
          user_id,
          first_name,
          last_name,
          profession,
          email,
          avatar_url
        )
      `)
      .eq('project_id', projectId)
      .eq('status', 'active');

    if (error) throw error;

    // Transform the data
    return data?.map(member => ({
      id: member.id,
      user_id: member.professionals.user_id,
      first_name: member.professionals.first_name,
      last_name: member.professionals.last_name,
      profession: member.professionals.profession,
      role: member.role,
      email: member.professionals.email,
      avatar_url: member.professionals.avatar_url
    })) || [];
  } catch (error) {
    console.error('Error fetching project team:', error);
    throw error;
  }
}

export async function createProject(projectData: Partial<Project>): Promise<Project> {
  const supabase = createClientComponentClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('projects')
      .insert({
        ...projectData,
        buyer_id: user.id,
        is_active: true,
        progress: 0,
        status: 'planning'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function uploadDocument(file: File, projectId: string): Promise<Document> {
  const supabase = createClientComponentClient();
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Upload file to storage
    const fileName = `${user.id}/${projectId}/${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('project-documents')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Create document record
    const { data, error } = await supabase
      .from('documents')
      .insert({
        project_id: projectId,
        name: file.name,
        type: file.type,
        size: file.size,
        uploaded_by: user.id,
        storage_path: uploadData.path
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}

export async function inviteProfessional(professionalId: string, projectId: string, role: string) {
  const supabase = createClientComponentClient();
  
  try {
    const { data, error } = await supabase
      .from('project_team')
      .insert({
        project_id: projectId,
        professional_id: professionalId,
        role: role,
        status: 'invited'
      })
      .select();

    if (error) throw error;
    
    // TODO: Send invitation email via API
    
    return data;
  } catch (error) {
    console.error('Error inviting professional:', error);
    throw error;
  }
}
