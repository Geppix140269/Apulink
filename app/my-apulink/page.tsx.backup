// PATH: app/my-apulink/page.tsx

'use client';

export const dynamic = 'force-dynamic';
// export const runtime = 'nodejs'; // REMOVED - causing client/server mismatch

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase/config';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Calculator, Upload, MessageSquare, ArrowUpRight, Loader2, X } from 'lucide-react';

interface Activity {
  type: string;
  title: string;
  description: string;
  time: any;
  icon: string;
}

export default function MyApulinkDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGrantCalculator, setShowGrantCalculator] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  
  const supabase = createClientComponentClient();

  // Firebase Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Convert Firebase user to format components expect
        setUser({
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          user_metadata: {
            full_name: firebaseUser.displayName || firebaseUser.email
          }
        });
        setAuthLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Load user data from Supabase
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  // Load recent activity
  useEffect(() => {
    if (user && activeSection === 'overview') {
      loadRecentActivity();
    }
  }, [user, activeSection]);

  async function loadUserData() {
    if (!user) return;

    try {
      // Load projects from Supabase
      const { data: projectData, error: projError } = await supabase
        .from('projects')
        .select('*')
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false });

      if (!projError && projectData) {
        setProjects(projectData);
      }

      // Load notifications from Supabase
      const { data: notifData, error: notifError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_read', false)
        .order('created_at', { ascending: false });

      if (!notifError && notifData) {
        setNotifications(notifData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  async function loadRecentActivity() {
    try {
      setLoadingActivity(true);

      // Get recent notifications
      const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      // Get recent project updates
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('buyer_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(3);

      // Combine into activity
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
            title: `Project: ${p.name || 'Unnamed'}`,
            description: `Progress: ${p.progress || 0}%`,
            time: p.updated_at,
            icon: 'project'
          });
        });
      }

      // Sort by time
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

  function getRelativeTime(timestamp: any): string {
    if (!timestamp) return 'recently';
    
    const date = new Date(timestamp);
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
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  }

  // Handle grant calculation
  const handleGrantCalculation = (calculation: any) => {
    console.log('Grant calculation:', calculation);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Import components
  const DashboardLayout = require('./components/DashboardLayout').default;
  const DashboardMetrics = require('./components/DashboardMetrics').default;
  const ProjectList = require('./components/ProjectList').default;
  const DocumentVault = require('./components/DocumentVault').default;
  const Timeline = require('./components/Timeline').default;
  const BudgetPlanner = require('./components/BudgetPlanner').default;
  const GrantCalculator = require('./components/GrantCalculator').default;
  const NotificationCenter = require('./components/NotificationCenter').default;

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onNotificationClick={() => setShowNotifications(true)}
    >
      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user.email}!
            </h2>
            <p className="opacity-90">
              You have {projects.length} active projects and {notifications.length} new notifications
            </p>
          </div>

          {/* Key Metrics */}
          <DashboardMetrics userId={user.id} />

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => setShowGrantCalculator(true)}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <Calculator className="w-8 h-8 text-blue-600" />
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Grant Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your PIA Tourism grant instantly</p>
            </button>

            <button 
              onClick={() => setActiveSection('documents')}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <Upload className="w-8 h-8 text-green-600" />
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Upload Documents</h3>
              <p className="text-sm text-gray-600">Securely store and manage your files</p>
            </button>

            <button 
              onClick={() => window.open('https://apulink.com/chat', '_blank')}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <MessageSquare className="w-8 h-8 text-purple-600" />
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ask Trullo AI</h3>
              <p className="text-sm text-gray-600">Get instant answers about Puglia properties</p>
            </button>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              {loadingActivity ? (
                <div className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
                </div>
              ) : recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{getRelativeTime(activity.time)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No recent activity</p>
              )}
            </div>

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
        </div>
      )}

      {/* Properties Section */}
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
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Team Collaboration
            </h3>
            <p className="text-gray-600">Connect with your architects, surveyors, and other professionals here.</p>
          </div>
        </div>
      )}

      {/* Grants Section */}
      {activeSection === 'grants' && (
        <div className="max-w-7xl mx-auto">
          <GrantCalculator 
            projectId={selectedProjectId}
            onCalculation={handleGrantCalculation}
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
      {showGrantCalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowGrantCalculator(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-6">
              <GrantCalculator 
                projectId={selectedProjectId}
                onCalculation={handleGrantCalculation}
              />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
