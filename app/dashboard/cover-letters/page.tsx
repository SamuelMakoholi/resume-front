'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '../../../components/Sidebar';
import LoadingSpinner from '../../../components/LoadingSpinner';
import CoverLetterViewer from '../../../components/CoverLetterViewer';

interface User {
  id: number;
  name: string;
  email: string;
  subscription: 'free' | 'premium' | 'expired';
}

export default function CoverLettersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [coverLetters, setCoverLetters] = useState<any[]>([]);
  const [coverLettersLoading, setCoverLettersLoading] = useState(true);
  const [templates, setTemplates] = useState<any[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [viewingCoverLetter, setViewingCoverLetter] = useState<number | null>(null);
  const router = useRouter();

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
      const fetchCoverLetters = async () => {
        try {
          setCoverLettersLoading(true);
          const token = localStorage.getItem('token');
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cover-letters`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            }
          });
          const data = await response.json();
          setCoverLetters(data.data || []);
        } catch (error) {
          console.error('Failed to fetch cover letters', error);
        } finally {
          setCoverLettersLoading(false);
        }
      };

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

      fetchCoverLetters();
      fetchTemplates();
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleDelete = async (letterId: number) => {
    if (!window.confirm('Are you sure you want to delete this cover letter?')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cover-letters/${letterId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      setCoverLetters(coverLetters.filter(cl => cl.id !== letterId));
    } catch (error) {
      console.error('Failed to delete cover letter', error);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading..." size="large" />
      </div>
    );
  }

  const coverLetterTemplates = templates.filter(t => t.type === 'cover_letter');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar user={user} onLogout={logout} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Cover Letters</h1>
            <p className="text-gray-600">Manage your cover letters and create new ones from templates.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✉️</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Cover Letters</p>
                  <p className="text-2xl font-bold text-gray-900">{coverLetters.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">🎨</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Cover Letter Templates</p>
                  <p className="text-2xl font-bold text-gray-900">{coverLetterTemplates.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* My Cover Letters */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Cover Letters</h2>
            {coverLettersLoading ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <LoadingSpinner text="Loading cover letters..." />
              </div>
            ) : coverLetters.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">✉️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No cover letters yet</h3>
                <p className="text-gray-600 mb-4">Create your first cover letter using one of our templates below.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coverLetters.map(letter => (
                  <div key={letter.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {letter.data.company_name || letter.data.full_name || 'Untitled Cover Letter'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {letter.data.position_title || 'Cover Letter'}
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                        Letter
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Updated {new Date(letter.updated_at).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <Link 
                        href={`/editor/${letter.template_id}?documentId=${letter.id}&type=cover-letter`} 
                        className="flex-1 bg-green-600 text-white text-center py-2 px-3 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setViewingCoverLetter(letter.id)}
                        className="px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors text-sm font-medium"
                      >
                        👁️
                      </button>
                      <button 
                        onClick={() => handleDelete(letter.id)} 
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Create New Cover Letter */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Cover Letter</h2>
            {templatesLoading ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <LoadingSpinner text="Loading templates..." />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coverLetterTemplates.map(template => {
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
                        <p className="text-sm text-gray-500">Cover Letter Template</p>
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
