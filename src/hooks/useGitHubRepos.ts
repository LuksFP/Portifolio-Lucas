import { useQuery } from '@tanstack/react-query';

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

const fetchRepos = async (
  username: string,
  perPage: number,
  sort: string,
): Promise<GitHubRepo[]> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=${perPage}&sort=${sort}&direction=desc`,
    { headers: { Accept: 'application/vnd.github.v3+json' } },
  );

  if (!response.ok) {
    if (response.status === 404) throw new Error('Usuário não encontrado');
    if (response.status === 403)
      throw new Error('Limite de requisições atingido. Tente novamente mais tarde.');
    throw new Error('Erro ao carregar repositórios');
  }

  return response.json();
};

export const useGitHubRepos = ({
  username,
  perPage = 6,
  sort = 'pushed',
}: UseGitHubReposOptions) => {
  const { data, isLoading, error } = useQuery<GitHubRepo[], Error>({
    queryKey: ['github-repos', username, perPage, sort],
    queryFn: () => fetchRepos(username, perPage, sort),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    repos: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
  };
};
