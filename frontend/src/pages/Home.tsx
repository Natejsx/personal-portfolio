import React from 'react';
import { Nav } from '../components/nav';
import { Banner } from '../components/banner';
import { DottedSurface } from '../components/ui/dotted-surface';
import '../styles/hero.scss';

const Home: React.FC = () => {
  return (
    <main id="main-content" className="hero-container">
      <DottedSurface />
      <div className="content">
        <Nav />
        <div className="hero-content-wrapper">
          <Banner />
        </div>
      </div>
    </main>
  );
};

export default Home;
