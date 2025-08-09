'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { projectService, budgetService, milestoneService, documentService } from '@/lib/firebase/firestore-service';
import type { Project, Milestone, BudgetItem, Document } from '@/lib/firebase/firestore-service';
import DashboardLayout from './components-new/DashboardLayout';
import DashboardMetrics from './components-new/DashboardMetrics';
import ProjectList from './components-new/ProjectList';
import { Plus, Loader2 } from 'lucide-react';

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

  // Load REAL projects when user logs in
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    
    // Subscribe to real-time project updates
    const unsubscribe = projectService.subscribeToUserProjects(user.uid, async (userProjects) => {
      setProjects(userProjects);
      
      // Calculate REAL metrics
      let totalBudget = 0;
      let totalSpent = 0;
      let totalProgress = 0;
      
      for (const project of userProjects) {
        if (project.id) {
          const totals = await budgetService.calculateProjectTotals(project.id);
          totalBudget += totals.totalBudget;
          totalSpent += totals.totalSpent;
          totalProgress += project.progress;
        }
      }
      
      setMetrics({
        totalPortfolio: totalBudget,
        totalGrants: totalBudget * 0.4, // Example: 40% grant coverage
        teamExperts: 12, // You can fetch this from a professionals collection
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

    // Subscribe to milestones
    const unsubMilestones = milestoneService.subscribeToProjectMilestones(
      selectedProject.id,
      (projectMilestones) => setMilestones(projectMilestones)
    );

    // Subscribe to budget
    const unsubBudget = budgetService.subscribeToProjectBudget(
      selectedProject.id,
      (projectBudget) => setBudgetItems(projectBudget)
    );

    // Subscribe to documents
    const unsubDocs = documentService.subscribeToProjectDocuments(
      selectedProject.id,
      (projectDocs) => setDocuments(projectDocs)
    );

    return () => {
      unsubMilestones();
      unsubBudget();
      unsubDocs();
    };
  }, [selectedProject]);

  const handleCreateProject = () => {
    router.push('/my-apulink/create-project');
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setActiveSection('properties');
  };

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all border border-white/50"
                  >
                    <h4 className="font-semibold text-lg mb-2">{project.name}</h4>
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
                        <span className="font-medium">€{project.totalBudget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                    </div>
                    <div className="mt-4 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
        
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Budget for {selectedProject.name}</h3>
            
            {categories.map(category => {
              const categoryItems = budgetItems.filter(item => item.category === category);
              const categoryTotal = categoryItems.reduce((sum, item) => sum + item.totalCost + item.vatAmount, 0);
              
              return (
                <div key={category} className="bg-white/70 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-4 text-purple-700">{category}</h4>
                  <div className="space-y-3">
                    {categoryItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{item.item}</p>
                          <p className="text-sm text-gray-600">
                            {item.quantity} {item.unit} × €{item.unitCost}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">€{(item.totalCost + item.vatAmount).toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{item.status}</p>
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
            <h3 className="text-xl font-bold">Timeline for {selectedProject.name}</h3>
            
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
                      <h4 className="font-semibold">{milestone.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>{new Date(milestone.startDate).toLocaleDateString()}</span>
                        <span>→</span>
                        <span>{new Date(milestone.endDate).toLocaleDateString()}</span>
                        <span className="ml-auto font-medium">{milestone.progress}%</span>
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
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onNotificationClick={() => {}}
      notificationCount={0}
      projectCount={projects.length}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
