import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useProjects } from '../hooks/useProjects';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import '../styles/Projects.css';
import '../styles/ScrollReveal.css';

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const { projects: dbProjects, loading } = useProjects();
  
  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const gridReveal = useScrollReveal({ threshold: 0.1 });

  // Use database projects if available, otherwise fallback to static
  const projects = dbProjects.length > 0 
    ? dbProjects.map(p => ({
        title: p.title,
        description: p.description,
        image: p.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        tech: p.tech_stack || [],
        github: p.github_url || '',
        demo: p.demo_url || '',
      }))
    : [
        {
          ...t.projects.items[0],
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
          tech: ['React', 'TypeScript', 'Chart.js', 'Tailwind'],
          github: 'https://github.com',
          demo: 'https://demo.com',
        },
        {
          ...t.projects.items[1],
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
          tech: ['React', 'Redux', 'Node.js', 'MongoDB'],
          github: 'https://github.com',
          demo: 'https://demo.com',
        },
        {
          ...t.projects.items[2],
          image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop',
          tech: ['React', 'API REST', 'CSS3', 'Geolocation'],
          github: 'https://github.com',
          demo: 'https://demo.com',
        },
      ];

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div 
          ref={titleReveal.ref}
          className={`reveal ${titleReveal.isVisible ? 'visible' : ''}`}
        >
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-subtitle">{t.projects.subtitle}</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--color-primary))]" />
          </div>
        ) : (
        <div 
          ref={gridReveal.ref}
          className={`projects-grid stagger-children ${gridReveal.isVisible ? 'visible' : ''}`}
        >
          {projects.map((project, index) => (
            <article key={index} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-overlay-btn"
                  >
                    <Github size={16} />
                    {t.projects.viewCode}
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-overlay-btn"
                  >
                    <ExternalLink size={16} />
                    {t.projects.viewDemo}
                  </a>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
