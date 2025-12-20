import React, { useEffect, useRef } from 'react';

interface ParticleSystemProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('Canvas resized:', canvas.width, 'x', canvas.height);
    };

    const colors = [
      'rgba(255, 179, 71, 1)', // amber-500
      'rgba(255, 215, 0, 1)',   // gold-500
      'rgba(205, 127, 50, 1)', // bronze-500
      'rgba(184, 115, 51, 1)',  // copper-500
    ];

    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1, // Slower movement
        vy: (Math.random() - 0.5) * 1, // Slower movement
        size: Math.random() * 3 + 2, // Smaller particles
        opacity: Math.random() * 0.6 + 0.2, // Lower opacity
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 1000 + 500, // Longer life to reduce respawns
      };
    };

    const initParticles = () => {
      particlesRef.current = [];
      // Reduced particle count significantly for better performance
      const particleCount = Math.min(30, Math.floor(canvas.width * canvas.height / 40000));
      console.log('Creating', particleCount, 'optimized particles');
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const updateParticles = () => {
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Fade out over time
        const lifeRatio = particle.life / particle.maxLife;
        particle.opacity = Math.max(0.1, (1 - lifeRatio) * 0.9);

        // Wrap around edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Respawn if too old
        if (particle.life >= particle.maxLife) {
          particlesRef.current[index] = createParticle();
        }
      });
    };

    const drawParticles = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles with optimized rendering
      particlesRef.current.forEach((particle) => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Reduced glow effect for performance
        ctx.shadowBlur = 8;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.restore();
      });

      // Optimized connections - only check nearby particles
      particlesRef.current.forEach((particle, i) => {
        // Only check next 10 particles instead of all
        const nearbyParticles = particlesRef.current.slice(i + 1, i + 11);
        nearbyParticles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) { // Reduced connection distance
            const opacity = (1 - distance / 100) * 0.2; // Reduced opacity
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = 'rgba(255, 179, 71, 0.3)'; // Reduced opacity
            ctx.lineWidth = 0.5; // Thinner lines
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
    };

    // Throttle animation for better performance
    let lastFrameTime = 0;
    const animate = (timestamp: number) => {
      // Only animate every other frame (30fps instead of 60fps)
      if (timestamp - lastFrameTime > 16) {
        updateParticles();
        drawParticles();
        lastFrameTime = timestamp;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize with timestamp parameter
    const startAnimation = () => {
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    initParticles();
    startAnimation();

    console.log('Particle system initialized');

    // Event listeners
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-50 ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
        background: 'transparent'
      }}
    />
  );
};

export default ParticleSystem;
