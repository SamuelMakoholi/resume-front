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
      width: '210mm',
      minHeight: '297mm',
      maxWidth: '210mm',
      margin: '0 auto',
      padding: '0',
      backgroundColor: 'white',
      lineHeight: '1.6',
      fontSize: '10pt',
      color: '#1a1a1a',
      boxSizing: 'border-box' as const,
      overflow: 'hidden'
    },
    header: {
      backgroundColor: '#000000',
      color: 'white',
      padding: '40px 30px',
      marginBottom: '0'
    },
    name: {
      fontSize: '32pt',
      fontWeight: '300',
      margin: '0 0 8px 0',
      color: 'white',
      letterSpacing: '2px'
    },
    title: {
      fontSize: '14pt',
      margin: '0 0 20px 0',
      color: '#ffffff',
      fontWeight: '400',
      opacity: 0.9
    },
    contact: {
      display: 'flex',
      gap: '25px',
      fontSize: '10pt',
      flexWrap: 'wrap' as const,
      color: '#ffffff',
      opacity: 0.8
    },
    mainContent: {
      display: 'flex',
      minHeight: 'calc(297mm - 140px)'
    },
    leftColumn: {
      flex: '2',
      padding: '30px',
      backgroundColor: '#ffffff'
    },
    rightColumn: {
      flex: '1',
      padding: '30px 25px',
      backgroundColor: '#f8f9fa',
      borderLeft: '1px solid #e1e5e9'
    },
    section: {
      marginBottom: '25px'
    },
    sectionTitle: {
      fontSize: '12pt',
      fontWeight: '600',
      color: '#000000',
      marginBottom: '15px',
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
      position: 'relative' as const
    },
    jobTitle: {
      fontSize: '12pt',
      fontWeight: '600',
      margin: '0 0 4px 0',
      color: '#000000'
    },
    company: {
      fontSize: '10pt',
      fontWeight: '500',
      color: '#666666',
      margin: '4px 0 8px 0'
    },
    dates: {
      fontSize: '9pt',
      color: '#999999',
      fontWeight: '400',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    responsibilities: {
      margin: '12px 0 20px 0',
      paddingLeft: '0'
    },
    responsibility: {
      fontSize: '10pt',
      marginBottom: '6px',
      lineHeight: '1.5',
      color: '#333333'
    },
    skill: {
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
      marginBottom: '15px'
    },
    degree: {
      fontSize: '11pt',
      fontWeight: '600',
      margin: '0 0 3px 0',
      color: '#000000'
    },
    school: {
      fontSize: '10pt',
      color: '#666666',
      margin: '0 0 3px 0'
    },
    year: {
      fontSize: '9pt',
      color: '#999999',
      fontWeight: '400'
    },
    summary: {
      fontSize: '10pt',
      lineHeight: '1.7',
      color: '#333333',
      textAlign: 'justify' as const,
      marginBottom: '8px'
    },
    projectItem: {
      marginBottom: '15px'
    },
    projectName: {
      fontSize: '12pt',
      fontWeight: '600',
      margin: '0 0 4px 0',
      color: '#000000'
    },
    projectDescription: {
      fontSize: '10pt',
      margin: '0.25rem 0',
      lineHeight: '1.4'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.name}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        {data.personal.title && (
          <p style={styles.title}>
            {data.personal.title}
          </p>
        )}
        <div style={styles.contact}>
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.website && <span>{data.personal.website}</span>}
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Left Column - Main Content */}
        <div style={styles.leftColumn}>
          {/* Professional Summary */}
          {data.summary && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                About
              </h2>
              <p style={styles.summary}>{data.summary}</p>
            </section>
          )}

          {/* Professional Experience */}
          {data.experience.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                Experience
              </h2>
              {data.experience.map((job: Experience, index: number) => (
                <div key={index} style={{ marginBottom: '25px' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <h3 style={styles.jobTitle}>{job.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                      <p style={styles.company}>{job.company}</p>
                      <p style={styles.dates}>{job.startDate} - {job.endDate}</p>
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
                        <li key={i} style={styles.responsibility}>• {resp}</li>
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
              <h2 style={styles.sectionTitle}>
                Education
              </h2>
              {data.education.map((edu: Education, index: number) => (
                <div key={index} style={styles.education}>
                  <h3 style={styles.degree}>{edu.degree} in {edu.field}</h3>
                  <p style={styles.school}>{edu.school}</p>
                  <p style={styles.year}>{edu.year}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
              <h2 style={styles.sectionTitle}>
                Projects
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} style={styles.projectItem}>
                  <h3 style={styles.projectName}>{project.name}</h3>
                  <p style={styles.projectDescription}>{project.description}</p>
                  {project.url && (
                    <p style={{ fontSize: '9pt', color: '#999999', margin: '4px 0 0 0' }}>
                      {project.url}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Languages */}
          {data.languages?.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                Languages
              </h2>
              {data.languages.map((lang, index) => (
                <div key={index} style={{ marginBottom: '8px', fontSize: '10pt' }}>
                  <div style={{ fontWeight: '600', color: '#000000' }}>{lang.name}</div>
                  <div style={{ fontSize: '9pt', color: '#666666' }}>{lang.proficiency}</div>
                </div>
              ))}
            </section>
          )}

          {/* Achievements */}
          {data.achievements?.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                Achievements
              </h2>
              {data.achievements.map((achievement, index) => (
                <div key={index} style={{ marginBottom: '8px', fontSize: '9pt', lineHeight: '1.4', color: '#333333' }}>
                  {achievement}
                </div>
              ))}
            </section>
          )}

          {/* References */}
          {data.references?.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                References
              </h2>
              {data.references.map((ref, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: '600', fontSize: '10pt', color: '#000000' }}>{ref.name}</div>
                  <div style={{ fontSize: '9pt', color: '#666666', margin: '2px 0' }}>{ref.title}</div>
                  <div style={{ fontSize: '9pt', color: '#666666' }}>{ref.company}</div>
                  <div style={{ fontSize: '9pt', color: '#999999', marginTop: '4px' }}>
                    {ref.email}<br />{ref.phone}
                  </div>
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
