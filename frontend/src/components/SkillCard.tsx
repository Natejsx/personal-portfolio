import React from 'react';
import '../styles/skillCard.scss';

// Languages
import HTML from '/assets/icons/html.png';
import CSS from '/assets/icons/css.png';
import JS from '/assets/icons/js.png';
import TS from '/assets/icons/ts.png';
import PY from '/assets/icons/python.png';
import CPP from '/assets/icons/cplusplus.svg';

// Frontend
import RCT from '/assets/icons/react.png';
import SASS from '/assets/icons/sass.png';
import BS from '/assets/icons/bootstrap.png';
import REDUX from '/assets/icons/redux.svg';
import NEXT from '/assets/icons/nextjs.svg';
import TW from '/assets/icons/tailwindcss.svg';

// Backend
import DB from '/assets/icons/db.png';
import NODE from '/assets/icons/node.png';
import EXPRESS from '/assets/icons/express.svg';
import MONGO from '/assets/icons/mongodb.svg';
import FB from '/assets/icons/firebase.svg';

// Build tools & Bundlers
import VITE from '/assets/icons/vitejs.svg';
import NPM from '/assets/icons/npm.svg';
import PNPM from '/assets/icons/pnpm.svg';

// Tools & Utilites
import GIT from '/assets/icons/git.svg';
import GITHUB from '/assets/icons/github.svg';
import VS from '/assets/icons/vscode.svg';
import POST from '/assets/icons/postman.svg';
import FIGMA from '/assets/icons/figma.svg';

// Other
import BASH from '/assets/icons/gnu-bash.png';
import LINUX from '/assets/icons/linux.png';
import XD from '/assets/icons/xd.png';

interface SkillProps {
  name: string;
  icon: string;
  level?: number; // Optional skill level from 1-5
}

interface CategoryProps {
  title: string;
  skills: SkillProps[];
}

const SkillIcon: React.FC<{ url: string; name: string; level?: number }> = ({
  url,
  name,
}) => {
  return (
    <div className="skill-icon">
      <div className="skill-icon-wrapper">
        <img src={url} alt={name} />
      </div>
      <div className="skill-details">
        <span className="skill-name">{name}</span>
      </div>
    </div>
  );
};

export const SkillCategory: React.FC<CategoryProps> = ({ title, skills }) => {
  return (
    <div className="skill-category">
      <h2 className="category-title">{title}</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <SkillIcon
            key={index}
            url={skill.icon}
            name={skill.name}
            level={skill.level}
          />
        ))}
      </div>
    </div>
  );
};

export const SkillsData = {
  Languages: [
    { name: 'HTML5', icon: HTML, level: 5 },
    { name: 'CSS3', icon: CSS, level: 5 },
    { name: 'JavaScript', icon: JS, level: 4 },
    { name: 'TypeScript', icon: TS, level: 4 },
    { name: 'Python', icon: PY, level: 3 },
    { name: 'C++', icon: CPP, level: 3 },
  ],
  Frontend: [
    { name: 'React', icon: RCT, level: 5 },
    { name: 'SASS', icon: SASS, level: 4 },
    { name: 'Bootstrap', icon: BS, level: 3 },
    { name: 'Redux', icon: REDUX, level: 3 },
    { name: 'Next.js', icon: NEXT, level: 3 },
    { name: 'TailwindCSS', icon: TW, level: 3 },
  ],
  backend: [
    { name: 'Databases', icon: DB, level: 3 },
    { name: 'Node.js', icon: NODE, level: 4 },
    { name: 'Express.js', icon: EXPRESS, level: 4 },
    { name: 'MongoDB', icon: MONGO, level: 4 },
    { name: 'Firebase', icon: FB, level: 4 },
  ],
  BuildTools: [
    { name: 'Vite', icon: VITE, level: 3 },
    { name: 'npm', icon: NPM, level: 4 },
    { name: 'pnpm', icon: PNPM, level: 3 },
  ],
  Tools: [
    { name: 'Git', icon: GIT, level: 3 },
    { name: 'GitHub', icon: GITHUB, level: 3 },
    { name: 'vscode', icon: VS, level: 3 },
    { name: 'postman', icon: POST, level: 3 },
    { name: 'figma', icon: FIGMA, level: 3 },
    { name: 'Adobe XD', icon: XD, level: 3 },
    { name: 'Bash', icon: BASH, level: 3 },
    { name: 'Linux', icon: LINUX, level: 3 },
  ],
};

export const SkillCard: React.FC = () => {
  return (
    <div className="skills-card-container">
      <SkillCategory title="🌐 Languages" skills={SkillsData.Languages} />
      <SkillCategory
        title="⚛️ Frontend Development"
        skills={SkillsData.Frontend}
      />
      <SkillCategory
        title="☁️ Backend Development"
        skills={SkillsData.backend}
      />
      <SkillCategory
        title="🛠️ Build Tools / Bundlers"
        skills={SkillsData.BuildTools}
      />
      <SkillCategory title="✨ Tools / Utilities" skills={SkillsData.Tools} />
    </div>
  );
};
