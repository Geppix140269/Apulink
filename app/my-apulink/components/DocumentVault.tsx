// app/my-apulink/components/DocumentVault.tsx
// Document management system with proper TypeScript types

import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Users, Upload, Filter, Search, Loader2, Shield, CheckCircle } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Document {
  id: string;
  name: string;
  english_name?: string;
  type: 'contract' | 'official' | 'technical' | 'financial' | 'grant' | 'other';
  status: 'draft' | 'in-review' | 'verified' | 'signed';
  file_size: number;
  version: string;
  created_at: string;
  updated_at: string;
  project_id: string;
  uploaded_by: string;
  file_url?: string;
  shared_with?: string[];
  projects?: {
    buyer_id: string;
  };
  profiles?: {
    first_name: string;
    last_name: string;
  };
}

interface TeamMember {
  professionals: {
    first_name: string;
    last_name: string;
  };
}

interface DocumentVaultProps {
  projectId?: string;
  userId?: string;
}

export default function DocumentVault({ projectId, userId }: DocumentVaultProps) {
  const supabase = createClientComponentClient();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, [projectId, userId]);

  async function loadDocuments() {
    try {
      setLoading(true);
      
      // Get current user if not provided
      let currentUserId = userId;
      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        currentUserId = user.id;
      }

      // Build query
      let query = supabase
        .from('documents')
        .select(`
          *,
          projects!inner (
            buyer_id
          ),
          profiles:uploaded_by (
            first_name,
            last_name
          )
        `);

      // Filter by project if provided
      if (projectId) {
        query = query.eq('project_id', projectId);
      } else {
        // Get all documents for user's projects
        query = query.eq('projects.buyer_id', currentUserId);
      }

      const { data: docs, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading documents:', error);
        return;
      }

      // Process documents to add shared_with information
      const processedDocs = await Promise.all(
        (docs || []).map(async (doc) => {
          // Get team members who have access
          const { data: teamAccess, error: teamError } = await supabase
            .from('project_team')
            .select(`
              professionals!inner (
                first_name,
                last_name
              )
            `)
            .eq('project_id', doc.project_id)
            .eq('status', 'active');

          if (teamError) {
            console.error('Error fetching team access:', teamError);
            return { ...doc, shared_with: [] };
          }

          // Explicitly type the teamAccess data
          const typedTeamAccess = teamAccess as TeamMember[] | null;
          
          const sharedWith = typedTeamAccess?.map(
            (member: TeamMember) => `${member.professionals.first_name} ${member.professionals.last_name}`
          ) || [];

          return {
            ...doc,
            shared_with: sharedWith
          };
        })
      );

      setDocuments(processedDocs);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${user.id}/${projectId || 'general'}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return;
      }

      // Create document record
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          name: file.name,
          type: determineDocType(file.name),
          status: 'draft',
          file_size: file.size,
          version: 'v1',
          project_id: projectId,
          uploaded_by: user.id,
          file_url: filePath
        });

      if (dbError) {
        console.error('Database error:', dbError);
        return;
      }

      // Reload documents
      await loadDocuments();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  }

  function determineDocType(fileName: string): Document['type'] {
    const name = fileName.toLowerCase();
    if (name.includes('contract') || name.includes('agreement')) return 'contract';
    if (name.includes('permit') || name.includes('license')) return 'official';
    if (name.includes('plan') || name.includes('technical')) return 'technical';
    if (name.includes('invoice') || name.includes('budget')) return 'financial';
    if (name.includes('grant') || name.includes('pia')) return 'grant';
    return 'other';
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function getDocumentIcon(type: Document['type']) {
    const colors = {
      contract: 'bg-blue-100',
      official: 'bg-indigo-100',
      technical: 'bg-orange-100',
      financial: 'bg-green-100',
      grant: 'bg-purple-100',
      other: 'bg-gray-100'
    };
    return colors[type] || colors.other;
  }

  function getStatusBadge(status: Document['status']) {
    const styles = {
      draft: 'bg-gray-100 text-gray-700',
      'in-review': 'bg-yellow-100 text-yellow-700',
      verified: 'bg-green-100 text-green-700',
      signed: 'bg-green-100 text-green-700'
    };
    return styles[status] || styles.draft;
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.type === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.english_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Upload */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2">
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            Upload Document
          </div>
        </label>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'contract', 'official', 'technical', 'financial', 'grant'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm capitalize ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All Documents' : category}
          </button>
        ))}
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getDocumentIcon(doc.type)}`}>
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900">{doc.english_name || doc.name}</h4>
                {doc.english_name && (
                  <p className="text-sm text-gray-500">{doc.name}</p>
                )}
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className={`px-2 py-1 rounded-full ${getStatusBadge(doc.status)}`}>
                    {doc.status === 'verified' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                    {doc.status}
                  </span>
                  <span className="text-gray-500">{doc.version}</span>
                  <span className="text-gray-500">{formatFileSize(doc.file_size)}</span>
                  <span className="text-gray-500">
                    {new Date(doc.created_at).toLocaleDateString()}
                  </span>
                </div>
                {doc.shared_with && doc.shared_with.length > 0 && (
                  <div className="mt-2 flex items-center gap-1">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      Shared with: {doc.shared_with.slice(0, 2).join(', ')}
                      {doc.shared_with.length > 2 && ` +${doc.shared_with.length - 2} more`}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-700">{documents.length}</p>
            <p className="text-sm text-gray-600">Total Documents</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-700">
              {documents.filter(d => d.status === 'verified' || d.status === 'signed').length}
            </p>
            <p className="text-sm text-gray-600">Verified</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-700">
              {documents.filter(d => d.status === 'in-review').length}
            </p>
            <p className="text-sm text-gray-600">In Review</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-indigo-700">
              {formatFileSize(documents.reduce((sum, d) => sum + d.file_size, 0))}
            </p>
            <p className="text-sm text-gray-600">Total Size</p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900">Bank-Level Security</p>
          <p className="text-sm text-blue-700 mt-1">
            All documents are encrypted and stored securely. Only authorized team members have access.
          </p>
        </div>
      </div>
    </div>
  );
}
