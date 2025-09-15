import React from 'react';
import { ResumeData, Experience, Education } from '@/app/lib/types';

interface ExecutiveTemplateProps {
  data: ResumeData;
  fontFamily?: string;
}

const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data, fontFamily = 'Inter, sans-serif' }) => {
  const styles = {
    container: {
      fontFamily,
      width: '210mm',
      minHeight: '297mm',
      maxWidth: '210mm',
      margin: '0 auto',
      padding: '0',
      backgroundColor: '#fafafa',
      lineHeight: '1.6',
      fontSize: '10pt',
      color: '#1a1a1a',
      position: 'relative' as const,
      boxSizing: 'border-box' as const,
      overflow: 'hidden'
    },
    header: {
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      color: 'white',
      padding: '50px 40px',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    headerOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      zIndex: 1
    },
    headerContent: {
      position: 'relative' as const,
      zIndex: 2,
      textAlign: 'center' as const
    },
    name: {
      fontSize: '36pt',
      fontWeight: '200',
      margin: '0 0 12px 0',
      color: 'white',
      letterSpacing: '4px',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    title: {
      fontSize: '16pt',
      margin: '0 0 25px 0',
      color: 'rgba(255,255,255,0.95)',
      fontWeight: '300',
      letterSpacing: '1px'
    },
    contact: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      fontSize: '11pt',
      flexWrap: 'wrap' as const,
      color: 'rgba(255,255,255,0.9)'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    mainContent: {
      padding: '40px',
      backgroundColor: 'white',
      margin: '0 20px 20px 20px',
      borderRadius: '8px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    },
    section: {
      marginBottom: '35px'
    },
    sectionTitle: {
      fontSize: '14pt',
      fontWeight: '600',
      color: '#1e3c72',
      marginBottom: '20px',
      paddingBottom: '8px',
      borderBottom: '3px solid #1e3c72',
      textTransform: 'uppercase' as const,
      letterSpacing: '2px',
      position: 'relative' as const
    },
    sectionTitleAccent: {
      position: 'absolute' as const,
      bottom: '-3px',
      left: '0',
      width: '60px',
      height: '3px',
      background: 'linear-gradient(90deg, #2a5298, #1e3c72)',
      borderRadius: '2px'
    },
    summary: {
      fontSize: '11pt',
      lineHeight: '1.8',
      color: '#333333',
      textAlign: 'justify' as const,
      padding: '25px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      fontStyle: 'italic' as const,
      position: 'relative' as const
    },
    summaryQuote: {
      position: 'absolute' as const,
      top: '10px',
      left: '15px',
      fontSize: '40pt',
      color: '#1e3c72',
      opacity: 0.3,
      fontFamily: 'Georgia, serif',
      lineHeight: '1'
    },
    jobHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '0.75rem'
    },
    experienceItem: {
      marginBottom: '30px',
      padding: '25px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      borderLeft: '4px solid #1e3c72',
      position: 'relative' as const
    },
    jobTitle: {
      fontSize: '14pt',
      fontWeight: '700',
      margin: '0 0 6px 0',
      color: '#1e3c72'
    },
    company: {
      fontSize: '12pt',
      fontWeight: '600',
      color: '#2a5298',
      margin: '0 0 8px 0'
    },
    dates: {
      fontSize: '10pt',
      color: '#666666',
      fontWeight: '500',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      backgroundColor: '#e9ecef',
      padding: '4px 12px',
      borderRadius: '20px',
      display: 'inline-block'
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
      marginBottom: '20px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    },
    degree: {
      fontSize: '12pt',
      fontWeight: '700',
      margin: '0 0 4px 0',
      color: '#1e3c72'
    },
    school: {
      fontSize: '11pt',
      color: '#2a5298',
      margin: '0 0 4px 0',
      fontWeight: '600'
    },
    year: {
      fontSize: '9pt',
      color: '#666666',
      fontWeight: '500',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    skillsGrid: {
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
    skills: {
      fontSize: '10pt',
      lineHeight: '1.4',
      color: '#4a5568'
    },
    skill: {
      marginRight: '10px'
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
      color: '#1e3c72'
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
    achievements: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    achievementItem: {
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      borderLeft: '4px solid #2a5298'
    },
    languagesGrid: {
      display: 'grid',
      gap: '15px',
      marginTop: '15px'
    },
    language: {
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    },
    languageName: {
      fontSize: '11pt',
      fontWeight: '600',
      color: '#1e3c72',
      display: 'block',
      marginBottom: '4px'
    },
    proficiency: {
      fontSize: '9pt',
      color: '#666666',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
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
      <div style={styles.header}>
        <div style={styles.headerOverlay}></div>
        <div style={styles.headerContent}>
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
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Executive Summary */}
        {data.summary && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Executive Summary
              <div style={styles.sectionTitleAccent}></div>
            </h2>
            <div style={styles.summary}>
              <div style={styles.summaryQuote}>"</div>
              <p style={{ margin: 0, paddingLeft: '30px' }}>{data.summary}</p>
            </div>
          </section>
        )}

        {/* Professional Experience */}
        {data.experience.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Professional Experience
              <div style={styles.sectionTitleAccent}></div>
            </h2>
            {data.experience.map((job: Experience, index: number) => (
              <div key={index} style={styles.experienceItem}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={styles.jobTitle}>{job.title}</h3>
                    <p style={styles.company}>{job.company}</p>
                  </div>
                  <div>
                    <span style={styles.dates}>{job.startDate} - {job.endDate}</span>
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
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                Education
                <div style={styles.sectionTitleAccent}></div>
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

          {/* Core Skills */}
          {data.skills.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                Core Competencies
                <div style={styles.sectionTitleAccent}></div>
              </h2>
              <div style={styles.skillsGrid}>
                <div style={styles.skillCategory}>
                  <div style={styles.skillCategoryTitle}>Technical Skills</div>
                  <div style={styles.skills}>
                    {data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill, index) => (
                      <span key={index} style={styles.skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={styles.skillCategory}>
                  <div style={styles.skillCategoryTitle}>Leadership Skills</div>
                  <div style={styles.skills}>
                    {data.skills.slice(Math.ceil(data.skills.length / 2)).map((skill, index) => (
                      <span key={index} style={styles.skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Achievements */}
        {data.achievements?.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Key Achievements
              <div style={styles.sectionTitleAccent}></div>
            </h2>
            <div style={styles.achievements}>
              {data.achievements.map((achievement, index) => (
                <div key={index} style={styles.achievementItem}>
                  <p style={{ margin: 0, fontSize: '10pt', lineHeight: '1.6', color: '#333333' }}>
                    {achievement}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Strategic Projects
              <div style={styles.sectionTitleAccent}></div>
            </h2>
            {data.projects.map((project, index) => (
              <div key={index} style={{
                marginBottom: '20px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                borderLeft: '4px solid #2a5298'
              }}>
                <h3 style={{
                  fontSize: '12pt',
                  fontWeight: '700',
                  margin: '0 0 8px 0',
                  color: '#1e3c72'
                }}>{project.name}</h3>
                <p style={{
                  fontSize: '10pt',
                  lineHeight: '1.6',
                  color: '#333333',
                  margin: '0'
                }}>{project.description}</p>
                {project.url && (
                  <p style={{
                    fontSize: '9pt',
                    color: '#666666',
                    margin: '8px 0 0 0',
                    fontStyle: 'italic' as const
                  }}>
                    {project.url}
                  </p>
                )}
              </div>
            ))}
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
