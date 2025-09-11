import ClassicTemplate from '@/app/components/resume-templates/ClassicTemplate';
import ModernTemplate from '@/app/components/resume-templates/ModernTemplate';
import { ComponentType } from 'react';
import { ResumeData } from './types';

export interface Template {
  id: string;
  name: string;
  component: ComponentType<{ data: ResumeData }>;
}

export const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classic',
    component: ClassicTemplate,
  },
  {
    id: 'modern',
    name: 'Modern',
    component: ModernTemplate,
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((template) => template.id === id);
};
