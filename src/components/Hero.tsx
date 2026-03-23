import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, ChevronDown } from 'lucide-react';
import '../styles/Hero.css';

const CodeDecoration: React.FC = () => (
  <div className="hero-code-decoration" aria-hidden="true">
    <div className="hero-code-bar">
      <span className="hero-code-dot hero-code-dot--red" />
      <span className="hero-code-dot hero-code-dot--yellow" />
      <span className="hero-code-dot hero-code-dot--green" />
    </div>
    <pre className="hero-code-content">
      <span className="code-keyword">const</span>{' '}
      <span className="code-variable">dev</span>{' '}
      <span className="code-operator">=</span>{' '}{'{'}{'\n'}
      {'  '}<span className="code-key">name</span>:{' '}
      <span className="code-string">"Lucas Kayck"</span>,{'\n'}
      {'  '}<span className="code-key">role</span>:{' '}
      <span className="code-string">"Front-End Dev"</span>,{'\n'}
      {'  '}<span className="code-key">stack</span>:{' '}
      <span className="code-string">["React", "TS"]</span>,{'\n'}
      {'  '}<span className="code-key">available</span>:{' '}
      <span className="code-boolean">true</span>{'\n'}
      {'}'}
    </pre>
  </div>
);

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      {/* Parallax Background Elements */}
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
        <div className="hero-available" aria-label={language === 'pt' ? 'Disponível para trabalho' : 'Available for work'}>
          <span className="hero-available-dot" />
          {language === 'pt' ? 'Disponível para trabalho' : 'Available for work'}
        </div>
        <p className="hero-greeting">{t.hero.greeting}</p>
        <h1 className="hero-name">{t.hero.name}</h1>
        <p className="hero-title">{t.hero.title}<span className="hero-cursor" aria-hidden="true" /></p>
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
