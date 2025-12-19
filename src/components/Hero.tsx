import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, ChevronDown } from 'lucide-react';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
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

      <div className="scroll-indicator">
        <ChevronDown />
      </div>
    </section>
  );
};

export default Hero;
