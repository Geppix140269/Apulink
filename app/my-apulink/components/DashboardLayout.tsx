// app/my-apulink/components/DashboardLayout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building2, FileText, Users, Calendar, DollarSign, Calculator, Search, MessageSquare, Settings, Bell, LogOut, Menu, X } from 'lucide-react';

// TEMPORARILY COMMENTED OUT FOR TESTING
// import { useAuth } from '../../../contexts/AuthContext'; // Fixed path - go up 3 levels

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onNotificationClick: () => void;
}

export default function DashboardLayout({
  children,
  activeSection,
  onSectionChange,
  onNotificationClick
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  // TEMPORARILY HARDCODED FOR TESTING
  // const { user, signOut } = useAuth();
  const user = { email: 'test@apulink.com', id: 'test-user-123' };
  const signOut = async () => {
    console.log('Sign out clicked - auth bypassed for testing');
    window.location.href = '/';
  };

  const navigation = [
    { name: 'Overview', icon: Home, id: 'overview' },
    { name: 'Properties', icon: Building2, id: 'properties' },
    { name: 'Documents', icon: FileText, id: 'documents' },
    { name: 'Team', icon: Users, id: 'team' },
    { name: 'Timeline', icon: Calendar, id: 'timeline' },
    { name: 'Budget', icon: DollarSign, id: 'budget' },
    { name: 'Grants', icon: Calculator, id: 'grants' },
    { name: 'Find Professionals', icon: Search, id: 'professionals' },
    { name: 'Messages', icon: MessageSquare, id: 'messages' },
    { name: 'Settings', icon: Settings, id: 'settings' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-md"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h1 className="text-2xl font-bold text-white">Apulink</h1>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
            <p className="text-xs text-gray-500">Buyer Account</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <h2 className="text-xl font-semibold text-gray-900 ml-12 lg:ml-0">
              {navigation.find(item => item.id === activeSection)?.name || 'Dashboard'}
            </h2>
            
            <button
              onClick={onNotificationClick}
              className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}