// Grab the data from the hidden HTML element
const dataElement = document.getElementById('project-data');
const initialLikes = dataElement ? JSON.parse(dataElement.dataset.likes) : {};

// Gumawa ng unique ID para sa browser na ito kung wala pa
function getUserId() {
  let userId = localStorage.getItem('portfolio_user_id');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('portfolio_user_id', userId);
  }
  return userId;
}
const currentUserId = getUserId();

/* =========================================================
   PROJECT DATA
   ========================================================= */
const projects = [
  {
    id: "brand-design",
    name: "Brand Identity Design",
    category: "Brand Design",
    type: "Academic", 
    description: "Logo variations, badges, and icons created for a cohesive brand identity.",
    overview: "A complete branding package including horizontal, vertical, badge, and icon logos. This ensures the brand looks consistent across different platforms and sizes.",
    problem: "The client needed a versatile logo that works on billboards, social media, and app icons.",
    solution: "Designed multiple variations of the logo to fit any medium without losing brand recognition.",
    features: ["Horizontal Logo", "Vertical Logo", "Badge Logo", "App Icon"],
    year: 2026,
    tech: ["Adobe Illustrator", "GIMP"], 
    image: "static/assets/BrandDesign/Horizontal logo.png",
    gallery: [
      "static/assets/BrandDesign/Horizontal logo.png",
      "static/assets/BrandDesign/Vertical logo.png",
      "static/assets/BrandDesign/Badge logo.png",
      "static/assets/BrandDesign/Icon logo.png"
    ],
    url: null, github: null, role: "Brand Designer", status: "Completed"
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing Assets",
    category: "Digital Marketing",
    type: "Personal", 
    description: "Social media graphics, web banners, and newsletter headers for marketing campaigns.",
    overview: "A collection of digital marketing materials designed to capture attention and drive engagement across web and social platforms.",
    problem: "The marketing team needed high-quality, eye-catching visuals for a new campaign.",
    solution: "Created a uniform set of banners and posts that align with the campaign's messaging.",
    features: ["Landing Page Visual", "Banner Ads", "Social Media Posts", "Newsletter Headers"],
    year: 2026,
    tech: ["Adobe Photoshop", "Canva"], 
    image: "static/assets/DigitalMarketing/Landing Page.jpg", 
    gallery: [
      "static/assets/DigitalMarketing/Landing Page.jpg",
      "static/assets/DigitalMarketing/Banner Ad.jpg",
      "static/assets/DigitalMarketing/Social Media Post.jpg",
      "static/assets/DigitalMarketing/Newsletter Header.jpg"
    ],
    url: null, github: null, role: "Digital Artist", status: "Completed"
  },
  {
    id: "fruit-drawing",
    name: "Graphic Design",
    category: "Graphic Design",
    type: "Academic",
    description: "A detailed graphic design of a strawberry using vector and raster tools.",
    overview: "A personal project focusing on lighting, shading, and texture to create a realistic digital drawing of a strawberry.",
    problem: "Needed to practice advanced shading techniques in GIMP.",
    solution: "Used multiple layers and blending modes to achieve a 3D effect.",
    features: ["Realistic Shading", "Custom Brushes", "High-Res Output"],
    year: 2026,
    tech: ["GIMP", "Wacom Tablet"], 
    image: "static/assets/FruitDrawing/Digital Drawing.png", 
    gallery: [
      "static/assets/FruitDrawing/Digital Drawing.png"
    ],
    url: null, github: null, role: "Illustrator", status: "Completed"
  },
  {
    id: "typography-krav",
    name: "Typography Layout",
    category: "Typography",
    type: "Personal",
    description: "Custom typography and layout design for KRAV Cafe.",
    overview: "Designed a visually striking poster focusing on typography and layout for a coffee shop's promotional material.",
    problem: "The cafe needed a modern, typographic design that stands out.",
    solution: "Combined custom lettering with a warm color palette.",
    features: ["Custom Typography", "Layout Design", "Print-Ready File"],
    year: 2026,
    tech: ["Adobe Illustrator", "Adobe Photoshop"], 
    image: "static/assets/Typography/KRAV CAFE.png", 
    gallery: [
      "static/assets/Typography/KRAV CAFE.png"
    ],
    url: null, github: null, role: "Graphic Designer", status: "Completed"
  },
  {
    id: "teacher-scheduling-system",
    name: "Automated Teacher Scheduling System",
    category: "Web Development",
    type: "Client Project",
    description: "A web-based scheduling system for Makiling Integrated School to automate teacher timetables.",
    overview: "Developed for our Software Engineering 2 (SE2) subject, this system solves the manual scheduling problem of the school by automatically assigning teachers to subjects and sections without conflicts.",
    problem: "The school administrators spent days manually plotting schedules, which often resulted in overlapping classes and teacher fatigue.",
    solution: "Built a web-based platform with a conflict-detection algorithm that auto-generates timetables based on teacher availability and subject loads.",
    features: [
      "Automated Conflict Detection",
      "Teacher & Section Management",
      "Drag-and-drop timetable editing",
      "Printable schedule generation"
    ],
    year: 2026,
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap"], 
    image: "static/assets/Web Development/Makiling Integrated School Login Portal.png", 
    gallery: [
      "static/assets/Web Development/Makiling Integrated School Login Portal.png"
    ],
    url: null, github: null, role: "Full-Stack Developer", status: "In Progress"
  }
];

