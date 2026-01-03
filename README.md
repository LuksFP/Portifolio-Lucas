# 🚀 Lucas Kayck Franco Pinheiro - Portfólio Profissional

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

Um portfólio moderno, responsivo e performático construído com as melhores práticas de desenvolvimento front-end. Apresenta projetos, habilidades técnicas e informações de contato com uma interface elegante e animações fluidas.

## 📸 Preview

![Portfolio Preview](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop)

---

## ✨ Funcionalidades

### 🎨 Design & UX
- **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **Tema Claro/Escuro**: Alternância suave entre temas com persistência local
- **Animações Fluidas**: Scroll reveal, parallax effects e micro-interações
- **Interface Moderna**: Design system consistente com Shadcn/UI

### 📂 Seção de Projetos
- **CRUD Completo**: Gerenciamento dinâmico de projetos via painel admin
- **Busca Inteligente**: Pesquisa por título ou descrição em tempo real
- **Filtros por Tecnologia**: Filtragem por stack tecnológico
- **Ordenação Flexível**: Por data (mais recentes/antigos) ou alfabética
- **Paginação**: Navegação eficiente entre projetos
- **Skeleton Loading**: Feedback visual durante carregamento
- **Empty State**: Estado vazio amigável com CTA para admin

### 🔐 Autenticação & Admin
- **Login Seguro**: Autenticação via Lovable Cloud
- **Painel Administrativo**: Interface protegida para gestão de conteúdo
- **Controle de Acesso**: RBAC (Role-Based Access Control)
- **Políticas RLS**: Row Level Security no banco de dados

### 🌍 Internacionalização
- **Português (PT-BR)**: Idioma padrão
- **Inglês (EN)**: Suporte completo
- **Troca Dinâmica**: Alternância instantânea sem reload

### 📧 Contato & Social
- **Links Sociais**: GitHub, LinkedIn, Email
- **Download CV**: Acesso direto ao currículo
- **Footer Informativo**: Copyright e créditos

---

## 🛠️ Stack Tecnológica

### Frontend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React | 18.3.1 | Biblioteca UI reativa |
| TypeScript | 5.0 | Tipagem estática |
| Vite | 5.0 | Build tool ultrarrápida |
| Tailwind CSS | 3.4 | Utility-first CSS |
| Shadcn/UI | Latest | Componentes acessíveis |

### Backend (Lovable Cloud)
| Tecnologia | Descrição |
|------------|-----------|
| PostgreSQL | Banco de dados relacional |
| Row Level Security | Políticas de segurança |
| Edge Functions | Lógica serverless |
| Authentication | Sistema de autenticação |

### Bibliotecas Principais
| Pacote | Uso |
|--------|-----|
| React Router | Roteamento SPA |
| React Query | Cache e fetching |
| Lucide React | Ícones SVG |
| Sonner | Notificações toast |
| Zod | Validação de schemas |
| React Hook Form | Gerenciamento de formulários |

---

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes Shadcn/UI
│   ├── About.tsx        # Seção Sobre
│   ├── Contact.tsx      # Seção Contato
│   ├── Hero.tsx         # Seção Hero
│   ├── Navbar.tsx       # Navegação
│   ├── Projects.tsx     # Seção Projetos
│   ├── Skills.tsx       # Seção Habilidades
│   └── ...
├── contexts/            # Context Providers
│   ├── LanguageContext.tsx
│   └── ThemeContext.tsx
├── hooks/               # Custom Hooks
│   ├── useAdmin.ts
│   ├── useAuth.ts
│   ├── useProjects.ts
│   ├── useScrollReveal.ts
│   └── ...
├── integrations/        # Integrações externas
│   └── supabase/
├── pages/               # Páginas da aplicação
│   ├── Admin.tsx
│   ├── Auth.tsx
│   ├── Index.tsx
│   └── NotFound.tsx
├── styles/              # Arquivos CSS
│   ├── About.css
│   ├── Contact.css
│   ├── Hero.css
│   ├── Navbar.css
│   ├── Projects.css
│   └── ...
├── lib/                 # Utilitários
│   └── utils.ts
├── App.tsx              # Componente raiz
├── main.tsx             # Entry point
└── index.css            # Estilos globais
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/lucaskayck/portfolio.git

# Entre no diretório
cd portfolio

# Instale as dependências
npm install
# ou
bun install

# Execute em desenvolvimento
npm run dev
# ou
bun dev
```

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

---

## 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| Anos de Experiência | 3+ |
| Projetos Concluídos | 10+ |
| Clientes Satisfeitos | 10+ |
| Tecnologias Dominadas | 10+ |

---

## 🎯 Roadmap

- [ ] **Blog Integrado**: Sistema de posts com markdown
- [ ] **Comentários**: Sistema de feedback em projetos
- [ ] **Analytics Dashboard**: Métricas de visitantes
- [ ] **GitHub API**: Sync automático de repositórios
- [ ] **Modo Apresentação**: Slideshow de projetos
- [ ] **PWA**: Progressive Web App support
- [ ] **i18n Expandido**: Suporte a mais idiomas

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, siga estes passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Commit

- `Add:` Nova funcionalidade
- `Fix:` Correção de bug
- `Update:` Atualização de código existente
- `Refactor:` Refatoração sem mudança de funcionalidade
- `Docs:` Alterações na documentação
- `Style:` Alterações de estilo/formatação

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📧 Contato

**Lucas Kayck Franco Pinheiro**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/lucaskayck)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lucaskayck)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:lucas.kfrancopinheiro@gmail.com)

---

<p align="center">
  Feito com ❤️ por <strong>Lucas Kayck Franco Pinheiro</strong>
</p>

<p align="center">
  <a href="#-lucas-kayck-franco-pinheiro---portfólio-profissional">⬆️ Voltar ao topo</a>
</p>
