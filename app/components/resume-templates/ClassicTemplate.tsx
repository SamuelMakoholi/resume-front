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
      maxWidth: '8.5in',
      minHeight: '11in',
      margin: '0 auto',
      padding: '0.75in',
      backgroundColor: 'white',
      lineHeight: '1.4',
      fontSize: '11pt',
      color: '#333'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #2c3e50'
    },
    name: {
      fontSize: '26pt',
      fontWeight: 'bold',
      margin: '0 0 0.5rem 0',
      color: '#2c3e50',
      letterSpacing: '1px'
    },
    title: {
      fontSize: '14pt',
      margin: '0 0 1rem 0',
      color: '#34495e',
      fontWeight: '500'
    },
    contact: {
      fontSize: '10pt',
      margin: 0,
      color: '#7f8c8d',
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap' as const
    },
    section: {
      marginBottom: '1.5rem'
    },
    sectionTitle: {
      fontSize: '14pt',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '0.75rem',
      paddingBottom: '0.25rem',
      borderBottom: '1px solid #bdc3c7',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    jobTitle: {
      fontSize: '12pt',
      fontWeight: 'bold',
      margin: '0 0 0.25rem 0',
      color: '#2c3e50'
    },
    company: {
      fontSize: '11pt',
      fontWeight: 'bold',
      color: '#34495e',
      margin: 0
    },
    dates: {
      fontSize: '10pt',
      color: '#7f8c8d',
      fontStyle: 'italic',
      margin: '0.25rem 0 0.5rem 0'
    },
    responsibilities: {
      margin: '0.5rem 0 1rem 0',
      paddingLeft: '1.25rem'
    },
    responsibility: {
      fontSize: '10pt',
      marginBottom: '0.25rem',
      lineHeight: '1.3'
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
    skillsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '0.5rem',
      fontSize: '10pt'
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
            <div key={index} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
          <div style={styles.skillsGrid}>
            {data.skills.map((skill: string, index: number) => (
              <div key={index} style={styles.skill}>{skill}</div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Notable Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <h3 style={styles.jobTitle}>{project.name}</h3>
              {project.url && (
                <p style={{ fontSize: '10pt', color: '#3498db', margin: '0.25rem 0' }}>
                  {project.url}
                </p>
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
