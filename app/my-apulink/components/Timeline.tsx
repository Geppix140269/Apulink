// app/my-apulink/components/Timeline.tsx
import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, CheckCircle, Circle, AlertCircle, 
  Users, ChevronDown, ChevronUp, Loader2, Check,
  PlayCircle, PauseCircle, FastForward
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Milestone {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming' | 'delayed';
  start_date: string;
  end_date: string;
  progress: number;
  responsible_parties: string[];
  tasks: {
    id: string;
    title: string;
    completed: boolean;
    assigned_to?: string;
  }[];
  dependencies?: string[];
  created_at: string;
  updated_at: string;
}

interface TimelineProps {
  projectId?: string;
  userId?: string;
}

export default function Timeline({ projectId, userId }: TimelineProps) {
  const supabase = createClientComponentClient();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    loadTimeline();
  }, [projectId, userId]);

  async function loadTimeline() {
    try {
      setLoading(true);
      
      let currentUserId = userId;
      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        currentUserId = user.id;
      }

      // Build query for milestones
      let query = supabase
        .from('project_milestones')
        .select(`
          *,
          project:projects!inner (
            buyer_id,
            name
          )
        `)
        .order('start_date', { ascending: true });

      if (projectId) {
        query = query.eq('project_id', projectId);
      } else {
        // Get milestones for all user's projects
        query = query.eq('project.buyer_id', currentUserId);
      }

      const { data: milestoneData, error: milestoneError } = await query;

      if (milestoneError) {
        console.error('Error loading milestones:', milestoneError);
        return;
      }

      // Process milestones to determine current status
      const now = new Date();
      const processedMilestones = (milestoneData || []).map(milestone => {
        const startDate = new Date(milestone.start_date);
        const endDate = new Date(milestone.end_date);
        
        // Determine status based on dates and progress
        let status: Milestone['status'] = 'upcoming';
        if (milestone.progress === 100) {
          status = 'completed';
        } else if (now > endDate) {
          status = 'delayed';
        } else if (now >= startDate && now <= endDate) {
          status = 'current';
        }

        // Parse tasks if stored as JSON
        const tasks = typeof milestone.tasks === 'string' 
          ? JSON.parse(milestone.tasks) 
          : milestone.tasks || [];

        // Parse responsible parties
        const responsibleParties = typeof milestone.responsible_parties === 'string'
          ? JSON.parse(milestone.responsible_parties)
          : milestone.responsible_parties || [];

        return {
          ...milestone,
          status,
          tasks,
          responsible_parties: responsibleParties
        };
      });

      setMilestones(processedMilestones);

      // Calculate overall progress
      const totalProgress = processedMilestones.reduce((sum, m) => sum + m.progress, 0);
      const avgProgress = processedMilestones.length > 0 
        ? Math.round(totalProgress / processedMilestones.length)
        : 0;
      setOverallProgress(avgProgress);

    } catch (error) {
      console.error('Error loading timeline:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateTaskStatus(milestoneId: string, taskId: string, completed: boolean) {
    try {
      const milestone = milestones.find(m => m.id === milestoneId);
      if (!milestone) return;

      // Update task status
      const updatedTasks = milestone.tasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      );

      // Calculate new progress
      const completedTasks = updatedTasks.filter(t => t.completed).length;
      const newProgress = Math.round((completedTasks / updatedTasks.length) * 100);

      // Update in database
      const { error } = await supabase
        .from('project_milestones')
        .update({ 
          tasks: updatedTasks,
          progress: newProgress
        })
        .eq('id', milestoneId);

      if (error) {
        console.error('Error updating task:', error);
        return;
      }

      // Update local state
      setMilestones(prev => prev.map(m => 
        m.id === milestoneId 
          ? { ...m, tasks: updatedTasks, progress: newProgress }
          : m
      ));

    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }

  function getStatusIcon(status: Milestone['status']) {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'current':
        return <Clock className="w-6 h-6 text-blue-600 animate-pulse" />;
      case 'delayed':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  }

  function getStatusColor(status: Milestone['status']) {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'current':
        return 'border-blue-200 bg-blue-50';
      case 'delayed':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200';
    }
  }

  function getProgressColor(status: Milestone['status']) {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-blue-500';
      case 'delayed':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  }

  function calculateDuration(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days < 7) return `${days} days`;
    if (days < 30) return `${Math.ceil(days / 7)} weeks`;
    return `${Math.ceil(days / 30)} months`;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (milestones.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Timeline Created</h3>
        <p className="text-gray-500">Project milestones will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Overall Project Progress</h3>
          <span className="text-2xl font-bold text-blue-700">{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">
              {milestones.filter(m => m.status === 'completed').length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {milestones.filter(m => m.status === 'current').length}
            </p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">
              {milestones.filter(m => m.status === 'upcoming').length}
            </p>
            <p className="text-sm text-gray-600">Upcoming</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">
              {milestones.filter(m => m.status === 'delayed').length}
            </p>
            <p className="text-sm text-gray-600">Delayed</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="relative">
            {/* Connection Line */}
            {index < milestones.length - 1 && (
              <div className={`absolute left-6 top-12 bottom-0 w-0.5 ${
                milestone.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
              }`} />
            )}
            
            {/* Milestone Card */}
            <div className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 ${getStatusColor(milestone.status)}`}>
              {/* Status Icon */}
              <div className={`absolute -left-3 top-8 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg`}>
                {getStatusIcon(milestone.status)}
              </div>
              
              <div className="ml-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{milestone.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(milestone.start_date).toLocaleDateString()} - 
                      {new Date(milestone.end_date).toLocaleDateString()} • 
                      {calculateDuration(milestone.start_date, milestone.end_date)}
                    </p>
                    {milestone.description && (
                      <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    milestone.status === 'completed' ? 'bg-green-100 text-green-700' :
                    milestone.status === 'current' ? 'bg-blue-100 text-blue-700' :
                    milestone.status === 'delayed' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {milestone.status === 'current' ? 'in progress' : milestone.status}
                  </span>
                </div>
                
                {/* Responsible Parties */}
                {milestone.responsible_parties.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {milestone.responsible_parties.map((person, i) => (
                      <span key={i} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {person}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{milestone.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(milestone.status)}`}
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>
                
                {/* Tasks (Expandable) */}
                {milestone.tasks.length > 0 && (
                  <div>
                    <button
                      onClick={() => setExpandedMilestone(
                        expandedMilestone === milestone.id ? null : milestone.id
                      )}
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {expandedMilestone === milestone.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                      View Tasks ({milestone.tasks.filter(t => t.completed).length}/{milestone.tasks.length})
                    </button>
                    
                    {expandedMilestone === milestone.id && (
                      <div className="mt-3 space-y-2 pl-6">
                        {milestone.tasks.map((task) => (
                          <div key={task.id} className="flex items-center gap-3">
                            <button
                              onClick={() => updateTaskStatus(milestone.id, task.id, !task.completed)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                task.completed 
                                  ? 'bg-blue-500 border-blue-500' 
                                  : 'border-gray-300 hover:border-blue-400'
                              }`}
                              disabled={milestone.status === 'completed'}
                            >
                              {task.completed && <Check className="w-3 h-3 text-white" />}
                            </button>
                            <span className={`text-sm ${
                              task.completed ? 'line-through text-gray-500' : 'text-gray-700'
                            }`}>
                              {task.title}
                            </span>
                            {task.assigned_to && (
                              <span className="text-xs text-gray-500">
                                ({task.assigned_to})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Delayed Warning */}
                {milestone.status === 'delayed' && (
                  <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-900">Milestone Delayed</p>
                      <p className="text-sm text-red-700">
                        This milestone is {Math.ceil((new Date().getTime() - new Date(milestone.end_date).getTime()) / (1000 * 60 * 60 * 24))} days overdue
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Legend */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Timeline Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-4 h-4 text-gray-400" />
            <span>Upcoming</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>Delayed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
