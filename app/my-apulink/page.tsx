// PATH: app/my-apulink/page.tsx

'use client';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';  // FIXED: Using relative path
import firebase from '../../lib/firebase/firebase-service';  // FIXED: Using relative path
import DashboardLayout from './components/DashboardLayout';
import PropertyOverview from './components/PropertyOverview';
import RecentInquiries from './components/RecentInquiries';
import ActiveProjects from './components/ActiveProjects';
import MarketInsights from './components/MarketInsights';
import DocumentCenter from './components/DocumentCenter';
import FinancialSummary from './components/FinancialSummary';
import TeamMembers from './components/TeamMembers';
import UpcomingTasks from './components/UpcomingTasks';
import NotificationCenter from './components/NotificationCenter';

export default function MyApulinkDashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [dashboardData, setDashboardData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function loadDashboardData() {
      if (user) {
        try {
          // Load user's projects
          const projectsResult = await firebase.projects.getProjectsByUser(user.uid);
          
          // Load user's inquiries
          const inquiriesResult = await firebase.inquiries.getInquiries({ userId: user.uid });
          
          // Load notifications
          const notificationsResult = await firebase.notifications.getUserNotifications(user.uid);
          
          setDashboardData({
            projects: projectsResult.data || [],
            inquiries: inquiriesResult.data || [],
            notifications: notificationsResult.data || []
          });
        } catch (error) {
          console.error('Error loading dashboard data:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    loadDashboardData();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <PropertyOverview />
            <RecentInquiries inquiries={dashboardData.inquiries} />
            <ActiveProjects projects={dashboardData.projects} />
            <MarketInsights />
            <FinancialSummary />
            <NotificationCenter notifications={dashboardData.notifications} />
          </div>
        );
      case 'properties':
        return <PropertyOverview />;
      case 'inquiries':
        return <RecentInquiries inquiries={dashboardData.inquiries} />;
      case 'projects':
        return <ActiveProjects projects={dashboardData.projects} />;
      case 'documents':
        return <DocumentCenter />;
      case 'financials':
        return <FinancialSummary />;
      case 'team':
        return <TeamMembers />;
      case 'tasks':
        return <UpcomingTasks />;
      case 'market':
        return <MarketInsights />;
      case 'notifications':
        return <NotificationCenter notifications={dashboardData.notifications} />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Section not found</h3>
            <p className="mt-2 text-sm text-gray-500">Please select a valid section from the menu.</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.email}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Here's what's happening with your investments today.
          </p>
        </div>

        {renderContent()}
      </div>
    </DashboardLayout>
  );
}
