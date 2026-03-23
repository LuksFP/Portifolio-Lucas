import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail, Linkedin, Github, MapPin, Clock, Send } from 'lucide-react';
import '../styles/Contact.css';
import '../styles/ScrollReveal.css';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const leftReveal = useScrollReveal({ threshold: 0.1 });
  const rightReveal = useScrollReveal({ threshold: 0.1 });

  const contactLinks = [
    {
      icon: Mail,
      label: t.contact.email,
      value: 'lucas.kfrancopinheiro@gmail.com',
      href: 'mailto:lucas.kfrancopinheiro@gmail.com',
    },
    {
      icon: Linkedin,
      label: t.contact.linkedin,
      value: 'lucas-kayck-franco-pinheiro',
      href: 'https://www.linkedin.com/in/lucas-kayck-franco-pinheiro-bb3971246/',
    },
    {
      icon: Github,
      label: t.contact.github,
      value: 'github.com/LuksFP',
      href: 'https://github.com/LuksFP',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      language === 'pt' ? `Contato pelo portfólio — ${name}` : `Portfolio contact — ${name}`
    );
    const body = encodeURIComponent(
      `${language === 'pt' ? 'Nome' : 'Name'}: ${name}\n${language === 'pt' ? 'Email' : 'Email'}: ${email}\n\n${message}`
    );
    window.location.href = `mailto:lucas.kfrancopinheiro@gmail.com?subject=${subject}&body=${body}`;
  };

  const labels = {
    namePlaceholder: language === 'pt' ? 'Seu nome' : 'Your name',
    emailPlaceholder: language === 'pt' ? 'Seu email' : 'Your email',
    messagePlaceholder: language === 'pt' ? 'Sua mensagem...' : 'Your message...',
    sendBtn: language === 'pt' ? 'Enviar mensagem' : 'Send message',
    responseTime: language === 'pt' ? 'Respondo em até 24h' : 'I reply within 24h',
    location: language === 'pt' ? 'Brasil, Remoto' : 'Brazil, Remote',
    formTitle: language === 'pt' ? 'Envie uma mensagem' : 'Send a message',
    contactTitle: language === 'pt' ? 'Outros contatos' : 'Other contacts',
  };

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

          <div className="contact-grid">
            {/* Left: Info + Links */}
            <div
              ref={leftReveal.ref}
              className={`contact-info reveal-left ${leftReveal.isVisible ? 'visible' : ''}`}
            >
              <div className="contact-meta">
                <div className="contact-meta-item">
                  <div className="contact-meta-icon">
                    <Clock size={16} />
                  </div>
                  <span>{labels.responseTime}</span>
                </div>
                <div className="contact-meta-item">
                  <div className="contact-meta-icon">
                    <MapPin size={16} />
                  </div>
                  <span>{labels.location}</span>
                </div>
              </div>

              <p className="contact-info-label">{labels.contactTitle}</p>
              <div className="contact-links">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <div className="contact-link-icon">
                      <link.icon size={20} />
                    </div>
                    <div className="contact-link-content">
                      <div className="contact-link-label">{link.label}</div>
                      <div className="contact-link-value">{link.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div
              ref={rightReveal.ref}
              className={`contact-form-wrapper reveal-right ${rightReveal.isVisible ? 'visible' : ''}`}
            >
              <p className="contact-info-label">{labels.formTitle}</p>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <input
                      type="text"
                      placeholder={labels.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="contact-input"
                    />
                  </div>
                  <div className="contact-field">
                    <input
                      type="email"
                      placeholder={labels.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="contact-input"
                    />
                  </div>
                </div>
                <div className="contact-field">
                  <textarea
                    placeholder={labels.messagePlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="contact-input contact-textarea"
                  />
                </div>
                <button type="submit" className="contact-submit">
                  <Send size={17} />
                  {labels.sendBtn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-text">
            © {new Date().getFullYear()}{' '}
            <span>Lucas Kayck Franco Pinheiro</span>.{' '}
            {language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </p>
          <div className="footer-links">
            <a href="https://github.com/LuksFP" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/lucas-kayck-franco-pinheiro-bb3971246/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:lucas.kfrancopinheiro@gmail.com" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
