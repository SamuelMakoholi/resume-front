import React from 'react';
import { ResumeData, Experience, Education } from '@/app/lib/types';

interface ClassicTemplateProps {
  data: ResumeData;
  fontFamily?: string;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data, fontFamily = 'Georgia, serif' }) => {
  const styles = {
    container: {
      fontFamily,
      width: '210mm', // A4 width
      minHeight: '297mm', // A4 height
      maxWidth: '210mm',
      margin: '0 auto',
      padding: '20mm 15mm', // Professional margins
      backgroundColor: 'white',
      lineHeight: '1.5',
      fontSize: '11pt',
      color: '#2c3e50',
      boxSizing: 'border-box' as const,
      overflow: 'hidden'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '25px',
      paddingBottom: '15px',
      borderBottom: '1px solid #2c3e50'
    },
    name: {
      fontSize: '24pt',
      fontWeight: '700',
      margin: '0 0 8px 0',
      color: '#2c3e50',
      letterSpacing: '0.5px',
      textTransform: 'uppercase' as const
    },
    title: {
      fontSize: '13pt',
      margin: '0 0 12px 0',
      color: '#34495e',
      fontWeight: '400'
    },
    contact: {
      fontSize: '10pt',
      margin: 0,
      color: '#7f8c8d',
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      flexWrap: 'wrap' as const
    },
    section: {
      marginBottom: '20px'
    },
    sectionTitle: {
      fontSize: '13pt',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#2c3e50',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.8px',
      borderBottom: '1px solid #bdc3c7',
      paddingBottom: '4px'
    },
    jobTitle: {
      fontSize: '12pt',
      fontWeight: '600',
      margin: '0 0 4px 0',
      color: '#2c3e50'
    },
    company: {
      fontSize: '11pt',
      fontWeight: '500',
      color: '#34495e',
      fontStyle: 'italic' as const,
      margin: '4px 0 8px 0'
    },
    dates: {
      fontSize: '10pt',
      color: '#7f8c8d',
      fontStyle: 'italic',
      margin: '0.25rem 0 0.5rem 0'
    },
    responsibilities: {
      margin: '8px 0 15px 0',
      paddingLeft: '18px'
    },
    responsibility: {
      fontSize: '10pt',
      lineHeight: '1.5',
      marginBottom: '4px',
      color: '#2c3e50'
    },
    education: {
      marginBottom: '0.75rem'
    },
    degree: {
      fontSize: '12pt',
      fontWeight: 'bold',
      margin: 0,
      color: '#2c3e50'
    },
    school: {
      fontSize: '11pt',
      color: '#34495e',
      margin: '0.25rem 0'
    },
    skillsList: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '8px',
      marginTop: '8px'
    },
    skill: {
      padding: '0.25rem 0.5rem',
      backgroundColor: '#ecf0f1',
      borderRadius: '3px',
      textAlign: 'center' as const,
      fontSize: '10pt'
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
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.website && <span>{data.personal.website}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p style={{ fontSize: '11pt', lineHeight: '1.4', margin: 0 }}>{data.summary}</p>
        </section>
      )}

      {/* Professional Experience */}
      {data.experience.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Experience</h2>
          {data.experience.map((job: Experience, index: number) => (
            <div key={index} style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <div>
                  <h3 style={styles.jobTitle}>{job.title}</h3>
                  <p style={styles.company}>{job.company}</p>
                </div>
                <p style={styles.dates}>{job.startDate} - {job.endDate}</p>
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
                    <li key={i} style={styles.responsibility}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {data.education.map((edu: Education, index: number) => (
            <div key={index} style={styles.education}>
              <h3 style={styles.degree}>{edu.degree} in {edu.field}</h3>
              <p style={styles.school}>{edu.school} • {edu.year}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Core Skills</h2>
          <div style={styles.skillsList}>
            {data.skills.map((skill, index) => (
              <span key={index} style={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Notable Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '12px' }}>
              <h3 style={styles.jobTitle}>{project.name}</h3>
              {project.url && (
                <h3 style={{ fontSize: '12pt', fontWeight: '600', margin: '0 0 4px 0', color: '#2c3e50' }}>
                  {project.url}
                </h3>
              )}
              <p style={{ fontSize: '10pt', margin: '0.25rem 0', lineHeight: '1.3' }}>
                {project.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Languages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.languages.map((lang, index) => (
              <div key={index} style={{ fontSize: '10pt' }}>
                <strong>{lang.name}</strong> - {lang.proficiency}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
