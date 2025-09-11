import React from 'react';
import { ResumeData, Education, Experience } from '@/app/lib/types';

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', padding: '2rem', backgroundColor: '#f9f9f9' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #aed6f1', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.8rem', margin: 0, color: '#2c3e50' }}>{data.personal.firstName} {data.personal.lastName}</h1>
          <p style={{ fontSize: '1.2rem', margin: '0.5rem 0', color: '#7f8c8d' }}>{data.personal.title}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0.2rem 0' }}>{data.personal.email}</p>
          <p style={{ margin: '0.2rem 0' }}>{data.personal.phone}</p>
          <p style={{ margin: '0.2rem 0' }}>{data.personal.website}</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div>
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#3498db', marginBottom: '1rem', fontWeight: 'bold' }}>Skills</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {data.skills.map((skill: string, index: number) => <li key={index} style={{ marginBottom: '0.5rem', backgroundColor: '#ecf0f1', padding: '0.5rem', borderRadius: '5px' }}>{skill}</li>)}
            </ul>
          </section>
          <section>
            <h2 style={{ color: '#3498db', marginBottom: '1rem', fontWeight: 'bold' }}>Education</h2>
            {data.education.map((edu: Education, index: number) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#34495e' }}>{edu.degree}</h3>
                <p style={{ margin: '0.25rem 0', color: '#7f8c8d' }}>{edu.school}</p>
                <p style={{ margin: '0.25rem 0', fontStyle: 'italic', color: '#95a5a6' }}>{edu.year}</p>
              </div>
            ))}
          </section>
        </div>
        <div>
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#3498db', marginBottom: '1rem', fontWeight: 'bold' }}>Summary</h2>
            <p style={{ lineHeight: 1.6 }}>{data.summary}</p>
          </section>
          <section>
            <h2 style={{ color: '#3498db', marginBottom: '1rem', fontWeight: 'bold' }}>Experience</h2>
            {data.experience.map((job: Experience, index: number) => (
              <div key={index} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#34495e' }}>{job.title}</h3>
                <p style={{ margin: '0.25rem 0', fontWeight: 'bold', color: '#7f8c8d' }}>{job.company} | {job.startDate} - {job.endDate}</p>
                <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', color: '#555' }}>
                  {job.responsibilities.map((resp: string, i: number) => <li key={i} style={{ marginBottom: '0.3rem' }}>{resp}</li>)}
                </ul>
              </div>
            ))}
          </section>
        </div>
        <div>
          {data.projects?.length > 0 && (
            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#3498db', marginBottom: '1rem', fontWeight: 'bold' }}>Projects</h2>
              {data.projects.map((project, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#34495e' }}>{project.name}</h3>
                  {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db' }}>{project.url}</a>}
                  <p style={{ color: '#555' }}>{project.description}</p>
                </div>
              ))}
            </section>
          )}

          {data.achievements?.length > 0 && (
            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#3498db', marginBottom: '1rem', fontWeight: 'bold' }}>Achievements</h2>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', color: '#555' }}>
                {data.achievements.map((achievement, index) => <li key={index} style={{ marginBottom: '0.3rem' }}>{achievement}</li>)}
              </ul>
            </section>
          )}

          {data.languages?.length > 0 && (
            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#3498db', marginBottom: '1rem', fontWeight: 'bold' }}>Languages</h2>
              {data.languages.map((lang, index) => (
                <p key={index} style={{ margin: '0.25rem 0', color: '#555' }}>{lang.name}: <span style={{ fontStyle: 'italic' }}>{lang.proficiency}</span></p>
              ))}
            </section>
          )}

          {data.references?.length > 0 && (
            <section>
              <h2 style={{ color: '#3498db', marginBottom: '1rem', fontWeight: 'bold' }}>References</h2>
              {data.references.map((ref, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#34495e' }}>{ref.name}</h3>
                  <p style={{ margin: '0.25rem 0', color: '#7f8c8d' }}>{ref.title} at {ref.company}</p>
                  <p style={{ margin: '0.25rem 0', color: '#555' }}>{ref.email} | {ref.phone}</p>
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
