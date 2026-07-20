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
    title: 'MyFinance: Gestão Financeira Pessoal',
    description: 'Aplicativo financeiro fullstack com CRUD de transações, contas, metas com progresso visual, relatórios gráficos e uma carteira de investimentos completa (cotações ao vivo via brapi/yahoo/awesomeapi em Edge Function). Inclui bot de WhatsApp (Baileys) para registrar e consultar gastos por mensagem. Em produção.',
    github_url: 'https://github.com/LuksFP/FinTech-Simulator',
    demo_url: 'https://fin-tech-simulator.vercel.app',
    tech_stack: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Shadcn/UI', 'Supabase', 'PostgreSQL', 'Edge Functions', 'Baileys'],
    image_url: '/covers/static-1.png',
    created_at: '2026-07-17T00:00:00Z',
    updated_at: '2026-07-17T00:00:00Z',
  },
  {
    id: 'static-2',
    title: 'BarberOS: SaaS para Barbearias',
    description: 'Plataforma SaaS multi-tenant para barbearias: agendamento, comandas, cadastro de clientes e serviços, controle financeiro e painel administrativo. Backend em Supabase com Row Level Security por estabelecimento e autenticação de barbeiros.',
    github_url: 'https://github.com/LuksFP/Projeto-Barbearia',
    demo_url: null,
    tech_stack: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Row Level Security'],
    image_url: '/covers/static-2.png',
    created_at: '2026-07-16T00:00:00Z',
    updated_at: '2026-07-16T00:00:00Z',
  },
  {
    id: 'static-3',
    title: 'Henrique Veículos: Revenda de Seminovos',
    description: 'Site de revenda de veículos com estoque sincronizado automaticamente via feed XML da Revenda Mais, páginas de detalhe por veículo, filtros de busca e contato direto por WhatsApp. Arquitetura enxuta em Next.js 16, sem painel, o estoque vem direto do integrador. Em produção.',
    github_url: 'https://github.com/LuksFP/henrique-veiculos',
    demo_url: 'https://henrique-veiculos.vercel.app',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'XML Feed', 'Vercel'],
    image_url: '/covers/static-3.png',
    created_at: '2026-07-15T00:00:00Z',
    updated_at: '2026-07-15T00:00:00Z',
  },
  {
    id: 'static-4',
    title: 'Nexio ERP + CRM',
    description: 'ERP/CRM interno da Nexio para gestão da operação e dos clientes da software house. Módulos de cadastro, vendas e acompanhamento com Next.js e Supabase, RLS e schema dedicado. Base reaproveitada e adaptada para ERPs de clientes em diferentes segmentos.',
    github_url: null,
    demo_url: null,
    tech_stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Row Level Security'],
    image_url: '/covers/static-4.png',
    created_at: '2026-07-10T00:00:00Z',
    updated_at: '2026-07-10T00:00:00Z',
  },
  {
    id: 'static-5',
    title: 'Estacionamento com OCR de Placas',
    description: 'Sistema de gestão de estacionamento com leitura automática de placas por OCR, controle de 50 vagas em tempo real, entrada/saída e cobrança. Arquitetura híbrida: frontend Next.js 15, serviço em Go para processamento e PostgreSQL como banco.',
    github_url: 'https://github.com/LuksFP/estacionamento',
    demo_url: null,
    tech_stack: ['Next.js 15', 'TypeScript', 'Go', 'PostgreSQL', 'OCR'],
    image_url: '/covers/static-5.png',
    created_at: '2026-05-28T00:00:00Z',
    updated_at: '2026-05-28T00:00:00Z',
  },
  {
    id: 'static-6',
    title: 'Létrica ERP: Material Elétrico',
    description: 'ERP completo para distribuidora de material elétrico: estoque, vendas, pedidos, clientes e financeiro, com um assistente de IA ("General IA") integrado à operação. Next.js 16 com Supabase, em produção com projeto Vercel próprio.',
    github_url: null,
    demo_url: 'https://letrica-erp.vercel.app',
    tech_stack: ['Next.js 16', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'IA'],
    image_url: '/covers/static-6.png',
    created_at: '2026-06-20T00:00:00Z',
    updated_at: '2026-06-20T00:00:00Z',
  },
  {
    id: 'static-7',
    title: 'Voltage: Gestão para Personal Trainers',
    description: 'App de gestão para personal trainers: alunos, treinos, agenda e acompanhamento de evolução. Construído frontend-first com persistência local e camada Supabase preparada para sincronização em nuvem. Next.js 16 com TypeScript.',
    github_url: 'https://github.com/LuksFP/voltage-personal-trainer',
    demo_url: null,
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'localStorage'],
    image_url: '/covers/static-7.png',
    created_at: '2026-07-03T00:00:00Z',
    updated_at: '2026-07-03T00:00:00Z',
  },
  {
    id: 'static-9',
    title: 'Nexio: Agente de Prospecção com IA',
    description: 'Agente de prospecção comercial para a Baixada Santista: coleta e enriquecimento de leads, qualificação e geração de abordagens com IA seguindo a metodologia SPIN Selling. Backend Python/FastAPI com LLM via Groq (Llama) e interface web local para operação pelo cliente.',
    github_url: null,
    demo_url: null,
    tech_stack: ['Python', 'FastAPI', 'Groq API', 'Llama', 'Web Scraping', 'IA'],
    image_url: '/covers/static-9.png',
    created_at: '2026-06-01T00:00:00Z',
    updated_at: '2026-06-01T00:00:00Z',
  },
  {
    id: 'static-10',
    title: 'JARVIS: Assistente de Voz com IA',
    description: 'Assistente de voz fullstack com reconhecimento de fala via Web Speech API, integração com LLM (Groq API / Llama 3), síntese de voz com ElevenLabs TTS e persistência de histórico em banco SQL. Deploy em Railway e Vercel.',
    github_url: 'https://github.com/LuksFP/JARVIS',
    demo_url: null,
    tech_stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Groq API', 'ElevenLabs', 'Web Speech API', 'Railway'],
    image_url: '/covers/static-10.png',
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-01-10T00:00:00Z',
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
