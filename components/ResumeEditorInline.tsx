'use client';

import React, { useState } from 'react';
import { ResumeData } from '../app/lib/types';
import ResumeForm from './ResumeForm';

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

interface ResumeEditorInlineProps {
  template: any;
  onClose: () => void;
}

const ResumeEditorInline: React.FC<ResumeEditorInlineProps> = ({ template, onClose }) => {
  const [formData, setFormData] = useState<ResumeData>(initialData);
  
  // Font settings state
  const [headingFont, setHeadingFont] = useState('Arial, sans-serif');
  const [bodyFont, setBodyFont] = useState('Georgia, serif');
  const [fontSize, setFontSize] = useState(fontSizeOptions[1]); // Medium by default

  const TemplateComponent = template.component;

  const handleFormSubmit = (data: ResumeData) => {
    console.log('Resume data submitted:', data);
    alert('Resume saved successfully! Check the console for the data.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Navigation Bar */}
      <nav className="bg-black text-white py-3 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="text-green-500 text-2xl font-bold">Resume Builder</span>
            <span className="text-sm text-gray-300">Editing: {template.name}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onClose}
              className="text-sm bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
            >
              ← Back to Templates
            </button>
            <button 
              onClick={() => window.location.href = '/dashboard/resumes'}
              className="text-sm bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
            >
              My Resumes
            </button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Panel - Form */}
        <div className="w-1/2 overflow-y-auto border-r border-gray-200 p-6 bg-white">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Resume Builder</h1>
            <p className="text-gray-600">Fill out your information to create a professional resume.</p>
          </div>
          <ResumeForm 
            formData={formData} 
            onDataChange={setFormData} 
            onSubmit={handleFormSubmit} 
          />
        </div>
        
        {/* Right Panel - Preview */}
        <div className="w-1/2 bg-gray-50 overflow-y-auto p-6">
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
                <div className="flex flex-wrap gap-2">
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

export default ResumeEditorInline;
