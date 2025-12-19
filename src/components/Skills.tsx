import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Skills.css';

const Skills: React.FC = () => {
  const { t } = useLanguage();

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
        <h2 className="section-title">{t.skills.title}</h2>
        <p className="section-subtitle">{t.skills.subtitle}</p>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
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
