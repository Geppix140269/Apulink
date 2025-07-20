// Path: app/my-apulink/page.tsx
// Description: Main MyApulink dashboard - the control center for property investment projects
// This is the authenticated user space with team collaboration, document management, and project tracking

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, FileText, Euro, Users, Calendar, MessageSquare, 
  TrendingUp, Shield, Upload, Clock, CheckCircle, AlertCircle,
  BarChart3, FolderOpen, Bell, Settings, LogOut, ChevronRight,
  MapPin, Building2, Briefcase, Star, ArrowUpRight, Download,
  Calculator, FileSearch, Globe, Zap, Info, Video, Phone,
  Filter, Search, Eye, Lock, X, HelpCircle, UserPlus, Send,
  CheckCheck, Check, Loader2, PlusCircle, Mail
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const MyApulinkDashboard = () => {
  // Define types first, before any state declarations
  type BudgetScenarioType = 'realistic' | 'optimistic' | 'conservative';
  
  // Then declare your states
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showGrantCalculator, setShowGrantCalculator] = useState(false);
  const [grantAmount, setGrantAmount] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [budgetScenario, setBudgetScenario] = useState<'realistic' | 'optimistic' | 'conservative'>('realistic');
  const [selectedDocCategory, setSelectedDocCategory] = useState('all');
  const [showProfessionalSearch, setShowProfessionalSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [notifications, setNotifications] = useState<{
  id: number;
  type: string;
  from: string;
  content: string;
  time: string;
  read: boolean;
  status: string;
}[]>([]);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  // Enhanced sidebar with notification badge
  const sidebarItems = [
    { id: 'overview', label: 'My Command Center', icon: Home },
    { id: 'properties', label: 'Active Projects', icon: Building2, badge: '2' },
    { id: 'documents', label: 'Document Vault', icon: FileText, badge: '12' },
    { id: 'timeline', label: 'Project Timeline', icon: Calendar },
    { id: 'budget', label: 'Financial Planning', icon: Euro },
    { id: 'team', label: 'My Expert Team', icon: Users, badge: 'New' },
    { id: 'grants', label: 'Grant Optimizer', icon: Calculator },
  ];

  // Rich mock data for active projects
  const properties = [
    {
      id: 1,
      name: 'Villa Rossi - Lecce Historic Center',
      price: '€450,000',
      grantEligible: '€202,500',
      roi: '28%',
      status: 'under-review',
      score: 92,
      highlights: ['Prime location', 'Historical value', 'Grant approved'],
      progress: 65,
      nextMilestone: 'Legal review completion',
      daysToMilestone: 3,
      teamActivity: 'Elena reviewing contracts'
    },
    {
      id: 2,
      name: 'Masseria del Sol - Ostuni',
      price: '€850,000',
      grantEligible: '€382,500',
      roi: '34%',
      status: 'shortlisted',
      score: 88,
      highlights: ['Large land', 'Tourist area', 'Pool included'],
      progress: 35,
      nextMilestone: 'Site inspection',
      daysToMilestone: 7,
      teamActivity: 'Giuseppe preparing analysis'
    },
    {
      id: 3,
      name: 'Seaside Apartment - Gallipoli',
      price: '€320,000',
      grantEligible: '€144,000',
      roi: '42%',
      status: 'new',
      score: 85,
      highlights: ['Sea view', 'High rental yield', 'Low maintenance'],
      progress: 15,
      nextMilestone: 'Initial assessment',
      daysToMilestone: 2,
      teamActivity: 'Marco scheduling viewing'
    },
  ];

  // Enhanced team members with messaging capabilities
  const teamMembers = [
    { 
      name: 'Marco Rossi', 
      role: 'Real Estate Expert', 
      rating: 4.9, 
      status: 'online',
      expertise: ['Lecce specialist', '15 years experience'],
      lastMessage: 'Found 3 new properties matching your criteria',
      lastMessageTime: '10 min ago',
      unread: 2
    },
    { 
      name: 'Elena Bianchi', 
      role: 'Legal Advisor', 
      rating: 5.0, 
      status: 'online',
      expertise: ['International law', 'Grant applications'],
      lastMessage: 'Contract review completed - all clear!',
      lastMessageTime: '1 hour ago',
      unread: 0
    },
    { 
      name: 'Giuseppe Conti', 
      role: 'Architect', 
      rating: 4.8, 
      status: 'busy',
      expertise: ['Historic preservation', 'Cost optimization'],
      lastMessage: 'Renovation plans ready for review',
      lastMessageTime: '3 hours ago',
      unread: 1
    },
    {
      name: 'Sofia Romano',
      role: 'Tax Strategist',
      rating: 4.9,
      status: 'online',
      expertise: ['International tax', 'ROI optimization'],
      lastMessage: 'New tax incentive available - €45K savings!',
      lastMessageTime: '2 hours ago',
      unread: 1
    }
  ];

  // Professional search results
  const searchableProfessionals = [
    {
      name: 'Alessandro Martini',
      role: 'Property Manager',
      rating: 4.8,
      location: 'Bari',
      expertise: ['Vacation rentals', 'Property maintenance'],
      projectsCompleted: 47,
      responseTime: '< 1 hour',
      languages: ['Italian', 'English', 'French']
    },
    {
      name: 'Francesca Colombo',
      role: 'Interior Designer',
      rating: 4.9,
      location: 'Lecce',
      expertise: ['Luxury properties', 'Historic renovations'],
      projectsCompleted: 62,
      responseTime: '< 2 hours',
      languages: ['Italian', 'English']
    },
    {
      name: 'Roberto Esposito',
      role: 'Construction Manager',
      rating: 4.7,
      location: 'Brindisi',
      expertise: ['Full renovations', 'Project management'],
      projectsCompleted: 89,
      responseTime: '< 30 min',
      languages: ['Italian', 'English', 'German']
    },
    {
      name: 'Laura Bianchi',
      role: 'Grant Specialist',
      rating: 5.0,
      location: 'Remote',
      expertise: ['PIA applications', 'EU funding'],
      projectsCompleted: 156,
      responseTime: '< 1 hour',
      languages: ['Italian', 'English', 'Spanish']
    }
  ];

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      type: 'message',
      from: 'Elena Bianchi',
      content: 'Contract review completed - all clear!',
      time: '1 hour ago',
      read: false,
      status: 'delivered'
    },
    {
      id: 2,
      type: 'update',
      from: 'System',
      content: 'Villa Rossi property status updated to "Under Review"',
      time: '2 hours ago',
      read: false,
      status: 'delivered'
    },
    {
      id: 3,
      type: 'milestone',
      from: 'Marco Rossi',
      content: 'New milestone achieved: Due diligence completed',
      time: '3 hours ago',
      read: true,
      status: 'read'
    },
    {
      id: 4,
      type: 'alert',
      from: 'Sofia Romano',
      content: 'Action required: Tax filing deadline in 7 days',
      time: '5 hours ago',
      read: true,
      status: 'read'
    }
  ];

 const budgetData: Record<BudgetScenarioType, { total: number; grant: number; net: number }> = {
  realistic: { total: 660000, grant: 297000, net: 363000 },
  optimistic: { total: 622000, grant: 279900, net: 342100 },
  conservative: { total: 708000, grant: 318600, net: 389400 }
};
  // Enhanced timeline with more details
  const timeline = [
    {
      title: 'Property Search & Selection',
      status: 'completed',
      date: 'Jun 2025',
      duration: '2 weeks',
      responsible: ['Real Estate Agent', 'You'],
      tasks: ['Property viewings', 'Market analysis', 'Initial selection'],
      completedTasks: 3,
      totalTasks: 3
    },
    {
      title: 'Due Diligence & Legal Review',
      status: 'completed',
      date: 'Jul 2025',
      duration: '3 weeks',
      responsible: ['Legal Advisor', 'Geometra'],
      tasks: ['Title search', 'Technical survey', 'Legal compliance'],
      completedTasks: 3,
      totalTasks: 3
    },
    {
      title: 'Preliminary Agreement',
      status: 'current',
      date: 'Jul 2025',
      duration: '3 weeks',
      responsible: ['Legal Advisor', 'Notary'],
      tasks: ['Draft Compromesso', 'Negotiate terms', 'Sign & register'],
      completedTasks: 2,
      totalTasks: 3
    },
    {
      title: 'Grant Application',
      status: 'current',
      date: 'Aug 2025',
      duration: '4 weeks',
      responsible: ['Grant Consultant'],
      tasks: ['Business plan', 'Mini PIA form', 'Submit application'],
      completedTasks: 1,
      totalTasks: 3
    },
    {
      title: 'Financing & Final Purchase',
      status: 'upcoming',
      date: 'Sep 2025',
      duration: '2 weeks',
      responsible: ['Bank', 'Notary'],
      tasks: ['Mortgage approval', 'Final deed', 'Property registration'],
      completedTasks: 0,
      totalTasks: 3
    },
    {
      title: 'Renovation & Launch',
      status: 'upcoming',
      date: 'Oct 2025 - Feb 2026',
      duration: '5 months',
      responsible: ['Contractor', 'Architect'],
      tasks: ['Construction', 'Inspections', 'Final certification'],
      completedTasks: 0,
      totalTasks: 3
    }
  ];

  // Enhanced documents with versions
  const documents = [
    {
      name: 'Proposta_di_Acquisto.pdf',
      english: 'Purchase Proposal',
      status: 'signed',
      type: 'contract',
      date: 'Jul 20, 2025',
      size: '245 KB',
      version: 'v3',
      sharedWith: ['Elena Bianchi', 'Marco Rossi']
    },
    {
      name: 'Compromesso_Preliminare.pdf',
      english: 'Preliminary Agreement',
      status: 'in-review',
      type: 'contract',
      date: 'Jul 19, 2025',
      size: '1.2 MB',
      version: 'v2',
      sharedWith: ['Elena Bianchi', 'Notary']
    },
    {
      name: 'Visura_Catastale.pdf',
      english: 'Cadastral Survey',
      status: 'verified',
      type: 'official',
      date: 'Jul 17, 2025',
      size: '890 KB',
      version: 'v1',
      sharedWith: ['All team']
    },
    {
      name: 'Planimetria_Catastale.pdf',
      english: 'Floor Plans',
      status: 'verified',
      type: 'technical',
      date: 'Jul 17, 2025',
      size: '2.3 MB',
      version: 'v1',
      sharedWith: ['Giuseppe Conti']
    },
    {
      name: 'APE_Certificazione.pdf',
      english: 'Energy Certificate',
      status: 'verified',
      type: 'technical',
      date: 'Jul 16, 2025',
      size: '456 KB',
      version: 'v1',
      sharedWith: ['All team']
    },
    {
      name: 'Visura_Ipotecaria.pdf',
      english: 'Mortgage Search',
      status: 'verified',
      type: 'legal',
      date: 'Jul 15, 2025',
      size: '567 KB',
      version: 'v1',
      sharedWith: ['Elena Bianchi', 'Bank']
    },
    {
      name: 'Perizia_Immobiliare.pdf',
      english: 'Property Valuation',
      status: 'verified',
      type: 'financial',
      date: 'Jul 14, 2025',
      size: '1.8 MB',
      version: 'v2',
      sharedWith: ['Sofia Romano', 'Bank']
    },
    {
      name: 'Mini_PIA_Application.pdf',
      english: 'Grant Application',
      status: 'draft',
      type: 'grant',
      date: 'Jul 12, 2025',
      size: '2.1 MB',
      version: 'v4',
      sharedWith: ['Grant Consultant']
    }
  ];

  // Calculate grant in real-time (45%)
  useEffect(() => {
    if (investmentAmount) {
      const amount = parseFloat(investmentAmount.replace(/[^\d]/g, ''));
      if (!isNaN(amount)) {
        setGrantAmount(Math.min(amount * 0.45, 2250000));
      }
    }
  }, [investmentAmount]);

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const sendUpdate = (memberName: string) => {
    // Simulate sending notification
    alert(`Update sent to ${memberName}'s mobile device!`);
    // In real implementation, this would trigger push notification
  };

  const inviteProfessional = (professional: any) => {
    alert(`Invitation sent to ${professional.name} to join your project!`);
    setShowProfessionalSearch(false);
  };

  const filteredProfessionals = searchableProfessionals.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prof.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExpertise = selectedExpertise === 'all' || 
                            prof.expertise.some(exp => exp.toLowerCase().includes(selectedExpertise.toLowerCase()));
    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/80 backdrop-blur-xl rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showMobileSidebar ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
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
        <div className="p-6 border-b border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MyApulink</h1>
          </div>
          <p className="text-sm text-gray-600">Your Project Command Center</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setShowMobileSidebar(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-lg'
                  : 'text-gray-600 hover:bg-blue-50/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.badge === 'New' ? 'bg-green-500 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-blue-100">
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.email?.split('@')[0] || 'User'}</p>
                <p className="text-xs text-gray-600">Premium Investor</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Active Projects</span>
              <span className="font-semibold text-blue-700">3</span>
            </div>
            <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button 
              onClick={() => setShowNotificationCenter(!showNotificationCenter)}
              className="relative flex-1 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              <Bell className="w-5 h-5 mx-auto" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button className="flex-1 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
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
            <h2 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent pl-12 lg:pl-0">
              {activeSection === 'overview' && `Welcome back! You have ${properties.filter(p => p.status === 'under-review').length} active projects`}
              {activeSection === 'properties' && 'Your Active Property Projects'}
              {activeSection === 'documents' && 'Secure Document Vault'}
              {activeSection === 'timeline' && 'Project Timeline & Milestones'}
              {activeSection === 'budget' && 'Financial Planning Studio'}
              {activeSection === 'team' && 'Your Expert Advisory Team'}
              {activeSection === 'grants' && 'Grant Optimization Center'}
            </h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.open('https://apulink.com/help', '_blank')}
                className="hidden md:flex px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg transition-all items-center gap-2 font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                Ask Trullo
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-20">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6 text-center">
                  <Euro className="w-6 md:w-8 h-6 md:h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xl md:text-3xl font-bold text-gray-900">€1.62M</p>
                  <p className="text-xs md:text-sm text-gray-600">Total Portfolio</p>
                  <p className="text-xs text-blue-600 mt-1 md:mt-2 hidden md:block">3 active projects</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6 text-center">
                  <TrendingUp className="w-6 md:w-8 h-6 md:h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xl md:text-3xl font-bold text-gray-900">€729K</p>
                  <p className="text-xs md:text-sm text-gray-600">Total Grants</p>
                  <p className="text-xs text-green-600 mt-1 md:mt-2 hidden md:block">45% savings secured</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6 text-center">
                  <Users className="w-6 md:w-8 h-6 md:h-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-xl md:text-3xl font-bold text-gray-900">8</p>
                  <p className="text-xs md:text-sm text-gray-600">Team Experts</p>
                  <p className="text-xs text-indigo-600 mt-1 md:mt-2 hidden md:block">4 active now</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6 text-center">
                  <Calendar className="w-6 md:w-8 h-6 md:h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-xl md:text-3xl font-bold text-gray-900">65%</p>
                  <p className="text-xs md:text-sm text-gray-600">Progress</p>
                  <p className="text-xs text-orange-600 mt-1 md:mt-2 hidden md:block">On schedule</p>
                </div>
              </div>

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
                  <p className="text-xs md:text-sm text-gray-600">4 experts online</p>
                  <ArrowUpRight className="w-4 h-4 text-indigo-600 mt-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">Legal review completed</p>
                      <p className="text-xs text-gray-600">Villa Rossi - Elena confirmed all documents • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">New grant opportunity</p>
                      <p className="text-xs text-gray-600">€45K additional savings identified • 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">Team update from Marco</p>
                      <p className="text-xs text-gray-600">3 new properties matching criteria • Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900 text-sm">{property.name.split(' - ')[1]}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        property.status === 'under-review' ? 'bg-blue-100 text-blue-700' :
                        property.status === 'shortlisted' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {property.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{property.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full"
                          style={{ width: `${property.progress}%` }}
                        />
                      </div>
                      <p className="text-gray-600 mt-2">{property.teamActivity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Properties Section - Enhanced */}
          {activeSection === 'properties' && (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all">
                    <div className="p-4 md:p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold text-gray-900 text-sm md:text-base pr-2">{property.name}</h4>
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          property.status === 'under-review' ? 'bg-blue-100 text-blue-700' :
                          property.status === 'shortlisted' ? 'bg-indigo-100 text-indigo-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {property.status.replace('-', ' ')}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Price</span>
                          <span className="font-semibold text-gray-900">{property.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Grant (45%)</span>
                          <span className="font-semibold text-green-600">{property.grantEligible}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Est. ROI</span>
                          <span className="font-semibold text-blue-600">{property.roi}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Project Progress</span>
                          <span className="font-bold text-gray-900">{property.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                            style={{ width: `${property.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <p className="text-xs font-medium text-gray-700 mb-1">Next Milestone</p>
                        <p className="text-sm font-semibold text-gray-900">{property.nextMilestone}</p>
                        <p className="text-xs text-gray-600 mt-1">in {property.daysToMilestone} days</p>
                      </div>

                      <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                        View Project Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Section - Enhanced */}
          {activeSection === 'documents' && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {['All', 'Contracts', 'Official', 'Technical', 'Financial', 'Grants'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedDocCategory(category.toLowerCase())}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      selectedDocCategory === category.toLowerCase() || (selectedDocCategory === 'all' && category === 'All')
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {documents
                  .filter(doc => selectedDocCategory === 'all' || doc.type === selectedDocCategory)
                  .map((doc, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 hover:shadow-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        doc.type === 'contract' ? 'bg-blue-100' :
                        doc.type === 'official' ? 'bg-indigo-100' :
                        doc.type === 'technical' ? 'bg-orange-100' :
                        doc.type === 'financial' ? 'bg-green-100' :
                        doc.type === 'grant' ? 'bg-purple-100' :
                        'bg-gray-100'
                      }`}>
                        <FileText className="w-6 h-6 text-gray-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900">{doc.english}</h4>
                        <p className="text-sm text-gray-500">{doc.name}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className={`px-2 py-1 rounded-full ${
                            doc.status === 'verified' || doc.status === 'signed' 
                              ? 'bg-green-100 text-green-700' :
                            doc.status === 'in-review' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {doc.status}
                          </span>
                          <span className="text-gray-500">{doc.version}</span>
                          <span className="text-gray-500">{doc.size}</span>
                          <span className="text-gray-500">{doc.date}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600">Shared with: {doc.sharedWith.join(', ')}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-700">{documents.length}</p>
                    <p className="text-sm text-gray-600">Total Documents</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-700">
                      {documents.filter(d => d.status === 'verified' || d.status === 'signed').length}
                    </p>
                    <p className="text-sm text-gray-600">Verified</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-700">
                      {documents.filter(d => d.status === 'in-review').length}
                    </p>
                    <p className="text-sm text-gray-600">In Review</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-indigo-700">3</p>
                    <p className="text-sm text-gray-600">Team Members</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Section - Enhanced */}
          {activeSection === 'timeline' && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Overall Project Progress</h3>
                  <span className="text-2xl font-bold text-blue-700">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full" style={{ width: '65%' }}></div>
                </div>

                <div className="space-y-4">
                  {timeline.map((phase, index) => (
                    <div key={index} className="relative">
                      {index < timeline.length - 1 && (
                        <div className={`absolute left-6 top-12 bottom-0 w-0.5 ${
                          phase.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                        }`}></div>
                      )}
                      
                      <div className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 ${
                        phase.status === 'completed' ? 'border-green-200' :
                        phase.status === 'current' ? 'border-blue-200' :
                        'border-gray-200'
                      }`}>
                        <div className={`absolute -left-3 top-8 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg ${
                          phase.status === 'completed' ? 'border-4 border-green-500' :
                          phase.status === 'current' ? 'border-4 border-blue-500' :
                          'border-4 border-gray-300'
                        }`}>
                          {phase.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : phase.status === 'current' ? (
                            <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
                          ) : (
                            <div className="w-3 h-3 bg-gray-400 rounded-full" />
                          )}
                        </div>
                        
                        <div className="ml-8">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">{phase.title}</h4>
                              <p className="text-sm text-gray-600">{phase.date} • {phase.duration}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              phase.status === 'completed' ? 'bg-green-100 text-green-700' :
                              phase.status === 'current' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {phase.status === 'current' ? 'in progress' : phase.status}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {phase.responsible.map((person, i) => (
                              <span key={i} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                                {person}
                              </span>
                            ))}
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Tasks completed</span>
                              <span className="font-medium">{phase.completedTasks}/{phase.totalTasks}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  phase.status === 'completed' ? 'bg-green-500' :
                                  phase.status === 'current' ? 'bg-blue-500' :
                                  'bg-gray-400'
                                }`}
                                style={{ width: `${(phase.completedTasks / phase.totalTasks) * 100}%` }}
                              />
                            </div>
                          </div>
                          
                          {phase.status === 'current' && (
                            <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                              {phase.tasks.map((task, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                  <div className={`w-4 h-4 rounded-full border-2 ${
                                    i < phase.completedTasks ? 'bg-blue-500 border-blue-500' : 'border-blue-300'
                                  }`}>
                                    {i < phase.completedTasks && (
                                      <Check className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                  <span className={i < phase.completedTasks ? 'line-through text-gray-500' : ''}>
                                    {task}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Budget Section */}
          {activeSection === 'budget' && (
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-4 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h3 className="text-lg md:text-xl font-semibold">Investment Scenarios</h3>
                  <div className="flex gap-2 flex-wrap">
                    {(['optimistic', 'realistic', 'conservative'] as BudgetScenarioType[]).map((scenario) => (
                      <button
                        key={scenario}
                        onClick={() => setBudgetScenario(scenario)}
                        className={`px-3 md:px-4 py-2 rounded-lg capitalize text-sm ${
                          budgetScenario === scenario 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {scenario}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="p-4 md:p-6 bg-blue-50 rounded-xl text-center">
                    <p className="text-xs md:text-sm text-gray-600 mb-2">Total Investment</p>
                    <p className="text-xl md:text-2xl font-bold text-blue-700">
                      €{budgetData[budgetScenario].total.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 md:p-6 bg-green-50 rounded-xl text-center">
                    <p className="text-xs md:text-sm text-gray-600 mb-2">Grant (45%)</p>
                    <p className="text-xl md:text-2xl font-bold text-green-700">
                      €{budgetData[budgetScenario].grant.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl text-center">
                    <p className="text-xs md:text-sm text-gray-600 mb-2">Your Investment</p>
                    <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      €{budgetData[budgetScenario].net.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-indigo-900">Tax Optimization Available</p>
                      <p className="text-sm text-indigo-700 mt-1">
                        Schedule a call with Sofia Romano to explore additional tax savings of up to €45,000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Section - Enhanced with messaging and professional search */}
          {activeSection === 'team' && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Current Team Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4 mb-4">
                      <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 relative">
                        <Briefcase className="w-6 md:w-8 h-6 md:h-8 text-blue-700" />
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">{member.name}</h4>
                        <p className="text-xs md:text-sm text-gray-600 truncate">{member.role}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-3 md:w-4 h-3 md:h-4 text-yellow-500 fill-current" />
                          <span className="text-xs md:text-sm font-semibold">{member.rating}</span>
                          <span className="text-xs text-gray-500">• {member.status}</span>
                        </div>
                      </div>
                      {member.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{member.unread}</span>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{member.lastMessage}</p>
                          <p className="text-xs text-gray-500 mt-1">{member.lastMessageTime}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </button>
                      <button 
                        onClick={() => sendUpdate(member.name)}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all font-medium text-sm flex items-center gap-1"
                      >
                        <Send className="w-4 h-4" />
                        Send Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Professional Button */}
              <div className="text-center">
                <button
                  onClick={() => setShowProfessionalSearch(!showProfessionalSearch)}
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
                        placeholder="Search by name or role..."
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
                      <option value="design">Design & Architecture</option>
                      <option value="construction">Construction</option>
                      <option value="grant">Grants & Funding</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProfessionals.map((professional, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-indigo-700" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{professional.name}</h4>
                            <p className="text-sm text-gray-600">{professional.role}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {professional.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {professional.responseTime}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-semibold">{professional.rating}</span>
                            </div>
                            <p className="text-xs text-gray-500">{professional.projectsCompleted} projects</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex flex-wrap gap-1">
                            {professional.expertise.map((skill, i) => (
                              <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Globe className="w-3 h-3" />
                            {professional.languages.join(', ')}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium">
                            View Profile
                          </button>
                          <button 
                            onClick={() => inviteProfessional(professional)}
                            className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                            Invite to Project
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Grants Section */}
          {activeSection === 'grants' && (
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-4 md:p-8">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-lg md:text-xl font-semibold text-center mb-6">Calculate Your PIA Grant</h3>
                  <p className="text-center text-gray-600 mb-6">
                    Puglia Region offers 45% grants for tourism properties. Calculate your savings instantly.
                  </p>
                  
                  <input
                    type="text"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="Enter total investment amount"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl mb-6 text-sm md:text-base"
                  />
                  
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl text-center">
                    <p className="text-xs md:text-sm text-gray-600 mb-2">Your Estimated Grant</p>
                    <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      €{grantAmount.toLocaleString()}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 mt-2">45% of eligible costs (max €2.25M)</p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Tourism Properties Eligible</p>
                        <p className="text-sm text-gray-600 mt-1">Hotels, B&Bs, vacation rentals, agriturismo</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Professional Support Included</p>
                        <p className="text-sm text-gray-600 mt-1">Our experts handle the entire application</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Success Rate: 92%</p>
                        <p className="text-sm text-gray-600 mt-1">With our team's expertise</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
                    Get Detailed Grant Analysis
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grant Calculator Modal */}
      {showGrantCalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold">PIA Grant Calculator</h3>
              <button onClick={() => setShowGrantCalculator(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 md:w-6 h-5 md:h-6" />
              </button>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-8 text-sm md:text-base">
                Calculate your potential grant savings (45% of eligible costs)
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                <p className="text-3xl font-bold text-blue-700">€{grantAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-2">Estimated grant amount</p>
              </div>
              <button 
                onClick={() => setShowGrantCalculator(false)}
                className="px-6 md:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold text-sm md:text-base"
              >
                Apply for Grant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Center */}
      {showNotificationCenter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Notifications</h3>
              <button onClick={() => setShowNotificationCenter(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className={`p-4 rounded-lg border ${notif.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notif.type === 'message' ? 'bg-blue-100' :
                      notif.type === 'update' ? 'bg-green-100' :
                      notif.type === 'milestone' ? 'bg-indigo-100' :
                      'bg-orange-100'
                    }`}>
                      {notif.type === 'message' ? <MessageSquare className="w-4 h-4 text-blue-600" /> :
                       notif.type === 'update' ? <Info className="w-4 h-4 text-green-600" /> :
                       notif.type === 'milestone' ? <CheckCircle className="w-4 h-4 text-indigo-600" /> :
                       <AlertCircle className="w-4 h-4 text-orange-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notif.from}</p>
                      <p className="text-sm text-gray-600 mt-1">{notif.content}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span>{notif.time}</span>
                        <span className="flex items-center gap-1">
                          {notif.status === 'delivered' ? <Check className="w-3 h-3" /> : <CheckCheck className="w-3 h-3 text-blue-600" />}
                          {notif.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => {
                  setNotifications(notifs => notifs.map(n => ({ ...n, read: true })));
                  setUnreadCount(0);
                }}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium"
              >
                Mark all as read
              </button>
              <button 
                onClick={() => setShowNotificationCenter(false)}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trullo Floating Bubble - Always Present */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => window.open('https://apulink.com/chat', '_blank')}
          className="group relative w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-ping opacity-20"></div>
          <MessageSquare className="w-7 h-7 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <span className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask Trullo anything!
          </span>
        </button>
      </div>
    </div>
  );
};

export default MyApulinkDashboard;
