import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { Github, Star, GitFork, ExternalLink, AlertCircle } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import '../styles/GitHubRepos.css';

const GITHUB_USERNAME = 'LuksFP';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python:     '#3572A5',
  Java:       '#b07219',
  Go:         '#00ADD8',
  Rust:       '#dea584',
  Ruby:       '#701516',
  PHP:        '#4F5D95',
  CSS:        '#563d7c',
  HTML:       '#e34c26',
  Shell:      '#89e051',
  Dart:       '#00B4AB',
  Kotlin:     '#A97BFF',
  Swift:      '#F05138',
};

const langColor = (lang: string | null) => LANG_COLORS[lang ?? ''] ?? '#8b8b8b';

const GitHubRepos: React.FC = () => {
  const { t, language } = useLanguage();
  const { repos, loading, error } = useGitHubRepos({
    username: GITHUB_USERNAME,
    perPage: 6,
    sort: 'pushed',
  });

  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const gridReveal  = useScrollReveal({ threshold: 0.1 });

  const formatDate = (dateString: string) => {
    const locale = language === 'pt' ? 'pt-BR' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  };

  return (
    <section id="github" className="github-section section">
      <div className="container">
        <div
          ref={titleReveal.ref}
          className={`section-header reveal ${titleReveal.isVisible ? 'visible' : ''}`}
        >
          <span className="section-number" aria-hidden="true">04</span>
          <div>
            <h2 className="section-title">{t.github.title}</h2>
            <p className="section-subtitle">{t.github.subtitle}</p>
          </div>
        </div>

        {loading ? (
          <div className="github-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="github-card animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="github-card-titlebar">
                  <div className="github-card-dots">
                    <span className="github-card-dot github-card-dot--red" />
                    <span className="github-card-dot github-card-dot--yellow" />
                    <span className="github-card-dot github-card-dot--green" />
                  </div>
                </div>
                <div className="github-card-body">
                  <Skeleton className="h-5 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
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
            <p>{t.github.noRepos}</p>
          </div>
        ) : (
          <div
            ref={gridReveal.ref}
            className={`github-grid stagger-children ${gridReveal.isVisible ? 'visible' : ''}`}
          >
            {repos.map((repo) => {
              const color = langColor(repo.language ?? null);
              return (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-card"
                  style={{ '--card-lang-color': color } as React.CSSProperties}
                >
                  {/* IDE title bar */}
                  <div className="github-card-titlebar">
                    <div className="github-card-dots">
                      <span className="github-card-dot github-card-dot--red" />
                      <span className="github-card-dot github-card-dot--yellow" />
                      <span className="github-card-dot github-card-dot--green" />
                    </div>
                    <span className="github-card-filename">
                      {repo.name.toLowerCase().replace(/-/g, '_')}.{repo.language === 'TypeScript' ? 'ts' : repo.language === 'Python' ? 'py' : repo.language === 'Java' ? 'java' : 'js'}
                    </span>
                    <ExternalLink size={12} className="github-external-icon" />
                  </div>

                  {/* Body */}
                  <div className="github-card-body">
                    <div className="github-card-header">
                      <h3 className="github-repo-name">
                        <Github size={15} className="shrink-0" />
                        <span>{repo.name}</span>
                      </h3>
                    </div>

                    <p className="github-repo-description">
                      {repo.description || t.github.noDescription}
                    </p>

                    {repo.topics && repo.topics.length > 0 && (
                      <div className="github-topics">
                        {repo.topics.slice(0, 4).map(topic => (
                          <span key={topic} className="github-topic">{topic}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer stats */}
                  <div className="github-card-footer">
                    <div className="github-repo-meta">
                      {repo.language && (
                        <span className="github-language">
                          <span
                            className="github-language-dot"
                            style={{ backgroundColor: color, color }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="github-stat">
                        <Star size={13} />
                        {repo.stargazers_count}
                      </span>
                      <span className="github-stat">
                        <GitFork size={13} />
                        {repo.forks_count}
                      </span>
                    </div>
                    <p className="github-updated">
                      {formatDate(repo.pushed_at)}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        <div className="github-cta">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-cta-btn"
          >
            <Github size={18} />
            {t.github.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubRepos;
