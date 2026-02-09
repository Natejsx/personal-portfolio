import { Nav } from '@/components/nav';
// import blogPost from "/assets/images/blog-post-one.jpg";
import compsci from '/assets/images/compsci-logo.png';
import sjcLogo from '/assets/images/sjc-logo.jpg';
import '../styles/portfolio.scss';

interface PortfolioCardProps {
  title: string;
  link: string;
  image: string;
  desc: string;
  techStack: string[];
  status: string;
  year?: string;
}

interface LeadershipItemProps {
  title: string;
  role: string;
  period: string;
  description: string;
  image: string;
  achievements: string[];
}

const LeadershipItems: LeadershipItemProps[] = [
  {
    title: 'Student Instructor',
    role: 'Computer Science Department',
    period: 'Spring 2024 - Fall 2025',
    description:
      'Mentored students in programming fundamentals, assisted with coursework, and facilitated hands-on coding workshops to help students master core computer science concepts.',
    image: sjcLogo,
    achievements: [
      'Guided 50+ students through programming assignments',
      'Conducted weekly tutoring sessions and office hours',
      'Developed supplementary learning materials and exercises',
    ],
  },
  {
    title: 'President',
    role: 'SJC Computer Science Club',
    period: 'Spring 2023 - Present',
    description:
      'led the campus computer science club, organizing workshops, coding challenges, and networking events to build a collaborative tech community.',
    image: compsci,
    achievements: [
      'Grew club membership to many active students',
      'Organized monthly projects and coding competitions',
      'Established partnerships with local tech affiliates',
    ],
  },
];

const PortfolioItems: PortfolioCardProps[] = [
  {
    title: 'JournalXP🎮📖',
    desc: 'A game-like mental health platform that transforms daily reflection into an engaging experience. Users track their mood patterns, build healthy habits, and unlock achievements as they grow, making self-care rewarding and sustainable.',
    link: 'https://journalxp.com/',
    image: '/assets/images/jxp.png',
    techStack: [
      'React',
      'TypeScript',
      'TailwindCSS',
      'Firebase',
      'Express.js',
      'Node.js',
    ],
    status: 'Active',
    year: '2026',
  },
  {
    title: 'Genesis Programming Language💻',
    desc: 'A custom compiled language demonstrating deep compiler engineering expertise. Features strong typing and C-style syntax that transpiles to JavaScript, enabling type-safe code that runs anywhere without a custom runtime.',
    link: 'https://github.com/Simpleboi/Genesis',
    image: '/assets/images/genesis.png',
    techStack: ['Node.js', 'TypeScript', 'Parser', 'Compiler'],
    status: 'Active',
    year: '2026',
  },
  {
    title: 'The Vault🔒',
    desc: 'A secure, zero-knowledge password manager built with modern web technologies. Vault encrypts your passwords client-side before they ever leave your device, ensuring that only you can access your sensitive data.',
    link: 'https://vaultpm.netlify.app/',
    image: '/assets/images/vault.png',
    techStack: [
      'TypeScript',
      'React',
      'Web Crypto API',
      'Firebase Auth',
      'Firebase Firestore',
    ],
    status: 'Maintained',
    year: '2026',
  },
  {
    title: 'Pyra.js⚡🔥',
    desc: 'A high-performance build system delivering Vite-like speed with plugin extensibility. Empowers developers to customize build pipelines for projects of any scale, from simple scripts to complex frameworks, without sacrificing performance.',
    link: 'https://pyrajs.netlify.app/',
    image: '/assets/images/pyralogo.png',
    techStack: ['Node.js', 'TypeScript', 'Rollup', 'Vite'],
    status: 'Maintained',
    year: '2026',
  },
  {
    title: 'FireSpark🔥✨',
    desc: 'A lightweight component library that accelerates UI development with production-ready React components. Combines the flexibility of headless components with beautiful defaults—helping teams ship polished interfaces faster.',
    link: 'https://github.com/Simpleboi/FireSpark',
    image: '/assets/images/firespark.png',
    techStack: ['React', 'TypeScript', 'CSS', 'Storybook'],
    status: 'Maintained',
    year: '2025',
  },
  {
    title: 'SparkCSS⚡🎨',
    desc: 'A next-generation CSS preprocessor uniting SCSS power with utility-first methodology. Advanced directives like @snippet and @apply enable teams to write scalable, maintainable styles 3x faster than vanilla CSS.',
    link: 'https://github.com/Simpleboi/sparkcss',
    image: '/assets/images/sparkcss.png',
    techStack: ['Node.js', 'CSS', 'SCSS', 'PostCSS', 'TypeScript'],
    status: 'Maintained',
    year: '2024',
  },
  {
    title: 'SJC Computer Science Club 💻🚀',
    desc: 'A thriving tech community platform serving 100+ students through hands-on workshops, hackathons, and coding challenges. Bridges the gap between academic theory and real-world development skills.',
    link: 'https://sjcsouthcompsci.netlify.app/',
    image: compsci,
    techStack: ['React', 'TypeScript', 'CSS'],
    status: 'Completed',
    year: '2024',
  },
  {
    title: 'Done By Devonne💅🏽',
    desc: 'A professional portfolio website converting 40% more visitors into bookings through stunning gallery displays and mobile-optimized design. Showcases nail artistry with fast-loading images and seamless navigation.',
    link: 'https://donebydevonne.netlify.app',
    image: '/assets/images/donebydevonne.png',
    techStack: ['React', 'TypeScript', 'TailwindCSS'],
    status: 'Completed',
    year: '2025',
  },
];

