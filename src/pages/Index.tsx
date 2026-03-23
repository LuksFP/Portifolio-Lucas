import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import GitHubRepos from '../components/GitHubRepos';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Loader from '../components/Loader';

const Index: React.FC = () => {
  const { language } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <a href="#about" className="skip-link">
        {language === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
      </a>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <GitHubRepos />
        <Skills />
        <Contact />
      </main>
    </>
  );
};

export default Index;
