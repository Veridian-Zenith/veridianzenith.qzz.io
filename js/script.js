document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Theme Toggle functionality
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    // Optionally save theme preference to localStorage
    if (body.classList.contains('light')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });

  // Initialize theme based on localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light');
  }

  // Hamburger Menu functionality
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mainNav = document.getElementById('mainNav');

  if (hamburgerMenu && mainNav) {
    hamburgerMenu.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      hamburgerMenu.classList.toggle('active'); // Optional: for styling the hamburger itself when active
    });
  }
});
