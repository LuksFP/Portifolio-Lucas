import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/About.css';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const stats = [
    { number: '5+', label: language === 'pt' ? 'Anos de Experiência' : 'Years Experience' },
    { number: '50+', label: language === 'pt' ? 'Projetos Concluídos' : 'Projects Completed' },
    { number: '30+', label: language === 'pt' ? 'Clientes Satisfeitos' : 'Happy Clients' },
    { number: '10+', label: language === 'pt' ? 'Tecnologias' : 'Technologies' },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title">{t.about.title}</h2>
        <p className="section-subtitle">{t.about.subtitle}</p>

        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="about-stats">
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
