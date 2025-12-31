import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useProjects } from '../hooks/useProjects';
import { useAdmin } from '../hooks/useAdmin';
import { ExternalLink, Github, FolderPlus, Search, X, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import ProjectSkeleton from './ProjectSkeleton';
import '../styles/Projects.css';
import '../styles/ScrollReveal.css';

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

const ITEMS_PER_PAGE = 6;

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const { projects: dbProjects, loading } = useProjects();
  const { isAdmin } = useAdmin();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  
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

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let result = dbProjects.filter(project => {
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTech = selectedTech === 'all' || 
        (project.tech_stack || []).includes(selectedTech);
      
      return matchesSearch && matchesTech;
    });

    // Sort projects
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [dbProjects, searchQuery, selectedTech, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProjects, currentPage]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTech, sortBy]);

  // Map projects for display
  const projects = paginatedProjects.map(p => ({
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
    setSortBy('newest');
  };

  const hasActiveFilters = searchQuery !== '' || selectedTech !== 'all';

  const goToPage = (page: number) => {
    setCurrentPage(page);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

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
          <ProjectSkeleton count={6} />
        ) : dbProjects.length === 0 ? (
          // Empty state
          <div className="projects-empty-state animate-fade-in">
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
            <div className="projects-filters animate-fade-in">
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
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="projects-sort-select">
                  <ArrowUpDown size={16} className="mr-2" />
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mais recentes</SelectItem>
                  <SelectItem value="oldest">Mais antigos</SelectItem>
                  <SelectItem value="title-asc">Título (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Título (Z-A)</SelectItem>
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
                {filteredAndSortedProjects.length} projeto{filteredAndSortedProjects.length !== 1 ? 's' : ''} encontrado{filteredAndSortedProjects.length !== 1 ? 's' : ''}
              </p>
            )}

            {/* Projects grid or no results */}
            {projects.length === 0 ? (
              <div className="projects-no-results animate-fade-in">
                <p>Nenhum projeto encontrado com os filtros selecionados.</p>
                <button onClick={clearFilters} className="projects-clear-filters-link">
                  Limpar filtros
                </button>
              </div>
            ) : (
              <>
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="projects-pagination">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                      aria-label="Página anterior"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <div className="pagination-pages">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`pagination-page ${currentPage === page ? 'pagination-page-active' : ''}`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination-btn"
                      aria-label="Próxima página"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
