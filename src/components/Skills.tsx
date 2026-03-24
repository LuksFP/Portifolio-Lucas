import React, { memo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiGit,
  SiTailwindcss,
  SiNextdotjs,
  SiRedux,
  SiFigma
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import '../styles/Skills.css';
import '../styles/ScrollReveal.css';

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  level: number;
}

const Skills: React.FC = () => {
  const { t } = useLanguage();

  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const gridReveal  = useScrollReveal({ threshold: 0.08 });

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
  ];

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '125, 125, 125';
  };

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div
          ref={titleReveal.ref}
          className={`reveal ${titleReveal.isVisible ? 'visible' : ''}`}
        >
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-subtitle">{t.skills.subtitle}</p>
        </div>

        <div
          ref={gridReveal.ref}
          className={`skills-grid stagger-children ${gridReveal.isVisible ? 'visible' : ''}`}
        >
          {skills.map((skill) => {
            const rgb = hexToRgb(skill.color);
            return (
              <div
                key={skill.name}
                className="skill-card"
                style={{
                  '--skill-color': skill.color,
                  '--skill-border': `rgba(${rgb}, 0.4)`,
                  '--skill-shadow': `rgba(${rgb}, 0.2)`,
                  '--skill-glow': `radial-gradient(ellipse at top, rgba(${rgb}, 0.06), transparent 70%)`,
                } as React.CSSProperties}
              >
                <div className="skill-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <span className="skill-name">{skill.name}</span>
                <div className="skill-level" aria-label={`${skill.level}% proficiency`}>
                  <div
                    className="skill-level-bar"
                    style={{
                      '--level': `${skill.level}%`,
                      color: skill.color,
                      backgroundColor: skill.color,
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(Skills);
