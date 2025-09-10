'use client';

import { useState } from 'react';

interface ResumeFormProps {
  onSubmit: (data: any) => void;
  formData: any;
  onDataChange: (data: any) => void;
  isLoading?: boolean;
}

export default function ResumeForm({ onSubmit, formData, onDataChange, isLoading = false }: ResumeFormProps) {
  const [sectionOrder, setSectionOrder] = useState([
    'personal', 'education', 'employment', 'skills'
  ]);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onDataChange({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleSection = (sectionId: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionId)) {
      newCollapsed.delete(sectionId);
    } else {
      newCollapsed.add(sectionId);
    }
    setCollapsedSections(newCollapsed);
  };

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedItem(sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetSectionId) {
      const draggedIndex = sectionOrder.indexOf(draggedItem);
      const targetIndex = sectionOrder.indexOf(targetSectionId);
      
      const newOrder = [...sectionOrder];
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedItem);
      
      setSectionOrder(newOrder);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const sectionConfigs = {
    personal: { label: 'Personal details', icon: '👤' },
    education: { label: 'Education', icon: '🎓' },
    employment: { label: 'Employment', icon: '💼' },
    skills: { label: 'Skills', icon: '⚡' },
    languages: { label: 'Languages', icon: '🌍' },
    hobbies: { label: 'Hobbies', icon: '🎯' }
  };

  const renderSectionContent = (sectionId: string) => {
    const isCollapsed = collapsedSections.has(sectionId);
    
    if (isCollapsed) return null;

    switch (sectionId) {
      case 'personal':
        return (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <textarea
                id="education"
                name="education"
                value={formData.education || ''}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Your educational background..."
              />
            </div>
          </div>
        );
      case 'employment':
        return (
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="employment" className="block text-sm font-medium text-gray-700 mb-2">
                Work Experience
              </label>
              <textarea
                id="employment"
                name="employment"
                value={formData.employment || ''}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Your work experience..."
              />
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                Skills
              </label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills || ''}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Your skills..."
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {sectionOrder.map((sectionId) => {
            const config = sectionConfigs[sectionId as keyof typeof sectionConfigs];
            const isCollapsed = collapsedSections.has(sectionId);
            
            return (
              <div
                key={sectionId}
                draggable
                onDragStart={(e) => handleDragStart(e, sectionId)}
                onDragOver={(e) => handleDragOver(e, sectionId)}
                onDragEnd={handleDragEnd}
                className={`border border-gray-200 rounded-lg ${
                  draggedItem === sectionId ? 'opacity-50' : ''
                } cursor-move hover:shadow-md transition-shadow`}
              >
                <div 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg cursor-pointer"
                  onClick={() => toggleSection(sectionId)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{config?.icon}</span>
                    <span className="font-medium text-gray-900">{config?.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        isCollapsed ? '' : 'rotate-180'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {renderSectionContent(sectionId)}
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 p-6 border-t">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving Resume...' : 'Save Resume'}
          </button>
        </div>
      </form>
    </div>
  );
}
