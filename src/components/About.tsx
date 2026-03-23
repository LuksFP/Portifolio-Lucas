import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/About.css';
import '../styles/ScrollReveal.css';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const profileReveal = useScrollReveal({ threshold: 0.1 });
  const textReveal = useScrollReveal({ threshold: 0.1 });
  const statsReveal = useScrollReveal({ threshold: 0.2 });

  const stats = [
    { number: '3+', label: language === 'pt' ? 'Anos de Experiência' : 'Years Experience' },
    { number: '7+', label: language === 'pt' ? 'Projetos Concluídos' : 'Projects Completed' },
    { number: '20+', label: language === 'pt' ? 'Tecnologias' : 'Technologies' },
    { number: '2', label: language === 'pt' ? 'Sistemas em Produção' : 'Production Systems' },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <div
          ref={titleReveal.ref}
          className={`reveal ${titleReveal.isVisible ? 'visible' : ''}`}
        >
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </div>

        <div className="about-container">
          <div className="about-content">
            {/* Profile Card */}
            <div
              ref={profileReveal.ref}
              className={`reveal ${profileReveal.isVisible ? 'visible' : ''}`}
            >
              <div className="about-profile">
                <div className="about-avatar" aria-hidden="true">LK</div>
                <div className="about-profile-meta">
                  <p className="about-profile-name">Lucas Kayck Franco Pinheiro</p>
                  <span className="about-badge">
                    <span className="about-badge-dot" />
                    {language === 'pt' ? 'Disponível para projetos' : 'Available for projects'}
                  </span>
                </div>
              </div>
            </div>

            {/* About Text */}
            <div
              ref={textReveal.ref}
              className={`about-text reveal ${textReveal.isVisible ? 'visible' : ''}`}
            >
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            {/* Stats */}
            <div
              ref={statsReveal.ref}
              className={`about-stats stagger-children ${statsReveal.isVisible ? 'visible' : ''}`}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item">
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
