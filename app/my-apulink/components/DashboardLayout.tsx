// app/my-apulink/components/DashboardLayout.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, FileText, Euro, Users, Calendar, MessageSquare, 
  Calculator, Bell, Settings, LogOut, ChevronRight,
  Building2, Menu, X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
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
    loadCounts();
    subscribeToUpdates();
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
      const { count: docCount } = await supabase
        .from('documents')
        .select('*, projects!inner(buyer_id)', { count: 'exact', head: true })
        .eq('projects.buyer_id', user.id);

      setDocumentCount(docCount || 0);
    } catch (error) {
      console.error('Error loading counts:', error);
    }
  }

  function subscribeToUpdates() {
    if (!u
