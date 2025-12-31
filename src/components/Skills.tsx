import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Skills.css';
import '../styles/ScrollReveal.css';

const Skills: React.FC = () => {
  const { t } = useLanguage();
  
  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const gridReveal = useScrollReveal({ threshold: 0.1 });

  const skills = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'JavaScript', icon: '🟨' },
    { name: 'HTML5', icon: '🌐' },
    { name: 'CSS3', icon: '🎨' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Git', icon: '📂' },
    { name: 'Tailwind', icon: '💨' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Redux', icon: '🔄' },
    { name: 'Figma', icon: '🎭' },
    { name: 'REST API', icon: '🔌' },
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
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon">{skill.icon}</div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
