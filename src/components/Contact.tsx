import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail, Linkedin, Github, ArrowRight, Send } from 'lucide-react';
import '../styles/Contact.css';
import '../styles/ScrollReveal.css';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  
  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const linksReveal = useScrollReveal({ threshold: 0.1 });
  const ctaReveal = useScrollReveal({ threshold: 0.2 });

  const contactLinks = [
    {
      icon: Mail,
      label: t.contact.email,
      value: 'joao.silva@email.com',
      href: 'mailto:joao.silva@email.com',
    },
    {
      icon: Linkedin,
      label: t.contact.linkedin,
      value: 'linkedin.com/in/joaosilva',
      href: 'https://linkedin.com/in/joaosilva',
    },
    {
      icon: Github,
      label: t.contact.github,
      value: 'github.com/joaosilva',
      href: 'https://github.com/joaosilva',
    },
  ];

  return (
    <>
      <section id="contact" className="contact section">
        <div className="container">
          <div 
            ref={titleReveal.ref}
            className={`reveal ${titleReveal.isVisible ? 'visible' : ''}`}
          >
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-subtitle">{t.contact.subtitle}</p>
          </div>

          <div className="contact-container">
            <div 
              ref={linksReveal.ref}
              className={`contact-links stagger-children ${linksReveal.isVisible ? 'visible' : ''}`}
            >
              {contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <div className="contact-link-icon">
                    <link.icon />
                  </div>
                  <div className="contact-link-content">
                    <div className="contact-link-label">{link.label}</div>
                    <div className="contact-link-value">{link.value}</div>
                  </div>
                  <ArrowRight className="contact-link-arrow" size={20} />
                </a>
              ))}
            </div>

            <div 
              ref={ctaReveal.ref}
              className={`reveal-scale ${ctaReveal.isVisible ? 'visible' : ''}`}
              style={{ textAlign: 'center' }}
            >
              <a href="mailto:joao.silva@email.com" className="contact-cta">
                <Send size={20} />
                {t.contact.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p className="footer-text">
          © {new Date().getFullYear()} <span>João Silva</span>. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Contact;
