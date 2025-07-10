document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality remains the same
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    body.classList.add('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      body.classList.toggle('light');
      const isLight = body.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeToggle.textContent = isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme';
    });

    const isLight = body.classList.contains('light');
    themeToggle.textContent = isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme';
  }

  if (document.getElementById('projectList')) {
    const projectList = document.getElementById('projectList');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.textContent = 'Loading projects...';
    projectList.appendChild(loadingIndicator);

    fetch('https://api.github.com/orgs/Veridian-Zenith/repos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(projects => {
        projectList.innerHTML = '';
        projects.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        const recentProjects = projects.slice(0, 6);

        if (recentProjects.length === 0) {
          projectList.innerHTML = '<p>No projects found.</p>';
          return;
        }

        recentProjects.forEach(project => {
          // First fetch the README content for each project
          fetch(`https://api.github.com/repos/Veridian-Zenith/${project.name}/readme`)
            .then(response => {
              if (!response.ok) {
                throw new Error('No README found for this project');
              }
              return response.json();
            })
            .then(readmeData => {
              // Extract the first paragraph from the README content
              const readmeContent = atob(readmeData.content);
              const firstParagraph = readmeContent.split('\n\n')[0]
                .replace(/#/g, '')
                .replace(/\*\*/g, '')
                .replace(/\*/g, '')
                .replace(/`/g, '')
                .replace(/\[.*?\]\(.*?\)/g, '')
                .trim();

              const projectCard = document.createElement('div');
              projectCard.className = 'project-card';

              const projectName = document.createElement('h3');
              projectName.textContent = project.name;

              const projectDescription = document.createElement('p');
              projectDescription.textContent = firstParagraph || 'No description available';

              const projectLink = document.createElement('a');
              projectLink.href = project.html_url;
              projectLink.textContent = 'View on GitHub';
              projectLink.target = '_blank';
              projectLink.rel = 'noopener noreferrer';

              const projectUpdated = document.createElement('p');
              projectUpdated.className = 'project-meta';
              projectUpdated.textContent = `Updated: ${new Date(project.updated_at).toLocaleDateString()}`;

              projectCard.appendChild(projectName);
              projectCard.appendChild(projectDescription);
              projectCard.appendChild(projectUpdated);
              projectCard.appendChild(projectLink);

              projectList.appendChild(projectCard);
            })
            .catch(error => {
              console.error(`Error fetching README for ${project.name}:`, error);
              // If README fetch fails, create card with basic info
              const projectCard = document.createElement('div');
              projectCard.className = 'project-card';

              const projectName = document.createElement('h3');
              projectName.textContent = project.name;

              const projectDescription = document.createElement('p');
              projectDescription.textContent = 'No description available';

              const projectLink = document.createElement('a');
              projectLink.href = project.html_url;
              projectLink.textContent = 'View on GitHub';
              projectLink.target = '_blank';
              projectLink.rel = 'noopener noreferrer';

              const projectUpdated = document.createElement('p');
              projectUpdated.className = 'project-meta';
              projectUpdated.textContent = `Updated: ${new Date(project.updated_at).toLocaleDateString()}`;

              projectCard.appendChild(projectName);
              projectCard.appendChild(projectDescription);
              projectCard.appendChild(projectUpdated);
              projectCard.appendChild(projectLink);

              projectList.appendChild(projectCard);
            });
        });
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        projectList.innerHTML = '<p>Error loading projects. Please try again later.</p>';
      });
  }
});
