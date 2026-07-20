import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Download } from 'lucide-react';
import '../styles/About.css';
import '../styles/ScrollReveal.css';

/* Conta de 0 até o número quando entra na tela (ex: "20+" sobe até 20 e mantém o "+") */
const CountUp: React.FC<{ value: string; play: boolean }> = ({ value, play }) => {
  const target = parseInt(value, 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const [n, setN] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!play || done.current) return;
    done.current = true;
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, target]);

  return <>{n}{suffix}</>;
};

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const leftReveal  = useScrollReveal({ threshold: 0.08 });
  const rightReveal = useScrollReveal({ threshold: 0.08 });
  const statsReveal = useScrollReveal({ threshold: 0.15 });

  const stats = [
    { number: '3+', label: language === 'pt' ? 'Anos de Experiência' : 'Years Experience' },
    { number: '20+', label: language === 'pt' ? 'Projetos Entregues' : 'Projects Delivered' },
    { number: '30+', label: language === 'pt' ? 'Tecnologias' : 'Technologies' },
    { number: '5+',  label: language === 'pt' ? 'Sistemas em Produção' : 'Production Systems' },
  ];

  const pills = [
    { icon: '📍', text: language === 'pt' ? 'Guarujá, SP · Remoto' : 'Guarujá, SP · Remote' },
    { icon: '💼', text: language === 'pt' ? 'Fundador · Nexio' : 'Founder · Nexio' },
    { icon: '🎓', text: language === 'pt' ? 'ADS · UNISANTA · 2026' : 'SysAnalysis · UNISANTA · 2026' },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <div ref={titleReveal.ref} className={`reveal ${titleReveal.isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </div>

        <div className="about-container">
          <div className="about-grid">

            <div ref={leftReveal.ref} className={`about-profile-col reveal-left ${leftReveal.isVisible ? 'visible' : ''}`}>
              <div className="about-profile-card">
                <div className="about-avatar-wrapper">
                  <div className="about-avatar-ring" aria-hidden="true" />
                  <div className="about-avatar" aria-hidden="true">LK</div>
                </div>
                <p className="about-profile-name">Lucas Kayck Franco Pinheiro</p>
                <p className="about-profile-role">
                  {language === 'pt' ? 'Full-Stack · Fundador da Nexio' : 'Full-Stack · Nexio Founder'}
                </p>
                <span className="about-badge">
                  <span className="about-badge-dot" />
                  {language === 'pt' ? 'Disponível para projetos' : 'Available for projects'}
                </span>
                <div className="about-info-pills">
                  {pills.map((p, i) => (
                    <div key={i} className="about-info-pill">
                      <span className="about-info-pill-icon">{p.icon}</span>
                      {p.text}
                    </div>
                  ))}
                </div>
                <a
                  href="/cv-lucas-kayck.pdf"
                  download
                  className="about-cv-btn"
                  aria-label={language === 'pt' ? 'Baixar Currículo' : 'Download Resume'}
                >
                  <Download size={15} />
                  {language === 'pt' ? 'Baixar Currículo' : 'Download Resume'}
                </a>
              </div>
            </div>

            <div ref={rightReveal.ref} className={`about-content-col reveal-right ${rightReveal.isVisible ? 'visible' : ''}`}>
              <div className="about-text">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>
              <div ref={statsReveal.ref} className={`about-stats stagger-children ${statsReveal.isVisible ? 'visible' : ''}`}>
                {stats.map((s) => (
                  <div key={s.label} className="stat-item">
                    <div className="stat-number">
                      <CountUp value={s.number} play={statsReveal.isVisible} />
                    </div>
                    <div className="stat-label">{s.label}</div>
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
