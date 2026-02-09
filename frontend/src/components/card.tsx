import React from 'react';
import '../styles/card.scss';
import HTML from '/assets/icons/html.png';
import CSS from '/assets/icons/css.png';
import JS from '/assets/icons/js.png';
import TS from '/assets/icons/ts.png';
import RCT from '/assets/icons/react.png';
import SASS from '/assets/icons/sass.png';
import BS from '/assets/icons/bootstrap.png';

import DB from '/assets/icons/db.png';
import NODE from '/assets/icons/node.png';
import PY from '/assets/icons/python.png';

import XD from '/assets/icons/xd.png';
import FIG from '/assets/icons/figma.png';
import BASH from '/assets/icons/gnu-bash.png';
import LINUX from '/assets/icons/linux.png';

// defining the Image path for imports
interface ImagePath {
  url: string;
}

export const SkillsCardFE: React.FC = () => {
  return (
    <aside className="skills-container">
      <h1 className="card-header">Front-end</h1>
      <hr />
      <div className="logo-container">
        <SkillsLogo url={HTML} />
        <SkillsLogo url={CSS} />
        <SkillsLogo url={JS} />
        <SkillsLogo url={TS} />
        <SkillsLogo url={RCT} />
        <SkillsLogo url={SASS} />
        <SkillsLogo url={BS} />
      </div>
    </aside>
  );
};

export const SkillsCardBE: React.FC = () => {
  return (
    <aside className="skills-container">
      <h1 className="card-header">Back-end</h1>
      <hr />
      <div className="logo-container">
        <SkillsLogo url={DB} />
        <SkillsLogo url={NODE} />
        <SkillsLogo url={PY} />
      </div>
    </aside>
  );
};

export const SkillsCardOther: React.FC = () => {
  return (
    <aside className="skills-container">
      <h1 className="card-header">Other</h1>
      <hr />
      <div className="logo-container">
        <SkillsLogo url={XD} />
        <SkillsLogo url={FIG} />
        <SkillsLogo url={BASH} />
        <SkillsLogo url={LINUX} />
      </div>
    </aside>
  );
};

export const SkillsLogo: React.FC<ImagePath> = ({ url }) => {
  return (
    <figure className="img-container">
      <img src={url} alt="" />
    </figure>
  );
};
