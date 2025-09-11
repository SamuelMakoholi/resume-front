'use client';

import { useState, useEffect } from 'react';
import { templates } from '@/app/lib/templates';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ResumeData } from '@/app/lib/types';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';

// Enhanced sample data with more comprehensive content
const sampleData: ResumeData = {
  personal: {
    firstName: 'Alex',
    lastName: 'Morgan',
    title: 'Senior Software Engineer',
    email: 'alex.morgan@example.com',
    phone: '(555) 123-4567',
    website: 'alexmorgan.dev',
  },
  summary: 'Passionate software engineer with 7+ years of experience building scalable web applications and leading development teams.',
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      startDate: '2020',
      endDate: 'Present',
      responsibilities: [
        'Led development of cloud-based SaaS platform',
        'Managed team of 5 junior developers',
        'Reduced system latency by 40%'
      ],
    },
    {
      title: 'Software Developer',
      company: 'WebSolutions LLC',
      startDate: '2017',
      endDate: '2020',
      responsibilities: [
        'Developed responsive web applications',
        'Implemented CI/CD pipelines'
      ],
    },
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'Master of Science',
      field: 'Computer Science',
      year: '2017',
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'GraphQL', 'AWS'],
  projects: [
    {
      name: 'E-commerce Platform',
      description: 'Built scalable online shopping platform with React and Node.js',
      url: 'github.com/alexmorgan/ecommerce'
    }
  ],
  achievements: ['Best Team Lead Award 2022', 'Speaker at DevConf 2021'],
  languages: [
    { name: 'English', proficiency: 'Native' },
    { name: 'Spanish', proficiency: 'Intermediate' }
  ],
  references: [],
};

export default function TemplateSelectionPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
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

  // Reset navigation state when component unmounts or navigation completes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsNavigating(false);
      setSelectedTemplate(null);
    };

    // Reset loading state after a timeout as fallback
    if (isNavigating) {
      const timeout = setTimeout(() => {
        setIsNavigating(false);
        setSelectedTemplate(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isNavigating]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleTemplateSelect = (templateId: string) => {
    console.log('Navigating to template:', templateId);
    window.location.href = `/editor/${templateId}`;
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading..." size="large" />
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose a Resume Template</h1>
            <p className="text-gray-600">Select a professional template that matches your style and experience level.</p>
          </div>
          
          {/* Template grid with improved cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 flex flex-col">
                <div className="relative bg-white border-b border-gray-200 pointer-events-none">
                  <div className="aspect-[3/4] overflow-hidden">
                    {template.id === 'classic' ? (
                      <div className="h-full flex flex-col p-4">
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-bold">Alex Morgan</h3>
                          <p className="text-sm text-gray-500">Senior Software Engineer</p>
                        </div>
                        <div className="mb-3">
                          <h4 className="text-sm font-bold border-b border-gray-300 pb-1 mb-2">Summary</h4>
                          <p className="text-xs text-gray-600">Experienced software engineer with 7+ years...</p>
                        </div>
                        <div className="mb-3">
                          <h4 className="text-sm font-bold border-b border-gray-300 pb-1 mb-2">Experience</h4>
                          <p className="text-xs font-medium">Senior Software Engineer</p>
                          <p className="text-xs text-gray-500">Tech Innovations Inc. | 2020-Present</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold border-b border-gray-300 pb-1 mb-2">Education</h4>
                          <p className="text-xs font-medium">Master of Science</p>
                          <p className="text-xs text-gray-500">University of Technology</p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full bg-gray-50 p-4">
                        <div className="flex justify-between items-start mb-4 pb-2 border-b-2 border-green-500">
                          <div>
                            <h3 className="text-xl font-bold">Alex Morgan</h3>
                            <p className="text-sm text-gray-600">Senior Software Engineer</p>
                          </div>
                          <div className="text-right text-xs text-gray-500">
                            <p>alex@example.com</p>
                            <p>(555) 123-4567</p>
                          </div>
                        </div>
                        <div className="flex h-[calc(100%-3rem)]">
                          <div className="w-1/3 pr-2">
                            <div className="mb-3">
                              <h4 className="text-sm font-bold text-green-600">Skills</h4>
                              <ul className="text-xs">
                                <li>React</li>
                                <li>TypeScript</li>
                                <li>Node.js</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-green-600">Education</h4>
                              <p className="text-xs">Master of Science</p>
                            </div>
                          </div>
                          <div className="w-2/3 pl-2 border-l border-gray-300">
                            <h4 className="text-sm font-bold text-green-600 mb-1">Experience</h4>
                            <p className="text-xs font-medium">Senior Software Engineer</p>
                            <p className="text-xs text-gray-500 mb-2">Tech Innovations Inc.</p>
                            <p className="text-xs">Led development of cloud-based platform</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{template.name}</h2>
                    <p className="text-gray-600 text-sm">{template.id === 'classic' ? 
                      'Traditional and elegant design suitable for all professions.' : 
                      'Modern and creative layout that stands out from the crowd.'}</p>
                  </div>
                  <button 
                    onClick={() => handleTemplateSelect(template.id)}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
