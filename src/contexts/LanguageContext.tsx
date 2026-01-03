import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    contact: string;
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
}

const translations: Record<Language, Translations> = {
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      projects: 'Projetos',
      skills: 'Skills',
      contact: 'Contato',
    },
    hero: {
      greeting: 'Olá, eu sou',
      name: 'Lucas Kayck Franco Pinheiro',
      title: 'Desenvolvedor Front-End',
      description: 'Criando experiências digitais incríveis com código limpo e design moderno. Especializado em React, TypeScript e interfaces responsivas.',
      viewProjects: 'Ver Projetos',
      contact: 'Entrar em Contato',
    },
    about: {
      title: 'Sobre Mim',
      subtitle: 'Conheça um pouco mais sobre minha jornada e paixão pelo desenvolvimento',
      p1: 'Sou um desenvolvedor front-end apaixonado por criar interfaces bonitas e funcionais. Com mais de 3 anos de experiência, tenho trabalhado com as tecnologias mais modernas do mercado.',
      p2: 'Minha abordagem combina design centrado no usuário com código limpo e performático. Acredito que a melhor experiência do usuário vem da união entre estética e funcionalidade.',
      p3: 'Quando não estou codando, você pode me encontrar explorando novas tecnologias, contribuindo para projetos open source ou compartilhando conhecimento com a comunidade dev.',
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
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'Lucas Kayck Franco Pinheiro',
      title: 'Front-End Developer',
      description: 'Creating amazing digital experiences with clean code and modern design. Specialized in React, TypeScript and responsive interfaces.',
      viewProjects: 'View Projects',
      contact: 'Get in Touch',
    },
    about: {
      title: 'About Me',
      subtitle: 'Learn a little more about my journey and passion for development',
      p1: "I'm a front-end developer passionate about creating beautiful and functional interfaces. With over 3 years of experience, I've been working with the most modern technologies in the market.",
      p2: 'My approach combines user-centered design with clean and performant code. I believe the best user experience comes from the union of aesthetics and functionality.',
      p3: "When I'm not coding, you can find me exploring new technologies, contributing to open source projects or sharing knowledge with the dev community.",
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
