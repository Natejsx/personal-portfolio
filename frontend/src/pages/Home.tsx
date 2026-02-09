import React from 'react';
import { Nav } from '../components/nav';
import { Banner } from '../components/banner';
import '../styles/hero.scss';

const Home: React.FC = () => {
  return (
    <main id="main-content" className="hero-container">
      <div className="background-image"></div>
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
