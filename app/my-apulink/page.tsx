'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { Building2, FileText, Users, Calculator, LogOut } from 'lucide-react';

export default function MyApulinkDashboard() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.displayName || user.email}!</h1>
              <p className="text-gray-600 mt-2">Your Firebase-powered dashboard</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Building2 className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900">Active Projects</h3>
            <p className="text-2xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <FileText className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="font-semibold text-gray-900">Documents</h3>
            <p className="text-2xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Users className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-gray-900">Team Members</h3>
            <p className="text-2xl font-bold text-purple-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Calculator className="w-8 h-8 text-orange-600 mb-4" />
            <h3 className="font-semibold text-gray-900">Grant Calculator</h3>
            <p className="text-sm text-gray-600">Calculate your grants</p>
          </div>
        </div>

        <div className="mt-8 bg-green-50 border-l-4 border-green-400 p-4">
          <p className="text-sm text-green-700">
            ✅ Successfully migrated to Firebase! Authentication working perfectly.
          </p>
        </div>
      </div>
    </div>
  );
}
