'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { projectService } from '../../../lib/firebase/firestore-service';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export default function CreateProjectPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    status: 'planning' as const,
    region: 'Puglia',
    comune: '',
    address: '',
    description: '',
    miniPiaStage: 'Initial Survey',
    startDate: '',
    endDate: '',
    totalBudget: 0,
    spentBudget: 0,
    progress: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const projectId = await projectService.createProject({
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        ownerId: user.uid
      });
      
      router.push('/my-apulink');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create New Investment Project
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Villa Renovation - Ostuni"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="planning">Planning</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on_hold">On Hold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comune *
                </label>
                <input
                  type="text"
                  required
                  value={formData.comune}
                  onChange={(e) => setFormData({ ...formData, comune: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ostuni"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Via dei Trulli 42, 72017 Ostuni BR"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="Complete renovation of 18th century villa..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mini PIA Stage
                </label>
                <select
                  value={formData.miniPiaStage}
                  onChange={(e) => setFormData({ ...formData, miniPiaStage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Budget (€)
                </label>
                <input
                  type="number"
                  value={formData.totalBudget}
                  onChange={(e) => setFormData({ ...formData, totalBudget: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="450000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Progress (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Already Spent (€)
                </label>
                <input
                  type="number"
                  value={formData.spentBudget}
                  onChange={(e) => setFormData({ ...formData, spentBudget: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Create Project
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
