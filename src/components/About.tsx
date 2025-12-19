import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/About.css';
import '../styles/ScrollReveal.css';

const About: React.FC = () => {
  const { t, language } = useLanguage();
  
  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const textReveal = useScrollReveal({ threshold: 0.1 });
  const statsReveal = useScrollReveal({ threshold: 0.2 });

  const stats = [
    { number: '5+', label: language === 'pt' ? 'Anos de Experiência' : 'Years Experience' },
    { number: '50+', label: language === 'pt' ? 'Projetos Concluídos' : 'Projects Completed' },
    { number: '30+', label: language === 'pt' ? 'Clientes Satisfeitos' : 'Happy Clients' },
    { number: '10+', label: language === 'pt' ? 'Tecnologias' : 'Technologies' },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <div 
          ref={titleReveal.ref as React.RefObject<HTMLDivElement>}
          className={`reveal ${titleReveal.isVisible ? 'visible' : ''}`}
        >
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </div>

        <div className="about-container">
          <div className="about-content">
            <div 
              ref={textReveal.ref as React.RefObject<HTMLDivElement>}
              className={`about-text reveal ${textReveal.isVisible ? 'visible' : ''}`}
            >
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div 
              ref={statsReveal.ref as React.RefObject<HTMLDivElement>}
              className={`about-stats stagger-children ${statsReveal.isVisible ? 'visible' : ''}`}
            >
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
