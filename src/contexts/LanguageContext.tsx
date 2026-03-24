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
      title: 'Desenvolvedor Front-End',
      description: 'Engenheiro de Software Fullstack com sistemas reais em produção. React, TypeScript, Node.js, Clean Architecture, CI/CD e UI/UX — do banco ao browser.',
      viewProjects: 'Ver Projetos',
      contact: 'Entrar em Contato',
    },
    about: {
      title: 'Sobre Mim',
      subtitle: 'Conheça um pouco mais sobre minha jornada e paixão pelo desenvolvimento',
      p1: 'Sou Engenheiro de Software com 21 anos, baseado em Guarujá, SP. Atuo como Fullstack Developer, Arquiteto de Sistemas, QA e UI/UX Designer na Powertec Tecnologia, entregando sistemas em produção real para academias e clientes governamentais.',
      p2: 'Tenho sólida experiência em React, TypeScript, Node.js, PostgreSQL e Clean Architecture. Construo desde interfaces responsivas até APIs REST escaláveis, passando por pipelines CI/CD, containerização com Docker e deploys em Vercel, Render e Railway.',
      p3: 'Sou movido por qualidade de código, boas práticas e impacto real. Cada projeto é uma oportunidade de unir arquitetura sólida, experiência de usuário excepcional e entrega contínua.',
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
      title: 'Front-End Developer',
      description: 'Fullstack Software Engineer with real production systems. React, TypeScript, Node.js, Clean Architecture, CI/CD and UI/UX — from database to browser.',
      viewProjects: 'View Projects',
      contact: 'Get in Touch',
    },
    about: {
      title: 'About Me',
      subtitle: 'Learn a little more about my journey and passion for development',
      p1: "I'm a 21-year-old Software Engineer based in Guarujá, Brazil. I work as Fullstack Developer, Software Architect, QA and UI/UX Designer at Powertec Tecnologia, delivering production systems for gyms and government clients.",
      p2: 'I have strong experience with React, TypeScript, Node.js, PostgreSQL and Clean Architecture — from responsive interfaces to scalable REST APIs, CI/CD pipelines, Docker containerization and cloud deploys.',
      p3: "I'm driven by code quality, best practices and real impact. Every project is a chance to combine solid architecture, exceptional user experience and continuous delivery.",
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
  const [language, setLanguage] = useState<Language>('pt');

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
