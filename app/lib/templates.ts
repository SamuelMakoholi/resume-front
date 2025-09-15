import ClassicTemplate from '@/app/components/resume-templates/ClassicTemplate';
import ModernTemplate from '@/app/components/resume-templates/ModernTemplate';
import ExecutiveTemplate from '@/app/components/resume-templates/ExecutiveTemplate';
import CreativeTemplate from '@/app/components/resume-templates/CreativeTemplate';
import SoftwareDeveloperTemplate from '@/app/components/resume-templates/SoftwareDeveloperTemplate';
import { ComponentType } from 'react';
import { ResumeData } from './types';

export interface Template {
  id: string;
  name: string;
  component: ComponentType<{ data: ResumeData; fontFamily?: string }>;
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
  {
    id: 'executive',
    name: 'Executive',
    component: ExecutiveTemplate,
  },
  {
    id: 'creative',
    name: 'Creative',
    component: CreativeTemplate,
  },
  {
    id: 'software-developer',
    name: 'Software Developer',
    component: SoftwareDeveloperTemplate,
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((template) => template.id === id);
};
