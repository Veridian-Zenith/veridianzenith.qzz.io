import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

type Page = 'home' | 'projects' | 'about' | 'community';

interface NavigationProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  currentPage?: Page;
  onNavigate?: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  theme,
  onThemeToggle,
  currentPage = 'home',
  onNavigate
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeLoading, setIsThemeLoading] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', key: 'nav.home', page: 'home' as Page },
    { href: '/projects', label: 'Projects', key: 'nav.projects', page: 'projects' as Page },
    { href: '/about', label: 'About', key: 'nav.about', page: 'about' as Page },
    { href: '/community', label: 'Community', key: 'nav.community', page: 'community' as Page },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (page: Page) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMobileMenuOpen(false);
  };

  const handleThemeToggle = () => {
    setIsThemeLoading(true);
    onThemeToggle();
    // Simulate loading time for better UX
    setTimeout(() => setIsThemeLoading(false), 300);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-container">
          {/* Logo */}
          <a href="/" className="nav-logo" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
            <div className="logo-icon">VZ</div>
            <span className="logo-text">Veridian Zenith</span>
          </a>

          {/* Desktop Navigation */}
          <div className="nav-menu">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={`nav-link ${currentPage === link.page ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.page); }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="nav-actions">
            <button
              onClick={handleThemeToggle}
              className="theme-toggle"
              aria-label="Toggle theme"
              disabled={isThemeLoading}
            >
              {isThemeLoading ? (
                <LoadingSpinner size="sm" />
              ) : theme === 'dark' ? (
                <svg className="theme-icon sun-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="theme-icon moon-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="nav-toggle"
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav-menu-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.key}
            href={link.href}
            onClick={(e) => { e.preventDefault(); handleLinkClick(link.page); }}
            className={`nav-link ${currentPage === link.page ? 'active' : ''}`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navigation;
