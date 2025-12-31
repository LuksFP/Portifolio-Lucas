# 🚀 Lucas Franco - Portfólio Profissional

Um portfólio moderno e responsivo construído com React, TypeScript e Lovable Cloud para mostrar projetos, habilidades e facilitar contato profissional.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite)

## ✨ Funcionalidades

### 🎨 Design & UX
- **Design responsivo** - Experiência otimizada para desktop, tablet e mobile
- **Tema claro/escuro** - Alternância suave entre modos de exibição
- **Animações fluidas** - Scroll reveal e transições elegantes
- **Interface moderna** - Gradientes, sombras e tipografia refinada

### 📂 Seção de Projetos
- **Gerenciamento dinâmico** - CRUD completo via painel admin
- **Busca inteligente** - Filtro por título e descrição
- **Filtro por tecnologia** - Clique nas tags para filtrar
- **Ordenação flexível** - Por data (recente/antigo) ou título (A-Z/Z-A)
- **Paginação** - Performance otimizada com 6 projetos por página
- **Skeleton loading** - Feedback visual durante carregamento
- **Estado vazio** - CTA amigável para criar primeiro projeto

### 🔐 Autenticação & Admin
- **Login seguro** - Autenticação via Lovable Cloud
- **Painel administrativo** - Gerenciamento de projetos protegido
- **Controle de acesso** - Sistema de roles (admin/user)
- **RLS policies** - Segurança em nível de banco de dados

### 🌐 Internacionalização
- **Português (PT-BR)** - Idioma padrão
- **English (EN)** - Suporte completo

### 📬 Contato
- **Formulário integrado** - Envio direto de mensagens
- **Links sociais** - GitHub, LinkedIn e mais
- **Download de CV** - Acesso rápido ao currículo

## 🛠️ Tecnologias

| Categoria | Tecnologias |
|-----------|-------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, CSS Modules, Shadcn/UI |
| **Backend** | Lovable Cloud (Supabase) |
| **Database** | PostgreSQL com RLS |
| **Auth** | Autenticação segura com roles |
| **State** | React Query, Context API |
| **Icons** | Lucide React |

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- npm ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/portfolio.git

# Entre no diretório
cd portfolio

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Variáveis de Ambiente

O projeto usa Lovable Cloud, então as variáveis são configuradas automaticamente. Para desenvolvimento local, crie um arquivo `.env`:

```env
VITE_SUPABASE_URL=sua_url
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes Shadcn/UI
│   ├── Hero.tsx        # Seção principal
│   ├── About.tsx       # Sobre mim
│   ├── Projects.tsx    # Projetos com filtros
│   ├── Skills.tsx      # Habilidades técnicas
│   ├── Contact.tsx     # Formulário de contato
│   └── Navbar.tsx      # Navegação
├── contexts/           # Context providers
│   ├── ThemeContext    # Tema claro/escuro
│   └── LanguageContext # Internacionalização
├── hooks/              # Custom hooks
│   ├── useProjects     # CRUD de projetos
│   ├── useAdmin        # Verificação de admin
│   └── useScrollReveal # Animações de scroll
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Home
│   ├── Auth.tsx        # Login/Signup
│   └── Admin.tsx       # Painel admin
├── styles/             # CSS modules
└── integrations/       # Integrações externas
```

## 🎯 Roadmap

- [ ] Blog integrado com MDX
- [ ] Comentários em projetos
- [ ] Analytics dashboard
- [ ] Integração com API do GitHub
- [ ] Modo apresentação

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

**Lucas Franco**
- LinkedIn: [linkedin.com/in/lucasfranco](https://linkedin.com/in/lucasfranco)
- GitHub: [github.com/lucasfranco](https://github.com/lucasfranco)
- Email: lucas.kfrancopinheiro@gmail.com

---

<p align="center">
  Feito com ❤️ usando <a href="https://lovable.dev">Lovable</a>
</p>
