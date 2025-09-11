import React from 'react';
import { ResumeData, Experience, Education } from '@/app/lib/types';

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  return (
    <div style={{ fontFamily: 'Times New Roman, serif', padding: '2rem', border: '1px solid #ccc' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{data.personal.firstName} {data.personal.lastName}</h1>
        <p style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>{data.personal.email} | {data.personal.phone} | {data.personal.website}</p>
      </header>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Summary</h2>
        <p>{data.summary}</p>
      </section>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Experience</h2>
        {data.experience.map((job: Experience, index: number) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>{job.title} at {job.company}</h3>
            <p style={{ margin: '0.25rem 0', fontStyle: 'italic' }}>{job.startDate} - {job.endDate}</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              {job.responsibilities.map((resp: string, i: number) => <li key={i}>{resp}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Education</h2>
        {data.education.map((edu: Education, index: number) => (
          <div key={index}>
            <h3 style={{ margin: 0 }}>{edu.degree} in {edu.field}</h3>
            <p style={{ margin: '0.25rem 0' }}>{edu.school}, {edu.year}</p>
          </div>
        ))}
      </section>

      {data.projects?.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>{project.name}</h3>
              {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>{project.url}</a>}
              <p style={{ margin: '0.25rem 0' }}>{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.achievements?.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Achievements</h2>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            {data.achievements.map((achievement, index) => <li key={index}>{achievement}</li>)}
          </ul>
        </section>
      )}

      {data.languages?.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Languages</h2>
          {data.languages.map((lang, index) => (
            <p key={index} style={{ margin: '0.25rem 0' }}>{lang.name} ({lang.proficiency})</p>
          ))}
        </section>
      )}

      {data.references?.length > 0 && (
        <section>
          <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>References</h2>
          {data.references.map((ref, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>{ref.name}</h3>
              <p style={{ margin: '0.25rem 0' }}>{ref.title} at {ref.company}</p>
              <p style={{ margin: '0.25rem 0' }}>{ref.email} | {ref.phone}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
