'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';
import LoadingSpinner from '../../components/LoadingSpinner';
import CoverLetterViewer from '../../components/CoverLetterViewer';

interface User {
  id: number;
  name: string;
  email: string;
  subscription: 'free' | 'premium' | 'expired';
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [templates, setTemplates] = useState<any[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [resumes, setResumes] = useState<any[]>([]);
  const [coverLetters, setCoverLetters] = useState<any[]>([]);
  const [documentsLoading, setDocumentsLoading] = useState(true);
  const [viewingCoverLetter, setViewingCoverLetter] = useState<number | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        try {
          const userData = JSON.parse(storedUser);
          // Ensure subscription field exists with default value
          if (!userData.subscription) {
            userData.subscription = 'free';
          }
          setUser(userData);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (user) {
      const fetchTemplates = async () => {
        try {
          setTemplatesLoading(true);
          const token = localStorage.getItem('token');
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            }
          });
          const data = await response.json();
          setTemplates(data.data || []);
        } catch (error) {
          console.error('Failed to fetch templates', error);
        } finally {
          setTemplatesLoading(false);
        }
      };
      fetchTemplates();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const fetchDocuments = async () => {
        try {
          setDocumentsLoading(true);
          const token = localStorage.getItem('token');
          const [resumesResponse, coverLettersResponse] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resumes`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
              }
            }),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cover-letters`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
              }
            }),
          ]);
          const resumesData = await resumesResponse.json();
          const coverLettersData = await coverLettersResponse.json();
          setResumes(resumesData.data || []);
          setCoverLetters(coverLettersData.data || []);
        } catch (error) {
          console.error('Failed to fetch documents', error);
        } finally {
          setDocumentsLoading(false);
        }
      };
      fetchDocuments();
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleDelete = async (documentId: number, documentType: 'resume' | 'cover-letter') => {
    if (!window.confirm(`Are you sure you want to delete this ${documentType.replace('-', ' ')}?`)) {
      return;
    }

    const endpoint = documentType === 'resume' ? `/api/resumes/${documentId}` : `/api/cover-letters/${documentId}`;
    const token = localStorage.getItem('token');

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      if (documentType === 'resume') {
        setResumes(resumes.filter(r => r.id !== documentId));
      } else {
        setCoverLetters(coverLetters.filter(cl => cl.id !== documentId));
      }
    } catch (error) {
      console.error(`Failed to delete ${documentType}`, error);
      // Optionally show an error message to the user
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading dashboard..." size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar user={user} onLogout={logout} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}! Here's what's happening with your documents.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">📄</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Resumes</p>
                  <p className="text-2xl font-bold text-gray-900">{resumes.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✉️</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Cover Letters</p>
                  <p className="text-2xl font-bold text-gray-900">{coverLetters.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">🎨</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Templates Available</p>
                  <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Documents</h2>
              <Link href="/dashboard/documents" className="text-green-600 hover:text-green-700 font-medium">View all →</Link>
            </div>
            {documentsLoading ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <LoadingSpinner text="Loading documents..." />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...resumes.slice(0, 3), ...coverLetters.slice(0, 3)].slice(0, 6).map((doc: any, index) => {
                  const isResume = resumes.includes(doc);
                  return (
                    <div key={`${isResume ? 'resume' : 'cover-letter'}-${doc.id}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{doc.data.full_name || `Untitled ${isResume ? 'Resume' : 'Cover Letter'}`}</h3>
                          <p className="text-sm text-gray-500">{isResume ? 'Resume' : 'Cover Letter'}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${isResume ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                          {isResume ? 'Resume' : 'Letter'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Updated {new Date(doc.updated_at).toLocaleDateString()}</p>
                      <div className="flex space-x-2">
                        <Link 
                          href={`/editor/${doc.template_id}?documentId=${doc.id}&type=${isResume ? 'resume' : 'cover-letter'}`} 
                          className="flex-1 bg-green-600 text-white text-center py-2 px-3 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Edit
                        </Link>
                        {!isResume && (
                          <button
                            onClick={() => setViewingCoverLetter(doc.id)}
                            className="px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors text-sm font-medium"
                          >
                            👁️
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(doc.id, isResume ? 'resume' : 'cover-letter')} 
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Popular Templates */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Popular Templates</h2>
              <Link href="/dashboard/templates" className="text-green-600 hover:text-green-700 font-medium">View all →</Link>
            </div>
            {templatesLoading ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <LoadingSpinner text="Loading templates..." />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.slice(0, 4).map(template => {
                  const isPremium = template.is_premium;
                  const canUse = !isPremium || (isPremium && user?.subscription === 'premium');

                  const cardContent = (
                    <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200 ${!canUse ? 'opacity-50' : ''}`}>
                      <div className="aspect-[3/4] bg-gray-100 relative">
                        <img src={template.preview_url} alt={template.name} className="w-full h-full object-cover" />
                        {isPremium && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">Premium</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{template.type.replace('_', ' ')}</p>
                      </div>
                    </div>
                  );

                  if (canUse) {
                    return (
                      <Link href={`/editor/${template.id}`} key={template.id}>
                        {cardContent}
                      </Link>
                    );
                  }

                  return (
                    <div key={template.id} onClick={() => alert('Please upgrade to premium to use this template.')} className="cursor-pointer">
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Cover Letter Viewer Modal */}
      {viewingCoverLetter && (
        <CoverLetterViewer 
          documentId={viewingCoverLetter}
          onClose={() => setViewingCoverLetter(null)}
        />
      )}
    </div>
  );
}
