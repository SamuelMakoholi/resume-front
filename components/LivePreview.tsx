'use client';

interface LivePreviewProps {
  formData: any;
  template: any;
}

export default function LivePreview({ formData, template }: LivePreviewProps) {
  // Professional Resume Design
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-white p-8 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center border-b-2 border-gray-200 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {formData.full_name || 'Your Name'}
          </h1>
          <div className="flex justify-center items-center space-x-6 text-gray-600 text-sm">
            {formData.email && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {formData.email}
              </div>
            )}
            {formData.phone && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {formData.phone}
              </div>
            )}
            {formData.location && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {formData.location}
              </div>
            )}
          </div>
          {formData.linkedin && (
            <div className="mt-2">
              <a href={formData.linkedin} className="text-blue-600 hover:text-blue-800 text-sm">
                {formData.linkedin}
              </a>
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {formData.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {formData.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {formData.employment && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Professional Experience
            </h2>
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {formData.employment}
            </div>
          </div>
        )}

        {/* Education */}
        {formData.education && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Education
            </h2>
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {formData.education}
            </div>
          </div>
        )}

        {/* Skills */}
        {(formData.skills || formData.technical_skills || formData.soft_skills) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Skills & Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.technical_skills && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Technical Skills</h3>
                  <div className="text-gray-700 whitespace-pre-line">
                    {formData.technical_skills}
                  </div>
                </div>
              )}
              {formData.soft_skills && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Soft Skills</h3>
                  <div className="text-gray-700 whitespace-pre-line">
                    {formData.soft_skills}
                  </div>
                </div>
              )}
              {formData.skills && !formData.technical_skills && !formData.soft_skills && (
                <div className="md:col-span-2">
                  <div className="text-gray-700 whitespace-pre-line">
                    {formData.skills}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Languages */}
        {formData.languages && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Languages
            </h2>
            <p className="text-gray-700">
              {formData.languages}
            </p>
          </div>
        )}

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {formData.certifications && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                Certifications & Awards
              </h2>
              <div className="text-gray-700 whitespace-pre-line text-sm">
                {formData.certifications}
              </div>
            </div>
          )}

          {formData.projects && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                Notable Projects
              </h2>
              <div className="text-gray-700 whitespace-pre-line text-sm">
                {formData.projects}
              </div>
            </div>
          )}

          {formData.volunteer && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                Volunteer Experience
              </h2>
              <div className="text-gray-700 whitespace-pre-line text-sm">
                {formData.volunteer}
              </div>
            </div>
          )}

          {formData.interests && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                Interests & Hobbies
              </h2>
              <p className="text-gray-700 text-sm">
                {formData.interests}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Print/Export Actions */}
      <div className="bg-gray-50 px-8 py-4 flex justify-center space-x-4">
        <button
          onClick={() => window.print()}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
        >
          Print Resume
        </button>
        <button
          onClick={() => {
            const element = document.querySelector('.bg-white.shadow-lg') as HTMLElement;
            if (element) {
              const printWindow = window.open('', '_blank');
              if (printWindow) {
                printWindow.document.write(`
                  <html>
                    <head>
                      <title>Resume - ${formData.full_name || 'Your Name'}</title>
                      <style>
                        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #374151; }
                        h1 { color: #111827; font-size: 36px; margin-bottom: 8px; }
                        h2 { color: #111827; font-size: 24px; margin: 24px 0 16px 0; border-bottom: 2px solid #d1d5db; padding-bottom: 8px; }
                        h3 { color: #111827; font-size: 18px; margin: 16px 0 8px 0; }
                        p { margin: 8px 0; line-height: 1.6; }
                        .header { text-align: center; border-bottom: 2px solid #d1d5db; padding-bottom: 24px; margin-bottom: 24px; }
                        .contact-info { display: flex; justify-content: center; gap: 24px; margin-top: 8px; font-size: 14px; }
                        .section { margin-bottom: 32px; }
                        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                        .whitespace-pre-line { white-space: pre-line; }
                      </style>
                    </head>
                    <body>
                      ${element.innerHTML}
                    </body>
                  </html>
                `);
                printWindow.document.close();
                printWindow.print();
              }
            }
          }}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}
