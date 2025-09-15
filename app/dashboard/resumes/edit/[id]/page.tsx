'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import LoadingSpinner from '../../../../../components/LoadingSpinner';
import ResumeForm from '../../../../../components/ResumeForm';
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

const fontOptions = [
  { value: 'Georgia, serif', label: 'Georgia (Serif)' },
  { value: 'Times New Roman, serif', label: 'Times New Roman (Serif)' },
  { value: 'Arial, sans-serif', label: 'Arial (Sans-serif)' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica (Sans-serif)' },
  { value: 'Inter, sans-serif', label: 'Inter (Sans-serif)' },
  { value: 'Poppins, sans-serif', label: 'Poppins (Sans-serif)' },
  { value: 'Calibri, sans-serif', label: 'Calibri (Sans-serif)' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans (Sans-serif)' },
  { value: 'Roboto, sans-serif', label: 'Roboto (Sans-serif)' }
];

export default function EditResumePage() {
  const [user, setUser] = useState<User | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('classic');
  const [selectedFont, setSelectedFont] = useState<string>('Georgia, serif');
  const [formData, setFormData] = useState<ResumeData>({
    personal: { firstName: '', lastName: '', title: '', email: '', phone: '', website: '' },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    achievements: [],
    languages: [],
    references: [],
  });
  
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
          
          // Set form data from loaded resume
          const resumeData = result.data;
          setFormData(resumeData.data);
          setSelectedTemplate(resumeData.data.template || 'classic');
          setSelectedFont(resumeData.data.fontFamily || 'Georgia, serif');
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

  // Map frontend template IDs to backend template IDs
  const getBackendTemplateId = (frontendTemplateId: string): number => {
    const templateMapping: { [key: string]: number } = {
      'classic': 1,    // Classic Resume
      'modern': 2,     // Modern Resume
      'executive': 3,  // Executive Resume
      'creative': 4,   // Creative Resume
      'software-developer': 5, // Software Developer Resume
    };
    return templateMapping[frontendTemplateId] || 1;
  };

  const handleFormSubmit = async (data: ResumeData) => {
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const fullUrl = `${apiUrl}/api/resumes/${resumeId}`;
      
      console.log('Updating resume at:', fullUrl);
      
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }
      
      const requestBody = {
        template_id: getBackendTemplateId(selectedTemplate),
        data: {
          ...data,
          template: selectedTemplate,
          fontFamily: selectedFont
        }
      };
      
      const response = await fetch(fullUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('Response result:', result);

      if (result.success) {
        alert('Resume updated successfully!');
        router.push('/dashboard/resumes');
      } else {
        console.error('Update failed:', result);
        alert(result.message || 'Failed to update resume. Please try again.');
      }
    } catch (error) {
      console.error('Error updating resume:', error);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        alert('Connection error: Unable to reach the server. Please check:\n1. Your internet connection\n2. If the server is running\n3. If the API URL is correct');
      } else {
        alert(`Failed to update resume: ${error instanceof Error ? error.message : String(error)}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

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

  const template = templates.find(t => t.id === selectedTemplate);
  const TemplateComponent = template?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Black Header */}
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
              <h1 className="text-2xl font-bold">Edit Resume</h1>
              <p className="text-gray-300 text-sm">
                {formData.personal?.firstName} {formData.personal?.lastName}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-300">Template:</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-300">Font:</label>
              <select
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
                className="bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {fontOptions.map(font => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Editor */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Form Panel */}
        <div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Resume Information</h2>
            <p className="text-gray-600">Edit your resume details below</p>
          </div>
          <ResumeForm 
            formData={formData} 
            onDataChange={setFormData} 
            onSubmit={handleFormSubmit} 
            isLoading={isSaving}
          />
        </div>

        {/* Preview Panel */}
        <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'w-1/2'} bg-gray-50 overflow-y-auto p-6`}>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Live Preview</h2>
                <p className="text-gray-600 text-sm">See your resume update in real-time</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zM10 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 10 .5zm.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {TemplateComponent ? (
              <div className="p-6">
                <style jsx global>{`
                  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap');
                `}</style>
                <TemplateComponent data={formData} fontFamily={selectedFont} />
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">Select a template to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
