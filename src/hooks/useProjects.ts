import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  tech_stack: string[];
  created_at: string;
  updated_at: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  tech_stack?: string[];
}

const STATIC_PROJECTS: Project[] = [
  {
    id: 'static-1',
    title: 'PowerTec — Sistema para Academias',
    description: 'Sistema fullstack de gestão de academias em produção ativa em múltiplos clientes. Cobre matrículas, pagamentos, controle de presença e acesso físico. Reconhecimento facial no browser com face-api.js, geração de relatórios em PDF e pipeline CI/CD com deploy automatizado.',
    github_url: null,
    demo_url: null,
    tech_stack: ['React 18', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'face-api.js', 'GitHub Actions', 'Vercel', 'Render'],
    image_url: null,
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-02-01T00:00:00Z',
  },
  {
    id: 'static-2',
    title: 'Portal de Transparência Municipal',
    description: 'Portal completo para prefeitura com módulos de transparência ativa, serviços ao cidadão, ouvidoria digital (canal 156), protocolo eletrônico, PWA e API pública de dados abertos. Containerizado com Docker e integrado a sistemas legados institucionais.',
    github_url: null,
    demo_url: null,
    tech_stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma ORM', 'Redis', 'Docker', 'JWT'],
    image_url: null,
    created_at: '2025-10-01T00:00:00Z',
    updated_at: '2025-10-01T00:00:00Z',
  },
  {
    id: 'static-3',
    title: 'CellStore — Gestão de Estoque',
    description: 'Sistema fullstack de inventário para loja de acessórios em monorepo com Clean Architecture. Controle de produtos, vendas, relatórios e multi-usuário com RBAC. CI/CD completo com GitHub Actions e deploy Vercel + Render.',
    github_url: 'https://github.com/LuksFP/sistema-matricula',
    demo_url: null,
    tech_stack: ['React 18', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'Zod', 'GitHub Actions'],
    image_url: null,
    created_at: '2026-02-21T00:00:00Z',
    updated_at: '2026-02-21T00:00:00Z',
  },
  {
    id: 'static-4',
    title: 'EduPlatform — Plataforma EAD Corporativa',
    description: 'Portal educacional estilo Alura/Udemy com processamento de vídeo, geração de certificados PDF, autenticação JWT com controle de acesso por roles (RBAC) e scripts de deploy para AWS EC2.',
    github_url: 'https://github.com/LuksFP/EdTech',
    demo_url: null,
    tech_stack: ['React 18', 'TypeScript', 'Node.js', 'PostgreSQL', 'JWT', 'AWS EC2'],
    image_url: null,
    created_at: '2026-01-20T00:00:00Z',
    updated_at: '2026-01-20T00:00:00Z',
  },
  {
    id: 'static-5',
    title: 'JARVIS — Assistente de Voz com IA',
    description: 'Assistente de voz fullstack com reconhecimento de fala via Web Speech API, integração com LLM (Groq API / Llama 3), síntese de voz com ElevenLabs TTS e persistência de histórico em banco SQL. Deploy em Railway e Vercel.',
    github_url: 'https://github.com/LuksFP/JARVIS',
    demo_url: null,
    tech_stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Groq API', 'ElevenLabs', 'Web Speech API', 'Railway'],
    image_url: null,
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-01-10T00:00:00Z',
  },
  {
    id: 'static-6',
    title: 'PowerTec — Redesign Institucional',
    description: 'Redesign visual completo do site institucional da PowerTec Tecnologia. WordPress com PHP customizado, landing pages por segmento de serviço, identidade visual redesenhada do zero, com otimizações de SEO e performance.',
    github_url: null,
    demo_url: null,
    tech_stack: ['WordPress', 'PHP', 'HTML5', 'CSS3', 'JavaScript', 'Figma', 'SEO'],
    image_url: null,
    created_at: '2025-12-01T00:00:00Z',
    updated_at: '2025-12-01T00:00:00Z',
  },
  {
    id: 'static-7',
    title: 'Fintech Simulator — Dashboard Financeiro',
    description: 'Dashboard financeiro com CRUD de transações, relatórios gráficos, metas financeiras com progresso visual e exportação CSV. Interface construída com Shadcn/UI e dados persistidos no Supabase via Edge Functions.',
    github_url: 'https://github.com/LuksFP/FinTech-Simulator',
    demo_url: null,
    tech_stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Shadcn/UI', 'PostgreSQL', 'Supabase'],
    image_url: null,
    created_at: '2026-01-16T00:00:00Z',
    updated_at: '2026-01-16T00:00:00Z',
  },
];

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const fetched = data || [];
      setProjects(fetched.length > 0 ? fetched : STATIC_PROJECTS);
    } catch (error: unknown) {
      setProjects(STATIC_PROJECTS);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = async (project: ProjectInput) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...project,
          tech_stack: project.tech_stack || [],
        }])
        .select()
        .single();

      if (error) throw error;

      setProjects(prev => [data, ...prev]);
      toast({
        title: 'Projeto criado!',
        description: 'O projeto foi adicionado com sucesso.',
      });
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro inesperado';
      toast({
        title: 'Erro ao criar projeto',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateProject = async (id: string, project: Partial<ProjectInput>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProjects(prev => prev.map(p => p.id === id ? data : p));
      toast({
        title: 'Projeto atualizado!',
        description: 'As alterações foram salvas.',
      });
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro inesperado';
      toast({
        title: 'Erro ao atualizar projeto',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(prev => prev.filter(p => p.id !== id));
      toast({
        title: 'Projeto excluído!',
        description: 'O projeto foi removido com sucesso.',
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro inesperado';
      toast({
        title: 'Erro ao excluir projeto',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};
