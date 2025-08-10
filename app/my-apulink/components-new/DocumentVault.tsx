'use client';

import React, { useState, useEffect } from 'react';
import { documentService, Document } from '../../../lib/firebase/firestore-service';
import { FileText, Download, Trash2, Eye, Upload, FolderOpen, Search } from 'lucide-react';
import DocumentUpload from '../components/DocumentUpload';

interface DocumentVaultProps {
  projectId: string;
  userId: string;
}

export default function DocumentVault({ projectId, userId }: DocumentVaultProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All Categories');

  useEffect(() => {
    if (!projectId) return;

    // Subscribe to documents using the new subcollection structure
    const unsubscribe = documentService.subscribeToDocuments(
      projectId,
      (docs) => {
        setDocuments(docs);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  const handleDelete = async (documentId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      try {
        await documentService.deleteDocument(projectId, documentId);
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Failed to delete document');
      }
    }
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('sheet') || fileType.includes('excel')) return '📊';
    if (fileType.includes('doc')) return '📝';
    return '📎';
  };

  // Filter documents based on search and folder
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'All Categories' || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  // Get unique folders
  const folders = ['All Categories', ...new Set(documents.map(doc => doc.folder))];

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Document Vault</h3>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Document Vault</h3>
          <button
            onClick={() => setShowUpload(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {folders.map(folder => (
              <option key={folder} value={folder}>{folder}</option>
            ))}
          </select>
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedFolder !== 'All Categories' 
                ? 'No documents found matching your criteria' 
                : 'No documents uploaded yet'}
            </p>
            {!searchTerm && selectedFolder === 'All Categories' && (
              <button
                onClick={() => setShowUpload(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Upload First Document
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{getFileIcon(doc.fileType)}</div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                      onClick={() => handleDownload(doc.fileUrl, doc.name)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => window.open(doc.fileUrl, '_blank')}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="View"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id!)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                
                <h4 className="font-medium text-sm mb-1 truncate" title={doc.name}>
                  {doc.name}
                </h4>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex items-center gap-1">
                    <FolderOpen className="w-3 h-3" />
                    <span>{doc.folder}</span>
                  </div>
                  <div>{formatFileSize(doc.fileSize)}</div>
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-2">
                      {doc.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                      {doc.tags.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{doc.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-gray-400 mt-2">
                  v{doc.version} • {new Date(doc.createdAt?.seconds * 1000).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <DocumentUpload
          projectId={projectId}
          onClose={() => setShowUpload(false)}
          onUploaded={() => {
            setShowUpload(false);
            // Documents will auto-refresh via subscription
          }}
        />
      )}
    </>
  );
}
