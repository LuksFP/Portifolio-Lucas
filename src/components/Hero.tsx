import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, ChevronDown } from 'lucide-react';
import '../styles/Hero.css';

const ROLES_PT = [
  'Engenheiro Full-Stack',
  'React & TypeScript Dev',
  'Arquiteto de Interfaces',
  'Criador de Experiências',
];

const ROLES_EN = [
  'Full-Stack Engineer',
  'React & TypeScript Dev',
  'Interface Architect',
  'Experience Craftsman',
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
const NAME = 'LUCAS KAYCK';

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
      <span className="code-string">"Full-Stack Dev"</span>
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

const useMagnetic = (strength = 0.32) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = ref.current;
    if (!btn) return;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 110;

      if (dist < radius) {
        const pull = (1 - dist / radius) * strength;
        btn.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
      } else if (btn.style.transform) {
        btn.style.transform = '';
      }
    };

    const onLeave = () => { btn.style.transform = ''; };

    window.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return ref;
};

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [displayName, setDisplayName] = useState(NAME);
  const scrambleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  const btnPrimary = useMagnetic(0.32);
  const btnSecondary = useMagnetic(0.28);

  const roles = language === 'pt' ? ROLES_PT : ROLES_EN;

  // Scroll
  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Role cycling
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex((p) => (p + 1) % roles.length);
        setRoleVisible(true);
      }, 320);
    }, 3200);
    return () => clearInterval(timer);
  }, [roles.length]);

  // Scramble on mount
  useEffect(() => {
    let iteration = 0;
    if (scrambleRef.current) clearInterval(scrambleRef.current);
    scrambleRef.current = setInterval(() => {
      setDisplayName(
        NAME.split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return NAME[i];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );
      if (iteration >= NAME.length) {
        clearInterval(scrambleRef.current!);
        setDisplayName(NAME);
      }
      iteration += 0.5;
    }, 35);
    return () => { if (scrambleRef.current) clearInterval(scrambleRef.current); };
  }, []);

  // Custom cursor
  useEffect(() => {
    const dot  = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animateRing = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;
      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    const onEnter = () => { dot.classList.add('hover'); ring.classList.add('hover'); };
    const onLeave = () => { dot.classList.remove('hover'); ring.classList.remove('hover'); };

    const interactables = document.querySelectorAll('a, button, [role="button"]');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <div ref={cursorDot}  className="cursor-dot"  />
      <div ref={cursorRing} className="cursor-ring" />

      <section id="home" className="hero">
        {/* Parallax + background */}
        <div className="hero-parallax">
          <div className="parallax-orb parallax-orb-1"
            style={{ transform: `translate(${scrollY * 0.04}px, ${scrollY * 0.08}px)` }} />
          <div className="parallax-orb parallax-orb-2"
            style={{ transform: `translate(${scrollY * -0.06}px, ${scrollY * 0.1}px)` }} />
          <div className="parallax-orb parallax-orb-3"
            style={{ transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.05}px)` }} />
          <div className="parallax-grid"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }} />
        </div>

        {/* Background scrolling text */}
        <div className="hero-bg-text" aria-hidden="true">
          <div className="hero-bg-text-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>FULL‑STACK&nbsp;&nbsp;DEVELOPER&nbsp;&nbsp;</span>
            ))}
          </div>
        </div>

        <CodeDecoration />

        <div
          className="hero-content"
          style={{ opacity: Math.max(0, 1 - scrollY * 0.0018) }}
        >
          <div className="hero-available"
            aria-label={language === 'pt' ? 'Disponível para trabalho' : 'Available for work'}>
            <span className="hero-available-dot" />
            {language === 'pt' ? 'Disponível para trabalho' : 'Available for work'}
          </div>

          <h1 className="hero-name" data-text={displayName}>
            {displayName}
          </h1>

          <div className="hero-title-wrapper" aria-live="polite" aria-atomic="true">
            <p className={`hero-title ${roleVisible ? 'role-in' : 'role-out'}`}>
              {roles[roleIndex]}
              <span className="hero-cursor" aria-hidden="true" />
            </p>
          </div>

          <p className="hero-description">{t.hero.description}</p>

          <div className="hero-buttons">
            <button
              ref={btnPrimary}
              className="hero-btn hero-btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              {t.hero.viewProjects}
              <ArrowRight size={16} />
            </button>
            <button
              ref={btnSecondary}
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
              <span className="hero-stat-number">12+</span>
              <span className="hero-stat-label">{language === 'pt' ? 'Projetos' : 'Projects'}</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">15+</span>
              <span className="hero-stat-label">{language === 'pt' ? 'Tecnologias' : 'Tech'}</span>
            </div>
          </div>
        </div>

        <div className="scroll-indicator"
          style={{ opacity: Math.max(0, 1 - scrollY * 0.012) }}>
          <div className="scroll-indicator-line" />
          <ChevronDown />
        </div>
      </section>
    </>
  );
};

export default Hero;
