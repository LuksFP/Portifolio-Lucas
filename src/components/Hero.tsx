import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, ChevronDown } from 'lucide-react';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  const { t } = useLanguage();
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

      <div 
        className="hero-content"
        style={{ transform: `translateY(${scrollY * 0.3}px)`, opacity: Math.max(0, 1 - scrollY * 0.002) }}
      >
        <p className="hero-greeting">{t.hero.greeting}</p>
        <h1 className="hero-name">{t.hero.name}</h1>
        <p className="hero-title">{t.hero.title}</p>
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
