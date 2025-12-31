import { useState, useEffect } from 'react';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string;
}

interface UseGitHubReposOptions {
  username: string;
  perPage?: number;
  sort?: 'updated' | 'created' | 'pushed' | 'full_name';
}

export const useGitHubRepos = ({ username, perPage = 6, sort = 'pushed' }: UseGitHubReposOptions) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      if (!username) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${perPage}&sort=${sort}&direction=desc`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Usuário não encontrado');
          }
          if (response.status === 403) {
            throw new Error('Limite de requisições atingido. Tente novamente mais tarde.');
          }
          throw new Error('Erro ao carregar repositórios');
        }

        const data = await response.json();
        setRepos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, perPage, sort]);

  return { repos, loading, error };
};
