/**
 * Personal Portfolio - Main Application Script
 * Orchestrates UI state, dynamic rendering, modals, audio synthesis, search & filters.
 */

(function () {
  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) {
    console.error("PORTFOLIO_DATA is not loaded.");
    return;
  }

  /* ==========================================================================
     1. WEB AUDIO API SYNTHESIZER (Micro-Interactions Sound Effects)
     ========================================================================== */
  let audioCtx = null;
  let isSoundEnabled = localStorage.getItem("portfolio_sound") === "true";

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playUiSound(type = "click") {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "terminal") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn("Audio playback not allowed yet", e);
    }
  }

  window.playUiSound = playUiSound;

  /* ==========================================================================
     2. SVG ICONS REPOSITORY
     ========================================================================== */
  const ICONS = {
    rocket: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
    clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    "git-commit": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/></svg>`,
    users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    cpu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
    layers: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    server: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
    zap: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    code: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    terminal: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    cloud: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
    database: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    external: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
    copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    mail: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    mapPin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    fileText: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`
  };

  function getIcon(name) {
    return ICONS[name] || ICONS.code;
  }

  /* ==========================================================================
     3. TYPEWRITER EFFECT
     ========================================================================== */
  function initTypewriter() {
    const el = document.getElementById("typewriter-text");
    if (!el) return;

    const roles = DATA.profile.roles || [DATA.profile.title];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function tick() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        el.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 45;
      } else {
        el.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typingSpeed = 2200; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next
      }

      setTimeout(tick, typingSpeed);
    }

    tick();
  }

  /* ==========================================================================
     4. RENDER STATS & PILLARS
     ========================================================================== */
  function renderStats() {
    const container = document.getElementById("stats-grid");
    if (!container) return;

    container.innerHTML = DATA.stats.map(stat => `
      <div class="stat-card">
        <div class="stat-icon">${getIcon(stat.icon)}</div>
        <div class="stat-info">
          <div class="stat-number">${stat.value}</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      </div>
    `).join("");
  }

  function renderPillars() {
    const container = document.getElementById("pillars-grid");
    if (!container) return;

    container.innerHTML = DATA.pillars.map(p => `
      <div class="pillar-card">
        <div class="pillar-icon-box">${getIcon(p.icon)}</div>
        <div class="pillar-content">
          <h4>${p.title}</h4>
          <p>${p.description}</p>
        </div>
      </div>
    `).join("");
  }

  /* ==========================================================================
     5. RENDER SKILLS MATRIX (WITH FILTER & SEARCH)
     ========================================================================== */
  let activeSkillCategory = "all";
  let skillSearchQuery = "";

  function renderSkills() {
    const grid = document.getElementById("skills-grid");
    if (!grid) return;

    const filtered = DATA.skills.filter(s => {
      const matchCat = activeSkillCategory === "all" || s.category === activeSkillCategory;
      const matchSearch = !skillSearchQuery || 
        s.name.toLowerCase().includes(skillSearchQuery) || 
        (s.tags && s.tags.some(t => t.toLowerCase().includes(skillSearchQuery)));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          No skills found matching "<b>${escapeHtml(skillSearchQuery)}</b>".
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(skill => `
      <div class="skill-card">
        <div class="skill-card-top">
          <div class="skill-header-left">
            <div class="skill-icon-wrap">${getIcon(skill.icon || "code")}</div>
            <div class="skill-title">${skill.name}</div>
          </div>
          <span class="skill-percentage">${skill.level}%</span>
        </div>
        <div class="skill-bar-container">
          <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
        </div>
        <div class="skill-tags-row">
          ${skill.tags.map(t => `<span class="skill-tag">${t}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  function initSkillsControls() {
    const filterBtns = document.querySelectorAll(".skill-filter-btn");
    const searchInput = document.getElementById("skill-search");

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        playUiSound("click");
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeSkillCategory = btn.getAttribute("data-category") || "all";
        renderSkills();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        skillSearchQuery = e.target.value.trim().toLowerCase();
        renderSkills();
      });
    }
  }

  /* ==========================================================================
     6. RENDER EXPERIENCE TIMELINE
     ========================================================================== */
  function renderTimeline() {
    const container = document.getElementById("timeline-list");
    if (!container) return;

    container.innerHTML = DATA.experience.map(item => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <div>
              <div class="timeline-role">${item.role}</div>
              <div class="timeline-company">${item.company}</div>
            </div>
            <div class="timeline-badge-group">
              <span class="timeline-duration-badge">${item.duration}</span>
              <span class="timeline-type-badge">${item.type}</span>
            </div>
          </div>
          <div class="timeline-location">
            ${getIcon("mapPin")} ${item.location}
          </div>
          <p class="timeline-summary">${item.description}</p>
          <ul class="timeline-bullets">
            ${item.highlights.map(h => `
              <li class="timeline-bullet-item">
                ${getIcon("check")}
                <span>${h}</span>
              </li>
            `).join("")}
          </ul>
          <div class="timeline-tech-row">
            ${item.skills.map(s => `<span class="tech-chip">${s}</span>`).join("")}
          </div>
        </div>
      </div>
    `).join("");
  }

  /* ==========================================================================
     7. RENDER PROJECTS (WITH FILTER & DETAILS MODAL)
     ========================================================================== */
  let activeProjectCategory = "all";
  let projectSearchQuery = "";

  function renderProjects() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    const filtered = DATA.projects.filter(p => {
      const matchCat = activeProjectCategory === "all" || p.category === activeProjectCategory;
      const matchSearch = !projectSearchQuery || 
        p.title.toLowerCase().includes(projectSearchQuery) || 
        p.description.toLowerCase().includes(projectSearchQuery) || 
        p.tech.some(t => t.toLowerCase().includes(projectSearchQuery));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          No projects found matching "<b>${escapeHtml(projectSearchQuery)}</b>".
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(proj => `
      <div class="project-card" data-project-id="${proj.id}">
        <div class="project-thumbnail bg-gradient-to-br ${proj.thumbnailGradient || 'from-indigo-600 to-cyan-500'}" style="background: linear-gradient(135deg, ${proj.accentColor || '#6366f1'} 0%, #0f172a 100%);">
          <div class="project-mockup-wrapper">
            <div class="mockup-top-bar">
              <div class="mockup-dots">
                <span class="mockup-dot" style="background:#ef4444;"></span>
                <span class="mockup-dot" style="background:#f59e0b;"></span>
                <span class="mockup-dot" style="background:#10b981;"></span>
              </div>
              <span class="mockup-tag">&lt;${proj.category}/&gt;</span>
            </div>
            <div class="mockup-center-graphic">
              ${getIcon("code")}
            </div>
            <div class="mockup-bottom-metric">
              ${getIcon("zap")} ${proj.metrics ? proj.metrics[0] : "Optimized Performance"}
            </div>
          </div>
        </div>
        <div class="project-body">
          <div class="project-badge-row">
            <span class="project-status-badge">${proj.badge || "Production"}</span>
          </div>
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.description}</p>
          <div class="project-tech-chips">
            ${proj.tech.map(t => `<span class="tech-chip">${t}</span>`).join("")}
          </div>
          <div class="project-footer-actions">
            <button class="project-action-btn project-btn-details" data-id="${proj.id}">
              ${getIcon("fileText")} Case Study
            </button>
            <a href="${proj.liveUrl}" target="_blank" class="project-action-btn project-btn-demo">
              ${getIcon("external")} Demo
            </a>
          </div>
        </div>
      </div>
    `).join("");

    // Attach click listeners to Details buttons
    grid.querySelectorAll(".project-btn-details").forEach(btn => {
      btn.addEventListener("click", () => {
        playUiSound("click");
        const id = btn.getAttribute("data-id");
        openProjectModal(id);
      });
    });
  }

  function initProjectsControls() {
    const filterBtns = document.querySelectorAll(".project-filter-btn");
    const searchInput = document.getElementById("project-search");

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        playUiSound("click");
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeProjectCategory = btn.getAttribute("data-category") || "all";
        renderProjects();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        projectSearchQuery = e.target.value.trim().toLowerCase();
        renderProjects();
      });
    }
  }

  /* ==========================================================================
     8. PROJECT DETAIL MODAL
     ========================================================================== */
  const projectModal = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  function openProjectModal(id) {
    const proj = DATA.projects.find(p => p.id === id);
    if (!proj || !projectModal) return;

    document.getElementById("modal-project-title").textContent = proj.title;
    document.getElementById("modal-project-subtitle").textContent = proj.subtitle;
    document.getElementById("modal-project-overview").textContent = proj.longDescription || proj.description;

    const metricsContainer = document.getElementById("modal-project-metrics");
    if (metricsContainer) {
      metricsContainer.innerHTML = (proj.metrics || []).map(m => `
        <div class="modal-metric-card">
          ${getIcon("zap")}
          <span>${m}</span>
        </div>
      `).join("");
    }

    const archEl = document.getElementById("modal-project-architecture");
    if (archEl) {
      archEl.textContent = proj.architecture || "Modular cloud architecture designed for elasticity and decoupled fault tolerance.";
    }

    const techChips = document.getElementById("modal-project-tech");
    if (techChips) {
      techChips.innerHTML = proj.tech.map(t => `<span class="tech-chip">${t}</span>`).join("");
    }

    const liveBtn = document.getElementById("modal-btn-live");
    if (liveBtn) liveBtn.href = proj.liveUrl || "#";

    const ghBtn = document.getElementById("modal-btn-github");
    if (ghBtn) ghBtn.href = proj.githubUrl || "#";

    projectModal.classList.add("open");
  }

  function closeProjectModal() {
    if (projectModal) projectModal.classList.remove("open");
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
      playUiSound("click");
      closeProjectModal();
    });
  }

  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  /* ==========================================================================
     9. RESUME MODAL & PRINT
     ========================================================================== */
  const resumeModal = document.getElementById("resume-modal");
  const resumeCloseBtn = document.getElementById("resume-close-btn");
  const openResumeBtns = document.querySelectorAll(".btn-open-resume");
  const printResumeBtn = document.getElementById("resume-print-btn");

  function openResume() {
    if (resumeModal) {
      playUiSound("click");
      resumeModal.classList.add("open");
    }
  }

  function closeResume() {
    if (resumeModal) resumeModal.classList.remove("open");
  }

  openResumeBtns.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    openResume();
  }));

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener("click", () => {
      playUiSound("click");
      closeResume();
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Keyboard Escape listener for modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
      closeResume();
    }
  });

  /* ==========================================================================
     10. RENDER TESTIMONIALS
     ========================================================================== */
  function renderTestimonials() {
    const container = document.getElementById("testimonials-grid");
    if (!container) return;

    container.innerHTML = DATA.testimonials.map(t => `
      <div class="testimonial-card">
        <p class="testimonial-quote">${t.quote}</p>
        <div class="testimonial-author">
          <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar" />
          <div class="author-info">
            <h4>${t.name}</h4>
            <p>${t.role} · ${t.company}</p>
          </div>
        </div>
      </div>
    `).join("");
  }

  /* ==========================================================================
     11. CONTACT FORM & COPY BUTTONS
     ========================================================================== */
  function initContactSection() {
    // Populate direct contact details
    const emailEl = document.getElementById("contact-email-val");
    const phoneEl = document.getElementById("contact-phone-val");
    const locationEl = document.getElementById("contact-location-val");

    if (emailEl) emailEl.textContent = DATA.profile.email;
    if (phoneEl) phoneEl.textContent = DATA.profile.phone;
    if (locationEl) locationEl.textContent = DATA.profile.location;

    // Copy Buttons
    document.querySelectorAll(".copy-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playUiSound("click");
        const textToCopy = btn.getAttribute("data-copy");
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Copied "${textToCopy}" to clipboard!`);
          }).catch(() => {
            showToast("Failed to copy text.");
          });
        }
      });
    });

    // Character counter for message input
    const msgInput = document.getElementById("contact-message");
    const charCount = document.getElementById("msg-char-count");
    if (msgInput && charCount) {
      msgInput.addEventListener("input", () => {
        charCount.textContent = `${msgInput.value.length} / 500`;
      });
    }

    // Contact Form submission
    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        playUiSound("click");

        const submitBtn = form.querySelector("button[type='submit']");
        const originalText = submitBtn.innerHTML;

        // Button loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending inquiry...</span>`;

        // Simulate instant delivery
        setTimeout(() => {
          playUiSound("success");
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();
          if (charCount) charCount.textContent = "0 / 500";
          showToast("Thank you! Your message has been sent successfully.");
        }, 1200);
      });
    }

    // Live Clock Updater
    function updateLocalTime() {
      const clockEl = document.getElementById("live-local-time");
      if (clockEl) {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        clockEl.textContent = now.toLocaleTimeString([], options);
      }
    }
    updateLocalTime();
    setInterval(updateLocalTime, 1000);
  }

  /* ==========================================================================
     12. TOAST NOTIFICATION
     ========================================================================== */
  function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span class="toast-icon">${getIcon("check")}</span>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add("show"), 10);

    // Auto dismiss after 3.5s
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ==========================================================================
     13. THEME TOGGLER
     ========================================================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem("portfolio_theme") || "obsidian";
    applyTheme(savedTheme);

    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeDropdown = document.getElementById("theme-dropdown");
    const themeOptions = document.querySelectorAll(".theme-option");

    if (themeToggleBtn && themeDropdown) {
      themeToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        playUiSound("click");
        themeDropdown.classList.toggle("show");
      });

      document.addEventListener("click", () => {
        themeDropdown.classList.remove("show");
      });

      themeOptions.forEach(opt => {
        opt.addEventListener("click", () => {
          const theme = opt.getAttribute("data-theme-choice");
          if (theme) {
            applyTheme(theme);
            themeDropdown.classList.remove("show");
            showToast(`Theme switched to ${theme}`);
          }
        });
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio_theme", theme);

    // Update active checkmarks
    document.querySelectorAll(".theme-option").forEach(opt => {
      if (opt.getAttribute("data-theme-choice") === theme) {
        opt.classList.add("active");
      } else {
        opt.classList.remove("active");
      }
    });
  }

  window.switchTheme = applyTheme;

  /* ==========================================================================
     14. SOUND TOGGLE CONTROL
     ========================================================================== */
  function initSoundToggle() {
    const soundBtn = document.getElementById("sound-toggle-btn");
    if (!soundBtn) return;

    function updateSoundUi() {
      if (isSoundEnabled) {
        soundBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
        soundBtn.title = "Mute audio sound effects";
      } else {
        soundBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
        soundBtn.title = "Unmute audio sound effects";
      }
    }

    updateSoundUi();

    soundBtn.addEventListener("click", () => {
      isSoundEnabled = !isSoundEnabled;
      localStorage.setItem("portfolio_sound", isSoundEnabled ? "true" : "false");
      updateSoundUi();
      if (isSoundEnabled) {
        playUiSound("click");
        showToast("UI sound effects enabled");
      } else {
        showToast("UI sound effects muted");
      }
    });
  }

  /* ==========================================================================
     15. MOBILE MENU & SCROLLSPY
     ========================================================================== */
  function initNavigation() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const links = document.querySelectorAll(".nav-link");

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        playUiSound("click");
        hamburger.classList.toggle("open");
        navLinks.classList.toggle("open");
      });

      links.forEach(l => {
        l.addEventListener("click", () => {
          hamburger.classList.remove("open");
          navLinks.classList.remove("open");
        });
      });
    }

    // Scrollspy to set active nav link
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
      const scrollY = window.pageYOffset;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          links.forEach(link => {
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    });
  }

  /* Helper Utility */
  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  /* ==========================================================================
     INITIALIZATION ON DOM CONTENT LOADED
     ========================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initSoundToggle();
    initNavigation();
    initTypewriter();
    renderStats();
    renderPillars();
    renderSkills();
    initSkillsControls();
    renderTimeline();
    renderProjects();
    initProjectsControls();
    renderTestimonials();
    initContactSection();
  });
})();
