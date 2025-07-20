// Path: app/(authenticated)/my-apulink/buyer/page.tsx
// Buyer dashboard for managing property investment projects

'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  Euro, 
  Calendar,
  Upload,
  FolderOpen,
  Bell,
  Plus,
  Home,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: Date;
  size: string;
  category: 'visura' | 'planimetria' | 'contracts' | 'permits' | 'other';
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  status: 'active' | 'pending';
}

interface BudgetItem {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  variance: number;
}

interface Project {
  id: string;
  name: string;
  status: 'planning' | 'searching' | 'negotiating' | 'closing' | 'renovating' | 'complete';
  startDate: Date;
  targetDate: Date;
  progress: number;
}

export default function BuyerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [budget, setBudget] = useState<BudgetItem[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    // In production, fetch from Supabase
    setDocuments([
  {
    id: '1',
    name: 'Property Visura.pdf',
    type: 'PDF',
    uploadedAt: new Date('2025-07-15'),
    size: '2.4 MB',
    category: 'visura',
  },
  {
    id: '2',
    name: 'Floor Plans.pdf',  // ← Should be a document
    type: 'PDF',
    uploadedAt: new Date('2025-07-18'),
    size: '5.1 MB',
    category: 'planimetria',
  },
]);

setTeam([  // ← Team data should be in a separate array
  {
    id: '1',
    name: 'Marco Rossi',
    role: 'Real Estate Agent',
    email: 'marco@example.com',
    status: 'active',
  },
      {
        id: '3',
        name: 'Giuseppe Verdi',
        role: 'Architect',
        email: 'giuseppe@example.com',
        status: 'pending',
      },
    ]);

    setBudget([
      { id: '1', category: 'Property Purchase', budgeted: 150000, spent: 0, variance: 150000 },
      { id: '2', category: 'Notary & Legal', budgeted: 5000, spent: 2500, variance: 2500 },
      { id: '3', category: 'Renovation', budgeted: 30000, spent: 0, variance: 30000 },
      { id: '4', category: 'Professional Fees', budgeted: 8000, spent: 3000, variance: 5000 },
    ]);

    setProject({
      id: '1',
      name: 'Trullo Restoration in Alberobello',
      status: 'negotiating',
      startDate: new Date('2025-06-01'),
      targetDate: new Date('2025-12-01'),
      progress: 35,
    });
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingFile(true);
    // In production, upload to Supabase Storage
    setTimeout(() => {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: files[0].name,
        type: 'PDF',
        uploadedAt: new Date(),
        size: `${(files[0].size / 1024 / 1024).toFixed(1)} MB`,
        category: 'other',
      };
      setDocuments([...documents, newDoc]);
      setUploadingFile(false);
    }, 1500);
  };

  const totalBudget = budget.reduce((sum, item) => sum + item.budgeted, 0);
  const totalSpent = budget.reduce((sum, item) => sum + item.spent, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Apulink Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Welcome back, {user?.profile?.fullName || 'Guest'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Bell className="w-6 h-6" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                  New Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Home },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'budget', label: 'Budget', icon: Euro },
              { id: 'timeline', label: 'Timeline', icon: Calendar },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && project && (
          <div className="space-y-6">
            {/* Project Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{project.name}</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Overall Progress</span>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status: <span className="font-medium capitalize">{project.status}</span></span>
                  <span className="text-gray-600">Target: {project.targetDate.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Documents</p>
                    <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-100" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Team Members</p>
                    <p className="text-2xl font-bold text-gray-900">{team.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-100" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900">€{totalBudget.toLocaleString()}</p>
                  </div>
                  <Euro className="w-8 h-8 text-yellow-100" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Spent</p>
                    <p className="text-2xl font-bold text-gray-900">€{totalSpent.toLocaleString()}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-100" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">Property inspection completed</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">Floor plans uploaded</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">Architect joined the team</p>
                    <p className="text-xs text-gray-500">5 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Drop files here or click to upload
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    multiple
                  />
                  <label
                    htmlFor="file-upload"
                    className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                  >
                    Select Files
                  </label>
                </div>
              </div>
            </div>

            {/* Document List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">All Documents</h3>
              </div>
              <div className="divide-y">
                {documents.map((doc) => (
                  <div key={doc.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FolderOpen className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {doc.category} • {doc.size} • {doc.uploadedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Project Team</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Invite Professional
                </button>
              </div>
              <div className="divide-y">
                {team.map((member) => (
                  <div key={member.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
              <div className="space-y-4">
                {budget.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{item.category}</span>
                      <span className="text-sm text-gray-600">
                        €{item.spent.toLocaleString()} / €{item.budgeted.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(item.spent / item.budgeted) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
        name: 'Floor Plans.pdf',
        type: 'PDF',
        uploadedAt: new Date('2025-07-18'),
        size: '5.1 MB',
        category: 'planimetria',
      },
    ]);

    setTeam([
      {
        id: '1',
        name: 'Marco Rossi',
        role: 'Real Estate Agent',
        email: 'marco@example.com',
        status: 'active',
      },
      {
        id: '2',
