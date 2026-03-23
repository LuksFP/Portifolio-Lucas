import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/About.css';
import '../styles/ScrollReveal.css';

const useCounter = (target: number, isVisible: boolean, duration = 1400) => {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isVisible, target, duration]);

  return value;
};

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ target, suffix, label, isVisible, delay = 0 }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [isVisible, delay]);

  const count = useCounter(target, active);

  return (
    <div className="stat-item">
      <div className="stat-number">
        <span className="stat-count">{count}</span>
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const titleReveal  = useScrollReveal({ threshold: 0.2 });
  const profileReveal = useScrollReveal({ threshold: 0.1 });
  const textReveal   = useScrollReveal({ threshold: 0.1 });
  const statsReveal  = useScrollReveal({ threshold: 0.2 });

  const stats = [
    { target: 3, suffix: '+', label: language === 'pt' ? 'Anos de Experiência' : 'Years Experience' },
    { target: 12, suffix: '+', label: language === 'pt' ? 'Projetos Concluídos' : 'Projects Completed' },
    { target: 20, suffix: '+', label: language === 'pt' ? 'Tecnologias' : 'Technologies' },
    { target: 2,  suffix: '',  label: language === 'pt' ? 'Sistemas em Produção' : 'Production Systems' },
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

            {/* Stats with animated counters */}
            <div
              ref={statsReveal.ref}
              className={`about-stats stagger-children ${statsReveal.isVisible ? 'visible' : ''}`}
            >
              {stats.map((stat, i) => (
                <StatItem
                  key={stat.label}
                  target={stat.target}
                  suffix={stat.suffix}
                  label={stat.label}
                  isVisible={statsReveal.isVisible}
                  delay={i * 150}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
