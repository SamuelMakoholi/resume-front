'use client';

import { useState } from 'react';
import { ResumeData, Experience, Education } from '@/app/lib/types';
import InputField from './InputField';
import SimpleRichTextEditor from './SimpleRichTextEditor';

interface ResumeFormProps {
  formData: ResumeData;
  onDataChange: (data: ResumeData) => void;
  onSubmit: (data: ResumeData) => void;
  isLoading?: boolean;
}

export default function ResumeForm({ formData, onDataChange, onSubmit, isLoading = false }: ResumeFormProps) {
  const [sectionOrder, setSectionOrder] = useState([
    'personal', 'summary', 'experience', 'education', 'skills', 'projects', 'achievements', 'languages', 'references'
  ]);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');

    if (section === 'personal') {
      onDataChange({
        ...formData,
        personal: { ...formData.personal, [field]: value },
      });
    } else if (name === 'summary') {
      onDataChange({ ...formData, summary: value });
    } else if (name === 'skills' || name === 'achievements') {
      onDataChange({ ...formData, [name]: value.split(',').map(s => s.trim()) });
    }
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

  // Handlers for Experience section
  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    onDataChange({ ...formData, experience: newExperience });
  };
  
  const handleResponsibilitiesChange = (index: number, htmlContent: string) => {
    const newExperience = [...formData.experience];
    // Store the HTML content as a single string in the responsibilities array
    newExperience[index] = { 
      ...newExperience[index], 
      responsibilitiesHtml: htmlContent,
      // Keep a simplified version in the responsibilities array for backward compatibility
      responsibilities: htmlContent ? [htmlContent.replace(/<[^>]*>/g, '')] : []
    };
    onDataChange({ ...formData, experience: newExperience });
  };

  const addExperience = () => {
    onDataChange({
      ...formData,
      experience: [...formData.experience, { title: '', company: '', startDate: '', endDate: '', responsibilities: [] }],
    });
  };

  const removeExperience = (index: number) => {
    const newExperience = formData.experience.filter((_, i) => i !== index);
    onDataChange({ ...formData, experience: newExperience });
  };

  // Handlers for Education section
  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    onDataChange({ ...formData, education: newEducation });
  };

  const addEducation = () => {
    onDataChange({
      ...formData,
      education: [...formData.education, { school: '', degree: '', field: '', year: '' }],
    });
  };

  const removeEducation = (index: number) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    onDataChange({ ...formData, education: newEducation });
  };

  // Handlers for Projects section
  const handleProjectChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newProjects = [...formData.projects];
    newProjects[index] = { ...newProjects[index], [name]: value };
    onDataChange({ ...formData, projects: newProjects });
  };

  const addProject = () => {
    onDataChange({
      ...formData,
      projects: [...formData.projects, { name: '', description: '', url: '' }],
    });
  };

  const removeProject = (index: number) => {
    const newProjects = formData.projects.filter((_, i) => i !== index);
    onDataChange({ ...formData, projects: newProjects });
  };

  // Handlers for Languages section
  const handleLanguageChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newLanguages = [...formData.languages];
    newLanguages[index] = { ...newLanguages[index], [name]: value };
    onDataChange({ ...formData, languages: newLanguages });
  };

  const addLanguage = () => {
    onDataChange({
      ...formData,
      languages: [...formData.languages, { name: '', proficiency: 'Intermediate' }],
    });
  };

  const removeLanguage = (index: number) => {
    const newLanguages = formData.languages.filter((_, i) => i !== index);
    onDataChange({ ...formData, languages: newLanguages });
  };

  // Handlers for References section
  const handleReferenceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newReferences = [...formData.references];
    newReferences[index] = { ...newReferences[index], [name]: value };
    onDataChange({ ...formData, references: newReferences });
  };

  const addReference = () => {
    onDataChange({
      ...formData,
      references: [...formData.references, { name: '', company: '', title: '', phone: '', email: '' }],
    });
  };

  const removeReference = (index: number) => {
    const newReferences = formData.references.filter((_, i) => i !== index);
    onDataChange({ ...formData, references: newReferences });
  };

  const sectionConfigs = {
    personal: { label: 'Personal Details', icon: '👤' },
    summary: { label: 'Summary', icon: '📝' },
    experience: { label: 'Experience', icon: '💼' },
    education: { label: 'Education', icon: '🎓' },
    skills: { label: 'Skills', icon: '⚡' },
    projects: { label: 'Projects', icon: '🚀' },
    achievements: { label: 'Achievements', icon: '🏆' },
    languages: { label: 'Languages', icon: '🌍' },
    references: { label: 'References', icon: '🤝' },
  };

  const renderSectionContent = (sectionId: string) => {
    const isCollapsed = collapsedSections.has(sectionId);
    
    if (isCollapsed) return null;

    switch (sectionId) {
      case 'personal':
        return (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="First Name" name="personal.firstName" value={formData.personal.firstName} onChange={handleInputChange} />
              <InputField label="Last Name" name="personal.lastName" value={formData.personal.lastName} onChange={handleInputChange} />
              <InputField label="Job Title" name="personal.title" value={formData.personal.title} onChange={handleInputChange} />
              <InputField label="Email" name="personal.email" type="email" value={formData.personal.email} onChange={handleInputChange} />
              <InputField label="Phone" name="personal.phone" type="tel" value={formData.personal.phone} onChange={handleInputChange} />
              <InputField label="Website" name="personal.website" value={formData.personal.website} onChange={handleInputChange} />
            </div>
          </div>
        );
            case 'summary':
        return (
          <div className="p-6">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
              Professional Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Write a brief professional summary..."
            />
          </div>
        );
      case 'experience':
        return (
          <div className="p-6 space-y-4">
            {formData.experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <InputField label="Job Title" name="title" value={exp.title} onChange={(e) => handleExperienceChange(index, e)} />
                <InputField label="Company" name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Start Date" name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} />
                  <InputField label="End Date" name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
                  <SimpleRichTextEditor
                    value={exp.responsibilitiesHtml || ''}
                    onChange={(htmlContent) => handleResponsibilitiesChange(index, htmlContent)}
                    placeholder="Add job responsibilities with formatting..."
                  />
                </div>
                <button type="button" onClick={() => removeExperience(index)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove Experience</button>
              </div>
            ))}
            <button type="button" onClick={addExperience} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors">+ Add Experience</button>
          </div>
        );
      case 'education':
        return (
          <div className="p-6 space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <InputField label="School" name="school" value={edu.school} onChange={(e) => handleEducationChange(index, e)} />
                <InputField label="Degree" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
                <InputField label="Field of Study" name="field" value={edu.field} onChange={(e) => handleEducationChange(index, e)} />
                <InputField label="Year" name="year" value={edu.year} onChange={(e) => handleEducationChange(index, e)} />
                <button type="button" onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove Education</button>
              </div>
            ))}
            <button type="button" onClick={addEducation} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors">+ Add Education</button>
          </div>
        );
      case 'skills':
        return (
          <div className="p-6">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
              Skills (comma-separated)
            </label>
            <textarea
              id="skills"
              name="skills"
              value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., React, TypeScript, Node.js"
            />
          </div>
        );
      case 'projects':
        return (
          <div className="p-6 space-y-4">
            {formData.projects.map((project, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <InputField label="Project Name" name="name" value={project.name} onChange={(e) => handleProjectChange(index, e)} />
                <InputField label="Description" name="description" value={project.description} onChange={(e) => handleProjectChange(index, e)} />
                <InputField label="URL" name="url" value={project.url || ''} onChange={(e) => handleProjectChange(index, e)} />
                <button type="button" onClick={() => removeProject(index)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove Project</button>
              </div>
            ))}
            <button type="button" onClick={addProject} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors">+ Add Project</button>
          </div>
        );
      case 'achievements':
        return (
          <div className="p-6">
            <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-2">
              Achievements (comma-separated)
            </label>
            <textarea
              id="achievements"
              name="achievements"
              value={Array.isArray(formData.achievements) ? formData.achievements.join(', ') : ''}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., 'Employee of the Month', 'Top Salesperson Q3'"
            />
          </div>
        );
      case 'languages':
        return (
          <div className="p-6 space-y-4">
            {formData.languages.map((lang, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <InputField label="Language" name="name" value={lang.name} onChange={(e) => handleLanguageChange(index, e)} />
                <div>
                  <label htmlFor={`proficiency-${index}`} className="block text-sm font-medium text-gray-700 mb-2">Proficiency</label>
                  <select 
                    id={`proficiency-${index}`}
                    name="proficiency"
                    value={lang.proficiency}
                    onChange={(e) => handleLanguageChange(index, e)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Fluent</option>
                    <option>Native</option>
                  </select>
                </div>
                <button type="button" onClick={() => removeLanguage(index)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove Language</button>
              </div>
            ))}
            <button type="button" onClick={addLanguage} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors">+ Add Language</button>
          </div>
        );
      case 'references':
        return (
          <div className="p-6 space-y-4">
            {formData.references.map((ref, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <InputField label="Name" name="name" value={ref.name} onChange={(e) => handleReferenceChange(index, e)} />
                <InputField label="Company" name="company" value={ref.company} onChange={(e) => handleReferenceChange(index, e)} />
                <InputField label="Title" name="title" value={ref.title} onChange={(e) => handleReferenceChange(index, e)} />
                <InputField label="Phone" name="phone" type="tel" value={ref.phone} onChange={(e) => handleReferenceChange(index, e)} />
                <InputField label="Email" name="email" type="email" value={ref.email} onChange={(e) => handleReferenceChange(index, e)} />
                <button type="button" onClick={() => removeReference(index)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove Reference</button>
              </div>
            ))}
            <button type="button" onClick={addReference} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors">+ Add Reference</button>
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
