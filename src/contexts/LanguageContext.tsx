import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface Translations {
  nav: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
  };
  experience: {
    title: string;
    subtitle: string;
    workTitle: string;
    educationTitle: string;
    certsTitle: string;
    langsTitle: string;
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    viewProjects: string;
    contact: string;
  };
  about: {
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewCode: string;
    viewDemo: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    linkedin: string;
    github: string;
    cta: string;
  };
  github: {
    title: string;
    subtitle: string;
    viewAll: string;
    noDescription: string;
    noRepos: string;
    updatedAt: string;
  };
}

const translations: Record<Language, Translations> = {
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      experience: 'Trajetória',
      projects: 'Projetos',
      skills: 'Skills',
      contact: 'Contato',
    },
    experience: {
      title: 'Trajetória',
      subtitle: 'Experiência profissional, formação acadêmica, certificações e idiomas',
      workTitle: 'Experiência Profissional',
      educationTitle: 'Formação Acadêmica',
      certsTitle: 'Certificações',
      langsTitle: 'Idiomas',
    },
    hero: {
      greeting: 'Olá, eu sou',
      name: 'Lucas Kayck Franco Pinheiro',
      title: 'Desenvolvedor Full-Stack',
      description: 'Desenvolvedor Full-Stack e fundador da Nexio. Construo sistemas que rodam de verdade em produção, do banco ao browser, com Next.js, React, TypeScript e Go.',
      viewProjects: 'Ver Projetos',
      contact: 'Entrar em Contato',
    },
    about: {
      title: 'Sobre Mim',
      subtitle: 'Conheça um pouco mais sobre minha jornada e paixão pelo desenvolvimento',
      p1: 'Tenho 21 anos, moro em Guarujá, SP, e sou desenvolvedor Full-Stack. Fundei a Nexio Softwares e Sistemas, onde tiro ERPs, CRMs e sistemas sob medida do papel até a produção, do design ao deploy, para clientes da Baixada Santista.',
      p2: 'Tenho domínio em Next.js, React, TypeScript, Node.js e Go, com PostgreSQL e Supabase. Construo desde interfaces responsivas com Tailwind e Shadcn/UI até APIs REST escaláveis, com autenticação JWT/RBAC, CI/CD via GitHub Actions, Docker e deploys em Vercel, Render e Railway.',
      p3: 'Curto código bem feito, Clean Architecture e SOLID, mas o que me move mesmo é entregar coisa que funciona. Cada projeto junta arquitetura sólida, boa experiência de uso e solução que roda na prática, não só no papel.',
    },
    projects: {
      title: 'Meus Projetos',
      subtitle: 'Uma seleção dos meus trabalhos mais recentes e relevantes',
      viewCode: 'Ver Código',
      viewDemo: 'Ver Demo',
      items: [
        {
          title: 'E-Commerce Dashboard',
          description: 'Dashboard completo para gestão de e-commerce com gráficos interativos, relatórios e análise de vendas em tempo real.',
        },
        {
          title: 'Task Management App',
          description: 'Aplicação de gerenciamento de tarefas com drag-and-drop, categorias, prioridades e sincronização em tempo real.',
        },
        {
          title: 'Weather Forecast',
          description: 'App de previsão do tempo com geolocalização, animações climáticas e previsão para os próximos 7 dias.',
        },
      ],
    },
    skills: {
      title: 'Minhas Skills',
      subtitle: 'Tecnologias e ferramentas que utilizo no dia a dia',
    },
    contact: {
      title: 'Contato',
      subtitle: 'Vamos trabalhar juntos? Entre em contato!',
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      cta: 'Enviar Email',
    },
    github: {
      title: 'Repositórios GitHub',
      subtitle: 'Meus projetos mais recentes no GitHub',
      viewAll: 'Ver todos os repositórios',
      noDescription: 'Sem descrição',
      noRepos: 'Nenhum repositório público encontrado.',
      updatedAt: 'Atualizado em',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Journey',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    experience: {
      title: 'Journey',
      subtitle: 'Professional experience, academic background, certifications and languages',
      workTitle: 'Work Experience',
      educationTitle: 'Education',
      certsTitle: 'Certifications',
      langsTitle: 'Languages',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'Lucas Kayck Franco Pinheiro',
      title: 'Full-Stack Developer',
      description: 'Full-Stack developer and founder of Nexio. I build systems that actually run in production, from database to browser, with Next.js, React, TypeScript and Go.',
      viewProjects: 'View Projects',
      contact: 'Get in Touch',
    },
    about: {
      title: 'About Me',
      subtitle: 'Learn a little more about my journey and passion for development',
      p1: "I'm 21, based in Guarujá, Brazil, and a Full-Stack developer. I founded Nexio Softwares e Sistemas, where I take bespoke ERPs, CRMs and web systems from idea to production, design to deploy, for clients across the Baixada Santista region.",
      p2: 'I have strong expertise in Next.js, React, TypeScript, Node.js and Go, with PostgreSQL and Supabase. I build everything from responsive interfaces with Tailwind and Shadcn/UI to scalable REST APIs, with JWT/RBAC auth, CI/CD via GitHub Actions, Docker, and cloud deploys on Vercel, Render and Railway.',
      p3: "I care about clean code, Clean Architecture and SOLID, but what really drives me is shipping things that work. Every project blends solid architecture, good UX and solutions that run in practice, not just on paper.",
    },
    projects: {
      title: 'My Projects',
      subtitle: 'A selection of my most recent and relevant work',
      viewCode: 'View Code',
      viewDemo: 'View Demo',
      items: [
        {
          title: 'E-Commerce Dashboard',
          description: 'Complete dashboard for e-commerce management with interactive charts, reports and real-time sales analysis.',
        },
        {
          title: 'Task Management App',
          description: 'Task management application with drag-and-drop, categories, priorities and real-time sync.',
        },
        {
          title: 'Weather Forecast',
          description: 'Weather forecast app with geolocation, weather animations and 7-day forecast.',
        },
      ],
    },
    skills: {
      title: 'My Skills',
      subtitle: 'Technologies and tools I use daily',
    },
    contact: {
      title: 'Contact',
      subtitle: "Let's work together? Get in touch!",
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      cta: 'Send Email',
    },
    github: {
      title: 'GitHub Repositories',
      subtitle: 'My most recent projects on GitHub',
      viewAll: 'View all repositories',
      noDescription: 'No description',
      noRepos: 'No public repositories found.',
      updatedAt: 'Updated on',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-lang');
    return saved === 'en' || saved === 'pt' ? saved : 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-lang', lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
