'use client';

import { useState, useEffect } from 'react';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
  resumeId: string | null;
  formData?: any;
}

export default function ResumeViewer({ isOpen, onClose, resumeId, formData }: ResumeViewerProps) {
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && resumeId && !formData) {
      fetchResume();
    } else if (isOpen && formData) {
      setResume({ data: formData });
    }
  }, [isOpen, resumeId, formData]);

  const fetchResume = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resumes/${resumeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setResume(data);
      } else {
        setError('Failed to load resume');
      }
    } catch (err) {
      setError('Error loading resume');
      console.error('Error fetching resume:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const resumeData = resume?.data || {};

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Resume Preview
              </h3>
              <button
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-3 text-gray-600">Loading resume...</span>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {!loading && !error && (
              <div className="bg-white p-8 max-w-4xl mx-auto border rounded-lg">
                {/* Header Section */}
                <div className="text-center border-b-2 border-gray-200 pb-6 mb-6">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {resumeData.full_name || 'Your Name'}
                  </h1>
                  <div className="flex justify-center items-center space-x-6 text-gray-600 text-sm">
                    {resumeData.email && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {resumeData.email}
                      </div>
                    )}
                    {resumeData.phone && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        {resumeData.phone}
                      </div>
                    )}
                    {resumeData.location && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {resumeData.location}
                      </div>
                    )}
                  </div>
                  {resumeData.linkedin && (
                    <div className="mt-2">
                      <a href={resumeData.linkedin} className="text-blue-600 hover:text-blue-800 text-sm">
                        {resumeData.linkedin}
                      </a>
                    </div>
                  )}
                </div>

                {/* Professional Summary */}
                {resumeData.summary && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {resumeData.summary}
                    </p>
                  </div>
                )}

                {/* Work Experience */}
                {resumeData.employment && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                      Professional Experience
                    </h2>
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {resumeData.employment}
                    </div>
                  </div>
                )}

                {/* Education */}
                {resumeData.education && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                      Education
                    </h2>
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {resumeData.education}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {(resumeData.skills || resumeData.technical_skills || resumeData.soft_skills) && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                      Skills & Competencies
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {resumeData.technical_skills && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Technical Skills</h3>
                          <div className="text-gray-700 whitespace-pre-line">
                            {resumeData.technical_skills}
                          </div>
                        </div>
                      )}
                      {resumeData.soft_skills && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Soft Skills</h3>
                          <div className="text-gray-700 whitespace-pre-line">
                            {resumeData.soft_skills}
                          </div>
                        </div>
                      )}
                      {resumeData.skills && !resumeData.technical_skills && !resumeData.soft_skills && (
                        <div className="md:col-span-2">
                          <div className="text-gray-700 whitespace-pre-line">
                            {resumeData.skills}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {resumeData.languages && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                      Languages
                    </h2>
                    <p className="text-gray-700">
                      {resumeData.languages}
                    </p>
                  </div>
                )}

                {/* Additional Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {resumeData.certifications && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                        Certifications & Awards
                      </h2>
                      <div className="text-gray-700 whitespace-pre-line text-sm">
                        {resumeData.certifications}
                      </div>
                    </div>
                  )}

                  {resumeData.projects && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                        Notable Projects
                      </h2>
                      <div className="text-gray-700 whitespace-pre-line text-sm">
                        {resumeData.projects}
                      </div>
                    </div>
                  )}

                  {resumeData.volunteer && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                        Volunteer Experience
                      </h2>
                      <div className="text-gray-700 whitespace-pre-line text-sm">
                        {resumeData.volunteer}
                      </div>
                    </div>
                  )}

                  {resumeData.interests && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                        Interests & Hobbies
                      </h2>
                      <p className="text-gray-700 text-sm">
                        {resumeData.interests}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Print Resume
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
