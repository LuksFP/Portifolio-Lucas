import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { Github, Star, GitFork, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import '../styles/GitHubRepos.css';

const GITHUB_USERNAME = 'LuksFP'; // Seu username do GitHub

const GitHubRepos: React.FC = () => {
  const { repos, loading, error } = useGitHubRepos({ 
    username: GITHUB_USERNAME, 
    perPage: 6,
    sort: 'pushed' 
  });
  
  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const gridReveal = useScrollReveal({ threshold: 0.1 });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      Python: '#3572A5',
      Java: '#b07219',
      Go: '#00ADD8',
      Rust: '#dea584',
      Ruby: '#701516',
      PHP: '#4F5D95',
      CSS: '#563d7c',
      HTML: '#e34c26',
      Shell: '#89e051',
      Dart: '#00B4AB',
      Kotlin: '#A97BFF',
      Swift: '#F05138',
    };
    return colors[language || ''] || '#8b8b8b';
  };

  return (
    <section id="github" className="github-section section">
      <div className="container">
        <div 
          ref={titleReveal.ref}
          className={`reveal ${titleReveal.isVisible ? 'visible' : ''}`}
        >
          <h2 className="section-title">
            <Github className="inline-block mr-3 mb-1" size={32} />
            Repositórios GitHub
          </h2>
          <p className="section-subtitle">
            Meus projetos mais recentes no GitHub
          </p>
        </div>

        {loading ? (
          <div className="github-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="github-card animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="github-error animate-fade-in">
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <p>{error}</p>
          </div>
        ) : repos.length === 0 ? (
          <div className="github-empty animate-fade-in">
            <Github className="w-12 h-12 mb-4 opacity-50" />
            <p>Nenhum repositório público encontrado.</p>
          </div>
        ) : (
          <div 
            ref={gridReveal.ref}
            className={`github-grid stagger-children ${gridReveal.isVisible ? 'visible' : ''}`}
          >
            {repos.map((repo, index) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="github-card"
              >
                <div className="github-card-header">
                  <h3 className="github-repo-name">
                    <Github size={18} className="shrink-0" />
                    <span>{repo.name}</span>
                  </h3>
                  <ExternalLink size={16} className="github-external-icon" />
                </div>
                
                <p className="github-repo-description">
                  {repo.description || 'Sem descrição'}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="github-topics">
                    {repo.topics.slice(0, 3).map(topic => (
                      <span key={topic} className="github-topic">{topic}</span>
                    ))}
                  </div>
                )}

                <div className="github-repo-meta">
                  {repo.language && (
                    <span className="github-language">
                      <span 
                        className="github-language-dot" 
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="github-stat">
                    <Star size={14} />
                    {repo.stargazers_count}
                  </span>
                  <span className="github-stat">
                    <GitFork size={14} />
                    {repo.forks_count}
                  </span>
                </div>

                <p className="github-updated">
                  Atualizado em {formatDate(repo.pushed_at)}
                </p>
              </a>
            ))}
          </div>
        )}

        <div className="github-cta">
          <a 
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-cta-btn"
          >
            <Github size={20} />
            Ver todos os repositórios
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubRepos;
