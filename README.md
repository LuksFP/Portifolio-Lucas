# Lucas Kayck — Portfólio

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

Portfólio pessoal construído com React 18, TypeScript e Supabase. Apresenta projetos, stack técnica e contato — com painel administrativo para gerenciar o conteúdo sem tocar no código.

---

## Stack

**Frontend:** React 18 · TypeScript · Vite · Tailwind CSS · Shadcn/UI · React Query · React Hook Form · Zod

**Backend:** Supabase (PostgreSQL · Row Level Security · Edge Functions · Auth)

**Deploy:** Vercel

---

## Funcionalidades

**Projetos**
Busca em tempo real por título ou descrição, filtro por tecnologia, ordenação por data ou alfabética e paginação. Se o banco estiver inacessível, exibe projetos estáticos como fallback.

**Painel Admin**
CRUD completo de projetos protegido por autenticação. Controle de acesso via RBAC com `user_roles` e políticas RLS no banco — só usuários com role `admin` chegam nas operações de escrita.

**UX**
Tema claro/escuro com persistência local, animações de scroll reveal, cursor customizado com efeito magnético nos botões, skeleton loading e internacionalização PT-BR/EN com troca instantânea.

---

## Estrutura

```
src/
├── components/       # Componentes de seção (Hero, About, Projects, Skills, Contact...)
│   └── ui/           # Componentes Shadcn/UI
├── contexts/         # ThemeContext, LanguageContext
├── hooks/            # useProjects, useAdmin, useAuth, useScrollReveal...
├── integrations/
│   └── supabase/     # Client, types gerados
├── pages/            # Index, Admin, Auth, NotFound
├── styles/           # CSS por seção
└── lib/              # utils
```

---

## Como rodar

Pré-requisitos: Node.js 18+ e npm ou bun.

```bash
git clone https://github.com/lucaskayck/portfolio.git
cd portfolio
npm install   # ou: bun install
npm run dev   # ou: bun dev
```

Para o build de produção:

```bash
npm run build
npm run preview
```

---

## Variáveis de ambiente

Crie um `.env` na raiz com as credenciais do Supabase:

```
VITE_SUPABASE_URL=sua_url
VITE_SUPABASE_ANON_KEY=sua_chave
```

---

## Roadmap

- [ ] Blog com MDX
- [ ] Dashboard de analytics de visitantes
- [ ] Sync automático com a API do GitHub
- [ ] Modo PWA
- [ ] Suporte a mais idiomas

---

## Padrões de commit

| Prefixo | Uso |
|---------|-----|
| `Add:` | Nova funcionalidade |
| `Fix:` | Correção de bug |
| `Update:` | Atualização de código existente |
| `Refactor:` | Refatoração sem mudança de comportamento |
| `Docs:` | Documentação |
| `Style:` | Formatação e estilo |

---

## Licença

MIT — veja [LICENSE](LICENSE).

---

**Lucas Kayck Franco Pinheiro**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/lucaskayck)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lucaskayck)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:lucas.kfrancopinheiro@gmail.com)
