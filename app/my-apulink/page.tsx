// Path: app/my-apulink/page.tsx
// Main dashboard page for MyApulink

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext'; // FIXED PATH
import { projectService, budgetService, milestoneService, documentService } from '../../lib/firebase/firestore-service';
import DashboardLayout from './components-new/DashboardLayout';
import DashboardMetrics from './components-new/DashboardMetrics';
import ProjectList from './components-new/ProjectList';
import AddBudgetItem from './components/AddBudgetItem';
import AddMilestone from './components/AddMilestone';
import DocumentUpload from './components/DocumentUpload';
import EditProject from './components/EditProject';
import TeamManagement from './components/TeamManagement';
import ProjectMessages from './components/ProjectMessages';
import NotificationSystem from './components/NotificationSystem';
import CalendarSync from './components/CalendarSync';
import { createNotification } from './components/NotificationSystem';
import { Plus, Loader2, Edit, Trash2, Download, Upload, FileText, Image, File, Folder, Search, Filter, Grid, List, Eye, Share2, Lock, Unlock, Calendar, Bell } from 'lucide-react';

// Type definitions
interface Project {
  id?: string;
  name: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  region: string;
  comune: string;
  address: string;
  description: string;
  miniPiaStage: string;
  startDate: string;
  endDate: string;
  ownerId: string;
  totalBudget: number;
  spentBudget: number;
  progress: number;
  createdAt: any;
  updatedAt: any;
}

interface Milestone {
  id?: string;
  projectId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  ownerId: string;
  dependencies: string[];
  createdAt: any;
  updatedAt: any;
}

interface BudgetItem {
  id?: string;
  projectId: string;
  category: string;
  item: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  vatRate: number;
  vatAmount: number;
  status: 'planned' | 'committed' | 'invoiced' | 'paid';
  supplierId?: string;
  notes: string;
  createdAt: any;
  updatedAt: any;
}

interface Document {
  id?: string;
  projectId: string;
  name: string;
  folder: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  tags: string[];
  uploadedBy: string;
  version: number;
  createdAt: any;
  updatedAt: any;
}

