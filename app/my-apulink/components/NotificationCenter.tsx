// app/my-apulink/components/NotificationCenter.tsx
import React, { useState, useEffect } from 'react';
import { 
  Bell, MessageSquare, Info, CheckCircle, AlertCircle, 
  X, Check, CheckCheck, Clock, Users, FileText, 
  TrendingUp, Calendar, Loader2, Archive, Trash2
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Notification {
  id: string;
  user_id: string;
  type: 'message' | 'update' | 'milestone' | 'alert' | 'team' | 'document' | 'financial';
  title: string;
  message: string;
  from?: string;
  related_id?: string;
  related_type?: 'project' | 'document' | 'inquiry' | 'milestone';
  is_read: boolean;
  is_archived: boolean;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  read_at?: string;
  action_url?: string;
  action_label?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}

export default function NotificationCenter({ isOpen, onClose, userId }: NotificationCenterProps) {
  const supabase = createClientComponentClient();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
      subscribeToNotifications();
    }
  }, [isOpen, userId]);

  async function loadNotifications() {
    try {
      setLoading(true);
      
      let currentUserId = userId;
      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        currentUserId = user.id;
      }

      let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', currentUserId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (filter === 'unread') {
        query = query.eq('is_read', false);
      } else if (filter === 'archived') {
        query = query.eq('is_archived', true);
      } else {
        query = query.eq('is_archived', false);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading notifications:', error);
        return;
      }

      setNotifications(data || []);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  }

  function subscribeToNotifications() {
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          setNotifications(prev => [payload.new as Notification, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  async function markAsRead(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ 
          is_read: true,
          read_at: new Date().toISOString()
        })
        .eq('id', notificationId);

      if (error) {
        console.error('Error marking as read:', error);
        return;
      }

      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  async function markAllAsRead() {
    try {
      const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
      
      const { error } = await supabase
        .from('notifications')
        .update({ 
          is_read: true,
          read_at: new Date().toISOString()
        })
        .in('id', unreadIds);

      if (error) {
        console.error('Error marking all as read:', error);
        return;
      }

      setNotifications(prev => 
        prev.map(n => ({ ...n, is_read: true }))
      );
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  }

  async function archiveNotification(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_archived: true })
        .eq('id', notificationId);

      if (error) {
        console.error('Error archiving:', error);
        return;
      }

      setNotifications(prev => 
        prev.filter(n => n.id !== notificationId)
      );
    } catch (error) {
      console.error('Error archiving notification:', error);
    }
  }

  async function deleteNotification(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) {
        console.error('Error deleting:', error);
        return;
      }

      setNotifications(prev => 
        prev.filter(n => n.id !== notificationId)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }

  function getNotificationIcon(type: Notification['type']) {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-4 h-4" />;
      case 'update':
        return <Info className="w-4 h-4" />;
      case 'milestone':
        return <CheckCircle className="w-4 h-4" />;
      case 'alert':
        return <AlertCircle className="w-4 h-4" />;
      case 'team':
        return <Users className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'financial':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  }

  function getNotificationColor(type: Notification['type']) {
    switch (type) {
      case 'message':
        return 'bg-blue-100 text-blue-600';
      case 'update':
        return 'bg-green-100 text-green-600';
      case 'milestone':
        return 'bg-indigo-100 text-indigo-600';
      case 'alert':
        return 'bg-orange-100 text-orange-600';
      case 'team':
        return 'bg-purple-100 text-purple-600';
      case 'document':
        return 'bg-gray-100 text-gray-600';
      case 'financial':
        return 'bg-emerald-100 text-emerald-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  function formatTime(date: string): string {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now.getTime() - notifDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return notifDate.toLocaleDateString();
  }

  const filteredNotifications = notifications.filter(notif => {
    if (selectedType !== 'all' && notif.type !== selectedType) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.is_read && !n.is_archived).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Notifications</h3>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600">{unreadCount} unread</p>
                )}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-4">
            {(['all', 'unread', 'archived'] as const).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  loadNotifications();
                }}
                className={`px-4 py-2 rounded-lg text-sm capitalize ${
                  filter === f
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                selectedType === 'all'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              All Types
            </button>
            {['message', 'update', 'milestone', 'alert', 'team', 'document', 'financial'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-full text-xs capitalize whitespace-nowrap ${
                  selectedType === type
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No notifications</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  notif.is_read 
                    ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' 
                    : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                }`}
                onClick={() => !notif.is_read && markAsRead(notif.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    getNotificationColor(notif.type)
                  }`}>
                    {getNotificationIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {notif.title || notif.from || 'System'}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                        {notif.action_url && (
                          <button className="text-xs text-blue-600 hover:text-blue-700 mt-2 font-medium">
                            {notif.action_label || 'View Details'}
                          </button>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                        notif.priority === 'high' 
                          ? 'bg-red-100 text-red-700'
                          : notif.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {notif.priority}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(notif.created_at)}
                      </span>
                      {!notif.is_read && (
                        <span className="flex items-center gap-1 text-blue-600">
                          <Check className="w-3 h-3" />
                          unread
                        </span>
                      )}
                      {notif.is_read && notif.read_at && (
                        <span className="flex items-center gap-1">
                          <CheckCheck className="w-3 h-3" />
                          read
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        archiveNotification(notif.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                      title="Archive"
                    >
                      <Archive className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notif.id);
                      }}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 flex gap-3">
          <button 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mark all as read
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
