// Path: app/my-apulink/components/UploadQueueItem.tsx
// Individual upload item component with progress and cancel

import React from 'react';
import { X, FileIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { UploadTask } from 'firebase/storage';

interface UploadQueueItemProps {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error' | 'cancelled';
  error?: string;
  uploadTask?: UploadTask;
  onCancel: () => void;
}

export default function UploadQueueItem({
  file,
  progress,
  status,
  error,
  uploadTask,
  onCancel
}: UploadQueueItemProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Loader2 className="w-4 h-4 text-gray-400" />;
      case 'uploading':
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'cancelled':
        return <X className="w-4 h-4 text-gray-400" />;
      default:
        return <FileIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Waiting...';
      case 'uploading':
        return `Uploading ${progress}%`;
      case 'success':
        return 'Uploaded';
      case 'error':
        return error || 'Upload failed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return '';
    }
  };

  const handleCancel = () => {
    if (uploadTask && status === 'uploading') {
      uploadTask.cancel();
    }
    onCancel();
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
      <div className="flex-shrink-0">
        {getStatusIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <span className="text-xs text-gray-500 ml-2">{formatFileSize(file.size)}</span>
        </div>
        
        {status === 'uploading' && (
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        <p className={`text-xs ${
          status === 'error' ? 'text-red-600' : 
          status === 'success' ? 'text-green-600' : 
          'text-gray-500'
        }`}>
          {getStatusText()}
        </p>
      </div>
      
      {(status === 'pending' || status === 'uploading') && (
        <button
          onClick={handleCancel}
          className="flex-shrink-0 p-1 hover:bg-gray-100 rounded"
          title="Cancel upload"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      )}
    </div>
  );
}
