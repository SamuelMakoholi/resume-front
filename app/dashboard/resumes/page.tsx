'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '../../../components/Sidebar';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { templates } from '@/app/lib/templates';
import { ResumeData } from '@/app/lib/types';

interface User {
  id: number;
  name: string;
  email: string;
  subscription: 'free' | 'premium' | 'expired';
}

export default function ResumesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resumes, setResumes] = useState<any[]>([]);
  const [resumesLoading, setResumesLoading] = useState(true);
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
      const fetchResumes = async () => {
        try {
          setResumesLoading(true);
          const token = localStorage.getItem('token');
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resumes`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            }
          });
          const data = await response.json();
          setResumes(data.data || []);
        } catch (error) {
          console.error('Failed to fetch resumes', error);
        } finally {
          setResumesLoading(false);
        }
      };

      fetchResumes();
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleDelete = async (resumeId: number) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      setResumes(resumes.filter(r => r.id !== resumeId));
    } catch (error) {
      console.error('Failed to delete resume', error);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading..." size="large" />
      </div>
    );
  }

  const resumeTemplates = templates; // We can add a 'type' to our local templates if needed in the future

  // Sample data for template previews
  const sampleData: ResumeData = {
    personal: { firstName: 'John', lastName: 'Doe', title: 'Software Engineer', email: 'john.doe@example.com', phone: '123-456-7890', website: 'johndoe.com' },
    summary: 'Experienced software engineer.',
    experience: [{ title: 'Senior Engineer', company: 'Tech Corp', startDate: '2020', endDate: 'Present', responsibilities: ['Led projects.'] }],
    education: [{ school: 'State University', degree: 'B.S. in CS', field: 'Computer Science', year: '2019' }],
    skills: ['React', 'TypeScript', 'Node.js'],
    projects: [],
    achievements: [],
    languages: [],
    references: [],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar user={user} onLogout={logout} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CV/Resumes</h1>
            <p className="text-gray-600">Manage your resumes and create new ones from templates.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">🎨</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Resume Templates</p>
                  <p className="text-2xl font-bold text-gray-900">{resumeTemplates.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* My Resumes */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Resumes</h2>
            {resumesLoading ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <LoadingSpinner text="Loading resumes..." />
              </div>
            ) : resumes.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No resumes yet</h3>
                <p className="text-gray-600 mb-4">Create your first resume using one of our templates below.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map(resume => (
                  <div key={resume.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {resume.data.personal?.firstName && resume.data.personal?.lastName 
                            ? `${resume.data.personal.firstName} ${resume.data.personal.lastName}` 
                            : 'Untitled Resume'
                          }
                        </h3>
                        <p className="text-sm text-gray-500">Resume</p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        CV
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Updated {new Date(resume.updated_at).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <Link 
                        href={`/dashboard/resumes/view/${resume.id}`} 
                        className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        View
                      </Link>
                      <Link 
                        href={`/dashboard/resumes/edit/${resume.id}`} 
                        className="flex-1 bg-green-600 text-white text-center py-2 px-3 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(resume.id)} 
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

          {/* Create New Resume */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Resume</h2>
              <Link
                href="/dashboard/resumes/create"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
              >
                <span>➕</span>
                <span>Create New Resume</span>
              </Link>
            </div>
            <p className="text-gray-600 mb-6">Choose from our professional templates or start from scratch.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resumeTemplates.map(template => {
                const TemplateComponent = template.component;
                return (
                  <div 
                    key={template.id} 
                    className="block cursor-pointer" 
                    onClick={() => router.push(`/editor/${template.id}`)}
                  >
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200 h-full flex flex-col">
                      <div className="aspect-[3/4] bg-gray-100 overflow-hidden flex-shrink-0">
                        <div style={{ transform: 'scale(0.20)', transformOrigin: 'top left', width: '500%', height: '500%', pointerEvents: 'none' }}>
                          <TemplateComponent data={sampleData} />
                        </div>
                      </div>
                      <div className="p-4 flex-grow flex items-center justify-center">
                        <h3 className="font-semibold text-gray-900 text-center">{template.name}</h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
