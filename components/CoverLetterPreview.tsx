'use client';

interface CoverLetterPreviewProps {
  formData: any;
  template?: any;
}

export default function CoverLetterPreview({ formData, template }: CoverLetterPreviewProps) {
  const getCurrentDate = () => {
    return formData?.date || new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Debug log to see if data is being received
  console.log('CoverLetterPreview received formData:', formData);

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Letter Header */}
        <div className="bg-gray-50 px-8 py-6 border-b">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Cover Letter Preview</h2>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {formData.full_name || 'Your Name'}
              </h3>
              <p className="text-gray-600">{formData.email || 'your.email@example.com'}</p>
              {formData.phone && <p className="text-gray-600">{formData.phone}</p>}
              {formData.address && <p className="text-gray-600">{formData.address}</p>}
            </div>
            <div className="text-right">
              <p className="text-gray-600">{getCurrentDate()}</p>
            </div>
          </div>
        </div>

        {/* Letter Content */}
        <div className="px-8 py-6">
          {/* Recipient Information */}
          <div className="mb-6">
            {formData.hiring_manager && (
              <p className="text-gray-900 font-medium">{formData.hiring_manager}</p>
            )}
            {formData.company_name && (
              <p className="text-gray-900 font-medium">{formData.company_name}</p>
            )}
            {formData.position_title && (
              <p className="text-gray-600">Re: {formData.position_title}</p>
            )}
          </div>

          {/* Letter Body */}
          <div className="prose prose-gray max-w-none">
            {formData.content ? (
              <div className="whitespace-pre-line leading-relaxed text-gray-900">
                {formData.content}
              </div>
            ) : (
              <div className="text-gray-400 italic">
                <p>Dear {formData.hiring_manager || 'Hiring Manager'},</p>
                <br />
                <p>Your cover letter content will appear here as you type in the editor.</p>
                <br />
                <p>Sincerely,</p>
                <p>{formData.full_name || 'Your Name'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Generated on {new Date().toLocaleDateString()}</span>
            <span>Resume Builder</span>
          </div>
        </div>
      </div>

      {/* Print/Export Actions */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => window.print()}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Print Cover Letter
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
                      <title>Cover Letter - ${formData.full_name || 'Your Name'}</title>
                      <style>
                        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                        .header { background: #f9fafb; padding: 24px; border-bottom: 1px solid #e5e7eb; }
                        .content { padding: 24px; }
                        .footer { background: #f9fafb; padding: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
                        .prose p { margin: 16px 0; }
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
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}
