import { useState, useMemo, useEffect, useCallback, memo } from 'react';
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
  const { t, language } = useLanguage();
  const { projects: dbProjects, loading } = useProjects();
  const { isAdmin } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const gridReveal = useScrollReveal({ threshold: 0.1 });

  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    dbProjects.forEach((p) => {
      (p.tech_stack || []).forEach((tech) => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [dbProjects]);

  const filteredAndSortedProjects = useMemo(() => {
    let result = dbProjects.filter((project) => {
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTech =
        selectedTech === 'all' || (project.tech_stack || []).includes(selectedTech);

      return matchesSearch && matchesTech;
    });

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

  const totalPages = Math.ceil(filteredAndSortedProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProjects, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTech, sortBy]);

  const projects = paginatedProjects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image_url || null,
    tech: p.tech_stack || [],
    github: p.github_url || '',
    demo: p.demo_url || '',
  }));

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTech('all');
    setSortBy('newest');
  }, []);

  const hasActiveFilters = searchQuery !== '' || selectedTech !== 'all';

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const searchPlaceholder = language === 'pt' ? 'Buscar projeto...' : 'Search project...';
  const techPlaceholder = language === 'pt' ? 'Tecnologia' : 'Technology';
  const allTechLabel = language === 'pt' ? 'Todas' : 'All';
  const sortLabels: Record<SortOption, string> = language === 'pt'
    ? { newest: 'Mais recentes', oldest: 'Mais antigos', 'title-asc': 'Título A-Z', 'title-desc': 'Título Z-A' }
    : { newest: 'Newest', oldest: 'Oldest', 'title-asc': 'Title A-Z', 'title-desc': 'Title Z-A' };

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
          <div className="projects-empty-state animate-fade-in">
            <FolderPlus className="projects-empty-icon" />
            <h3 className="projects-empty-title">
              {language === 'pt' ? 'Nenhum projeto ainda' : 'No projects yet'}
            </h3>
            <p className="projects-empty-description">
              {language === 'pt'
                ? 'Comece adicionando seu primeiro projeto.'
                : 'Start by adding your first project.'}
            </p>
            {isAdmin && (
              <Link to="/admin" className="projects-empty-cta">
                {language === 'pt' ? 'Criar primeiro projeto' : 'Create first project'}
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
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="projects-search-input"
                />
                {searchQuery && (
                  <button
                    className="projects-search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <Select value={selectedTech} onValueChange={setSelectedTech}>
                <SelectTrigger className="projects-tech-select">
                  <SelectValue placeholder={techPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{allTechLabel}</SelectItem>
                  {allTechnologies.map((tech) => (
                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="projects-sort-select">
                  <ArrowUpDown size={14} className="mr-1.5 opacity-60" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                    <SelectItem key={key} value={key}>{sortLabels[key]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="projects-clear-filters">
                  <X size={14} />
                  {language === 'pt' ? 'Limpar' : 'Clear'}
                </button>
              )}
            </div>

            {hasActiveFilters && (
              <p className="projects-results-info">
                {filteredAndSortedProjects.length}{' '}
                {language === 'pt'
                  ? `projeto${filteredAndSortedProjects.length !== 1 ? 's' : ''} encontrado${filteredAndSortedProjects.length !== 1 ? 's' : ''}`
                  : `project${filteredAndSortedProjects.length !== 1 ? 's' : ''} found`}
              </p>
            )}

            {projects.length === 0 ? (
              <div className="projects-no-results animate-fade-in">
                <p>{language === 'pt' ? 'Nenhum projeto encontrado.' : 'No projects found.'}</p>
                <button onClick={clearFilters} className="projects-clear-filters-link">
                  {language === 'pt' ? 'Limpar filtros' : 'Clear filters'}
                </button>
              </div>
            ) : (
              <>
                <div
                  ref={gridReveal.ref}
                  className={`projects-grid stagger-children ${gridReveal.isVisible ? 'visible' : ''}`}
                >
                  {projects.map((project, index) => (
                    <article key={project.id} className="project-card">
                      <div className="project-image">
                        {project.image ? (
                          <img src={project.image} alt={project.title} loading="lazy" />
                        ) : (
                          <div className="project-image-placeholder">
                            <span className="project-number">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                        )}
                        {(project.github || project.demo) && (
                          <div className="project-overlay">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-overlay-btn"
                                aria-label={`${t.projects.viewCode} — ${project.title}`}
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
                                className="project-overlay-btn project-overlay-btn--demo"
                                aria-label={`${t.projects.viewDemo} — ${project.title}`}
                              >
                                <ExternalLink size={16} />
                                {t.projects.viewDemo}
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="project-content">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <div className="project-tech">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className={`tech-tag ${selectedTech === tech ? 'tech-tag-active' : ''}`}
                              onClick={() => setSelectedTech(tech)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => e.key === 'Enter' && setSelectedTech(tech)}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="project-links">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link project-link--code"
                            >
                              <Github size={15} />
                              {t.projects.viewCode}
                            </a>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link project-link--demo"
                            >
                              <ExternalLink size={15} />
                              {t.projects.viewDemo}
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="projects-pagination">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                      aria-label={language === 'pt' ? 'Página anterior' : 'Previous page'}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="pagination-pages">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`pagination-page ${currentPage === page ? 'pagination-page-active' : ''}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination-btn"
                      aria-label={language === 'pt' ? 'Próxima página' : 'Next page'}
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

export default memo(Projects);
