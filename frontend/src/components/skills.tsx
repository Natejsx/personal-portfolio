import React from 'react';
import '../styles/skills.scss';
import { SkillCard } from '../components/SkillCard';

export const Skills: React.FC = () => {
  return (
    <section id="skills">
      <h1 className="skills-header">&lt;Skills/&gt;</h1>
      <div className="skills-wrapper">
        <SkillCard />
      </div>
    </section>
  );
};
