// lib/dashboard/real-data.ts
// Functions to fetch real data from Supabase for the dashboard

import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// Get current user ID
async function getCurrentUserId() {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id;
}

// Fetch user's projects
export async function getUserProjects() {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_team (
        professional_id,
        role,
        status,
        professionals (
          id,
          first_name,
          last_name,
          profession
        )
      )
    `)
    .eq('buyer_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  // Transform data to match dashboard format
  return data?.map(project => ({
    id: project.id,
    name: project.name,
    price: `€${project.target_budget?.toLocaleString() || '0'}`,
    grantEligible: `€${Math.round((project.target_budget || 0) * 0.45).toLocaleString()}`,
    roi: '28%', // Calculate based on your logic
    status: project.status || 'new',
    score: 85,
    highlights: [project.property_type, project.target_location].filter(Boolean),
    progress: project.progress || 0,
    nextMilestone: 'Document review',
    daysToMilestone: 7,
    teamActivity: `${project.project_team?.length || 0} team members`
  })) || [];
}

// Fetch project documents
export async function getProjectDocuments(projectId?: string) {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  let query = supabase
    .from('documents')
    .select('*')
    .order('uploaded_at', { ascending: false });

  if (projectId) {
    query = query.eq('project_id', projectId);
  } else {
    // Get all documents for user's projects
    const { data: projects } = await supabase
      .from('projects')
      .select('id')
      .eq('buyer_id', userId);
    
    const projectIds = projects?.map(p => p.id) || [];
    if (projectIds.length > 0) {
      query = query.in('project_id', projectIds);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching documents:', error);
    return [];
  }

  // Transform to match dashboard format
  return data?.map(doc => ({
    id: doc.id,
    name: doc.name,
    english: doc.name, // Add translation logic if needed
    status: doc.category === 'signed' ? 'signed' : 'verified',
    type: doc.category || 'document',
    date: new Date(doc.uploaded_at).toLocaleDateString(),
    size: formatFileSize(doc.file_size),
    version: 'v1',
    sharedWith: ['All team'], // Get from document_permissions if needed
    file_path: doc.file_path
  })) || [];
}

// Fetch team members
export async function getProjectTeam(projectId?: string) {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  let projectIds = projectId ? [projectId] : [];
  
  if (!projectId) {
    // Get all projects for user
    const { data: projects } = await supabase
      .from('projects')
      .select('id')
      .eq('buyer_id', userId);
    
    projectIds = projects?.map(p => p.id) || [];
  }

  if (projectIds.length === 0) return [];

  const { data, error } = await supabase
    .from('project_team')
    .select(`
      *,
      professionals (
        id,
        first_name,
        last_name,
        profession,
        email,
        phone,
        rating,
        bio
      )
    `)
    .in('project_id', projectIds)
    .eq('status', 'active');

  if (error) {
    console.error('Error fetching team:', error);
    return [];
  }

  // Transform to match dashboard format
  return data?.map(member => ({
    id: member.professional_id,
    name: `${member.professionals.first_name} ${member.professionals.last_name}`,
    role: member.role,
    rating: member.professionals.rating || 4.8,
    status: 'online',
    expertise: [member.professionals.profession],
    lastMessage: 'Ready to help with your project',
    lastMessageTime: '1 hour ago',
    unread: 0
  })) || [];
}

// Fetch messages
export async function getProjectMessages(projectId: string) {
  const { data, error } = await supabase
    .from('project_messages')
    .select(`
      *,
      sender:sender_id (
        id,
        email,
        buyers (first_name, last_name),
        professionals (first_name, last_name)
      )
    `)
    .eq('project_id', projectId)
    .order('sent_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data || [];
}

// Create a new project
export async function createProject(projectData: {
  name: string;
  property_type: string;
  target_budget: number;
  target_location: string;
  target_completion_date?: string;
  notes?: string;
}) {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('projects')
    .insert({
      ...projectData,
      buyer_id: userId,
      status: 'new',
      progress: 0,
      is_active: true
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Upload document
export async function uploadDocument(
  projectId: string,
  file: File,
  category: string = 'general'
) {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  // Upload file to storage
  const fileName = `${userId}/${projectId}/${Date.now()}_${file.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('documents')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  // Create document record
  const { data, error } = await supabase
    .from('documents')
    .insert({
      project_id: projectId,
      uploaded_by: userId,
      name: file.name,
      file_path: uploadData.path,
      file_size: file.size,
      mime_type: file.type,
      category,
      is_public: false
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get notifications
export async function getUserNotifications() {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }

  return data?.map(notif => ({
    id: notif.id,
    type: notif.type,
    from: notif.title,
    content: notif.message,
    time: getTimeAgo(notif.created_at),
    read: notif.is_read,
    status: notif.is_read ? 'read' : 'delivered'
  })) || [];
}

// Helper functions
function formatFileSize(bytes?: number): string {
  if (!bytes) return '0 KB';
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

// Dashboard metrics
export async function getDashboardMetrics() {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  // Get user's projects
  const { data: projects } = await supabase
    .from('projects')
    .select('id, target_budget, progress')
    .eq('buyer_id', userId)
    .eq('is_active', true);

  // Get team members count
  const { count: teamCount } = await supabase
    .from('project_team')
    .select('*', { count: 'exact', head: true })
    .in('project_id', projects?.map(p => p.id) || [])
    .eq('status', 'active');

  // Calculate totals
  const totalBudget = projects?.reduce((sum, p) => sum + (p.target_budget || 0), 0) || 0;
  const totalGrants = totalBudget * 0.45;
  const avgProgress = projects?.length 
    ? Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length)
    : 0;

  return {
    totalProjects: projects?.length || 0,
    totalBudget,
    totalGrants,
    teamMembers: teamCount || 0,
    averageProgress: avgProgress
  };
}
