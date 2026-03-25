import React, { memo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiNodedotjs, SiGit, SiTailwindcss, SiNextdotjs, SiAngular, SiVuedotjs, SiFigma, SiPostgresql, SiSupabase, SiDocker, SiPrisma, SiGraphql, SiRedis, SiPhp, SiWordpress, SiVite, SiGithub } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import '../styles/Skills.css';
import '../styles/ScrollReveal.css';

interface Skill { name: string; icon: React.ReactNode; color: string; level: number; }

const Skills: React.FC = () => {
  const { t, language } = useLanguage();
  const titleReveal  = useScrollReveal({ threshold: 0.2 });
  const gridReveal   = useScrollReveal({ threshold: 0.08 });
  const toolsReveal  = useScrollReveal({ threshold: 0.08 });

  const skills: Skill[] = [
    { name: 'React',      icon: <SiReact />,      color: '#61DAFB', level: 92 },
    { name: 'TypeScript', icon: <SiTypescript />,  color: '#3178C6', level: 88 },
    { name: 'JavaScript', icon: <SiJavascript />,  color: '#F7DF1E', level: 92 },
    { name: 'HTML5',      icon: <SiHtml5 />,       color: '#E34F26', level: 95 },
    { name: 'CSS3',       icon: <SiCss3 />,        color: '#1572B6', level: 90 },
    { name: 'Node.js',    icon: <SiNodedotjs />,   color: '#339933', level: 82 },
    { name: 'Next.js',    icon: <SiNextdotjs />,   color: '#888888', level: 78 },
    { name: 'Angular',    icon: <SiAngular />,     color: '#DD0031', level: 68 },
    { name: 'Vue.js',     icon: <SiVuedotjs />,    color: '#4FC08D', level: 65 },
    { name: 'Tailwind',   icon: <SiTailwindcss />, color: '#06B6D4', level: 90 },
    { name: 'PostgreSQL', icon: <SiPostgresql />,  color: '#336791', level: 80 },
    { name: 'Prisma',     icon: <SiPrisma />,      color: '#5A67D8', level: 78 },
    { name: 'GraphQL',    icon: <SiGraphql />,     color: '#E10098', level: 68 },
    { name: 'Redis',      icon: <SiRedis />,       color: '#DC382D', level: 65 },
    { name: 'Docker',     icon: <SiDocker />,      color: '#2496ED', level: 70 },
    { name: 'PHP',        icon: <SiPhp />,         color: '#777BB4', level: 62 },
    { name: 'WordPress',  icon: <SiWordpress />,   color: '#21759B', level: 72 },
    { name: 'Figma',      icon: <SiFigma />,       color: '#F24E1E', level: 80 },
    { name: 'Supabase',   icon: <SiSupabase />,    color: '#3ECF8E', level: 80 },
    { name: 'Git',        icon: <SiGit />,         color: '#F05032', level: 85 },
  ];

  const tools = [
    { icon: <SiVite />,    label: 'Vite' },
    { icon: <SiGithub />,  label: 'GitHub' },
    { icon: <TbApi />,     label: 'REST' },
    { label: 'GitHub Actions' },
    { label: 'CI/CD' },
    { label: 'Vercel' },
    { label: 'Railway' },
    { label: 'Render' },
    { label: 'AWS EC2' },
    { label: 'Azure' },
    { label: 'SOLID' },
    { label: 'Clean Arch.' },
    { label: 'JWT / RBAC' },
    { label: 'BullMQ' },
    { label: 'Jest' },
    { label: 'Cypress' },
    { label: 'Playwright' },
    { label: 'Zod' },
    { label: 'face-api.js' },
    { label: 'Power BI' },
    { label: 'Linux' },
    { label: 'Multer' },
  ];

  const hexToRgb = (hex: string) => {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? `${parseInt(r[1],16)}, ${parseInt(r[2],16)}, ${parseInt(r[3],16)}` : '99,102,241';
  };

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div ref={titleReveal.ref} className={`reveal ${titleReveal.isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-subtitle">{t.skills.subtitle}</p>
        </div>
        <div ref={gridReveal.ref} className={`skills-grid stagger-children ${gridReveal.isVisible ? 'visible' : ''}`}>
          {skills.map((skill) => {
            const rgb = hexToRgb(skill.color);
            return (
              <div
                key={skill.name}
                className="skill-card"
                style={{
                  '--skill-color':    skill.color,
                  '--skill-border':   `rgba(${rgb}, 0.4)`,
                  '--skill-glow':     `rgba(${rgb}, 0.18)`,
                  '--skill-bg':       `rgba(${rgb}, 0.10)`,
                  '--skill-bg-hover': `rgba(${rgb}, 0.20)`,
                } as React.CSSProperties}
              >
                <span className="skill-pct" aria-hidden="true">{skill.level}%</span>
                <div className="skill-icon-wrap" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <span className="skill-name">{skill.name}</span>
                <div className="skill-level" aria-label={`${skill.level}%`}>
                  <div
                    className="skill-level-bar"
                    style={{ '--level': `${skill.level}%`, backgroundColor: skill.color } as React.CSSProperties}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tools & Others */}
        <div ref={toolsReveal.ref} className={`skills-tools reveal ${toolsReveal.isVisible ? 'visible' : ''}`}>
          <p className="skills-tools-label">
            {language === 'pt' ? 'Ferramentas & Outros' : 'Tools & Others'}
          </p>
          <div className="skills-tools-list">
            {tools.map((tool, i) => (
              <span key={i} className="skills-tool-badge">
                {tool.icon && <span className="skills-tool-icon">{tool.icon}</span>}
                {tool.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Skills);
