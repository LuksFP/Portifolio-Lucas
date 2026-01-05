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
}

const Skills: React.FC = () => {
  const { t } = useLanguage();
  
  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const gridReveal = useScrollReveal({ threshold: 0.1 });

  const skills: Skill[] = [
    { name: 'React', icon: <SiReact />, color: '#61DAFB' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
    { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
    { name: 'CSS3', icon: <SiCss3 />, color: '#1572B6' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
    { name: 'Git', icon: <SiGit />, color: '#F05032' },
    { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
    { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
    { name: 'Redux', icon: <SiRedux />, color: '#764ABC' },
    { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' },
    { name: 'REST API', icon: <TbApi />, color: '#FF6C37' },
  ];

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
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-icon" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Skills);
