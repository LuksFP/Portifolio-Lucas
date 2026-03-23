import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Experience.css';
import '../styles/ScrollReveal.css';

/* ──────────────────────────────────────────
   Static data (personal CV — PT/EN labels
   come from translations, content stays as-is)
────────────────────────────────────────── */
const JOBS = [
  {
    role: 'Engenheiro de Software · Arquiteto · QA · UI/UX Designer',
    company: 'Powertec Tecnologia',
    period: { pt: 'Fev 2026 – Atual', en: 'Feb 2026 – Present' },
    current: true,
    items: [
      { pt: 'Arquitetura e desenvolvimento de sistemas web fullstack e APIs REST escaláveis em produção.', en: 'Architecture and development of fullstack web systems and scalable REST APIs in production.' },
      { pt: 'Definição de padrões arquiteturais com Clean Architecture e SOLID; revisão técnica de código.', en: 'Defining architectural patterns with Clean Architecture and SOLID; technical code review.' },
      { pt: 'QA: cobertura de testes com Jest, Cypress e Playwright; validação e análise de sistemas.', en: 'QA: test coverage with Jest, Cypress and Playwright; system validation and analysis.' },
      { pt: 'UI/UX: prototipação em Figma, interfaces responsivas e design systems com Tailwind CSS.', en: 'UI/UX: Figma prototyping, responsive interfaces and design systems with Tailwind CSS.' },
    ],
  },
  {
    role: 'Estagiário de TI',
    company: 'Prefeitura Municipal de Guarujá',
    period: { pt: 'Jul 2022 – Jul 2025', en: 'Jul 2022 – Jul 2025' },
    current: false,
    items: [
      { pt: 'Suporte técnico presencial e remoto para usuários institucionais.', en: 'On-site and remote technical support for institutional users.' },
      { pt: 'Manutenção de computadores, redes e infraestrutura de TI; resolução de incidentes.', en: 'Maintenance of computers, networks and IT infrastructure; incident resolution.' },
      { pt: 'Suporte a sistemas institucionais e continuidade das operações de TI.', en: 'Support for institutional systems and IT operations continuity.' },
    ],
  },
  {
    role: 'Desenvolvedor Front-End',
    company: 'Freelancer',
    period: { pt: 'Período paralelo', en: 'Parallel period' },
    current: false,
    items: [
      { pt: 'Desenvolvimento de interfaces modernas e responsivas com React e TypeScript.', en: 'Modern and responsive interface development with React and TypeScript.' },
      { pt: 'Criação de componentes reutilizáveis e integração com APIs REST.', en: 'Creating reusable components and integrating REST APIs.' },
      { pt: 'Versionamento e colaboração com Git e GitHub.', en: 'Version control and collaboration using Git and GitHub.' },
    ],
  },
];

const EDUCATION = [
  {
    degree: { pt: 'Análise e Desenvolvimento de Sistemas', en: 'Systems Analysis and Development' },
    institution: 'Universidade Santa Cecilia',
    period: '2022 – 2026',
    icon: '🎓',
  },
  {
    degree: { pt: 'Técnico em Redes de Computadores', en: 'Computer Networks Technician' },
    institution: 'SENAI',
    period: '',
    icon: '🖥️',
  },
];

const CERTS = [
  { title: 'Claude Code in Action', org: 'Anthropic', year: '2026' },
  { title: 'Introduction to Agent Skills', org: 'Anthropic', year: '2026' },
  { title: 'POO com TypeScript', org: 'DIO', year: '' },
  { title: 'Prompting Responsável', org: 'Santander Open Academy', year: '2025' },
];

const LANGS = [
  { pt: 'Português', en: 'Portuguese', level: { pt: 'Nativo', en: 'Native' }, pct: 100 },
  { pt: 'Inglês', en: 'English', level: { pt: 'Avançado', en: 'Advanced' }, pct: 82 },
  { pt: 'Espanhol', en: 'Spanish', level: { pt: 'Intermediário', en: 'Intermediate' }, pct: 52 },
];

/* ──────────────────────────────────────────
   COMPONENT
────────────────────────────────────────── */
const Experience: React.FC = () => {
  const { language, t } = useLanguage();

  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const leftReveal  = useScrollReveal({ threshold: 0.05 });
  const rightReveal = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="experience" className="experience section">
      <div className="container">

        {/* ── Section header ── */}
        <div ref={titleReveal.ref} className={`reveal ${titleReveal.isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t.experience.title}</h2>
          <p className="section-subtitle">{t.experience.subtitle}</p>
        </div>

        <div className="experience-grid">

          {/* ── LEFT: Timeline ── */}
          <div
            ref={leftReveal.ref}
            className={`experience-timeline reveal ${leftReveal.isVisible ? 'visible' : ''}`}
          >
            <h3 className="exp-group-title">{t.experience.workTitle}</h3>

            <div className="timeline">
              {JOBS.map((job, i) => (
                <div key={i} className={`timeline-item ${job.current ? 'timeline-item--current' : ''}`}>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <div>
                        <h4 className="timeline-role">{job.role}</h4>
                        <p className="timeline-company">{job.company}</p>
                      </div>
                      <span className={`timeline-badge ${job.current ? 'timeline-badge--current' : ''}`}>
                        {language === 'pt' ? job.period.pt : job.period.en}
                      </span>
                    </div>
                    <ul className="timeline-list">
                      {job.items.map((item, j) => (
                        <li key={j}>{language === 'pt' ? item.pt : item.en}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Education + Certs + Languages ── */}
          <div
            ref={rightReveal.ref}
            className={`experience-aside stagger-children ${rightReveal.isVisible ? 'visible' : ''}`}
          >

            {/* Education */}
            <div className="exp-card">
              <h3 className="exp-card-title">{t.experience.educationTitle}</h3>
              <div className="education-list">
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="edu-item">
                    <span className="edu-icon">{edu.icon}</span>
                    <div>
                      <p className="edu-degree">{language === 'pt' ? edu.degree.pt : edu.degree.en}</p>
                      <p className="edu-institution">{edu.institution}</p>
                      {edu.period && <p className="edu-period">{edu.period}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="exp-card">
              <h3 className="exp-card-title">{t.experience.certsTitle}</h3>
              <div className="certs-list">
                {CERTS.map((cert, i) => (
                  <div key={i} className="cert-item">
                    <div className="cert-dot" />
                    <div>
                      <p className="cert-title">{cert.title}</p>
                      <p className="cert-meta">{cert.org}{cert.year ? ` · ${cert.year}` : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="exp-card">
              <h3 className="exp-card-title">{t.experience.langsTitle}</h3>
              <div className="langs-list">
                {LANGS.map((lang, i) => (
                  <div key={i} className="lang-item">
                    <div className="lang-header">
                      <span className="lang-name">{language === 'pt' ? lang.pt : lang.en}</span>
                      <span className="lang-level">{language === 'pt' ? lang.level.pt : lang.level.en}</span>
                    </div>
                    <div className="lang-bar">
                      <div className="lang-bar-fill" style={{ '--pct': `${lang.pct}%` } as React.CSSProperties} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
