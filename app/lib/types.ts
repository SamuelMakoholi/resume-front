export interface PersonalDetails {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  website: string;
}

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  responsibilitiesHtml?: string; // HTML content for rich text responsibilities
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  year: string;
}

export interface Project {
  name: string;
  description: string;
  url?: string;
}

export interface Language {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
}

export interface Reference {
  name: string;
  company: string;
  title: string;
  phone: string;
  email: string;
}

export interface ResumeData {
  personal: PersonalDetails;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  achievements: string[];
  languages: Language[];
  references: Reference[];
}
