'use client';

import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase/config';
import { Users, UserPlus, Mail, Phone, Shield, Trash2, Edit, X, Loader2, Check, Clock } from 'lucide-react';

interface TeamMember {
  id?: string;
  projectId: string;
  name: string;
  email: string;
  phone?: string;
  role: 'owner' | 'manager' | 'engineer' | 'architect' | 'accountant' | 'contractor' | 'supplier' | 'viewer';
  category: 'professional' | 'supplier' | 'internal';
  company?: string;
  specialization?: string;
  permissions: {
    budget: boolean;
    documents: boolean;
    timeline: boolean;
    team: boolean;
  };
  status: 'active' | 'pending' | 'inactive';
  invitedAt: Date;
  acceptedAt?: Date;
  addedBy: string;
}

interface TeamManagementProps {
  projectId: string;
  userId: string;
}

export default function TeamManagement({ projectId, userId }: TeamManagementProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'viewer' as TeamMember['role'],
    category: 'professional' as TeamMember['category'],
    company: '',
    specialization: '',
    permissions: {
      budget: false,
      documents: true,
      timeline: true,
      team: false
    }
  });

  useEffect(() => {
    const q = query(collection(db, 'teamMembers'), where('projectId', '==', projectId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const members = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as TeamMember));
      setTeamMembers(members);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [projectId]);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'teamMembers'), {
        ...formData,
        projectId,
        status: 'pending',
        invitedAt: new Date(),
        addedBy: userId
      });

      // Send invitation email (implement with Cloud Function)
      // For now, just add to database

      setShowAddMember(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'viewer',
        category: 'professional',
        company: '',
        specialization: '',
        permissions: {
          budget: false,
          documents: true,
          timeline: true,
          team: false
        }
      });
    } catch (error) {
      console.error('Error adding team member:', error);
      alert('Error adding team member');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    if (confirm('Remove this team member?')) {
      await deleteDoc(doc(db, 'teamMembers', memberId));
    }
  };

  const handleUpdatePermissions = async (memberId: string, permissions: any) => {
    await updateDoc(doc(db, 'teamMembers', memberId), { permissions });
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      owner: 'bg-purple-100 text-purple-700',
      manager: 'bg-blue-100 text-blue-700',
      engineer: 'bg-green-100 text-green-700',
      architect: 'bg-yellow-100 text-yellow-700',
      accountant: 'bg-indigo-100 text-indigo-700',
      contractor: 'bg-orange-100 text-orange-700',
      supplier: 'bg-pink-100 text-pink-700',
      viewer: 'bg-gray-100 text-gray-700'
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Team Management</h3>
        <button
          onClick={() => setShowAddMember(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Add Team Member
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      ) : teamMembers.length === 0 ? (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Team Members Yet</h3>
          <p className="text-gray-600 mb-6">Add professionals and suppliers to your project team</p>
          <button
            onClick={() => setShowAddMember(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all"
          >
            Add First Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{member.name}</h4>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(member.role)}`}>
                    {member.role}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {member.status === 'active' ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-yellow-500" />
                  )}
                  <button
                    onClick={() => handleDeleteMember(member.id!)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{member.email}</span>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <span>{member.phone}</span>
                  </div>
                )}
                {member.company && (
                  <div className="text-xs text-gray-500">{member.company}</div>
                )}
              </div>

              <div className="mt-3 pt-3 border-t">
                <p className="text-xs font-medium mb-2">Permissions:</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {Object.entries(member.permissions).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleUpdatePermissions(member.id!, {
                          ...member.permissions,
                          [key]: e.target.checked
                        })}
                        className="w-3 h-3"
                      />
                      <span className="capitalize">{key}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add Team Member</h2>
              <button onClick={() => setShowAddMember(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="manager">Manager</option>
                    <option value="engineer">Engineer</option>
                    <option value="architect">Architect</option>
                    <option value="accountant">Accountant</option>
                    <option value="contractor">Contractor</option>
                    <option value="supplier">Supplier</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="professional">Professional</option>
                    <option value="supplier">Supplier</option>
                    <option value="internal">Internal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Specialization</label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Structural Engineering, Electrical Systems"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Permissions</label>
                <div className="space-y-2">
                  {Object.entries(formData.permissions).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setFormData({
                          ...formData,
                          permissions: {
                            ...formData.permissions,
                            [key]: e.target.checked
                          }
                        })}
                        className="w-4 h-4"
                      />
                      <span className="capitalize">{key} Access</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Member'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
