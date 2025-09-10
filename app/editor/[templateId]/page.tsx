'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import DynamicForm from '../../../components/DynamicForm';
import LivePreview from '../../../components/LivePreview';
import LoadingSpinner from '../../../components/LoadingSpinner';
import CoverLetterForm from '../../../components/CoverLetterForm';
import CoverLetterPreview from '../../../components/CoverLetterPreview';
import ResumeForm from '../../../components/ResumeForm';
import ResumeViewer from '../../../components/ResumeViewer';
import CoverLetterViewer from '../../../components/CoverLetterViewer';

interface User {
  id: number;
  name: string;
  email: string;
  subscription: 'free' | 'premium' | 'expired';
}

export default function Editor() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { templateId } = params;

  const [template, setTemplate] = useState<any>(null);
  const [loadingTemplate, setLoadingTemplate] = useState(true);
  const [documentData, setDocumentData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedDocumentId, setSavedDocumentId] = useState<string | null>(null);
  const [showResumeViewer, setShowResumeViewer] = useState(false);
  const searchParams = useSearchParams();
  const documentId = searchParams.get('documentId');
  const documentType = searchParams.get('type');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    if (templateId) {
      const fetchTemplate = async () => {
        try {
          setLoadingTemplate(true);
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/${templateId}`);
          const data = await response.json();
          setTemplate(data);
        } catch (error) {
          console.error('Failed to fetch template', error);
        } finally {
          setLoadingTemplate(false);
        }
      };
      fetchTemplate();
    }
  }, [templateId]);

  useEffect(() => {
    if (documentId && documentType) {
      const fetchDocument = async () => {
        const endpoint = documentType === 'resume' ? `/api/resumes/${documentId}` : `/api/cover-letters/${documentId}`;
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            }
          });
          const data = await response.json();
          setDocumentData(data.data);
          setFormData(data.data);
        } catch (error) {
          console.error('Failed to fetch document', error);
        }
      };
      fetchDocument();
    }
  }, [documentId, documentType]);

  useEffect(() => {
    if (user && template) {
      if (template.is_premium && user.subscription !== 'premium') {
        alert('You need a premium subscription to use this template.');
        router.push('/dashboard');
      }
    }
  }, [user, template, router]);

  if (isLoading || loadingTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading editor..." size="large" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!template) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Template not found.</p>
        </div>
    );
  }

  const handleSave = async (data: any) => {
    if (!template) return;

    setIsSaving(true);
    setSaveMessage('');
    
    const isEditing = !!documentId;
    const method = isEditing ? 'PUT' : 'POST';
    
    // Determine endpoint based on template type - default to resume if no type specified
    const isCoverLetter = template.type === 'cover_letter';
    let endpoint = isCoverLetter ? '/api/cover-letters' : '/api/resumes';
    
    // Debug logging
    console.log('Save Debug:', {
      templateType: template.type,
      isCoverLetter,
      endpoint,
      templateId
    });
    
    if(isEditing) {
      endpoint = `${endpoint}/${documentId}`;
    }
    
    const payload = {
      template_id: templateId,
      data,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        const responseData = await response.json();
        const docId = responseData.data?.id || responseData.id;
        setSavedDocumentId(docId);
        
        const docType = template.type?.replace('_', ' ') || 'document';
        setSaveMessage(`${docType.charAt(0).toUpperCase() + docType.slice(1)} saved successfully!`);
        // Don't redirect automatically
      } else {
        const docType = template.type?.replace('_', ' ') || 'document';
        setSaveMessage(`Failed to save ${docType}. Please try again.`);
      }
    } catch (error) {
      const docType = template.type?.replace('_', ' ') || 'document';
      console.error(`Failed to save ${docType}`, error);
      setSaveMessage(`Error saving ${docType}. Please check your connection.`);
    } finally {
      setIsSaving(false);
      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Default form fields if template doesn't have fields defined
  const defaultFields = [
    { name: 'full_name', label: 'Full Name', type: 'text' as const, placeholder: 'Enter your full name' },
    { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'Enter your email address' },
    { name: 'phone', label: 'Phone', type: 'tel' as const, placeholder: 'Enter your phone number' },
    { name: 'address', label: 'Address', type: 'text' as const, placeholder: 'Enter your address' },
    { name: 'summary', label: 'Professional Summary', type: 'textarea' as const, placeholder: 'Write a brief professional summary' },
    { name: 'experience', label: 'Work Experience', type: 'textarea' as const, placeholder: 'List your work experience' },
    { name: 'education', label: 'Education', type: 'textarea' as const, placeholder: 'List your education background' },
    { name: 'skills', label: 'Skills', type: 'textarea' as const, placeholder: 'List your skills' },
  ];

  const formFields = template.fields || defaultFields;
  const isCoverLetter = template?.type === 'cover_letter';
  const isResume = template?.type === 'resume' || !template?.type;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
              <h1 className="text-3xl font-bold text-black font-heading">
                {documentId ? 'Editing' : 'Creating'} a {template.type ? template.type.replace('_', ' ') : 'document'} {template?.name ? `with ${template.name}` : ''}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
          {saveMessage && (
            <div className={`mt-4 p-4 rounded-md ${
              saveMessage.includes('successfully') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex">
                  <div className="flex-shrink-0">
                    {saveMessage.includes('successfully') ? (
                      <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{saveMessage}</p>
                  </div>
                </div>
                {saveMessage.includes('successfully') && (savedDocumentId || documentId) && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowResumeViewer(true)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View {template?.type === 'cover_letter' ? 'Cover Letter' : 'Resume'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {isCoverLetter ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <CoverLetterForm 
                  onSubmit={handleSave}
                  formData={formData}
                  onDataChange={setFormData}
                  isLoading={isSaving}
                />
              </div>
              <div>
                <CoverLetterPreview formData={formData} template={template} />
              </div>
            </div>
          ) : isResume ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ResumeForm 
                  onSubmit={handleSave}
                  formData={formData}
                  onDataChange={setFormData}
                  isLoading={isSaving}
                />
              </div>
              <div>
                <LivePreview formData={formData} template={template} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <DynamicForm 
                  fields={formFields}
                  onSubmit={handleSave}
                  formData={formData}
                  onDataChange={setFormData}
                />
              </div>
              <div>
                <LivePreview formData={formData} template={template} />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Resume/Cover Letter Viewer Modal */}
      {template?.type === 'cover_letter' ? (
        <CoverLetterViewer
          isOpen={showResumeViewer}
          onClose={() => setShowResumeViewer(false)}
          coverLetterId={savedDocumentId || documentId}
        />
      ) : (
        <ResumeViewer
          isOpen={showResumeViewer}
          onClose={() => setShowResumeViewer(false)}
          resumeId={savedDocumentId || documentId}
          formData={formData}
        />
      )}
    </div>
  );
}
