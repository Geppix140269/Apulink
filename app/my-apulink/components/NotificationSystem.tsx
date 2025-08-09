'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase/config';
import { Bell, Calendar, AlertCircle, CheckCircle, Clock, Users, FileText, Euro, X } from 'lucide-react';

interface Notification {
  id?: string;
  userId: string;
  projectId?: string;
  type: 'deadline' | 'budget' | 'milestone' | 'document' | 'team' | 'message' | 'system';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

interface NotificationSystemProps {
  userId: string;
  onClose?: () => void;
}

export default function NotificationSystem({ userId, onClose }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      } as Notification));
      setNotifications(notifs);
      setLoading(false);
    });

    // Check for upcoming deadlines
    checkUpcomingDeadlines();

    return () => unsubscribe();
  }, [userId]);

  const checkUpcomingDeadlines = async () => {
    // This should run periodically (could be a Cloud Function)
    // For now, we'll check milestones and create notifications
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);

    // Check milestones approaching deadline
    // This would query milestones and create notifications
  };

  const markAsRead = async (notificationId: string) => {
    await updateDoc(doc(db, 'notifications', notificationId), {
      read: true
    });
  };

  const markAllAsRead = async () => {
    const unreadNotifs = notifications.filter(n => !n.read);
    for (const notif of unreadNotifs) {
      if (notif.id) {
        await markAsRead(notif.id);
      }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'deadline': return <Calendar className="w-5 h-5" />;
      case 'budget': return <Euro className="w-5 h-5" />;
      case 'milestone': return <CheckCircle className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'team': return <Users className="w-5 h-5" />;
      case 'message': return <Bell className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed right-4 top-20 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-purple-600 hover:text-purple-700"
            >
              Mark all read
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-2 border-b flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-sm rounded-lg ${
            filter === 'all' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1 text-sm rounded-lg ${
            filter === 'unread' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No notifications</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => notif.id && markAsRead(notif.id)}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                !notif.read ? 'bg-blue-50/50' : ''
              }`}
            >
              <div className="flex gap-3">
                <div className={`p-2 rounded-lg ${getPriorityColor(notif.priority)}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{notif.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : 'Just now'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Helper function to create notifications (use in other components)
export async function createNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) {
  await addDoc(collection(db, 'notifications'), {
    ...notification,
    read: false,
    createdAt: Timestamp.now()
  });
}
