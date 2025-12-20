import React, { useState } from 'react';
import SkeletonLoader from './SkeletonLoader';
import FadeIn from './FadeIn';

interface ProjectCardsProps {
  className?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  status: 'active' | 'maintenance' | 'development' | 'completed';
  date: string;
  links?: {
    demo?: string;
    github?: string;
  };
}

const ProjectCards: React.FC<ProjectCardsProps> = ({ className = '' }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading state for better UX
  const handleFilterChange = (filter: string) => {
    setIsLoading(true);
    setActiveFilter(filter);
    setTimeout(() => setIsLoading(false), 500); // Simulate network delay
  };

  // Your real project data from the Jekyll site
  const projects: Project[] = [
    {
      id: 'voix',
      title: 'Voix',
      description: 'A sophisticated sudo replacement built with Racket and PAM integration, providing enhanced security and user experience.',
      image: '/images/project1.png',
      technologies: ['Racket', 'PAM', 'Linux', 'Security'],
      status: 'active',
      date: '2024',
      links: {
        github: 'https://github.com/Veridian-Zenith/voix'
      }
    },
    {
      id: 'meshiji',
      title: 'Meshiji',
      description: 'A modern file explorer application developed with Flutter and Dart, featuring intuitive navigation and cross-platform compatibility.',
      image: '/images/project2.png',
      technologies: ['Flutter', 'Dart', 'GUI', 'File System'],
      status: 'active',
      date: '2024',
      links: {
        github: 'https://github.com/Veridian-Zenith/meshiji'
      }
    },
    {
      id: 'vaelix',
      title: 'Vaelix',
      description: 'Die Siebenfunken Browser - An innovative web browser built with C++, CEF, and Elixir, combining performance with modern architecture.',
      image: '/images/web-project.png',
      technologies: ['C++', 'CEF', 'Elixir', 'Browser'],
      status: 'development',
      date: '2024',
      links: {
        github: 'https://github.com/Veridian-Zenith/vaelix'
      }
    },
    {
      id: 'peguni-draemla',
      title: 'Peguni Draem\'la',
      description: 'A virtual pet simulation game created with Lua and Vaesktöng, featuring interactive gameplay and mystical elements.',
      image: '/images/game-project.png',
      technologies: ['Lua', 'Vaesktöng', 'Game Development'],
      status: 'completed',
      date: '2023',
      links: {
        github: 'https://github.com/Veridian-Zenith/peguni-draemla'
      }
    },
    {
      id: 'aura-core',
      title: 'Aura-Core Kernel',
      description: 'A specialized CachyOS variant kernel with enhanced performance optimizations and system-level enhancements.',
      image: '/images/kernel-project.png',
      technologies: ['C', 'Linux Kernel', 'OS Development'],
      status: 'maintenance',
      date: '2024',
      links: {
        github: 'https://github.com/Veridian-Zenith/aura-core-kernel'
      }
    },
    {
      id: 'veridian-website',
      title: 'Veridian Zenith Website',
      description: 'This very website - a modern, responsive site built with Jekyll, featuring a Nordic minimalist design with amber/gold accents.',
      image: '/images/particles.jpg',
      technologies: ['Jekyll', 'HTML', 'CSS', 'JavaScript'],
      status: 'active',
      date: '2024',
      links: {
        github: 'https://github.com/Veridian-Zenith/veridianzenith.qzz.io'
      }
    }
  ];

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'active', label: 'Active' },
    { key: 'development', label: 'In Development' },
    { key: 'completed', label: 'Completed' },
    { key: 'maintenance', label: 'Maintenance' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.status === activeFilter);

  const getStatusColor = (status: string) => {
    const statusColors = {
      active: 'var(--bg-accent-gold)',
      development: 'var(--bg-accent-bronze)',
      completed: 'var(--bg-accent-copper)',
      maintenance: 'var(--bg-accent-amber)'
    };
    return statusColors[status as keyof typeof statusColors] || 'var(--bg-accent-amber)';
  };

  return (
    <section className={`projects-main ${className}`}>
      <div className="container">
        {/* Page Header */}
        <FadeIn>
          <div className="page-header">
            <div className="page-rune">ᚠ</div>
            <h1 className="page-title">Our Projects</h1>
            <p className="page-subtitle">
              A collection of independent software development projects, each designed to solve real problems and push the boundaries of what's possible.
            </p>
          </div>
        </FadeIn>

        {/* Project Filters */}
        <FadeIn delay={200}>
          <div className="project-filters">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key)}
                className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <FadeIn delay={400}>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <FadeIn key={project.id} delay={100 * index}>
                  <div className="project-card">
                    {/* Project Image */}
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                      <div className="project-overlay">
                        <div className="project-links">
                          {project.links?.github && (
                            <a href={project.links.github} className="project-link" target="_blank" rel="noopener noreferrer">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </a>
                          )}
                          {project.links?.demo && (
                            <a href={project.links.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="project-content">
                      {/* Technologies */}
                      <div className="project-tech">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="project-title">{project.title}</h3>

                      {/* Description */}
                      <p className="project-description">{project.description}</p>

                      {/* Meta Information */}
                      <div className="project-meta">
                        <span
                          className="project-status"
                          style={{
                            background: getStatusColor(project.status),
                            color: 'var(--amber-500)',
                            border: `1px solid ${getStatusColor(project.status).replace('0.15', '0.3')}`
                          }}
                        >
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                        <span className="project-date">{project.date}</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </FadeIn>

        {/* Coming Soon Section */}
        <FadeIn delay={600}>
          <div className="coming-soon">
            <div className="mystical-card">
              <div className="card-content">
                <h2>More to Come</h2>
                <p>
                  We're constantly working on new projects and improvements to existing ones.
                  Follow our development journey and join us in building the future of independent software.
                </p>
                <div className="coming-soon-actions">
                  <a href="https://github.com/Veridian-Zenith" className="btn btn-primary">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    View All Projects
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ProjectCards;
