document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the projects page
  if (window.location.pathname.includes('projects.html')) {
    fetchGitHubProjects();
  }

  const floatingElements = document.getElementById('floatingElements');
  if (floatingElements) {
    const numStars = 20;
    const numFlowers = 10;

    // Create floating stars
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'floating-star';
      star.style.width = `${Math.random() * 10 + 5}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 10 + 10}s`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      floatingElements.appendChild(star);
    }

    // Create floating flowers
    for (let i = 0; i < numFlowers; i++) {
      const flower = document.createElement('div');
      flower.className = 'floating-flower';
      flower.style.width = `${Math.random() * 20 + 10}px`;
      flower.style.height = flower.style.width;
      flower.style.left = `${Math.random() * 100}%`;
      flower.style.top = `${Math.random() * 100}%`;
      flower.style.animationDuration = `${Math.random() * 15 + 10}s`;
      flower.style.animationDelay = `${Math.random() * 5}s`;
      floatingElements.appendChild(flower);
    }
  }

  // Add sparkle effect to the hero text
  const heroText = document.querySelector('.hero h2');
  if (heroText) {
    heroText.style.textShadow = '0 0 8px var(--neon-fuchsia), 0 0 16px var(--royal-gold)';
    heroText.style.transition = 'text-shadow 0.5s ease-in-out';
    setInterval(() => {
      heroText.style.textShadow = '0 0 8px var(--neon-fuchsia), 0 0 16px var(--royal-gold)';
      setTimeout(() => {
        heroText.style.textShadow = '0 0 12px var(--neon-fuchsia), 0 0 20px var(--royal-gold)';
      }, 500);
    }, 1000);
  }

  // Fetch projects from GitHub API
  async function fetchGitHubProjects() {
    try {
      const response = await fetch('https://api.github.com/orgs/Veridian-Zenith/repos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const repos = await response.json();
      const projectsWithDescriptions = await Promise.all(repos.map(async repo => {
        try {
          const readmeResponse = await fetch(`https://api.github.com/repos/Veridian-Zenith/${repo.name}/readme`);
          if (readmeResponse.ok) {
            const readmeData = await readmeResponse.json();
            const readmeContent = atob(readmeData.content);
            // Extract first paragraph or first few lines as description
            const shortDescription = readmeContent.split('\n').find(line => line.trim().length > 0) || 'No description available.';
            return { ...repo, description: shortDescription };
          }
        } catch (error) {
          console.error(`Error fetching README for ${repo.name}:`, error);
          return { ...repo, description: repo.description || 'No description available.' };
        }
        return { ...repo, description: repo.description || 'No description available.' };
      }));
      displayProjects(projectsWithDescriptions);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to static projects if API fails
      const fallbackProjects = [
        {
          name: "Project One",
          description: "This is the first project. It's amazing and does wonderful things.",
          html_url: "#"
        },
        {
          name: "Project Two",
          description: "This is the second project. It's even more amazing than the first one.",
          html_url: "#"
        },
        {
          name: "Project Three",
          description: "The third project is here. It's the most amazing one yet.",
          html_url: "#"
        }
      ];
      displayProjects(fallbackProjects);
    }
  }

  // Display projects on the page
  function displayProjects(projects) {
    const projectList = document.getElementById('projectList');
    if (projectList) {
      projectList.innerHTML = '';
      projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
          <h3>${project.name || project.title}</h3>
          <p>${project.description || 'No description available.'}</p>
          <a href="${project.html_url || '#'}" class="cta-btn" target="_blank">View Project</a>
        `;
        projectList.appendChild(projectCard);
      });
    }
  }
});
