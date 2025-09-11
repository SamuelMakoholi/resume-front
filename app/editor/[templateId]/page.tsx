'use client';

import { getTemplateById } from '@/app/lib/templates';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ResumeData } from '@/app/lib/types';
import ResumeForm from '@/components/ResumeForm';
import Link from 'next/link';

// Initial data for the form
const initialData: ResumeData = {
  personal: {
    firstName: 'John',
    lastName: 'Doe',
    title: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    website: 'johndoe.com',
  },
  summary: 'A passionate software engineer with 5+ years of experience in developing web applications using modern technologies. Proven ability to lead projects and collaborate with cross-functional teams.',
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      startDate: 'Jan 2020',
      endDate: 'Present',
      responsibilities: [
        'Led the development of a new e-commerce platform.',
        'Mentored junior developers and conducted code reviews.',
        'Improved application performance by 30%.'
      ],
    },
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      year: '2017',
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Next.js', 'GraphQL'],
  projects: [],
  achievements: [],
  languages: [],
  references: [],
};

// Font options
const fontOptions = [
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Helvetica', value: 'Helvetica, sans-serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Verdana', value: 'Verdana, sans-serif' },
  { name: 'Tahoma', value: 'Tahoma, sans-serif' },
  { name: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
];

// Font size options
const fontSizeOptions = [
  { name: 'Small', headingBase: 16, bodyBase: 12 },
  { name: 'Medium', headingBase: 18, bodyBase: 14 },
  { name: 'Large', headingBase: 20, bodyBase: 16 },
  { name: 'Extra Large', headingBase: 22, bodyBase: 18 },
];

const EditorPage = () => {
  const params = useParams();
  const router = useRouter();
  const templateId = params.templateId as string;
  const [formData, setFormData] = useState<ResumeData>(initialData);
  
  // Font settings state
  const [headingFont, setHeadingFont] = useState('Arial, sans-serif');
  const [bodyFont, setBodyFont] = useState('Georgia, serif');
  const [fontSize, setFontSize] = useState(fontSizeOptions[1]); // Medium by default

  const template = getTemplateById(templateId);

  if (!template) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Template not found</h1>
        <p>The requested template could not be found.</p>
      </div>
    );
  }

  const TemplateComponent = template.component;

  const handleFormSubmit = (data: ResumeData) => {
    // Here you would typically save the data to a database
    console.log('Form submitted:', data);
    alert('Resume data saved! Check the console for the data.');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Black Navigation Bar */}
      <nav className="bg-black text-white py-3 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-green-500 text-2xl font-bold">Resume Builder</span>
            </Link>
          </div>
          
          <button 
            onClick={() => window.history.back()} 
            className="text-sm bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
          >
            &larr; Back
          </button>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Panel - Form */}
        <div className="overflow-y-auto border-r border-gray-200 p-6">
          <h1 className="text-xl font-bold mb-6">Editing: {template.name}</h1>
          <ResumeForm 
            formData={formData} 
            onDataChange={setFormData} 
            onSubmit={handleFormSubmit} 
          />
        </div>
        
        {/* Right Panel - Preview */}
        <div className="bg-gray-50 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-center">Live Preview</h2>
            
            {/* Font Settings */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="text-lg font-medium mb-3">Customize Appearance</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Heading Font Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="heading-font">
                    Heading Font
                  </label>
                  <select 
                    id="heading-font"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={headingFont}
                    onChange={(e) => setHeadingFont(e.target.value)}
                  >
                    {fontOptions.map(font => (
                      <option key={font.value} value={font.value}>{font.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Body Font Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="body-font">
                    Body Font
                  </label>
                  <select 
                    id="body-font"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={bodyFont}
                    onChange={(e) => setBodyFont(e.target.value)}
                  >
                    {fontOptions.map(font => (
                      <option key={font.value} value={font.value}>{font.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Font Size Selection */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                <div className="flex space-x-2">
                  {fontSizeOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => setFontSize(option)}
                      className={`px-3 py-2 rounded-md text-sm ${fontSize === option ? 
                        'bg-green-600 text-white' : 
                        'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Resume Preview */}
            <div className="bg-white rounded-lg shadow-md">
              <div style={{ fontFamily: bodyFont }}>
                <style jsx global>{`
                  .resume-preview h1 { 
                    font-family: ${headingFont};
                    font-size: ${fontSize.headingBase + 6}px;
                  }
                  .resume-preview h2 {
                    font-family: ${headingFont};
                    font-size: ${fontSize.headingBase + 2}px;
                  }
                  .resume-preview h3 {
                    font-family: ${headingFont};
                    font-size: ${fontSize.headingBase}px;
                  }
                  .resume-preview p, .resume-preview li, .resume-preview span {
                    font-size: ${fontSize.bodyBase}px;
                  }
                `}</style>
                <div className="resume-preview">
                  <TemplateComponent data={formData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;

