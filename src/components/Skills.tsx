import React, { memo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiNodedotjs, SiGit, SiTailwindcss, SiNextdotjs, SiRedux, SiFigma, SiPostgresql, SiSupabase, SiDocker, SiPrisma, SiVite, SiGithub } from 'react-icons/si';
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
    { name: 'React',      icon: <SiReact />,      color: '#61DAFB', level: 90 },
    { name: 'TypeScript', icon: <SiTypescript />,  color: '#3178C6', level: 85 },
    { name: 'JavaScript', icon: <SiJavascript />,  color: '#F7DF1E', level: 90 },
    { name: 'HTML5',      icon: <SiHtml5 />,       color: '#E34F26', level: 95 },
    { name: 'CSS3',       icon: <SiCss3 />,        color: '#1572B6', level: 88 },
    { name: 'Node.js',    icon: <SiNodedotjs />,   color: '#339933', level: 70 },
    { name: 'Git',        icon: <SiGit />,         color: '#F05032', level: 80 },
    { name: 'Tailwind',   icon: <SiTailwindcss />, color: '#06B6D4', level: 88 },
    { name: 'Next.js',    icon: <SiNextdotjs />,   color: '#888888', level: 75 },
    { name: 'Redux',      icon: <SiRedux />,       color: '#764ABC', level: 72 },
    { name: 'Figma',      icon: <SiFigma />,       color: '#F24E1E', level: 78 },
    { name: 'REST API',   icon: <TbApi />,         color: '#FF6C37', level: 82 },
    { name: 'PostgreSQL', icon: <SiPostgresql />,  color: '#336791', level: 75 },
    { name: 'Supabase',   icon: <SiSupabase />,    color: '#3ECF8E', level: 78 },
    { name: 'Docker',     icon: <SiDocker />,      color: '#2496ED', level: 65 },
    { name: 'Prisma',     icon: <SiPrisma />,      color: '#5A67D8', level: 70 },
  ];

  const tools = [
    { icon: <SiVite />,   label: 'Vite' },
    { icon: <SiGithub />, label: 'GitHub' },
    { icon: <TbApi />,    label: 'REST' },
    { label: 'CI/CD' },
    { label: 'Vercel' },
    { label: 'Railway' },
    { label: 'Render' },
    { label: 'SOLID' },
    { label: 'Clean Arch.' },
    { label: 'Jest' },
    { label: 'Cypress' },
    { label: 'Playwright' },
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
                key={skill.name} className="skill-card"
                style={{
                  '--skill-border': `rgba(${rgb}, 0.45)`,
                  '--skill-glow':   `rgba(${rgb}, 0.15)`,
                } as React.CSSProperties}
              >
                <div className="skill-icon" style={{ color: skill.color }}>{skill.icon}</div>
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
