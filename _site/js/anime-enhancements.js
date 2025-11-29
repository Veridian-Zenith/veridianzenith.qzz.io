/**
 * Veridian Zenith - Enhanced Animations
 * Advanced animations with amber/gold theme
 */

class AnimeEnhancements {
    constructor() {
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.observers = new Map();
        this.animationTimelines = new Map();
        this.auroraBorealisActive = false;

        this.init();
    }

    init() {
        if (this.prefersReducedMotion) {
            console.log('Reduced motion preference detected - basic animations only');
            this.initBasicAnimations();
            return;
        }

        this.setupIntersectionObserver();
        this.createAnimationSystem();
        this.initNavigationAnimations();
        this.initHeroAnimations();
        this.initContentAnimations();
        this.initAdvancedEffects();
        this.initPerformanceOptimizations();
    }

    /**
     * Intersection Observer for scroll-triggered animations
     */
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: 0.1
        };

        this.animateOnScrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScrollAnimation(entry.target);
                }
            });
        }, options);

        // Observe elements for scroll animations
        document.querySelectorAll('.feature-card, .project-card, .principle-card, .link-card').forEach(el => {
            this.animateOnScrollObserver.observe(el);
        });
    }

    /**
     * Enhanced animation system with amber/gold theme
     */
    createAnimationSystem() {
        this.masterTimeline = anime.timeline({
            autoplay: false,
            easing: 'easeOutExpo'
        });

        // Animation presets with amber/gold theme
        this.presets = {
            fadeInUp: {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                easing: 'easeOutQuart'
            },
            fadeInScale: {
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 600,
                easing: 'easeOutBack'
            },
            slideInLeft: {
                opacity: [0, 1],
                translateX: [-50, 0],
                duration: 700,
                easing: 'easeOutCubic'
            },
            slideInRight: {
                opacity: [0, 1],
                translateX: [50, 0],
                duration: 700,
                easing: 'easeOutCubic'
            },
            staggerChildren: {
                opacity: [0, 1],
                translateY: [30, 0],
                delay: anime.stagger(150),
                duration: 600,
                easing: 'easeOutQuart'
            },
            amberGlow: {
                boxShadow: [
                    '0 0 0 rgba(255, 179, 71, 0)',
                    '0 0 20px rgba(255, 179, 71, 0.4)',
                    '0 0 0 rgba(255, 179, 71, 0)'
                ],
                duration: 2000,
                easing: 'easeInOutSine'
            },
            goldPulse: {
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.05, 1],
                duration: 3000,
                easing: 'easeInOutSine'
            },
            bronzeShimmer: {
                backgroundPosition: ['0% 0%', '100% 0%'],
                duration: 1500,
                easing: 'easeInOutQuad'
            }
        };
    }

    /**
     * Enhanced Navigation Animations
     */
    initNavigationAnimations() {
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelectorAll('.nav-link');
        const themeToggle = document.querySelector('.theme-toggle');
        const logo = document.querySelector('.nav-logo');

        if (!nav) return;

        // Initial nav entrance with golden glow
        anime({
            targets: nav,
            opacity: [0, 1],
            translateY: [-30, 0],
            duration: 1000,
            easing: 'easeOutExpo'
        });

        // Staggered nav links animation with amber highlights
        anime({
            targets: navLinks,
            opacity: [0, 1],
            translateY: [-20, 0],
            delay: anime.stagger(100, {start: 500}),
            duration: 600,
            easing: 'easeOutQuart',
            update: (anim) => {
                const progress = anim.progress / 100;
                nav.style.boxShadow = `0 0 ${progress * 20}px rgba(255, 179, 71, ${progress * 0.3})`;
            }
        });

        // Enhanced logo hover animation with golden shimmer
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                anime({
                    targets: logo.querySelector('.logo-icon'),
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                    backgroundColor: [
                        {value: '#FF8C00', duration: 300},
                        {value: '#FFD700', duration: 300}
                    ],
                    duration: 600,
                    easing: 'easeInOutQuad'
                });

                // Add golden shimmer effect
                anime({
                    targets: logo,
                    boxShadow: [
                        '0 0 0 rgba(255, 215, 0, 0)',
                        '0 0 30px rgba(255, 215, 0, 0.5)',
                        '0 0 0 rgba(255, 215, 0, 0)'
                    ],
                    duration: 800,
                    easing: 'easeInOutSine'
                });
            });
        }

        // Enhanced theme toggle with amber/gold colors
        if (themeToggle) {
            const sunIcon = themeToggle.querySelector('.sun-icon');
            const moonIcon = themeToggle.querySelector('.moon-icon');

            themeToggle.addEventListener('click', () => {
                // Animate with amber/gold colors
                anime({
                    targets: [sunIcon, moonIcon],
                    rotate: '360deg',
                    scale: [1, 1.3, 1],
                    backgroundColor: [
                        {value: '#FFB347', duration: 200},
                        {value: '#FFD700', duration: 200}
                    ],
                    duration: 600,
                    easing: 'easeInOutCubic'
                });

                // Add magical particle burst
                this.createParticleBurst(themeToggle, '#FFD700');
            });
        }

        // Enhanced nav scroll effects with amber highlights
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', anime({
            targets: {},
            duration: 300,
            update: () => {
                const currentScrollY = window.scrollY;
                const navHeight = nav.offsetHeight;

                if (currentScrollY > navHeight && currentScrollY > lastScrollY) {
                    // Scrolling down - hide nav
                    anime({
                        targets: nav,
                        translateY: -100,
                        backgroundColor: 'rgba(42, 40, 36, 0.8)',
                        duration: 300,
                        easing: 'easeInQuad'
                    });
                } else {
                    // Scrolling up - show nav
                    anime({
                        targets: nav,
                        translateY: 0,
                        backgroundColor: 'rgba(42, 40, 36, 0.4)',
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
                lastScrollY = currentScrollY;
            }
        }));
    }

    /**
     * Enhanced Hero Section Animations
     */
    initHeroAnimations() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Split text animation for titles
        this.animateTextReveal('.hero-title-main');
        this.animateTextReveal('.hero-title-sub');

        // Enhanced hero badge with amber glow
        anime({
            targets: '.hero-badge',
            opacity: [0, 0.8],
            scale: [0.8, 1],
            duration: 800,
            delay: 200,
            easing: 'easeOutBack',
            update: (anim) => {
                const progress = anim.progress / 100;
                const badge = document.querySelector('.hero-badge');
                if (badge) {
                    badge.style.textShadow =
                        `0 0 ${progress * 15}px rgba(255, 179, 71, ${progress * 0.6})`;
                }
            }
        });

        // Hero description with enhanced typewriter effect
        this.animateTextReveal('.hero-description', {typewriter: true});

        // Enhanced animated mystical orb
        this.animateMysticalOrb();

        // Floating symbols (simplified)
        this.animateFloatingSymbols();

        // Hero actions buttons with golden shimmer
        anime({
            targets: '.hero-actions .btn',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(200, {start: 800}),
            duration: 600,
            easing: 'easeOutQuart',
            complete: () => {
                // Add golden shimmer to buttons
                document.querySelectorAll('.hero-actions .btn').forEach(btn => {
                    this.addGoldenShimmer(btn);
                });
            }
        });

        // Enhanced hero stats
        this.animateHeroStats();
    }

    /**
     * Text reveal animation with optional typewriter effect
     */
    animateTextReveal(selector, options = {}) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            const text = element.textContent;

            if (options.typewriter) {
                // Enhanced typewriter effect
                element.textContent = '';
                let i = 0;

                anime({
                    targets: element,
                    duration: text.length * 80,
                    easing: 'linear',
                    update: () => {
                        element.textContent = text.slice(0, i);
                        i++;
                    }
                });
            } else {
                // Character by character reveal
                element.innerHTML = text
                    .split('')
                    .map(char => `<span class="char" style="opacity: 0; display: inline-block; color: var(--amber-500);">${char}</span>`)
                    .join('');

                anime({
                    targets: element.querySelectorAll('.char'),
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: anime.stagger(40),
                    duration: 500,
                    easing: 'easeOutQuart'
                });
            }
        });
    }

    /**
     * Enhanced mystical orb
     */
    animateMysticalOrb() {
        const orb = document.querySelector('.mystical-orb');
        if (!orb) return;

        // Enhanced core pulsing with amber colors
        anime({
            targets: '.orb-core',
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
            backgroundColor: [
                '#FFB347',
                '#FFD700',
                '#FFB347'
            ],
            duration: 4000,
            loop: true,
            easing: 'easeInOutSine'
        });

        // Enhanced ring rotations
        const rings = document.querySelectorAll('.orb-ring');
        const colors = ['#FFB347', '#FFD700', '#CD7F32'];
        const speeds = [6000, 8000, 10000];

        rings.forEach((ring, index) => {
            const direction = index % 2 === 0 ? 'normal' : 'reverse';
            anime({
                targets: ring,
                rotate: [0, 360],
                borderColor: colors[index],
                borderWidth: [1, 3, 1],
                duration: speeds[index],
                loop: true,
                easing: 'linear',
                direction: direction
            });
        });

        // Enhanced hover effects
        orb.addEventListener('mouseenter', () => {
            anime({
                targets: '.mystical-orb',
                scale: [1, 1.1],
                rotateY: '20deg',
                duration: 600,
                easing: 'easeOutBack'
            });

            // Add golden particles on hover
            this.createParticleBurst(orb, '#FFD700', 10);
        });

        orb.addEventListener('mouseleave', () => {
            anime({
                targets: '.mystical-orb',
                scale: [1.1, 1],
                rotateY: '0deg',
                duration: 600,
                easing: 'easeOutBack'
            });
        });
    }

    /**
     * Animate floating symbols (simplified without problematic characters)
     */
    animateFloatingSymbols() {
        const symbols = document.querySelectorAll('.rune');

        symbols.forEach((symbol, index) => {
            // Enhanced entrance with amber glow
            anime({
                targets: symbol,
                opacity: [0, 0.8],
                scale: [0, 1.2, 1],
                translateY: [30, -10, 0],
                duration: 1000,
                delay: index * 200,
                easing: 'easeOutBack'
            });

            // Complex floating animation with rotation
            anime({
                targets: symbol,
                translateY: [-20, 15],
                translateX: [-5, 5],
                rotate: [Math.random() * 10 - 5, Math.random() * 10 - 5],
                duration: 4000 + (index * 500),
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine'
            });

            // Enhanced pulsing with golden glow
            anime({
                targets: symbol,
                opacity: [
                    {value: 0.3, duration: 2500},
                    {value: 0.9, duration: 2500}
                ],
                color: [
                    {value: '#FFB347', duration: 2500},
                    {value: '#FFD700', duration: 2500}
                ],
                delay: index * 400,
                loop: true,
                easing: 'easeInOutSine'
            });

            // Random shimmer effect
            anime({
                targets: symbol,
                textShadow: [
                    '0 0 10px rgba(255, 179, 71, 0.5)',
                    '0 0 25px rgba(255, 215, 0, 0.8)',
                    '0 0 10px rgba(255, 179, 71, 0.5)'
                ],
                duration: 3000,
                delay: index * 600,
                loop: true,
                easing: 'easeInOutSine'
            });
        });
    }

    /**
     * Enhanced hero stats
     */
    animateHeroStats() {
        const stats = document.querySelectorAll('.stat-value');

        anime({
            targets: '.stat',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(200, {start: 1000}),
            duration: 600,
            easing: 'easeOutQuart',
            complete: () => {
                // Animate stats with amber colors
                stats.forEach((stat, index) => {
                    anime({
                        targets: stat,
                        rotate: [0, 360],
                        scale: [1, 1.15, 1],
                        backgroundColor: [
                            {value: '#FFB347', duration: 500},
                            {value: '#FFD700', duration: 500},
                            {value: '#CD7F32', duration: 500}
                        ],
                        duration: 2500,
                        delay: index * 300,
                        easing: 'easeInOutCubic'
                    });

                    // Add shimmering text effect
                    anime({
                        targets: stat,
                        textShadow: [
                            '0 0 10px rgba(255, 179, 71, 0.5)',
                            '0 0 25px rgba(255, 215, 0, 0.8)',
                            '0 0 10px rgba(255, 179, 71, 0.5)'
                        ],
                        duration: 2000,
                        delay: index * 400,
                        loop: true,
                        easing: 'easeInOutSine'
                    });
                });
            }
        });
    }

    /**
     * Enhanced content animations
     */
    initContentAnimations() {
        // Enhanced features section
        const featureCards = document.querySelectorAll('.feature-card');
        const colors = ['#FFB347', '#FFD700', '#CD7F32'];

        featureCards.forEach((card, index) => {
            const color = colors[index % colors.length];

            // Initial entrance with color-specific glow
            anime({
                targets: card,
                opacity: [0, 1],
                translateY: [50, 0],
                delay: index * 150,
                duration: 600,
                easing: 'easeOutQuart'
            });

            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: [1, 1.03],
                    translateY: [-8, 0],
                    borderColor: color,
                    boxShadow: [
                        '0 4px 12px rgba(15, 14, 13, 0.3)',
                        `0 12px 32px rgba(15, 14, 13, 0.4), 0 0 30px ${color}40`
                    ],
                    duration: 400,
                    easing: 'easeOutCubic'
                });

                // Add shimmer effect
                this.addGoldenShimmer(card);
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: [1.03, 1],
                    translateY: [0, 0],
                    borderColor: 'rgba(212, 168, 67, 0.1)',
                    boxShadow: '0 4px 12px rgba(15, 14, 13, 0.3)',
                    duration: 400,
                    easing: 'easeOutCubic'
                });
            });
        });

        // Enhanced project cards animation
        const projectCards = document.querySelectorAll('.project-card');
        const projectColors = ['#FFB347', '#FFD700', '#CD7F32', '#B87333', '#FFB347', '#FFD700'];

        projectCards.forEach((card, index) => {
            const color = projectColors[index % projectColors.length];

            anime({
                targets: card,
                opacity: [0, 1],
                translateY: [50, 0],
                delay: index * 100,
                duration: 600,
                easing: 'easeOutQuart',
                complete: () => {
                    // Add subtle glow effect to project cards
                    anime({
                        targets: card,
                        boxShadow: [
                            '0 4px 12px rgba(15, 14, 13, 0.3)',
                            `0 8px 24px rgba(15, 14, 13, 0.3), 0 0 20px ${color}30`,
                            '0 4px 12px rgba(15, 14, 13, 0.3)'
                        ],
                        duration: 3000,
                        easing: 'easeInOutSine'
                    });
                }
            });
        });

        // Enhanced button effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                anime({
                    targets: button,
                    scale: [1, 1.05],
                    backgroundColor: [
                        {value: '#FFB34720', duration: 200},
                        {value: '#FFD70020', duration: 200}
                    ],
                    boxShadow: [
                        '0 4px 12px rgba(15, 14, 13, 0.3)',
                        '0 12px 32px rgba(15, 14, 13, 0.4), 0 0 30px rgba(255, 179, 71, 0.3)'
                    ],
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            button.addEventListener('mouseleave', () => {
                anime({
                    targets: button,
                    scale: [1.05, 1],
                    backgroundColor: 'transparent',
                    boxShadow: [
                        '0 12px 32px rgba(15, 14, 13, 0.4), 0 0 30px rgba(255, 179, 71, 0.3)',
                        '0 4px 12px rgba(15, 14, 13, 0.3)'
                    ],
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });
    }

    /**
     * Create aurora effect (simplified)
     */
    createAuroraBorealis() {
        const aurora = document.createElement('div');
        aurora.className = 'aurora-borealis';
        aurora.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            background: linear-gradient(
                45deg,
                rgba(255, 179, 71, 0.03) 0%,
                rgba(255, 215, 0, 0.02) 25%,
                rgba(205, 127, 50, 0.03) 50%,
                rgba(184, 115, 51, 0.02) 75%,
                rgba(255, 179, 71, 0.03) 100%
            );
            opacity: 0;
        `;
        document.body.appendChild(aurora);

        // Animate aurora with slow, flowing motion
        anime({
            targets: aurora,
            opacity: [0, 0.6, 0.3, 0.8, 0.4],
            backgroundPosition: [
                '0% 0%',
                '100% 20%',
                '50% 100%',
                '0% 80%',
                '0% 0%'
            ],
            duration: 15000,
            loop: true,
            easing: 'easeInOutSine'
        });

        this.auroraBorealisActive = true;
    }

    /**
     * Create mystical particles
     */
    initMysticalParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'mystical-particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createMysticalParticle(particleContainer);
            }, i * 300);
        }
    }

    /**
     * Create individual mystical particle
     */
    createMysticalParticle(container) {
        const particle = document.createElement('div');
        const colors = ['#FFB347', '#FFD700', '#CD7F32'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            box-shadow: 0 0 10px ${color};
        `;

        container.appendChild(particle);

        // Animate particle with random movement
        anime({
            targets: particle,
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
            translateX: [0, (Math.random() - 0.5) * 300],
            translateY: [0, (Math.random() - 0.5) * 300],
            duration: Math.random() * 4000 + 6000,
            easing: 'easeInOutSine',
            complete: () => {
                particle.remove();
                // Create new particle
                if (this.auroraBorealisActive) {
                    setTimeout(() => {
                        this.createMysticalParticle(container);
                    }, Math.random() * 2000);
                }
            }
        });
    }

    /**
     * Add golden shimmer effect to elements
     */
    addGoldenShimmer(element) {
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 215, 0, 0.4),
                transparent
            );
            pointer-events: none;
            border-radius: inherit;
        `;

        element.style.position = 'relative';
        element.appendChild(shimmer);

        anime({
            targets: shimmer,
            left: ['-100%', '100%'],
            duration: 1500,
            easing: 'easeInOutQuad',
            complete: () => {
                shimmer.remove();
            }
        });
    }

    /**
     * Create particle burst effect
     */
    createParticleBurst(element, color, count = 8) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / count;
            const distance = Math.random() * 50 + 30;

            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                left: ${centerX}px;
                top: ${centerY}px;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 0 8px ${color};
            `;

            document.body.appendChild(particle);

            anime({
                targets: particle,
                translateX: Math.cos(angle) * distance,
                translateY: Math.sin(angle) * distance,
                scale: [1, 0],
                opacity: [1, 0],
                duration: 800,
                easing: 'easeOutCubic',
                complete: () => {
                    particle.remove();
                }
            });
        }
    }

    /**
     * Advanced Effects
     */
    initAdvancedEffects() {
        this.createAuroraBorealis();
        this.initMysticalParticles();
        this.animateBackgroundGradient();
        this.enhanceParticleSystem();
        this.initPageTransitions();
    }

    /**
     * Enhanced background gradient animation
     */
    animateBackgroundGradient() {
        const body = document.body;

        anime({
            targets: body,
            backgroundPosition: [
                '0% 0%',
                '100% 25%',
                '50% 100%',
                '0% 75%',
                '0% 0%'
            ],
            duration: 25000,
            loop: true,
            easing: 'linear'
        });
    }

    /**
     * Enhanced particle system integration
     */
    enhanceParticleSystem() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;

        // Add amber colors to particles
        anime({
            targets: canvas,
            opacity: [0.2, 0.6, 0.2],
            filter: [
                'hue-rotate(0deg)',
                'hue-rotate(45deg)',
                'hue-rotate(0deg)'
            ],
            duration: 8000,
            loop: true,
            easing: 'easeInOutSine'
        });
    }

    /**
     * Enhanced page transition effects
     */
    initPageTransitions() {
        const links = document.querySelectorAll('a[href$=".html"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');

                // Enhanced fade out with golden glow
                anime({
                    targets: document.body,
                    opacity: [1, 0],
                    scale: [1, 1.02],
                    duration: 400,
                    easing: 'easeInQuad',
                    complete: () => {
                        window.location.href = href;
                    }
                });
            });
        });
    }

    /**
     * Enhanced scroll-triggered animations
     */
    triggerScrollAnimation(element) {
        if (element.dataset.animated) return;

        // Enhanced animation with amber colors
        const colors = ['#FFB347', '#FFD700', '#CD7F32'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        anime({
            targets: element,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            easing: 'easeOutQuart',
            update: (anim) => {
                const progress = anim.progress / 100;
                element.style.boxShadow = `0 0 ${progress * 15}px ${randomColor}40`;
            },
            complete: () => {
                element.style.boxShadow = '';
            }
        });

        element.dataset.animated = 'true';
    }

    /**
     * Enhanced performance optimizations
     */
    initPerformanceOptimizations() {
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                anime.running.forEach(anim => anim.pause());
                this.auroraBorealisActive = false;
            } else {
                anime.running.forEach(anim => anim.play());
                this.auroraBorealisActive = true;
            }
        });

        // Throttle scroll events
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Memory management for particles
        setInterval(() => {
            const particles = document.querySelectorAll('.mystical-particles > div');
            if (particles.length > 50) {
                for (let i = 0; i < 10; i++) {
                    if (particles[i]) particles[i].remove();
                }
            }
        }, 30000);
    }

    /**
     * Basic animations for reduced motion users
     */
    initBasicAnimations() {
        // Simple fade in animations only
        const elements = document.querySelectorAll('.feature-card, .project-card, .hero-title, .hero-description');
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'opacity 0.3s ease';
        });

        // Minimal symbol animations
        document.querySelectorAll('.rune').forEach(symbol => {
            symbol.style.opacity = '0.8';
            symbol.style.transition = 'opacity 2s ease-in-out';
        });
    }

    /**
     * Cleanup method
     */
    destroy() {
        this.auroraBorealisActive = false;
        anime.running.forEach(anim => anim.pause());

        // Remove created elements
        const containers = document.querySelectorAll('.aurora-borealis, .mystical-particles');
        containers.forEach(container => container.remove());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animeEnhancements = new AnimeEnhancements();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.animeEnhancements) {
        window.animeEnhancements.destroy();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimeEnhancements;
}
