import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/About.css';
import '../styles/ScrollReveal.css';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const titleReveal   = useScrollReveal({ threshold: 0.2 });
  const leftReveal    = useScrollReveal({ threshold: 0.08 });
  const rightReveal   = useScrollReveal({ threshold: 0.08 });
  const statsReveal   = useScrollReveal({ threshold: 0.15 });

  const stats = [
    { number: '3+', label: language === 'pt' ? 'Anos de Experiência' : 'Years Experience' },
    { number: '7+', label: language === 'pt' ? 'Projetos Concluídos' : 'Projects Completed' },
    { number: '20+', label: language === 'pt' ? 'Tecnologias' : 'Technologies' },
    { number: '2',   label: language === 'pt' ? 'Sistemas em Produção' : 'Production Systems' },
  ];

  const infoPills = [
    { icon: '📍', text: language === 'pt' ? 'Guarujá, SP — Remoto' : 'Guarujá, SP — Remote' },
    { icon: '💼', text: language === 'pt' ? 'Powertec Tecnologia' : 'Powertec Tecnologia' },
    { icon: '🎓', text: language === 'pt' ? 'Análise de Sistemas · 2026' : 'Systems Analysis · 2026' },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">

        {/* Header */}
        <div
          ref={titleReveal.ref}
          className={`reveal ${titleReveal.isVisible ? 'visible' : ''}`}
        >
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </div>

        <div className="about-container">
          <div className="about-grid">

            {/* ── LEFT: Profile Card ── */}
            <div
              ref={leftReveal.ref}
              className={`about-profile-col reveal-left ${leftReveal.isVisible ? 'visible' : ''}`}
            >
              <div className="about-profile-card">
                {/* Avatar with rotating ring */}
                <div className="about-avatar-wrapper">
                  <div className="about-avatar-ring" />
                  <div className="about-avatar" aria-hidden="true">LK</div>
                </div>

                <p className="about-profile-name">Lucas Kayck Franco Pinheiro</p>
                <p className="about-profile-role">
                  {language === 'pt' ? 'Engenheiro de Software · UI/UX' : 'Software Engineer · UI/UX'}
                </p>

                <span className="about-badge">
                  <span className="about-badge-dot" />
                  {language === 'pt' ? 'Disponível para projetos' : 'Available for projects'}
                </span>

                <div className="about-info-pills">
                  {infoPills.map((pill, i) => (
                    <div key={i} className="about-info-pill">
                      <span className="about-info-pill-icon">{pill.icon}</span>
                      {pill.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Text + Stats ── */}
            <div
              ref={rightReveal.ref}
              className={`about-content-col reveal-right ${rightReveal.isVisible ? 'visible' : ''}`}
            >
              <div className="about-text">
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
      </div>
    </section>
  );
};

export default About;