export const LeadershipCard: React.FC<LeadershipItemProps> = ({
  title,
  role,
  period,
  description,
  image,
  achievements,
}) => {
  return (
    <div className="leadership-card">
      <div className="leadership-card__header">
        <div className="leadership-card__image-wrapper">
          <img src={image} alt={title} className="leadership-card__image" />
        </div>
        <div className="leadership-card__info">
          <h3 className="leadership-card__title">{title}</h3>
          <p className="leadership-card__role">{role}</p>
          <span className="leadership-card__period">{period}</span>
        </div>
      </div>
      <div className="leadership-card__content">
        <p className="leadership-card__description">{description}</p>
        <div className="leadership-card__achievements">
          <h4>Key Achievements:</h4>
          <ul>
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  link,
  image,
  desc,
  techStack,
  status,
  year,
}) => {
  return (
    <div className="portfolio-card">
      <div className="portfolio-card__image-container">
        <img src={image} alt={title} className="portfolio-card__image" />
        <div className="portfolio-card__overlay"></div>
        <div className="portfolio-card__status-badge">
          {status} {year && `• ${year}`}
        </div>
      </div>
      <div className="portfolio-card__content">
        <h3 className="portfolio-card__title">{title}</h3>
        <div className="portfolio-card__tech-stack">
          {techStack.map((tech, index) => (
            <span key={index} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
        <p className="portfolio-card__description">{desc}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-card__button"
        >
          <span>View Project</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  );
};

export const Portfolio = () => {
  return (
    <section className="portfolio-container">
      <Nav />

      {/* Projects Section */}
      <div className="port-header">
        <h1>
          My Personal <span>&lt;Projects/&gt;</span>
        </h1>
      </div>
      <div className="portfolio-grid">
        {PortfolioItems.map((element, index) => (
          <PortfolioCard
            key={index}
            title={element.title}
            desc={element.desc}
            image={element.image}
            link={element.link}
            techStack={element.techStack}
            status={element.status}
            year={element.year}
          />
        ))}
      </div>

      {/* Leadership Section */}
      <div className="leadership-section">
        <div className="section-header">
          <h2>
            Leadership & <span>&lt;Involvements/&gt;</span>
          </h2>
          <p className="section-subtitle">
            Building communities and empowering future developers
          </p>
        </div>
        <div className="leadership-grid">
          {LeadershipItems.map((item, index) => (
            <LeadershipCard
              key={index}
              title={item.title}
              role={item.role}
              period={item.period}
              description={item.description}
              image={item.image}
              achievements={item.achievements}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
