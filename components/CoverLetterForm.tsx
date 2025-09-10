'use client';

import { useState, useEffect, useRef } from 'react';

interface CoverLetterFormProps {
  onSubmit: (data: any) => void;
  formData: any;
  onDataChange: (data: any) => void;
  isLoading?: boolean;
}

export default function CoverLetterForm({ onSubmit, formData, onDataChange, isLoading = false }: CoverLetterFormProps) {
  const editorRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onDataChange({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isMounted) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cover Letter Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Recipient Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={formData.company_name || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label htmlFor="position_title" className="block text-sm font-medium text-gray-700 mb-2">
                Position Title *
              </label>
              <input
                type="text"
                id="position_title"
                name="position_title"
                value={formData.position_title || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter position title"
              />
            </div>

            <div>
              <label htmlFor="hiring_manager" className="block text-sm font-medium text-gray-700 mb-2">
                Hiring Manager Name
              </label>
              <input
                type="text"
                id="hiring_manager"
                name="hiring_manager"
                value={formData.hiring_manager || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter hiring manager's name"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="text"
                id="date"
                name="date"
                value={formData.date || getCurrentDate()}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Cover Letter Content */}
        <div className="border-t pt-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Cover Letter Content *
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <textarea
              id="content"
              name="content"
              value={formData.content || `Dear ${formData.hiring_manager || 'Hiring Manager'},

I am writing to express my strong interest in the ${formData.position_title || '[Position Title]'} position at ${formData.company_name || '[Company Name]'}. With my background and experience, I am confident that I would be a valuable addition to your team.

[Write your cover letter content here. Highlight your relevant experience, skills, and why you're the perfect fit for this role.]

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can contribute to ${formData.company_name || '[Company Name]'}'s continued success.

Sincerely,
${formData.full_name || '[Your Name]'}`}
              onChange={handleInputChange}
              rows={20}
              className="w-full px-4 py-3 border-0 focus:ring-2 focus:ring-green-500 transition-colors resize-none text-sm leading-relaxed"
              placeholder="Write your cover letter content here..."
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Write your cover letter content. The template will automatically format it for preview.
          </p>
        </div>

        {/* Submit Button */}
        <div className="border-t pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Cover Letter'}
          </button>
        </div>
      </form>
    </div>
  );
}
