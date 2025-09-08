'use client';

import { useState, useEffect } from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'email' | 'tel';
  placeholder?: string;
}

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
  formData: any;
  onDataChange: (data: any) => void;
}

export default function DynamicForm({ fields, onSubmit, formData, onDataChange }: DynamicFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onDataChange({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-black mb-2">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-[rgb(var(--primary))] transition-colors"
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-[rgb(var(--primary))] transition-colors"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-[rgb(var(--primary))] text-white py-3 px-4 rounded-lg hover:bg-[rgb(var(--primary-dark))] focus:ring-2 focus:ring-[rgb(var(--primary))] focus:ring-offset-2 transition-all duration-200 font-medium"
      >
        Save
      </button>
    </form>
  );
}
