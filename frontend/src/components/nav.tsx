import React, { useEffect, useState, KeyboardEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.scss';

interface NavLinkProps {
  to: string;
  label: string;
  onClick?: () => void;
}

// Common navigation links used across components
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const NavLink: React.FC<NavLinkProps> = ({ to, label, onClick }) => (
  <li>
    <Link to={to} onClick={onClick} className="nav-link">
      {label}
    </Link>
  </li>
);

export const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const lastLinkRef = useRef<HTMLAnchorElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest('.mobile-menu') &&
        !target.closest('.mobile-btn')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the first link when menu opens
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isMenuOpen) return;

    // Close menu on Escape key
    if (e.key === 'Escape') {
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    // Trap focus within the menu
    if (e.key === 'Tab') {
      // If shift+tab on first element, move to last element
      if (e.shiftKey && document.activeElement === firstLinkRef.current) {
        e.preventDefault();
        lastLinkRef.current?.focus();
      }
      // If tab on last element, move to first element
      else if (!e.shiftKey && document.activeElement === lastLinkRef.current) {
        e.preventDefault();
        firstLinkRef.current?.focus();
      }
    }
  };

  return (
    <>
      <button
        ref={menuButtonRef}
        className="mobile-btn"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
      </button>
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal={isMenuOpen}
        aria-label="Site navigation"
      >
        <ul className="mobile-nav-links" role="menu">
          {navLinks.map((link, index) => {
            // Set refs for first and last links for keyboard navigation
            const isFirst = index === 0;
            const isLast = index === navLinks.length - 1;

            return (
              <li key={index} role="menuitem">
                <Link
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="nav-link"
                  ref={isFirst ? firstLinkRef : isLast ? lastLinkRef : null}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {isMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export const MainNav = () => {
  return (
    <ul className="nav-links-container" role="menubar">
      {navLinks.map((link, index) => (
        <NavLink key={index} to={link.to} label={link.label} />
      ))}
    </ul>
  );
};

// export const SkipLink = () => {
//   return (
//     <a href="#main-content" className="skip-to-content">
//       Skip to content
//     </a>
//   );
// };

export const Nav: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Listener for mount
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* <SkipLink /> */}
      <nav className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="nav-img-container">
            <Link to="/" aria-label="Home">
              <figure>
                <img src="/assets/images/logo.jpg" alt="Logo" />
              </figure>
            </Link>
          </div>
          {isMobile ? <MobileNav /> : <MainNav />}
        </div>
      </nav>
    </>
  );
};
