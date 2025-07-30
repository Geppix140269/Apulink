// Path: app/my-apulink/page.tsx
// Fixed modular dashboard - NO STATIC GENERATION
'use client';

// CRITICAL: Force dynamic rendering to prevent build errors
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Import icons for quick actions
import { Calculator, Upload, MessageSquare, ArrowUpRight, Loader2, X } from 'lucide-react';

// Define types for better TypeScript support
interface Activity {
  type: string;
  title: string;
  description: string;
  time: string;
  icon: string;
}

// Define types for components (since we don't have access to the actual component types)
interface GrantCalculation {
  totalCost?: number;
  grantAmount?: number;
  grantPercentage?: number;
  eligibleCosts?: number;
  [key: string]: any; // Allow for additional properties
}

export default function MyApulinkDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGrantCalculator, setShowGrantCalculator] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const supabase = createClientComponentClient();

  // Check if we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle auth on client side only
  useEffect(() => {
    if (isClient) {
      try {
        const { useAuth } = require('../../contexts/AuthContext');
        const auth = useAuth();
        setUser(auth.user);
        setAuthLoading(auth.loading);
        
        if (!auth.loading && !auth.user) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth error:', error);
        router.push('/login');
      }
    }
  }, [isClient, router]);

  // Load recent activity for overview
  useEffect(() => {
    if (user && activeSection === 'overview') {
      loadRecentActivity();
    }
  }, [user, activeSection]);

  async function loadRecentActivity() {
    if (!user) return;
    
    try {
      setLoadingActivity(true);
      
      // Get recent notifications
      const { data: notifications, error: notifError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (notifError) {
        console.error('Error loading notifications:', notifError);
      }

      // Get recent project updates
      const { data: projects, error: projError } = await supabase
        .from('projects')
        .select(`
          *,
          project_milestones (*)
        `)
        .eq('buyer_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(3);

      if (projError) {
        console.error('Error loading projects:', projError);
      }

      // Combine and format activity
      const activity: Activity[] = [];
      
      if (notifications) {
        notifications.forEach((n: any) => {
          activity.push({
            type: 'notification',
            title: n.title || 'New notification',
            description: n.message || '',
            time: n.created_at,
            icon: n.type || 'bell'
          });
        });
      }
      
      if (projects) {
        projects.forEach((p: any) => {
          activity.push({
            type: 'project',
            title: `Project update: ${p.name || 'Unnamed'}`,
            description: `Progress: ${p.progress || 0}%`,
            time: p.updated_at,
            icon: 'project'
          });
        });
      }
      
      // Sort by time and limit to 5
      const sortedActivity = activity
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 5);

      setRecentActivity(sortedActivity);
    } catch (error) {
      console.error('Error loading activity:', error);
    } finally {
      setLoadingActivity(false);
    }
  }

  // Helper function for relative time
  function getRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
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
  }

  // Show loading state
  if (!isClient || authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show not authenticated state
  if (!user) {
    return null; // Will redirect in useEffect
  }

  // Dynamically import components to avoid build issues
  const DashboardLayout = require('./components/DashboardLayout').default;
  const DashboardMetrics = require('./components/DashboardMetrics').default;
  const ProjectList = require('./components/ProjectList').default;
  const DocumentVault = require('./components/DocumentVault').default;
  const Timeline = require('./components/Timeline').default;
  const BudgetPlanner = require('./components/BudgetPlanner').default;
  const GrantCalculator = require('./components/GrantCalculator').default;
  const NotificationCenter = require('./components/NotificationCenter').default;

  // Render dashboard
  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={(section: string) => setActiveSection(section)}
      onNotificationClick={() => setShowNotifications(true)}
    >
      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <DashboardMetrics userId={user.id} />

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => setShowGrantCalculator(true)}
              className="p-4 md:p-6 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-2xl border border-blue-200 hover:shadow-lg transition-all text-left group"
            >
              <Calculator className="w-5 md:w-6 h-5 md:h-6 text-blue-600 mb-2 md:mb-3" />
              <h4 className="font-semibold text-gray-900 text-sm md:text-base">Calculate My Grant</h4>
              <p className="text-xs md:text-sm text-gray-600">Instant 45% calculation</p>
              <ArrowUpRight className="w-4 h-4 text-blue-600 mt-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => setActiveSection('documents')}
              className="p-4 md:p-6 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-2xl border border-green-200 hover:shadow-lg transition-all text-left group"
            >
              <Upload className="w-5 md:w-6 h-5 md:h-6 text-green-600 mb-2 md:mb-3" />
              <h4 className="font-semibold text-gray-900 text-sm md:text-base">Upload Documents</h4>
              <p className="text-xs md:text-sm text-gray-600">Secure vault storage</p>
              <ArrowUpRight className="w-4 h-4 text-green-600 mt-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => setActiveSection('team')}
              className="p-4 md:p-6 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-2xl border border-indigo-200 hover:shadow-lg transition-all text-left group"
            >
              <MessageSquare className="w-5 md:w-6 h-5 md:h-6 text-indigo-600 mb-2 md:mb-3" />
              <h4 className="font-semibold text-gray-900 text-sm md:text-base">Message Team</h4>
              <p className="text-xs md:text-sm text-gray-600">Connect with experts</p>
              <ArrowUpRight className="w-4 h-4 text-indigo-600 mt-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Recent Activity
            </h3>
            {loadingActivity ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              </div>
            ) : recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                      <p className="text-xs text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {getRelativeTime(activity.time)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No recent activity</p>
            )}
          </div>

          {/* Project Summary Cards */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Projects</h3>
            <ProjectList 
              userId={user.id} 
              onProjectClick={(projectId: string) => {
                setSelectedProjectId(projectId);
                setActiveSection('properties');
              }}
            />
          </div>
        </div>
      )}

      {/* Properties/Projects Section */}
      {activeSection === 'properties' && (
        <div className="max-w-7xl mx-auto">
          <ProjectList 
            userId={user.id}
            onProjectClick={(projectId: string) => {
              setSelectedProjectId(projectId);
            }}
          />
        </div>
      )}

      {/* Documents Section */}
      {activeSection === 'documents' && (
        <div className="max-w-7xl mx-auto">
          <DocumentVault 
            projectId={selectedProjectId}
            userId={user.id}
          />
        </div>
      )}

      {/* Timeline Section */}
      {activeSection === 'timeline' && (
        <div className="max-w-7xl mx-auto">
          <Timeline 
            projectId={selectedProjectId}
            userId={user.id}
          />
        </div>
      )}

      {/* Budget Section */}
      {activeSection === 'budget' && (
        <div className="max-w-7xl mx-auto">
          <BudgetPlanner 
            projectId={selectedProjectId}
            userId={user.id}
          />
        </div>
      )}

      {/* Team Section */}
      {activeSection === 'team' && (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Team Collaboration
            </h3>
            <p className="text-gray-600">Team collaboration features coming soon. Connect with your architects, surveyors, and other professionals here.</p>
          </div>
        </div>
      )}

      {/* Grants Section */}
      {activeSection === 'grants' && (
        <div className="max-w-7xl mx-auto">
          <GrantCalculator 
            projectId={selectedProjectId}
            onCalculation={(calculation: GrantCalculation) => {
              console.log('Grant calculated:', calculation);
            }}
          />
        </div>
      )}

      {/* Notification Center Modal */}
      <NotificationCenter 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        userId={user.id}
      />

      {/* Grant Calculator Modal */}
      {showGrantCalculator && activeSection !== 'grants' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold">Quick Grant Calculator</h3>
              <button 
                onClick={() => setShowGrantCalculator(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <GrantCalculator 
                projectId={selectedProjectId}
                onCalculation={(calculation: GrantCalculation) => {
                  console.log('Grant calculated:', calculation);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
