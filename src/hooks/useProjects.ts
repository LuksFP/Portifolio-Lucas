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
    title: 'Nubank Skills — Frontend Test',
    description: 'Teste técnico de skills frontend para a Nubank. Aplicação Next.js com App Router demonstrando domínio de TypeScript, componentização e padrões modernos de desenvolvimento React.',
    github_url: 'https://github.com/LuksFP/nubank-teste-skills-forntend',
    demo_url: null,
    tech_stack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS'],
    image_url: null,
    created_at: '2026-03-16T00:00:00Z',
    updated_at: '2026-03-16T00:00:00Z',
  },
  {
    id: 'static-2',
    title: 'ZAYQ — E-commerce Premium',
    description: 'Storefront de e-commerce inspirado na Apple com UI minimalista, arquitetura baseada em features e fluxo de pedidos de alta conversão via WhatsApp.',
    github_url: 'https://github.com/LuksFP/ZAYQ',
    demo_url: null,
    tech_stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS'],
    image_url: null,
    created_at: '2026-02-02T00:00:00Z',
    updated_at: '2026-02-02T00:00:00Z',
  },
  {
    id: 'static-3',
    title: 'Sistema de Matrícula',
    description: 'Sistema fullstack de gerenciamento de matrículas com controle de pagamento e acesso via leitor de crachá USB. Arquitetura limpa com controllers, services e repositories, validação Zod e ORM Prisma.',
    github_url: 'https://github.com/LuksFP/sistema-matricula',
    demo_url: null,
    tech_stack: ['TypeScript', 'Node.js', 'Prisma', 'PostgreSQL', 'Zod', 'React'],
    image_url: null,
    created_at: '2026-02-21T00:00:00Z',
    updated_at: '2026-02-21T00:00:00Z',
  },
  {
    id: 'static-4',
    title: 'EdTech — Plataforma de Cursos Online',
    description: 'Plataforma fullstack completa de gerenciamento de cursos com portal do aluno, painel administrativo, certificados PDF automáticos, progresso em tempo real e tema claro/escuro.',
    github_url: 'https://github.com/LuksFP/EdTech',
    demo_url: null,
    tech_stack: ['TypeScript', 'React', 'Supabase', 'Tailwind CSS', 'PostgreSQL'],
    image_url: null,
    created_at: '2026-01-20T00:00:00Z',
    updated_at: '2026-01-20T00:00:00Z',
  },
  {
    id: 'static-5',
    title: 'LojaElegante — E-commerce com IA',
    description: 'Plataforma de e-commerce completa com catálogo por categorias, busca com autocomplete, chatbot com IA integrado e painel administrativo com CRUD de produtos.',
    github_url: 'https://github.com/LuksFP/Eccomerce',
    demo_url: null,
    tech_stack: ['TypeScript', 'React', 'Supabase', 'Tailwind CSS', 'AI Chatbot'],
    image_url: null,
    created_at: '2026-01-16T00:00:00Z',
    updated_at: '2026-01-16T00:00:00Z',
  },
  {
    id: 'static-6',
    title: 'Mini Fintech — Controle Financeiro',
    description: 'Sistema de controle financeiro pessoal com dashboard de estatísticas, gráficos de evolução mensal, metas financeiras com progresso visual e filtros de período personalizados.',
    github_url: 'https://github.com/LuksFP/FinTech-Simulator',
    demo_url: null,
    tech_stack: ['TypeScript', 'React', 'Supabase', 'Tailwind CSS'],
    image_url: null,
    created_at: '2026-01-16T01:00:00Z',
    updated_at: '2026-01-16T01:00:00Z',
  },
  {
    id: 'static-7',
    title: 'Medical Scheduler Platform',
    description: 'Plataforma fullstack de agendamentos médicos simulando um sistema real de clínica. Arquitetura SaaS com regras de negócio de healthtechs, tipagem forte e integração PostgreSQL via Supabase.',
    github_url: 'https://github.com/LuksFP/Medical-Scheduler-Platform',
    demo_url: null,
    tech_stack: ['TypeScript', 'React', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    image_url: null,
    created_at: '2026-01-07T00:00:00Z',
    updated_at: '2026-01-07T00:00:00Z',
  },
  {
    id: 'static-8',
    title: 'System Monitor Dashboard',
    description: 'Dashboard fullstack de monitoramento em tempo real para serviços críticos (APIs, banco, cache, mensageria). Ferramenta profissional de DevOps/SRE com histórico de incidentes e uptime.',
    github_url: 'https://github.com/LuksFP/system-monitor-dashboard',
    demo_url: null,
    tech_stack: ['TypeScript', 'React', 'Node.js', 'WebSocket', 'Tailwind CSS'],
    image_url: null,
    created_at: '2026-01-20T02:00:00Z',
    updated_at: '2026-01-20T02:00:00Z',
  },
  {
    id: 'static-9',
    title: 'Barber Pro — Sistema de Barbearia',
    description: 'Sistema completo de gerenciamento para barbearias com agendamentos, controle de clientes e agenda visual. Animações fluidas com Framer Motion e UI acessível via Shadcn.',
    github_url: 'https://github.com/LuksFP/Projeto-Barbearia',
    demo_url: null,
    tech_stack: ['TypeScript', 'React', 'Framer Motion', 'Tailwind CSS', 'Shadcn UI'],
    image_url: null,
    created_at: '2025-12-15T00:00:00Z',
    updated_at: '2025-12-15T00:00:00Z',
  },
  {
    id: 'static-10',
    title: 'Sabores do Mar Digital',
    description: 'Aplicação web para restaurante de frutos do mar com cardápio digital interativo e sistema de pedidos. Experiência de compra premium construída com React e TypeScript.',
    github_url: 'https://github.com/LuksFP/sabores-do-mar-digital',
    demo_url: null,
    tech_stack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
    image_url: null,
    created_at: '2025-11-12T00:00:00Z',
    updated_at: '2025-11-12T00:00:00Z',
  },
  {
    id: 'static-11',
    title: 'Dashboard Financeiro',
    description: 'Dashboard financeiro frontend com visualização de métricas, gráficos interativos de receitas e despesas e interface responsiva para acompanhamento de finanças pessoais.',
    github_url: 'https://github.com/LuksFP/Dashboard-Financeiro',
    demo_url: null,
    tech_stack: ['JavaScript', 'CSS', 'HTML'],
    image_url: null,
    created_at: '2026-01-05T00:00:00Z',
    updated_at: '2026-01-05T00:00:00Z',
  },
  {
    id: 'static-12',
    title: 'System Monitor Observability',
    description: 'Ferramenta de observabilidade para monitoramento de sistemas com coleta de métricas, alertas configuráveis e dashboard de saúde de serviços em TypeScript.',
    github_url: 'https://github.com/LuksFP/system-monitor-observality',
    demo_url: null,
    tech_stack: ['TypeScript', 'Node.js'],
    image_url: null,
    created_at: '2026-01-27T00:00:00Z',
    updated_at: '2026-01-27T00:00:00Z',
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
