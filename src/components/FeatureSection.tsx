import React from 'react';

interface FeatureSectionProps {
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ className = '' }) => {
  const features = [
    {
      icon: '⚡',
      title: 'Practical Tools',
      description: 'Software that helps you get things done efficiently and effectively in your daily work.',
      className: 'feature-card'
    },
    {
      icon: '🌟',
      title: 'Innovative Solutions',
      description: 'Creative approaches to common problems that make technology more accessible and useful.',
      className: 'feature-card'
    },
    {
      icon: '🔬',
      title: 'Experimental Projects',
      description: 'Exploring new ideas and technologies to discover better ways of building software.',
      className: 'feature-card'
    }
  ];

  return (
    <section className={`section ${className}`} style={{ padding: 'var(--space-24) 0' }}>
      <div className="container">
        <h2 className="section-title">
          What We Do
        </h2>

        <div className="features-grid" style={{
          display: 'grid',
          gap: 'var(--space-8)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {features.map((feature, index) => (
            <div key={index} className={feature.className}>
              <div className="feature-icon" style={{
                fontSize: '2rem',
                marginBottom: 'var(--space-4)',
                textAlign: 'center'
              }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
