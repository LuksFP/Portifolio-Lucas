import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, ChevronDown, Download } from 'lucide-react';
import '../styles/Hero.css';

const ROLES_PT = [
  'Desenvolvedor Front-End',
  'React & TypeScript Dev',
  'Entusiasta de UI/UX',
  'Criador de Interfaces',
];

const ROLES_EN = [
  'Front-End Developer',
  'React & TypeScript Dev',
  'UI/UX Enthusiast',
  'Interface Craftsman',
];

const CodeDecoration: React.FC = () => (
  <div className="hero-code-decoration" aria-hidden="true">
    <div className="hero-code-bar">
      <span className="hero-code-dot hero-code-dot--red" />
      <span className="hero-code-dot hero-code-dot--yellow" />
      <span className="hero-code-dot hero-code-dot--green" />
      <span className="hero-code-filename">portfolio.ts</span>
    </div>
    <pre className="hero-code-content">
      <span className="code-comment">{'// Lucas Kayck — Dev Profile'}</span>{'\n'}
      <span className="code-keyword">const</span>{' '}
      <span className="code-variable">dev</span>{' '}
      <span className="code-operator">=</span>{' '}{'{'}{'\n'}
      {'  '}<span className="code-key">name</span>
      <span className="code-operator">:</span>{' '}
      <span className="code-string">"Lucas Kayck"</span>
      <span className="code-operator">,</span>{'\n'}
      {'  '}<span className="code-key">role</span>
      <span className="code-operator">:</span>{' '}
      <span className="code-string">"Front-End Dev"</span>
      <span className="code-operator">,</span>{'\n'}
      {'  '}<span className="code-key">stack</span>
      <span className="code-operator">:</span>{' '}
      <span className="code-bracket">['</span>
      <span className="code-string">"React"</span>
      <span className="code-bracket">, </span>
      <span className="code-string">"TS"</span>
      <span className="code-bracket">]</span>
      <span className="code-operator">,</span>{'\n'}
      {'  '}<span className="code-key">available</span>
      <span className="code-operator">:</span>{' '}
      <span className="code-boolean">true</span>{'\n'}
      {'}'}<span className="code-cursor-blink">▋</span>
    </pre>
  </div>
);

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  const roles = language === 'pt' ? ROLES_PT : ROLES_EN;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setRoleVisible(true);
      }, 350);
    }, 3200);
    return () => clearInterval(timer);
  }, [roles.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      {/* Parallax Background */}
      <div className="hero-parallax">
        <div
          className="parallax-orb parallax-orb-1"
          style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.1}px)` }}
        />
        <div
          className="parallax-orb parallax-orb-2"
          style={{ transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.15}px)` }}
        />
        <div
          className="parallax-orb parallax-orb-3"
          style={{ transform: `translate(${scrollY * 0.03}px, ${scrollY * 0.08}px)` }}
        />
        <div
          className="parallax-grid"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div
          className="parallax-glow"
          style={{ transform: `translateY(${scrollY * 0.12}px) scale(${1 + scrollY * 0.0003})` }}
        />
      </div>

      <CodeDecoration />

      <div
        className="hero-content"
        style={{ transform: `translateY(${scrollY * 0.3}px)`, opacity: Math.max(0, 1 - scrollY * 0.002) }}
      >
        <div
          className="hero-available"
          aria-label={language === 'pt' ? 'Disponível para trabalho' : 'Available for work'}
        >
          <span className="hero-available-dot" />
          {language === 'pt' ? 'Disponível para trabalho' : 'Available for work'}
        </div>

        <p className="hero-greeting">{t.hero.greeting}</p>
        <h1 className="hero-name">{t.hero.name}</h1>

        <div className="hero-title-wrapper" aria-live="polite" aria-atomic="true">
          <p className={`hero-title ${roleVisible ? 'role-in' : 'role-out'}`}>
            {roles[roleIndex]}
            <span className="hero-cursor" aria-hidden="true" />
          </p>
        </div>

        <p className="hero-description">{t.hero.description}</p>

        <div className="hero-buttons">
          <button
            className="hero-btn hero-btn-primary"
            onClick={() => scrollToSection('projects')}
          >
            {t.hero.viewProjects}
            <ArrowRight size={18} />
          </button>
          <button
            className="hero-btn hero-btn-secondary"
            onClick={() => scrollToSection('contact')}
          >
            {t.hero.contact}
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">3+</span>
            <span className="hero-stat-label">{language === 'pt' ? 'Anos exp.' : 'Years exp.'}</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-number">10+</span>
            <span className="hero-stat-label">{language === 'pt' ? 'Projetos' : 'Projects'}</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-number">12+</span>
            <span className="hero-stat-label">{language === 'pt' ? 'Tecnologias' : 'Technologies'}</span>
          </div>
        </div>
      </div>

      <div
        className="scroll-indicator"
        style={{ opacity: Math.max(0, 1 - scrollY * 0.01) }}
      >
        <ChevronDown />
      </div>
    </section>
  );
};

export default Hero;
