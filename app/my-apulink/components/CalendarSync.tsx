'use client';

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Download, Link, Loader2, Check, AlertCircle } from 'lucide-react';
import { milestoneService } from '../../../lib/firebase/firestore-service';
import type { Milestone } from '../../../lib/firebase/firestore-service';

interface CalendarSyncProps {
  projectId: string;
  projectName: string;
}

export default function CalendarSync({ projectId, projectName }: CalendarSyncProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadMilestones();
  }, [projectId]);

  const loadMilestones = async () => {
    const projectMilestones = await milestoneService.getProjectMilestones(projectId);
    setMilestones(projectMilestones);
  };

  const generateICS = () => {
    const icsEvents = milestones.map(milestone => {
      const startDate = new Date(milestone.startDate).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      const endDate = new Date(milestone.endDate).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      
      return `BEGIN:VEVENT
UID:${milestone.id}@apulink.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z
DTSTART:${startDate}Z
DTEND:${endDate}Z
SUMMARY:${milestone.title} - ${projectName}
DESCRIPTION:${milestone.description}\\nStatus: ${milestone.status}\\nProgress: ${milestone.progress}%
STATUS:CONFIRMED
END:VEVENT`;
    }).join('\n');

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apulink//Project Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${projectName} - Apulink
X-WR-TIMEZONE:Europe/Rome
${icsEvents}
END:VCALENDAR`;

    return icsContent;
  };

  const downloadICS = () => {
    const icsContent = generateICS();
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName.replace(/\s+/g, '_')}_calendar.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const syncWithGoogle = async () => {
    setSyncing(true);
    setSyncStatus('idle');
    
    try {
      // Generate calendar URL for subscription
      const calendarUrl = `webcal://apulink.com/api/calendar/${projectId}/feed.ics`;
      
      // For Google Calendar, we'll open the add calendar page
      const googleCalendarUrl = `https://calendar.google.com/calendar/u/0/r/settings/addbyurl?url=${encodeURIComponent(calendarUrl)}`;
      window.open(googleCalendarUrl, '_blank');
      
      setSyncStatus('success');
    } catch (error) {
      console.error('Error syncing with Google:', error);
      setSyncStatus('error');
    } finally {
      setSyncing(false);
    }
  };

  const getSubscriptionUrl = () => {
    return `webcal://apulink.com/api/calendar/${projectId}/feed.ics`;
  };

  const copySubscriptionUrl = () => {
    navigator.clipboard.writeText(getSubscriptionUrl());
    setSyncStatus('success');
    setTimeout(() => setSyncStatus('idle'), 3000);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50">
      <div className="flex items-center gap-3 mb-6">
        <CalendarIcon className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold">Calendar Integration</h3>
      </div>

      <div className="space-y-4">
        {/* Download ICS */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Download Calendar File</h4>
          <p className="text-sm text-gray-600 mb-3">
            Download an .ics file with all project milestones to import into your calendar app.
          </p>
          <button
            onClick={downloadICS}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Download .ics File
          </button>
        </div>

        {/* Google Calendar Sync */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium mb-2">Sync with Google Calendar</h4>
          <p className="text-sm text-gray-600 mb-3">
            Add this project calendar to your Google Calendar for automatic updates.
          </p>
          <button
            onClick={syncWithGoogle}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {syncing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <CalendarIcon className="w-4 h-4" />
                Add to Google Calendar
              </>
            )}
          </button>
        </div>

        {/* Subscription URL */}
        <div className="p-4 bg-purple-50 rounded-lg">
          <h4 className="font-medium mb-2">Calendar Subscription URL</h4>
          <p className="text-sm text-gray-600 mb-3">
            Subscribe to this calendar URL for live updates in any calendar app.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={getSubscriptionUrl()}
              className="flex-1 px-3 py-2 bg-white border rounded-lg text-sm"
            />
            <button
              onClick={copySubscriptionUrl}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Link className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {syncStatus === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-green-100 text-green-700 rounded-lg">
            <Check className="w-4 h-4" />
            <span className="text-sm">Successfully synced!</span>
          </div>
        )}
        
        {syncStatus === 'error' && (
          <div className="flex items-center gap-2 p-3 bg-red-100 text-red-700 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Sync failed. Please try again.</span>
          </div>
        )}

        {/* Milestone Count */}
        <div className="text-sm text-gray-500 text-center">
          {milestones.length} milestones will be synced to your calendar
        </div>
      </div>
    </div>
  );
}
