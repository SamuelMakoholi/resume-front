import React from 'react';
import { ResumeData, Experience, Education } from '@/app/lib/types';

interface ModernTemplateProps {
  data: ResumeData;
  fontFamily?: string;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, fontFamily = 'Inter, sans-serif' }) => {
  const styles = {
    container: {
      fontFamily,
      maxWidth: '8.5in',
      minHeight: '11in',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      fontSize: '11pt',
      color: '#2d3748',
      lineHeight: '1.5'
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '2rem 2rem 1.5rem 2rem',
      marginBottom: '0'
    },
    name: {
      fontSize: '32pt',
      fontWeight: '700',
      margin: '0 0 0.5rem 0',
      letterSpacing: '0.5px'
    },
    title: {
      fontSize: '16pt',
      margin: '0 0 1rem 0',
      opacity: '0.95',
      fontWeight: '400'
    },
    contact: {
      display: 'flex',
      gap: '2rem',
      fontSize: '11pt',
      flexWrap: 'wrap' as const,
      opacity: '0.9'
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '0',
      minHeight: '600px'
    },
    leftColumn: {
      padding: '2rem',
      backgroundColor: '#ffffff'
    },
    rightColumn: {
      padding: '2rem 1.5rem',
      backgroundColor: '#f8fafc',
      borderLeft: '1px solid #e2e8f0'
    },
    section: {
      marginBottom: '2rem'
    },
    sectionTitle: {
      fontSize: '16pt',
      fontWeight: '600',
      color: '#4c51bf',
      marginBottom: '1rem',
      position: 'relative' as const,
      paddingBottom: '0.5rem'
    },
    sectionTitleAfter: {
      content: '""',
      position: 'absolute' as const,
      bottom: '0',
      left: '0',
      width: '50px',
      height: '3px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      borderRadius: '2px'
    },
    jobTitle: {
      fontSize: '14pt',
      fontWeight: '600',
      margin: '0 0 0.25rem 0',
      color: '#2d3748'
    },
    company: {
      fontSize: '12pt',
      fontWeight: '500',
      color: '#667eea',
      margin: '0 0 0.25rem 0'
    },
    dates: {
      fontSize: '10pt',
      color: '#718096',
      fontStyle: 'italic',
      margin: '0 0 0.75rem 0'
    },
    responsibilities: {
      margin: '0.5rem 0 1.5rem 0',
      paddingLeft: '1rem'
    },
    responsibility: {
      fontSize: '10.5pt',
      marginBottom: '0.4rem',
      lineHeight: '1.4'
    },
    skillItem: {
      display: 'inline-block',
      backgroundColor: '#edf2f7',
      color: '#4a5568',
      padding: '0.4rem 0.8rem',
      margin: '0.2rem 0.3rem 0.2rem 0',
      borderRadius: '15px',
      fontSize: '9pt',
      fontWeight: '500',
      border: '1px solid #e2e8f0'
    },
    education: {
      marginBottom: '1.5rem',
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    degree: {
      fontSize: '12pt',
      fontWeight: '600',
      margin: '0 0 0.25rem 0',
      color: '#2d3748'
    },
    school: {
      fontSize: '11pt',
      color: '#4a5568',
      margin: '0 0 0.25rem 0'
    },
    year: {
      fontSize: '10pt',
      color: '#718096',
      fontWeight: '500'
    }
  };

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
          {data.personal.email && <span>📧 {data.personal.email}</span>}
          {data.personal.phone && <span>📞 {data.personal.phone}</span>}
          {data.personal.website && <span>🌐 {data.personal.website}</span>}
        </div>
      </header>

      <div style={styles.mainContent}>
        {/* Left Column - Main Content */}
        <div style={styles.leftColumn}>
          {/* Professional Summary */}
          {data.summary && (
            <section style={styles.section}>
              <h2 style={{ ...styles.sectionTitle, borderBottom: '3px solid #667eea', display: 'inline-block', paddingBottom: '0.25rem' }}>
                Professional Summary
              </h2>
              <p style={{ fontSize: '11pt', lineHeight: '1.5', margin: '1rem 0 0 0', textAlign: 'justify' }}>
                {data.summary}
              </p>
            </section>
          )}

          {/* Professional Experience */}
          {data.experience.length > 0 && (
            <section style={styles.section}>
              <h2 style={{ ...styles.sectionTitle, borderBottom: '3px solid #667eea', display: 'inline-block', paddingBottom: '0.25rem' }}>
                Professional Experience
              </h2>
              {data.experience.map((job: Experience, index: number) => (
                <div key={index} style={{ marginBottom: '2rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <h3 style={styles.jobTitle}>{job.title}</h3>
                      <p style={styles.company}>{job.company}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={styles.dates}>{job.startDate} - {job.endDate}</p>
                    </div>
                  </div>
                  {job.responsibilities.length > 0 && (
                    <ul style={styles.responsibilities}>
                      {job.responsibilities.map((resp: string, i: number) => (
                        <li key={i} style={styles.responsibility}>• {resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ ...styles.sectionTitle, borderBottom: '3px solid #667eea', display: 'inline-block', paddingBottom: '0.25rem' }}>
                Notable Projects
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                  <h3 style={styles.jobTitle}>{project.name}</h3>
                  {project.url && (
                    <p style={{ fontSize: '10pt', color: '#667eea', margin: '0.25rem 0' }}>
                      {project.url}
                    </p>
                  )}
                  <p style={{ fontSize: '10pt', margin: '0.25rem 0', lineHeight: '1.4' }}>
                    {project.description}
                  </p>
                </div>
              ))}
            </section>
          )}
          {/* Achievements */}
          {data.achievements?.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ ...styles.sectionTitle, borderBottom: '3px solid #667eea', display: 'inline-block', paddingBottom: '0.25rem' }}>
                Key Achievements
              </h2>
              <ul style={{ ...styles.responsibilities, marginTop: '1rem' }}>
                {data.achievements.map((achievement, index) => (
                  <li key={index} style={styles.responsibility}>• {achievement}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ ...styles.sectionTitle, borderBottom: '3px solid #667eea', display: 'inline-block', paddingBottom: '0.25rem' }}>
                Languages
              </h2>
              <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {data.languages.map((lang, index) => (
                  <div key={index} style={{ fontSize: '10pt' }}>
                    <strong style={{ color: '#2d3748' }}>{lang.name}</strong> - <span style={{ color: '#667eea' }}>{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {data.references?.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ ...styles.sectionTitle, borderBottom: '3px solid #667eea', display: 'inline-block', paddingBottom: '0.25rem' }}>
                References
              </h2>
              {data.references.map((ref, index) => (
                <div key={index} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                  <h3 style={styles.jobTitle}>{ref.name}</h3>
                  <p style={{ fontSize: '10pt', color: '#667eea', margin: '0.25rem 0' }}>
                    {ref.title} at {ref.company}
                  </p>
                  <p style={{ fontSize: '10pt', color: '#4a5568', margin: '0.25rem 0' }}>
                    {ref.email} | {ref.phone}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
