import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import GitHubRepos from '../components/GitHubRepos';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

const Index: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <GitHubRepos />
        <Skills />
        <Contact />
      </main>
    </>
  );
};

export default Index;
