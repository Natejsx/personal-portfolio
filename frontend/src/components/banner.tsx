import '../styles/banner.scss';
import { Link } from 'react-router-dom';
import { WelcomeDate } from '@/utilities/Date';

export const BannerBTN: React.FC = () => {
  return (
    <Link to="/contact" className="banner-btn">
      Contact Me
    </Link>
  );
};

export interface BannerProps {
  name?: string;
}

export const Banner: React.FC<BannerProps> = () => {
  return (
    <header>
      <div className="banner-container">
        <h2 className="banner-header">{WelcomeDate()}!👋🏽</h2>
        <h1 className="banner-name">
          I'm <span>&lt;Nate/&gt;</span>
        </h1>
        <h2 className="banner-subheading">
          Aspiring Computer Scientist and Web Developer
        </h2>

        <div className="social-container">
          <div className="social-inner-container">
            <a href="https://www.instagram.com/nate.jsx/" target="_blank">
              <i className="bx bxl-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/nathaniel-paz-182470386/"
              target="_blank"
            >
              <i className="bx bxl-linkedin"></i>
            </a>
            <a href="https://github.com/Simpleboi" target="_blank">
              <i className="bx bxl-github"></i>
            </a>
            <a
              href="https://www.youtube.com/channel/UC6hvnNbmotcGge7Hq-wyF_g"
              target="_blank"
            >
              <i className="bx bxl-youtube"></i>
            </a>
            <a href="https://discord.gg/DCszF2VrSm" target="_blank">
              <i className="bx bxl-discord-alt"></i>
            </a>
          </div>
        </div>
      </div>
      <BannerBTN />
    </header>
  );
};
