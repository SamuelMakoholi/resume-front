import React from 'react';
import { ResumeData, Experience, Education } from '@/app/lib/types';

interface CreativeTemplateProps {
  data: ResumeData;
  fontFamily?: string;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data, fontFamily = 'Inter, sans-serif' }) => {
  const accentColor = '#8b5cf6'; // Purple accent
  const secondaryColor = '#f0f4f8'; // Light blue-gray
  
  const styles = {
    container: {
      fontFamily,
      maxWidth: '8.5in',
      minHeight: '11in',
      margin: '0 auto',
      backgroundColor: 'white',
      color: '#333',
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
    },
    sidebar: {
      backgroundColor: secondaryColor,
      padding: '40px 25px',
      color: '#333',
      position: 'relative' as const,
      borderRight: `5px solid ${accentColor}`
    },
    main: {
      padding: '40px 35px',
    },
    profileCircle: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      backgroundColor: accentColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 30px auto',
      color: 'white',
      fontSize: '48px',
      fontWeight: 'bold' as const,
    },
    name: {
      fontSize: '28px',
      fontWeight: '700',
      textAlign: 'center' as const,
      margin: '0 0 5px 0',
      color: '#222',
    },
    title: {
      fontSize: '16px',
      fontWeight: '500',
      textAlign: 'center' as const,
      margin: '0 0 30px 0',
      color: accentColor,
      letterSpacing: '1px',
    },
    contactSection: {
      marginBottom: '35px',
    },
    sidebarHeading: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '15px',
      color: '#222',
      position: 'relative' as const,
      paddingBottom: '8px',
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
    },
    sidebarHeadingLine: {
      content: '""',
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      width: '40px',
      height: '3px',
      backgroundColor: accentColor,
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
      fontSize: '14px',
    },
    contactIcon: {
      width: '28px',
      height: '28px',
      backgroundColor: accentColor,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px',
      color: 'white',
      fontSize: '14px',
    },
    skillsContainer: {
      marginBottom: '35px',
    },
    skillItem: {
      marginBottom: '12px',
    },
    skillName: {
      fontSize: '14px',
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    skillBar: {
      height: '6px',
      backgroundColor: '#ddd',
      borderRadius: '3px',
      overflow: 'hidden' as const,
    },
    skillLevel: {
      height: '100%',
      backgroundColor: accentColor,
    },
    languageItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      fontSize: '14px',
    },
    mainHeading: {
      fontSize: '22px',
      fontWeight: '700',
      marginBottom: '20px',
      color: '#222',
      position: 'relative' as const,
      paddingBottom: '10px',
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
    },
    mainHeadingLine: {
      content: '""',
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      width: '50px',
      height: '3px',
      backgroundColor: accentColor,
    },
    section: {
      marginBottom: '35px',
    },
    summary: {
      fontSize: '15px',
      lineHeight: '1.6',
      color: '#444',
    },
    experienceItem: {
      marginBottom: '25px',
      position: 'relative' as const,
      paddingLeft: '20px',
      borderLeft: `2px solid ${accentColor}`,
    },
    jobHeader: {
      marginBottom: '10px',
    },
    jobTitle: {
      fontSize: '17px',
      fontWeight: '600',
      color: '#222',
      margin: '0 0 5px 0',
    },
    jobSubtitle: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#555',
    },
    company: {
      fontWeight: '500',
    },
    dates: {
      color: accentColor,
      fontWeight: '500',
    },
    responsibilities: {
      margin: '10px 0 0 0',
      padding: '0 0 0 15px',
    },
    responsibility: {
      fontSize: '14px',
      marginBottom: '5px',
      lineHeight: '1.5',
      position: 'relative' as const,
    },
    educationItem: {
      marginBottom: '20px',
    },
    degree: {
      fontSize: '16px',
      fontWeight: '600',
      margin: '0 0 5px 0',
      color: '#222',
    },
    school: {
      fontSize: '14px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    },
    projectItem: {
      backgroundColor: secondaryColor,
      padding: '15px',
      borderRadius: '5px',
      border: `1px solid #e2e8f0`,
      position: 'relative' as const,
    },
    projectName: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '8px',
      color: '#222',
    },
    projectUrl: {
      fontSize: '13px',
      color: accentColor,
      marginBottom: '8px',
      display: 'block',
    },
    projectDescription: {
      fontSize: '13px',
      lineHeight: '1.5',
    },
    achievementsContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
    },
    achievementItem: {
      backgroundColor: secondaryColor,
      padding: '15px',
      borderRadius: '5px',
      fontSize: '14px',
      lineHeight: '1.5',
      position: 'relative' as const,
      borderLeft: `3px solid ${accentColor}`,
    },
    referencesContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    },
    referenceItem: {
      padding: '15px',
      borderRadius: '5px',
      border: `1px solid #e2e8f0`,
    },
    referenceName: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '5px',
      color: '#222',
    },
    referenceTitle: {
      fontSize: '14px',
      color: accentColor,
      marginBottom: '5px',
    },
    referenceCompany: {
      fontSize: '14px',
      marginBottom: '5px',
    },
    referenceContact: {
      fontSize: '13px',
      color: '#555',
    },
  };

  // Get initials for profile circle
  const getInitials = () => {
    const firstName = data.personal.firstName || '';
    const lastName = data.personal.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  // Calculate skill level (for display purposes)
  const getSkillLevel = (index: number, total: number) => {
    // Distribute skills from 70% to 95% based on their position in the array
    const minLevel = 70;
    const maxLevel = 95;
    const step = (maxLevel - minLevel) / (total > 1 ? total - 1 : 1);
    return minLevel + (index * step);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.profileCircle}>
          {getInitials()}
        </div>
        <h1 style={styles.name}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        {data.personal.title && (
          <p style={styles.title}>{data.personal.title}</p>
        )}

        {/* Contact Information */}
        <div style={styles.contactSection}>
          <h2 style={styles.sidebarHeading}>
            Contact
            <div style={styles.sidebarHeadingLine}></div>
          </h2>
          {data.personal.email && (
            <div style={styles.contactItem}>
              <div style={styles.contactIcon}>✉</div>
              <span>{data.personal.email}</span>
            </div>
          )}
          {data.personal.phone && (
            <div style={styles.contactItem}>
              <div style={styles.contactIcon}>✆</div>
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal.website && (
            <div style={styles.contactItem}>
              <div style={styles.contactIcon}>🌐</div>
              <span>{data.personal.website}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div style={styles.skillsContainer}>
            <h2 style={styles.sidebarHeading}>
              Skills
              <div style={styles.sidebarHeadingLine}></div>
            </h2>
            {data.skills.slice(0, 6).map((skill, index) => (
              <div key={index} style={styles.skillItem}>
                <div style={styles.skillName}>
                  <span>{skill}</span>
                  <span>{getSkillLevel(index, data.skills.length)}%</span>
                </div>
                <div style={styles.skillBar}>
                  <div 
                    style={{
                      ...styles.skillLevel,
                      width: `${getSkillLevel(index, data.skills.length)}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages?.length > 0 && (
          <div>
            <h2 style={styles.sidebarHeading}>
              Languages
              <div style={styles.sidebarHeadingLine}></div>
            </h2>
            {data.languages.map((lang, index) => (
              <div key={index} style={styles.languageItem}>
                <span>{lang.name}</span>
                <span style={{ color: accentColor, fontWeight: '500' }}>{lang.proficiency}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Professional Summary */}
        {data.summary && (
          <section style={styles.section}>
            <h2 style={styles.mainHeading}>
              About Me
              <div style={styles.mainHeadingLine}></div>
            </h2>
            <p style={styles.summary}>{data.summary}</p>
          </section>
        )}

        {/* Professional Experience */}
        {data.experience.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.mainHeading}>
              Experience
              <div style={styles.mainHeadingLine}></div>
            </h2>
            {data.experience.map((job: Experience, index: number) => (
              <div key={index} style={styles.experienceItem}>
                <div style={styles.jobHeader}>
                  <h3 style={styles.jobTitle}>{job.title}</h3>
                  <div style={styles.jobSubtitle}>
                    <span style={styles.company}>{job.company}</span>
                    <span style={styles.dates}>{job.startDate} - {job.endDate}</span>
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
            <h2 style={styles.mainHeading}>
              Education
              <div style={styles.mainHeadingLine}></div>
            </h2>
            {data.education.map((edu: Education, index: number) => (
              <div key={index} style={styles.educationItem}>
                <h3 style={styles.degree}>{edu.degree} in {edu.field}</h3>
                <div style={styles.school}>
                  <span>{edu.school}</span>
                  <span style={{ color: accentColor }}>{edu.year}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.mainHeading}>
              Projects
              <div style={styles.mainHeadingLine}></div>
            </h2>
            <div style={styles.projectsGrid}>
              {data.projects.map((project, index) => (
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
        )}

        {/* Achievements */}
        {data.achievements?.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.mainHeading}>
              Achievements
              <div style={styles.mainHeadingLine}></div>
            </h2>
            <div style={styles.achievementsContainer}>
              {data.achievements.map((achievement, index) => (
                <div key={index} style={styles.achievementItem}>
                  {achievement}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references?.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.mainHeading}>
              References
              <div style={styles.mainHeadingLine}></div>
            </h2>
            <div style={styles.referencesContainer}>
              {data.references.map((ref, index) => (
                <div key={index} style={styles.referenceItem}>
                  <h3 style={styles.referenceName}>{ref.name}</h3>
                  <p style={styles.referenceTitle}>{ref.title}</p>
                  <p style={styles.referenceCompany}>{ref.company}</p>
                  <p style={styles.referenceContact}>{ref.email} | {ref.phone}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
