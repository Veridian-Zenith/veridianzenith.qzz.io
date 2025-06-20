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
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.animation = "none";
      }, 600);
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

  // Kick it all off
  fetchProjects();
  generateStarfield();

  // Animated nav underline effect - updated with more robust checks
  try {
    const nav = document.querySelector('.main-nav');
    if (!nav) {
      console.log("Main navigation element not found");
      return;
    }

    const underline = nav.querySelector('.nav-underline');
    if (!underline) {
      console.log("Navigation underline element not found");
      return;
    }

    const links = nav.querySelectorAll('.nav-link');
    if (!links || links.length === 0) {
      console.log("No navigation links found");
      return;
    }

    function updateUnderline(el) {
      if (!el) {
        console.log("Element not provided for underline update");
        return;
      }

      try {
        const rect = el.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        underline.style.left = `${rect.left - navRect.left}px`;
        underline.style.width = `${rect.width}px`;
      } catch (e) {
        console.error("Error updating underline position:", e);
      }
    }

    // Only add event listeners if we have valid elements
    links.forEach(link => {
      if (!link) return;

      link.addEventListener('mouseenter', e => updateUnderline(e.currentTarget));
      link.addEventListener('focus', e => updateUnderline(e.currentTarget));

      link.addEventListener('mouseleave', () => {
        const active = nav.querySelector('.nav-link.active');
        if (active) updateUnderline(active);
      });

      link.addEventListener('blur', () => {
        const active = nav.querySelector('.nav-link.active');
        if (active) updateUnderline(active);
      });
    });

    // Set underline to active on load if an active link exists
    const activeLink = nav.querySelector('.nav-link.active');
    if (activeLink) {
      // Use setTimeout to ensure DOM is fully ready
      setTimeout(() => updateUnderline(activeLink), 100);
    }
  } catch (error) {
    console.error("Error in navigation underline effect initialization:", error);
  }

  // === Vanta Bloom Animated Blobs, Particles, Cursor, Parallax ===

  // --- SVG Blobs (JS-morphed, not <animate>) ---
  function createAnimatedBlobs() {
    let blobLayer = document.querySelector('.animated-blobs');
    if (!blobLayer) {
      blobLayer = document.createElement('div');
      blobLayer.className = 'animated-blobs';
      document.body.appendChild(blobLayer);
    }
    // Only add SVGs if not present
    if (!document.getElementById('blob1svg')) {
      blobLayer.innerHTML = `
        <svg id="blob1svg" width="520" height="520" style="left:5vw;top:8vh;" viewBox="0 0 520 520">
          <defs><radialGradient id="blob1g" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FF2AAF"/><stop offset="100%" stop-color="#0A0A0A"/></radialGradient></defs>
          <path id="blob1" fill="url(#blob1g)" d="M260,60Q340,100,400,180Q460,260,400,340Q340,420,260,400Q180,380,120,320Q60,260,120,180Q180,100,260,60Z"/>
        </svg>
        <svg id="blob2svg" width="340" height="340" style="right:8vw;bottom:10vh;" viewBox="0 0 340 340">
          <defs><radialGradient id="blob2g" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFD700"/><stop offset="100%" stop-color="#8B00FF"/></radialGradient></defs>
          <path id="blob2" fill="url(#blob2g)" d="M170,40Q220,80,270,170Q320,260,220,300Q120,340,70,250Q20,160,70,100Q120,40,170,40Z"/>
        </svg>
      `;
    }
    morphBlobs();
  }

  // Morphing function for blobs
  function morphBlobs() {
    // Keyframes for each blob
    const blob1Frames = [
      "M260,60Q340,100,400,180Q460,260,400,340Q340,420,260,400Q180,380,120,320Q60,260,120,180Q180,100,260,60Z",
      "M260,80Q350,120,410,200Q470,280,410,350Q350,420,260,420Q170,400,110,320Q50,240,110,170Q170,100,260,80Z"
    ];
    const blob2Frames = [
      "M170,40Q220,80,270,170Q320,260,220,300Q120,340,70,250Q20,160,70,100Q120,40,170,40Z",
      "M170,60Q230,100,290,170Q350,240,250,290Q150,340,90,250Q30,160,90,90Q150,20,170,60Z"
    ];
    const lerp = (a, b, t) => a + (b - a) * t;
    // Interpolate SVG path (simple, same # of points)
    function interpolatePath(pathA, pathB, t) {
      // Only works for these specific paths (same structure)
      const numsA = pathA.match(/-?\d+\.?\d*/g).map(Number);
      const numsB = pathB.match(/-?\d+\.?\d*/g).map(Number);
      const nums = numsA.map((a, i) => lerp(a, numsB[i], t));
      // Rebuild path string (hardcoded for these blobs)
      if (nums.length === 26) {
        return `M${nums[0]},${nums[1]}Q${nums[2]},${nums[3]},${nums[4]},${nums[5]}Q${nums[6]},${nums[7]},${nums[8]},${nums[9]}Q${nums[10]},${nums[11]},${nums[12]},${nums[13]}Q${nums[14]},${nums[15]},${nums[16]},${nums[17]}Q${nums[18]},${nums[19]},${nums[20]},${nums[21]}Q${nums[22]},${nums[23]},${nums[24]},${nums[25]}Z`;
      }
      return pathA;
    }
    let t = 0, dir = 1;
    function animate() {
      t += dir * 0.008;
      if (t > 1) { t = 1; dir = -1; }
      if (t < 0) { t = 0; dir = 1; }
      const blob1 = document.getElementById('blob1');
      const blob2 = document.getElementById('blob2');
      if (blob1 && blob2) {
        blob1.setAttribute('d', interpolatePath(blob1Frames[0], blob1Frames[1], t));
        blob2.setAttribute('d', interpolatePath(blob2Frames[0], blob2Frames[1], t));
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // --- Orbiting Particles ---
  function createOrbitParticles(count = 12) {
    if (document.querySelector('.orbit-particles')) return;
    const layer = document.createElement('div');
    layer.className = 'orbit-particles';
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'orbit-particle';
      const size = Math.random() * 12 + 8;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.background = `radial-gradient(circle, #FF2AAF 0%, #8B00FF 80%, transparent 100%)`;
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
    animateOrbitParticles();
  }
  function animateOrbitParticles() {
    const particles = document.querySelectorAll('.orbit-particle');
    const t0 = Date.now();
    function animate() {
      const t = (Date.now() - t0) / 1000;
      particles.forEach((p, i) => {
        const angle = t * (0.18 + 0.04 * i) + i * (Math.PI * 2 / particles.length);
        const r = 120 + 60 * Math.sin(t * 0.2 + i);
        const cx = window.innerWidth / 2 + Math.cos(angle) * r;
        const cy = window.innerHeight / 2 + Math.sin(angle) * r * 0.6;
        p.style.left = `${cx}px`;
        p.style.top = `${cy}px`;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // --- Glowing Cursor Trail ---
  function createCursorGlow() {
    if (document.querySelector('.cursor-glow')) return;
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    let lastX = window.innerWidth/2, lastY = window.innerHeight/2;
    document.addEventListener('pointermove', e => {
      lastX = e.clientX;
      lastY = e.clientY;
      glow.style.transform = `translate(${lastX-16}px,${lastY-16}px)`;
      glow.style.opacity = '1';
    });
    document.addEventListener('pointerleave', () => {
      glow.style.opacity = '0';
    });
  }

  // --- Parallax/Fade-in Sections ---
  function setupParallaxSections() {
    const sections = document.querySelectorAll('.parallax-section');
    function onScrollOrLoad() {
      const wh = window.innerHeight;
      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < wh * 0.92) {
          sec.classList.add('visible');
        }
      });
    }
    window.addEventListener('scroll', onScrollOrLoad);
    window.addEventListener('resize', onScrollOrLoad);
    // Run on load as well
    onScrollOrLoad();
  }

  // --- INIT ---
  document.addEventListener('DOMContentLoaded', () => {
    createAnimatedBlobs();
    createOrbitParticles();
    createCursorGlow();
    setupParallaxSections();
  });
});
