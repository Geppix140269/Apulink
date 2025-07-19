// app/admin/layout.tsx
// Admin layout component - wraps all admin pages with consistent navigation

import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">APULINK Admin</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Admin User</span>
              <button className="text-sm text-red-600 hover:text-red-700">Logout</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
