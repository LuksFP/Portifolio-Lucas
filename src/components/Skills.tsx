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
  SiFigma,
  SiPostgresql,
  SiPrisma,
  SiSupabase,
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

const ALL_SKILLS: Skill[] = [
  { name: 'React',      icon: <SiReact />,      color: '#61DAFB', level: 90 },
  { name: 'TypeScript', icon: <SiTypescript />,  color: '#3178C6', level: 85 },
  { name: 'JavaScript', icon: <SiJavascript />,  color: '#F7DF1E', level: 90 },
  { name: 'Next.js',    icon: <SiNextdotjs />,   color: '#E5E5E5', level: 75 },
  { name: 'Node.js',    icon: <SiNodedotjs />,   color: '#339933', level: 70 },
  { name: 'Tailwind',   icon: <SiTailwindcss />, color: '#06B6D4', level: 88 },
  { name: 'Supabase',   icon: <SiSupabase />,    color: '#3ECF8E', level: 80 },
  { name: 'PostgreSQL', icon: <SiPostgresql />,  color: '#336791', level: 72 },
  { name: 'Prisma',     icon: <SiPrisma />,      color: '#2D3748', level: 70 },
  { name: 'Redux',      icon: <SiRedux />,       color: '#764ABC', level: 72 },
  { name: 'HTML5',      icon: <SiHtml5 />,       color: '#E34F26', level: 95 },
  { name: 'CSS3',       icon: <SiCss3 />,        color: '#1572B6', level: 88 },
  { name: 'Git',        icon: <SiGit />,         color: '#F05032', level: 80 },
  { name: 'REST API',   icon: <TbApi />,          color: '#FF6C37', level: 82 },
  { name: 'Figma',      icon: <SiFigma />,       color: '#F24E1E', level: 78 },
];

const ROW_1 = ALL_SKILLS.slice(0, 8);
const ROW_2 = ALL_SKILLS.slice(7);

const MarqueeRow: React.FC<{ skills: Skill[]; reverse?: boolean }> = ({ skills, reverse }) => {
  const doubled = [...skills, ...skills, ...skills];

  return (
    <div className={`skills-marquee-row${reverse ? ' reverse' : ''}`}>
      <div className="skills-marquee-track">
        {doubled.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="skill-marquee-item"
            style={{ '--skill-color': skill.color } as React.CSSProperties}
          >
            <span className="skill-marquee-icon" style={{ color: skill.color }}>
              {skill.icon}
            </span>
            <span className="skill-marquee-name">{skill.name}</span>
            <span className="skill-marquee-level">{skill.level}%</span>
            <span className="skill-marquee-dot" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const titleReveal = useScrollReveal({ threshold: 0.2 });

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
      </div>

      <div className="skills-marquee-wrapper">
        <MarqueeRow skills={ROW_1} />
        <MarqueeRow skills={ROW_2} reverse />
      </div>
    </section>
  );
};

export default memo(Skills);
