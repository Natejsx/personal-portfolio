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
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import PostEditor from './pages/admin/PostEditor';
import ProtectedRoute from './components/ProtectedRoute';

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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/new" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
          <Route path="/admin/edit/:slug" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
