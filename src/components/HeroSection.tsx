import React from 'react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const heroActions = [
    {
      text: 'View Projects',
      url: '/projects',
      className: 'btn btn-primary',
      icon: true,
    },
    {
      text: 'Learn More',
      url: '/about',
      className: 'btn btn-secondary',
    },
  ];

  const heroStats = [
    { value: '∞', label: 'Learning' },
    { value: '∞', label: 'Building' },
    { value: '∞', label: 'Sharing' },
  ];

  return (
    <section className={`hero ${className}`}>
      <div className="hero-container">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            Independent Development
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Veridian Zenith
          </h1>

          {/* Tagline */}
          <p className="hero-tagline">
            Independent Software Development
          </p>

          {/* Description */}
          <p className="hero-description">
            We create practical tools and innovative software to solve real-world problems. Our open-source projects focus on quality, usability, and making technology accessible to everyone.
          </p>

          {/* Hero Actions */}
          <div className="hero-actions">
            {heroActions.map((action, index) => (
              <a
                key={index}
                href={action.url}
                className={action.className}
              >
                {action.icon && (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
                {action.text}
              </a>
            ))}
          </div>

          {/* Hero Stats */}
          <div className="hero-stats" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-12)',
            marginTop: 'var(--space-8)',
            flexWrap: 'wrap'
          }}>
            {heroStats.map((stat, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: 'var(--space-4)',
                minWidth: '120px'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: 'var(--amber-500)',
                  marginBottom: 'var(--space-2)',
                  fontFamily: 'var(--font-mystical)'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--neutral-100)',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Hero Rune */}
          <div className="hero-rune">
            <span className="rune" style={{ fontSize: '2.5rem' }}>ᛝ</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
