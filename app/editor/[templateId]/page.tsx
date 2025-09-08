'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import DynamicForm from '../../../components/DynamicForm';
import LivePreview from '../../../components/LivePreview';

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
        <p>Loading...</p>
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

    const isEditing = !!documentId;
    const method = isEditing ? 'PUT' : 'POST';
    let endpoint = template.type === 'resume' ? '/api/resumes' : '/api/cover-letters';
    if(isEditing) {
      endpoint = `${endpoint}/${documentId}`;
    }
    
    const payload = {
      template_id: templateId,
      data,
    };

    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      router.push('/dashboard'); 
    } catch (error) {
      console.error(`Failed to save ${template.type}`, error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black font-heading">{documentId ? 'Editing' : 'Creating'} a {template.type} with {template.name}</h1>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div>
            <DynamicForm 
              fields={template.fields}
              onSubmit={handleSave}
              formData={formData}
              onDataChange={setFormData}
            />
          </div>
          <div>
            <LivePreview formData={formData} template={template} />
          </div>
        </div>
      </main>
    </div>
  );
}
