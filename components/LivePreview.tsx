'use client';

interface LivePreviewProps {
  formData: any;
  template: any;
}

export default function LivePreview({ formData, template }: LivePreviewProps) {
  if (!template || !template.body) {
    return (
        <div className="bg-white p-8 shadow-lg flex items-center justify-center">
            <p>No preview available.</p>
        </div>
    );
  }

  const getProcessedHtml = () => {
    let processedHtml = template.body;
    for (const key in formData) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processedHtml = processedHtml.replace(regex, formData[key] || '');
    }
    return processedHtml;
  };

  return (
    <div className="bg-white p-8 shadow-lg">
      <div dangerouslySetInnerHTML={{ __html: getProcessedHtml() }} />
    </div>
  );
}
