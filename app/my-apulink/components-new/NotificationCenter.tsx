import React from 'react';
import { X } from 'lucide-react';
export default function NotificationCenter({ isOpen, onClose, notifications, onRefresh }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <p className="text-gray-600">No new notifications</p>
      </div>
    </div>
  );
}
