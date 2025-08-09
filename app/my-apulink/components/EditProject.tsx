'use client';

import React, { useState } from 'react';
import { projectService } from '@/lib/firebase/firestore-service';
import type { Project } from '@/lib/firebase/firestore-service';
import { Save, X, Loader2 } from 'lucide-react';

interface EditProjectProps {
  project: Project;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditProject({ project, onClose, onSaved }: EditProjectProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: project.name,
    status: project.status,
    region: project.region,
    comune: project.comune,
    address: project.address,
    description: project.description,
    miniPiaStage: project.miniPiaStage,
    totalBudget: project.totalBudget,
    spentBudget: project.spentBudget,
    progress: project.progress
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project.id) return;

    setLoading(true);
    try {
      await projectService.updateProject(project.id, formData);
      onSaved();
      onClose();
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error updating project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Project</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Project Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="planning">Planning</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mini PIA Stage</label>
              <select
                value={formData.miniPiaStage}
                onChange={(e) => setFormData({ ...formData, miniPiaStage: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="Initial Survey">Initial Survey</option>
                <option value="Design Phase">Design Phase</option>
                <option value="Permits Pending">Permits Pending</option>
                <option value="Permits Approved">Permits Approved</option>
                <option value="Construction">Construction</option>
                <option value="Final Inspection">Final Inspection</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Region</label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Comune</label>
              <input
                type="text"
                value={formData.comune}
                onChange={(e) => setFormData({ ...formData, comune: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Total Budget (€)</label>
              <input
                type="number"
                value={formData.totalBudget}
                onChange={(e) => setFormData({ ...formData, totalBudget: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Spent Budget (€)</label>
              <input
                type="number"
                value={formData.spentBudget}
                onChange={(e) => setFormData({ ...formData, spentBudget: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Progress (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                  style={{ width: `${formData.progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
