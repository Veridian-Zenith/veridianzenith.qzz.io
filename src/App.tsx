import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import ProjectCards from './components/ProjectCards';
import ParticleSystem from './components/ParticleSystem';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import FadeIn from './components/FadeIn';

type Page = 'home' | 'projects' | 'about' | 'community';

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for initial app load
    // The LoadingScreen component will handle its own timing and call onComplete
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Handle browser navigation
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '/home') setCurrentPage('home');
      else if (path === '/projects') setCurrentPage('projects');
      else if (path === '/about') setCurrentPage('about');
      else if (path === '/community') setCurrentPage('community');
      else setCurrentPage('home');
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState(); // Handle initial page load

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', path);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSection />
            <FeatureSection />
          </>
        );
      case 'projects':
        return (
          <div
            className="min-h-screen"
            style={{
              padding: 'var(--space-32) 0',
              backgroundImage: `
                linear-gradient(rgba(26, 24, 22, 0.7), rgba(26, 24, 22, 0.7)),
                url('/images/particles.jpg')
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            <ProjectCards />
          </div>
        );
      case 'about':
        return (
          <div
            className="min-h-screen"
            style={{
              padding: 'var(--space-32) 0',
              backgroundImage: `
                linear-gradient(rgba(26, 24, 22, 0.7), rgba(26, 24, 22, 0.7)),
                url('/images/particles.jpg')
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            <div className="container">
              <FadeIn>
                <div className="page-header">
                  <div className="page-rune">ᚢ</div>
                  <h1 className="page-title">About Veridian Zenith</h1>
                  <p className="page-subtitle">
                    An independent software development initiative focused on creating practical tools,
                    innovative applications, and experimental architectures.
                  </p>
                </div>
              </FadeIn>

              <div className="projects-grid" style={{ marginTop: 'var(--space-16)' }}>
                <FadeIn delay={200}>
                  <div className="mystical-card">
                    <h3>Our Mission</h3>
                    <p>
                      We believe in the power of independent software development to create tools
                      that solve real problems and push the boundaries of what's possible in technology.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={400}>
                  <div className="mystical-card">
                    <h3>Our Approach</h3>
                    <p>
                      Every project is open source, meticulously documented, and designed with
                      user experience and performance in mind.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={600}>
                  <div className="mystical-card">
                    <h3>Our Values</h3>
                    <p>
                      Innovation, quality, and transparency guide everything we do.
                      We build for the long term, with sustainability and maintainability as core principles.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        );
      case 'community':
        return (
          <div
            className="min-h-screen"
            style={{
              padding: 'var(--space-32) 0',
              backgroundImage: `
                linear-gradient(rgba(26, 24, 22, 0.28, 24, 22, 0.7), rgba(26, 24, 22, 0.7)),
                url('/images/particles.jpg')
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            <div className="container">
              <FadeIn>
                <div className="page-header">
                  <div className="page-rune">ᚦ</div>
                  <h1 className="page-title">Community</h1>
                  <p className="page-subtitle">
                    Join our community of developers, users, and contributors working together
                    to build the future of independent software.
                  </p>
                </div>
              </FadeIn>

              <div className="projects-grid" style={{ marginTop: 'var(--space-16)' }}>
                <FadeIn delay={200}>
                  <div className="mystical-card">
                    <h3>GitHub</h3>
                    <p>
                      All our projects are open source and available on GitHub.
                      Contribute, report issues, or fork our repositories to get started.
                    </p>
                    <div style={{ marginTop: 'var(--space-4)' }}>
                      <a href="https://github.com/Veridian-Zenith" className="btn btn-primary">
                        Visit GitHub
                      </a>
                    </div>
                  </div>
                </FadeIn>
                <FadeIn delay={400}>
                  <div className="mystical-card">
                    <h3>Email</h3>
                    <p>
                      Have questions, suggestions, or want to collaborate?
                      Reach out to us directly via email.
                    </p>
                    <div style={{ marginTop: 'var(--space-4)' }}>
                      <a href="mailto:daedaevibin@veridianzenith.qzz.io" className="btn btn-primary">
                        Send Email
                      </a>
                    </div>
                  </div>
                </FadeIn>
                <FadeIn delay={600}>
                  <div className="mystical-card">
                    <h3>Contributing</h3>
                    <p>
                      We welcome contributions from developers of all skill levels.
                      Check out our projects and see how you can help.
                    </p>
                    <div style={{ marginTop: 'var(--space-4)' }}>
                      <a href="https://github.com/Veridian-Zenith" className="btn btn-primary">
                        Get Involved
                      </a>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            <HeroSection />
            <FeatureSection />
          </>
        );
    }
  };

  // Show sophisticated loading screen during app initialization
  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-mystical-gradient text-neutral-50">
      {/* Particle Background */}
      <ParticleSystem />

      {/* Navigation */}
      <Navigation
        theme={theme}
        onThemeToggle={toggleTheme}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
