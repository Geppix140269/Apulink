'use client';

import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase/config';
import { Send, Paperclip, MessageSquare, User, Calendar } from 'lucide-react';

interface Message {
  id?: string;
  projectId: string;
  userId: string;
  userName: string;
  message: string;
  attachments?: string[];
  createdAt: Date;
  readBy: string[];
  replyTo?: string;
}

interface ProjectMessagesProps {
  projectId: string;
  userId: string;
  userName: string;
}

export default function ProjectMessages({ projectId, userId, userName }: ProjectMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'projectMessages'),
      where('projectId', '==', projectId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      } as Message));
      setMessages(msgs);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [projectId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'projectMessages'), {
        projectId,
        userId,
        userName,
        message: newMessage,
        createdAt: Timestamp.now(),
        readBy: [userId]
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    if (!date) return '';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3">
        <MessageSquare className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold">Project Discussion</h3>
        <span className="text-sm text-gray-500 ml-auto">{messages.length} messages</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.userId === userId ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${
                msg.userId === userId 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'bg-gray-100'
              } rounded-lg p-3`}>
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3 h-3" />
                  <span className="text-xs font-medium">
                    {msg.userId === userId ? 'You' : msg.userName}
                  </span>
                  <span className={`text-xs ${
                    msg.userId === userId ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Attach file"
        >
          <Paperclip className="w-5 h-5 text-gray-500" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !newMessage.trim()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
