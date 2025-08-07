// Path: app/my-apulink/components/DashboardLayout.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, FileText, Euro, Users, Calendar, MessageSquare, 
  Calculator, Bell, Settings, LogOut, ChevronRight,
  Building2, Menu, X
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onNotificationClick: () => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
}

export default function DashboardLayout({ 
  children, 
  activeSection, 
  onSectionChange,
  onNotificationClick 
}: DashboardLayoutProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  
  const supabase = createClientComponentClient();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);

  // If no user, show loading
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const sidebarItems: SidebarItem[] = [
    { id: 'overview', label: 'My Command Center', icon: Home },
    { id: 'properties', label: 'Active Projects', icon: Building2, badge: projectCount || undefined },
    { id: 'documents', label: 'Document Vault', icon: FileText, badge: documentCount || undefined },
    { id: 'timeline', label: 'Project Timeline', icon: Calendar },
    { id: 'budget', label: 'Financial Planning', icon: Euro },
    { id: 'team', label: 'My Expert Team', icon: Users },
    { id: 'grants', label: 'Grant Optimizer', icon: Calculator },
  ];

  useEffect(() => {
    if (user) {
      loadCounts();
      const unsubscribe = subscribeToUpdates();
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [user]);

  async function loadCounts() {
    if (!user) return;

    try {
      // Get unread notifications count
      const { count: notifCount } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_read', false)
        .eq('is_archived', false);

      setUnreadCount(notifCount || 0);

      // Get active projects count
      const { count: projCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('buyer_id', user.id)
        .eq('is_active', true);

      setProjectCount(projCount || 0);

      // Get documents count
      const { data: projects } = await supabase
        .from('projects')
        .select('id')
        .eq('buyer_id', user.id);

      if (projects && projects.length > 0) {
        const projectIds = projects.map(p => p.id);
        const { count: docCount } = await supabase
          .from('documents')
          .select('*', { count: 'exact', head: true })
          .in('project_id', projectIds);

        setDocumentCount(docCount || 0);
      }
    } catch (error) {
      console.error('Error loading counts:', error);
    }
  }

  function subscribeToUpdates() {
    if (!user) return;

    const channel = supabase
      .channel('dashboard-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          loadCounts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || user?.email || 'User';
  };

  const getUserInitial = () => {
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/80 backdrop-blur-xl rounded-lg shadow-lg"
      >
        {showMobileSidebar ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {showMobileSidebar && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative w-72 h-full bg-white/80 backdrop-blur-xl border-r border-blue-100 flex flex-col transition-transform duration-300 z-40`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MyApulink
            </h1>
          </div>
          <p className="text-sm text-gray-600">Investment Command Center</p>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                setShowMobileSidebar(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-lg'
                  : 'text-gray-600 hover:bg-purple-50/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-blue-100">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {getUserInitial()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{getUserDisplayName()}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Active Projects</span>
              <span className="font-semibold text-purple-700">{projectCount}</span>
            </div>
            <div className="mt-2 w-full bg-purple-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((projectCount / 5) * 100, 100)}%` }}
              />
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button 
              onClick={onNotificationClick}
              className="relative flex-1 p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
            >
              <Bell className="w-5 h-5 mx-auto" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>
            <button 
              onClick={() => onSectionChange('settings')}
              className="flex-1 p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
            >
              <Settings className="w-5 h-5 mx-auto" />
            </button>
            <button 
              onClick={handleSignOut}
              className="flex-1 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col w-full">
        {/* Top Bar */}
        <div className="bg-white/70 backdrop-blur-lg border-b border-blue-100 px-4 md:px-8 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent pl-12 lg:pl-0">
              {activeSection === 'overview' && `Welcome back! You have ${projectCount} active projects`}
              {activeSection === 'properties' && 'Your Property Projects'}
              {activeSection === 'documents' && 'Document Vault'}
              {activeSection === 'timeline' && 'Timeline & Milestones'}
              {activeSection === 'budget' && 'Financial Planning'}
              {activeSection === 'team' && 'Your Expert Team'}
              {activeSection === 'grants' && 'Grant Calculator'}
              {activeSection === 'settings' && 'Account Settings'}
            </h2>
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <button 
                onClick={() => window.open('https://apulink.com/help', '_blank')}
                className="hidden md:flex px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-lg transition-all items-center gap-2 font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                Ask Trullo
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-20">
          {children}
        </div>
      </div>

      {/* Trullo Floating Bubble */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => window.open('https://apulink.com/chat', '_blank')}
          className="group relative w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-ping opacity-20" />
          <MessageSquare className="w-7 h-7 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <span className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask Trullo anything!
          </span>
        </button>
      </div>
    </div>
  );
}