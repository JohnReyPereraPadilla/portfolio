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
    image: "assets/BrandDesign/Horizontal logo.png",
    gallery: [
      "assets/BrandDesign/Horizontal logo.png",
      "assets/BrandDesign/Vertical logo.png",
      "assets/BrandDesign/Badge logo.png",
      "assets/BrandDesign/Icon logo.png"
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
    image: "assets/DigitalMarketing/Landing Page.jpg", 
    gallery: [
      "assets/DigitalMarketing/Landing Page.jpg",
      "assets/DigitalMarketing/Banner Ad.jpg",
      "assets/DigitalMarketing/Social Media Post.jpg",
      "assets/DigitalMarketing/Newsletter Header.jpg"
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
    image: "assets/FruitDrawing/Digital Drawing.png", 
    gallery: [
      "assets/FruitDrawing/Digital Drawing.png"
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
    image: "assets/Typography/KRAV CAFE.png", 
    gallery: [
      "assets/Typography/KRAV CAFE.png"
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
    image: "assets/Web Development/Makiling Integrated School Login Portal.png", 
    gallery: [
      "assets/Web Development/Makiling Integrated School Login Portal.png"
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
  initGoatCounterStats(); // <--- THIS IS THE MISSING CALL
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

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    hamburger.querySelector("i").className = isOpen ? "fas fa-times" : "fas fa-bars";
    
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  });

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

    const detailsBtn = `<a href="#/projects/${p.id}" class="btn btn-sm btn-outline">View Details</a>`;

    card.innerHTML = `
      <div class="project-image">
        ${projectVisual}
      </div>
      <div class="project-info">
        <h3>${p.name}</h3>
        <div class="project-meta">
          <span>${p.category}</span>
          <span>${p.year}</span>
          <span>${p.role}</span>
        </div>
        <p class="project-desc">${p.description}</p>
        <div class="project-tech">${techTags}</div>
        <div class="project-actions">
          ${detailsBtn}
        </div>
      </div>
    `;
    projectsGrid.appendChild(card);
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
   GOATCOUNTER STATS
   ========================================================= */
function initGoatCounterStats() {
  let checkCount = setInterval(function() {
    if (window.goatcounter && window.goatcounter.visit_count) {
      clearInterval(checkCount);

      window.goatcounter.visit_count({
        append: '#download-count',
        path: 'cv-download',
        type: 'html',
        no_branding: true
      });

      window.goatcounter.visit_count({
        append: '#view-count',
        path: 'cv-view',
        type: 'html',
        no_branding: true
      });
    }
  }, 200);
}