// app/my-apulink/components/TeamManager.tsx
import React, { useState, useEffect } from 'react';
import { 
  Users, Star, MessageSquare, Send, UserPlus, Search, 
  Clock, Globe, MapPin, Briefcase, Loader2, Mail, 
  Phone, CheckCircle, XCircle 
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface TeamMember {
  id: string;
  professional_id: string;
  project_id: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
  joined_at: string;
  professional: {
    user_id: string;
    first_name: string;
    last_name: string;
    profession: string;
    specialization?: string[];
    rating?: number;
    location?: string;
    languages?: string[];
    email?: string;
    phone?: string;
    is_online?: boolean;
    response_time?: string;
    completed_projects?: number;
  };
  last_message?: {
    content: string;
    created_at: string;
    is_read: boolean;
  };
}

interface SearchableProfessional {
  user_id: string;
  first_name: string;
  last_name: string;
  profession: string;
  specialization: string[];
  rating: number;
  location: string;
  languages: string[];
  response_time: string;
  completed_projects: number;
  hourly_rate?: number;
}

interface TeamManagerProps {
  projectId?: string;
  userId?: string;
}

export default function TeamManager({ projectId, userId }: TeamManagerProps) {
  const supabase = createClientComponentClient();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [searchableProfessionals, setSearchableProfessionals] = useState<SearchableProfessional[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProfessionalSearch, setShowProfessionalSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [inviting, setInviting] = useState<string | null>(null);

  useEffect(() => {
    loadTeamMembers();
  }, [projectId, userId]);

  async function loadTeamMembers() {
    try {
      setLoading(true);
      
      let currentUserId = userId;
      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        currentUserId = user.id;
      }

      // Build query for team members
      let query = supabase
        .from('project_team')
        .select(`
          *,
          professional:professionals!professional_id (
            user_id,
            first_name,
            last_name,
            profession,
            specialization,
            rating,
            location,
            languages,
            email,
            phone,
            response_time,
            completed_projects
          ),
          project:projects!inner (
            buyer_id,
            name
          )
        `);

      if (projectId) {
        query = query.eq('project_id', projectId);
      } else {
        query = query.eq('project.buyer_id', currentUserId);
      }

      const { data: teamData, error: teamError } = await query;

      if (teamError) {
        console.error('Error loading team:', teamError);
        return;
      }

      // Get last messages for each team member
      const teamWithMessages = await Promise.all(
        (teamData || []).map(async (member) => {
          // Get last message from this professional
          const { data: messages } = await supabase
            .from('project_messages')
            .select('content, created_at, is_read')
            .eq('project_id', member.project_id)
            .eq('sender_id', member.professional.user_id)
            .order('created_at', { ascending: false })
            .limit(1);

          // Check if professional is online (last activity within 30 minutes)
          const { data: activity } = await supabase
            .from('activity_log')
            .select('created_at')
            .eq('user_id', member.professional.user_id)
            .gte('created_at', new Date(Date.now() - 30 * 60 * 1000).toISOString())
            .limit(1);

          return {
            ...member,
            professional: {
              ...member.professional,
              is_online: activity && activity.length > 0
            },
            last_message: messages?.[0] || null
          };
        })
      );

      setTeamMembers(teamWithMessages);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadSearchableProfessionals() {
    try {
      const { data: professionals, error } = await supabase
        .from('professionals')
        .select('*')
        .eq('is_verified', true)
        .neq('user_id', teamMembers.map(m => m.professional_id));

      if (error) {
        console.error('Error loading professionals:', error);
        return;
      }

      setSearchableProfessionals(professionals || []);
    } catch (error) {
      console.error('Error searching professionals:', error);
    }
  }

  async function inviteProfessional(professional: SearchableProfessional) {
    try {
      setInviting(professional.user_id);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Create inquiry
      const { data: inquiry, error: inquiryError } = await supabase
        .from('inquiries')
        .insert({
          buyer_id: user.id,
          project_id: projectId,
          professional_id: professional.user_id,
          message: `I would like to invite you to join my project team.`,
          status: 'pending'
        })
        .select()
        .single();

      if (inquiryError) {
        console.error('Error creating inquiry:', inquiryError);
        return;
      }

      // Send notification
      await supabase
        .from('notifications')
        .insert({
          user_id: professional.user_id,
          type: 'team_invitation',
          title: 'New Team Invitation',
          message: `You've been invited to join a project team`,
          related_id: inquiry.id,
          related_type: 'inquiry'
        });

      alert(`Invitation sent to ${professional.first_name} ${professional.last_name}!`);
      setShowProfessionalSearch(false);
      
      // Reload team members
      await loadTeamMembers();
    } catch (error) {
      console.error('Error inviting professional:', error);
    } finally {
      setInviting(null);
    }
  }

  async function sendMessage(memberId: string) {
    const member = teamMembers.find(m => m.id === memberId);
    if (!member) return;

    // In a real app, this would open a messaging interface
    alert(`Opening chat with ${member.professional.first_name} ${member.professional.last_name}`);
  }

  async function sendUpdate(memberId: string) {
    const member = teamMembers.find(m => m.id === memberId);
    if (!member) return;

    try {
      // Send push notification (simplified)
      await supabase
        .from('notifications')
        .insert({
          user_id: member.professional_id,
          type: 'project_update',
          title: 'Project Update',
          message: `New update on ${member.project.name}`,
          related_id: member.project_id,
          related_type: 'project'
        });

      alert(`Update sent to ${member.professional.first_name}'s mobile device!`);
    } catch (error) {
      console.error('Error sending update:', error);
    }
  }

  const filteredProfessionals = searchableProfessionals.filter(prof => {
    const matchesSearch = 
      prof.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.profession.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesExpertise = 
      selectedExpertise === 'all' || 
      prof.specialization?.some(spec => 
        spec.toLowerCase().includes(selectedExpertise.toLowerCase())
      );
    
    return matchesSearch && matchesExpertise;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 relative">
                <Briefcase className="w-6 md:w-8 h-6 md:h-8 text-blue-700" />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  member.professional.is_online ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">
                  {member.professional.first_name} {member.professional.last_name}
                </h4>
                <p className="text-xs md:text-sm text-gray-600 truncate">{member.role || member.professional.profession}</p>
                <div className="flex items-center gap-2 mt-1">
                  {member.professional.rating && (
                    <>
                      <Star className="w-3 md:w-4 h-3 md:h-4 text-yellow-500 fill-current" />
                      <span className="text-xs md:text-sm font-semibold">{member.professional.rating.toFixed(1)}</span>
                    </>
                  )}
                  <span className="text-xs text-gray-500">
                    • {member.professional.is_online ? 'online' : 'offline'}
                  </span>
                  {member.professional.completed_projects && (
                    <span className="text-xs text-gray-500">
                      • {member.professional.completed_projects} projects
                    </span>
                  )}
                </div>
              </div>
              {member.status === 'pending' && (
                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                  Pending
                </span>
              )}
            </div>
            
            {member.last_message && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 line-clamp-2">{member.last_message.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(member.last_message.created_at).toRelativeTimeString()}
                    </p>
                  </div>
                  {!member.last_message.is_read && (
                    <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1.5" />
                  )}
                </div>
              </div>
            )}

            {member.professional.specialization && member.professional.specialization.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {member.professional.specialization.slice(0, 3).map((spec, i) => (
                  <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {spec}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
              {member.professional.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {member.professional.location}
                </span>
              )}
              {member.professional.response_time && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {member.professional.response_time}
                </span>
              )}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => sendMessage(member.id)}
                className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
              <button 
                onClick={() => sendUpdate(member.id)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all font-medium text-sm flex items-center gap-1"
              >
                <Send className="w-4 h-4" />
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Professional Button */}
      <div className="text-center">
        <button
          onClick={() => {
            setShowProfessionalSearch(!showProfessionalSearch);
            if (!showProfessionalSearch) {
              loadSearchableProfessionals();
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
        >
          <UserPlus className="w-5 h-5" />
          Add Professional to Team
        </button>
      </div>

      {/* Professional Search Section */}
      {showProfessionalSearch && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
          <h3 className="text-lg font-semibold mb-4">Find & Add Professionals</h3>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or profession..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Expertise</option>
              <option value="property">Property Management</option>
              <option value="legal">Legal Services</option>
              <option value="design">Design & Architecture</option>
              <option value="construction">Construction</option>
              <option value="grant">Grants & Funding</option>
              <option value="tax">Tax & Finance</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {filteredProfessionals.map((professional) => (
              <div key={professional.user_id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-indigo-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {professional.first_name} {professional.last_name}
                    </h4>
                    <p className="text-sm text-gray-600">{professional.profession}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {professional.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {professional.response_time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{professional.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-gray-500">{professional.completed_projects} projects</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  {professional.specialization && professional.specialization.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {professional.specialization.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  {professional.languages && professional.languages.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Globe className="w-3 h-3" />
                      {professional.languages.join(', ')}
                    </div>
                  )}
                  {professional.hourly_rate && (
                    <div className="text-xs text-gray-600">
                      €{professional.hourly_rate}/hour
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium">
                    View Profile
                  </button>
                  <button 
                    onClick={() => inviteProfessional(professional)}
                    disabled={inviting === professional.user_id}
                    className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {inviting === professional.user_id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Invite
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No professionals found matching your criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to add to Date prototype for relative time
declare global {
  interface Date {
    toRelativeTimeString(): string;
  }
}

Date.prototype.toRelativeTimeString = function() {
  const seconds = Math.floor((new Date().getTime() - this.getTime()) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
};
