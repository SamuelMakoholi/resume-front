'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import LoadingSpinner from '../../../../../components/LoadingSpinner';
import { templates } from '../../../../lib/templates';
import { ResumeData } from '../../../../lib/types';

interface User {
  id: number;
  name: string;
  email: string;
  subscription: 'free' | 'premium' | 'expired';
}

interface Resume {
  id: number;
  template_id: number;
  data: ResumeData & { template?: string; fontFamily?: string };
  created_at: string;
  updated_at: string;
}

export default function ViewResumePage() {
  const [user, setUser] = useState<User | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const resumeId = params.id as string;

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        try {
          const userData = JSON.parse(storedUser);
          if (!userData.subscription) {
            userData.subscription = 'free';
          }
          setUser(userData);
          fetchResume();
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    };

    const fetchResume = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        
        const response = await fetch(`${apiUrl}/api/resumes/${resumeId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch resume');
        }

        const result = await response.json();
        if (result.success) {
          setResume(result.data);
        } else {
          throw new Error(result.message || 'Failed to load resume');
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
        alert('Failed to load resume. Please try again.');
        router.push('/dashboard/resumes');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, resumeId]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading resume..." size="large" />
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resume not found</h1>
          <button
            onClick={() => router.push('/dashboard/resumes')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Resumes
          </button>
        </div>
      </div>
    );
  }

  // Get template component
  const templateId = resume.data.template || 'classic';
  const template = templates.find(t => t.id === templateId);
  const TemplateComponent = template?.component;
  const fontFamily = resume.data.fontFamily || 'Georgia, serif';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => router.back()}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold">View Resume</h1>
              <p className="text-gray-300 text-sm">
                {resume.data.personal?.firstName} {resume.data.personal?.lastName}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push(`/dashboard/resumes/edit/${resume.id}`)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Edit Resume
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      </header>

      {/* Resume Content */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {TemplateComponent ? (
              <div className="p-8">
                <TemplateComponent data={resume.data} fontFamily={fontFamily} />
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">Resume template not found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
