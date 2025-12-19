import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Linkedin, Github, ArrowRight, Send } from 'lucide-react';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  const { t } = useLanguage();

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
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>

          <div className="contact-container">
            <div className="contact-links">
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

            <a href="mailto:joao.silva@email.com" className="contact-cta">
              <Send size={20} />
              {t.contact.cta}
            </a>
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
