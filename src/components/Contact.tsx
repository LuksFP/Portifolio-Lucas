import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail, Linkedin, Github, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import '../styles/Contact.css';
import '../styles/ScrollReveal.css';

const useMagneticLink = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 160;
      if (dist < radius) {
        const p = (1 - dist / radius) * 0.22;
        el.style.transform = `translate(${dx * p}px, ${dy * p}px)`;
      } else if (el.style.transform) {
        el.style.transform = '';
      }
    };
    const onLeave = () => { el.style.transform = ''; };
    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return ref;
};

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const eyebrowReveal  = useScrollReveal({ threshold: 0.2 });
  const headlineReveal = useScrollReveal({ threshold: 0.15 });
  const emailReveal    = useScrollReveal({ threshold: 0.1 });
  const socialReveal   = useScrollReveal({ threshold: 0.1 });
  const emailMagnetic  = useMagneticLink();
  const isEn = language === 'en';

  const words = isEn
    ? ["LET'S", 'BUILD', 'SOMETHING↗']
    : ['VAMOS', 'CONSTRUIR', 'ALGO↗'];

  return (
    <>
      <section id="contact" className="contact">
        <div className="contact-orb contact-orb-1" aria-hidden="true" />
        <div className="contact-orb contact-orb-2" aria-hidden="true" />

        <div className="container contact-inner">

          {/* ── LEFT: headline ── */}
          <div className="contact-left">
            <div
              ref={eyebrowReveal.ref}
              className={`contact-eyebrow reveal ${eyebrowReveal.isVisible ? 'visible' : ''}`}
            >
              <span className="contact-eyebrow-dot" />
              {isEn ? 'Available for new projects' : 'Disponível para novos projetos'}
            </div>

            <div
              ref={headlineReveal.ref}
              className={`contact-headline-wrap stagger-children ${headlineReveal.isVisible ? 'visible' : ''}`}
            >
              {words.map((word, i) => (
                <h2
                  key={word}
                  className={`contact-headline${i === words.length - 1 ? ' contact-headline--accent' : ''}`}
                >
                  {word}
                </h2>
              ))}
            </div>

            <p className="contact-lead">
              {isEn
                ? 'Got an idea, a product to build, or a role in mind? Let’s talk. I usually reply within a day.'
                : 'Tem uma ideia, um produto pra tirar do papel ou uma vaga? Bora conversar. Respondo no mesmo dia.'}
            </p>
          </div>

          {/* ── RIGHT: contact card ── */}
          <div
            ref={emailReveal.ref}
            className={`contact-card reveal ${emailReveal.isVisible ? 'visible' : ''}`}
          >
            <span className="contact-card-label">
              {isEn ? 'Drop me a line' : 'Me manda um e-mail'}
            </span>

            <a
              ref={emailMagnetic}
              href="mailto:lucas.kfrancopinheiro@gmail.com"
              className="contact-email-cta"
            >
              <span className="contact-email-text">lucas.kfrancopinheiro@gmail.com</span>
              <span className="contact-email-icon" aria-hidden="true">
                <ArrowUpRight size={22} strokeWidth={2} />
              </span>
            </a>

            <div
              ref={socialReveal.ref}
              className={`contact-social-row stagger-children ${socialReveal.isVisible ? 'visible' : ''}`}
            >
              <a href="https://github.com/LuksFP" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                <Github size={18} />GitHub
              </a>
              <a href="https://www.linkedin.com/in/lucas-kayck-franco-pinheiro-bb3971246/" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                <Linkedin size={18} />LinkedIn
              </a>
              <a href="mailto:lucas.kfrancopinheiro@gmail.com" className="contact-social-btn">
                <Mail size={18} />Email
              </a>
            </div>

            <div className="contact-meta-strip">
              <span><MapPin size={13} />{isEn ? 'Brazil · Remote' : 'Brasil · Remoto'}</span>
              <span className="contact-meta-dot" />
              <span><Clock size={13} />{isEn ? 'Replies within 24h' : 'Respondo em 24h'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-name-wrap" aria-hidden="true">
          <span className="footer-name">LUCAS KAYCK</span>
          <span className="footer-name footer-name--ghost">LUCAS KAYCK</span>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Lucas Kayck.{' '}
            <span>{isEn ? 'All rights reserved.' : 'Todos os direitos reservados.'}</span>
          </p>
          <div className="footer-links">
            <a href="https://github.com/LuksFP" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={16} /></a>
            <a href="https://www.linkedin.com/in/lucas-kayck-franco-pinheiro-bb3971246/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href="mailto:lucas.kfrancopinheiro@gmail.com" aria-label="Email"><Mail size={16} /></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
