// app/my-apulink/components/TeamManager.tsx
// Team collaboration and professional management system

'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { 
  Users, 
  UserPlus, 
  MessageSquare, 
  Phone, 
  Mail, 
  Star, 
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Send,
  Calendar,
  Briefcase,
  Award
} from 'lucide-react';

interface Professional {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  professional_type: string;
  bio?: string;
  certifications?: string[];
  rating?: number;
  completed_projects?: number;
}

interface TeamMember {
  id: string;
  project_id: string;
  professional_id: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
  joined_at: string;
  professionals?: Professional;
  projects?: {
    id: string;
    name: string;
  };
}

interface Inquiry {
  id: string;
  project_id: string;
  professional_id: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  professionals?: Professional;
}

export default function TeamManager() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [availableProfessionals, setAvailableProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'team' | 'invitations' | 'search'>('team');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [inviteMessage, setInviteMessage] = useState('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      setLoading(true);
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user) return;

      // Load team members
      const { data: members, error: membersError } = await supabase
        .from('project_team')
        .select(`
          *,
          professionals!inner(*),
          projects!inner(id, name)
        `)
        .eq('projects.buyer_id', user.user.id)
        .order('joined_at', { ascending: false });

      if (membersError) throw membersError;
      setTeamMembers(members || []);

      // Load pending inquiries
      const { data: inqs, error: inqsError } = await supabase
        .from('inquiries')
        .select(`
          *,
          professionals!inner(*)
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (inqsError) throw inqsError;
      setInquiries(inqs || []);

      // Load available professionals
      const { data: profs, error: profsError } = await supabase
        .from('professionals')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (profsError) throw profsError;
      setAvailableProfessionals(profs || []);
    } catch (error) {
      console.error('Error loading team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendInvitation = async (professionalId: string) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user) return;

      // Get first active project
      const { data: projects } = await supabase
        .from('projects')
        .select('id')
        .eq('buyer_id', user.user.id)
        .eq('is_active', true)
        .limit(1);

      if (!projects || projects.length === 0) {
        alert('Please create a project first');
        return;
      }

      const { error } = await supabase
        .from('inquiries')
        .insert({
          project_id: projects[0].id,
          professional_id: professionalId,
          message: inviteMessage || 'I would like to invite you to join my project team.',
          status: 'pending'
        });

      if (error) throw error;

      // Create notification
      await supabase
        .from('notifications')
        .insert({
          user_id: professionalId,
          type: 'invitation',
          title: 'New Project Invitation',
          message: `You have been invited to join a project`,
          related_id: projects[0].id,
          related_type: 'project'
        });

      setShowInviteModal(false);
      setInviteMessage('');
      setSelectedProfessional(null);
      loadTeamData();
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };

  const acceptInquiry = async (inquiryId: string) => {
    try {
      const inquiry = inquiries.find(i => i.id === inquiryId);
      if (!inquiry) return;

      // Update inquiry status
      const { error: updateError } = await supabase
        .from('inquiries')
        .update({ status: 'accepted' })
        .eq('id', inquiryId);

      if (updateError) throw updateError;

      // Add to project team
      const { error: teamError } = await supabase
        .from('project_team')
        .insert({
          project_id: inquiry.project_id,
          professional_id: inquiry.professional_id,
          role: 'team_member',
          status: 'active'
        });

      if (teamError) throw teamError;

      loadTeamData();
    } catch (error) {
      console.error('Error accepting inquiry:', error);
    }
  };

  const rejectInquiry = async (inquiryId: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: 'rejected' })
        .eq('id', inquiryId);

      if (error) throw error;
      loadTeamData();
    } catch (error) {
      console.error('Error rejecting inquiry:', error);
    }
  };

  const removeMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('project_team')
        .update({ status: 'inactive' })
        .eq('id', memberId);

      if (error) throw error;
      loadTeamData();
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const sendMessage = async (member: TeamMember) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user) return;

      // Create notification for team member
      await supabase
        .from('notifications')
        .insert({
          user_id: member.professional_id,
          type: 'project_update',
          title: 'Project Update',
          message: `New update on ${member.projects?.name || 'your project'}`,
          related_id: member.project_id,
          related_type: 'project'
        });

      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const roleColors = {
    architect: 'bg-blue-100 text-blue-700',
    engineer: 'bg-purple-100 text-purple-700',
    lawyer: 'bg-green-100 text-green-700',
    contractor: 'bg-orange-100 text-orange-700',
    surveyor: 'bg-yellow-100 text-yellow-700',
    team_member: 'bg-gray-100 text-gray-700'
  };

  const filteredProfessionals = availableProfessionals.filter(prof => {
    const matchesSearch = prof.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prof.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prof.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || prof.professional_type === selectedRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <button
          onClick={() => setActiveTab('team')}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'team'
              ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          My Team ({teamMembers.filter(m => m.status === 'active').length})
        </button>
        <button
          onClick={() => setActiveTab('invitations')}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'invitations'
              ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          Invitations ({inquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'search'
              ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Search className="w-4 h-4 inline mr-2" />
          Find Professionals
        </button>
      </div>

      {/* Team Members Tab */}
      {activeTab === 'team' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.filter(m => m.status === 'active').map((member) => (
            <div key={member.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    {member.professionals?.first_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {member.professionals?.first_name} {member.professionals?.last_name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.professionals?.company_name}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        roleColors[member.professionals?.professional_type || 'team_member']
                      }`}>
                        {member.professionals?.professional_type}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Joined {new Date(member.joined_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                {member.professionals?.rating && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    {member.professionals.rating.toFixed(1)}
                  </div>
                )}
                {member.professionals?.completed_projects && (
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {member.professionals.completed_projects} projects
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => sendMessage(member)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </button>
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invitations Tab */}
      {activeTab === 'invitations' && (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No pending invitations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Check back later for new team member requests
              </p>
            </div>
          ) : (
            inquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                      {inquiry.professionals?.first_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {inquiry.professionals?.first_name} {inquiry.professionals?.last_name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {inquiry.professionals?.professional_type} • {inquiry.professionals?.company_name}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  {inquiry.message}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => acceptInquiry(inquiry.id)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white rounded-lg hover:opacity-90"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept
                  </button>
                  <button
                    onClick={() => rejectInquiry(inquiry.id)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Search Professionals Tab */}
      {activeTab === 'search' && (
        <>
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Professionals</option>
              <option value="architect">Architects</option>
              <option value="engineer">Engineers</option>
              <option value="lawyer">Lawyers</option>
              <option value="contractor">Contractors</option>
              <option value="surveyor">Surveyors</option>
            </select>
          </div>

          {/* Professional Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProfessionals.map((professional) => (
              <div key={professional.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                      {professional.first_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {professional.first_name} {professional.last_name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {professional.company_name}
                      </p>
                    </div>
                  </div>
                  {professional.rating && (
                    <div className="flex items-center text-sm">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {professional.rating.toFixed(1)}
                    </div>
                  )}
                </div>

                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  roleColors[professional.professional_type || 'team_member']
                }`}>
                  {professional.professional_type}
                </span>

                {professional.bio && (
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {professional.bio}
                  </p>
                )}

                <button
                  onClick={() => {
                    setSelectedProfessional(professional);
                    setShowInviteModal(true);
                  }}
                  className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white rounded-lg hover:opacity-90"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Send Invitation
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Invite Modal */}
      {showInviteModal && selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Invite {selectedProfessional.first_name} {selectedProfessional.last_name}
            </h3>
            <textarea
              value={inviteMessage}
              onChange={(e) => setInviteMessage(e.target.value)}
              placeholder="Add a personal message to your invitation..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              rows={4}
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => sendInvitation(selectedProfessional.id)}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white rounded-lg hover:opacity-90"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Invitation
              </button>
              <button
                onClick={() => {
                  setShowInviteModal(false);
                  setInviteMessage('');
                  setSelectedProfessional(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
