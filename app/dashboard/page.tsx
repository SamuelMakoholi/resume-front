'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
          setTemplates(data);
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
          setResumes(resumesData);
          setCoverLetters(coverLettersData);
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
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-[rgb(var(--primary))] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/dashboard" className="bg-[rgb(var(--primary))] text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                  <Link href="/dashboard/subscription" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Subscription</Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <p className="text-black mr-4">Welcome, {user.name}!</p>
                <button 
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-white inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[rgb(var(--primary))]" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/dashboard" className="bg-[rgb(var(--primary))] text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
            <Link href="/dashboard/subscription" className="text-black hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">Subscription</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-black">{user.name}</div>
                <div className="text-sm font-medium leading-none text-gray-600">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button 
                onClick={logout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      </nav>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black font-heading">Dashboard</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div>
              <h2 className="text-2xl font-bold text-black mb-6 font-heading">My Resumes</h2>
              {documentsLoading ? (
                <p>Loading documents...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {resumes.map(resume => (
                    <div key={resume.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
                      <h3 className="font-bold font-heading text-lg">{resume.data.full_name || 'Untitled Resume'}</h3>
                      <p className="text-sm text-gray-500">Last updated: {new Date(resume.updated_at).toLocaleDateString()}</p>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Link href={`/editor/${resume.template_id}?documentId=${resume.id}&type=resume`} className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300">Edit</Link>
                        <button onClick={() => handleDelete(resume.id, 'resume')} className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-black mb-6 font-heading">My Cover Letters</h2>
              {documentsLoading ? (
                <p>Loading documents...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {coverLetters.map(letter => (
                    <div key={letter.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
                      <h3 className="font-bold font-heading text-lg">{letter.data.full_name || 'Untitled Cover Letter'}</h3>
                      <p className="text-sm text-gray-500">Last updated: {new Date(letter.updated_at).toLocaleDateString()}</p>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Link href={`/editor/${letter.template_id}?documentId=${letter.id}&type=cover-letter`} className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300">Edit</Link>
                        <button onClick={() => handleDelete(letter.id, 'cover-letter')} className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="px-4 py-6 sm:px-0 mt-10">
            <h2 className="text-2xl font-bold text-black mb-6 font-heading">Resume Templates</h2>
            {templatesLoading ? (
              <p>Loading templates...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {templates.filter(t => t.type === 'resume').map(template => {
                  const isPremium = template.is_premium;
                  const canUse = !isPremium || (isPremium && user?.subscription === 'premium');

                  const cardContent = (
                    <div className={`bg-white rounded-lg shadow-md overflow-hidden group h-full ${!canUse ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                      <img src={template.preview_url} alt={template.name} className="w-full h-auto object-cover group-hover:opacity-75 transition-opacity" />
                      <div className="p-4">
                        <h3 className="font-bold font-heading text-lg">{template.name}</h3>
                        {isPremium && (
                          <span className="text-xs font-bold uppercase text-white bg-yellow-500 px-2 py-1 rounded-full mt-2 inline-block">Premium</span>
                        )}
                      </div>
                    </div>
                  );

                  if (canUse) {
                    return (
                      <Link href={`/editor/${template.id}`} key={template.id} className="block">
                        {cardContent}
                      </Link>
                    );
                  }

                  return (
                    <div key={template.id} onClick={() => alert('Please upgrade to premium to use this template.')}>
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="px-4 py-6 sm:px-0 mt-10">
            <h2 className="text-2xl font-bold text-black mb-6 font-heading">Cover Letter Templates</h2>
             {templatesLoading ? (
              <p>Loading templates...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {templates.filter(t => t.type === 'cover_letter').map(template => {
                  const isPremium = template.is_premium;
                  const canUse = !isPremium || (isPremium && user?.subscription === 'premium');

                  const cardContent = (
                    <div className={`bg-white rounded-lg shadow-md overflow-hidden group h-full ${!canUse ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                      <img src={template.preview_url} alt={template.name} className="w-full h-auto object-cover group-hover:opacity-75 transition-opacity" />
                      <div className="p-4">
                        <h3 className="font-bold font-heading text-lg">{template.name}</h3>
                        {isPremium && (
                          <span className="text-xs font-bold uppercase text-white bg-yellow-500 px-2 py-1 rounded-full mt-2 inline-block">Premium</span>
                        )}
                      </div>
                    </div>
                  );

                  if (canUse) {
                    return (
                      <Link href={`/editor/${template.id}`} key={template.id} className="block">
                        {cardContent}
                      </Link>
                    );
                  }

                  return (
                    <div key={template.id} onClick={() => alert('Please upgrade to premium to use this template.')}>
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