export default function MyApulinkDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  
  // State for REAL data
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalPortfolio: 0,
    totalGrants: 0,
    teamExperts: 0,
    avgProgress: 0
  });

  // Modal states
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Document filters
  const [documentSearch, setDocumentSearch] = useState('');
  const [documentCategory, setDocumentCategory] = useState('all');
  const [documentView, setDocumentView] = useState<'grid' | 'list'>('grid');

  // Load REAL projects when user logs in
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    
    // Subscribe to real-time project updates - FIXED FUNCTION NAME
    const unsubscribe = projectService.subscribeToProjects(user.uid, async (userProjects) => {
      setProjects(userProjects);
      
      // Calculate REAL metrics
      let totalBudget = 0;
      let totalSpent = 0;
      let totalProgress = 0;
      
      for (const project of userProjects) {
        totalBudget += project.totalBudget || 0;
        totalSpent += project.spentBudget || 0;
        totalProgress += project.progress || 0;
      }
      
      setMetrics({
        totalPortfolio: totalBudget,
        totalGrants: totalBudget * 0.4,
        teamExperts: 12,
        avgProgress: userProjects.length > 0 ? Math.round(totalProgress / userProjects.length) : 0
      });
      
      // Auto-select first project if exists
      if (userProjects.length > 0 && !selectedProject) {
        setSelectedProject(userProjects[0]);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, router]);

  // Load project details when a project is selected
  useEffect(() => {
    if (!selectedProject?.id) return;

    // Subscribe to milestones - FIXED FUNCTION NAME
    const unsubMilestones = milestoneService.subscribeToMilestones(
      selectedProject.id,
      (projectMilestones) => {
        setMilestones(projectMilestones);
        // Check for upcoming deadlines
        checkUpcomingDeadlines(projectMilestones);
      }
    );

    // Subscribe to budget - FIXED FUNCTION NAME
    const unsubBudget = budgetService.subscribeToBudgetItems(
      selectedProject.id,
      (projectBudget) => setBudgetItems(projectBudget)
    );

    // Subscribe to documents - FIXED FUNCTION NAME
    
    console.log('Subscribing to documents for project:', selectedProject?.id);
    const unsubDocs = documentService.subscribeToDocuments(
      selectedProject.id,
      (projectDocs) => { console.log('Documents received:', projectDocs); setDocuments(projectDocs); }
    );

    return () => {
      unsubMilestones();
      unsubBudget();
      unsubDocs();
    };
  }, [selectedProject]);

  // Check for upcoming deadlines and create notifications
  const checkUpcomingDeadlines = async (milestones: Milestone[]) => {
    const today = new Date();
    const threeDaysFromNow = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));
    
    for (const milestone of milestones) {
      const endDate = new Date(milestone.endDate);
      if (endDate <= threeDaysFromNow && endDate >= today && milestone.status !== 'completed') {
        await createNotification({
          userId: user!.uid,
          projectId: selectedProject?.id,
          type: 'deadline',
          title: 'Milestone Deadline Approaching',
          message: `"${milestone.title}" is due on ${endDate.toLocaleDateString()}`,
          priority: endDate <= today ? 'urgent' : 'high'
        });
      }
    }
  };

  const handleCreateProject = () => {
    router.push('/my-apulink/create-project');
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setActiveSection('properties');
  };

  const handleDeleteBudgetItem = async (itemId: string) => {
    if (confirm('Are you sure you want to delete this budget item?')) {
      await budgetService.deleteBudgetItem(itemId);
    }
  };

  const handleDeleteMilestone = async (milestoneId: string) => {
    if (confirm('Are you sure you want to delete this milestone?')) {
      await milestoneService.deleteMilestone(milestoneId);
    }
  };

  const handleUpdateMilestoneProgress = async (milestoneId: string, progress: number) => {
    await milestoneService.updateMilestone(milestoneId, { 
      progress,
      status: progress === 100 ? 'completed' : progress > 0 ? 'in_progress' : 'pending'
    });
  };

  const handleUpdateBudgetStatus = async (itemId: string, status: BudgetItem['status']) => {
    if (!selectedProject?.id) return;
    await budgetService.updateBudgetItem(selectedProject.id, itemId, { status });
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      const doc = documents.find(d => d.id === documentId);
      if (doc && doc.fileUrl) {
        // Extract storage path from URL or use storagePath if available
        await documentService.deleteDocument(selectedProject.id, documentId);
      }
    }
  };

  const handleDownloadDocument = (document: Document) => {
    window.open(document.fileUrl, '_blank');
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return <Image className="w-12 h-12 text-blue-500" />;
    if (fileType.includes('pdf')) return <FileText className="w-12 h-12 text-red-500" />;
    return <File className="w-12 h-12 text-gray-500" />;
  };

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(documentSearch.toLowerCase()) ||
                          (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(documentSearch.toLowerCase())));
    const matchesCategory = documentCategory === 'all' || doc.folder === documentCategory;
    return matchesSearch && matchesCategory;
  });

  const documentCategories = ['all', ...new Set(documents.map(doc => doc.folder))];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <DashboardMetrics metrics={metrics} loading={loading} />
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={handleCreateProject}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6 text-center hover:shadow-xl transition-all"
              >
                <Plus className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Create New Project</p>
              </button>
              
              <button
                onClick={() => setActiveSection('documents')}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-xl transition-all border border-white/50"
              >
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                <p className="text-sm text-gray-600">Documents</p>
              </button>
              
              <button
                onClick={() => setActiveSection('timeline')}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-xl transition-all border border-white/50"
              >
                <p className="text-2xl font-bold text-gray-900">{milestones.length}</p>
                <p className="text-sm text-gray-600">Active Milestones</p>
              </button>
            </div>

            {/* Recent Projects */}
            <div>
              <h3 className="text-xl font-bold mb-4">Your Projects</h3>
              <ProjectList
                userId={user?.uid}
                projects={projects}
                onProjectClick={handleProjectClick}
                onRefresh={() => {}}
              />
            </div>

            {/* Messages Section for Selected Project */}
            {selectedProject && user && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProjectMessages 
                  projectId={selectedProject.id!}
                  userId={user.uid}
                  userName={user.displayName || user.email || 'User'}
                />
                <CalendarSync
                  projectId={selectedProject.id!}
                  projectName={selectedProject.name}
                />
              </div>
            )}
          </div>
        );
        
      case 'properties':
        return (
          <div className="space-y-6">
            {projects.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-12 text-center">
                <h3 className="text-xl font-semibold mb-4">No Projects Yet</h3>
                <p className="text-gray-600 mb-6">Start your property investment journey</p>
                <button
                  onClick={handleCreateProject}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all"
                >
                  Create Your First Project
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">All Projects</h3>
                  <button
                    onClick={handleCreateProject}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    New Project
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white/70 backdrop-blur-sm rounded-xl p-6 hover:shadow-xl transition-all border border-white/50"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 
                          className="font-semibold text-lg cursor-pointer hover:text-purple-600"
                          onClick={() => handleProjectClick(project)}
                        >
                          {project.name}
                        </h4>
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setShowEditProject(true);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{project.comune}, {project.region}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Status</span>
                          <span className={`font-medium ${
                            project.status === 'completed' ? 'text-green-600' :
                            project.status === 'in_progress' ? 'text-blue-600' :
                            project.status === 'on_hold' ? 'text-yellow-600' :
                            'text-gray-600'
                          }`}>
                            {project.status.replace('_', ' ').charAt(0).toUpperCase() + project.status.slice(1).replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Budget</span>
                          <span className="font-medium">€{(project.totalBudget || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{project.progress || 0}%</span>
                        </div>
                      </div>
                      <div className="mt-4 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                          style={{ width: `${project.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        );

      case 'documents':
        if (!selectedProject) {
          return (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-12 text-center">
              <p className="text-gray-600">Please select a project first</p>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            {/* Header with Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h3 className="text-xl font-bold">Documents for {selectedProject.name}</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowDocumentUpload(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Document
                </button>
                <div className="flex gap-1 bg-white/70 rounded-lg p-1">
                  <button
                    onClick={() => setDocumentView('grid')}
                    className={`p-2 rounded ${documentView === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-500'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDocumentView('list')}
                    className={`p-2 rounded ${documentView === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-500'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={documentSearch}
                  onChange={(e) => setDocumentSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <select
                value={documentCategory}
                onChange={(e) => setDocumentCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                {documentCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Documents Display */}
            {filteredDocuments.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Documents Found</h3>
                <p className="text-gray-600 mb-6">
                  {documentSearch ? 'Try adjusting your search' : 'Upload your first document'}
                </p>
                {!documentSearch && (
                  <button
                    onClick={() => setShowDocumentUpload(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all"
                  >
                    Upload Document
                  </button>
                )}
              </div>
            ) : documentView === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 hover:shadow-xl transition-all border border-white/50 group"
                  >
                    <div className="flex justify-center mb-3">
                      {getFileIcon(doc.fileType)}
                    </div>
                    <h4 className="font-medium text-sm truncate mb-1">{doc.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{doc.folder}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        v{doc.version || 1}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDownloadDocument(doc)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Download className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteDocument(doc.id!)}
                          className="p-1 hover:bg-red-100 rounded text-red-500"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium">Name</th>
                      <th className="text-left px-4 py-3 text-sm font-medium">Category</th>
                      <th className="text-left px-4 py-3 text-sm font-medium">Size</th>
                      <th className="text-left px-4 py-3 text-sm font-medium">Uploaded</th>
                      <th className="text-left px-4 py-3 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {doc.fileType.includes('image') ? <Image className="w-4 h-4" /> :
                             doc.fileType.includes('pdf') ? <FileText className="w-4 h-4 text-red-500" /> :
                             <File className="w-4 h-4" />}
                            <span className="font-medium text-sm">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{doc.folder}</td>
                        <td className="px-4 py-3 text-sm">
                          {(doc.fileSize / 1024 / 1024).toFixed(2)} MB
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {doc.createdAt ? new Date(doc.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDownloadDocument(doc)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteDocument(doc.id!)}
                              className="p-1 hover:bg-red-100 rounded text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Document Upload Modal */}
            {showDocumentUpload && selectedProject?.id && (
              <DocumentUpload
                projectId={selectedProject.id}
                onClose={() => setShowDocumentUpload(false)}
                onUploaded={() => setShowDocumentUpload(false)}
              />
            )}
          </div>
        );
        
      case 'budget':
        if (!selectedProject) {
          return (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-12 text-center">
              <p className="text-gray-600">Please select a project first</p>
            </div>
          );
        }
        
        const categories = [...new Set(budgetItems.map(item => item.category))];
        const totals = budgetItems.reduce((acc, item) => {
          acc.total += item.totalCost + item.vatAmount;
          if (item.status === 'paid') {
            acc.paid += item.totalCost + item.vatAmount;
          }
          return acc;
        }, { total: 0, paid: 0 });
        
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Budget for {selectedProject.name}</h3>
              <button
                onClick={() => setShowAddBudget(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {/* Budget Summary */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold">€{totals.total.toLocaleString()}</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-green-600">€{totals.paid.toLocaleString()}</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-2xl font-bold text-orange-600">€{(totals.total - totals.paid).toLocaleString()}</p>
              </div>
            </div>
            
            {categories.map(category => {
              const categoryItems = budgetItems.filter(item => item.category === category);
              const categoryTotal = categoryItems.reduce((sum, item) => sum + item.totalCost + item.vatAmount, 0);
              
              return (
                <div key={category} className="bg-white/70 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-4 text-purple-700">{category}</h4>
                  <div className="space-y-3">
                    {categoryItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center border-b pb-2">
                        <div className="flex-1">
                          <p className="font-medium">{item.item}</p>
                          <p className="text-sm text-gray-600">
                            {item.quantity} {item.unit} × €{item.unitCost}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <select
                            value={item.status}
                            onChange={(e) => handleUpdateBudgetStatus(item.id!, e.target.value as any)}
                            className="text-xs px-2 py-1 border rounded"
                          >
                            <option value="planned">Planned</option>
                            <option value="committed">Committed</option>
                            <option value="invoiced">Invoiced</option>
                            <option value="paid">Paid</option>
                          </select>
                          <div className="text-right">
                            <p className="font-semibold">€{(item.totalCost + item.vatAmount).toLocaleString()}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteBudgetItem(item.id!)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between">
                    <span className="font-semibold">Category Total</span>
                    <span className="font-bold text-lg">€{categoryTotal.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}

            {showAddBudget && selectedProject?.id && (
              <AddBudgetItem
                projectId={selectedProject.id}
                onClose={() => setShowAddBudget(false)}
                onAdded={() => setShowAddBudget(false)}
              />
            )}
          </div>
        );
        
      case 'timeline':
        if (!selectedProject) {
          return (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-12 text-center">
              <p className="text-gray-600">Please select a project first</p>
            </div>
          );
        }
        
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Timeline for {selectedProject.name}</h3>
              <button
                onClick={() => setShowAddMilestone(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Milestone
              </button>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${
                        milestone.status === 'completed' ? 'bg-green-500' :
                        milestone.status === 'in_progress' ? 'bg-blue-500' :
                        milestone.status === 'delayed' ? 'bg-red-500' :
                        'bg-gray-400'
                      }`} />
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-20 bg-gray-300 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{milestone.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>{new Date(milestone.startDate).toLocaleDateString()}</span>
                            <span>→</span>
                            <span>{new Date(milestone.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={milestone.progress}
                            onChange={(e) => handleUpdateMilestoneProgress(milestone.id!, Number(e.target.value))}
                            className="w-16 px-2 py-1 text-sm border rounded"
                          />
                          <span className="text-sm">%</span>
                          <button
                            onClick={() => handleDeleteMilestone(milestone.id!)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'in_progress' ? 'bg-blue-500' :
                            milestone.status === 'delayed' ? 'bg-red-500' :
                            'bg-gray-400'
                          }`}
                          style={{ width: `${milestone.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showAddMilestone && selectedProject?.id && user && (
              <AddMilestone
                projectId={selectedProject.id}
                ownerId={user.uid}
                onClose={() => setShowAddMilestone(false)}
                onAdded={() => setShowAddMilestone(false)}
              />
            )}
          </div>
        );

      case 'team':
        if (!selectedProject) {
          return (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-12 text-center">
              <p className="text-gray-600">Please select a project first</p>
            </div>
          );
        }
        
        return (
          <TeamManagement 
            projectId={selectedProject.id!}
            userId={user!.uid}
          />
        );

      case 'calendar':
        if (!selectedProject) {
          return (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-12 text-center">
              <p className="text-gray-600">Please select a project first</p>
            </div>
          );
        }
        
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Calendar Integration</h3>
            <CalendarSync
              projectId={selectedProject.id!}
              projectName={selectedProject.name}
            />
            {/* Add a visual calendar component here if needed */}
          </div>
        );
        
      default:
        return (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-12 text-center">
            <p className="text-gray-600">Section coming soon...</p>
          </div>
        );
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <>
      <DashboardLayout
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onNotificationClick={() => setShowNotifications(!showNotifications)}
        notificationCount={3} // You can make this dynamic
        projectCount={projects.length}
      >
        {renderContent()}
      </DashboardLayout>

      {/* Edit Project Modal */}
      {showEditProject && selectedProject && (
        <EditProject
          project={selectedProject}
          onClose={() => setShowEditProject(false)}
          onSaved={() => setShowEditProject(false)}
        />
      )}

      {/* Notifications Panel */}
      {showNotifications && user && (
        <NotificationSystem
          userId={user.uid}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </>
  );
}



