// Path: app/my-apulink/components/DocumentUpload.tsx
// Document upload component with multi-file support, progress, and cancel - FIXED FOR SUBCOLLECTIONS

'use client';

import React, { useState, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, UploadTask } from 'firebase/storage';
import { storage } from '../../../lib/firebase/config';
import { documentService } from '../../../lib/firebase/firestore-service';
import { Upload, X, FileText, Image, FileSpreadsheet, File, FolderOpen } from 'lucide-react';
import UploadQueueItem from './UploadQueueItem';
import { useAuth } from '../../contexts/AuthContext';

interface DocumentUploadProps {
  projectId: string;
  onClose: () => void;
  onUploaded: () => void;
}

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error' | 'cancelled';
  error?: string;
  uploadTask?: UploadTask;
}

export default function DocumentUpload({ projectId, onClose, onUploaded }: DocumentUploadProps) {
  const { user } = useAuth();
  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('General');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTasksRef = useRef<Map<string, UploadTask>>(new Map());

  const folders = [
    'Permits & Approvals',
    'Contracts & Legal',
    'Technical Drawings',
    'Financial Documents',
    'Photos & Progress',
    'Reports & Studies',
    'Correspondence',
    'Invoices & Receipts',
    'General'
  ];

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newItems: UploadItem[] = Array.from(files).map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      progress: 0,
      status: 'pending' as const
    }));

    setUploadQueue(prev => [...prev, ...newItems]);
    
    // Start uploads
    newItems.forEach(item => uploadFile(item));
  };

  const uploadFile = async (item: UploadItem) => {
    try {
      // Update status to uploading
      setUploadQueue(prev => prev.map(q => 
        q.id === item.id ? { ...q, status: 'uploading' } : q
      ));

      // Create storage reference
      const timestamp = Date.now();
      const fileName = `${timestamp}_${item.file.name}`;
      const storagePath = `projects/${projectId}/${selectedFolder}/${fileName}`;
      const storageRef = ref(storage, storagePath);

      // Create upload task
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTasksRef.current.set(item.id, uploadTask);

      // Update upload queue with task
      setUploadQueue(prev => prev.map(q => 
        q.id === item.id ? { ...q, uploadTask } : q
      ));

      // Monitor upload progress
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadQueue(prev => prev.map(q => 
            q.id === item.id ? { ...q, progress } : q
          ));
        },
        (error) => {
          // Handle error
          console.error('Upload error:', error);
          let errorMessage = 'Upload failed';
          
          if (error.code === 'storage/canceled') {
            setUploadQueue(prev => prev.map(q => 
              q.id === item.id ? { ...q, status: 'cancelled', error: 'Upload cancelled' } : q
            ));
          } else {
            setUploadQueue(prev => prev.map(q => 
              q.id === item.id ? { ...q, status: 'error', error: errorMessage } : q
            ));
          }
          uploadTasksRef.current.delete(item.id);
        },
        async () => {
          // Upload completed successfully
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            // Save document metadata to Firestore
            console.log('Uploading document to project:', projectId);
            await documentService.createDocument(projectId, {
              name: item.file.name,
              folder: selectedFolder,
              storagePath,
              fileUrl: downloadURL,
              fileType: item.file.type || 'application/octet-stream',
              fileSize: item.file.size,
              tags: tags,
              uploadedBy: user?.uid || 'unknown',
              version: 1
            });

            setUploadQueue(prev => prev.map(q => 
              q.id === item.id ? { ...q, status: 'success', progress: 100 } : q
            ));
            uploadTasksRef.current.delete(item.id);
            
            // Call onUploaded when at least one file succeeds
            onUploaded();
          } catch (error) {
            console.error('Error saving document metadata:', error);
            setUploadQueue(prev => prev.map(q => 
              q.id === item.id ? { ...q, status: 'error', error: 'Failed to save document' } : q
            ));
            uploadTasksRef.current.delete(item.id);
          }
        }
      );
    } catch (error) {
      console.error('Error starting upload:', error);
      setUploadQueue(prev => prev.map(q => 
        q.id === item.id ? { ...q, status: 'error', error: 'Failed to start upload' } : q
      ));
    }
  };

  const handleCancelUpload = (itemId: string) => {
    const task = uploadTasksRef.current.get(itemId);
    if (task) {
      task.cancel();
      uploadTasksRef.current.delete(itemId);
    }
    setUploadQueue(prev => prev.filter(q => q.id !== itemId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleClose = () => {
    // Cancel all active uploads
    uploadTasksRef.current.forEach(task => task.cancel());
    uploadTasksRef.current.clear();
    onClose();
  };

  const activeUploads = uploadQueue.filter(q => q.status === 'uploading' || q.status === 'pending').length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upload Documents</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Folder Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Folder</label>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            {folders.map(folder => (
              <option key={folder} value={folder}>{folder}</option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tags (Optional)</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Add a tag..."
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Tag
            </button>
          </div>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">Drag and drop files here, or</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Files
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Support for all file types. Multiple files allowed.
          </p>
        </div>

        {/* Upload Queue */}
        {uploadQueue.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">
                Upload Queue ({uploadQueue.length} {uploadQueue.length === 1 ? 'file' : 'files'})
              </h3>
              {activeUploads > 0 && (
                <span className="text-sm text-blue-600">
                  {activeUploads} active
                </span>
              )}
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {uploadQueue.map(item => (
                <UploadQueueItem
                  key={item.id}
                  file={item.file}
                  progress={item.progress}
                  status={item.status}
                  error={item.error}
                  uploadTask={item.uploadTask}
                  onCancel={() => handleCancelUpload(item.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            {activeUploads > 0 ? 'Cancel All & Close' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}


