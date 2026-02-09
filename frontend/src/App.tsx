import './styles/index.scss';
import { Skills } from './components/skills';
import { Blog } from './pages/Blog';
import { Routes, Route } from 'react-router-dom';
import { BlogPostDetails } from './pages/Blog';
import { Portfolio } from './pages/Portfolio';
import { Testimonials } from './pages/Testimonials';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';

function App() {
  return (
    <>
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetails />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/testimonials" element={<Testimonials />} />
          {import.meta.env.VITE_TEMPO && (
            <Route path="/tempobook/*" element={null} />
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