/* =========================================================
   DOM READY
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu(); 
  initProjectFilters();
  initContactForm();
  initProjectRouting();
  renderProjects(projects);
  initGlitchBackground();
  initAutumnLeaves();
});

/* =========================================================
   THEME (DARK/LIGHT)
   ========================================================= */
function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "dark" : "light");

  applyTheme(initial);

  toggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const icon = toggle.querySelector("i");
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

/* =========================================================
   MOBILE SIDE PANEL MENU
   ========================================================= */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const body = document.body;

  // Hamburger menu logic (para sa mobile)
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    hamburger.querySelector("i").className = isOpen ? "fas fa-times" : "fas fa-bars";
    body.style.overflow = isOpen ? "hidden" : "";
  });

  // Isara ang mobile menu kapag pumindot ng link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.querySelector("i").className = "fas fa-bars";
      body.style.overflow = "";
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
      hamburger.querySelector("i").className = "fas fa-bars";
      body.style.overflow = "";
    }
  });
}

/* =========================================================
   PROJECT RENDERING & FILTERING
   ========================================================= */
const projectsGrid = document.getElementById("projectsGrid");
const noResults = document.getElementById("noResults");

function renderProjects(list) {
  projectsGrid.innerHTML = "";

  if (list.length === 0) {
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;

  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const techTags = p.tech.map((t) => `<span>${t}</span>`).join("");
    const projectVisual = p.image 
      ? `<img src="${p.image}" alt="${p.name} Preview" style="width: 100%; height: 100%; object-fit: cover;">` 
      : `<i class="fas ${p.imageIcon || 'fa-folder'}"></i>`;

    const likeData = initialLikes[p.id] || { count: 0, liked_by: [] };
    const isLiked = likeData.liked_by.includes(currentUserId);
    
    // Kung naka-like na, kulay pula. Kung hindi, gray.
    const heartClass = isLiked ? "fas fa-heart liked" : "fas fa-heart";

    const detailsBtn = `<a href="#/projects/${p.id}" class="btn btn-sm btn-outline">View Details</a>`;

    card.innerHTML = `
      <div class="project-image">${projectVisual}</div>
      <div class="project-info">
        <h3>${p.name}</h3>
        <div class="project-meta">
          <span>${p.category}</span>
          <span>${p.year}</span>
          <span>${p.role}</span>
        </div>
        <p class="project-desc">${p.description}</p>
        <div class="project-tech">${techTags}</div>
        
        <div class="project-actions" style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
          ${detailsBtn}
          <button class="card-heart-btn ${isLiked ? 'active' : ''}" onclick="likeProject('${p.id}', this, ${isLiked})">
            <i class="${heartClass}"></i> <span class="like-count">${likeData.count}</span>
          </button>
        </div>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
}

function likeProject(projectId, btnElement, isCurrentlyLiked) {
  if (btnElement.disabled) return;
  btnElement.disabled = true;

  fetch(`/api/like/${projectId}`, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: currentUserId })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      const countSpan = btnElement.querySelector('.like-count');
      const icon = btnElement.querySelector('i');
      
      // Update UI base sa sagot ng Python
      countSpan.innerText = data.new_count;

      if (data.action === "liked") {
        btnElement.classList.add('active');
        icon.classList.add('liked');
        
        // Pop animation at floating heart kapag nag-like
        btnElement.classList.add('pop');
        const floatingHeart = document.createElement('i');
        floatingHeart.className = 'fas fa-heart floating-heart';
        btnElement.appendChild(floatingHeart);
        setTimeout(() => floatingHeart.remove(), 800);
      } else {
        // Kapag nag-unlike, tanggalin ang kulay
        btnElement.classList.remove('active');
        icon.classList.remove('liked');
      }

      setTimeout(() => {
        btnElement.classList.remove('pop');
        btnElement.disabled = false;
      }, 500);
    }
  })
  .catch(err => {
    console.error("Error liking project:", err);
    btnElement.disabled = false;
  });
}

function initProjectFilters() {
  const searchInput = document.getElementById("searchInput");
  const yearFilter = document.getElementById("yearFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const typeFilter = document.getElementById("typeFilter");
  const techFilter = document.getElementById("techFilter");

  const filter = () => {
    const query = searchInput.value.toLowerCase().trim();
    const year = yearFilter.value;
    const category = categoryFilter.value;
    const type = typeFilter.value;
    const tech = techFilter.value;

    const filtered = projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tech.some((t) => t.toLowerCase().includes(query));

      const matchesYear = year === "all" || p.year.toString() === year;
      const matchesCategory = category === "all" || p.category === category;
      const matchesType = type === "all" || p.type === type;
      const matchesTech = tech === "all" || p.tech.includes(tech);

      return matchesSearch && matchesYear && matchesCategory && matchesType && matchesTech;
    });

    renderProjects(filtered);
  };

  searchInput.addEventListener("input", filter);
  yearFilter.addEventListener("change", filter);
  categoryFilter.addEventListener("change", filter);
  typeFilter.addEventListener("change", filter);
  techFilter.addEventListener("change", filter);
}

/* =========================================================
   PROJECT DETAIL ROUTING
   ========================================================= */
function initProjectRouting() {
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  function openProject(id) {
    const project = projects.find((p) => p.id === id);
    if (!project) {
      closeModal();
      return;
    }

    const techTags = project.tech.map((t) => `<span>${t}</span>`).join(" ");
    const featureList = project.features
      ? `<ul>${project.features.map((f) => `<li>${f}</li>`).join("")}</ul>`
      : "";

    let galleryHTML = "";
    if (project.gallery && project.gallery.length > 0) {
      const galleryImages = project.gallery.map(imgSrc => `
        <div style="background: var(--bg); border-radius: 8px; padding: 0.5rem; border: 1px solid var(--border);">
          <img src="${imgSrc}" alt="Project Image" style="width: 100%; height: auto; object-fit: contain; border-radius: 4px;">
        </div>
      `).join("");
      
      galleryHTML = `
        <div class="modal-section">
          <h3>Project Gallery</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
            ${galleryImages}
          </div>
        </div>
      `;
    }

    modalBody.innerHTML = `
      <div class="modal-header">
        <div class="modal-icon"><i class="fas fa-palette"></i></div>
        <h2>${project.name}</h2>
      </div>

      <div class="modal-meta-grid">
        <div class="modal-meta-item">
          <div class="label">Category</div>
          <div class="value">${project.category}</div>
        </div>
        <div class="modal-meta-item">
          <div class="label">Year</div>
          <div class="value">${project.year}</div>
        </div>
        <div class="modal-meta-item">
          <div class="label">Role</div>
          <div class="value">${project.role}</div>
        </div>
        <div class="modal-meta-item">
          <div class="label">Status</div>
          <div class="value">${project.status}</div>
        </div>
      </div>

      <div class="modal-section">
        <h3>Overview</h3>
        <p>${project.overview}</p>
      </div>

      ${featureList ? `<div class="modal-section"><h3>What's Inside</h3>${featureList}</div>` : ""}

      <div class="modal-section">
        <h3>Tools Used</h3>
        <div class="project-tech">${techTags}</div>
      </div>

      ${galleryHTML}
    `;

    modal.hidden = false;
    
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; 
  }

  function closeModal() {
    modal.hidden = true;
    
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    
    if (location.hash.startsWith("#/projects/")) {
      history.replaceState(null, "", "#projects");
    }
  }

  function handleHashChange() {
    const hash = location.hash;
    const match = hash.match(/^#\/projects\/(.+)$/);
    if (match) {
      openProject(match[1]);
    } else {
      closeModal();
    }
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  window.addEventListener("hashchange", handleHashChange);
  handleHashChange(); 
}

/* =========================================================
   CONTACT FORM
   ========================================================= */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    status.textContent = "Sending…";
    status.className = "form-status success";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        status.textContent = "Message sent successfully!";
        status.className = "form-status success";
        form.reset();
      } else {
        console.log(response);
        status.textContent = json.message || "Something went wrong!";
        status.className = "form-status error";
      }
    })
    .catch((error) => {
      console.log(error);
      status.textContent = "Something went wrong!";
      status.className = "form-status error";
    });
  });
}

/* =========================================================
   SUPABASE STATS & INTERACTIONS (CV VIEWS & DOWNLOADS)
   ========================================================= */

// Function to send data to Python backend for CV stats
function trackAction(endpoint) {
  fetch(endpoint, { method: 'POST' })
    .catch(err => console.error("Error tracking action:", err));
}

// 1. Track CV View (Called when clicking View Online)
function trackCVView() {
  trackAction('/api/stats/view');
  
  let viewSpan = document.getElementById('view-count');
  let currentVal = parseInt(viewSpan.innerText) || 0;
  viewSpan.innerText = (currentVal + 1) + ' views';
}

// 2. Track CV Download (Called when clicking Download)
function trackDownload() {
  trackAction('/api/stats/download');
  
  let dlSpan = document.getElementById('download-count');
  let currentVal = parseInt(dlSpan.innerText) || 0;
  dlSpan.innerText = (currentVal + 1) + ' downloads';
}

/* =========================================================
   DYNAMIC GLITCH BACKGROUND FOR PROFILE
   ========================================================= */
function initGlitchBackground() {
  const heroContainer = document.getElementById('heroImageContainer');
  if (!heroContainer) return;

  // Function para i-update ang position base sa mouse
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    // Kinukuha natin yung ::before pseudo-element
    const style = document.createElement('style');
    style.innerHTML = `
      .hero-image::before {
        left: ${x}% !important;
        top: ${y}% !important;
        background: radial-gradient(circle at ${x}% ${y}%, var(--accent) 0%, rgba(30, 58, 138, 0.5) 100%) !important;
      }
    `;
    document.head.appendChild(style);
  });

  // Function para sa scroll (para mag-glitch kapag nag-scroll)
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Magbabago ang blur at opacity base sa scroll depth
    heroContainer.style.setProperty('--glitch-blur', `${Math.min(scrollY / 10, 30)}px`);
  });
}

function initScrollReveal() {
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => sec.classList.add('reveal'));

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(sec => observer.observe(sec));
}

/* =========================================================
   AUTUMN FALLING LEAVES
   ========================================================= */
function initAutumnLeaves() {
  const container = document.getElementById('autumn-container');
  if (!container) return;

  // Function na gumagawa ng isang dahon
  function createLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    
    // Random na laki, posisyon, at bilis
    const size = Math.random() * 15 + 10; // 10px hanggang 25px
    const left = Math.random() * 100; // 0% hanggang 100% ng screen width
    const duration = Math.random() * 5 + 5; // 5s hanggang 10s bago bumagsak
    const delay = Math.random() * 2; // Random na simula
    
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;
    leaf.style.left = `${left}vw`;
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.animationDelay = `${delay}s`;

    container.appendChild(leaf);

    // Burahin ang dahon pagkatapos ng animation para hindi mag-clutter ang DOM
    setTimeout(() => {
      leaf.remove();
    }, (duration + delay) * 1000);
  }

  // Gumawa ng dahon bawat 500ms (kalahating segundo)
  setInterval(createLeaf, 500);
}