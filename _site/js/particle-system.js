/**
 * Particle System for Veridian Zenith
 * GPU-accelerated mystical particle effects
 */

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 50; // Optimized for performance
    this.animationId = null;
    
    this.init();
    this.bindEvents();
  }
  
  init() {
    this.resizeCanvas();
    this.createParticles();
    this.animate();
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    this.particles = [];
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        opacityVariation: Math.random() * 0.4 + 0.2,
        time: Math.random() * 8000,
        color: Math.random() > 0.5 ? 'rgba(212, 168, 67, ALPHA)' : 'rgba(196, 148, 38, ALPHA)'
      });
    }
  }
  
  updateParticles(deltaTime) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.particles.forEach(particle => {
      if (!prefersReducedMotion) {
        // Update position with subtle movement
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Boundary wrapping
        if (particle.x < -10) particle.x = this.canvas.width + 10;
        if (particle.x > this.canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = this.canvas.height + 10;
        if (particle.y > this.canvas.height + 10) particle.y = -10;
        
        // Update opacity with gentle pulsing
        particle.time += deltaTime;
        const pulse = Math.sin(particle.time * 0.001) * 0.3 + 0.7;
        particle.currentOpacity = particle.opacity * pulse;
      } else {
        // Static particles for reduced motion
        particle.currentOpacity = particle.opacity * 0.4;
      }
    });
  }
  
  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.save();
      
      // Create glow effect
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = `rgba(212, 168, 67, ${particle.currentOpacity * 0.5})`;
      
      // Draw particle
      this.ctx.fillStyle = particle.color.replace('ALPHA', particle.currentOpacity);
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.restore();
    });
  }
  
  animate() {
    const now = performance.now();
    
    if (!this.lastTime) {
      this.lastTime = now;
    }
    
    const deltaTime = now - this.lastTime;
    this.lastTime = now;
    
    this.updateParticles(deltaTime);
    this.drawParticles();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  bindEvents() {
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resizeCanvas();
        this.createParticles();
      }, 250);
    });
    
    // Respect motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', () => {
      if (mediaQuery.matches) {
        // Reduced motion - slow down animation
        this.particleCount = 20;
      } else {
        // Full motion
        this.particleCount = 50;
      }
      this.createParticles();
    });
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize particle system
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    window.particleSystem = new ParticleSystem(canvas);
  }
});