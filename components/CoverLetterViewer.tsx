'use client';

import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface CoverLetterViewerProps {
  documentId: number;
  onClose: () => void;
}

export default function CoverLetterViewer({ documentId, onClose }: CoverLetterViewerProps) {
  const [coverLetter, setCoverLetter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cover-letters/${documentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cover letter');
        }

        const data = await response.json();
        setCoverLetter(data.data);
      } catch (err) {
        setError('Failed to load cover letter');
        console.error('Error fetching cover letter:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoverLetter();
  }, [documentId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const content = `
${coverLetter?.data?.full_name || 'Your Name'}
${coverLetter?.data?.email || 'your.email@example.com'}
${coverLetter?.data?.phone || ''}
${coverLetter?.data?.address || ''}

${coverLetter?.data?.date || new Date().toLocaleDateString()}

${coverLetter?.data?.hiring_manager || 'Hiring Manager'}
${coverLetter?.data?.company_name || 'Company Name'}
Re: ${coverLetter?.data?.position_title || 'Position Title'}

${coverLetter?.data?.content || 'Cover letter content'}
    `;
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${coverLetter?.data?.company_name || 'document'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <LoadingSpinner text="Loading cover letter..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={onClose}
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!coverLetter) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Cover Letter</h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Print
            </button>
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Download
            </button>
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="p-8">
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {coverLetter.data.full_name}
                </h3>
                <div className="text-gray-600 space-y-1">
                  <p>{coverLetter.data.email}</p>
                  {coverLetter.data.phone && <p>{coverLetter.data.phone}</p>}
                  {coverLetter.data.address && <p>{coverLetter.data.address}</p>}
                </div>
              </div>
              <div className="text-right text-gray-600">
                <p>{coverLetter.data.date || new Date(coverLetter.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Recipient Section */}
            <div className="mb-8">
              {coverLetter.data.hiring_manager && (
                <p className="text-gray-900 font-medium">{coverLetter.data.hiring_manager}</p>
              )}
              {coverLetter.data.company_name && (
                <p className="text-gray-900 font-medium">{coverLetter.data.company_name}</p>
              )}
              {coverLetter.data.position_title && (
                <p className="text-gray-600 mt-2">Re: {coverLetter.data.position_title}</p>
              )}
            </div>

            {/* Content Section */}
            <div className="prose prose-gray max-w-none">
              <div className="whitespace-pre-line leading-relaxed text-gray-900">
                {coverLetter.data.content || 'No content available.'}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Created: {new Date(coverLetter.created_at).toLocaleDateString()}</span>
                <span>Last updated: {new Date(coverLetter.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
