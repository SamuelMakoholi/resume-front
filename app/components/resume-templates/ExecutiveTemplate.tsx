import React from 'react';
import { ResumeData, Experience, Education } from '@/app/lib/types';

interface ExecutiveTemplateProps {
  data: ResumeData;
  fontFamily?: string;
}

const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data, fontFamily = 'Calibri, sans-serif' }) => {
  const styles = {
    container: {
      fontFamily,
      maxWidth: '8.5in',
      minHeight: '11in',
      margin: '0 auto',
      backgroundColor: 'white',
      fontSize: '11pt',
      color: '#2c2c2c',
      lineHeight: '1.4',
      display: 'flex',
      flexDirection: 'column' as const
    },
    header: {
      backgroundColor: '#1a365d',
      color: 'white',
      padding: '2.5rem 2rem 2rem 2rem',
      textAlign: 'center' as const,
      position: 'relative' as const
    },
    name: {
      fontSize: '32pt',
      fontWeight: '300',
      margin: '0 0 0.5rem 0',
      letterSpacing: '2px',
      textTransform: 'uppercase' as const
    },
    title: {
      fontSize: '16pt',
      margin: '0 0 1.5rem 0',
      color: '#a2d2ff',
      fontWeight: '400',
      letterSpacing: '1px'
    },
    contact: {
      fontSize: '11pt',
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap' as const,
      color: '#e8f4fd'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    body: {
      flex: 1,
      padding: '0 2rem 2rem 2rem'
    },
    section: {
      marginBottom: '2rem',
      borderBottom: '1px solid #e5e5e5',
      paddingBottom: '1.5rem'
    },
    sectionTitle: {
      fontSize: '14pt',
      fontWeight: '600',
      color: '#1a365d',
      marginBottom: '1rem',
      paddingBottom: '0.5rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
      borderBottom: '2px solid #1a365d',
      display: 'inline-block'
    },
    summary: {
      fontSize: '12pt',
      lineHeight: '1.6',
      margin: 0,
      color: '#4a5568',
      fontStyle: 'italic',
      textAlign: 'justify' as const
    },
    jobHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '0.75rem'
    },
    jobTitle: {
      fontSize: '13pt',
      fontWeight: '600',
      margin: 0,
      color: '#1a365d'
    },
    company: {
      fontSize: '12pt',
      fontWeight: '500',
      color: '#2d3748',
      margin: '0.25rem 0 0 0'
    },
    dates: {
      fontSize: '10pt',
      color: '#718096',
      fontWeight: '500',
      textAlign: 'right' as const,
      lineHeight: '1.2'
    },
    responsibilities: {
      margin: '0.75rem 0 1.5rem 0',
      paddingLeft: 0,
      listStyle: 'none'
    },
    responsibility: {
      fontSize: '11pt',
      marginBottom: '0.5rem',
      lineHeight: '1.4',
      position: 'relative' as const,
      paddingLeft: '1.5rem',
      color: '#4a5568'
    },
    bullet: {
      position: 'absolute' as const,
      left: 0,
      top: '0.2rem',
      width: '8px',
      height: '8px',
      backgroundColor: '#1a365d',
      borderRadius: '50%'
    },
    education: {
      marginBottom: '1rem'
    },
    educationHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    degree: {
      fontSize: '12pt',
      fontWeight: '600',
      margin: 0,
      color: '#1a365d'
    },
    school: {
      fontSize: '11pt',
      color: '#2d3748',
      margin: '0.25rem 0 0 0',
      fontWeight: '500'
    },
    skillsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    },
    skillCategory: {
      backgroundColor: '#f7fafc',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    skillCategoryTitle: {
      fontSize: '11pt',
      fontWeight: '600',
      color: '#1a365d',
      marginBottom: '0.5rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    skillsList: {
      fontSize: '10pt',
      lineHeight: '1.4',
      color: '#4a5568'
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem'
    },
    project: {
      backgroundColor: '#f8fafc',
      padding: '1.25rem',
      borderRadius: '6px',
      border: '1px solid #e2e8f0'
    },
    projectName: {
      fontSize: '12pt',
      fontWeight: '600',
      margin: '0 0 0.5rem 0',
      color: '#1a365d'
    },
    projectUrl: {
      fontSize: '10pt',
      color: '#3182ce',
      margin: '0 0 0.75rem 0',
      textDecoration: 'none'
    },
    projectDescription: {
      fontSize: '10pt',
      lineHeight: '1.4',
      color: '#4a5568',
      margin: 0
    },
    twoColumnSection: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem'
    },
    languagesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '0.75rem'
    },
    language: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 0.75rem',
      backgroundColor: '#f0fff4',
      borderRadius: '4px',
      border: '1px solid #c6f6d5'
    },
    languageName: {
      fontSize: '10pt',
      fontWeight: '600',
      color: '#1a365d'
    },
    proficiency: {
      fontSize: '9pt',
      color: '#38a169',
      fontWeight: '500'
    }
  };

  const categorizeSkills = (skills: string[]) => {
    const categories: { [key: string]: string[] } = {
      'Technical': [],
      'Leadership': [],
      'Other': []
    };

    skills.forEach(skill => {
      const lower = skill.toLowerCase();
      if (lower.includes('javascript') || lower.includes('python') || lower.includes('react') ||
        lower.includes('node') || lower.includes('sql') || lower.includes('aws') ||
        lower.includes('docker') || lower.includes('api') || lower.includes('database') ||
        lower.includes('html') || lower.includes('css') || lower.includes('typescript')) {
        categories['Technical'].push(skill);
      } else if (lower.includes('management') || lower.includes('leadership') || lower.includes('team') ||
        lower.includes('project') || lower.includes('strategy') || lower.includes('planning')) {
        categories['Leadership'].push(skill);
      } else {
        categories['Other'].push(skill);
      }
    });

    return categories;
  };

  const skillCategories = categorizeSkills(data.skills);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.name}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        {data.personal.title && (
          <p style={styles.title}>{data.personal.title}</p>
        )}
        <div style={styles.contact}>
          {data.personal.email && (
            <div style={styles.contactItem}>
              <span>✉</span>
              <span>{data.personal.email}</span>
            </div>
          )}
          {data.personal.phone && (
            <div style={styles.contactItem}>
              <span>✆</span>
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal.website && (
            <div style={styles.contactItem}>
              <span>🌐</span>
              <span>{data.personal.website}</span>
            </div>
          )}
        </div>
      </header>

      <div style={styles.body}>
        {/* Executive Summary */}
        {data.summary && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Executive Summary</h2>
            <p style={styles.summary}>{data.summary}</p>
          </section>
        )}

        {/* Professional Experience */}
        {data.experience.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Professional Experience</h2>
            {data.experience.map((job: Experience, index: number) => (
              <div key={index} style={{ marginBottom: '2rem' }}>
                <div style={styles.jobHeader}>
                  <div>
                    <h3 style={styles.jobTitle}>{job.title}</h3>
                    <p style={styles.company}>{job.company}</p>
                  </div>
                  <div style={styles.dates}>
                    <div>{job.startDate} - {job.endDate}</div>
                  </div>
                </div>
                {job.responsibilitiesHtml ? (
                  <div style={styles.responsibilities}>
                    <style dangerouslySetInnerHTML={{ __html: `
                      .resume-html-content ul {
                        list-style-type: disc !important;
                        padding-left: 1.5rem !important;
                        margin: 0.5rem 0 !important;
                      }
                      .resume-html-content ol {
                        list-style-type: decimal !important;
                        padding-left: 1.5rem !important;
                        margin: 0.5rem 0 !important;
                      }
                      .resume-html-content li {
                        margin-bottom: 0.25rem !important;
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
                      <li key={i} style={styles.responsibility}>
                        <div style={styles.bullet}></div>
                        {resp}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education & Skills - Two Column Layout */}
        <div style={styles.twoColumnSection}>
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 style={styles.sectionTitle}>Education</h2>
              {data.education.map((edu: Education, index: number) => (
                <div key={index} style={styles.education}>
                  <div style={styles.educationHeader}>
                    <div>
                      <h3 style={styles.degree}>{edu.degree} in {edu.field}</h3>
                      <p style={styles.school}>{edu.school}</p>
                    </div>
                    <div style={styles.dates}>{edu.year}</div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Core Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 style={styles.sectionTitle}>Core Competencies</h2>
              <div style={styles.skillsContainer}>
                {Object.entries(skillCategories).map(([category, skills]) => (
                  skills.length > 0 && (
                    <div key={category} style={styles.skillCategory}>
                      <h4 style={styles.skillCategoryTitle}>{category}</h4>
                      <div style={styles.skillsList}>
                        {skills.join(' • ')}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Key Projects & Initiatives</h2>
            <div style={styles.projectsGrid}>
              {data.projects.map((project, index) => (
                <div key={index} style={styles.project}>
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
        )}

        {/* Languages & Achievements */}
        <div style={styles.twoColumnSection}>
          {/* Languages */}
          {data.languages?.length > 0 && (
            <section>
              <h2 style={styles.sectionTitle}>Languages</h2>
              <div style={styles.languagesGrid}>
                {data.languages.map((lang, index) => (
                  <div key={index} style={styles.language}>
                    <span style={styles.languageName}>{lang.name}</span>
                    <span style={styles.proficiency}>{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Achievements */}
          {data.achievements?.length > 0 && (
            <section>
              <h2 style={styles.sectionTitle}>Key Achievements</h2>
              <ul style={styles.responsibilities}>
                {data.achievements.map((achievement, index) => (
                  <li key={index} style={styles.responsibility}>
                    <div style={styles.bullet}></div>
                    {achievement}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* References */}
        {data.references?.length > 0 && (
          <section style={{ ...styles.section, borderBottom: 'none' }}>
            <h2 style={styles.sectionTitle}>Professional References</h2>
            <div style={styles.projectsGrid}>
              {data.references.map((ref, index) => (
                <div key={index} style={styles.project}>
                  <h3 style={styles.projectName}>{ref.name}</h3>
                  <p style={styles.projectDescription}>
                    <strong>{ref.title}</strong><br />
                    {ref.company}<br />
                    {ref.email} | {ref.phone}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
