import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useProjects } from '../hooks/useProjects';
import { useAdmin } from '../hooks/useAdmin';
import { ExternalLink, Github, Loader2, FolderPlus, Search, X } from 'lucide-react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import '../styles/Projects.css';
import '../styles/ScrollReveal.css';

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const { projects: dbProjects, loading } = useProjects();
  const { isAdmin } = useAdmin();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  
  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const gridReveal = useScrollReveal({ threshold: 0.1 });

  // Get all unique technologies from projects
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    dbProjects.forEach(p => {
      (p.tech_stack || []).forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [dbProjects]);

  // Filter projects based on search and technology
  const filteredProjects = useMemo(() => {
    return dbProjects.filter(project => {
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTech = selectedTech === 'all' || 
        (project.tech_stack || []).includes(selectedTech);
      
      return matchesSearch && matchesTech;
    });
  }, [dbProjects, searchQuery, selectedTech]);

  // Map filtered projects for display
  const projects = filteredProjects.map(p => ({
    title: p.title,
    description: p.description,
    image: p.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    tech: p.tech_stack || [],
    github: p.github_url || '',
    demo: p.demo_url || '',
  }));

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTech('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedTech !== 'all';

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
        ) : dbProjects.length === 0 ? (
          // Empty state
          <div className="projects-empty-state">
            <FolderPlus className="projects-empty-icon" />
            <h3 className="projects-empty-title">Nenhum projeto ainda</h3>
            <p className="projects-empty-description">
              Comece adicionando seu primeiro projeto para mostrar seu trabalho.
            </p>
            {isAdmin && (
              <Link to="/admin" className="projects-empty-cta">
                Criar primeiro projeto
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="projects-filters">
              <div className="projects-search">
                <Search className="projects-search-icon" />
                <Input
                  type="text"
                  placeholder="Buscar por título ou descrição..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="projects-search-input"
                />
              </div>
              <Select value={selectedTech} onValueChange={setSelectedTech}>
                <SelectTrigger className="projects-tech-select">
                  <SelectValue placeholder="Filtrar por tecnologia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as tecnologias</SelectItem>
                  {allTechnologies.map(tech => (
                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="projects-clear-filters">
                  <X size={16} />
                  Limpar filtros
                </button>
              )}
            </div>

            {/* Results info */}
            {hasActiveFilters && (
              <p className="projects-results-info">
                {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
              </p>
            )}

            {/* Projects grid or no results */}
            {projects.length === 0 ? (
              <div className="projects-no-results">
                <p>Nenhum projeto encontrado com os filtros selecionados.</p>
                <button onClick={clearFilters} className="projects-clear-filters-link">
                  Limpar filtros
                </button>
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
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="project-overlay-btn"
                          >
                            <Github size={16} />
                            {t.projects.viewCode}
                          </a>
                        )}
                        {project.demo && (
                          <a 
                            href={project.demo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="project-overlay-btn"
                          >
                            <ExternalLink size={16} />
                            {t.projects.viewDemo}
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="project-content">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="project-tech">
                        {project.tech.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className={`tech-tag ${selectedTech === tech ? 'tech-tag-active' : ''}`}
                            onClick={() => setSelectedTech(tech)}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
