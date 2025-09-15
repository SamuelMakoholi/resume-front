import React from 'react';
import { ResumeData, Experience, Education } from '@/app/lib/types';

interface SoftwareDeveloperTemplateProps {
  data: ResumeData;
  fontFamily?: string;
}

const SoftwareDeveloperTemplate: React.FC<SoftwareDeveloperTemplateProps> = ({ data, fontFamily = 'Inter, sans-serif' }) => {
  // Default dummy data for a Software Developer
  const defaultData: ResumeData = {
    personal: {
      firstName: 'Alex',
      lastName: 'Johnson',
      title: 'Full Stack Software Developer',
      email: 'alex.johnson@email.com',
      phone: '+1 (555) 123-4567',
      website: 'https://alexjohnson.dev'
    },
    summary: 'Experienced Full Stack Software Developer with 5+ years of expertise in building scalable web applications using React, Node.js, and cloud technologies. Passionate about clean code, test-driven development, and creating exceptional user experiences. Proven track record of delivering high-quality software solutions in agile environments.',
    experience: [
      {
        title: 'Senior Software Developer',
        company: 'TechCorp Solutions',
        startDate: 'Jan 2022',
        endDate: 'Present',
        responsibilities: [
          'Lead development of microservices architecture serving 100K+ daily active users',
          'Implemented CI/CD pipelines reducing deployment time by 60%',
          'Mentored 3 junior developers and conducted code reviews',
          'Collaborated with product team to define technical requirements'
        ],
        responsibilitiesHtml: '<ul><li>Lead development of microservices architecture serving 100K+ daily active users</li><li>Implemented CI/CD pipelines reducing deployment time by 60%</li><li>Mentored 3 junior developers and conducted code reviews</li><li>Collaborated with product team to define technical requirements</li></ul>'
      },
      {
        title: 'Software Developer',
        company: 'StartupXYZ',
        startDate: 'Jun 2020',
        endDate: 'Dec 2021',
        responsibilities: [
          'Built responsive web applications using React and TypeScript',
          'Developed RESTful APIs with Node.js and Express',
          'Integrated third-party payment systems (Stripe, PayPal)',
          'Optimized database queries improving performance by 40%'
        ],
        responsibilitiesHtml: '<ul><li>Built responsive web applications using React and TypeScript</li><li>Developed RESTful APIs with Node.js and Express</li><li>Integrated third-party payment systems (Stripe, PayPal)</li><li>Optimized database queries improving performance by 40%</li></ul>'
      },
      {
        title: 'Junior Software Developer',
        company: 'DevStudio Inc',
        startDate: 'Aug 2019',
        endDate: 'May 2020',
        responsibilities: [
          'Developed frontend components using React and CSS',
          'Participated in agile development processes',
          'Fixed bugs and implemented feature requests',
          'Wrote unit tests achieving 85% code coverage'
        ],
        responsibilitiesHtml: '<ul><li>Developed frontend components using React and CSS</li><li>Participated in agile development processes</li><li>Fixed bugs and implemented feature requests</li><li>Wrote unit tests achieving 85% code coverage</li></ul>'
      }
    ],
    education: [
      {
        school: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        year: '2019'
      },
      {
        school: 'Tech Academy',
        degree: 'Certificate',
        field: 'Full Stack Web Development',
        year: '2018'
      }
    ],
    skills: [
      'JavaScript/TypeScript',
      'React/Next.js',
      'Node.js/Express',
      'Python/Django',
      'PostgreSQL/MongoDB',
      'AWS/Docker',
      'Git/GitHub',
      'REST APIs/GraphQL',
      'Jest/Testing',
      'Agile/Scrum'
    ],
    projects: [
      {
        name: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React frontend, Node.js backend, and Stripe integration. Features include user authentication, product catalog, shopping cart, and order management.',
        url: 'https://github.com/alexjohnson/ecommerce-platform'
      },
      {
        name: 'Task Management App',
        description: 'Real-time collaborative task management application built with React, Socket.io, and MongoDB. Includes drag-and-drop functionality, team collaboration, and progress tracking.',
        url: 'https://github.com/alexjohnson/task-manager'
      },
      {
        name: 'Weather Dashboard',
        description: 'Responsive weather application using React and OpenWeather API. Features location-based forecasts, interactive maps, and weather alerts with PWA capabilities.',
        url: 'https://github.com/alexjohnson/weather-dashboard'
      },
      {
        name: 'API Gateway Service',
        description: 'Microservices API gateway built with Node.js and Express. Implements rate limiting, authentication, request routing, and monitoring for distributed systems.',
        url: 'https://github.com/alexjohnson/api-gateway'
      }
    ],
    achievements: [
      'AWS Certified Solutions Architect Associate (2023)',
      'Winner of TechCorp Hackathon 2022 - Best Innovation Award',
      'Contributed to 5+ open source projects with 500+ GitHub stars',
      'Speaker at Local JavaScript Meetup (3 presentations)',
      'Reduced application load time by 50% through optimization',
      'Led migration of legacy system to modern tech stack'
    ],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Intermediate' },
      { name: 'French', proficiency: 'Beginner' }
    ],
    references: [
      {
        name: 'Sarah Chen',
        company: 'TechCorp Solutions',
        title: 'Engineering Manager',
        phone: '+1 (555) 987-6543',
        email: 'sarah.chen@techcorp.com'
      },
      {
        name: 'Michael Rodriguez',
        company: 'StartupXYZ',
        title: 'CTO',
        phone: '+1 (555) 456-7890',
        email: 'michael@startupxyz.com'
      }
    ]
  };

  // Use provided data or fall back to dummy data
  const resumeData = {
    personal: { ...defaultData.personal, ...data.personal },
    summary: data.summary || defaultData.summary,
    experience: data.experience.length > 0 ? data.experience : defaultData.experience,
    education: data.education.length > 0 ? data.education : defaultData.education,
    skills: data.skills.length > 0 ? data.skills : defaultData.skills,
    projects: data.projects.length > 0 ? data.projects : defaultData.projects,
    achievements: data.achievements.length > 0 ? data.achievements : defaultData.achievements,
    languages: data.languages.length > 0 ? data.languages : defaultData.languages,
    references: data.references.length > 0 ? data.references : defaultData.references
  };

  const primaryColor = '#2563eb'; // Blue
  const accentColor = '#1e40af'; // Darker blue
  const lightBg = '#f8fafc'; // Light gray

  const styles = {
    container: {
      fontFamily,
      maxWidth: '8.5in',
      minHeight: '11in',
      margin: '0 auto',
      backgroundColor: 'white',
      color: '#1f2937',
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    sidebar: {
      backgroundColor: primaryColor,
      padding: '2rem 1.5rem',
      color: 'white',
    },
    main: {
      padding: '2rem 2.5rem',
    },
    profileSection: {
      textAlign: 'center' as const,
      marginBottom: '2rem',
      paddingBottom: '1.5rem',
      borderBottom: '2px solid rgba(255, 255, 255, 0.2)'
    },
    name: {
      fontSize: '28px',
      fontWeight: '700',
      margin: '0 0 0.5rem 0',
      lineHeight: '1.2'
    },
    title: {
      fontSize: '16px',
      fontWeight: '400',
      margin: '0 0 1rem 0',
      opacity: 0.9,
      letterSpacing: '0.5px'
    },
    contactInfo: {
      fontSize: '14px',
      lineHeight: '1.6'
    },
    contactItem: {
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap' as const
    },
    sidebarSection: {
      marginBottom: '2rem'
    },
    sidebarHeading: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '1rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
      borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
      paddingBottom: '0.5rem'
    },
    skillItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '0.5rem 0.75rem',
      margin: '0.25rem',
      borderRadius: '20px',
      fontSize: '13px',
      display: 'inline-block',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    languageItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.75rem',
      fontSize: '14px'
    },
    languageName: {
      fontWeight: '500'
    },
    languageLevel: {
      opacity: 0.8
    },
    mainSection: {
      marginBottom: '2.5rem'
    },
    mainHeading: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: primaryColor,
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
      borderBottom: `3px solid ${primaryColor}`,
      paddingBottom: '0.5rem',
      display: 'inline-block'
    },
    summary: {
      fontSize: '15px',
      lineHeight: '1.7',
      color: '#374151',
      textAlign: 'justify' as const
    },
    experienceItem: {
      marginBottom: '2rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid #e5e7eb'
    },
    jobHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    jobTitle: {
      fontSize: '18px',
      fontWeight: '600',
      margin: '0 0 0.25rem 0',
      color: '#111827'
    },
    company: {
      fontSize: '16px',
      fontWeight: '500',
      color: primaryColor,
      margin: '0'
    },
    dates: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500',
      backgroundColor: lightBg,
      padding: '0.25rem 0.75rem',
      borderRadius: '12px'
    },
    responsibilities: {
      margin: '1rem 0 0 0',
      paddingLeft: '0'
    },
    educationItem: {
      marginBottom: '1.5rem',
      padding: '1.25rem',
      backgroundColor: lightBg,
      borderRadius: '8px',
      border: `1px solid #e5e7eb`
    },
    degree: {
      fontSize: '16px',
      fontWeight: '600',
      margin: '0 0 0.5rem 0',
      color: '#111827'
    },
    school: {
      fontSize: '14px',
      display: 'flex',
      justifyContent: 'space-between',
      color: '#6b7280'
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem'
    },
    projectItem: {
      backgroundColor: lightBg,
      padding: '1.5rem',
      borderRadius: '8px',
      border: `1px solid #e5e7eb`,
      borderLeft: `4px solid ${primaryColor}`
    },
    projectName: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#111827'
    },
    projectUrl: {
      fontSize: '13px',
      color: primaryColor,
      marginBottom: '0.75rem',
      display: 'block',
      textDecoration: 'none'
    },
    projectDescription: {
      fontSize: '14px',
      lineHeight: '1.6',
      color: '#374151'
    },
    achievementsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    },
    achievementItem: {
      backgroundColor: lightBg,
      padding: '1rem',
      borderRadius: '6px',
      fontSize: '14px',
      lineHeight: '1.5',
      borderLeft: `3px solid ${primaryColor}`,
      color: '#374151'
    },
    referencesGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem'
    },
    referenceItem: {
      padding: '1.5rem',
      backgroundColor: lightBg,
      borderRadius: '8px',
      border: `1px solid #e5e7eb`
    },
    referenceName: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#111827'
    },
    referenceTitle: {
      fontSize: '14px',
      color: primaryColor,
      marginBottom: '0.25rem',
      fontWeight: '500'
    },
    referenceCompany: {
      fontSize: '14px',
      marginBottom: '0.75rem',
      color: '#6b7280'
    },
    referenceContact: {
      fontSize: '13px',
      color: '#6b7280',
      lineHeight: '1.4'
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.profileSection}>
          <h1 style={styles.name}>
            {resumeData.personal.firstName} {resumeData.personal.lastName}
          </h1>
          <p style={styles.title}>{resumeData.personal.title}</p>
          <div style={styles.contactInfo}>
            <div style={styles.contactItem}>{resumeData.personal.email}</div>
            <div style={styles.contactItem}>{resumeData.personal.phone}</div>
            <div style={styles.contactItem}>{resumeData.personal.website}</div>
          </div>
        </div>

        {/* Skills */}
        <div style={styles.sidebarSection}>
          <h2 style={styles.sidebarHeading}>Technical Skills</h2>
          <div>
            {resumeData.skills.map((skill, index) => (
              <span key={index} style={styles.skillItem}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div style={styles.sidebarSection}>
          <h2 style={styles.sidebarHeading}>Languages</h2>
          {resumeData.languages.map((lang, index) => (
            <div key={index} style={styles.languageItem}>
              <span style={styles.languageName}>{lang.name}</span>
              <span style={styles.languageLevel}>{lang.proficiency}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Professional Summary */}
        <section style={styles.mainSection}>
          <h2 style={styles.mainHeading}>Professional Summary</h2>
          <p style={styles.summary}>{resumeData.summary}</p>
        </section>

        {/* Professional Experience */}
        <section style={styles.mainSection}>
          <h2 style={styles.mainHeading}>Professional Experience</h2>
          {resumeData.experience.map((job: Experience, index: number) => (
            <div key={index} style={styles.experienceItem}>
              <div style={styles.jobHeader}>
                <div>
                  <h3 style={styles.jobTitle}>{job.title}</h3>
                  <p style={styles.company}>{job.company}</p>
                </div>
                <div style={styles.dates}>
                  {job.startDate} - {job.endDate}
                </div>
              </div>
              {job.responsibilitiesHtml ? (
                <div style={styles.responsibilities}>
                  <style dangerouslySetInnerHTML={{ __html: `
                    .resume-html-content ul {
                      list-style-type: disc !important;
                      padding-left: 1.25rem !important;
                      margin: 0.25rem 0 !important;
                    }
                    .resume-html-content ol {
                      list-style-type: decimal !important;
                      padding-left: 1.25rem !important;
                      margin: 0.25rem 0 !important;
                    }
                    .resume-html-content li {
                      margin-bottom: 0.5rem !important;
                      line-height: 1.6 !important;
                    }
                  `}} />
                  <div 
                    className="resume-html-content"
                    dangerouslySetInnerHTML={{ __html: job.responsibilitiesHtml }}
                  />
                </div>
              ) : job.responsibilities.length > 0 && (
                <ul style={styles.responsibilities}>
                  {job.responsibilities.map((resp: string, i: number) => (
                    <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        {/* Education */}
        <section style={styles.mainSection}>
          <h2 style={styles.mainHeading}>Education</h2>
          {resumeData.education.map((edu: Education, index: number) => (
            <div key={index} style={styles.educationItem}>
              <h3 style={styles.degree}>{edu.degree} in {edu.field}</h3>
              <div style={styles.school}>
                <span>{edu.school}</span>
                <span>{edu.year}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section style={styles.mainSection}>
          <h2 style={styles.mainHeading}>Key Projects</h2>
          <div style={styles.projectsGrid}>
            {resumeData.projects.map((project, index) => (
              <div key={index} style={styles.projectItem}>
                <h3 style={styles.projectName}>{project.name}</h3>
                {project.url && (
                  <a href={project.url} style={styles.projectUrl}>
                    {project.url}
                  </a>
                )}
                <p style={styles.projectDescription}>{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section style={styles.mainSection}>
          <h2 style={styles.mainHeading}>Achievements & Certifications</h2>
          <div style={styles.achievementsGrid}>
            {resumeData.achievements.map((achievement, index) => (
              <div key={index} style={styles.achievementItem}>
                {achievement}
              </div>
            ))}
          </div>
        </section>

        {/* References */}
        <section style={styles.mainSection}>
          <h2 style={styles.mainHeading}>References</h2>
          <div style={styles.referencesGrid}>
            {resumeData.references.map((ref, index) => (
              <div key={index} style={styles.referenceItem}>
                <h3 style={styles.referenceName}>{ref.name}</h3>
                <p style={styles.referenceTitle}>{ref.title}</p>
                <p style={styles.referenceCompany}>{ref.company}</p>
                <div style={styles.referenceContact}>
                  <div>{ref.email}</div>
                  <div>{ref.phone}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SoftwareDeveloperTemplate;
