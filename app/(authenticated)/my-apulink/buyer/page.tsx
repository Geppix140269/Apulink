// PATH: app/(authenticated)/my-apulink/buyer/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../../lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import {
  Home,
  Search,
  FileText,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  Globe,
  MapPin,
  Calendar,
  Building,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Star,
  Filter,
  Plus,
  Bell
} from 'lucide-react'

interface BuyerProfile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  preferred_language: string
  created_at: string
}

interface Inquiry {
  id: string
  created_at: string
  status: string
  property_types: string[]
  budget_range: string
  preferred_locations: string[]
  timeline: string
  quote_count?: number
}

export default function BuyerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<BuyerProfile | null>(null)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  useEffect(() => {
    checkUser()
    loadDashboardData()
  }, [])

  async function checkUser() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }
    
    setUser(user)
    await loadProfile(user.id)
  }

  async function loadProfile(userId: string) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('buyer_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (data) {
      setProfile(data)
    }
  }

  async function loadDashboardData() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    // Load inquiries
    const { data: inquiries } = await supabase
      .from('inquiries')
      .select('*')
      .eq('buyer_id', user.id)
      .order('created_at', { ascending: false })

    if (inquiries) {
      setInquiries(inquiries)
    }

    setLoading(false)
  }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const stats = {
    activeInquiries: inquiries.filter(i => i.status === 'active').length,
    totalQuotes: inquiries.reduce((sum, i) => sum + (i.quote_count || 0), 0),
    averageResponseTime: '24 hours',
    savedProperties: 12
  }

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'inquiries', label: 'My Inquiries', icon: FileText },
    { id: 'quotes', label: 'Quotes', icon: MessageSquare },
    { id: 'properties', label: 'Saved Properties', icon: Building },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-terracotta">Apulink</h1>
              <span className="ml-3 text-sm text-gray-500">Buyer Dashboard</span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-terracotta rounded-full flex items-center justify-center text-white font-medium">
                    {profile?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {profile ? `${profile.first_name} ${profile.last_name}` : user?.email}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200">
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-terracotta/10 text-terracotta'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'inquiries' && 'My Inquiries'}
                {activeTab === 'quotes' && 'Quotes Received'}
                {activeTab === 'properties' && 'Saved Properties'}
                {activeTab === 'payments' && 'Payment History'}
                {activeTab === 'settings' && 'Account Settings'}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {profile ? profile.first_name : 'there'}!
              </p>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Inquiries</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeInquiries}</p>
                      </div>
                      <div className="bg-terracotta/10 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-terracotta" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Quotes</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalQuotes}</p>
                      </div>
                      <div className="bg-sea/10 p-3 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-sea" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.averageResponseTime}</p>
                      </div>
                      <div className="bg-olive/10 p-3 rounded-lg">
                        <Clock className="w-6 h-6 text-olive" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Saved Properties</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.savedProperties}</p>
                      </div>
                      <div className="bg-stone/10 p-3 rounded-lg">
                        <Building className="w-6 h-6 text-stone-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                  </div>
                  <div className="p-6">
                    {inquiries.length > 0 ? (
                      <div className="space-y-4">
                        {inquiries.slice(0, 5).map((inquiry) => (
                          <div key={inquiry.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div>
                              <p className="font-medium text-gray-900">
                                {inquiry.property_types.join(', ')} in {inquiry.preferred_locations.join(', ')}
                              </p>
                              <p className="text-sm text-gray-500">
                                Budget: {inquiry.budget_range} • {new Date(inquiry.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              inquiry.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {inquiry.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No inquiries yet</p>
                        <button
                          onClick={() => router.push('/buyer/inquiry')}
                          className="mt-4 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta-dark"
                        >
                          Create Your First Inquiry
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Inquiries Tab */}
            {activeTab === 'inquiries' && (
              <div>
                <div className="mb-6 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                  </div>
                  <button
                    onClick={() => router.push('/buyer/inquiry')}
                    className="flex items-center gap-2 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta-dark"
                  >
                    <Plus className="w-4 h-4" />
                    New Inquiry
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {inquiries.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="p-6 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-gray-900">
                                {inquiry.property_types.join(', ')}
                              </h3>
                              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {inquiry.preferred_locations.join(', ')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {inquiry.timeline}
                                </span>
                              </div>
                              <div className="mt-2">
                                <span className="text-sm font-medium text-gray-700">Budget: </span>
                                <span className="text-sm text-gray-600">{inquiry.budget_range}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                inquiry.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {inquiry.status}
                              </span>
                              <p className="mt-2 text-sm text-gray-500">
                                {inquiry.quote_count || 0} quotes
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">You haven't created any inquiries yet</p>
                      <button
                        onClick={() => router.push('/buyer/inquiry')}
                        className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta-dark"
                      >
                        Create Your First Inquiry
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Other tabs content */}
            {activeTab === 'quotes' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Quotes from professionals will appear here</p>
                </div>
              </div>
            )}

            {activeTab === 'properties' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                <div className="text-center">
                  <Building className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your saved properties will appear here</p>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                <div className="text-center">
                  <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your payment history will appear here</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-2xl">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>

                    {profile && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              First Name
                            </label>
                            <input
                              type="text"
                              value={profile.first_name}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={profile.last_name}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={profile.phone || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Language
                          </label>
                          <select
                            value={profile.preferred_language}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="en">English</option>
                            <option value="it">Italian</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div className="pt-4">
                      <button className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta-dark">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
