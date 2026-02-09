import React from 'react';
import '../styles/about.scss';
import { Nav } from '../components/nav';
import { Skills } from '../components/skills';
import { AboutCard } from '../components/AboutCard';

const AboutMe: React.FC = () => {
  return (
    <section id="about">
      <Nav />
      <div className="about-container">
        <AboutCard />
      </div>
      <Skills />
    </section>
  );
};

export default AboutMe;
