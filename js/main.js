/**
 * Veridian Zenith - Main JavaScript
 * Enhanced interactivity with Mystical Minimalism
 */

class VeridianZenith {
  constructor() {
    this.init();
  }
  
  init() {
    this.initThemeToggle();
    this.initNavigation();
    this.initMobileMenu();
    this.initProjectFilter();
    this.initContactForm();
    this.initScrollAnimations();
    this.initSmoothScrolling();
    this.initActiveNavigation();
  }
  
  // Theme Toggle Functionality
  initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    this.setTheme(currentTheme);
    
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animate theme toggle
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
          themeToggle.style.transform = 'scale(1)';
        }, 150);
      });
    }
  }
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  // Navigation & Active Link Highlighting
  initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile menu if open
        this.closeMobileMenu();
      });
    });
  }
  
  // Active Navigation for Multi-page
  initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Handle homepage
      if (currentPath === '/' || currentPath.endsWith('/index.html')) {
        if (href === 'index.html' || href === '/' || href === '') {
          link.classList.add('active');
        }
      } else {
        // Handle other pages
        if (currentPath.includes(href) || currentPath.endsWith(href)) {
          link.classList.add('active');
        }
      }
    });
  }
  
  // Mobile Menu
  initMobileMenu() {
    this.navToggle = document.getElementById('navToggle');
    this.mobileMenu = null;
    
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
  }
  
  toggleMobileMenu() {
    if (!this.mobileMenu) {
      this.createMobileMenu();
    }
    
    const isOpen = this.mobileMenu.classList.contains('active');
    
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  createMobileMenu() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    this.mobileMenu = document.createElement('div');
    this.mobileMenu.className = 'nav-menu-mobile';
    
    navLinks.forEach((link, index) => {
      const mobileLink = link.cloneNode(true);
      mobileLink.style.animationDelay = `${index * 100}ms`;
      this.mobileMenu.appendChild(mobileLink);
    });
    
    document.body.appendChild(this.mobileMenu);
    
    // Add event listeners to mobile menu links
    this.mobileMenu.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        this.closeMobileMenu();
      }
    });
    
    // Click outside to close
    this.mobileMenu.addEventListener('click', (e) => {
      if (e.target === this.mobileMenu) {
        this.closeMobileMenu();
      }
    });
  }
  
  openMobileMenu() {
    if (this.mobileMenu) {
      this.mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Animate hamburger to X
      this.animateHamburger(true);
    }
  }
  
  closeMobileMenu() {
    if (this.mobileMenu) {
      this.mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
      
      // Animate X back to hamburger
      this.animateHamburger(false);
    }
  }
  
  animateHamburger(toX) {
    const spans = this.navToggle.querySelectorAll('span');
    
    if (toX) {
      spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  }
  
  // Project Filtering
  initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects with animation
        this.filterProjects(filter, projectCards);
      });
    });
  }
  
  filterProjects(filter, projectCards) {
    projectCards.forEach((card, index) => {
      const categories = card.getAttribute('data-category').split(' ');
      
      setTimeout(() => {
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      }, index * 50); // Staggered animation
    });
  }
  
  // Contact Form
  initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
      
      // Real-time validation
      const inputs = contactForm.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearError(input));
      });
    }
  }
  
  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    this.clearError(field);
    
    switch (fieldName) {
      case 'name':
        if (!value) {
          errorMessage = 'Name is required';
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters';
          isValid = false;
        }
        break;
        
      case 'email':
        if (!value) {
          errorMessage = 'Email is required';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = 'Please enter a valid email address';
          isValid = false;
        }
        break;
        
      case 'message':
        if (!value) {
          errorMessage = 'Message is required';
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = 'Message must be at least 10 characters';
          isValid = false;
        }
        break;
    }
    
    if (!isValid) {
      this.showError(field, errorMessage);
    }
    
    return isValid;
  }
  
  showError(field, message) {
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    
    field.style.borderColor = 'var(--error)';
    field.style.animation = 'shake 0.3s ease-in-out';
  }
  
  clearError(field) {
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
    
    field.style.borderColor = '';
    field.style.animation = '';
  }
  
  async handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Validate all fields
    const fields = form.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });
    
    if (!isFormValid) {
      return;
    }
    
    // Show loading state
    this.setButtonLoading(submitButton, true);
    
    // Simulate form submission (replace with actual endpoint)
    try {
      await this.simulateFormSubmission(formData);
      this.showSuccessMessage();
      form.reset();
    } catch (error) {
      this.showErrorMessage('Failed to send message. Please try again.');
    } finally {
      this.setButtonLoading(submitButton, false);
    }
  }
  
  setButtonLoading(button, loading) {
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
    
    if (loading) {
      button.classList.add('loading');
      button.disabled = true;
    } else {
      button.classList.remove('loading');
      button.disabled = false;
    }
  }
  
  simulateFormSubmission(formData) {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }
  
  showSuccessMessage() {
    // Create and show success notification
    this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
  }
  
  showErrorMessage(message) {
    this.showNotification(message, 'error');
  }
  
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
      color: white;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-card);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
      max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }
  
  // Scroll Animations
  initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .project-card, .principle-card, .link-card');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(24px)';
      observer.observe(element);
    });
  }
  
  // Smooth Scrolling for Same-page Links Only
  initSmoothScrolling() {
    const hashLinks = document.querySelectorAll('a[href^="#"]');
    
    hashLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = 72; // Navigation height
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }
`;
document.head.appendChild(notificationStyles);

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  window.veridianZenith = new VeridianZenith();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when tab is not visible
    if (window.particleSystem) {
      // Could pause particle animation here if needed
    }
  } else {
    // Resume animations when tab becomes visible
    if (window.particleSystem) {
      // Could resume particle animation here if needed
    }
  }
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(() => {
    // Additional scroll handling if needed
  }, 100);
});