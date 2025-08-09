import React from 'react';
import { Building2, MapPin, Calendar, TrendingUp } from 'lucide-react';
import type { Project } from '../../../lib/firebase/firestore-service';

interface ProjectListProps {
  userId?: string;
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onRefresh: () => void;
}

export default function ProjectList({ projects, onProjectClick }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 text-center">
        <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
        <p className="text-gray-600">Create your first investment project to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => onProjectClick(project)}
          className="bg-white/70 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all border border-white/50 group"
        >
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-semibold text-lg group-hover:text-purple-600 transition-colors">
              {project.name}
            </h4>
            <span className={`px-2 py-1 text-xs rounded-full ${
              project.status === 'completed' ? 'bg-green-100 text-green-700' :
              project.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
              project.status === 'on_hold' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {project.status.replace('_', ' ')}
            </span>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{project.comune}, {project.region}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Progress: {project.progress}%</span>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Budget</span>
              <span className="font-semibold">€{project.totalBudget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Spent</span>
              <span className="font-semibold text-green-600">€{project.spentBudget.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
