document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".project-list");
  const starfield = document.querySelector(".starfield");

  // Show loading spinner
  container.classList.add("loading");

  // Fetch repos from GitHub org, sort by updated date desc
  async function fetchProjects() {
    try {
      const response = await fetch("https://api.github.com/orgs/Veridian-Zenith/repos");
      const repos = await response.json();

      if (!Array.isArray(repos)) throw new Error("Unexpected GitHub API response");

      repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      // Render projects one by one
      for (let i = 0; i < repos.length; i++) {
        await renderProjectCard(repos[i], i);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      container.innerHTML = `<p class="error">Unable to load projects. Try again later.</p>`;
    } finally {
      container.classList.remove("loading");
    }
  }

  // Render single project card, fetch README fallback if needed
  async function renderProjectCard(repo, index) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.opacity = "0";

    // Prepare description, fallback to null for now
    const description = repo.description?.trim() || null;

    // Create basic card HTML
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <div class="description">${description ? `<p>${description}</p>` : ``}</div>
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      <div class="readme-container"></div>
    `;

    container.appendChild(card);

    // Animate fade-in staggered
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.animation = "fadeIn 0.6s ease-out forwards";
    }, 200 * index);

    // If no description, try to get fallback from README first paragraph
    if (!description) {
      const descContainer = card.querySelector(".description");
      const fallbackDesc = await fetchReadmeDescription(repo.full_name);
      if (fallbackDesc) {
        descContainer.innerHTML = `<p>${fallbackDesc}</p>`;
      }
    }

    // Fetch and render README preview in card
    const readmeContainer = card.querySelector(".readme-container");
    fetchAndRenderReadme(repo.full_name, readmeContainer);
  }

  // Fetch first paragraph from README as fallback description
  async function fetchReadmeDescription(repoFullName) {
    try {
      // Get raw README markdown
      const readmeResp = await fetch(`https://api.github.com/repos/${repoFullName}/readme`, {
        headers: { Accept: "application/vnd.github.v3.raw" }
      });

      if (!readmeResp.ok) return null;

      const markdown = await readmeResp.text();

      // Extract first non-empty paragraph (split by double newline)
      const paragraphs = markdown.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 0);

      if (paragraphs.length === 0) return null;

      // Return first paragraph, truncated to ~150 chars for brevity
      const firstPara = paragraphs[0];
      return firstPara.length > 150 ? firstPara.slice(0, 147) + "..." : firstPara;
    } catch {
      return null;
    }
  }

  // Fetch README markdown, convert to HTML, render preview with toggle
  async function fetchAndRenderReadme(repoFullName, containerElement) {
    try {
      const readmeResp = await fetch(`https://api.github.com/repos/${repoFullName}/readme`, {
        headers: { Accept: "application/vnd.github.v3.raw" }
      });

      if (!readmeResp.ok) {
        containerElement.innerHTML = `<div class="readme">No README available.</div>`;
        return;
      }

      const markdown = await readmeResp.text();

      // Convert markdown to HTML using GitHub API
      const htmlResp = await fetch("https://api.github.com/markdown", {
        method: "POST",
        headers: {
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: markdown, mode: "gfm" })
      });

      const fullHTML = await htmlResp.text();

      // Create a hidden div to extract plain text lines from HTML
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.visibility = "hidden";
      tempDiv.style.pointerEvents = "none";
      tempDiv.innerHTML = fullHTML;
      document.body.appendChild(tempDiv);

      const textLines = tempDiv.innerText.split(/\r?\n/).filter(line => line.trim() !== "");
      document.body.removeChild(tempDiv);

      // Preview: first 10 lines joined by <br>
      const previewLines = textLines.slice(0, 10).join("\n");
      const previewHTML = previewLines.replace(/\n/g, "<br>");

      // Create container div for README preview + toggle button
      const readmeContainer = document.createElement("div");
      readmeContainer.className = "readme";
      readmeContainer.innerHTML = previewHTML;

      // Add toggle if README longer than 10 lines
      if (textLines.length > 10) {
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Show More ▼";
        toggleBtn.style.marginTop = "8px";
        toggleBtn.style.cursor = "pointer";

        let expanded = false;

        toggleBtn.addEventListener("click", () => {
          if (!expanded) {
            readmeContainer.innerHTML = fullHTML;
            toggleBtn.textContent = "Show Less ▲";
            readmeContainer.appendChild(toggleBtn);
          } else {
            readmeContainer.innerHTML = previewHTML;
            toggleBtn.textContent = "Show More ▼";
            readmeContainer.appendChild(toggleBtn);
          }
          expanded = !expanded;
        });

        readmeContainer.appendChild(toggleBtn);
      }

      containerElement.appendChild(readmeContainer);
    } catch (err) {
      console.error(`Failed to fetch README for ${repoFullName}:`, err);
      containerElement.innerHTML = `<div class="readme">Failed to load README.</div>`;
    }
  }

  // Starfield background effect (same as yours)
  function generateStarfield(count = 100) {
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 20 + 10}s`;
      starfield.appendChild(star);
    }
  }

  // Add Discord widget embed
  const discordSection = document.createElement("section");
  discordSection.className = "discord-section";
  discordSection.innerHTML = `
    <div class="discord-widget-container" style="margin: 40px auto; max-width: 400px; text-align: center;">
      <h2 style="font-size:1.3em; font-weight:bold; margin-bottom:10px; background: linear-gradient(90deg, #7289da, #5865f2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Join the Veridian Zenith Discord</h2>
      <iframe src="https://discord.com/widget?id=1114470638745301092&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
      <div style="margin-top:10px; color:#aaa; font-size:0.95em;">Powered by Discord</div>
    </div>
  `;
  // Insert Discord section before the footer or at the end of body
  document.body.appendChild(discordSection);

  // Kick it all off
  fetchProjects();
  generateStarfield();

  // Animated nav underline effect
  const nav = document.querySelector('.main-nav');
  const underline = nav?.querySelector('.nav-underline');
  const links = nav?.querySelectorAll('.nav-link');
  function updateUnderline(el) {
    if (!underline || !el) return;
    const rect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    underline.style.left = (rect.left - navRect.left) + "px";
    underline.style.width = rect.width + "px";
  }
  links?.forEach(link => {
    link.addEventListener('mouseenter', e => updateUnderline(e.currentTarget));
    link.addEventListener('focus', e => updateUnderline(e.currentTarget));
    link.addEventListener('mouseleave', () => {
      const active = nav.querySelector('.nav-link.active');
      updateUnderline(active);
    });
    link.addEventListener('blur', () => {
      const active = nav.querySelector('.nav-link.active');
      updateUnderline(active);
    });
  });
  // Set underline to active on load
  const active = nav?.querySelector('.nav-link.active');
  if (active) updateUnderline(active);
});
