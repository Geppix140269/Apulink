// app/admin/page.tsx
// Admin dashboard page with overview, professionals, inquiries, and financials tabs

'use client';

import React, { useState } from 'react';
import { Calendar, Users, Euro, TrendingUp, AlertCircle, CheckCircle, Clock, Search, LucideIcon } from 'lucide-react';
import type { Metadata, Viewport } from 'next'

// Export metadata separately
export const metadata: Metadata = {
  title: 'Admin Dashboard - Apulink',
  description: 'Manage professionals, inquiries, and financials'
}

// Export viewport separately
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#9333ea'
}

// TypeScript interfaces
interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color: string;
}

interface Professional {
  id: number;
  name: string;
  email: string;
  profession: string;
  location: string;
  subscription: 'Free' | 'Starter' | 'Professional';
  inquiries: number;
}

interface ProfessionalRowProps {
  professional: Professional;
}

interface Activity {
  id: number;
  type: 'new_user' | 'new_inquiry' | 'subscription' | 'match';
  name?: string;
  profession?: string;
  buyer?: string;
  location?: string;
  plan?: string;
  professional?: string;
  inquiry?: string;
  time: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'professionals' | 'inquiries' | 'financials'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with real API calls
  const stats = {
    totalUsers: 324,
    activeSubscriptions: 87,
    monthlyRevenue: 4263,
    pendingInquiries: 12,
    conversionRate: 26.8,
    averageResponseTime: '4.2 hours'
  };

  const recentActivity: Activity[] = [
    { id: 1, type: 'new_user', name: 'Giuseppe Rossi', profession: 'Architect', time: '10 minutes ago' },
    { id: 2, type: 'new_inquiry', buyer: 'John Smith', location: 'Bari', time: '1 hour ago' },
    { id: 3, type: 'subscription', name: 'Maria Bianchi', plan: 'Professional', time: '2 hours ago' },
    { id: 4, type: 'match', professional: 'Luigi Verdi', inquiry: 'RFP-2024-001', time: '3 hours ago' }
  ];

  const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <p className={`text-sm mt-2 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ProfessionalRow: React.FC<ProfessionalRowProps> = ({ professional }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900">{professional.name}</div>
            <div className="text-sm text-gray-500">{professional.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {professional.profession}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {professional.location}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          professional.subscription === 'Free' ? 'bg-gray-100 text-gray-800' : 
          professional.subscription === 'Starter' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {professional.subscription}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {professional.inquiries} inquiries
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900">View</button>
      </td>
    </tr>
  );

  // Mock professionals data
  const professionals: Professional[] = [
    { id: 1, name: 'Giuseppe Rossi', email: 'g.rossi@example.com', profession: 'Surveyor', location: 'Bari', subscription: 'Professional', inquiries: 23 },
    { id: 2, name: 'Maria Bianchi', email: 'm.bianchi@example.com', profession: 'Architect', location: 'Lecce', subscription: 'Starter', inquiries: 8 },
    { id: 3, name: 'Luigi Verdi', email: 'l.verdi@example.com', profession: 'Engineer', location: 'Brindisi', subscription: 'Free', inquiries: 2 },
    { id: 4, name: 'Anna Romano', email: 'a.romano@example.com', profession: 'Notary', location: 'Taranto', subscription: 'Professional', inquiries: 15 }
  ];

  const tabs: Array<'overview' | 'professionals' | 'inquiries' | 'financials'> = ['overview', 'professionals', 'inquiries', 'financials'];

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                change={12}
                icon={Users}
                color="bg-blue-500"
              />
              <StatCard
                title="Active Subscriptions"
                value={stats.activeSubscriptions}
                change={8}
                icon={CheckCircle}
                color="bg-green-500"
              />
              <StatCard
                title="Monthly Revenue"
                value={`€${stats.monthlyRevenue}`}
                change={23}
                icon={Euro}
                color="bg-purple-500"
              />
              <StatCard
                title="Pending Inquiries"
                value={stats.pendingInquiries}
                icon={Clock}
                color="bg-yellow-500"
              />
              <StatCard
                title="Conversion Rate"
                value={`${stats.conversionRate}%`}
                change={3}
                icon={TrendingUp}
                color="bg-indigo-500"
              />
              <StatCard
                title="Avg Response Time"
                value={stats.averageResponseTime}
                icon={AlertCircle}
                color="bg-orange-500"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        activity.type === 'new_user' ? 'bg-blue-500' :
                        activity.type === 'new_inquiry' ? 'bg-green-500' :
                        activity.type === 'subscription' ? 'bg-purple-500' :
                        'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="text-sm text-gray-900">
                          {activity.type === 'new_user' && `New professional: ${activity.name} (${activity.profession})`}
                          {activity.type === 'new_inquiry' && `New inquiry from ${activity.buyer} in ${activity.location}`}
                          {activity.type === 'subscription' && `${activity.name} upgraded to ${activity.plan}`}
                          {activity.type === 'match' && `${activity.professional} matched with ${activity.inquiry}`}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'professionals' && (
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search professionals..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <button className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Export CSV
              </button>
            </div>

            {/* Professionals Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Professional
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {professionals
                    .filter(p => 
                      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      p.email.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((professional) => (
                      <ProfessionalRow key={professional.id} professional={professional} />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Inquiries</h2>
            <p className="text-gray-500">Inquiry management coming soon...</p>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Financial Overview</h2>
            <p className="text-gray-500">Revenue analytics coming soon...</p>
          </div>
        )}
      </main>
    </>
  );
};

export default AdminDashboard;
